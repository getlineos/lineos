import { appStoreRepository } from "./appStoreRepository";
import { Database } from "@/types/database";
import { AppSubmissionForm } from "../pages/publish/types";
import { supabase } from "@/lib/supabase";

const transformAppData = (
	app: Database["public"]["Tables"]["apps"]["Row"]
) => ({
	id: app.id,
	name: app.name,
	icon: app.icon_url,
	developer: "Your Company", // You might want to get this from user profile
	category: app.primary_category,
	version: "1.0.0", // You might want to add version to your app model
	size: "0 MB", // You might want to add size to your app model
	lastUpdated: new Date(app.updated_at).toLocaleDateString(),
	type: "developed",
	status:
		app.status === "approved"
			? "published"
			: app.status === "pending_review"
			? "in-review"
			: "draft",
	downloads: "0", // You might want to add downloads to your app model
	revenue: "$0", // You might want to add revenue to your app model
	rating: 0, // You might want to add rating to your app model
});

export const appStoreService = {
	// App management
	async createApp(
		appData: Omit<Database["public"]["Tables"]["apps"]["Insert"], "user_id">
	) {
		return appStoreRepository.createApp(appData);
	},

	async getMyApps() {
		const data = await appStoreRepository.getAppsByUserId();
		return data.map(transformAppData);
	},

	async getAppDetails(id: string) {
		const [app, assets, territories, reviews] = await Promise.all([
			appStoreRepository.getAppById(id),
			appStoreRepository.getAppAssets(id),
			appStoreRepository.getAppTerritories(id),
			appStoreRepository.getAppReviews(id),
		]);

		return {
			...app,
			assets,
			territories,
			reviews,
		};
	},

	async updateApp(
		id: string,
		appData: Database["public"]["Tables"]["apps"]["Update"]
	) {
		return appStoreRepository.updateApp(id, appData);
	},

	async submitForReview(id: string) {
		return appStoreRepository.updateAppStatus(id, "pending_review");
	},

	// Asset management
	async uploadAppAsset(
		file: File,
		type: "icon" | "screenshots" | "previewVideo"
	) {
		// TODO: Implement actual file upload logic
		return {
			url: URL.createObjectURL(file),
			type,
			name: file.name,
		};
	},

	async getAppAssets(appId: string) {
		return appStoreRepository.getAppAssets(appId);
	},

	async deleteAppAsset(assetId: string) {
		return appStoreRepository.deleteAsset(assetId);
	},

	// Territory management
	async updateAppTerritories(appId: string, territoryCodes: string[]) {
		const currentTerritories = await appStoreRepository.getAppTerritories(
			appId
		);
		const currentCodes = currentTerritories.map((t) => t.territory_code);

		const toAdd = territoryCodes.filter((code) => !currentCodes.includes(code));
		const toRemove = currentCodes.filter(
			(code) => !territoryCodes.includes(code)
		);

		if (toAdd.length > 0) {
			await appStoreRepository.addTerritories(appId, toAdd);
		}
		if (toRemove.length > 0) {
			await appStoreRepository.removeTerritories(appId, toRemove);
		}

		return appStoreRepository.getAppTerritories(appId);
	},

	// Review management
	async getAppReviews(appId: string) {
		return appStoreRepository.getAppReviews(appId);
	},

	async reviewApp(
		appId: string,
		status: Database["public"]["Tables"]["app_reviews"]["Insert"]["status"],
		feedback?: string
	) {
		const review = await appStoreRepository.createReview(
			appId,
			status,
			feedback
		);
		await appStoreRepository.updateAppStatus(appId, status);
		return review;
	},

	async publishApp(formData: AppSubmissionForm) {
		try {
			const app = await appStoreRepository.createApp({
				name: formData.name,
				description: formData.description,
				primary_category: formData.category,
				subcategory: formData.subcategory,
				support_url: formData.supportUrl ?? "",
				privacy_policy_url: formData.privacyUrl ?? "",
				contact_email: formData.contactEmail ?? "",
				app_url: formData.appUrl,
				status: "pending_review",
				keywords: [],
				pricing_model: "free",
				release_type: "immediate",
				is_preorder: false,
				age_rating: "4+",
				icon_url: formData.icon,
			});

			return {
				success: true,
				message: "App submitted for review successfully",
				data: app,
			};
		} catch (error) {
			console.error("Failed to publish app:", error);
			throw new Error("Failed to submit app for review");
		}
	},

	async getPublishedApps() {
		const { data, error } = await supabase
			.from("apps")
			.select("*")
			.eq("status", "approved")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching published apps:", error);
			throw error;
		}

		return data.map(transformAppData);
	},
};
