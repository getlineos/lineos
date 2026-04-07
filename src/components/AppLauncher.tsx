import { AppConfig } from "@/config/apps";
import { RootState } from "@/store/persistence";
import { openApp } from "@/utils/openApp";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

export default function AppLauncher() {
	const navigate = useNavigate();
	const location = useLocation();
	const inputRef = useRef<HTMLInputElement>(null);
	const installedApps = useSelector(
		(state: RootState) => state.installedApps?.apps ?? [],
	);
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);

	const searchableApps = useMemo(() => {
		const seen = new Set<string>();

		return installedApps.filter((app) => {
			if (!app?.slug || seen.has(app.slug)) {
				return false;
			}

			seen.add(app.slug);
			return app.slug !== "trash";
		});
	}, [installedApps]);

	const results = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		if (!normalizedQuery) {
			return searchableApps.slice(0, 8);
		}

		return searchableApps
			.map((app) => {
				const name = app.name.toLowerCase();
				const slug = app.slug.toLowerCase();
				let score = 0;

				if (name === normalizedQuery) {
					score += 120;
				}
				if (name.startsWith(normalizedQuery)) {
					score += 60;
				}
				if (slug.startsWith(normalizedQuery)) {
					score += 40;
				}
				if (name.includes(normalizedQuery)) {
					score += 25;
				}
				if (slug.includes(normalizedQuery)) {
					score += 15;
				}
				if (app.showInDock) {
					score += 5;
				}
				if (app.showInLaunchpad) {
					score += 3;
				}

				return { app, score };
			})
			.filter(({ score }) => score > 0)
			.sort((left, right) => right.score - left.score)
			.slice(0, 8)
			.map(({ app }) => app);
	}, [query, searchableApps]);

	useEffect(() => {
		setIsOpen(false);
		setQuery("");
		setActiveIndex(0);
	}, [location.pathname]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		setActiveIndex(0);
	}, [isOpen, query]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		inputRef.current?.focus();
	}, [isOpen]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const target = event.target as HTMLElement | null;
			const isTypingTarget =
				target instanceof HTMLInputElement ||
				target instanceof HTMLTextAreaElement ||
				target?.isContentEditable;

			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setIsOpen((current) => {
					const nextIsOpen = !current;

					if (nextIsOpen) {
						setQuery("");
						setActiveIndex(0);
					}

					return nextIsOpen;
				});
				return;
			}

			if (!isOpen) {
				return;
			}

			if (event.key === "Escape") {
				event.preventDefault();
				setIsOpen(false);
				return;
			}

			if (event.key === "ArrowDown") {
				event.preventDefault();
				setActiveIndex((current) =>
					results.length ? (current + 1) % results.length : 0,
				);
				return;
			}

			if (event.key === "ArrowUp") {
				event.preventDefault();
				setActiveIndex((current) =>
					results.length ? (current - 1 + results.length) % results.length : 0,
				);
				return;
			}

			if (event.key === "Enter" && results[activeIndex]) {
				event.preventDefault();
				openApp(navigate, results[activeIndex]);
				setIsOpen(false);
				return;
			}

			if (
				!isTypingTarget &&
				event.key.length === 1 &&
				!event.metaKey &&
				!event.ctrlKey
			) {
				inputRef.current?.focus();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [activeIndex, isOpen, navigate, results]);

	const handleOpenApp = (app: AppConfig) => {
		openApp(navigate, app);
		setIsOpen(false);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 z-[1100] bg-slate-950/40 backdrop-blur-md"
			onClick={() => setIsOpen(false)}
		>
			<div className="flex min-h-screen items-start justify-center px-4 pt-24">
				<div
					className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/20 bg-slate-900/80 shadow-[0_30px_120px_rgba(15,23,42,0.55)]"
					onClick={(event) => event.stopPropagation()}
				>
					<div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
						<Search className="h-5 w-5 text-white/60" />
						<input
							ref={inputRef}
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Search apps"
							className="w-full bg-transparent text-lg text-white outline-none placeholder:text-white/35"
						/>
						<div className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.24em] text-white/45">
							⌘K
						</div>
					</div>

					<div className="max-h-[420px] overflow-y-auto px-3 py-3">
						{results.length ? (
							results.map((app, index) => (
								<button
									key={app.slug}
									type="button"
									className={[
										"flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition",
										index === activeIndex
											? "bg-sky-400/20 text-white"
											: "text-white/80 hover:bg-white/8 hover:text-white",
									]
										.filter(Boolean)
										.join(" ")}
									onMouseEnter={() => setActiveIndex(index)}
									onClick={() => handleOpenApp(app)}
								>
									<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
										<img
											src={app.icon}
											alt={app.name}
											className="h-10 w-10 object-contain"
										/>
									</div>
									<div className="min-w-0 flex-1">
										<div className="truncate text-base font-medium">
											{app.name}
										</div>
									</div>
									<div className="text-xs uppercase tracking-[0.24em] text-white/35">
										Open
									</div>
								</button>
							))
						) : (
							<div className="px-4 py-10 text-center text-white/60">
								<p className="text-base text-white">No apps found</p>
								<p className="mt-2 text-sm text-white/45">
									Try another name or shortcut keyword.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
