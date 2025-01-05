import CalendarIcon from "assets/img/doc/calendar.png";
import ContactsIcon from "assets/img/doc/contacts.png";
import FacetimeIcon from "assets/img/doc/facetime.png";
import LaunchpadIcon from "assets/img/doc/launchpad.png";
import MailIcon from "assets/img/doc/mail.png";
import MapIcon from "assets/img/doc/map.png";
import MusicIcon from "assets/img/doc/music.png";
import NewsIcon from "assets/img/doc/news.png";
import NoteIcon from "assets/img/doc/note.png";
import PhotosIcon from "assets/img/doc/photos.png";
import PodcastIcon from "assets/img/doc/podcasts.png";
import SafariIcon from "assets/img/doc/safari.png";
import SettingsIcon from "assets/img/doc/settings.png";
import TodoIcon from "assets/img/doc/todo.png";
import TrashIcon from "assets/img/doc/trash.png";
import TVIcon from "assets/img/doc/tv.png";
import { MutableRefObject, useRef } from "react";

export default function useDock() {
	const wrapperRef =
		useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

	const apps = [
		{ name: "Launchpad", icon: LaunchpadIcon },
		{ name: "Safari", icon: SafariIcon },
		{
			name: "Mail",
			icon: MailIcon,
			onClick: () => window.open("https://www.gmail.com"),
		},
		{
			name: "Map",
			icon: MapIcon,
			onClick: () => window.open("https://map.google.com"),
		},
		{ name: "Photos", icon: PhotosIcon },
		{
			name: "Facetime",
			icon: FacetimeIcon,
			onClick: () => window.open("https://meet.google.com"),
		},
		{ name: "Calendar", icon: CalendarIcon },
		{ name: "Contacts", icon: ContactsIcon },
		{ name: "Todo", icon: TodoIcon },
		{ name: "Note", icon: NoteIcon },
		{ name: "Music", icon: MusicIcon },
		{ name: "TV", icon: TVIcon },
		{ name: "Podcast", icon: PodcastIcon },
		{
			name: "News",
			icon: NewsIcon,
			onClick: () => window.open("https://www.aljazeera.com/"),
		},
		{ name: "Settings", icon: SettingsIcon },
		{ name: "Trash", icon: TrashIcon },
	];

	const onItemsMouseEnter = (itemIndex: number) => {
		const expandSize = 7;

		const buttonElements = wrapperRef.current
			.children as HTMLCollectionOf<HTMLDivElement>;

		buttonElements[itemIndex].style.width = `${expandSize}rem`;

		if (itemIndex > 0 && buttonElements[itemIndex - 1]) {
			buttonElements[itemIndex - 1].style.width = `${expandSize - 1.5}rem`;
		}

		if (itemIndex > 0 && buttonElements[itemIndex - 2]) {
			buttonElements[itemIndex - 2].style.width = `${expandSize - 2.5}rem`;
		}

		if (itemIndex < apps.length - 1 && buttonElements[itemIndex + 1]) {
			buttonElements[itemIndex + 1].style.width = `${expandSize - 1.5}rem`;
		}

		if (itemIndex < apps.length - 1 && buttonElements[itemIndex + 2]) {
			buttonElements[itemIndex + 2].style.width = `${expandSize - 2.5}rem`;
		}
	};

	const onItemsMouseLeave = (itemIndex: number) => {
		const unexpandSize = 4;

		const buttonElements = wrapperRef.current
			.children as HTMLCollectionOf<HTMLDivElement>;

		buttonElements[itemIndex].style.width = `${unexpandSize}em`;

		if (itemIndex > 0 && buttonElements[itemIndex - 1]) {
			buttonElements[itemIndex - 1].style.width = `${unexpandSize}em`;
		}

		if (itemIndex > 0 && buttonElements[itemIndex - 2]) {
			buttonElements[itemIndex - 2].style.width = `${unexpandSize}em`;
		}

		if (itemIndex < apps.length - 1 && buttonElements[itemIndex + 1]) {
			buttonElements[itemIndex + 1].style.width = `${unexpandSize}em`;
		}

		if (itemIndex < apps.length - 1 && buttonElements[itemIndex + 2]) {
			buttonElements[itemIndex + 2].style.width = `${unexpandSize}em`;
		}
	};

	return { apps, wrapperRef, onItemsMouseEnter, onItemsMouseLeave };
}
