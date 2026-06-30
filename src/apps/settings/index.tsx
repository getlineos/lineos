import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { themes } from "@/theme/config";
import { useLineOSTheme } from "@/theme/provider";
import type { ThemeId } from "@/theme/types";
import { cn } from "@/utils";
import {
	Check,
	ChevronRight,
	Info,
	Monitor,
	Palette,
	Settings2,
	SlidersHorizontal,
	Upload,
} from "lucide-react";
import { useState } from "react";

const sections = [
	{ id: "appearance", label: "Appearance", icon: Palette },
	{ id: "desktop", label: "Desktop", icon: Monitor },
	{ id: "advanced", label: "Advanced", icon: SlidersHorizontal },
	{ id: "about", label: "About", icon: Info },
] as const;

export default function SettingsApp() {
	const { themeId, setTheme, customTheme, saveCustomTheme } = useLineOSTheme();
	const [activeSection, setActiveSection] =
		useState<(typeof sections)[number]["id"]>("appearance");
	const [customCss, setCustomCss] = useState(customTheme.css);

	const handleThemeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onload = () => setCustomCss(String(reader.result ?? ""));
		reader.readAsText(file);
	};

	const applyCustomTheme = () => {
		saveCustomTheme({ name: "Custom", css: customCss });
		setTheme("custom");
	};

	return (
		<div className="flex h-full overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]">
			<aside className="w-[220px] border-r border-black/10 bg-white/55 p-3 backdrop-blur-2xl">
				<div className="mb-4 flex items-center gap-2 px-2 pt-1">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d8e7ff] text-[#0a84ff]">
						<Settings2 className="h-4 w-4" />
					</div>
					<div>
						<h1 className="text-sm font-semibold">Settings</h1>
						<p className="text-xs text-[#6e6e73]">LineOS</p>
					</div>
				</div>

				<nav className="space-y-1">
					{sections.map(({ id, label, icon: Icon }) => {
						const isActive = activeSection === id;
						return (
							<button
								key={id}
								type="button"
								className={cn(
									"flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-sm transition",
									isActive
										? "bg-[#dce8ff] text-[#1d1d1f]"
										: "text-[#3a3a3c] hover:bg-black/5"
								)}
								onClick={() => setActiveSection(id)}
							>
								<Icon className="h-4 w-4 text-[#0a84ff]" />
								<span className="min-w-0 flex-1 truncate">{label}</span>
								{isActive && <ChevronRight className="h-3.5 w-3.5" />}
							</button>
						);
					})}
				</nav>
			</aside>

			<main className="min-w-0 flex-1 overflow-y-auto px-8 py-6">
				<div className="mx-auto max-w-3xl">
					<header className="mb-5">
						<h2 className="text-[28px] font-semibold tracking-normal">
							{sectionTitle(activeSection)}
						</h2>
					</header>

					{activeSection === "appearance" && (
						<div className="space-y-4">
							<SettingsGroup title="Theme">
								<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
									{themes.map((theme) => (
										<ThemeOption
											key={theme.id}
											id={theme.id}
											name={theme.name}
											description={theme.description}
											previewClassName={theme.previewClassName}
											isActive={themeId === theme.id}
											onSelect={setTheme}
										/>
									))}
								</div>
							</SettingsGroup>
						</div>
					)}

					{activeSection === "desktop" && (
						<div className="space-y-4">
							<SettingsGroup title="Default Home">
								<SettingRow
									label="Launcher"
									detail="Default theme uses compact app icons with hover category bars."
									value="Enabled"
								/>
								<SettingRow
									label="Current theme"
									detail="Changes apply instantly across LineOS."
									value={themes.find((theme) => theme.id === themeId)?.name}
								/>
							</SettingsGroup>
						</div>
					)}

					{activeSection === "advanced" && (
						<div className="space-y-4">
							<SettingsGroup title="Custom Theme">
								<div className="space-y-3 p-4">
									<div>
										<label
											htmlFor="lineos-custom-css"
											className="text-sm font-medium"
										>
											CSS overrides
										</label>
										<p className="mt-1 text-xs leading-5 text-[#6e6e73]">
											Save CSS variables or overrides for this browser.
										</p>
									</div>
									<Textarea
										id="lineos-custom-css"
										value={customCss}
										onChange={(event) => setCustomCss(event.target.value)}
										className="min-h-44 rounded-lg border-black/10 bg-white/80 font-mono text-xs"
										placeholder={`:root {
  --custom-lineos-bg: linear-gradient(135deg, #f8fafc, #dbeafe);
  --custom-lineos-text: #0f172a;
  --custom-lineos-accent: #2563eb;
}`}
									/>
									<div className="flex flex-wrap items-center gap-2">
										<Button type="button" size="sm" onClick={applyCustomTheme}>
											<Palette className="h-4 w-4" />
											Apply Custom Theme
										</Button>
										<label
											htmlFor="lineos-custom-theme-file"
											className="inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-3 text-xs font-medium shadow-sm hover:bg-black/5"
										>
											<Upload className="h-4 w-4" />
											Upload CSS
										</label>
										<input
											id="lineos-custom-theme-file"
											type="file"
											accept=".css,text/css"
											className="hidden"
											onChange={handleThemeFile}
										/>
									</div>
								</div>
							</SettingsGroup>
						</div>
					)}

					{activeSection === "about" && (
						<div className="space-y-4">
							<SettingsGroup title="LineOS">
								<SettingRow label="Version" value="0.0.0" />
								<SettingRow
									label="Theme"
									value={themes.find((theme) => theme.id === themeId)?.name}
								/>
								<SettingRow label="Settings URL" value="/settings" />
							</SettingsGroup>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}

function SettingsGroup({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section>
			<h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">
				{title}
			</h3>
			<div className="overflow-hidden rounded-xl border border-black/10 bg-white/80 shadow-sm">
				{children}
			</div>
		</section>
	);
}

function SettingRow({
	label,
	detail,
	value,
}: {
	label: string;
	detail?: string;
	value?: string;
}) {
	return (
		<div className="flex min-h-11 items-center justify-between gap-4 border-b border-black/5 px-4 py-2 last:border-b-0">
			<div>
				<div className="text-sm font-medium">{label}</div>
				{detail && <p className="mt-0.5 text-xs text-[#6e6e73]">{detail}</p>}
			</div>
			{value && (
				<div className="shrink-0 text-right text-sm text-[#6e6e73]">{value}</div>
			)}
		</div>
	);
}

function ThemeOption({
	id,
	name,
	description,
	previewClassName,
	isActive,
	onSelect,
}: {
	id: ThemeId;
	name: string;
	description: string;
	previewClassName: string;
	isActive: boolean;
	onSelect: (themeId: ThemeId) => void;
}) {
	return (
		<button
			type="button"
			className={cn(
				"flex gap-3 border-b border-black/5 p-3 text-left transition last:border-b-0 sm:border-b-0",
				isActive ? "bg-[#eef5ff]" : "hover:bg-black/[0.03]"
			)}
			onClick={() => onSelect(id)}
		>
			<div
				className={cn(
					"mt-0.5 h-12 w-16 shrink-0 rounded-lg bg-gradient-to-br shadow-inner",
					previewClassName
				)}
			/>
			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-2">
					<span className="text-sm font-semibold">{name}</span>
					{isActive && <Check className="h-4 w-4 text-[#0a84ff]" />}
				</div>
				<p className="mt-1 line-clamp-2 text-xs leading-5 text-[#6e6e73]">
					{description}
				</p>
			</div>
		</button>
	);
}

function sectionTitle(section: (typeof sections)[number]["id"]) {
	switch (section) {
		case "desktop":
			return "Desktop";
		case "advanced":
			return "Advanced";
		case "about":
			return "About";
		default:
			return "Appearance";
	}
}

