import { store } from "@/store/persistence";
import { setInstalledApps } from "@/store/slices/installedApps";
import storage from "@/utils/storage";
import { useNavigate } from "react-router";
import devConfig from "../../dev.config.json";
import CalculatorIcon from "../assets/img/icons/calculator.png";
import CalendarIcon from "../assets/img/icons/calendar.png";
import FaceTimeIcon from "../assets/img/icons/facetime.png";
import FreeFormIcon from "../assets/img/icons/freeform.png";
import KeynoteIcon from "../assets/img/icons/keynote.png";
import LaunchpadIcon from "../assets/img/icons/launchpad.png";
import MailIcon from "../assets/img/icons/mail.png";
import MapIcon from "../assets/img/icons/map.png";
import MessagesIcon from "../assets/img/icons/messages.png";
import MusicIcon from "../assets/img/icons/music.png";
import NotesIcon from "../assets/img/icons/notes.png";
import NumbersIcon from "../assets/img/icons/numbers.png";
import PagesIcon from "../assets/img/icons/pages.png";
import PhotosIcon from "../assets/img/icons/photos.png";
import SettingsIcon from "../assets/img/icons/settings.png";
import AppStoreIcon from "../assets/img/icons/store.png";
import TerminalIcon from "../assets/img/icons/terminal.png";
import TestFlightIcon from "../assets/img/icons/testflight.png";
import TrashIcon from "../assets/img/icons/trash.png";

type DevIframeApp = {
	slug: string;
	dir?: string;
	port?: number;
};

export interface AppConfig {
	id?: string | number;
	name: string;
	icon?: string;
	slug: string;
	url?: string;
	onClick?: (navigate: ReturnType<typeof useNavigate>) => void;
	showInDock?: boolean;
	showInLaunchpad?: boolean;
	category?: string;
	subcategory?: string;
	allow?: string;
	sandbox?: string;
}

type DbApp = {
	id: number;
	name: string;
	slug: string;
	icon_url: string;
	app_url: string;
	primary_category?: string;
	subcategory?: string;
};

export const initializeInstalledApps = async (forceUpdate?: boolean) => {
	const storedApps = storage.get("installedApps");
	const installedApps = Array.isArray(storedApps) ? storedApps : [];
	const dbApps = await getDbApps();
	const dbAppsBySlug = new Map(dbApps.map((app) => [app.slug, app]));
	const installedAppsBySlug = new Map(
		installedApps.map((app: AppConfig) => [app.slug, app])
	);
	const configuredApps = dedupeAppConfigsBySlug(
		apps.map((app) =>
			mergeDbAppConfig(
				mergeInstalledAppConfig(app, installedAppsBySlug),
				dbAppsBySlug
			)
		)
	);

	if (!installedApps.length || forceUpdate) {
		console.log("Setting installed apps");
		storage.set("installedApps", configuredApps);
		store.dispatch(setInstalledApps(configuredApps));
	} else {
		const mergedApps = dedupeAppConfigsBySlug([
			...configuredApps,
			...installedApps
				.filter(
					(installedApp: AppConfig) =>
						!configuredApps.some(
							(defaultApp) => defaultApp.slug === installedApp.slug
						)
				)
				.map((app: AppConfig) => mergeDbAppConfig(app, dbAppsBySlug)),
		]);
		storage.set("installedApps", mergedApps);
		store.dispatch(setInstalledApps(mergedApps));
	}
};

async function getDbApps(): Promise<AppConfig[]> {
	try {
		const rows = await Promise.all([
			fetchDbAppRows("/api/apps?status=approved"),
			fetchDbAppRows("/api/apps"),
		]);
		return dedupeBySlug(rows.flat()).map((app) => ({
			id: app.id,
			name: app.name,
			icon: app.icon_url,
			slug: app.slug,
			url: app.app_url || getStandaloneAppUrl(app.slug),
			category: app.primary_category,
			subcategory: app.subcategory,
			showInDock: false,
			showInLaunchpad: true,
			sandbox: "allow-same-origin allow-scripts allow-forms",
		}));
	} catch (error) {
		console.warn("Failed to load apps from database", error);
		return [];
	}
}

async function fetchDbAppRows(path: string): Promise<DbApp[]> {
	try {
		const response = await fetch(path, {
			credentials: "include",
		});
		if (!response.ok) {
			return [];
		}

		return response.json();
	} catch {
		return [];
	}
}

function dedupeBySlug(apps: DbApp[]) {
	const appsBySlug = new Map<string, DbApp>();
	for (const app of apps) {
		appsBySlug.set(app.slug, app);
	}
	return [...appsBySlug.values()];
}

function dedupeAppConfigsBySlug(apps: AppConfig[]) {
	const appsBySlug = new Map<string, AppConfig>();
	for (const app of apps) {
		appsBySlug.set(app.slug, app);
	}
	return [...appsBySlug.values()];
}

function mergeDbAppConfig(
	app: AppConfig,
	dbAppsBySlug: Map<string, AppConfig>
): AppConfig {
	const dbApp = dbAppsBySlug.get(app.slug);
	if (!dbApp) {
		return app;
	}

	return {
		...app,
		id: dbApp.id,
		name: dbApp.name || app.name,
		icon: dbApp.icon || app.icon,
		url: dbApp.url || app.url,
		category: dbApp.category || app.category,
		subcategory: dbApp.subcategory || app.subcategory,
	};
}

function mergeInstalledAppConfig(
	app: AppConfig,
	installedAppsBySlug: Map<string, AppConfig>
): AppConfig {
	const installedApp = installedAppsBySlug.get(app.slug);
	if (!installedApp) {
		return app;
	}

	return {
		...app,
		id: installedApp.id ?? app.id,
		icon: installedApp.icon || app.icon,
		url: installedApp.url || app.url,
		showInDock: installedApp.showInDock ?? app.showInDock,
		showInLaunchpad: installedApp.showInLaunchpad ?? app.showInLaunchpad,
	};
}

const getStandaloneAppUrl = (appName: string) => {
	if (import.meta.env.DEV) {
		const entry = devConfig.apps?.find(
			(app: DevIframeApp) => app.slug === appName
		);
		if (entry && typeof entry.port === "number") {
			return `http://127.0.0.1:${entry.port}/${appName}/`;
		}
		return `http://127.0.0.1:${devConfig.proxyPort}/${appName}/`;
	}

	return `/apps/${appName}/`;
};

export const apps: AppConfig[] = [
	{
		name: "Launchpad",
		icon: LaunchpadIcon,
		slug: "launchpad",
		showInDock: true,
		showInLaunchpad: false,
	},
	{
		name: "Mail",
		icon: MailIcon,
		slug: "mail",
		url: "https://mail.google.com",
		showInDock: true,
		showInLaunchpad: true,
		allow:
			"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
		sandbox: "allow-same-origin allow-scripts allow-popups allow-forms",
	},
	{
		name: "Maps",
		icon: MapIcon,
		slug: "maps",
		url: "https://satellites.pro",
		showInDock: true,
		showInLaunchpad: true,
		allow:
			"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
		sandbox: "allow-same-origin allow-scripts allow-popups allow-forms",
	},
	{
		name: "Calendar",
		icon: CalendarIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "calendar",
	},
	{
		name: "Photos",
		icon: PhotosIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "photos",
	},
	{
		name: "Messages",
		icon: MessagesIcon,
		showInDock: false,
		showInLaunchpad: true,
		slug: "messages",
	},
	{
		name: "FaceTime",
		icon: FaceTimeIcon,
		showInLaunchpad: true,
		slug: "facetime",
	},
	{
		name: "Music",
		icon: MusicIcon,
		showInLaunchpad: true,
		slug: "music",
		url: getStandaloneAppUrl("music"),
		sandbox: "allow-same-origin allow-scripts allow-forms",
	},
	{
		name: "App Store",
		icon: AppStoreIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "store",
	},
	{
		name: "Notes",
		icon: NotesIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "notes",
	},
	{
		name: "Calculator",
		icon: CalculatorIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "calculator",
	},
	// {
	// 	name: "Contacts",
	// 	icon: ContactsIcon,
	// 	showInLaunchpad: true,
	// 	slug: "contacts",
	// },
	// {
	// 	name: "Reminders",
	// 	icon: RemindersIcon,
	// 	showInLaunchpad: true,
	// 	slug: "reminders",
	// },
	// {
	//   name: "TV",
	//   icon: TVIcon,
	//   showInLaunchpad: true,
	//   slug: "tv",
	// },
	// {
	//   name: "Books",
	//   icon: BooksIcon,
	//   showInDock: false,
	//   showInLaunchpad: true,
	//   slug: "books",
	// },
	// {
	//   name: "Podcasts",
	//   icon: PodcastsIcon,
	//   showInDock: false,
	//   showInLaunchpad: true,
	//   slug: "podcasts",
	// },
	// {
	//   name: "Find My",
	//   icon: FindMyIcon,
	//   showInLaunchpad: true,
	//   slug: "find-my",
	// },
	// {
	// 	name: "Voice Memos",
	// 	icon: VoiceMemosIcon,
	// 	showInLaunchpad: true,
	// 	slug: "voice-memos",
	// },
	// {
	// 	name: "Preview",
	// 	icon: PreviewIcon,
	// 	showInLaunchpad: true,
	// 	slug: "preview",
	// },
	// {
	// 	name: "TextEdit",
	// 	icon: TextEditIcon,
	// 	showInLaunchpad: true,
	// 	slug: "textedit",
	// },
	{
		name: "Terminal",
		icon: TerminalIcon,
		showInLaunchpad: true,
		slug: "terminal",
	},
	// {
	// 	name: "Developer",
	// 	icon: DeveloperIcon,
	// 	showInLaunchpad: true,
	// 	slug: "developer",
	// },
	{
		name: "TestFlight",
		icon: TestFlightIcon,
		showInLaunchpad: true,
		slug: "testflight",
	},
	// {
	// 	name: "Dictionary",
	// 	icon: DictionaryIcon,
	// 	showInLaunchpad: true,
	// 	slug: "dictionary",
	// },
	{
		name: "Freeform",
		icon: FreeFormIcon,
		showInLaunchpad: true,
		slug: "freeform",
	},
	// {
	// 	name: "GarageBand",
	// 	icon: GaragebandIcon,
	// 	showInLaunchpad: true,
	// 	slug: "garageband",
	// },
	// {
	// 	name: "iMovie",
	// 	icon: IMovieIcon,
	// 	showInLaunchpad: true,
	// 	slug: "imovie",
	// },
	{
		name: "Keynote",
		icon: KeynoteIcon,
		showInLaunchpad: true,
		slug: "keynote",
	},
	// {
	// 	name: "News",
	// 	icon: NewsIcon,
	// 	showInLaunchpad: true,
	// 	slug: "news",
	// },
	{
		name: "Numbers",
		icon: NumbersIcon,
		showInLaunchpad: true,
		slug: "numbers",
	},
	{
		name: "Pages",
		icon: PagesIcon,
		showInLaunchpad: true,
		slug: "pages",
	},
	// {
	// 	name: "Photo Booth",
	// 	icon: PhotoBoothIcon,
	// 	showInLaunchpad: true,
	// 	slug: "photo-booth",
	// },
	// {
	// 	name: "Playground",
	// 	icon: PlaygroundIcon,
	// 	showInLaunchpad: true,
	// 	slug: "playground",
	// },
	// {
	// 	name: "QuickTime",
	// 	icon: QuicktimeIcon,
	// 	showInLaunchpad: true,
	// 	slug: "quicktime",
	// },
	// {
	// 	name: "Automator",
	// 	icon: AutomatorIcon,
	// 	showInLaunchpad: true,
	// 	slug: "automator",
	// },
	// {
	// 	name: "Final Cut Pro",
	// 	icon: CutProIcon,
	// 	showInLaunchpad: true,
	// 	slug: "final-cut-pro",
	// },
	{
		name: "Settings",
		icon: SettingsIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "settings",
	},
	// {
	// 	name: "Shortcuts",
	// 	icon: ShortcutsIcon,
	// 	showInLaunchpad: true,
	// 	slug: "shortcuts",
	// },
	// {
	// 	name: "Siri",
	// 	icon: SiriIcon,
	// 	showInLaunchpad: true,
	// 	slug: "siri",
	// },
	// {
	// 	name: "Stocks",
	// 	icon: StocksIcon,
	// 	showInLaunchpad: true,
	// 	slug: "stocks",
	// },
	// {
	// 	name: "Xcode",
	// 	icon: XcodeIcon,
	// 	showInLaunchpad: true,
	// 	slug: "xcode",
	// },
	{
		name: "Trash",
		icon: TrashIcon,
		showInDock: true,
		showInLaunchpad: false,
		slug: "trash",
	},
];

export const getInstalledApps = () => {
	const installedApps = storage.get("installedApps");
	return [...apps, ...installedApps];
};

export const allApps = apps;
