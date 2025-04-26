import { useEffect, useState } from "react";
import { appStoreService } from "../../services/appStoreService";
import { App } from "@/types/database";
import AppCard from "../../components/AppCard";

export default function DeveloperApps() {
	const [apps, setApps] = useState<App[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchMyApps() {
			try {
				const data = await appStoreService.getMyApps();
				setApps(data as unknown as App[]);
			} catch (err) {
				setError("Failed to load your apps. Please try again later.");
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchMyApps();
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-gray-500">Loading your apps...</div>
			</div>
		);
	}

	if (error) {
		return <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>;
	}

	if (apps.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-64 text-gray-500">
				<p className="text-lg mb-2">No apps published yet</p>
				<p className="text-sm">Start by publishing your first app</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4">
			{apps.map((app) => (
				<AppCard key={app.id} app={app} />
			))}
		</div>
	);
}
