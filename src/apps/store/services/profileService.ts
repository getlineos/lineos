import { supabase } from "@/lib/supabase";

export type DeveloperStatus =
	| "not_applied"
	| "pending"
	| "approved"
	| "rejected";

export interface Profile {
	id: string;
	created_at: string;
	updated_at: string;
	developer_status: DeveloperStatus;
	first_name?: string;
	last_name?: string;
	avatar_url?: string;
}

export const profileService = {
	async getProfile(userId: string): Promise<Profile | null> {
		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", userId)
			.single();

		if (error) throw error;
		return data;
	},

	async updateProfile(
		userId: string,
		updates: Partial<Profile>
	): Promise<Profile> {
		const { data, error } = await supabase
			.from("profiles")
			.update(updates)
			.eq("id", userId)
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	async applyForDeveloper(userId: string): Promise<Profile> {
		const { data, error } = await supabase
			.from("profiles")
			.update({
				// developer_status: "pending" as DeveloperStatus,
				developer_status: "approved" as DeveloperStatus,
			})
			.eq("id", userId)
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	async rejectDeveloper(userId: string): Promise<Profile> {
		const { data, error } = await supabase
			.from("profiles")
			.update({
				developer_status: "rejected" as DeveloperStatus,
			})
			.eq("id", userId)
			.select()
			.single();

		if (error) throw error;
		return data;
	},
};
