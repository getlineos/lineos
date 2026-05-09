import { useNavigate } from "react-router";
import PlaceholderAppIcon from "@/assets/img/icons/placeholder.png";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { openApp } from "@/utils/openApp";
import useDock from "./useDock";
import { cn } from "@/utils";
import type { AppConfig } from "@/config/apps";

type ContextMenuState = {
	app: AppConfig;
	x: number;
	y: number;
} | null;

export default function Dock() {
	const navigate = useNavigate();
	const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
	const {
		apps,
		hoveredIndex,
		isDragOver,
		onDragOver,
		onDragLeave,
		onDrop,
		removeFromDock,
		onItemsMouseEnter,
		onItemsMouseLeave,
	} = useDock();

	useEffect(() => {
		if (!contextMenu) {
			return;
		}

		const closeMenu = () => setContextMenu(null);
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeMenu();
			}
		};

		window.addEventListener("click", closeMenu);
		window.addEventListener("keydown", closeOnEscape);

		return () => {
			window.removeEventListener("click", closeMenu);
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [contextMenu]);

	const openContextMenu = (
		event: MouseEvent<HTMLDivElement>,
		app: AppConfig
	) => {
		event.preventDefault();
		event.stopPropagation();
		setContextMenu({
			app,
			x: event.clientX,
			y: event.clientY,
		});
	};

	const handleOpenApp = (app: AppConfig) => {
		setContextMenu(null);
		openApp(navigate, app);
	};

	const handleRemoveFromDock = (slug: string) => {
		setContextMenu(null);
		removeFromDock(slug);
	};

	const handleShowInLaunchpad = () => {
		setContextMenu(null);
		navigate("/launchpad");
	};

	const dockTransition = "320ms cubic-bezier(0.22, 1, 0.36, 1)";

	const getDockItemScale = (index: number) => {
		if (hoveredIndex === null) {
			return 1;
		}

		const distance = Math.abs(index - hoveredIndex);
		if (distance === 0) {
			return 1.72;
		}
		if (distance === 1) {
			return 1.38;
		}
		if (distance === 2) {
			return 1.14;
		}
		return 1;
	};

	return (
		<TooltipProvider delayDuration={400}>
			<div
				className="absolute bottom-0 left-0 top-[28px] z-[999] flex w-[72px] items-center pl-1"
				onClick={() => navigate("/")}
			>
				<div
					className={cn(
						"w-[59px] min-h-[60px] overflow-visible bg-white bg-opacity-10 m-auto rounded-[18px] px-0.5 pb-1 pt-0.5 scrollbar-hide transition-all duration-300 ease-out",
						isDragOver && "bg-opacity-25 ring-2 ring-white/70"
					)}
					onDragOver={onDragOver}
					onDragLeave={onDragLeave}
					onDrop={onDrop}
				>
					<div
						className="flex flex-col items-start"
						onMouseLeave={onItemsMouseLeave}
					>
						{apps.map((app, idx) => {
							const { name, icon, slug } = app;
							const scale = getDockItemScale(idx);
							const tooltipOffset = Math.round(10 + 55 * (scale - 1));
							const iconSrc =
								typeof icon === "string" && icon.trim() !== ""
									? icon
									: PlaceholderAppIcon;
							return (
								<Tooltip key={name}>
									<TooltipTrigger asChild>
										<div
											className="relative flex w-[55px] items-center justify-start"
											style={{
												height: `${55 * scale}px`,
												transition: `height ${dockTransition}`,
												willChange: "height",
											}}
											onMouseEnter={() => onItemsMouseEnter(idx)}
											onContextMenu={(event) =>
												openContextMenu(event, {
													...app,
													icon: iconSrc,
												})
											}
											onClick={(e) => {
												e.stopPropagation();
												handleOpenApp({
													...app,
													name,
													icon: iconSrc,
													slug,
												});
											}}
										>
											<img
												src={iconSrc}
												alt={name}
												onError={(e) => {
													const el = e.currentTarget;
													el.onerror = null;
													el.src = PlaceholderAppIcon;
												}}
												className="h-[55px] w-[55px] select-none object-contain"
												style={{
													transform: `translateZ(0) scale(${scale})`,
													transformOrigin: "left center",
													transition: `transform ${dockTransition}, filter ${dockTransition}`,
													willChange: "transform",
												}}
											/>
										</div>
									</TooltipTrigger>
									<TooltipContent side="right" sideOffset={tooltipOffset}>
										{name}
									</TooltipContent>
								</Tooltip>
							);
						})}
					</div>
				</div>
			</div>
			{contextMenu && (
				<div
					className="fixed z-[1000] w-40 overflow-hidden rounded-md border border-black/10 bg-white/95 py-0.5 text-[12px] leading-none text-gray-900 shadow-lg backdrop-blur"
					style={{ left: contextMenu.x, top: contextMenu.y }}
					onClick={(event) => event.stopPropagation()}
					onContextMenu={(event) => event.preventDefault()}
				>
					<button
						type="button"
						className="flex w-full items-center px-2.5 py-1.5 text-left hover:bg-gray-100"
						onClick={() => handleOpenApp(contextMenu.app)}
					>
						Open
					</button>
					<button
						type="button"
						className="flex w-full items-center px-2.5 py-1.5 text-left hover:bg-gray-100"
						onClick={handleShowInLaunchpad}
					>
						Show in Launchpad
					</button>
					<div className="my-0.5 h-px bg-gray-200" />
					<button
						type="button"
						className="flex w-full items-center px-2.5 py-1.5 text-left text-red-600 hover:bg-red-50"
						onClick={() => handleRemoveFromDock(contextMenu.app.slug)}
					>
						Remove from Dock
					</button>
				</div>
			)}
		</TooltipProvider>
	);
}
