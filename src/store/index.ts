import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./weatherApi";
import appStoreReducer from "./slices/appStore";

export const store = configureStore({
	reducer: {
		[weatherApi.reducerPath]: weatherApi.reducer,
		appStore: appStoreReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
