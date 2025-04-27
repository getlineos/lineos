import { AppConfig } from "@/config/apps";

interface AppFrameProps {
	app: AppConfig;
}

export default function AppFrame({ app }: AppFrameProps) {
	if (!app.url) {
		return null;
	}

	const defaultAllow =
		"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

	return (
		<iframe
			src={app.url}
			className="w-full h-full border-0"
			title={app.name}
			allow={app.allow ?? defaultAllow}
			sandbox={app.sandbox}
			referrerPolicy="no-referrer"
		/>
	);
}
