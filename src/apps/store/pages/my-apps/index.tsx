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
import { Grid3X3, List, Search } from "lucide-react";
import AppCard from "../../components/AppCard";

const apps = [
	{
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
	{
		id: 2,
		name: "Procreate",
		icon: "https://www.iamag.co/wp-content/uploads/2016/10/Procreate-Icon.png",
		developer: "Savage Interactive",
		category: "Graphics & Design",
		version: "5.3.2",
		size: "512 MB",
		lastUpdated: "1 week ago",
		type: "purchased",
		status: "update-available",
	},
	{
		id: 3,
		name: "Notion",
		icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
		developer: "Notion Labs",
		category: "Productivity",
		version: "2.0.8",
		size: "125 MB",
		lastUpdated: "3 days ago",
		type: "purchased",
		status: "installed",
	},
	{
		id: 4,
		name: "Figma",
		icon: "https://cdn.sanity.io/images/599r6htc/regionalized/5094051dac77593d0f0978bdcbabaf79e5bb855c-1080x1080.png?w=540&h=540&q=75&fit=max&auto=format",
		developer: "Figma, Inc.",
		category: "Design",
		version: "1.5.2",
		size: "87 MB",
		lastUpdated: "2 weeks ago",
		type: "purchased",
		status: "installed",
	},
	{
		id: 5,
		name: "Tayasui Sketches",
		icon: "https://images.seeklogo.com/logo-png/54/2/excalidraw-logo-png_seeklogo-548100.png",
		developer: "Tayasui",
		category: "Graphics & Design",
		version: "6.1",
		size: "320 MB",
		lastUpdated: "5 days ago",
		type: "purchased",
		status: "installed",
	},
	{
		id: 6,
		name: "Swift Playgrounds",
		icon: "data:image/jpeg;base64,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",
		developer: "Apple",
		category: "Development",
		version: "4.0.1",
		size: "1.2 GB",
		lastUpdated: "1 month ago",
		type: "purchased",
		status: "installed",
	},
	{
		id: 7,
		name: "Discord",
		icon: "https://static-00.iconduck.com/assets.00/discord-icon-2048x2048-wooh9l0j.png",
		developer: "Your Company",
		category: "Graphics & Design",
		version: "1.2.0",
		size: "156 MB",
		lastUpdated: "1 day ago",
		type: "developed",
		status: "published",
		downloads: "12.5K",
		revenue: "$4,320",
		rating: 4.7,
	},
	{
		id: 8,
		name: "Microsoft Excel",
		icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/826px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png",
		developer: "Your Company",
		category: "Productivity",
		version: "2.1.5",
		size: "98 MB",
		lastUpdated: "3 days ago",
		type: "developed",
		status: "published",
		downloads: "45.2K",
		revenue: "$12,750",
		rating: 4.5,
	},
	{
		id: 9,
		name: "Weather Forecast",
		icon: "https://cdn.jim-nielsen.com/ios/512/weather-2019-02-07.png",
		developer: "Your Company",
		category: "Weather",
		version: "3.0.0",
		size: "75 MB",
		lastUpdated: "In review",
		type: "developed",
		status: "in-review",
	},
];

export default function MyApps() {
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
						value="developed"
						className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
					>
						Developed
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{apps.map((app) => (
						<AppCard key={app.id} app={app} />
					))}
				</div>
			</TabsContent>

			<TabsContent value="purchased" className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{apps
						.filter((app) => app.type === "purchased")
						.map((app) => (
							<AppCard key={app.id} app={app} />
						))}
				</div>
			</TabsContent>

			<TabsContent value="developed" className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{apps
						.filter((app) => app.type === "developed")
						.map((app) => (
							<AppCard key={app.id} app={app} />
						))}
				</div>
			</TabsContent>

			<TabsContent value="updates" className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{apps
						.filter((app) => app.status === "update-available")
						.map((app) => (
							<AppCard key={app.id} app={app} />
						))}
				</div>
			</TabsContent>
		</Tabs>
	);
}
