import LaunchpadIcon from "../assets/img/icons/launchpad.png";
import SafariIcon from "../assets/img/icons/safari.png";
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
import { useNavigate } from "react-router";

export interface AppConfig {
	name: string;
	icon: string;
	onClick?: (navigate: ReturnType<typeof useNavigate>) => void;
	showInDock?: boolean;
	showInLaunchpad?: boolean;
}

export const apps: AppConfig[] = [
	{
		name: "Launchpad",
		icon: LaunchpadIcon,
		showInDock: true,
		showInLaunchpad: false,
		onClick: (navigate) => navigate("/launchpad"),
	},
	{
		name: "Safari",
		icon: SafariIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Mail",
		icon: MailIcon,
		showInDock: true,
		showInLaunchpad: true,
		onClick: () => window.open("https://www.gmail.com"),
	},
	{
		name: "Maps",
		icon: MapIcon,
		showInDock: true,
		showInLaunchpad: true,
		onClick: () => window.open("https://map.google.com"),
	},
	{
		name: "Calendar",
		icon: CalendarIcon,
		showInDock: true,
		showInLaunchpad: true,
		onClick: () => window.open("https://calendar.google.com"),
	},
	{
		name: "Photos",
		icon: PhotosIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Messages",
		icon: MessagesIcon,
		showInDock: false,
		showInLaunchpad: true,
	},
	{
		name: "FaceTime",
		icon: FaceTimeIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Music",
		icon: MusicIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "App Store",
		icon: AppStoreIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Notes",
		icon: NotesIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Calculator",
		icon: CalculatorIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Contacts",
		icon: ContactsIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Reminders",
		icon: RemindersIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "TV",
		icon: TVIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Books",
		icon: BooksIcon,
		showInDock: false,
		showInLaunchpad: true,
	},
	{
		name: "Podcasts",
		icon: PodcastsIcon,
		showInDock: false,
		showInLaunchpad: true,
	},
	{
		name: "Find My",
		icon: FindMyIcon,
		showInLaunchpad: true,
	},
	{
		name: "Voice Memos",
		icon: VoiceMemosIcon,
		showInLaunchpad: true,
	},
	{
		name: "Preview",
		icon: PreviewIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "TextEdit",
		icon: TextEditIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Terminal",
		icon: TerminalIcon,
		showInDock: true,
		showInLaunchpad: true,
	},
	{
		name: "Developer",
		icon: DeveloperIcon,
		showInLaunchpad: true,
	},
	{
		name: "Dictionary",
		icon: DictionaryIcon,
		showInLaunchpad: true,
	},
	{
		name: "Freeform",
		icon: FreeFormIcon,
		showInLaunchpad: true,
	},
	{
		name: "GarageBand",
		icon: GaragebandIcon,
		showInLaunchpad: true,
	},
	{
		name: "iMovie",
		icon: IMovieIcon,
		showInLaunchpad: true,
	},
	{
		name: "Keynote",
		icon: KeynoteIcon,
		showInLaunchpad: true,
	},
	{
		name: "News",
		icon: NewsIcon,
		showInLaunchpad: true,
	},
	{
		name: "Numbers",
		icon: NumbersIcon,
		showInLaunchpad: true,
	},
	{
		name: "Pages",
		icon: PagesIcon,
		showInLaunchpad: true,
	},
	{
		name: "Photo Booth",
		icon: PhotoBoothIcon,
		showInLaunchpad: true,
	},
	{
		name: "Playground",
		icon: PlaygroundIcon,
		showInLaunchpad: true,
	},
	{
		name: "QuickTime",
		icon: QuicktimeIcon,
		showInLaunchpad: true,
	},
	{
		name: "Automator",
		icon: AutomatorIcon,
		showInLaunchpad: true,
	},
	{
		name: "Final Cut Pro",
		icon: CutProIcon,
		showInLaunchpad: true,
	},
	{
		name: "Settings",
		icon: SettingsIcon,
		showInLaunchpad: true,
	},
	{
		name: "Shortcuts",
		icon: ShortcutsIcon,
		showInLaunchpad: true,
	},
	{
		name: "Siri",
		icon: SiriIcon,
		showInLaunchpad: true,
	},
	{
		name: "Stocks",
		icon: StocksIcon,
		showInLaunchpad: true,
	},
	{
		name: "Xcode",
		icon: XcodeIcon,
		showInLaunchpad: true,
	},
	{
		name: "Trash",
		icon: TrashIcon,
		showInDock: true,
		showInLaunchpad: false,
	},
];

export const allApps = apps;
