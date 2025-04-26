import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
	Edit2,
	MessageSquare,
	Search,
	Star,
	ThumbsUp,
	Trash2,
} from "lucide-react";

type Review = {
	id: number;
	appName: string;
	appIcon: string;
	developer: string;
	category: string;
	rating: number;
	title: string;
	content: string;
	date: string;
	helpfulCount: number;
	hasDevResponse: boolean;
	devResponse?: string;
	devResponseDate?: string;
};

const reviews: Review[] = [
	{
		id: 1,
		appName: "Vectornator",
		appIcon:
			"https://cdn-images-1.medium.com/v2/resize:fit:1200/1*7WnZLJAPmmRvVXgzzy_aFA.png",
		developer: "Linearity GmbH",
		category: "Graphics & Design",
		rating: 5,
		title: "Incredible design tool!",
		content:
			"This app has completely transformed my workflow. The interface is intuitive, and the features are powerful. I especially love the precision tools and the smooth performance even with complex designs.",
		date: "2023-10-15",
		helpfulCount: 24,
		hasDevResponse: true,
		devResponse:
			"Thank you for your kind words! We're thrilled to hear that Vectornator has improved your workflow.",
		devResponseDate: "2023-10-16",
	},
	{
		id: 2,
		appName: "Procreate",
		appIcon:
			"https://www.iamag.co/wp-content/uploads/2016/10/Procreate-Icon.png",
		developer: "Savage Interactive",
		category: "Graphics & Design",
		rating: 4,
		title: "Great app, but needs some improvements",
		content:
			"I love using Procreate for my digital art, but there are a few features I wish it had. The brush engine is fantastic, and the interface is clean. However, I'd like to see better text tools and more animation capabilities.",
		date: "2023-09-22",
		helpfulCount: 18,
		hasDevResponse: false,
	},
	{
		id: 3,
		appName: "Notion",
		appIcon:
			"https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
		developer: "Notion Labs",
		category: "Productivity",
		rating: 5,
		title: "The ultimate productivity tool",
		content:
			"Notion has completely replaced several apps in my workflow. I use it for notes, project management, databases, and more. The flexibility is unmatched, and the recent performance improvements have made it even better.",
		date: "2023-11-05",
		helpfulCount: 32,
		hasDevResponse: true,
		devResponse:
			"We're so happy to hear that Notion has become such an integral part of your workflow! Thank you for the kind review.",
		devResponseDate: "2023-11-06",
	},
	{
		id: 4,
		appName: "Figma Mirror",
		appIcon:
			"https://cdn.sanity.io/images/599r6htc/regionalized/5094051dac77593d0f0978bdcbabaf79e5bb855c-1080x1080.png?w=540&h=540&q=75&fit=max&auto=format",
		developer: "Figma, Inc.",
		category: "Design",
		rating: 3,
		title: "Useful but unstable at times",
		content:
			"When it works, it's great for previewing designs on my device. However, I've experienced frequent disconnections and sometimes the app crashes when viewing complex designs. Hope these issues get fixed soon.",
		date: "2023-08-17",
		helpfulCount: 45,
		hasDevResponse: true,
		devResponse:
			"We appreciate your feedback and are actively working on stability improvements. An update addressing these issues will be released soon.",
		devResponseDate: "2023-08-18",
	},
	{
		id: 5,
		appName: "Swift Playgrounds",
		appIcon:
			"data:image/jpeg;base64,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",
		developer: "Apple",
		category: "Development",
		rating: 5,
		title: "Perfect for learning Swift",
		content:
			"As someone new to programming, Swift Playgrounds has been an incredible learning tool. The interactive lessons make complex concepts approachable, and I appreciate how it builds skills progressively. Highly recommended for beginners!",
		date: "2023-10-30",
		helpfulCount: 12,
		hasDevResponse: false,
	},
];

export default function MyReviews() {
	return (
		<Tabs defaultValue="all" className="space-y-4">
			<div className="flex flex-col sm:flex-row justify-between gap-4">
				<TabsList className="grid grid-cols-4 w-full sm:w-auto sm:inline-flex">
					<TabsTrigger value="all">All Reviews</TabsTrigger>
					<TabsTrigger value="recent">Recent</TabsTrigger>
					<TabsTrigger value="helpful">Most Helpful</TabsTrigger>
					<TabsTrigger value="responses">With Responses</TabsTrigger>
				</TabsList>

				<div className="flex gap-2 items-center">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<Input type="text" placeholder="Search reviews" className="pl-9" />
					</div>

					<Select defaultValue="date-desc">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="date-desc">Newest First</SelectItem>
							<SelectItem value="date-asc">Oldest First</SelectItem>
							<SelectItem value="rating-desc">Highest Rating</SelectItem>
							<SelectItem value="rating-asc">Lowest Rating</SelectItem>
							<SelectItem value="helpful">Most Helpful</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<TabsContent value="all" className="space-y-4">
				{reviews.map((review) => (
					<ReviewCard key={review.id} review={review} />
				))}
			</TabsContent>

			<TabsContent value="recent" className="space-y-4">
				{reviews
					.sort(
						(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
					)
					.slice(0, 3)
					.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
			</TabsContent>

			<TabsContent value="helpful" className="space-y-4">
				{reviews
					.sort((a, b) => b.helpfulCount - a.helpfulCount)
					.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
			</TabsContent>

			<TabsContent value="responses" className="space-y-4">
				{reviews
					.filter((review) => review.hasDevResponse)
					.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
			</TabsContent>
		</Tabs>
	);
}

function ReviewCard({ review }: { review: Review }) {
	const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const formattedResponseDate = review.devResponseDate
		? new Date(review.devResponseDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
		  })
		: null;

	return (
		<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
			<div className="p-4">
				<div className="flex gap-4">
					<div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
						<img
							src={review.appIcon || "/placeholder.svg"}
							alt={review.appName}
							width={48}
							height={48}
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="flex-1 min-w-0">
						<div className="flex justify-between items-start">
							<div>
								<h3 className="font-medium text-lg">{review.appName}</h3>
								<p className="text-sm text-gray-500">{review.developer}</p>
							</div>
							<Badge variant="outline" className="text-xs font-normal">
								{review.category}
							</Badge>
						</div>
					</div>
				</div>

				<div className="mt-4">
					<div className="flex justify-between items-center mb-2">
						<div className="flex items-center gap-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`h-4 w-4 ${
										i < review.rating
											? "text-yellow-400 fill-yellow-400"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className="text-sm text-gray-500">{formattedDate}</span>
					</div>

					<h4 className="font-medium mb-1">{review.title}</h4>
					<p className="text-gray-700 text-sm">{review.content}</p>

					<div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
						<div className="flex items-center gap-1">
							<ThumbsUp className="h-4 w-4" />
							<span>{review.helpfulCount} helpful</span>
						</div>

						<div className="flex gap-2">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 px-2 text-blue-600"
									>
										<Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Edit Your Review</DialogTitle>
										<DialogDescription>
											Update your review for {review.appName}
										</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="flex items-center gap-4">
											<img
												src={review.appIcon || "/placeholder.svg"}
												alt={review.appName}
												width={48}
												height={48}
												className="w-12 h-12 rounded-xl object-cover"
											/>
											<div>
												<h3 className="font-medium">{review.appName}</h3>
												<p className="text-sm text-gray-500">
													{review.developer}
												</p>
											</div>
										</div>
										<div>
											<div className="flex items-center gap-1 mb-2">
												{[...Array(5)].map((_, i) => (
													<button key={i} className="focus:outline-none">
														<Star
															className={`h-6 w-6 ${
																i < review.rating
																	? "text-yellow-400 fill-yellow-400"
																	: "text-gray-300"
															}`}
														/>
													</button>
												))}
											</div>
										</div>
										<div>
											<label htmlFor="title" className="text-sm font-medium">
												Title
											</label>
											<Input
												id="title"
												defaultValue={review.title}
												className="mt-1"
											/>
										</div>
										<div>
											<label htmlFor="review" className="text-sm font-medium">
												Review
											</label>
											<Textarea
												id="review"
												defaultValue={review.content}
												className="mt-1"
												rows={5}
											/>
										</div>
									</div>
									<DialogFooter>
										<Button variant="outline">Cancel</Button>
										<Button>Save Changes</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>

							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 px-2 text-red-600"
									>
										<Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Delete Review</DialogTitle>
										<DialogDescription>
											Are you sure you want to delete your review for{" "}
											{review.appName}? This action cannot be undone.
										</DialogDescription>
									</DialogHeader>
									<DialogFooter>
										<Button variant="outline">Cancel</Button>
										<Button variant="destructive">Delete Review</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</div>

				{review.hasDevResponse && (
					<div className="mt-4 bg-gray-50 rounded-lg p-3">
						<div className="flex items-center gap-2 mb-2">
							<MessageSquare className="h-4 w-4 text-blue-600" />
							<h5 className="font-medium text-sm">Developer Response</h5>
							<span className="text-xs text-gray-500 ml-auto">
								{formattedResponseDate}
							</span>
						</div>
						<p className="text-sm text-gray-700">{review.devResponse}</p>
					</div>
				)}
			</div>
		</div>
	);
}
