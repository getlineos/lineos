import { apiRequest, toJsonBody } from "@/lib/api";

export const fileService = {
	async uploadAppIcon(file: File) {
		return this.uploadAppImage(file);
	},

	async uploadAppImage(file: File) {
		const formData = new FormData();
		formData.append("file", file);
		const { url } = await apiRequest<{ url: string }>(
			"/api/uploads/app-images",
			{
				method: "POST",
				body: formData,
			}
		);

		return url;
	},

	async deleteAppIcon(url: string) {
		await this.deleteAppImage(url);
	},

	async deleteAppImage(url: string) {
		await apiRequest<{ ok: boolean }>("/api/uploads/app-images", {
			method: "DELETE",
			body: toJsonBody({ url }),
		});
	},
};
