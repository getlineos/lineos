import { supabase } from "@/lib/supabase";

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
};
