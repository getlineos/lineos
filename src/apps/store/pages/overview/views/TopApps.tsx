import { useEffect, useState } from "react";
import { appStoreService } from "../../../services/appStoreService";
import { Link } from "react-router";

export default function TopApps() {
	const [apps, setApps] = useState<any[]>([]);
	console.log("🚀 ~ TopApps ~ apps:", apps);
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
			<div className="flex items-center justify-center h-64">
				<div className="text-gray-500">Loading top apps...</div>
			</div>
		);
	}

	return (
		<div>
			<div className="flex items-center justify-between mt-8 mb-4">
				<h2 className="text-xl font-bold">Top Games & Apps</h2>
				<button className="text-blue-500 text-sm font-medium">Show all</button>
			</div>

			<div className="bg-white rounded-lg border border-gray-200 p-4">
				<div className="flex mb-4 overflow-x-auto space-x-2">
					<button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
						All
					</button>
					<button className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
						Games
					</button>
					<button className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
						Productivity
					</button>
					<button className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
						Design
					</button>
					<button className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
						Education
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{apps.map((app, index) => (
						<Link
							key={app.id}
							to={`/store/app/${app.id}`}
							className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50"
						>
							<div className="relative">
								<div className="w-16 h-16 rounded-xl overflow-hidden">
									<img
										src={app.icon}
										alt={app.name}
										width={64}
										height={64}
										className="w-full h-full object-cover"
									/>
								</div>
								<span className="absolute top-0 left-0 w-5 h-5 bg-gray-100 rounded-tl-xl rounded-br-xl flex items-center justify-center text-xs font-medium">
									{index + 1}
								</span>
							</div>
							<div className="flex-1">
								<h3 className="font-medium text-sm mb-1">{app.name}</h3>
								<div className="text-xs text-gray-500 mb-1.5">
									{app.category}
								</div>
								<div className="flex items-center">
									<div className="flex">
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												className={`w-3 h-3 ${
													i < app.rating ? "text-yellow-400" : "text-gray-300"
												}`}
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
										))}
									</div>
									<span className="text-xs ml-1">{app.rating}</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
