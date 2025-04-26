import { Button } from "@/components/ui/button";
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

export default function Privacy() {
	return (
		<TabsContent value="privacy" className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Privacy Settings</CardTitle>
					<CardDescription>
						Control how your information is used
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">App Tracking Transparency</h3>
							<p className="text-sm text-gray-500">
								Allow apps to request to track your activity across other
								companies' apps and websites
							</p>
						</div>
						<Switch id="app-tracking" />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Personalized Recommendations</h3>
							<p className="text-sm text-gray-500">
								Allow App Store to use your download history for personalized
								recommendations
							</p>
						</div>
						<Switch id="personalized-recs" defaultChecked />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Usage Data Sharing</h3>
							<p className="text-sm text-gray-500">
								Share app usage data to help developers improve their apps
							</p>
						</div>
						<Switch id="usage-data" defaultChecked />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Analytics & Improvements</h3>
							<p className="text-sm text-gray-500">
								Share App Store analytics data to help improve our services
							</p>
						</div>
						<Switch id="analytics" defaultChecked />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Security Settings</CardTitle>
					<CardDescription>Manage your account security</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Login History</h3>
							<p className="text-sm text-gray-500">
								View recent account access
							</p>
						</div>
						<Button variant="outline">View History</Button>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Trusted Devices</h3>
							<p className="text-sm text-gray-500">
								Manage devices that can access your account
							</p>
						</div>
						<Button variant="outline">Manage Devices</Button>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">App-Specific Passwords</h3>
							<p className="text-sm text-gray-500">
								Generate passwords for apps that don't support two-factor
								authentication
							</p>
						</div>
						<Button variant="outline">Manage</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Data & Privacy</CardTitle>
					<CardDescription>Manage your personal data</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Download Your Data</h3>
							<p className="text-sm text-gray-500">
								Get a copy of your App Store data
							</p>
						</div>
						<Button variant="outline">Request Data</Button>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Privacy Policy</h3>
							<p className="text-sm text-gray-500">Read our privacy policy</p>
						</div>
						<Button variant="outline">View Policy</Button>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
