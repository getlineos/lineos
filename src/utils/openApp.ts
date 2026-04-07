import { AppConfig } from "@/config/apps";
import { NavigateFunction } from "react-router";

export function getAppRoute(app: AppConfig) {
	if (app.slug === "launchpad") {
		return "/launchpad";
	}

	if (app.slug === "store") {
		return "/store";
	}

	return `/${app.slug}`;
}

export function openApp(navigate: NavigateFunction, app: AppConfig) {
	navigate(getAppRoute(app));
}
