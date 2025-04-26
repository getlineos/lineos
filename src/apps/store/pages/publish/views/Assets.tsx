import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Upload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { fileService } from "../../../services/fileService";
import { useRef, useState } from "react";
import { message } from "antd";

export default function Assets() {
	const { setValue, watch } = useFormContext();
	const [isUploading, setIsUploading] = useState(false);
	const iconUrl = watch("icon");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (!file.type.match(/^image\/(jpeg|png)$/)) {
			message.error("Only JPEG and PNG files are allowed");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			message.error("File size must be less than 5MB");
			return;
		}

		try {
			setIsUploading(true);
			const publicUrl = await fileService.uploadAppIcon(file);
			setValue("icon", publicUrl);
			message.success("Icon uploaded successfully");
		} catch (error) {
			console.error("Failed to upload icon:", error);
			message.error("Failed to upload icon");
		} finally {
			setIsUploading(false);
		}
	};

	const handleDeleteIcon = async () => {
		if (!iconUrl) return;

		try {
			await fileService.deleteAppIcon(iconUrl);
			setValue("icon", "");
			message.success("Icon deleted successfully");
		} catch (error) {
			console.error("Failed to delete icon:", error);
			message.error("Failed to delete icon");
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<TabsContent value="assets" className="space-y-6">
			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-lg font-semibold mb-4">App Icon</h2>

				<div className="flex items-start space-x-4">
					<div className="w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative">
						{iconUrl ? (
							<>
								<img
									src={iconUrl}
									alt="App Icon"
									className="w-full h-full object-cover rounded-xl"
								/>
								<button
									onClick={handleDeleteIcon}
									className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
								>
									<X className="h-4 w-4" />
								</button>
							</>
						) : (
							<div className="text-center">
								<Upload className="mx-auto h-8 w-8 text-gray-400" />
								<span className="mt-2 block text-xs font-medium text-gray-700">
									1024×1024 px
								</span>
							</div>
						)}
					</div>

					<div className="flex-1">
						<p className="text-sm text-gray-700 mb-2">
							Your app icon is the first impression users have of your app in
							the App Store.
						</p>
						<ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
							<li>Must be at least 1024×1024 pixels</li>
							<li>PNG or JPEG format only</li>
							<li>Transparent background not recommended</li>
							<li>Will be automatically resized for different devices</li>
						</ul>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/jpeg,image/png"
							className="hidden"
							onChange={handleFileUpload}
							disabled={isUploading}
						/>
						<Button
							size="sm"
							variant="outline"
							className="mt-3 cursor-pointer"
							disabled={isUploading}
							onClick={handleUploadClick}
						>
							<Upload className="h-4 w-4 mr-2" />
							{isUploading ? "Uploading..." : "Upload Icon"}
						</Button>
					</div>
				</div>
			</div>

			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-lg font-semibold mb-4">Screenshots</h2>
				<p className="text-sm text-gray-700 mb-4">
					Add screenshots to showcase your app's features and functionality. You
					need at least 3 screenshots for each device type.
				</p>

				<div className="space-y-6">
					{/* <div>
                <h3 className="text-md font-medium mb-3">
                    iPhone Screenshots
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className="aspect-[9/19.5] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4"
                        >
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-xs font-medium text-gray-700 text-center">
                                1290×2796 px
                            </span>
                            <Button size="sm" variant="ghost" className="mt-2">
                                Upload
                            </Button>
                        </div>
                    ))}
                    <div className="aspect-[9/19.5] bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 flex items-center justify-center">
                        <Button size="sm" variant="outline" className="bg-white">
                            <span className="text-lg mr-1">+</span> Add More
                        </Button>
                    </div>
                </div>
            </div> */}

					<div>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							<div className="aspect-[4/3] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4">
								<Upload className="h-8 w-8 text-gray-400 mb-2" />
								<span className="text-xs font-medium text-gray-700 text-center">
									2048×1536 px
								</span>
								<Button size="sm" variant="ghost" className="mt-2">
									Upload
								</Button>
							</div>
							<div className="aspect-[4/3] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4">
								<Upload className="h-8 w-8 text-gray-400 mb-2" />
								<span className="text-xs font-medium text-gray-700 text-center">
									2048×1536 px
								</span>
								<Button size="sm" variant="ghost" className="mt-2">
									Upload
								</Button>
							</div>
							<div className="aspect-[4/3] bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 flex items-center justify-center">
								<Button size="sm" variant="outline" className="bg-white">
									<span className="text-lg mr-1">+</span> Add More
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-lg font-semibold mb-4">
					App Preview Video (Optional)
				</h2>

				<div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
					<div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
						<Upload className="h-6 w-6 text-gray-500" />
					</div>
					<h3 className="text-sm font-medium text-gray-900">
						Drag and drop your video file here
					</h3>
					<p className="mt-1 text-xs text-gray-500">
						MP4 format, 15-30 seconds, max 500MB
					</p>

					<div className="mt-4">
						<Button variant="outline" size="sm">
							<Upload className="h-4 w-4 mr-2" />
							Select Video
						</Button>
					</div>
				</div>
			</div>
		</TabsContent>
	);
}
