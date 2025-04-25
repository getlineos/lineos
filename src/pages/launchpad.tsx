import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import wallpaper from "@/assets/img/wallpaper.jpg";
import { allApps } from "@/config/apps";

export default function Launchpad() {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				navigate("/");
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [navigate]);

	const handleBackgroundClick = () => {
		navigate("/");
	};

	const ITEMS_PER_PAGE = 35;
	const totalPages = Math.ceil(allApps.length / ITEMS_PER_PAGE);
	const currentApps = allApps
		.filter((app) => app.showInLaunchpad !== false)
		.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

	return (
		<div
			className="fixed inset-0 z-50"
			onClick={handleBackgroundClick}
			style={{
				backgroundImage: `url(${wallpaper})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 backdrop-blur-md bg-black/5">
				<div className="flex flex-col items-center justify-between h-full">
					<div
						className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 sm:gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-4 sm:gap-y-6 lg:gap-y-8 p-4 sm:p-8 lg:p-16 xl:p-24 pb-12 w-full max-w-[1400px] mx-auto overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						{currentApps.map((app) => (
							<div
								key={app.name}
								className="flex flex-col items-center gap-1 sm:gap-2 cursor-default"
								onClick={(e) => {
									e.stopPropagation();
									app.onClick?.(navigate);
								}}
							>
								<img
									src={app.icon}
									alt={app.name}
									className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
								/>
								<span className="text-white text-xs sm:text-sm text-center">
									{app.name}
								</span>
							</div>
						))}
					</div>

					{totalPages > 1 && (
						<div
							className="flex gap-2 h-8 sm:h-12"
							onClick={(e) => e.stopPropagation()}
						>
							{Array(totalPages)
								.fill(null)
								.map((_, index) => (
									<button
										key={index}
										className={`w-2 h-2 rounded-full transition-all duration-200 ${
											currentPage === index
												? "bg-white w-4"
												: "bg-white/50 hover:bg-white/70"
										}`}
										onClick={() => setCurrentPage(index)}
									/>
								))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
