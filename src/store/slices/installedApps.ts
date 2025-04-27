import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@/config/apps";
import storage from "@/utils/storage";

interface InstalledAppsState {
	apps: AppConfig[];
	isLoading: boolean;
	error: string | null;
}

const initialState: InstalledAppsState = {
	apps: [],
	isLoading: false,
	error: null,
};

const installedAppsSlice = createSlice({
	name: "installedApps",
	initialState,
	reducers: {
		setInstalledApps: (state, action: PayloadAction<AppConfig[]>) => {
			state.apps = action.payload;
		},
		addInstalledApp: (state, action: PayloadAction<AppConfig>) => {
			storage.prepend("installedApps", action.payload);
			state.apps.unshift(action.payload);
		},
		removeInstalledApp: (state, action: PayloadAction<string>) => {
			const currentApps = storage.get("installedApps") ?? [];
			const updatedApps = currentApps.filter(
				(app: AppConfig) => app.id !== action.payload
			);
			state.apps = updatedApps;
			storage.set("installedApps", updatedApps);
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const {
	setInstalledApps,
	addInstalledApp,
	removeInstalledApp,
	setLoading,
	setError,
} = installedAppsSlice.actions;

export default installedAppsSlice.reducer;
