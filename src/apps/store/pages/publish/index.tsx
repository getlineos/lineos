import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { AppSubmissionForm, appSubmissionSchema } from "./types";
import AppInfo from "./views/AppInfo";
import Assets from "./views/Assets";
import Pricing from "./views/Pricing";
import Review from "./views/Review";
import SubmissionCard from "./views/SubmissionCard";

export default function PublishPage() {
	const form = useForm<AppSubmissionForm>({
		resolver: zodResolver(appSubmissionSchema),
		defaultValues: {},
	});

	return (
		<FormProvider {...form}>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<Tabs defaultValue="app-info" className="w-full">
						<TabsList className="grid grid-cols-4 mb-6 bg-white">
							<TabsTrigger
								value="app-info"
								className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
							>
								App Info
							</TabsTrigger>
							<TabsTrigger
								value="assets"
								className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
							>
								Assets
							</TabsTrigger>
							<TabsTrigger
								value="pricing"
								className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
							>
								Pricing
							</TabsTrigger>
							<TabsTrigger
								value="review"
								className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
							>
								Review
							</TabsTrigger>
						</TabsList>
						<AppInfo />
						<Assets />
						<Pricing />
						<Review />
					</Tabs>
				</div>

				<div className="lg:col-span-1">
					<SubmissionCard />
				</div>
			</div>
		</FormProvider>
	);
}
