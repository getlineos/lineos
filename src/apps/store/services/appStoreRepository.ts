import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

export const appStoreRepository = {
	async createApp(
		appData: Omit<Database["public"]["Tables"]["apps"]["Insert"], "user_id">
	) {
		const { data, error } = await supabase
			.from("apps")
			.insert([
				{ ...appData, user_id: (await supabase.auth.getUser()).data.user?.id },
			])
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	async getAppsByUserId() {
		const { data, error } = await supabase
			.from("apps")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;
		return data;
	},

	async getAppById(id: string) {
		const { data, error } = await supabase
			.from("apps")
			.select("*")
			.eq("id", id)
			.single();

		if (error) throw error;
		return data;
	},

	async updateApp(
		id: string,
		appData: Database["public"]["Tables"]["apps"]["Update"]
	) {
		const { data, error } = await supabase
			.from("apps")
			.update(appData)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	// Asset-related operations
	async uploadAsset(
		appId: string,
		file: File,
		assetType: Database["public"]["Tables"]["app_assets"]["Insert"]["asset_type"]
	) {
		const fileExt = file.name.split(".").pop();
		const fileName = `${appId}/${assetType}-${Date.now()}.${fileExt}`;
		const filePath = `app-assets/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from("app-assets")
			.upload(filePath, file);

		if (uploadError) throw uploadError;

		const { data: assetData, error } = await supabase
			.from("app_assets")
			.insert([
				{
					app_id: appId,
					asset_type: assetType,
					file_path: filePath,
					file_size: file.size,
				},
			])
			.select()
			.single();

		if (error) throw error;
		return assetData;
	},

	async getAppAssets(appId: string) {
		const { data, error } = await supabase
			.from("app_assets")
			.select("*")
			.eq("app_id", appId);

		if (error) throw error;
		return data;
	},

	async deleteAsset(id: string) {
		const { data: asset, error: fetchError } = await supabase
			.from("app_assets")
			.select("file_path")
			.eq("id", id)
			.single();

		if (fetchError) throw fetchError;

		const { error: deleteError } = await supabase.storage
			.from("app-assets")
			.remove([asset.file_path]);

		if (deleteError) throw deleteError;

		const { error } = await supabase.from("app_assets").delete().eq("id", id);

		if (error) throw error;
	},

	// Territory-related operations
	async addTerritories(appId: string, territoryCodes: string[]) {
		const { data, error } = await supabase
			.from("app_territories")
			.insert(
				territoryCodes.map((code) => ({
					app_id: appId,
					territory_code: code,
				}))
			)
			.select();

		if (error) throw error;
		return data;
	},

	async getAppTerritories(appId: string) {
		const { data, error } = await supabase
			.from("app_territories")
			.select("*")
			.eq("app_id", appId);

		if (error) throw error;
		return data;
	},

	async removeTerritories(appId: string, territoryCodes: string[]) {
		const { error } = await supabase
			.from("app_territories")
			.delete()
			.eq("app_id", appId)
			.in("territory_code", territoryCodes);

		if (error) throw error;
	},

	// Review-related operations
	async getAppReviews(appId: string) {
		const { data, error } = await supabase
			.from("app_reviews")
			.select("*")
			.eq("app_id", appId)
			.order("created_at", { ascending: false });

		if (error) throw error;
		return data;
	},

	async createReview(
		appId: string,
		status: Database["public"]["Tables"]["app_reviews"]["Insert"]["status"],
		feedback?: string
	) {
		const { data, error } = await supabase
			.from("app_reviews")
			.insert([
				{
					app_id: appId,
					reviewer_id: (await supabase.auth.getUser()).data.user?.id,
					status,
					feedback,
				},
			])
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	async updateAppStatus(
		appId: string,
		status: Database["public"]["Tables"]["apps"]["Update"]["status"]
	) {
		const { data, error } = await supabase
			.from("apps")
			.update({ status })
			.eq("id", appId)
			.select()
			.single();

		if (error) throw error;
		return data;
	},
};
