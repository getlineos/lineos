import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Accessibility,
	Bell,
	Code,
	Download,
	HelpCircle,
	Monitor,
	Moon,
	Shield,
	Sun,
	User,
} from "lucide-react";
import { myApps } from "../../utils";
import Account from "./views/Account";
import Developer from "./views/Developer";
import Privacy from "./views/Privacy";
import Notifications from "./views/Notifications";

export default function Settings() {
	return (
		<Tabs defaultValue="account" className="space-y-4">
			<div className="flex">
				<TabsList className="flex-col h-[300px] space-y-1 bg-transparent p-0 w-64 sticky top-[94px]">
					<TabsTrigger
						value="account"
						className="justify-start w-full data-[state=active]:bg-muted data-[state=active]:shadow-none"
					>
						<User className="h-4 w-4 mr-2" />
						Account
					</TabsTrigger>
					<TabsTrigger
						value="privacy"
						className="justify-start w-full data-[state=active]:bg-muted data-[state=active]:shadow-none"
					>
						<Shield className="h-4 w-4 mr-2" />
						Privacy & Security
					</TabsTrigger>
					<TabsTrigger
						value="notifications"
						className="justify-start w-full data-[state=active]:bg-muted data-[state=active]:shadow-none"
					>
						<Bell className="h-4 w-4 mr-2" />
						Notifications
					</TabsTrigger>
					<TabsTrigger
						value="appearance"
						className="justify-start w-full data-[state=active]:bg-muted data-[state=active]:shadow-none"
					>
						<Monitor className="h-4 w-4 mr-2" />
						Display & Appearance
					</TabsTrigger>
					<TabsTrigger
						value="downloads"
						className="justify-start w-full data-[state=active]:bg-muted data-[state=active]:shadow-none"
					>
						<Download className="h-4 w-4 mr-2" />
						Downloads & Storage
					</TabsTrigger>
					<TabsTrigger
						value="accessibility"
						className="justify-start w-full data-[state=active]:bg-muted data-[state=active]:shadow-none"
					>
						<Accessibility className="h-4 w-4 mr-2" />
						Accessibility
					</TabsTrigger>
					<TabsTrigger
						value="developer"
						className="justify-start w-full data-[state=active]:bg-muted data-[state=active]:shadow-none"
					>
						<Code className="h-4 w-4 mr-2" />
						Developer
					</TabsTrigger>
					<TabsTrigger
						value="help"
						className="justify-start w-full data-[state=active]:bg-muted data-[state=active]:shadow-none"
					>
						<HelpCircle className="h-4 w-4 mr-2" />
						Help & Support
					</TabsTrigger>
				</TabsList>

				<div className="flex-1 ml-8">
					<Account />
					<Privacy />
					<Notifications />

					{/* Display & Appearance Settings */}
					<TabsContent value="appearance" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Theme</CardTitle>
								<CardDescription>Choose your preferred theme</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-3 gap-4">
									<div className="flex flex-col items-center gap-2">
										<div className="border rounded-lg p-2 cursor-pointer bg-white hover:border-blue-500 hover:shadow-sm">
											<Sun className="h-8 w-8 text-yellow-500" />
										</div>
										<span className="text-sm font-medium">Light</span>
									</div>
									<div className="flex flex-col items-center gap-2">
										<div className="border rounded-lg p-2 cursor-pointer bg-gray-900 hover:border-blue-500 hover:shadow-sm">
											<Moon className="h-8 w-8 text-blue-400" />
										</div>
										<span className="text-sm font-medium">Dark</span>
									</div>
									<div className="flex flex-col items-center gap-2">
										<div className="border rounded-lg p-2 cursor-pointer bg-gradient-to-r from-white to-gray-900 hover:border-blue-500 hover:shadow-sm">
											<div className="flex">
												<Sun className="h-8 w-8 text-yellow-500" />
												<Moon className="h-8 w-8 text-blue-400" />
											</div>
										</div>
										<span className="text-sm font-medium">System</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Language & Region</CardTitle>
								<CardDescription>
									Set your preferred language and regional settings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="language">Language</Label>
									<Select defaultValue="en-US">
										<SelectTrigger id="language">
											<SelectValue placeholder="Select language" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="en-US">
												English (United States)
											</SelectItem>
											<SelectItem value="en-GB">
												English (United Kingdom)
											</SelectItem>
											<SelectItem value="es">Spanish</SelectItem>
											<SelectItem value="fr">French</SelectItem>
											<SelectItem value="de">German</SelectItem>
											<SelectItem value="ja">Japanese</SelectItem>
											<SelectItem value="zh-CN">
												Chinese (Simplified)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="region">Region</Label>
									<Select defaultValue="us">
										<SelectTrigger id="region">
											<SelectValue placeholder="Select region" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="us">United States</SelectItem>
											<SelectItem value="ca">Canada</SelectItem>
											<SelectItem value="uk">United Kingdom</SelectItem>
											<SelectItem value="au">Australia</SelectItem>
											<SelectItem value="jp">Japan</SelectItem>
											<SelectItem value="de">Germany</SelectItem>
											<SelectItem value="fr">France</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="timezone">Time Zone</Label>
									<Select defaultValue="america-los_angeles">
										<SelectTrigger id="timezone">
											<SelectValue placeholder="Select time zone" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="america-los_angeles">
												Pacific Time (US & Canada)
											</SelectItem>
											<SelectItem value="america-denver">
												Mountain Time (US & Canada)
											</SelectItem>
											<SelectItem value="america-chicago">
												Central Time (US & Canada)
											</SelectItem>
											<SelectItem value="america-new_york">
												Eastern Time (US & Canada)
											</SelectItem>
											<SelectItem value="europe-london">London</SelectItem>
											<SelectItem value="europe-paris">Paris</SelectItem>
											<SelectItem value="asia-tokyo">Tokyo</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save Changes</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>App Display</CardTitle>
								<CardDescription>
									Customize how apps are displayed
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Show App Ratings</h3>
										<p className="text-sm text-gray-500">
											Display app ratings in the store
										</p>
									</div>
									<Switch id="show-ratings" defaultChecked />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Show In-App Purchases</h3>
										<p className="text-sm text-gray-500">
											Display in-app purchase information
										</p>
									</div>
									<Switch id="show-iap" defaultChecked />
								</div>

								<Separator />

								<div className="space-y-2">
									<Label htmlFor="default-view">Default View</Label>
									<Select defaultValue="grid">
										<SelectTrigger id="default-view">
											<SelectValue placeholder="Select default view" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="grid">Grid</SelectItem>
											<SelectItem value="list">List</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Downloads & Storage Settings */}
					<TabsContent value="downloads" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Download Settings</CardTitle>
								<CardDescription>
									Manage how apps are downloaded
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Automatic Downloads</h3>
										<p className="text-sm text-gray-500">
											Automatically download apps purchased on other devices
										</p>
									</div>
									<Switch id="auto-downloads" defaultChecked />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Automatic Updates</h3>
										<p className="text-sm text-gray-500">
											Automatically update apps when new versions are available
										</p>
									</div>
									<Switch id="auto-updates" defaultChecked />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Download Over Cellular</h3>
										<p className="text-sm text-gray-500">
											Allow downloads using cellular data
										</p>
									</div>
									<Switch id="cellular-downloads" />
								</div>

								<Separator />

								<div className="space-y-2">
									<Label htmlFor="download-quality">
										Video Download Quality
									</Label>
									<Select defaultValue="high">
										<SelectTrigger id="download-quality">
											<SelectValue placeholder="Select quality" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="high">High</SelectItem>
											<SelectItem value="medium">Medium</SelectItem>
											<SelectItem value="low">Low</SelectItem>
											<SelectItem value="data-saver">Data Saver</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Storage Management</CardTitle>
								<CardDescription>
									Manage app storage on your device
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<h3 className="font-medium">Storage Usage</h3>
										<Badge variant="outline">128 GB Total</Badge>
									</div>

									<div className="w-full bg-gray-100 rounded-full h-4">
										<div className="flex h-full rounded-full overflow-hidden">
											<div className="bg-blue-500 w-[35%]" title="Apps"></div>
											<div className="bg-green-500 w-[25%]" title="Media"></div>
											<div
												className="bg-yellow-500 w-[15%]"
												title="System"
											></div>
											<div className="bg-gray-200 w-[25%]" title="Free"></div>
										</div>
									</div>

									<div className="flex justify-between text-xs text-gray-500">
										<div className="flex items-center gap-1">
											<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
											<span>Apps (45 GB)</span>
										</div>
										<div className="flex items-center gap-1">
											<div className="w-2 h-2 bg-green-500 rounded-full"></div>
											<span>Media (32 GB)</span>
										</div>
										<div className="flex items-center gap-1">
											<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
											<span>System (19 GB)</span>
										</div>
										<div className="flex items-center gap-1">
											<div className="w-2 h-2 bg-gray-200 rounded-full"></div>
											<span>Free (32 GB)</span>
										</div>
									</div>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Offload Unused Apps</h3>
										<p className="text-sm text-gray-500">
											Automatically remove unused apps when storage is low
										</p>
									</div>
									<Switch id="offload-apps" defaultChecked />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Clear App Cache</h3>
										<p className="text-sm text-gray-500">
											Remove temporary files to free up space
										</p>
									</div>
									<Button variant="outline">Clear Cache</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>App Storage</CardTitle>
								<CardDescription>
									View and manage storage used by apps
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
												<img
													src={myApps[0].icon}
													alt="Vectornator"
													width={40}
													height={40}
													className="object-cover rounded-md"
												/>
											</div>
											<div>
												<h3 className="font-medium">Vectornator</h3>
												<p className="text-sm text-gray-500">1.2 GB</p>
											</div>
										</div>
										<Button variant="outline" size="sm">
											Manage
										</Button>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
												<img
													src={myApps[1].icon}
													alt="Procreate"
													width={40}
													height={40}
													className="object-cover rounded-md"
												/>
											</div>
											<div>
												<h3 className="font-medium">Procreate</h3>
												<p className="text-sm text-gray-500">3.5 GB</p>
											</div>
										</div>
										<Button variant="outline" size="sm">
											Manage
										</Button>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
												<img
													src={myApps[2].icon}
													alt="Notion"
													width={40}
													height={40}
													className="object-cover rounded-md"
												/>
											</div>
											<div>
												<h3 className="font-medium">Notion</h3>
												<p className="text-sm text-gray-500">850 MB</p>
											</div>
										</div>
										<Button variant="outline" size="sm">
											Manage
										</Button>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									View All Apps
								</Button>
							</CardFooter>
						</Card>
					</TabsContent>

					{/* Accessibility Settings */}
					<TabsContent value="accessibility" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Visual Settings</CardTitle>
								<CardDescription>
									Customize visual appearance for better accessibility
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Larger Text</h3>
										<p className="text-sm text-gray-500">
											Increase text size for better readability
										</p>
									</div>
									<Switch id="larger-text" />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Bold Text</h3>
										<p className="text-sm text-gray-500">
											Make text bold for better visibility
										</p>
									</div>
									<Switch id="bold-text" />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Reduce Motion</h3>
										<p className="text-sm text-gray-500">
											Minimize animations and motion effects
										</p>
									</div>
									<Switch id="reduce-motion" />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Increase Contrast</h3>
										<p className="text-sm text-gray-500">
											Enhance visual contrast for better readability
										</p>
									</div>
									<Switch id="increase-contrast" />
								</div>

								<Separator />

								<div className="space-y-2">
									<Label htmlFor="color-filter">Color Filters</Label>
									<Select defaultValue="none">
										<SelectTrigger id="color-filter">
											<SelectValue placeholder="Select color filter" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="none">None</SelectItem>
											<SelectItem value="grayscale">Grayscale</SelectItem>
											<SelectItem value="red-green">
												Red-Green Filter (Protanopia)
											</SelectItem>
											<SelectItem value="green-red">
												Green-Red Filter (Deuteranopia)
											</SelectItem>
											<SelectItem value="blue-yellow">
												Blue-Yellow Filter (Tritanopia)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Screen Reader</CardTitle>
								<CardDescription>
									Configure screen reader settings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">VoiceOver</h3>
										<p className="text-sm text-gray-500">
											Enable screen reader functionality
										</p>
									</div>
									<Switch id="voice-over" />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Speaking Rate</h3>
										<p className="text-sm text-gray-500">
											Adjust the speed of the screen reader
										</p>
									</div>
									<div className="w-1/3">
										<div className="flex items-center gap-2">
											<span className="text-sm">Slow</span>
											<Input
												type="range"
												min="1"
												max="10"
												defaultValue="5"
												className="w-full"
											/>
											<span className="text-sm">Fast</span>
										</div>
									</div>
								</div>

								<Separator />

								<div className="space-y-2">
									<Label htmlFor="voice">Voice</Label>
									<Select defaultValue="default">
										<SelectTrigger id="voice">
											<SelectValue placeholder="Select voice" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="default">Default</SelectItem>
											<SelectItem value="enhanced">Enhanced</SelectItem>
											<SelectItem value="male">Male Voice</SelectItem>
											<SelectItem value="female">Female Voice</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Interaction Settings</CardTitle>
								<CardDescription>
									Customize how you interact with the App Store
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Touch Accommodations</h3>
										<p className="text-sm text-gray-500">
											Adjust touch sensitivity and response
										</p>
									</div>
									<Switch id="touch-accommodations" />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Keyboard Accessibility</h3>
										<p className="text-sm text-gray-500">
											Enable full keyboard navigation
										</p>
									</div>
									<Switch id="keyboard-accessibility" defaultChecked />
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Switch Control</h3>
										<p className="text-sm text-gray-500">
											Control the interface using switches
										</p>
									</div>
									<Switch id="switch-control" />
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Developer Settings */}
					<Developer />

					{/* Help & Support Settings */}
					<TabsContent value="help" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Help Resources</CardTitle>
								<CardDescription>
									Find help and support resources
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">App Store Help</h3>
										<p className="text-sm text-gray-500">
											Get help with App Store features and issues
										</p>
									</div>
									<Button variant="outline">View Help</Button>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Developer Documentation</h3>
										<p className="text-sm text-gray-500">
											Access developer guides and documentation
										</p>
									</div>
									<Button variant="outline">View Docs</Button>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Community Forums</h3>
										<p className="text-sm text-gray-500">
											Connect with other developers and users
										</p>
									</div>
									<Button variant="outline">Visit Forums</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Support</CardTitle>
								<CardDescription>
									Get help with your account or apps
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Contact Support</h3>
										<p className="text-sm text-gray-500">
											Get help from our support team
										</p>
									</div>
									<Button>Contact Us</Button>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Report a Problem</h3>
										<p className="text-sm text-gray-500">
											Report issues with apps or the App Store
										</p>
									</div>
									<Button variant="outline">Report</Button>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Support Tickets</h3>
										<p className="text-sm text-gray-500">
											View your open support requests
										</p>
									</div>
									<Button variant="outline">View Tickets</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Legal & Policies</CardTitle>
								<CardDescription>
									View legal information and policies
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Terms of Service</h3>
										<p className="text-sm text-gray-500">
											App Store terms of service
										</p>
									</div>
									<Button variant="outline">View</Button>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">Privacy Policy</h3>
										<p className="text-sm text-gray-500">
											How we handle your data
										</p>
									</div>
									<Button variant="outline">View</Button>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">App Review Guidelines</h3>
										<p className="text-sm text-gray-500">
											Guidelines for app submissions
										</p>
									</div>
									<Button variant="outline">View</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</div>
			</div>
		</Tabs>
	);
}
