export type PricingModel = "free" | "paid" | "freemium" | "subscription";
export type ReleaseType = "immediate" | "manual" | "scheduled";
export type AgeRating = "4+" | "9+" | "12+" | "17+";
export type AppStatus = "draft" | "pending_review" | "approved" | "rejected";
export type AssetType = "icon" | "screenshot" | "preview_video";

export interface App {
	id: string;
	user_id: string;
	name: string;
	subtitle?: string;
	description: string;
	primary_category: string;
	subcategory?: string;
	keywords: string[];
	support_url: string;
	privacy_policy_url: string;
	contact_email: string;
	app_url: string;
	icon_url: string;
	pricing_model: PricingModel;
	price?: number;
	currency?: string;
	release_type: ReleaseType;
	scheduled_release_date?: string;
	is_preorder: boolean;
	age_rating: AgeRating;
	content_descriptors?: string[];
	review_notes?: string;
	status: AppStatus;
	created_at: string;
	updated_at: string;
}

export interface AppAsset {
	id: string;
	app_id: string;
	asset_type: AssetType;
	file_path: string;
	file_size: number;
	width?: number;
	height?: number;
	created_at: string;
}

export interface AppTerritory {
	id: string;
	app_id: string;
	territory_code: string;
	created_at: string;
}

export interface AppReview {
	id: string;
	app_id: string;
	reviewer_id: string;
	status: AppStatus;
	feedback?: string;
	created_at: string;
	updated_at: string;
}

export interface Database {
	public: {
		Tables: {
			apps: {
				Row: App;
				Insert: Omit<App, "id" | "created_at" | "updated_at">;
				Update: Partial<Omit<App, "id" | "created_at" | "updated_at">>;
			};
			app_assets: {
				Row: AppAsset;
				Insert: Omit<AppAsset, "id" | "created_at">;
				Update: Partial<Omit<AppAsset, "id" | "created_at">>;
			};
			app_territories: {
				Row: AppTerritory;
				Insert: Omit<AppTerritory, "id" | "created_at">;
				Update: Partial<Omit<AppTerritory, "id" | "created_at">>;
			};
			app_reviews: {
				Row: AppReview;
				Insert: Omit<AppReview, "id" | "created_at" | "updated_at">;
				Update: Partial<Omit<AppReview, "id" | "created_at" | "updated_at">>;
			};
		};
	};
}
