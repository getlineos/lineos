import wallpaper from "@/assets/img/wallpaper.jpg";
import PlaceholderAppIcon from "@/assets/img/icons/placeholder.png";
import { RootState } from "@/store/persistence";
import { cn } from "@/utils";
import { openApp } from "@/utils/openApp";
import type { DragEvent } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Launchpad() {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(0);
	const apps = useSelector((state: RootState) => state.installedApps?.apps);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				navigate("/");
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [navigate]);

	const ITEMS_PER_PAGE = 28;
	const totalPages = Math.ceil(apps.length / ITEMS_PER_PAGE);
	const currentApps = apps
		.filter((app) => app.showInLaunchpad !== false)
		.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

	const handleDragStart = (
		event: DragEvent<HTMLDivElement>,
		appSlug: string
	) => {
		event.dataTransfer.effectAllowed = "copy";
		event.dataTransfer.setData("application/x-lineos-app-slug", appSlug);
		event.dataTransfer.setData("text/plain", appSlug);
	};

	return (
		<div
			className="fixed inset-0 z-50"
			style={{
				backgroundImage: `url(${wallpaper})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 backdrop-blur-md bg-black/5">
				<div className="flex flex-col items-center justify-center h-screen w-screen relative">
					<div className="grid grid-cols-6 xl:grid-cols-7 gap-x-16 mx-auto overflow-y-auto h-[calc(100vh-158px)] scrollbar-hide">
						{currentApps.map((app) => {
							const iconSrc =
								typeof app.icon === "string" && app.icon.trim() !== ""
									? app.icon
									: PlaceholderAppIcon;
							return (
								<div
									key={app.name}
									className="flex flex-col items-center gap-2 cursor-default"
									draggable
									onDragStart={(event) => handleDragStart(event, app.slug)}
									onClick={() => openApp(navigate, { ...app, icon: iconSrc })}
								>
									<img
										src={iconSrc}
										alt={app.name}
										onError={(e) => {
											const el = e.currentTarget;
											el.onerror = null;
											el.src = PlaceholderAppIcon;
										}}
										className="w-12 h-12 lg:w-24 lg:h-24"
									/>
									<span className="text-white text-xs sm:text-sm text-center">
										{app.name}
									</span>
								</div>
							);
						})}
					</div>

					{totalPages > 1 && (
						<PageDots
							totalPages={totalPages}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

const PageDots = ({ totalPages, currentPage, setCurrentPage }: any) => {
	return (
		<div
			className="flex gap-3 h-8 sm:h-12 absolute bottom-0 left-1/2 -translate-x-1/2"
			onClick={(e) => e.stopPropagation()}
		>
			{Array(totalPages)
				.fill(null)
				.map((_, index) => (
					<button
						key={index}
						className={cn(
							"w-2 h-2 rounded-full transition-all duration-200",
							currentPage === index
								? "bg-white"
								: "bg-white/50 hover:bg-white/70"
						)}
						onClick={() => setCurrentPage(index)}
					/>
				))}
		</div>
	);
};
