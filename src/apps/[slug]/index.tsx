import { AppConfig } from "@/config/apps";
import storage from "@/utils/storage";
import { useParams } from "react-router";

export default function DynamicApp() {
	const { slug } = useParams();
	const installedApps = storage.get("installedApps") ?? [];
	const app = installedApps.find((app: AppConfig) => {
		return app.slug === slug;
	});
	console.log("🚀 ~ app:", app);

	if (!app) {
		return <div>App not found</div>;
	}

	return (
		<iframe
			src={app?.url}
			className="w-full h-full border-0"
			title="Google Meet"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		/>
	);
}
