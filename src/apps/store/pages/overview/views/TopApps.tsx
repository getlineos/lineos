import { useEffect, useState } from "react";
import { appStoreService } from "../../../services/appStoreService";
import { Link } from "react-router";
import { Star } from "lucide-react";

export default function TopApps() {
	const [apps, setApps] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchApps() {
			try {
				const data = await appStoreService.getPublishedApps();
				setApps(data);
			} catch (error) {
				console.error("Failed to fetch apps:", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchApps();
	}, []);

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="text-sm text-[#6e6e73]">Loading top apps...</div>
			</div>
		);
	}

	return (
		<section className="mb-9">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-2xl font-semibold tracking-normal">
					Top Games & Apps
				</h2>
				<button className="text-sm font-semibold text-[#0071e3]">Show all</button>
			</div>

			<div className="rounded-[20px] bg-white p-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
				<div className="mb-4 flex space-x-2 overflow-x-auto">
					<button className="rounded-full bg-[#0071e3] px-4 py-2 text-sm font-semibold text-white">
						All
					</button>
					<button className="rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-semibold text-[#424245] hover:bg-black/[0.06]">
						Games
					</button>
					<button className="rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-semibold text-[#424245] hover:bg-black/[0.06]">
						Productivity
					</button>
					<button className="rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-semibold text-[#424245] hover:bg-black/[0.06]">
						Design
					</button>
					<button className="rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-semibold text-[#424245] hover:bg-black/[0.06]">
						Education
					</button>
				</div>

				<div className="grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3">
					{apps.map((app, index) => (
						<Link
							key={app.id}
							to={`/store/app/${app.id}`}
							className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-black/[0.035]"
						>
							<div className="relative">
								<div className="h-16 w-16 overflow-hidden rounded-[15px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]">
									<img
										src={app.icon}
										alt={app.name}
										width={64}
										height={64}
										className="h-full w-full object-cover"
									/>
								</div>
								<span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1d1d1f] text-xs font-bold text-white">
									{index + 1}
								</span>
							</div>
							<div className="min-w-0 flex-1">
								<h3 className="truncate text-sm font-semibold text-[#1d1d1f]">
									{app.name}
								</h3>
								<div className="mb-1 truncate text-xs text-[#6e6e73]">
									{app.category}
								</div>
								<div className="flex items-center text-xs text-[#6e6e73]">
									<Star className="h-3 w-3 fill-[#ffcc00] text-[#ffcc00]" />
									<span className="ml-1">{app.rating}</span>
								</div>
							</div>
							<span className="rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-bold text-[#0071e3]">
								GET
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
