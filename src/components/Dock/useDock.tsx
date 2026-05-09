import { useState } from "react";
import type { DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/persistence";
import { pinAppToDock, unpinAppFromDock } from "@/store/slices/installedApps";

export default function useDock() {
	const [isDragOver, setIsDragOver] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const dispatch = useDispatch();

	const dockApps = useSelector((state: RootState) =>
		(state.installedApps?.apps ?? []).filter((app) => app.showInDock)
	);

	const onDragOver = (event: DragEvent<HTMLDivElement>) => {
		if (event.dataTransfer.types.includes("application/x-lineos-app-slug")) {
			event.preventDefault();
			event.dataTransfer.dropEffect = "copy";
			setIsDragOver(true);
		}
	};

	const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
			setIsDragOver(false);
		}
	};

	const onDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragOver(false);

		const slug = event.dataTransfer.getData("application/x-lineos-app-slug");
		if (slug) {
			dispatch(pinAppToDock(slug));
		}
	};

	const removeFromDock = (slug: string) => {
		dispatch(unpinAppFromDock(slug));
	};

	const onItemsMouseEnter = (itemIndex: number) => {
		setHoveredIndex(itemIndex);
	};

	const onItemsMouseLeave = () => {
		setHoveredIndex(null);
	};

	return {
		apps: dockApps,
		hoveredIndex,
		isDragOver,
		onDragOver,
		onDragLeave,
		onDrop,
		removeFromDock,
		onItemsMouseEnter,
		onItemsMouseLeave,
	};
}
