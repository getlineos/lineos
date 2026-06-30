import type { ThemeConfig, ThemeId } from "./types";

export const THEME_STORAGE_KEY = "lineos-theme";
export const CUSTOM_THEME_STORAGE_KEY = "lineos-custom-theme";

export const themes: ThemeConfig[] = [
	{
		id: "default",
		name: "Default",
		description: "A clean app launcher with your apps front and center.",
		shell: "launchpad",
		accent: "#2563eb",
		previewClassName: "from-slate-50 via-white to-blue-50",
	},
	{
		id: "macos",
		name: "macOS",
		description: "Menu bar, wallpaper, and a dock-first desktop.",
		shell: "macos",
		accent: "#0a84ff",
		previewClassName: "from-blue-700 via-violet-700 to-slate-950",
	},
	{
		id: "windows",
		name: "Windows",
		description: "Taskbar, centered apps, and a crisp workspace.",
		shell: "windows",
		accent: "#0078d4",
		previewClassName: "from-cyan-200 via-blue-500 to-indigo-800",
	},
	{
		id: "ubuntu",
		name: "Ubuntu",
		description: "A left launcher with warm Ubuntu-inspired chrome.",
		shell: "ubuntu",
		accent: "#e95420",
		previewClassName: "from-orange-500 via-purple-800 to-zinc-950",
	},
	{
		id: "custom",
		name: "Custom",
		description: "Use your own CSS variables and overrides.",
		shell: "launchpad",
		accent: "#14b8a6",
		previewClassName: "from-teal-100 via-white to-fuchsia-100",
	},
];

export const themeById = themes.reduce(
	(acc, theme) => {
		acc[theme.id] = theme;
		return acc;
	},
	{} as Record<ThemeId, ThemeConfig>
);

export function resolveTheme(themeId: string | null | undefined) {
	if (themeId && themeId in themeById) {
		return themeById[themeId as ThemeId];
	}

	return themeById.default;
}

