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
	const sandbox = app.sandbox?.includes("allow-downloads")
		? app.sandbox
		: [app.sandbox, "allow-downloads"].filter(Boolean).join(" ");

	return (
		<iframe
			src={app.url}
			className="w-full h-full border-0"
			title={app.name}
			allow={app.allow ?? defaultAllow}
			sandbox={sandbox}
			referrerPolicy="no-referrer"
		/>
	);
}
