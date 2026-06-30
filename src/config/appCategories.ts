import type { AppConfig } from "./apps";

export const appCategories = [
	"All",
	"Productivity",
	"Utilities",
	"Developer Tools",
	"Creativity",
	"Media",
	"Communication",
] as const;

export type AppCategory = (typeof appCategories)[number];

const categoryBySlug: Record<string, AppCategory> = {
	"app-store": "Utilities",
	store: "Utilities",
	launchpad: "Utilities",
	settings: "Utilities",
	trash: "Utilities",
	mail: "Communication",
	messages: "Communication",
	facetime: "Communication",
	contacts: "Communication",
	maps: "Communication",
	weather: "Utilities",
	calendar: "Productivity",
	reminders: "Productivity",
	notes: "Productivity",
	freeform: "Productivity",
	pages: "Productivity",
	numbers: "Productivity",
	keynote: "Productivity",
	calculator: "Utilities",
	"pdf-toolkit": "Utilities",
	"image-toolkit": "Creativity",
	"json-formatter": "Developer Tools",
	loop: "Productivity",
	"expense-tracker": "Productivity",
	music: "Media",
	photos: "Creativity",
	"photo-booth": "Creativity",
	tv: "Media",
	books: "Productivity",
	podcasts: "Media",
	"voice-memos": "Media",
	preview: "Utilities",
	textedit: "Productivity",
	terminal: "Developer Tools",
	developer: "Developer Tools",
	xcode: "Developer Tools",
	dictionary: "Productivity",
	garageband: "Creativity",
	imovie: "Creativity",
	news: "Communication",
	playground: "Developer Tools",
	quicktime: "Media",
	automator: "Utilities",
	"final-cut-pro": "Creativity",
	shortcuts: "Utilities",
	siri: "Utilities",
	stocks: "Productivity",
	"find-my": "Utilities",
};

const categoryAliases: Record<string, AppCategory> = {
	business: "Productivity",
	education: "Productivity",
	finance: "Productivity",
	games: "Media",
	internet: "Communication",
	lifestyle: "Utilities",
	"graphics & design": "Creativity",
	design: "Creativity",
	development: "Developer Tools",
	"developer tools": "Developer Tools",
	photo: "Creativity",
	video: "Media",
	music: "Media",
	weather: "Utilities",
	system: "Utilities",
};

export function getAppCategory(app: AppConfig): AppCategory {
	const explicitCategory = normalizeCategory(app.category);
	if (explicitCategory) {
		return explicitCategory;
	}

	return categoryBySlug[app.slug] ?? "Utilities";
}

function normalizeCategory(category?: string): AppCategory | null {
	if (!category) {
		return null;
	}

	const matchingCategory = appCategories.find(
		(appCategory) => appCategory.toLowerCase() === category.toLowerCase()
	);

	if (matchingCategory && matchingCategory !== "All") {
		return matchingCategory;
	}

	return categoryAliases[category.toLowerCase()] ?? null;
}
