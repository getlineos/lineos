import { apiRequest, toJsonBody } from "@/lib/api";

export type DeveloperStatus =
	| "not_applied"
	| "pending"
	| "approved"
	| "rejected";

export interface Profile {
	id: number;
	created_at: string;
	updated_at: string;
	developer_status: DeveloperStatus;
	first_name?: string;
	last_name?: string;
	avatar_url?: string;
}

export const profileService = {
	async getProfile(userId: number): Promise<Profile | null> {
		return apiRequest<Profile | null>(`/api/profiles/${userId}`);
	},

	async updateProfile(
		userId: number,
		updates: Partial<Profile>
	): Promise<Profile> {
		return apiRequest<Profile>(`/api/profiles/${userId}`, {
			method: "PATCH",
			body: toJsonBody(updates),
		});
	},

	async applyForDeveloper(userId: number): Promise<Profile> {
		return this.updateProfile(userId, {
			developer_status: "approved" as DeveloperStatus,
		});
	},

	async rejectDeveloper(userId: number): Promise<Profile> {
		return this.updateProfile(userId, {
			developer_status: "rejected" as DeveloperStatus,
		});
	},
};
