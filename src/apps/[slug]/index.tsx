import AppFrame from "@/components/AppFrame";
import { AppConfig } from "@/config/apps";
import storage from "@/utils/storage";
import { useParams } from "react-router";

export default function AppPage() {
	const { slug } = useParams();
	const installedApps = storage.get("installedApps") ?? [];
	const app = installedApps.find((app: AppConfig) => {
		return app.slug === slug;
	});

	if (!app) {
		return <div>App not found</div>;
	}

	return <AppFrame app={app} />;
}
