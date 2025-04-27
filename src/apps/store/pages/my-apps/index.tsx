import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppConfig } from "@/config/apps";
import { Grid3X3, List, Search } from "lucide-react";
import AppCard from "../../components/AppCard";
import { useAppInstall } from "../../hooks/useAppInstall";

export default function MyApps() {
	const { apps } = useAppInstall();

	const installedApps = apps
		.filter((app: AppConfig) => app.id)
		.map((app: AppConfig) => ({
			...{
				id: 1,
				name: "Vectornator",
				icon: "https://cdn-images-1.medium.com/v2/resize:fit:1200/1*7WnZLJAPmmRvVXgzzy_aFA.png",
				developer: "Linearity GmbH",
				category: "Graphics & Design",
				version: "4.12.0",
				size: "245 MB",
				lastUpdated: "2 days ago",
				type: "purchased",
				status: "installed",
			},
			...app,
		}));

	const purchasedApps = installedApps.filter((app) => app.type === "purchased");
	const updateAvailableApps = installedApps.filter(
		(app) => app.status === "update-available"
	);

	return (
		<Tabs defaultValue="all" className="space-y-4">
			<div className="flex flex-col sm:flex-row justify-between gap-4">
				<TabsList className="grid grid-cols-4 w-full sm:w-auto sm:inline-flex">
					<TabsTrigger
						value="all"
						className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
					>
						All Apps
					</TabsTrigger>
					<TabsTrigger
						value="purchased"
						className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
					>
						Purchased
					</TabsTrigger>
					<TabsTrigger
						value="updates"
						className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
					>
						Updates
					</TabsTrigger>
				</TabsList>

				<div className="flex gap-2 items-center">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<Input
							type="text"
							placeholder="Search apps"
							className="pl-9 bg-white"
						/>
					</div>

					<div className="flex border rounded-md bg-white">
						<Button
							variant="ghost"
							size="icon"
							className="rounded-r-none border-r"
						>
							<Grid3X3 className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-l-none">
							<List className="h-4 w-4" />
						</Button>
					</div>

					<Select defaultValue="name">
						<SelectTrigger className="w-[140px] bg-white">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="name">Name</SelectItem>
							<SelectItem value="recent">Recently Updated</SelectItem>
							<SelectItem value="size">Size</SelectItem>
							<SelectItem value="category">Category</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<TabsContent value="all" className="space-y-4">
				{installedApps.length ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{installedApps.map((app) => (
							<AppCard key={app.id} app={app} />
						))}
					</div>
				) : (
					<Empty text="No apps installed" />
				)}
			</TabsContent>

			<TabsContent value="purchased" className="space-y-4">
				{purchasedApps?.length ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{purchasedApps.map((app) => (
							<AppCard key={app.id} app={app} />
						))}
					</div>
				) : (
					<Empty text="No purchased apps" />
				)}
			</TabsContent>

			<TabsContent value="updates" className="space-y-4">
				{updateAvailableApps?.length ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{updateAvailableApps.map((app) => (
							<AppCard key={app.id} app={app} />
						))}
					</div>
				) : (
					<Empty text="No updates available" />
				)}
			</TabsContent>
		</Tabs>
	);
}

const Empty = ({ text }: { text: string }) => {
	return (
		<div className="flex justify-center items-center h-full mt-40">
			<p className="text-gray-500">{text}</p>
		</div>
	);
};
