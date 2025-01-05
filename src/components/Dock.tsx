import LaunchpadIcon from "assets/img/doc/launchpad.png";
import CalendarIcon from "assets/img/doc/calendar.png";
import MailIcon from "assets/img/doc/mail.png";
import MapIcon from "assets/img/doc/map.png";
import MusicIcon from "assets/img/doc/music.png";
import NoteIcon from "assets/img/doc/note.png";
import PhotosIcon from "assets/img/doc/photos.png";
import SafariIcon from "assets/img/doc/safari.png";
import TodoIcon from "assets/img/doc/todo.png";
import ContactsIcon from "assets/img/doc/contacts.png";
import FacetimeIcon from "assets/img/doc/facetime.png";
import TrashIcon from "assets/img/doc/trash.png";
import NewsIcon from "assets/img/doc/news.png";
import PodcastIcon from "assets/img/doc/podcasts.png";
import SettingsIcon from "assets/img/doc/settings.png";
import TVIcon from "assets/img/doc/tv.png";

const apps = [
	{ name: "Launchpad", icon: LaunchpadIcon },
	{ name: "Safari", icon: SafariIcon },
	{ name: "Mail", icon: MailIcon },
	{ name: "Map", icon: MapIcon },
	{ name: "Photos", icon: PhotosIcon },
	{ name: "Facetime", icon: FacetimeIcon },
	{ name: "Calendar", icon: CalendarIcon },
	{ name: "Contacts", icon: ContactsIcon },
	{ name: "Todo", icon: TodoIcon },
	{ name: "Note", icon: NoteIcon },
	{ name: "Music", icon: MusicIcon },
	{ name: "TV", icon: TVIcon },
	{ name: "Podcast", icon: PodcastIcon },
	{ name: "News", icon: NewsIcon },
	{ name: "Settings", icon: SettingsIcon },
	{ name: "Trash", icon: TrashIcon },
];

export default function Dock() {
	return (
		<div className="flex h-[70px] flex-row justify-center items-center bg-white fixed bottom-2 left-0 right-0 px-2 bg-opacity-10 w-max m-auto rounded-[18px]">
			{apps.map((app) => (
				<img key={app.name} src={app.icon} className="w-14 h-14" />
			))}
		</div>
	);
}
