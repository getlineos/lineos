import TestFlightIcon from "@/assets/img/icons/testflight.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import storage from "@/utils/storage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
	ChevronRight,
	Link,
	PanelLeftClose,
	PanelLeftOpen,
	Play,
	Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

dayjs.extend(relativeTime);

type BetaStatus = "ready" | "testing" | "expired";

type BetaApp = {
	id: string;
	name: string;
	developer: string;
	version: string;
	build: string;
	url: string;
	status: BetaStatus;
	expiresAt: string;
	updatedAt: string;
};

const TESTFLIGHT_APPS_KEY = "testflightBetaApps";

const statusCopy: Record<
	BetaStatus,
	{ label: string; action: string; badge: string }
> = {
	ready: {
		label: "Ready",
		action: "Run",
		badge: "bg-emerald-500/15 text-emerald-700",
	},
	testing: {
		label: "Testing",
		action: "Resume",
		badge: "bg-sky-500/15 text-sky-700",
	},
	expired: {
		label: "Expired",
		action: "Rejoin",
		badge: "bg-rose-500/15 text-rose-700",
	},
};

export default function TestFlightApp() {
	const [betaApps, setBetaApps] = useState<BetaApp[]>(readBetaApps);
	const [selectedAppId, setSelectedAppId] = useState(betaApps[0]?.id ?? "");
	const [previewAppId, setPreviewAppId] = useState("");
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [appName, setAppName] = useState("");
	const [appUrl, setAppUrl] = useState("");
	const [error, setError] = useState("");

	const selectedApp = useMemo(
		() => betaApps.find((app) => app.id === selectedAppId) ?? betaApps[0],
		[betaApps, selectedAppId]
	);

	const activeCount = betaApps.filter((app) => app.status !== "expired").length;

	const persistBetaApps = (apps: BetaApp[]) => {
		storage.set(TESTFLIGHT_APPS_KEY, apps);
		setBetaApps(apps);
	};

	const registerBetaApp = () => {
		const normalizedUrl = normalizeUrl(appUrl);
		if (!normalizedUrl) {
			setError("Enter a valid http or https URL.");
			return;
		}

		const url = new URL(normalizedUrl);
		const name = appName.trim() || titleFromHost(url.hostname);
		const slugBase = `testflight-${slugify(name)}`;
		const slug = uniqueSlug(
			slugBase,
			betaApps.map((app) => app.id)
		);
		const now = dayjs();
		const nextApp: BetaApp = {
			id: slug,
			name,
			developer: url.hostname.replace(/^www\./, ""),
			version: "1.0.0",
			build: String(Math.floor(Date.now() / 1000)).slice(-5),
			url: normalizedUrl,
			status: "ready",
			expiresAt: now.add(90, "day").toISOString(),
			updatedAt: now.toISOString(),
		};
		const nextApps = [nextApp, ...betaApps];

		persistBetaApps(nextApps);
		setSelectedAppId(nextApp.id);
		setPreviewAppId("");
		setAppName("");
		setAppUrl("");
		setError("");
	};

	const openBetaApp = (app: BetaApp) => {
		const nextApps = betaApps.map((betaApp) =>
			betaApp.id === app.id
				? { ...betaApp, status: "testing" as BetaStatus }
				: betaApp
		);
		persistBetaApps(nextApps);
		setPreviewAppId(app.id);
		setIsSidebarCollapsed(true);
	};

	const removeBetaApp = (app: BetaApp) => {
		const nextApps = betaApps.filter((betaApp) => betaApp.id !== app.id);
		persistBetaApps(nextApps);
		setSelectedAppId(nextApps[0]?.id ?? "");
		if (previewAppId === app.id) {
			setPreviewAppId("");
		}
	};

	const previewApp =
		betaApps.find((app) => app.id === previewAppId) ??
		(selectedApp && previewAppId === selectedApp.id ? selectedApp : null);

	return (
		<div className="flex h-full overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]">
			<aside
				className={cn(
					"flex shrink-0 flex-col border-r border-black/10 bg-white/70 backdrop-blur-2xl transition-[width] duration-200",
					isSidebarCollapsed ? "w-[84px]" : "w-[340px]"
				)}
			>
				<div
					className={cn(
						"border-b border-black/5",
						isSidebarCollapsed ? "px-3 py-4" : "px-5 pb-5 pt-6"
					)}
				>
					<div
						className={cn(
							"flex items-center",
							isSidebarCollapsed ? "flex-col gap-3" : "gap-3"
						)}
					>
						<div
							className={cn(
								"flex min-w-0 items-center",
								isSidebarCollapsed ? "justify-center" : "gap-3"
							)}
						>
							<img
								src={TestFlightIcon}
								alt=""
								className={cn(
									"rounded-[22%] shadow-sm",
									isSidebarCollapsed ? "h-10 w-10" : "h-11 w-11"
								)}
							/>
							{!isSidebarCollapsed && (
								<div className="min-w-0">
									<h1 className="truncate text-xl font-semibold tracking-tight">
										TestFlight
									</h1>
									<p className="text-sm text-[#6e6e73]">
										{activeCount} active beta{activeCount === 1 ? "" : "s"}
									</p>
								</div>
							)}
						</div>
						<button
							type="button"
							aria-label={
								isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
							}
							title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
							onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
							className={cn(
								"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-slate-600 shadow-sm transition hover:bg-black/5",
								!isSidebarCollapsed && "ml-auto"
							)}
						>
							{isSidebarCollapsed ? (
								<PanelLeftOpen className="h-4 w-4" />
							) : (
								<PanelLeftClose className="h-4 w-4" />
							)}
						</button>
					</div>
				</div>

				{!isSidebarCollapsed && (
					<div className="border-b border-black/5 p-4">
						<div className="rounded-2xl border border-black/10 bg-white/80 p-3 shadow-sm">
							<div className="mb-3 text-sm font-semibold">
								Register beta app
							</div>
							<div className="space-y-2">
								<Input
									value={appName}
									onChange={(event) => setAppName(event.target.value)}
									placeholder="App name"
									className="h-9 rounded-lg border-black/10 bg-white"
								/>
								<Input
									value={appUrl}
									onChange={(event) => setAppUrl(event.target.value)}
									placeholder="https://your-app.test"
									className="h-9 rounded-lg border-black/10 bg-white"
								/>
								{error && (
									<p className="text-xs font-medium text-rose-600">{error}</p>
								)}
								<Button
									type="button"
									size="sm"
									className="w-full rounded-full bg-[#0a84ff] hover:bg-[#0071e3]"
									onClick={registerBetaApp}
								>
									<Link className="h-4 w-4" />
									Add Beta URL
								</Button>
							</div>
						</div>
					</div>
				)}

				<div
					className={cn(
						"flex-1 overflow-y-auto py-3",
						isSidebarCollapsed ? "px-2" : "px-3"
					)}
				>
					<div className="space-y-2">
						{betaApps.map((app) => {
							const isSelected = selectedApp?.id === app.id;
							const status = statusCopy[app.status];

							return (
								<button
									key={app.id}
									type="button"
									title={isSidebarCollapsed ? app.name : undefined}
									onClick={() => {
										setSelectedAppId(app.id);
										if (previewAppId !== app.id) {
											setPreviewAppId("");
										}
									}}
									className={cn(
										"relative flex w-full items-center rounded-2xl text-left transition",
										isSidebarCollapsed
											? "justify-center px-2 py-2"
											: "gap-3 px-3 py-3",
										isSelected
											? isSidebarCollapsed
												? "bg-[#dce8ff]"
												: "bg-[#dce8ff] shadow-sm"
											: "hover:bg-black/5"
									)}
								>
									<AppInitials name={app.name} flat={isSidebarCollapsed} />
									{!isSidebarCollapsed && (
										<>
											<div className="min-w-0 flex-1">
												<div className="flex items-center justify-between gap-2">
													<p className="truncate font-semibold text-slate-900">
														{app.name}
													</p>
													<span
														className={cn(
															"shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
															status.badge
														)}
													>
														{status.label}
													</span>
												</div>
												<p className="mt-0.5 truncate text-sm text-[#6e6e73]">
													{app.developer} · {app.version} ({app.build})
												</p>
											</div>
											<ChevronRight className="h-4 w-4 shrink-0 text-[#8e8e93]" />
										</>
									)}
									{isSidebarCollapsed && app.status === "testing" && (
										<div className="absolute mt-9 h-2 w-2 rounded-full bg-[#0a84ff] ring-2 ring-white" />
									)}
								</button>
							);
						})}
					</div>
				</div>
			</aside>

			<section className="flex min-w-0 flex-1 flex-col bg-[#f5f5f7]">
				{selectedApp ? (
					<div className={cn("min-h-0 flex-1", previewApp ? "p-0" : "p-5")}>
						<div
							className={cn(
								"flex h-full min-h-0 overflow-hidden bg-white",
								previewApp
									? "border-0 shadow-none"
									: "rounded-3xl border border-black/10 shadow-sm"
							)}
						>
							{previewApp ? (
								<iframe
									src={previewApp.url}
									title={`${previewApp.name} beta preview`}
									className="h-full w-full border-0 bg-white"
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
									referrerPolicy="no-referrer"
								/>
							) : (
								<div className="flex h-full min-h-[520px] w-full items-center justify-center px-8 text-center">
									<div className="max-w-sm">
										<div className="flex justify-center">
											<AppInitials name={selectedApp.name} size="lg" />
										</div>
										<h3 className="mt-5 text-2xl font-semibold">
											Ready to test
										</h3>
										<p className="mt-2 text-sm leading-6 text-[#6e6e73]">
											Click Run to load this beta URL in the TestFlight preview
											canvas.
										</p>
										<div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-black/10 bg-[#f7f7f9] p-3 text-left text-sm">
											<div>
												<p className="text-xs text-slate-500">Version</p>
												<p className="mt-1 font-semibold text-slate-900">
													{selectedApp.version}
												</p>
											</div>
											<div>
												<p className="text-xs text-slate-500">Build</p>
												<p className="mt-1 font-semibold text-slate-900">
													{selectedApp.build}
												</p>
											</div>
											<div>
												<p className="text-xs text-slate-500">Uploaded</p>
												<p className="mt-1 font-semibold text-slate-900">
													{dayjs(selectedApp.updatedAt).fromNow()}
												</p>
											</div>
											<div>
												<p className="text-xs text-slate-500">Expires</p>
												<p className="mt-1 font-semibold text-slate-900">
													{dayjs(selectedApp.expiresAt).format("D MMM")}
												</p>
											</div>
										</div>
										<div className="mt-5 flex flex-wrap items-center justify-center gap-2">
											<button
												type="button"
												onClick={() => openBetaApp(selectedApp)}
												className="inline-flex items-center gap-2 rounded-full bg-[#0a84ff] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0071e3]"
											>
												<Play className="h-4 w-4 fill-current" />
												{statusCopy[selectedApp.status].action}
											</button>
											<button
												type="button"
												onClick={() => removeBetaApp(selectedApp)}
												className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
											>
												<Trash2 className="h-4 w-4" />
												Remove
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="flex flex-1 items-center justify-center px-8">
						<div className="max-w-md text-center">
							<img
								src={TestFlightIcon}
								alt=""
								className="mx-auto h-14 w-14 rounded-[22%]"
							/>
							<h2 className="mt-5 text-2xl font-semibold text-slate-900">
								Register a beta app
							</h2>
							<p className="mt-3 text-sm leading-6 text-slate-500">
								Add any app URL in the sidebar to create a TestFlight beta and
								open it in the preview canvas.
							</p>
						</div>
					</div>
				)}
			</section>
		</div>
	);
}

function AppInitials({
	name,
	size = "md",
	flat = false,
}: {
	name: string;
	size?: "md" | "lg";
	flat?: boolean;
}) {
	return (
		<div
			className={cn(
				"flex shrink-0 items-center justify-center rounded-[22%] bg-gradient-to-br from-sky-400 to-cyan-500 font-bold text-white",
				!flat && "shadow-sm",
				size === "lg" ? "h-20 w-20 text-2xl" : "h-12 w-12 text-sm"
			)}
		>
			{name.slice(0, 2).toUpperCase()}
		</div>
	);
}

function readBetaApps(): BetaApp[] {
	const storedApps = storage.get(TESTFLIGHT_APPS_KEY);
	if (Array.isArray(storedApps)) {
		return storedApps;
	}

	storage.set(TESTFLIGHT_APPS_KEY, []);
	return [];
}

function normalizeUrl(url: string) {
	const trimmedUrl = url.trim();
	if (!trimmedUrl) {
		return null;
	}

	const withProtocol = /^https?:\/\//i.test(trimmedUrl)
		? trimmedUrl
		: `https://${trimmedUrl}`;

	try {
		const parsedUrl = new URL(withProtocol);
		return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"
			? parsedUrl.toString()
			: null;
	} catch {
		return null;
	}
}

function titleFromHost(host: string) {
	return host
		.replace(/^www\./, "")
		.split(".")[0]
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function uniqueSlug(base: string, usedIds: string[]) {
	let slug = base || "testflight-app";
	let index = 2;

	while (usedIds.includes(slug)) {
		slug = `${base}-${index}`;
		index += 1;
	}

	return slug;
}
