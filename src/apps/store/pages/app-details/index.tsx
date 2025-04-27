import { ChevronLeft, Download, Share2, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { placeholderImg } from "@/utils/constants";
import { Spin } from "antd";
import { Link, useNavigate, useParams } from "react-router";
import { useAppInstall } from "../../hooks/useAppInstall";
import { appStoreService } from "../../services/appStoreService";

const mockApp = {
	id: "mock",
	name: "Minecraft",
	developer: "Mojang",
	icon: placeholderImg,
	category: "Games",
	subCategory: "Adventure",
	rating: 4.8,
	reviewCount: 2500000,
	price: "$6.99",
	size: "173 MB",
	slug: "minecraft",
	ageRating: "9+",
	version: "1.20.0",
	lastUpdated: "May 15, 2023",
	description:
		"Explore infinite worlds and build everything from the simplest of homes to the grandest of castles.",
	screenshots: [placeholderImg, placeholderImg, placeholderImg, placeholderImg],
	features: [
		"Cross-platform gameplay",
		"Regular updates with new content",
		"Creative and Survival modes",
		"Multiplayer support",
		"Custom skins and texture packs",
	],
	relatedApps: [
		{
			id: "terraria",
			name: "Terraria",
			icon: placeholderImg,
			category: "Games",
			rating: 4.7,
		},
		{
			id: "roblox",
			name: "Roblox",
			icon: placeholderImg,
			category: "Games",
			rating: 4.5,
		},
	],
	reviews: [
		{
			id: "1",
			user: "CraftMaster",
			avatar: placeholderImg,
			rating: 5,
			date: "June 2, 2023",
			content:
				"Best game ever! I've been playing for years and it never gets old.",
		},
	],
};

export default function AppDetailPage() {
	const { id: appId } = useParams();
	const [app, setApp] = useState(mockApp);
	const [isLoading, setIsLoading] = useState(true);
	const { installApp, isInstalling, isInstalled } = useAppInstall(appId ?? "");
	const navigate = useNavigate();

	useEffect(() => {
		fetchApp();
	}, [appId, isInstalling]);

	async function fetchApp() {
		if (!appId) return;

		try {
			const data = await appStoreService.getAppDetails(appId);
			setApp({
				...mockApp,
				...data,
				icon: data.icon_url || mockApp.icon,
				category: data.primary_category || mockApp.category,
				subCategory: data.subcategory || mockApp.subCategory,
				description: data.description || mockApp.description,
				rating: data.rating || mockApp.rating,
				reviewCount: data.reviews?.length || mockApp.reviewCount,
				lastUpdated:
					new Date(data.updated_at).toLocaleDateString() || mockApp.lastUpdated,
			});
		} catch (error) {
			console.error("Failed to fetch app details:", error);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return <div className="container max-w-7xl py-6">Loading...</div>;
	}

	return (
		<div className="container max-w-7xl p-6 space-y-8 bg-white rounded-lg">
			<div>
				<Button variant="ghost" size="sm" asChild>
					<Link to="/store" className="flex items-center gap-1">
						<ChevronLeft className="h-4 w-4" />
						Back to Store
					</Link>
				</Button>
			</div>

			<div className="flex flex-col md:flex-row gap-6">
				<div className="flex-shrink-0">
					<img
						src={app.icon || "/placeholder.svg"}
						alt={app.name}
						width={128}
						height={128}
						className="rounded-2xl shadow-md"
					/>
				</div>
				<div className="flex-grow space-y-3">
					<div>
						<h1 className="text-3xl font-bold">{app.name}</h1>
						<p className="text-muted-foreground">{app.developer}</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline">{app.category}</Badge>
						<Badge variant="outline">{app.subCategory}</Badge>
						<Badge variant="outline">{app.ageRating}</Badge>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center">
							<div className="flex">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`h-4 w-4 ${
											i < Math.floor(app.rating)
												? "fill-primary text-primary"
												: "fill-muted text-muted"
										}`}
									/>
								))}
							</div>
							<span className="ml-2 text-sm">
								{app.rating} ({app.reviewCount.toLocaleString()} reviews)
							</span>
						</div>
						<div className="text-sm text-muted-foreground">{app.size}</div>
					</div>
					<div className="flex flex-wrap gap-3 pt-2">
						{isInstalled ? (
							<Button
								className="gap-2"
								onClick={() => navigate(`/${app.slug}`)}
							>
								Open
							</Button>
						) : (
							<Button
								className="gap-2 btn-install"
								onClick={() => appId && installApp(appId)}
							>
								{isInstalling ? (
									<Spin
										percent="auto"
										size="small"
										style={{ color: "white" }}
										className="mr-0.5"
									/>
								) : (
									<Download className="h-4 w-4" />
								)}

								{app.price ?? "Get"}
							</Button>
						)}
						<Button variant="outline" size="icon">
							<Share2 className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Screenshots</h2>
				<div className="flex gap-4 overflow-x-auto pb-4 snap-x">
					{app.screenshots.map((screenshot, index) => (
						<div
							key={index}
							className="flex-shrink-0 snap-center rounded-lg overflow-hidden"
						>
							<img
								src={screenshot || placeholderImg}
								alt={`${app.name} screenshot ${index + 1}`}
								width={800}
								height={400}
								className="h-[200px] md:h-[300px] w-auto object-cover"
							/>
						</div>
					))}
				</div>
			</div>

			<Tabs defaultValue="about" className="w-full">
				<TabsList className="grid w-full grid-cols-3 md:w-fit">
					<TabsTrigger value="about">About</TabsTrigger>
					<TabsTrigger value="reviews">Reviews</TabsTrigger>
					<TabsTrigger value="related">Related</TabsTrigger>
				</TabsList>
				<TabsContent value="about" className="space-y-6 pt-4">
					<div>
						<h3 className="text-lg font-semibold mb-2">Description</h3>
						<p className="whitespace-pre-line">{app.description}</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-2">Features</h3>
						<ul className="list-disc pl-5 space-y-1">
							{app.features.map((feature, index) => (
								<li key={index}>{feature}</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-2">Information</h3>
						<dl className="grid grid-cols-1 md:grid-cols-2 gap-2">
							<div className="flex">
								<dt className="w-32 font-medium">Developer</dt>
								<dd>{app.developer}</dd>
							</div>
							<div className="flex">
								<dt className="w-32 font-medium">Size</dt>
								<dd>{app.size}</dd>
							</div>
							<div className="flex">
								<dt className="w-32 font-medium">Category</dt>
								<dd>{app.category}</dd>
							</div>
							<div className="flex">
								<dt className="w-32 font-medium">Age Rating</dt>
								<dd>{app.ageRating}</dd>
							</div>
							<div className="flex">
								<dt className="w-32 font-medium">Version</dt>
								<dd>{app.version}</dd>
							</div>
							<div className="flex">
								<dt className="w-32 font-medium">Last Updated</dt>
								<dd>{app.lastUpdated}</dd>
							</div>
						</dl>
					</div>
				</TabsContent>

				<TabsContent value="reviews" className="space-y-6 pt-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold">Ratings & Reviews</h3>
						<Button variant="outline" size="sm">
							Write a Review
						</Button>
					</div>

					<div className="flex flex-col md:flex-row gap-6 items-start">
						<div className="flex flex-col items-center p-4 border rounded-lg">
							<span className="text-4xl font-bold">{app.rating}</span>
							<div className="flex my-2">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`h-4 w-4 ${
											i < Math.floor(app.rating)
												? "fill-primary text-primary"
												: "fill-muted text-muted"
										}`}
									/>
								))}
							</div>
							<span className="text-sm text-muted-foreground">
								{app.reviewCount.toLocaleString()} reviews
							</span>
						</div>

						<div className="flex-grow space-y-4">
							{app.reviews.map((review) => (
								<div
									key={review.id}
									className="border rounded-lg p-4 space-y-2"
								>
									<div className="flex items-center gap-2">
										<img
											src={review.avatar || "/placeholder.svg"}
											alt={review.user}
											width={40}
											height={40}
											className="rounded-full"
										/>
										<div>
											<p className="font-medium">{review.user}</p>
											<div className="flex items-center gap-2">
												<div className="flex">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`h-3 w-3 ${
																i < review.rating
																	? "fill-primary text-primary"
																	: "fill-muted text-muted"
															}`}
														/>
													))}
												</div>
												<span className="text-xs text-muted-foreground">
													{review.date}
												</span>
											</div>
										</div>
									</div>
									<p>{review.content}</p>
								</div>
							))}
							<Button variant="outline" className="w-full">
								Load More Reviews
							</Button>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="related" className="pt-4">
					<h3 className="text-lg font-semibold mb-4">You May Also Like</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						{app.relatedApps.map((relatedApp) => (
							<Link
								to={`/app/${relatedApp.id}`}
								key={relatedApp.id}
								className="border rounded-lg p-4 hover:bg-accent transition-colors"
							>
								<div className="flex items-center gap-3">
									<img
										src={relatedApp.icon || "/placeholder.svg"}
										alt={relatedApp.name}
										width={60}
										height={60}
										className="rounded-xl"
									/>
									<div>
										<h4 className="font-medium">{relatedApp.name}</h4>
										<p className="text-sm text-muted-foreground">
											{relatedApp.category}
										</p>
										<div className="flex items-center mt-1">
											<Star className="h-3 w-3 fill-primary text-primary" />
											<span className="text-xs ml-1">{relatedApp.rating}</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
