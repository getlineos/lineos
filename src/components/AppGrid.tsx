import PlaceholderAppIcon from "@/assets/img/icons/placeholder.png";
import { getAppCategory, type AppCategory } from "@/config/appCategories";
import type { AppConfig } from "@/config/apps";
import type { RootState } from "@/store/persistence";
import { cn } from "@/utils";
import { openApp } from "@/utils/openApp";
import type { DragEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

type AppGridProps = {
	page?: number;
	itemsPerPage?: number;
	className?: string;
	itemClassName?: string;
	iconClassName?: string;
	labelClassName?: string;
	category?: AppCategory;
	onAppOpen?: () => void;
};

export default function AppGrid({
	page = 0,
	itemsPerPage,
	className,
	itemClassName,
	iconClassName,
	labelClassName,
	category = "All",
	onAppOpen,
}: AppGridProps) {
	const navigate = useNavigate();
	const apps = useSelector((state: RootState) => state.installedApps?.apps ?? []);
	const visibleApps = apps.filter(
		(app) =>
			app.showInLaunchpad !== false &&
			(category === "All" || getAppCategory(app) === category)
	);
	const currentApps =
		typeof itemsPerPage === "number"
			? visibleApps.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
			: visibleApps;

	const handleDragStart = (
		event: DragEvent<HTMLDivElement>,
		appSlug: string
	) => {
		event.dataTransfer.effectAllowed = "copy";
		event.dataTransfer.setData("application/x-lineos-app-slug", appSlug);
		event.dataTransfer.setData("text/plain", appSlug);
	};

	const handleOpenApp = (app: AppConfig, iconSrc: string) => {
		onAppOpen?.();
		openApp(navigate, { ...app, icon: iconSrc });
	};

	return (
		<div
			className={cn(
				"grid grid-cols-3 gap-x-8 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7",
				className
			)}
		>
			{currentApps.map((app) => {
				const iconSrc =
					typeof app.icon === "string" && app.icon.trim() !== ""
						? app.icon
						: PlaceholderAppIcon;

				return (
					<div
						key={app.slug}
						className={cn(
							"flex cursor-default flex-col items-center gap-2",
							itemClassName
						)}
						draggable
						onDragStart={(event) => handleDragStart(event, app.slug)}
						onClick={() => handleOpenApp(app, iconSrc)}
					>
						<img
							src={iconSrc}
							alt={app.name}
							onError={(e) => {
								const el = e.currentTarget;
								el.onerror = null;
								el.src = PlaceholderAppIcon;
							}}
							className={cn(
								"h-16 w-16 select-none object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24",
								iconClassName
							)}
						/>
						<span
							className={cn(
								"max-w-28 text-center text-sm font-medium leading-tight",
								labelClassName
							)}
						>
							{app.name}
						</span>
					</div>
				);
			})}
		</div>
	);
}
