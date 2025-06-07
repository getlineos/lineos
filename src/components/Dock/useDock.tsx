import { MutableRefObject, useEffect, useRef, useState } from "react";
import { apps } from "../../config/apps";

export default function useDock() {
	const [initialDockHeight, setInitialDockHeight] = useState(0);

	const wrapperRef =
		useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
	const dockApps = apps.filter((app) => app.showInDock).slice(0, 12);

	useEffect(() => {
		if (wrapperRef.current) {
			setInitialDockHeight(wrapperRef.current.parentElement?.clientHeight || 0);
		}
	}, [wrapperRef]);

	const onItemsMouseEnter = (itemIndex: number) => {
		const expandSize = 6;

		const parentElement = wrapperRef.current.parentElement;
		if (parentElement) {
			parentElement.style.height = parentElement.clientHeight + 50 + "px";
		}

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
		const unexpandSize = 3.4375;

		const parentElement = wrapperRef.current.parentElement;
		if (parentElement) {
			parentElement.style.height = `${initialDockHeight}px`;
		}

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
