import { MutableRefObject, useRef } from "react";
import { apps } from "../../config/apps";

export default function useDock() {
	const wrapperRef =
		useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

	const dockApps = apps.filter((app) => app.showInDock);

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

		if (itemIndex < dockApps.length - 1 && buttonElements[itemIndex + 1]) {
			buttonElements[itemIndex + 1].style.width = `${expandSize - 1.5}rem`;
		}

		if (itemIndex < dockApps.length - 1 && buttonElements[itemIndex + 2]) {
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

		if (itemIndex < dockApps.length - 1 && buttonElements[itemIndex + 1]) {
			buttonElements[itemIndex + 1].style.width = `${unexpandSize}em`;
		}

		if (itemIndex < dockApps.length - 1 && buttonElements[itemIndex + 2]) {
			buttonElements[itemIndex + 2].style.width = `${unexpandSize}em`;
		}
	};

	return { apps: dockApps, wrapperRef, onItemsMouseEnter, onItemsMouseLeave };
}
