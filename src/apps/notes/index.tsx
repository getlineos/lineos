import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dayjs from "dayjs";
import {
	ChevronDown,
	FileText,
	Folder,
	MoreHorizontal,
	PanelLeft,
	Pin,
	Plus,
	Search,
	SquarePen,
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
		<div className="h-full overflow-hidden bg-[#ececec] text-[#1d1d1f]">
			<div className="grid h-full grid-cols-[230px_330px_minmax(0,1fr)] rounded-[10px] border border-black/10 bg-[#f7f2df]">
				<aside className="border-r border-black/10 bg-[#e9e9e9]/90 backdrop-blur-xl">
					<div className="px-4 pb-3 pt-5">
						<div className="mb-4 flex items-start justify-between gap-2">
							<div className="flex min-w-0 items-center gap-2">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffd45a] text-[#7a5700]">
									<FileText className="h-4 w-4" />
								</div>
								<div className="min-w-0">
									<h1 className="text-xl font-semibold tracking-tight">Notes</h1>
									<p className="text-xs text-[#737373]">{notes.length} notes</p>
								</div>
							</div>
							<button
								type="button"
								onClick={() => createNote(selectedFolder === "all" ? "icloud" : selectedFolder)}
								className="mt-0.5 shrink-0 rounded-md p-1.5 text-[#7a6a2d] transition hover:bg-black/5"
								title="New note"
							>
								<SquarePen className="h-4 w-4" />
							</button>
						</div>
						<SidebarRow
							label="All iCloud"
							count={folderCounts.all}
							active={selectedFolder === "all"}
							onClick={() => setSelectedFolder("all")}
							accent="text-[#6a5a22]"
							surface="bg-white/70"
						/>
						{(Object.keys(folderMeta) as NoteFolder[]).map((folder) => (
							<SidebarRow
								key={folder}
								label={folderMeta[folder].countLabel}
								count={folderCounts[folder]}
								active={selectedFolder === folder}
								onClick={() => setSelectedFolder(folder)}
								accent="text-[#444]"
								surface="bg-white/70"
							/>
						))}
					</div>

					<div className="mt-3 px-4">
						<div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#777]">
							<ChevronDown className="h-4 w-4" />
							Folders
						</div>
						<div className="space-y-1">
							{(Object.keys(folderMeta) as NoteFolder[]).map((folder) => (
								<button
									key={folder}
									type="button"
									onClick={() => createNote(folder)}
									className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm text-[#444] transition hover:bg-white/55"
								>
									<span className="flex items-center gap-2">
										<Folder className="h-4 w-4 text-[#9a812b]" />
										{folderMeta[folder].label}
									</span>
									<Plus className="h-3.5 w-3.5 text-[#777]" />
								</button>
							))}
						</div>
					</div>
				</aside>

				<section className="border-r border-black/10 bg-[#f7f2e5]">
					<div className="flex h-12 items-center justify-between border-b border-black/10 px-4">
						<div className="flex items-center gap-2 text-sm font-semibold text-[#514624]">
							<PanelLeft className="h-4 w-4 text-[#8b7a3f]" />
							{selectedFolder === "all" ? "All iCloud" : folderMeta[selectedFolder].label}
						</div>
						<button
							type="button"
							className="rounded-md p-1.5 text-[#8b7a3f] transition hover:bg-black/5"
							title="More"
						>
							<MoreHorizontal className="h-4 w-4" />
						</button>
					</div>
					<div className="border-b border-black/10 px-4 py-3">
						<div className="relative">
							<Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f8f8f]" />
							<Input
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder="Search"
								className="h-8 rounded-lg border-black/10 bg-white/75 pl-8 text-sm text-[#333] shadow-inner placeholder:text-[#8f8f8f] focus-visible:ring-[#f3c642]/35"
							/>
						</div>
					</div>

					<div className="h-[calc(100%-105px)] overflow-y-auto px-2 py-2">
						{filteredNotes.length ? (
							<div className="space-y-1">
								{filteredNotes.map((note) => (
									<button
										key={note.id}
										type="button"
										onClick={() => setSelectedNoteId(note.id)}
										className={[
											"block w-full rounded-lg px-3 py-3 text-left transition",
											selectedNote?.id === note.id
												? "bg-[#f7cf5b]"
												: "hover:bg-white/70",
										].join(" ")}
									>
										<div className="flex items-start justify-between gap-3">
											<div className="min-w-0">
												<h2 className="truncate text-[13px] font-semibold text-[#2c2c2e]">
													{note.title}
												</h2>
												<p className="mt-1 text-[11px] text-[#70684b]">
													{dayjs(note.updatedAt).format("D MMM YYYY, HH:mm")}
												</p>
											</div>
											{note.pinned ? (
												<Pin className="h-3.5 w-3.5 shrink-0 text-[#8d6c00]" />
											) : null}
										</div>
										<p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[#5c563f]">
											{note.content || "No additional text"}
										</p>
									</button>
								))}
							</div>
						) : (
							<div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-black/10 bg-white/45 px-6 text-center">
								<FileText className="h-9 w-9 text-[#b49b4a]" />
								<h2 className="mt-4 text-base font-semibold text-[#514624]">
									No notes found
								</h2>
								<p className="mt-2 text-sm text-[#7d714b]">
									Try another search or create a fresh note.
								</p>
							</div>
						)}
					</div>
				</section>

				<section className="flex min-w-0 flex-col bg-[#fffdf7]">
					<div className="flex h-12 items-center justify-between border-b border-black/10 bg-[#fbf7e9] px-5">
						<div>
							<h2 className="text-xs font-semibold text-[#8a7a3e]">
								{selectedNote
									? folderMeta[selectedNote.folder].label
									: "Notes"}
							</h2>
							<p className="text-[11px] text-[#7c7251]">
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
								className="rounded-md border border-black/10 bg-white/65 px-2.5 py-1.5 text-xs font-medium text-[#6f6030] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
							>
								<Pin className="mr-1.5 inline h-3.5 w-3.5" />
								{selectedNote?.pinned ? "Unpin" : "Pin"}
							</button>
							<button
								type="button"
								disabled={!selectedNote}
								onClick={deleteSelectedNote}
								className="rounded-md border border-black/10 bg-white/65 px-2.5 py-1.5 text-xs font-medium text-[#b2552b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
							>
								<Trash2 className="mr-1.5 inline h-3.5 w-3.5" />
								Delete
							</button>
						</div>
					</div>

					{selectedNote ? (
						<div className="flex min-h-0 flex-1 flex-col">
							<div className="px-10 pt-8">
								<Input
									value={selectedNote.title}
									onChange={(event) =>
										updateSelectedNote({ title: event.target.value || "Untitled Note" })
									}
									className="h-auto border-0 bg-transparent px-0 text-4xl font-bold tracking-tight text-[#2f2a1a] shadow-none focus-visible:ring-0"
								/>
							</div>
							<div className="px-10 pt-4">
								<select
									value={selectedNote.folder}
									onChange={(event) =>
										updateSelectedNote({
											folder: event.target.value as NoteFolder,
										})
									}
									className="rounded-md border border-black/10 bg-[#fff7de] px-2.5 py-1.5 text-xs text-[#74642f] outline-none"
								>
									{(Object.keys(folderMeta) as NoteFolder[]).map((folder) => (
										<option key={folder} value={folder}>
											{folderMeta[folder].label}
										</option>
									))}
								</select>
							</div>
							<div className="min-h-0 flex-1 px-10 pb-9 pt-6">
								<Textarea
									value={selectedNote.content}
									onChange={(event) =>
										updateSelectedNote({
											content: event.target.value,
											title: deriveTitle(event.target.value),
										})
									}
									placeholder="Start writing..."
									className="h-full min-h-full resize-none border-0 bg-transparent px-0 py-0 text-[17px] leading-8 text-[#37311f] shadow-none placeholder:text-[#b2a77a] focus-visible:ring-0"
								/>
							</div>
						</div>
					) : (
						<div className="flex flex-1 items-center justify-center px-8">
							<div className="max-w-md text-center">
								<FileText className="mx-auto h-12 w-12 text-[#c6b16f]" />
								<h2 className="mt-5 text-2xl font-semibold text-[#544821]">
									No note selected
								</h2>
								<p className="mt-3 text-sm leading-6 text-[#8f8157]">
									Create a note from the sidebar and it will open here, just like a native notes workspace.
								</p>
								<button
									type="button"
									onClick={() => createNote()}
									className="mt-6 rounded-md bg-[#f6c942] px-4 py-2 text-sm font-medium text-[#6f5200] transition hover:bg-[#f2bf28]"
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
