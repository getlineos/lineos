import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";
import { Profile } from "@/apps/store/services/profileService";
import { profileApi } from "./profileApi";

interface AuthState {
	user: User | null;
	session: Session | null;
	profile: Profile | null;
	isLoading: boolean;
	error: string | null;
	authRequired: boolean;
}

const initialState: AuthState = {
	user: null,
	session: null,
	profile: null,
	isLoading: true,
	error: null,
	authRequired: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
		setSession: (state, action: PayloadAction<Session | null>) => {
			state.session = action.payload;
		},
		setProfile: (state, action: PayloadAction<Profile | null>) => {
			state.profile = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		clearAuth: (state) => {
			state.user = null;
			state.session = null;
			state.profile = null;
			state.error = null;
		},
		setAuthRequired: (state, action: PayloadAction<boolean>) => {
			state.authRequired = action.payload;
		},
		logout: (state) => {
			state.session = null;
			state.user = null;
			state.profile = null;
			state.isLoading = false;
			console.log("logging out");
			console.log("invalidating tags profile");
			profileApi.util.resetApiState();
		},
	},
});

export const {
	setUser,
	setSession,
	setProfile,
	setLoading,
	setError,
	clearAuth,
	setAuthRequired,
	logout,
} = authSlice.actions;

export default authSlice.reducer;
