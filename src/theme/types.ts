export type ThemeId = "default" | "macos" | "windows" | "ubuntu" | "custom";

export type ThemeShell = "launchpad" | "macos" | "windows" | "ubuntu";

export type ThemeConfig = {
	id: ThemeId;
	name: string;
	description: string;
	shell: ThemeShell;
	accent: string;
	previewClassName: string;
};

export type CustomTheme = {
	name: string;
	css: string;
};

