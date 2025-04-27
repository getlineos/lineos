import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { profileService } from "./profileService";
import { Profile, DeveloperStatus } from "./profileService";

export const authService = {
	async signUp(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) throw error;
		return data;
	},

	async signIn(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) throw error;
		return data;
	},

	async signInWithProvider(provider: "google" | "github" | "apple") {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});

		if (error) throw error;
		return data;
	},

	async signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
	},

	async getSession() {
		const { data, error } = await supabase.auth.getSession();
		if (error) throw error;
		return data.session;
	},

	async getUser() {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();
		if (error) throw error;
		return user;
	},

	async getProfile(user: User) {
		try {
			const profile = await profileService.getProfile(user.id);
			return profile;
		} catch (error) {
			// If profile doesn't exist, create a new one
			if (error instanceof Error && error.message.includes("not found")) {
				const { data: profile, error: profileError } = await supabase
					.from("profiles")
					.upsert({
						id: user.id,
						first_name: user.user_metadata.first_name,
						last_name: user.user_metadata.last_name,
						avatar_url: user.user_metadata.avatar_url,
						developer_status: "not_applied" as DeveloperStatus,
					})
					.select()
					.single();
				if (profileError) throw profileError;
				return profile;
			}
			throw error;
		}
	},

	async updateProfile(user: User, updates: Partial<Profile>) {
		const profile = await profileService.updateProfile(user.id, updates);
		return profile;
	},
};
