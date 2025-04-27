import LaunchpadIcon from "../assets/img/icons/launchpad.png";
import MailIcon from "../assets/img/icons/mail.png";
import MapIcon from "../assets/img/icons/map.png";
import CalendarIcon from "../assets/img/icons/calendar.png";
import PhotosIcon from "../assets/img/icons/photos.png";
import MessagesIcon from "../assets/img/icons/messages.png";
import FaceTimeIcon from "../assets/img/icons/facetime.png";
import MusicIcon from "../assets/img/icons/music.png";
import AppStoreIcon from "../assets/img/icons/store.png";
import NotesIcon from "../assets/img/icons/notes.png";
import CalculatorIcon from "../assets/img/icons/calculator.png";
import ContactsIcon from "../assets/img/icons/contacts.png";
import RemindersIcon from "../assets/img/icons/reminders.png";
import TVIcon from "../assets/img/icons/tv.png";
import BooksIcon from "../assets/img/icons/books.png";
import PodcastsIcon from "../assets/img/icons/podcasts.png";
import FindMyIcon from "../assets/img/icons/find-my.png";
import VoiceMemosIcon from "../assets/img/icons/memos.png";
import PreviewIcon from "../assets/img/icons/preview.png";
import TextEditIcon from "../assets/img/icons/textedit.png";
import TerminalIcon from "../assets/img/icons/terminal.png";
import AutomatorIcon from "../assets/img/icons/automator.png";
import CutProIcon from "../assets/img/icons/cut-pro.png";
import DeveloperIcon from "../assets/img/icons/developer.png";
import DictionaryIcon from "../assets/img/icons/dictionary.png";
import FreeFormIcon from "../assets/img/icons/freeform.png";
import GaragebandIcon from "../assets/img/icons/garageband.png";
import IMovieIcon from "../assets/img/icons/imovie.png";
import KeynoteIcon from "../assets/img/icons/keynote.png";
import NewsIcon from "../assets/img/icons/news.png";
import NumbersIcon from "../assets/img/icons/numbers.png";
import PagesIcon from "../assets/img/icons/pages.png";
import PhotoBoothIcon from "../assets/img/icons/photo-booth.png";
import PlaygroundIcon from "../assets/img/icons/playgrounds.png";
import QuicktimeIcon from "../assets/img/icons/quicktime.png";
import SettingsIcon from "../assets/img/icons/settings.png";
import ShortcutsIcon from "../assets/img/icons/shortcuts.png";
import SiriIcon from "../assets/img/icons/siri.png";
import StocksIcon from "../assets/img/icons/stocks.png";
import XcodeIcon from "../assets/img/icons/xcode.png";
import TrashIcon from "../assets/img/icons/trash.png";
import LoopIcon from "../assets/img/icons/loop.png";
import { useNavigate } from "react-router";
import storage from "@/utils/storage";
import { store } from "@/store/persistence";
import { setInstalledApps } from "@/store/slices/installedApps";

export interface AppConfig {
	id?: string;
	name: string;
	icon: string;
	slug: string;
	url?: string;
	onClick?: (navigate: ReturnType<typeof useNavigate>) => void;
	showInDock?: boolean;
	showInLaunchpad?: boolean;
	allow?: string;
	sandbox?: string;
}

export const initializeInstalledApps = (forceUpdate?: boolean) => {
	const installedApps = storage.get("installedApps");

	if (!installedApps || forceUpdate) {
		console.log("Setting installed apps");
		storage.set("installedApps", apps);
		store.dispatch(setInstalledApps(apps));
	} else {
		store.dispatch(setInstalledApps(installedApps));
	}
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
		showInDock: true,
		showInLaunchpad: true,
		slug: "facetime",
	},
	{
		name: "Loop",
		icon: LoopIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "loop",
	},
	{
		name: "Music",
		icon: MusicIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "music",
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
	{
		name: "Contacts",
		icon: ContactsIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "contacts",
	},
	{
		name: "Reminders",
		icon: RemindersIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "reminders",
	},
	{
		name: "TV",
		icon: TVIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "tv",
	},
	{
		name: "Books",
		icon: BooksIcon,
		showInDock: false,
		showInLaunchpad: true,
		slug: "books",
	},
	{
		name: "Podcasts",
		icon: PodcastsIcon,
		showInDock: false,
		showInLaunchpad: true,
		slug: "podcasts",
	},
	{
		name: "Find My",
		icon: FindMyIcon,
		showInLaunchpad: true,
		slug: "find-my",
	},
	{
		name: "Voice Memos",
		icon: VoiceMemosIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "voice-memos",
	},
	{
		name: "Preview",
		icon: PreviewIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "preview",
	},
	{
		name: "TextEdit",
		icon: TextEditIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "textedit",
	},
	{
		name: "Terminal",
		icon: TerminalIcon,
		showInDock: true,
		showInLaunchpad: true,
		slug: "terminal",
	},
	{
		name: "Developer",
		icon: DeveloperIcon,
		showInLaunchpad: true,
		slug: "developer",
	},
	{
		name: "Dictionary",
		icon: DictionaryIcon,
		showInLaunchpad: true,
		slug: "dictionary",
	},
	{
		name: "Freeform",
		icon: FreeFormIcon,
		showInLaunchpad: true,
		slug: "freeform",
	},
	{
		name: "GarageBand",
		icon: GaragebandIcon,
		showInLaunchpad: true,
		slug: "garageband",
	},
	{
		name: "iMovie",
		icon: IMovieIcon,
		showInLaunchpad: true,
		slug: "imovie",
	},
	{
		name: "Keynote",
		icon: KeynoteIcon,
		showInLaunchpad: true,
		slug: "keynote",
	},
	{
		name: "News",
		icon: NewsIcon,
		showInLaunchpad: true,
		slug: "news",
	},
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
	{
		name: "Photo Booth",
		icon: PhotoBoothIcon,
		showInLaunchpad: true,
		slug: "photo-booth",
	},
	{
		name: "Playground",
		icon: PlaygroundIcon,
		showInLaunchpad: true,
		slug: "playground",
	},
	{
		name: "QuickTime",
		icon: QuicktimeIcon,
		showInLaunchpad: true,
		slug: "quicktime",
	},
	{
		name: "Automator",
		icon: AutomatorIcon,
		showInLaunchpad: true,
		slug: "automator",
	},
	{
		name: "Final Cut Pro",
		icon: CutProIcon,
		showInLaunchpad: true,
		slug: "final-cut-pro",
	},
	{
		name: "Settings",
		icon: SettingsIcon,
		showInLaunchpad: true,
		slug: "settings",
	},
	{
		name: "Shortcuts",
		icon: ShortcutsIcon,
		showInLaunchpad: true,
		slug: "shortcuts",
	},
	{
		name: "Siri",
		icon: SiriIcon,
		showInLaunchpad: true,
		slug: "siri",
	},
	{
		name: "Stocks",
		icon: StocksIcon,
		showInLaunchpad: true,
		slug: "stocks",
	},
	{
		name: "Xcode",
		icon: XcodeIcon,
		showInLaunchpad: true,
		slug: "xcode",
	},
	...getDevApps(),
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

export function getDevApps() {
	if (window.location.hostname === "localhost") {
		return [
			{
				name: "Zrxb",
				icon: XcodeIcon,
				showInLaunchpad: true,
				slug: "zrxb",
				showInDock: true,
			},
		];
	}

	return [];
}

export const allApps = apps;
