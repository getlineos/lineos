import { App } from "@/types/database";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { appStoreService } from "../../services/appStoreService";
import Ad from "./views/Ad";
import Categories from "./views/Categories";
import FeaturedApps from "./views/FeaturedApps";
import TopApps from "./views/TopApps";
import Trending from "./views/Trending";
import { Button } from "@/components/ui/button";

export default function OverviewPage() {
	return (
		<div className="grid grid-cols-3 gap-6">
			<div className="col-span-2">
				<FeaturedApps />
				<Categories />
				<TopApps />
				<AppList />
			</div>
			<div className="col-span-1">
				<Trending />
				<Ad />
			</div>
		</div>
	);
}

export function AppList() {
	const [apps, setApps] = useState<App[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchApps() {
			try {
				const data = await appStoreService.getPublishedApps();
				setApps(data);
			} catch (err) {
				setError("Failed to load apps. Please try again later.");
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchApps();
	}, []);

	if (isLoading) {
		return <div className="p-4">Loading apps...</div>;
	}

	if (error) {
		return <div className="p-4 text-red-500">{error}</div>;
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Featured Apps</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{apps.map((app) => (
					<Link
						to={`/app/${app.id}`}
						className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
					>
						<div className="flex items-start space-x-4">
							<img
								src={app.icon_url}
								alt={app.name}
								className="w-16 h-16 rounded-lg object-cover"
							/>
							<div className="flex-1">
								<h3 className="font-semibold text-lg">{app.name}</h3>
								<p className="text-gray-600 text-xs line-clamp-2">
									{app.description}
								</p>
								<Button
									onClick={(e) => {
										e.preventDefault();
										window.location.href = app.app_url;
									}}
									className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 font-medium"
								>
									Install
								</Button>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
