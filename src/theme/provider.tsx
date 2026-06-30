import {
	CUSTOM_THEME_STORAGE_KEY,
	THEME_STORAGE_KEY,
	resolveTheme,
} from "@/theme/config";
import type { CustomTheme, ThemeConfig, ThemeId } from "@/theme/types";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";

type ThemeContextValue = {
	theme: ThemeConfig;
	themeId: ThemeId;
	hasChosenTheme: boolean;
	customTheme: CustomTheme;
	previewTheme: (themeId: ThemeId) => void;
	setTheme: (themeId: ThemeId) => void;
	saveCustomTheme: (customTheme: CustomTheme) => void;
};

const defaultCustomTheme: CustomTheme = {
	name: "Custom",
	css: "",
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme() {
	if (typeof window === "undefined") {
		return { themeId: "default" as ThemeId, hasChosenTheme: false };
	}

	const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
	const theme = resolveTheme(storedTheme);

	return {
		themeId: theme.id,
		hasChosenTheme: Boolean(storedTheme),
	};
}

function readCustomTheme(): CustomTheme {
	if (typeof window === "undefined") {
		return defaultCustomTheme;
	}

	try {
		const storedTheme = window.localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
		return storedTheme ? JSON.parse(storedTheme) : defaultCustomTheme;
	} catch {
		return defaultCustomTheme;
	}
}

export function LineOSThemeProvider({ children }: { children: ReactNode }) {
	const [themeState, setThemeState] = useState(readStoredTheme);
	const [previewThemeId, setPreviewThemeId] = useState<ThemeId | null>(null);
	const [customTheme, setCustomTheme] = useState(readCustomTheme);
	const theme = resolveTheme(previewThemeId ?? themeState.themeId);

	useEffect(() => {
		document.documentElement.dataset.lineosTheme = theme.id;
		document.documentElement.style.setProperty("--lineos-accent", theme.accent);
	}, [theme]);

	useEffect(() => {
		let customStyle = document.getElementById("lineos-custom-theme");
		if (!customStyle) {
			customStyle = document.createElement("style");
			customStyle.id = "lineos-custom-theme";
			document.head.appendChild(customStyle);
		}

		customStyle.textContent = customTheme.css;
	}, [customTheme.css]);

	const previewTheme = useCallback((themeId: ThemeId) => {
		const nextTheme = resolveTheme(themeId);
		setPreviewThemeId(nextTheme.id);
	}, []);

	const setTheme = useCallback((themeId: ThemeId) => {
		const nextTheme = resolveTheme(themeId);
		window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme.id);
		setPreviewThemeId(null);
		setThemeState({ themeId: nextTheme.id, hasChosenTheme: true });
	}, []);

	const saveCustomTheme = useCallback((nextCustomTheme: CustomTheme) => {
		window.localStorage.setItem(
			CUSTOM_THEME_STORAGE_KEY,
			JSON.stringify(nextCustomTheme)
		);
		setCustomTheme(nextCustomTheme);
	}, []);

	const value = useMemo(
		() => ({
			theme,
			themeId: theme.id,
			hasChosenTheme: themeState.hasChosenTheme,
			customTheme,
			previewTheme,
			setTheme,
			saveCustomTheme,
		}),
		[
			customTheme,
			previewTheme,
			saveCustomTheme,
			setTheme,
			theme,
			themeState.hasChosenTheme,
		]
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useLineOSTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useLineOSTheme must be used within LineOSThemeProvider");
	}

	return context;
}
