import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Check, HelpCircle, Info } from "lucide-react";

export default function Review() {
	return (
		<TabsContent value="review" className="space-y-6">
			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<div className="flex items-start">
					<div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
						<Info className="h-6 w-6 text-blue-600" />
					</div>
					<div className="ml-4">
						<h2 className="text-lg font-semibold">App Review Guidelines</h2>
						<p className="text-gray-600 mt-1">
							Before submitting your app, please ensure it complies with our App
							Review Guidelines. This will help expedite the review process.
						</p>
					</div>
				</div>

				<div className="mt-6 space-y-4">
					<div className="p-4 border rounded-lg bg-gray-50">
						<div className="flex items-center">
							<Check className="h-5 w-5 text-green-500 mr-2" />
							<h3 className="font-medium">Safety</h3>
						</div>
						<p className="text-sm text-gray-600 mt-1 ml-7">
							Apps must not contain objectionable content, harm device
							functionality, or use non-public APIs.
						</p>
					</div>

					<div className="p-4 border rounded-lg bg-gray-50">
						<div className="flex items-center">
							<Check className="h-5 w-5 text-green-500 mr-2" />
							<h3 className="font-medium">Performance</h3>
						</div>
						<p className="text-sm text-gray-600 mt-1 ml-7">
							Apps should be tested for bugs and stability before submission.
							Ensure your app provides value and functions as expected.
						</p>
					</div>

					<div className="p-4 border rounded-lg bg-gray-50">
						<div className="flex items-center">
							<Check className="h-5 w-5 text-green-500 mr-2" />
							<h3 className="font-medium">Business</h3>
						</div>
						<p className="text-sm text-gray-600 mt-1 ml-7">
							Apps must comply with legal requirements and app store policies
							regarding purchases, subscriptions, and data collection.
						</p>
					</div>

					<div className="p-4 border rounded-lg bg-gray-50">
						<div className="flex items-center">
							<Check className="h-5 w-5 text-green-500 mr-2" />
							<h3 className="font-medium">Design</h3>
						</div>
						<p className="text-sm text-gray-600 mt-1 ml-7">
							Apps should follow platform design guidelines, provide a quality
							user interface, and deliver a cohesive experience.
						</p>
					</div>
				</div>

				<div className="mt-6">
					<Button variant="outline" className="text-blue-600">
						<HelpCircle className="h-4 w-4 mr-2" />
						View Complete Guidelines
					</Button>
				</div>
			</div>

			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-lg font-semibold mb-4">Notes for Review Team</h2>
				<p className="text-sm text-gray-600 mb-3">
					Provide any additional information that might help the review team
					understand your app better.
				</p>
				<Textarea
					placeholder="Include details such as test account credentials, special instructions, or explanations about your app's functionality."
					className="w-full min-h-[120px]"
				/>
			</div>

			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-lg font-semibold mb-4">Content Ratings</h2>
				<p className="text-sm text-gray-600 mb-4">
					Select the appropriate content ratings for your app. This helps users
					determine if your app is suitable for them.
				</p>

				<div className="space-y-4">
					<div>
						<Label className="text-sm font-medium mb-2 block">Age Rating</Label>
						<RadioGroup defaultValue="4+" className="flex flex-wrap gap-3">
							<div className="flex items-center space-x-2 border rounded-md px-3 py-2">
								<RadioGroupItem value="4+" id="4+" />
								<Label htmlFor="4+">4+</Label>
							</div>
							<div className="flex items-center space-x-2 border rounded-md px-3 py-2">
								<RadioGroupItem value="9+" id="9+" />
								<Label htmlFor="9+">9+</Label>
							</div>
							<div className="flex items-center space-x-2 border rounded-md px-3 py-2">
								<RadioGroupItem value="12+" id="12+" />
								<Label htmlFor="12+">12+</Label>
							</div>
							<div className="flex items-center space-x-2 border rounded-md px-3 py-2">
								<RadioGroupItem value="17+" id="17+" />
								<Label htmlFor="17+">17+</Label>
							</div>
						</RadioGroup>
					</div>

					<div className="pt-2">
						<Label className="text-sm font-medium mb-2 block">
							Content Descriptors
						</Label>
						<div className="grid grid-cols-2 gap-2">
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="violence"
									className="rounded text-blue-600"
								/>
								<Label htmlFor="violence" className="text-sm">
									Violence
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="profanity"
									className="rounded text-blue-600"
								/>
								<Label htmlFor="profanity" className="text-sm">
									Profanity
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="mature"
									className="rounded text-blue-600"
								/>
								<Label htmlFor="mature" className="text-sm">
									Mature Themes
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="gambling"
									className="rounded text-blue-600"
								/>
								<Label htmlFor="gambling" className="text-sm">
									Gambling
								</Label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</TabsContent>
	);
}
