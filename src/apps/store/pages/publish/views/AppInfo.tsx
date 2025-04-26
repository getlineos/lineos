import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export default function AppInfo() {
	const {
		register,
		formState: { errors },
		setValue,
		watch,
	} = useFormContext();

	return (
		<TabsContent value="app-info" className="space-y-6">
			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-lg font-semibold mb-4">Basic Information</h2>

				<div className="space-y-4">
					<div>
						<Label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							App Name <span className="text-red-500">*</span>
						</Label>
						<Input
							id="name"
							{...register("name")}
							placeholder="Enter your app name"
							className="w-full"
						/>
						{errors.name && (
							<p className="text-red-500 text-xs mt-1">
								{errors.name.message as string}
							</p>
						)}
					</div>

					<div>
						<Label
							htmlFor="subtitle"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Subtitle
						</Label>
						<Input
							id="subtitle"
							{...register("subtitle")}
							placeholder="A brief description of your app"
							className="w-full"
						/>
						<p className="mt-1 text-xs text-gray-500">Maximum 60 characters</p>
					</div>

					<div>
						<Label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Description <span className="text-red-500">*</span>
						</Label>
						<Textarea
							id="description"
							{...register("description")}
							placeholder="Describe what your app does and why users should download it"
							className="w-full min-h-[150px]"
						/>
						{errors.description && (
							<p className="text-red-500 text-xs mt-1">
								{errors.description.message as string}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label
								htmlFor="category"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Primary Category <span className="text-red-500">*</span>
							</Label>
							<Select
								value={watch("category")}
								onValueChange={(value) => setValue("category", value)}
							>
								<SelectTrigger id="category">
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="games">Games</SelectItem>
									<SelectItem value="productivity">Productivity</SelectItem>
									<SelectItem value="utilities">Utilities</SelectItem>
									<SelectItem value="social">Social Networking</SelectItem>
									<SelectItem value="education">Education</SelectItem>
								</SelectContent>
							</Select>
							{errors.category && (
								<p className="text-red-500 text-xs mt-1">
									{errors.category.message as string}
								</p>
							)}
						</div>

						<div>
							<Label
								htmlFor="subcategory"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Subcategory
							</Label>
							<Select
								value={watch("subcategory")}
								onValueChange={(value) => setValue("subcategory", value)}
							>
								<SelectTrigger id="subcategory">
									<SelectValue placeholder="Select subcategory" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="action">Action</SelectItem>
									<SelectItem value="adventure">Adventure</SelectItem>
									<SelectItem value="puzzle">Puzzle</SelectItem>
									<SelectItem value="strategy">Strategy</SelectItem>
									<SelectItem value="casual">Casual</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div>
						<Label
							htmlFor="keywords"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Keywords
						</Label>
						<Input
							id="keywords"
							{...register("keywords")}
							placeholder="Comma-separated keywords"
							className="w-full"
						/>
						{errors.keywords && (
							<p className="text-red-500 text-xs mt-1">
								{errors.keywords.message as string}
							</p>
						)}
						<p className="mt-1 text-xs text-gray-500">
							Help users discover your app in search results
						</p>
					</div>
				</div>
			</div>

			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-lg font-semibold mb-4">Support Information</h2>

				<div className="space-y-4">
					<div>
						<Label
							htmlFor="supportUrl"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Support URL <span className="text-red-500">*</span>
						</Label>
						<Input
							id="supportUrl"
							{...register("supportUrl")}
							placeholder="https://support.yourapp.com"
							className="w-full"
						/>
						{errors.supportUrl && (
							<p className="text-red-500 text-xs mt-1">
								{errors.supportUrl.message as string}
							</p>
						)}
					</div>

					<div>
						<Label
							htmlFor="privacyUrl"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Privacy Policy URL <span className="text-red-500">*</span>
						</Label>
						<Input
							id="privacyUrl"
							{...register("privacyUrl")}
							placeholder="https://yourapp.com/privacy"
							className="w-full"
						/>
						{errors.privacyUrl && (
							<p className="text-red-500 text-xs mt-1">
								{errors.privacyUrl.message as string}
							</p>
						)}
					</div>

					<div>
						<Label
							htmlFor="contactEmail"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Contact Email <span className="text-red-500">*</span>
						</Label>
						<Input
							id="contactEmail"
							type="email"
							{...register("contactEmail")}
							placeholder="support@yourapp.com"
							className="w-full"
						/>
						{errors.contactEmail && (
							<p className="text-red-500 text-xs mt-1">
								{errors.contactEmail.message as string}
							</p>
						)}
					</div>
				</div>
			</div>
		</TabsContent>
	);
}
