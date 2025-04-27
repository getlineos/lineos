import { RootState, store } from "@/store";
import {
	addInstalledApp,
	removeInstalledApp,
} from "@/store/slices/installedAppsSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { appStoreService } from "../services/appStoreService";

export function useAppInstall(appId?: string) {
	const apps = useSelector((state: RootState) => state.installedApps.apps);
	const [isInstalling, setIsInstalling] = useState(false);
	const [isInstalled, setIsInstalled] = useState(false);

	useEffect(() => {
		if (appId) {
			setIsInstalled(apps?.some((app: any) => app.id === appId));
		}
	}, [appId]);

	const installApp = async (appId: string) => {
		if (isInstalling || isInstalled || !appId) return;

		try {
			setIsInstalling(true);
			const data = await appStoreService.getAppMetadata(appId);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const appPayload = {
				id: data.id,
				name: data.name,
				icon: data.icon_url,
				slug: data.slug,
				showInDock: false,
				showInLaunchpad: true,
				url: data.app_url,
			};
			store.dispatch(addInstalledApp(appPayload));
			setIsInstalled(true);
		} catch (error) {
			console.error(error);
		} finally {
			setIsInstalling(false);
		}
	};

	const uninstallApp = async (appId: string) => {
		store.dispatch(removeInstalledApp(appId));
	};

	return {
		apps,
		installApp,
		isInstalling,
		isInstalled,
		uninstallApp,
	};
}
