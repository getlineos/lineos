import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";

export default function Notifications() {
	return (
		<TabsContent value="notifications" className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Notification Preferences</CardTitle>
					<CardDescription>
						Control how and when you receive notifications
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Push Notifications</h3>
							<p className="text-sm text-gray-500">
								Receive notifications on your device
							</p>
						</div>
						<Switch id="push-notifications" defaultChecked />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Email Notifications</h3>
							<p className="text-sm text-gray-500">
								Receive notifications via email
							</p>
						</div>
						<Switch id="email-notifications" defaultChecked />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Notification Types</CardTitle>
					<CardDescription>
						Choose which notifications you want to receive
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">App Updates</h3>
							<p className="text-sm text-gray-500">
								Notifications about updates to your installed apps
							</p>
						</div>
						<Switch id="app-updates" defaultChecked />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">New Releases</h3>
							<p className="text-sm text-gray-500">
								Notifications about new app releases based on your interests
							</p>
						</div>
						<Switch id="new-releases" defaultChecked />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Subscriptions</h3>
							<p className="text-sm text-gray-500">
								Notifications about your subscription renewals and changes
							</p>
						</div>
						<Switch id="subscriptions" defaultChecked />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Promotions & Offers</h3>
							<p className="text-sm text-gray-500">
								Notifications about deals and special offers
							</p>
						</div>
						<Switch id="promotions" />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">App Suggestions</h3>
							<p className="text-sm text-gray-500">
								Personalized app recommendations
							</p>
						</div>
						<Switch id="app-suggestions" defaultChecked />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Developer Notifications</CardTitle>
					<CardDescription>For app developers only</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">App Review Status</h3>
							<p className="text-sm text-gray-500">
								Notifications about your app review process
							</p>
						</div>
						<Switch id="app-review" defaultChecked />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Sales Reports</h3>
							<p className="text-sm text-gray-500">
								Daily and weekly sales reports
							</p>
						</div>
						<Switch id="sales-reports" defaultChecked />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">User Reviews</h3>
							<p className="text-sm text-gray-500">
								Notifications when users review your apps
							</p>
						</div>
						<Switch id="user-reviews" defaultChecked />
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
