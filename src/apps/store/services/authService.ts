import { apiRequest, toJsonBody } from "@/lib/api";
import { Session, User } from "@/types/auth";
import { profileService } from "./profileService";
import { Profile } from "./profileService";

export const authService = {
	async signUp(email: string, password: string) {
		return apiRequest<{ user: User; session: Session }>("/api/auth/signup", {
			method: "POST",
			body: toJsonBody({ email, password }),
		});
	},

	async signIn(email: string, password: string) {
		return apiRequest<{ user: User; session: Session }>("/api/auth/signin", {
			method: "POST",
			body: toJsonBody({ email, password }),
		});
	},

	async signInWithProvider(provider: "google" | "github" | "apple") {
		throw new Error(`${provider} sign-in is not configured for PostgreSQL auth`);
	},

	async signOut() {
		await apiRequest<{ ok: boolean }>("/api/auth/signout", {
			method: "POST",
		});
	},

	async getSession() {
		const data = await apiRequest<{ session: Session | null }>("/api/auth/session");
		return data.session;
	},

	async getUser() {
		const session = await this.getSession();
		return session && typeof session === "object" && "user" in session
			? (session.user as User)
			: null;
	},

	async getProfile(user: User) {
		try {
			const profile = await profileService.getProfile(user.id);
			return profile;
		} catch (error) {
			throw error;
		}
	},

	async updateProfile(user: User, updates: Partial<Profile>) {
		const profile = await profileService.updateProfile(user.id, updates);
		return profile;
	},
};
