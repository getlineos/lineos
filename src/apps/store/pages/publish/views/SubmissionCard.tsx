import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { message } from "antd";
import { appStoreService } from "@/apps/store/services/appStoreService";
import { AppSubmissionForm } from "../types";
import { useNavigate } from "react-router";

export default function SubmissionCard() {
	const {
		register,
		formState: { errors, isValid },
		watch,
	} = useFormContext();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (!isValid) return;

		setIsSubmitting(true);
		try {
			const formData = watch();
			const resp = await appStoreService.publishApp(
				formData as AppSubmissionForm
			);
			message.success(resp.message);
			navigate("/store/developer/apps");
		} catch (error) {
			message.error("Failed to submit app");
			console.error("Failed to submit app:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-[93px]">
			<h2 className="text-lg font-semibold mb-4">Submission Checklist</h2>

			<div className="space-y-3">
				<div className="flex items-start">
					<div className="flex-shrink-0 h-5 w-5 relative mt-1">
						<svg
							className={`absolute inset-0 h-5 w-5 ${
								watch("name") && watch("description") && watch("category")
									? "text-green-500"
									: "text-gray-300"
							}`}
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="ml-3">
						<p className="text-sm font-medium">App Information</p>
						<p className="text-xs text-gray-500">
							Basic details about your app
						</p>
					</div>
				</div>

				<div className="flex items-start">
					<div className="flex-shrink-0 h-5 w-5 relative mt-1">
						<svg
							className={`absolute inset-0 h-5 w-5 ${
								watch("icon") ? "text-green-500" : "text-gray-300"
							}`}
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="ml-3">
						<p className="text-sm font-medium">App Assets</p>
						<p className="text-xs text-gray-500">
							Icon, screenshots, and preview video
						</p>
					</div>
				</div>

				<div className="flex items-start">
					<div className="flex-shrink-0 h-5 w-5 relative mt-1">
						<svg
							className={`absolute inset-0 h-5 w-5 ${
								watch("price") && watch("territories")?.length > 0
									? "text-green-500"
									: "text-gray-300"
							}`}
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="ml-3">
						<p className="text-sm font-medium">Pricing & Availability</p>
						<p className="text-xs text-gray-500">
							How and where your app will be sold
						</p>
					</div>
				</div>

				<div className="flex items-start">
					<div className="flex-shrink-0 h-5 w-5 relative mt-1">
						<svg
							className={`absolute inset-0 h-5 w-5 ${
								watch("complianceNotes") ? "text-green-500" : "text-gray-300"
							}`}
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="ml-3">
						<p className="text-sm font-medium">App Review</p>
						<p className="text-xs text-gray-500">
							Guidelines compliance and notes
						</p>
					</div>
				</div>
			</div>

			<div className="mt-6 pt-6 border-t">
				<h3 className="text-sm font-medium mb-3">
					App URL <span className="text-red-500">*</span>
				</h3>
				<Input
					{...register("appUrl")}
					placeholder="https://www.yourapp.com"
					className="w-full"
				/>
				{errors.appUrl && (
					<p className="text-red-500 text-xs mt-1">
						{errors.appUrl.message as string}
					</p>
				)}
			</div>

			<div className="mt-6">
				<Button
					className="w-full bg-blue-600 hover:bg-blue-700 text-white"
					onClick={handleSubmit}
					disabled={!isValid || isSubmitting}
				>
					{isSubmitting ? "Submitting..." : "Submit for Review"}
				</Button>
				<p className="text-xs text-center text-gray-500 mt-2">
					Review typically takes 1-3 business days
				</p>
			</div>
		</div>
	);
}
