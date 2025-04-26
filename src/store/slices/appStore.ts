import storage from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeveloperSettings {
	isDeveloper: boolean;
}

interface AppStoreState {
	settings: {
		developer: DeveloperSettings;
	};
}

const getInitialState = (): AppStoreState => {
	const isDeveloper = storage.get("isDeveloper");

	return {
		settings: {
			developer: {
				isDeveloper,
			},
		},
	};
};

const appStoreSlice = createSlice({
	name: "appStore",
	initialState: getInitialState(),
	reducers: {
		setDeveloperStatus: (state, action: PayloadAction<boolean>) => {
			state.settings.developer.isDeveloper = action.payload;
			storage.set("isDeveloper", action.payload);
		},
	},
});

export const { setDeveloperStatus } = appStoreSlice.actions;

export default appStoreSlice.reducer;
