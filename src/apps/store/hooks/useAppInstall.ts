import { RootState, store } from "@/store/persistence";
import {
	addInstalledApp,
	removeInstalledApp,
} from "@/store/slices/installedApps";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { appStoreService } from "../services/appStoreService";

export function useAppInstall(appId?: string) {
	const apps = useSelector((state: RootState) => state.installedApps?.apps);
	const [isInstalling, setIsInstalling] = useState(false);
	const [isInstalled, setIsInstalled] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (appId) {
			setIsInstalled(apps?.some((app: any) => app.id === appId));
		}
	}, [appId]);

	const installApp = async (appId: string) => {
		if (isInstalling || isInstalled || !appId) return;

		try {
			setIsInstalling(true);
			setProgress(0);

			// Simulate progress updates
			const data = await appStoreService.getAppMetadata(appId);
			setProgress(25);

			await new Promise((resolve) => setTimeout(resolve, 1000));
			setProgress(50);

			await new Promise((resolve) => setTimeout(resolve, 1000));
			setProgress(75);

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
			setProgress(100);
			setIsInstalled(true);
		} catch (error) {
			console.error(error);
		} finally {
			setIsInstalling(false);
			setProgress(0);
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
		progress,
	};
}
