import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dayjs from "dayjs";
import {
	ChevronDown,
	FileText,
	Pin,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NoteFolder = "icloud" | "work" | "personal";

type Note = {
	id: string;
	title: string;
	content: string;
	folder: NoteFolder;
	pinned: boolean;
	updatedAt: string;
};

const STORAGE_KEY = "lineos-notes";

const folderMeta: Record<
	NoteFolder,
	{ label: string; countLabel: string; accent: string; surface: string }
> = {
	icloud: {
		label: "iCloud",
		countLabel: "All iCloud",
		accent: "text-yellow-600",
		surface: "bg-yellow-50",
	},
	work: {
		label: "Work",
		countLabel: "Work Notes",
		accent: "text-sky-600",
		surface: "bg-sky-50",
	},
	personal: {
		label: "Personal",
		countLabel: "Personal Notes",
		accent: "text-emerald-600",
		surface: "bg-emerald-50",
	},
};

function createSeedNotes(): Note[] {
	const now = dayjs();

	return [
		{
			id: "welcome-note",
			title: "Welcome to Notes",
			content:
				"Capture ideas, lists, and quick drafts here.\n\nThis built-in Notes app stores everything locally in your browser for now.",
			folder: "icloud",
			pinned: true,
			updatedAt: now.subtract(2, "hour").toISOString(),
		},
		{
			id: "launch-plan",
			title: "LineOS launch ideas",
			content:
				"1. Tighten the desktop shell polish\n2. Add native Notes and Calendar\n3. Improve app launcher search ranking",
			folder: "work",
			pinned: false,
			updatedAt: now.subtract(1, "day").toISOString(),
		},
		{
			id: "groceries",
			title: "Weekend groceries",
			content: "- Coffee beans\n- Sourdough\n- Tomatoes\n- Olive oil",
			folder: "personal",
			pinned: false,
			updatedAt: now.subtract(3, "day").toISOString(),
		},
	];
}

function loadNotes() {
	if (typeof window === "undefined") {
		return createSeedNotes();
	}

	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (!stored) {
		return createSeedNotes();
	}

	try {
		const parsed = JSON.parse(stored);
		return Array.isArray(parsed) && parsed.length ? parsed : createSeedNotes();
	} catch {
		return createSeedNotes();
	}
}

function deriveTitle(content: string) {
	const firstLine = content
		.split("\n")
		.map((line) => line.trim())
		.find(Boolean);

	return firstLine || "Untitled Note";
}

export default function NotesApp() {
	const [notes, setNotes] = useState<Note[]>(() => loadNotes());
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFolder, setSelectedFolder] = useState<NoteFolder | "all">("all");
	const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
	}, [notes]);

	const filteredNotes = useMemo(() => {
		const normalizedQuery = searchQuery.trim().toLowerCase();

		return [...notes]
			.filter((note) => {
				const matchesFolder =
					selectedFolder === "all" || note.folder === selectedFolder;
				const haystack = `${note.title} ${note.content}`.toLowerCase();
				const matchesSearch =
					!normalizedQuery || haystack.includes(normalizedQuery);

				return matchesFolder && matchesSearch;
			})
			.sort((left, right) => {
				if (left.pinned !== right.pinned) {
					return left.pinned ? -1 : 1;
				}

				return dayjs(right.updatedAt).valueOf() - dayjs(left.updatedAt).valueOf();
			});
	}, [notes, searchQuery, selectedFolder]);

	const selectedNote =
		filteredNotes.find((note) => note.id === selectedNoteId) ??
		filteredNotes[0] ??
		null;

	useEffect(() => {
		if (!selectedNote) {
			setSelectedNoteId(null);
			return;
		}

		if (selectedNote.id !== selectedNoteId) {
			setSelectedNoteId(selectedNote.id);
		}
	}, [selectedNote, selectedNoteId]);

	const folderCounts = useMemo(
		() => ({
			all: notes.length,
			icloud: notes.filter((note) => note.folder === "icloud").length,
			work: notes.filter((note) => note.folder === "work").length,
			personal: notes.filter((note) => note.folder === "personal").length,
		}),
		[notes],
	);

	const createNote = (folder: NoteFolder = "icloud") => {
		const nextNote: Note = {
			id: crypto.randomUUID(),
			title: "New Note",
			content: "",
			folder,
			pinned: false,
			updatedAt: new Date().toISOString(),
		};

		setNotes((current) => [nextNote, ...current]);
		setSelectedNoteId(nextNote.id);
	};

	const updateSelectedNote = (updates: Partial<Note>) => {
		if (!selectedNote) {
			return;
		}

		setNotes((current) =>
			current.map((note) =>
				note.id === selectedNote.id
					? {
							...note,
							...updates,
							updatedAt: new Date().toISOString(),
						}
					: note,
			),
		);
	};

	const deleteSelectedNote = () => {
		if (!selectedNote) {
			return;
		}

		setNotes((current) => current.filter((note) => note.id !== selectedNote.id));
		setSelectedNoteId(null);
	};

	return (
		<div className="h-full overflow-hidden bg-[#f6f0d8] text-slate-900">
			<div className="grid h-full grid-cols-[260px_340px_minmax(0,1fr)]">
				<aside className="border-r border-[#e4dcc0] bg-[#efe5bc] px-5 py-6">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-semibold tracking-tight text-[#7c5d10]">
							Notes
						</h1>
						<button
							type="button"
							onClick={() => createNote(selectedFolder === "all" ? "icloud" : selectedFolder)}
							className="rounded-2xl bg-[#f6c942] p-2.5 text-[#6f5200] shadow-sm transition hover:bg-[#f2bf28]"
						>
							<Plus className="h-5 w-5" />
						</button>
					</div>

					<div className="mt-6 space-y-2">
						<SidebarRow
							label="All iCloud"
							count={folderCounts.all}
							active={selectedFolder === "all"}
							onClick={() => setSelectedFolder("all")}
							accent="text-yellow-600"
							surface="bg-yellow-100/70"
						/>
						{(Object.keys(folderMeta) as NoteFolder[]).map((folder) => (
							<SidebarRow
								key={folder}
								label={folderMeta[folder].countLabel}
								count={folderCounts[folder]}
								active={selectedFolder === folder}
								onClick={() => setSelectedFolder(folder)}
								accent={folderMeta[folder].accent}
								surface={folderMeta[folder].surface}
							/>
						))}
					</div>

					<div className="mt-8">
						<div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#8e7a3e]">
							<ChevronDown className="h-4 w-4" />
							Folders
						</div>
						<div className="space-y-2">
							{(Object.keys(folderMeta) as NoteFolder[]).map((folder) => (
								<button
									key={folder}
									type="button"
									onClick={() => createNote(folder)}
									className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm text-[#6c5b27] transition hover:bg-white/45"
								>
									<span>{folderMeta[folder].label}</span>
									<Plus className="h-4 w-4" />
								</button>
							))}
						</div>
					</div>
				</aside>

				<section className="border-r border-[#e7dfc7] bg-[#f7f2e2]">
					<div className="border-b border-[#e7dfc7] px-5 py-4">
						<div className="relative">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b8b59]" />
							<Input
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder="Search"
								className="border-[#e1d8bc] bg-white pl-10 text-[#6f5e2c] placeholder:text-[#aa9c73]"
							/>
						</div>
					</div>

					<div className="h-[calc(100%-73px)] overflow-y-auto p-3">
						{filteredNotes.length ? (
							<div className="space-y-2">
								{filteredNotes.map((note) => (
									<button
										key={note.id}
										type="button"
										onClick={() => setSelectedNoteId(note.id)}
										className={[
											"block w-full rounded-[22px] border px-4 py-4 text-left transition",
											selectedNote?.id === note.id
												? "border-[#f2c84f] bg-[#ffe08a]"
												: "border-transparent bg-white/75 hover:border-[#ead28f] hover:bg-white",
										].join(" ")}
									>
										<div className="flex items-start justify-between gap-3">
											<div className="min-w-0">
												<h2 className="truncate text-sm font-semibold text-[#4b4020]">
													{note.title}
												</h2>
												<p className="mt-1 text-xs text-[#8b7b4f]">
													{dayjs(note.updatedAt).format("D MMM YYYY, HH:mm")}
												</p>
											</div>
											{note.pinned ? (
												<Pin className="h-4 w-4 shrink-0 text-[#b18816]" />
											) : null}
										</div>
										<p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6f6238]">
											{note.content || "No additional text"}
										</p>
									</button>
								))}
							</div>
						) : (
							<div className="flex h-full flex-col items-center justify-center rounded-[28px] border border-dashed border-[#dccf9d] bg-white/40 px-6 text-center">
								<FileText className="h-10 w-10 text-[#b49b4a]" />
								<h2 className="mt-4 text-lg font-semibold text-[#61542b]">
									No notes found
								</h2>
								<p className="mt-2 text-sm text-[#8f8157]">
									Try another search or create a fresh note.
								</p>
							</div>
						)}
					</div>
				</section>

				<section className="flex min-w-0 flex-col bg-[#fffdf5]">
					<div className="flex items-center justify-between border-b border-[#ece4cc] px-6 py-4">
						<div>
							<h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a29059]">
								{selectedNote
									? folderMeta[selectedNote.folder].label
									: "Notes"}
							</h2>
							<p className="mt-1 text-sm text-[#8f8259]">
								{selectedNote
									? `Edited ${dayjs(selectedNote.updatedAt).format("D MMM YYYY, HH:mm")}`
									: "Select or create a note to begin"}
							</p>
						</div>

						<div className="flex items-center gap-2">
							<button
								type="button"
								disabled={!selectedNote}
								onClick={() =>
									selectedNote &&
									updateSelectedNote({ pinned: !selectedNote.pinned })
								}
								className="rounded-2xl border border-[#e7ddbf] bg-white px-3 py-2 text-sm font-medium text-[#6f6030] transition hover:bg-[#fff7df] disabled:cursor-not-allowed disabled:opacity-50"
							>
								<Pin className="mr-2 inline h-4 w-4" />
								{selectedNote?.pinned ? "Unpin" : "Pin"}
							</button>
							<button
								type="button"
								disabled={!selectedNote}
								onClick={deleteSelectedNote}
								className="rounded-2xl border border-[#f0d1c2] bg-white px-3 py-2 text-sm font-medium text-[#b2552b] transition hover:bg-[#fff1ea] disabled:cursor-not-allowed disabled:opacity-50"
							>
								<Trash2 className="mr-2 inline h-4 w-4" />
								Delete
							</button>
						</div>
					</div>

					{selectedNote ? (
						<div className="flex min-h-0 flex-1 flex-col">
							<div className="px-8 pt-8">
								<Input
									value={selectedNote.title}
									onChange={(event) =>
										updateSelectedNote({ title: event.target.value || "Untitled Note" })
									}
									className="border-0 bg-transparent px-0 text-4xl font-semibold tracking-tight text-[#443a1d] shadow-none focus-visible:ring-0"
								/>
							</div>
							<div className="px-8 pt-4">
								<select
									value={selectedNote.folder}
									onChange={(event) =>
										updateSelectedNote({
											folder: event.target.value as NoteFolder,
										})
									}
									className="rounded-xl border border-[#e5d9b4] bg-[#fff8e6] px-3 py-2 text-sm text-[#74642f]"
								>
									{(Object.keys(folderMeta) as NoteFolder[]).map((folder) => (
										<option key={folder} value={folder}>
											{folderMeta[folder].label}
										</option>
									))}
								</select>
							</div>
							<div className="min-h-0 flex-1 px-8 pb-8 pt-5">
								<Textarea
									value={selectedNote.content}
									onChange={(event) =>
										updateSelectedNote({
											content: event.target.value,
											title: deriveTitle(event.target.value),
										})
									}
									placeholder="Start writing..."
									className="h-full min-h-full resize-none border-0 bg-transparent px-0 py-0 text-base leading-8 text-[#4d4221] shadow-none focus-visible:ring-0"
								/>
							</div>
						</div>
					) : (
						<div className="flex flex-1 items-center justify-center px-8">
							<div className="max-w-md text-center">
								<FileText className="mx-auto h-14 w-14 text-[#c6b16f]" />
								<h2 className="mt-5 text-2xl font-semibold text-[#544821]">
									No note selected
								</h2>
								<p className="mt-3 text-sm leading-6 text-[#8f8157]">
									Create a note from the sidebar and it will open here, just like a native notes workspace.
								</p>
								<button
									type="button"
									onClick={() => createNote()}
									className="mt-6 rounded-2xl bg-[#f6c942] px-4 py-3 text-sm font-medium text-[#6f5200] shadow-sm transition hover:bg-[#f2bf28]"
								>
									Create Note
								</button>
							</div>
						</div>
					)}
				</section>
			</div>
		</div>
	);
}

function SidebarRow({
	label,
	count,
	active,
	onClick,
	accent,
	surface,
}: {
	label: string;
	count: number;
	active: boolean;
	onClick: () => void;
	accent: string;
	surface: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={[
				"flex w-full items-center justify-between rounded-[20px] px-4 py-3 text-left transition",
				active ? `${surface} shadow-sm` : "hover:bg-white/35",
			].join(" ")}
		>
			<span className={`font-medium ${accent}`}>{label}</span>
			<span className="text-sm text-[#8d7b49]">{count}</span>
		</button>
	);
}
