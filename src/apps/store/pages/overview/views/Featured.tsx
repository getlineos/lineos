import { AppCardV2 } from "@/apps/store/components/AppCardV2";
import { myApps } from "@/apps/store/utils";
import { placeholderImg } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Star } from "lucide-react";
import { Link } from "react-router";

const featuredApps = [
	{
		id: "minecraft",
		name: "Minecraft",
		description: "Build, create, and explore infinite worlds",
		image: placeholderImg,
		category: "Games",
		rating: 4.8,
		icon: myApps[0].icon,
	},
	{
		id: "spotify",
		name: "Spotify",
		description: "Listen to millions of songs and podcasts",
		image: placeholderImg,
		category: "Music",
		rating: 4.7,
		icon: myApps[1].icon,
	},
	{
		id: "netflix",
		name: "Netflix",
		description: "Stream TV shows, movies, and more",
		image: placeholderImg,
		category: "Entertainment",
		rating: 4.5,
		icon: myApps[2].icon,
	},
];

// Mock data for top apps
const topApps = [
	{
		id: "tiktok",
		name: "TikTok",
		icon: myApps[3].icon,
		category: "Social",
		rating: 4.6,
	},
	{
		id: "instagram",
		name: "Instagram",
		icon: myApps[4].icon,
		category: "Social",
		rating: 4.5,
	},
	{
		id: "youtube",
		name: "YouTube",
		icon: myApps[5].icon,
		category: "Entertainment",
		rating: 4.4,
	},
	{
		id: "whatsapp",
		name: "WhatsApp",
		icon: myApps[6].icon,
		category: "Communication",
		rating: 4.7,
	},
	{
		id: "facebook",
		name: "Facebook",
		icon: myApps[7].icon,
		category: "Social",
		rating: 4.1,
	},
	{
		id: "amazon",
		name: "Amazon Shopping",
		icon: myApps[8].icon,
		category: "Shopping",
		rating: 4.2,
	},
];

// Mock data for recommended apps
const recommendedApps = [
	{
		id: "clash-of-clans",
		name: "Clash of Clans",
		icon: myApps[4].icon,
		category: "Strategy",
		rating: 4.5,
	},
	{
		id: "candy-crush",
		name: "Candy Crush Saga",
		icon: myApps[5].icon,
		category: "Puzzle",
		rating: 4.4,
	},
	{
		id: "pubg-mobile",
		name: "PUBG Mobile",
		icon: myApps[6].icon,
		category: "Action",
		rating: 4.3,
	},
	{
		id: "asphalt-9",
		name: "Asphalt 9",
		icon: myApps[7].icon,
		category: "Racing",
		rating: 4.6,
	},
	{
		id: "among-us",
		name: "Among Us",
		icon: myApps[8].icon,
		category: "Action",
		rating: 4.2,
	},
	{
		id: "roblox",
		name: "Roblox",
		icon: myApps[0].icon,
		category: "Adventure",
		rating: 4.5,
	},
];

export default function Featured() {
	return (
		<div className="space-y-8 mt-8">
			<section className="space-y-4 bg-white rounded-lg p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Featured</h2>
					<Button variant="ghost" size="sm" asChild>
						<Link to="#" className="flex items-center gap-1">
							Show all <ChevronRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{featuredApps.map((app) => (
						<Link
							key={app.id}
							to={`/app/${app.id}`}
							className="group rounded-xl overflow-hidden border hover:shadow-md transition-all"
						>
							<div className="relative h-40 w-full">
								<img
									src={app.image || "/placeholder.svg"}
									alt={app.name}
									className="h-40 w-full object-cover"
								/>
							</div>
							<div className="p-4 flex items-start gap-3">
								<img
									src={app.icon || "/placeholder.svg"}
									alt={app.name}
									width={60}
									height={60}
									className="rounded-xl"
								/>
								<div>
									<h3 className="font-medium">{app.name}</h3>
									<p className="text-sm text-muted-foreground line-clamp-2">
										{app.description}
									</p>
									<div className="flex items-center mt-1">
										<Star className="h-3 w-3 fill-primary text-primary" />
										<span className="text-xs ml-1">{app.rating}</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Top Games & Apps */}
			<section className="space-y-4 bg-white rounded-lg p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Top Games & Apps</h2>
					<Button variant="ghost" size="sm" asChild>
						<Link to="#" className="flex items-center gap-1">
							Show all <ChevronRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
				<Tabs defaultValue="all">
					<div className="overflow-x-auto pb-2">
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="games">Games</TabsTrigger>
							<TabsTrigger value="social">Social</TabsTrigger>
							<TabsTrigger value="productivity">Productivity</TabsTrigger>
							<TabsTrigger value="entertainment">Entertainment</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value="all" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{topApps.map((app, index) => (
								<AppCardV2
									key={app.id}
									id={app.id}
									name={app.name}
									icon={app.icon}
									category={app.category}
									rating={app.rating}
									index={index}
									showRank={true}
								/>
							))}
						</div>
					</TabsContent>
					<TabsContent value="games" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{/* Filter for games category would go here */}
							<p className="col-span-full text-center py-8 text-muted-foreground">
								No games found in this category
							</p>
						</div>
					</TabsContent>
					<TabsContent value="social" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{/* Filter for social category would go here */}
							<p className="col-span-full text-center py-8 text-muted-foreground">
								No social apps found in this category
							</p>
						</div>
					</TabsContent>
					<TabsContent value="productivity" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{/* Filter for productivity category would go here */}
							<p className="col-span-full text-center py-8 text-muted-foreground">
								No productivity apps found in this category
							</p>
						</div>
					</TabsContent>
					<TabsContent value="entertainment" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{/* Filter for entertainment category would go here */}
							<p className="col-span-full text-center py-8 text-muted-foreground">
								No entertainment apps found in this category
							</p>
						</div>
					</TabsContent>
				</Tabs>
			</section>

			{/* Recommended for you */}
			<section className="space-y-4 bg-white rounded-lg p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Recommended for you</h2>
					<Button variant="ghost" size="sm" asChild>
						<Link to="#" className="flex items-center gap-1">
							Show all <ChevronRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
				<Tabs defaultValue="all">
					<div className="overflow-x-auto pb-2">
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="games">Games</TabsTrigger>
							<TabsTrigger value="productivity">Productivity</TabsTrigger>
							<TabsTrigger value="entertainment">Entertainment</TabsTrigger>
							<TabsTrigger value="education">Education</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value="all" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{recommendedApps.map((app, index) => (
								<AppCardV2
									key={app.id}
									id={app.id}
									name={app.name}
									icon={app.icon}
									category={app.category}
									rating={app.rating}
									index={index}
									showRank={true}
								/>
							))}
						</div>
					</TabsContent>
					<TabsContent value="games" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{/* Filter for games category would go here */}
							<p className="col-span-full text-center py-8 text-muted-foreground">
								No games found in this category
							</p>
						</div>
					</TabsContent>
					<TabsContent value="productivity" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{/* Filter for productivity category would go here */}
							<p className="col-span-full text-center py-8 text-muted-foreground">
								No productivity apps found in this category
							</p>
						</div>
					</TabsContent>
					<TabsContent value="entertainment" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{/* Filter for entertainment category would go here */}
							<p className="col-span-full text-center py-8 text-muted-foreground">
								No entertainment apps found in this category
							</p>
						</div>
					</TabsContent>
					<TabsContent value="education" className="mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{/* Filter for education category would go here */}
							<p className="col-span-full text-center py-8 text-muted-foreground">
								No education apps found in this category
							</p>
						</div>
					</TabsContent>
				</Tabs>
			</section>
		</div>
	);
}
