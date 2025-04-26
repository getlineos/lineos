import { supabase } from "@/lib/supabase";

const generateUniqueFileName = (originalName: string) => {
	const timestamp = Date.now();
	const random = Math.random().toString(36).substring(2, 8);
	const fileExt = originalName.split(".").pop();
	return `icon-${timestamp}-${random}.${fileExt}`;
};

export const fileService = {
	async uploadAppIcon(file: File) {
		const fileName = generateUniqueFileName(file.name);
		const filePath = `app-icons/${fileName}`;

		// Get the current session
		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (!session) {
			throw new Error("Not authenticated");
		}

		const { error } = await supabase.storage
			.from("lineos")
			.upload(filePath, file, {
				cacheControl: "3600",
				upsert: true,
			});

		if (error) throw error;

		const {
			data: { publicUrl },
		} = supabase.storage.from("lineos").getPublicUrl(filePath);

		return publicUrl;
	},

	async deleteAppIcon(url: string) {
		const path = url.split("/").pop();
		if (!path) return;

		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (!session) {
			throw new Error("Not authenticated");
		}

		const { error } = await supabase.storage
			.from("lineos")
			.remove([`app-icons/${path}`]);

		if (error) throw error;
	},
};
