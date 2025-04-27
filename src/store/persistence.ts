import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileApi } from "./slices/profileApi";
import { weatherApi } from "./apis/weatherApi";
import authReducer from "./slices/auth";
import appStoreReducer from "./slices/appStore";
import installedAppsReducer from "./slices/installedApps";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["auth", profileApi.reducerPath],
};

const rootReducer = combineReducers({
	auth: authReducer,
	appStore: appStoreReducer,
	installedApps: installedAppsReducer,
	[profileApi.reducerPath]: profileApi.reducer,
	[weatherApi.reducerPath]: weatherApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(profileApi.middleware, weatherApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
