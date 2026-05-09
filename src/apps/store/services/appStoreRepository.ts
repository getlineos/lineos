import { apiRequest, toJsonBody } from "@/lib/api";
import { Database } from "@/types/database";

export const appStoreRepository = {
	async createApp(
		appData: Omit<Database["public"]["Tables"]["apps"]["Insert"], "user_id">
	) {
		return apiRequest<Database["public"]["Tables"]["apps"]["Row"]>("/api/apps", {
			method: "POST",
			body: toJsonBody(appData),
		});
	},

	async getAppsByUserId() {
		return apiRequest<Database["public"]["Tables"]["apps"]["Row"][]>("/api/apps");
	},

	async getAppById(id: number) {
		return apiRequest<Database["public"]["Tables"]["apps"]["Row"]>(
			`/api/apps/${id}`
		);
	},

	async updateApp(
		id: number,
		appData: Database["public"]["Tables"]["apps"]["Update"]
	) {
		return apiRequest<Database["public"]["Tables"]["apps"]["Row"]>(
			`/api/apps/${id}`,
			{
				method: "PATCH",
				body: toJsonBody(appData),
			}
		);
	},

	// Asset-related operations
	async uploadAsset(
		appId: number,
		file: File,
		assetType: Database["public"]["Tables"]["app_assets"]["Insert"]["asset_type"]
	) {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("appId", String(appId));
		formData.append("assetType", assetType);

		return apiRequest<Database["public"]["Tables"]["app_assets"]["Row"]>(
			"/api/uploads/app-assets",
			{
				method: "POST",
				body: formData,
			}
		);
	},

	async getAppAssets(appId: number) {
		return apiRequest<Database["public"]["Tables"]["app_assets"]["Row"][]>(
			`/api/apps/${appId}/assets`
		);
	},

	async createAsset(
		appId: number,
		assetData: Omit<
			Database["public"]["Tables"]["app_assets"]["Insert"],
			"app_id"
		>
	) {
		return apiRequest<Database["public"]["Tables"]["app_assets"]["Row"]>(
			`/api/apps/${appId}/assets`,
			{
				method: "POST",
				body: toJsonBody(assetData),
			}
		);
	},

	async deleteAsset(id: number) {
		return apiRequest<{ ok: boolean }>(`/api/assets/${id}`, {
			method: "DELETE",
		});
	},

	// Territory-related operations
	async addTerritories(appId: number, territoryCodes: string[]) {
		return apiRequest<Database["public"]["Tables"]["app_territories"]["Row"][]>(
			`/api/apps/${appId}/territories`,
			{
				method: "POST",
				body: toJsonBody({ territoryCodes }),
			}
		);
	},

	async getAppTerritories(appId: number) {
		return apiRequest<Database["public"]["Tables"]["app_territories"]["Row"][]>(
			`/api/apps/${appId}/territories`
		);
	},

	async removeTerritories(appId: number, territoryCodes: string[]) {
		return apiRequest<{ ok: boolean }>(`/api/apps/${appId}/territories`, {
			method: "DELETE",
			body: toJsonBody({ territoryCodes }),
		});
	},

	// Review-related operations
	async getAppReviews(appId: number) {
		return apiRequest<Database["public"]["Tables"]["app_reviews"]["Row"][]>(
			`/api/apps/${appId}/reviews`
		);
	},

	async createReview(
		appId: number,
		status: Database["public"]["Tables"]["app_reviews"]["Insert"]["status"],
		feedback?: string
	) {
		return apiRequest<Database["public"]["Tables"]["app_reviews"]["Row"]>(
			`/api/apps/${appId}/reviews`,
			{
				method: "POST",
				body: toJsonBody({ status, feedback }),
			}
		);
	},

	async updateAppStatus(
		appId: number,
		status: Database["public"]["Tables"]["apps"]["Update"]["status"]
	) {
		return this.updateApp(appId, { status });
	},
};
