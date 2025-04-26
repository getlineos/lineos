import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	ArrowRight,
	Briefcase,
	Building,
	CheckCircle2,
	CreditCard,
	FileText,
	Globe,
	HelpCircle,
	Info,
	Laptop,
	Shield,
	Smartphone,
	User,
	Users,
} from "lucide-react";
import { Link } from "react-router";
export default function DeveloperApplication() {
	return (
		<main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
			<div className="mb-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-2">
					Join the Developer Program
				</h2>
				<p className="text-gray-600">
					Create and distribute apps for iOS, iPadOS, macOS, tvOS, and watchOS
					on the App Store.
				</p>
			</div>

			<div className="mb-8">
				<div className="bg-white rounded-lg shadow overflow-hidden">
					<div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
						<div className="flex items-start">
							<Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
							<div>
								<h3 className="text-sm font-medium text-blue-800">
									Before you begin
								</h3>
								<p className="mt-1 text-sm text-blue-700">
									Make sure you have the following information ready:
								</p>
								<ul className="mt-2 text-sm text-blue-700 list-disc pl-5 space-y-1">
									<li>Legal entity information (for organizations)</li>
									<li>A valid form of payment for the annual fee</li>
									<li>
										A government-issued photo ID for identity verification
									</li>
									<li>D-U-N-S Number (for organizations)</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Tabs defaultValue="step1" className="space-y-8">
				<div className="bg-white rounded-lg shadow p-1">
					<TabsList className="grid grid-cols-5 w-full">
						<TabsTrigger
							value="step1"
							className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
						>
							<span className="flex items-center">
								<span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-2">
									1
								</span>
								<span className="hidden sm:inline">Account Type</span>
							</span>
						</TabsTrigger>
						<TabsTrigger
							value="step2"
							className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
						>
							<span className="flex items-center">
								<span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-medium mr-2">
									2
								</span>
								<span className="hidden sm:inline">Entity Info</span>
							</span>
						</TabsTrigger>
						<TabsTrigger
							value="step3"
							className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
						>
							<span className="flex items-center">
								<span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-medium mr-2">
									3
								</span>
								<span className="hidden sm:inline">Agreements</span>
							</span>
						</TabsTrigger>
						<TabsTrigger
							value="step4"
							className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
						>
							<span className="flex items-center">
								<span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-medium mr-2">
									4
								</span>
								<span className="hidden sm:inline">Payment</span>
							</span>
						</TabsTrigger>
						<TabsTrigger
							value="step5"
							className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
						>
							<span className="flex items-center">
								<span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-medium mr-2">
									5
								</span>
								<span className="hidden sm:inline">Review</span>
							</span>
						</TabsTrigger>
					</TabsList>
				</div>

				{/* Step 1: Account Type */}
				<TabsContent value="step1" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Select Account Type</CardTitle>
							<CardDescription>
								Choose the type of developer account you want to create
							</CardDescription>
						</CardHeader>
						<CardContent>
							<RadioGroup defaultValue="individual" className="space-y-4">
								<div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
									<RadioGroupItem
										value="individual"
										id="individual"
										className="mt-1"
									/>
									<div>
										<Label
											htmlFor="individual"
											className="text-base font-medium flex items-center"
										>
											<User className="h-5 w-5 mr-2 text-blue-500" />
											Individual
										</Label>
										<p className="text-sm text-gray-600 mt-1">
											For individual developers publishing under their own name.
											Annual fee: $99 USD.
										</p>
										<ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
											<li>Publish apps under your own name</li>
											<li>Full access to developer tools and resources</li>
											<li>Simplified enrollment process</li>
										</ul>
									</div>
								</div>

								<div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
									<RadioGroupItem
										value="organization"
										id="organization"
										className="mt-1"
									/>
									<div>
										<Label
											htmlFor="organization"
											className="text-base font-medium flex items-center"
										>
											<Building className="h-5 w-5 mr-2 text-blue-500" />
											Organization
										</Label>
										<p className="text-sm text-gray-600 mt-1">
											For companies, nonprofits, educational institutions, and
											government organizations. Annual fee: $99 USD.
										</p>
										<ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
											<li>Publish apps under your organization's name</li>
											<li>
												Add team members with different roles and permissions
											</li>
											<li>
												Requires a D-U-N-S Number and legal entity verification
											</li>
										</ul>
									</div>
								</div>

								<div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
									<RadioGroupItem
										value="enterprise"
										id="enterprise"
										className="mt-1"
									/>
									<div>
										<Label
											htmlFor="enterprise"
											className="text-base font-medium flex items-center"
										>
											<Briefcase className="h-5 w-5 mr-2 text-blue-500" />
											Enterprise
										</Label>
										<p className="text-sm text-gray-600 mt-1">
											For large organizations to develop and distribute
											proprietary apps internally. Annual fee: $299 USD.
										</p>
										<ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
											<li>
												Distribute proprietary apps within your organization
											</li>
											<li>Not for App Store distribution</li>
											<li>Requires 100+ employees and D-U-N-S Number</li>
										</ul>
									</div>
								</div>

								<div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
									<RadioGroupItem
										value="education"
										id="education"
										className="mt-1"
									/>
									<div>
										<Label
											htmlFor="education"
											className="text-base font-medium flex items-center"
										>
											<Globe className="h-5 w-5 mr-2 text-blue-500" />
											Educational Institution
										</Label>
										<p className="text-sm text-gray-600 mt-1">
											For accredited educational institutions. Free enrollment.
										</p>
										<ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
											<li>Teach app development in classroom settings</li>
											<li>Limited to educational purposes</li>
											<li>Requires verification of educational status</li>
										</ul>
									</div>
								</div>
							</RadioGroup>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Cancel</Button>
							<Button className="gap-2">
								Continue <ArrowRight className="h-4 w-4" />
							</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Developer Program Benefits</CardTitle>
							<CardDescription>
								What you get with your membership
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-2 gap-6">
								<div className="flex items-start gap-3">
									<div className="bg-blue-100 p-2 rounded-full">
										<Smartphone className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium mb-1">App Store Distribution</h3>
										<p className="text-sm text-gray-600">
											Distribute your apps to billions of users worldwide
											through the App Store.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="bg-blue-100 p-2 rounded-full">
										<Laptop className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium mb-1">Development Tools</h3>
										<p className="text-sm text-gray-600">
											Access to beta software, advanced app capabilities, and
											testing tools.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="bg-blue-100 p-2 rounded-full">
										<Users className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium mb-1">
											TestFlight Beta Testing
										</h3>
										<p className="text-sm text-gray-600">
											Distribute pre-release versions of your apps to up to
											10,000 testers.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="bg-blue-100 p-2 rounded-full">
										<Shield className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium mb-1">App Analytics</h3>
										<p className="text-sm text-gray-600">
											Gain insights into your app's usage, performance, and user
											engagement.
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Step 2: Entity Information */}
				<TabsContent value="step2" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
							<CardDescription>
								Provide your primary contact details
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="first-name">First Name</Label>
									<Input id="first-name" placeholder="Enter your first name" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="last-name">Last Name</Label>
									<Input id="last-name" placeholder="Enter your last name" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email Address</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email address"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input
										id="phone"
										type="tel"
										placeholder="Enter your phone number"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Entity Information</CardTitle>
							<CardDescription>
								Provide details about your organization
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="entity-name">Legal Entity Name</Label>
								<Input
									id="entity-name"
									placeholder="Enter your organization's legal name"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="entity-type">Entity Type</Label>
								<Select>
									<SelectTrigger id="entity-type">
										<SelectValue placeholder="Select entity type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="corporation">Corporation</SelectItem>
										<SelectItem value="llc">
											Limited Liability Company (LLC)
										</SelectItem>
										<SelectItem value="partnership">Partnership</SelectItem>
										<SelectItem value="nonprofit">
											Nonprofit Organization
										</SelectItem>
										<SelectItem value="government">
											Government Organization
										</SelectItem>
										<SelectItem value="educational">
											Educational Institution
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="duns">D-U-N-S Number</Label>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													variant="ghost"
													size="sm"
													className="h-8 w-8 p-0"
												>
													<HelpCircle className="h-4 w-4" />
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p className="max-w-xs">
													A D-U-N-S Number is a unique nine-digit identifier for
													businesses, required for organization developer
													accounts. You can look up or request a free D-U-N-S
													Number.
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<div className="flex gap-2">
									<Input id="duns" placeholder="Enter your D-U-N-S Number" />
									<Button variant="outline">Look Up</Button>
								</div>
								<p className="text-xs text-gray-500">
									Don't have a D-U-N-S Number?{" "}
									<Link to="#" className="text-blue-600 hover:underline">
										Request one for free
									</Link>
								</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="website">Website</Label>
								<Input
									id="website"
									type="url"
									placeholder="https://www.example.com"
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Business Address</CardTitle>
							<CardDescription>Provide your business address</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2 md:col-span-2">
									<Label htmlFor="address-line1">Address Line 1</Label>
									<Input id="address-line1" placeholder="Street address" />
								</div>
								<div className="space-y-2 md:col-span-2">
									<Label htmlFor="address-line2">
										Address Line 2 (Optional)
									</Label>
									<Input
										id="address-line2"
										placeholder="Apartment, suite, unit, etc."
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="city">City</Label>
									<Input id="city" placeholder="City" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="state">State/Province</Label>
									<Input id="state" placeholder="State/Province" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="postal-code">Postal Code</Label>
									<Input id="postal-code" placeholder="Postal code" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="country">Country</Label>
									<Select>
										<SelectTrigger id="country">
											<SelectValue placeholder="Select country" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="us">United States</SelectItem>
											<SelectItem value="ca">Canada</SelectItem>
											<SelectItem value="uk">United Kingdom</SelectItem>
											<SelectItem value="au">Australia</SelectItem>
											<SelectItem value="de">Germany</SelectItem>
											<SelectItem value="fr">France</SelectItem>
											<SelectItem value="jp">Japan</SelectItem>
											{/* Add more countries as needed */}
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Back</Button>
							<Button className="gap-2">
								Continue <ArrowRight className="h-4 w-4" />
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				{/* Step 3: Agreements */}
				<TabsContent value="step3" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Legal Agreements</CardTitle>
							<CardDescription>
								Review and accept the developer program agreements
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="font-medium">
										Developer Program License Agreement
									</h3>
									<Button variant="outline" size="sm">
										<FileText className="h-4 w-4 mr-2" />
										View Full Agreement
									</Button>
								</div>
								<div className="bg-gray-50 border rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-700">
									<p className="mb-4">
										<strong>APPLE DEVELOPER PROGRAM LICENSE AGREEMENT</strong>
									</p>
									<p className="mb-4">
										Purpose: This Agreement defines the relationship between you
										and Apple Inc. ("Apple") and governs your participation in
										the Apple Developer Program.
									</p>
									<p className="mb-4">
										By accepting this Agreement, you agree to comply with all
										terms and conditions of this Agreement, including the
										Program Requirements and the Apple Developer Code of
										Conduct.
									</p>
									<p className="mb-4">
										This Agreement grants you a limited license to use Apple
										Software and Services for developing and testing
										applications designed to operate on Apple Products.
									</p>
									<p className="mb-4">
										You agree that all applications developed under this
										Agreement will comply with the Documentation and Program
										Requirements, including the App Review Guidelines.
									</p>
									<p className="mb-4">
										You retain your rights to Your Applications and Your
										Content, subject to Apple's rights to distribute Your
										Applications through the App Store or other Apple
										distribution channels.
									</p>
									<p className="mb-4">
										This is a summary of key points and does not represent the
										full agreement. Please review the complete agreement before
										accepting.
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox id="accept-license" />
									<label
										htmlFor="accept-license"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										I have read and agree to the Developer Program License
										Agreement
									</label>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="font-medium">App Store Review Guidelines</h3>
									<Button variant="outline" size="sm">
										<FileText className="h-4 w-4 mr-2" />
										View Guidelines
									</Button>
								</div>
								<div className="bg-gray-50 border rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-700">
									<p className="mb-4">
										<strong>APP STORE REVIEW GUIDELINES</strong>
									</p>
									<p className="mb-4">
										The App Store Review Guidelines establish the standards for
										what apps should do and how they should work. These
										guidelines ensure that apps on the App Store are safe,
										reliable, and appropriate.
									</p>
									<p className="mb-4">
										<strong>Safety:</strong> Apps should not include content
										that is offensive, insensitive, upsetting, or encourages
										dangerous behaviors.
									</p>
									<p className="mb-4">
										<strong>Performance:</strong> Apps should be tested for bugs
										and stability before submission and should include complete
										and accurate metadata.
									</p>
									<p className="mb-4">
										<strong>Business:</strong> Apps must follow standard
										business practices regarding in-app purchases,
										subscriptions, and data collection.
									</p>
									<p className="mb-4">
										<strong>Design:</strong> Apps should provide value, utilize
										appropriate platform capabilities, and respect platform
										conventions.
									</p>
									<p className="mb-4">
										<strong>Legal:</strong> Apps must comply with all legal
										requirements in any location where they are made available.
									</p>
									<p className="mb-4">
										This is a summary of key points and does not represent the
										full guidelines. Please review the complete guidelines
										before accepting.
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox id="accept-guidelines" />
									<label
										htmlFor="accept-guidelines"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										I have read and agree to follow the App Store Review
										Guidelines
									</label>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="font-medium">
										Apple Developer Code of Conduct
									</h3>
									<Button variant="outline" size="sm">
										<FileText className="h-4 w-4 mr-2" />
										View Code of Conduct
									</Button>
								</div>
								<div className="bg-gray-50 border rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-700">
									<p className="mb-4">
										<strong>APPLE DEVELOPER CODE OF CONDUCT</strong>
									</p>
									<p className="mb-4">
										The Apple Developer Code of Conduct outlines the expected
										behavior for all developers participating in the Apple
										Developer Program, Apple Developer Enterprise Program, or
										using Apple services.
									</p>
									<p className="mb-4">
										<strong>Respect:</strong> Treat all individuals with
										respect, regardless of background or differences.
									</p>
									<p className="mb-4">
										<strong>Integrity:</strong> Be honest and transparent in
										your communications and actions.
									</p>
									<p className="mb-4">
										<strong>Community:</strong> Foster a positive and inclusive
										community environment.
									</p>
									<p className="mb-4">
										<strong>Privacy:</strong> Respect user privacy and handle
										data responsibly.
									</p>
									<p className="mb-4">
										<strong>Compliance:</strong> Follow all applicable laws,
										regulations, and Apple policies.
									</p>
									<p className="mb-4">
										This is a summary of key points and does not represent the
										full code of conduct. Please review the complete code of
										conduct before accepting.
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox id="accept-conduct" />
									<label
										htmlFor="accept-conduct"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										I have read and agree to follow the Apple Developer Code of
										Conduct
									</label>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Back</Button>
							<Button className="gap-2">
								Continue <ArrowRight className="h-4 w-4" />
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				{/* Step 4: Payment */}
				<TabsContent value="step4" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Program Fee</CardTitle>
							<CardDescription>
								Annual membership fee for the Developer Program
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="bg-gray-50 border rounded-md p-4">
								<div className="flex justify-between items-center">
									<div>
										<h3 className="font-medium">
											Apple Developer Program - Individual
										</h3>
										<p className="text-sm text-gray-600">
											Annual membership fee
										</p>
									</div>
									<div className="text-xl font-bold">$99.00 USD</div>
								</div>
								<div className="mt-4 pt-4 border-t border-gray-200">
									<div className="flex justify-between items-center">
										<div className="font-medium">Total</div>
										<div className="text-xl font-bold">$99.00 USD</div>
									</div>
									<p className="text-sm text-gray-600 mt-2">
										Your membership will automatically renew annually unless
										canceled at least a day before the renewal date.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Payment Information</CardTitle>
							<CardDescription>Enter your payment details</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="payment-method">Payment Method</Label>
									<RadioGroup
										defaultValue="credit-card"
										className="flex flex-col space-y-3"
									>
										<div className="flex items-center space-x-3 border rounded-md p-3">
											<RadioGroupItem value="credit-card" id="credit-card" />
											<Label
												htmlFor="credit-card"
												className="flex items-center gap-2"
											>
												<CreditCard className="h-4 w-4" />
												Credit or Debit Card
											</Label>
										</div>
										<div className="flex items-center space-x-3 border rounded-md p-3">
											<RadioGroupItem value="paypal" id="paypal" />
											<Label
												htmlFor="paypal"
												className="flex items-center gap-2"
											>
												<img
													src="/placeholder.svg?height=16&width=16"
													alt="PayPal"
													width={16}
													height={16}
													className="h-4 w-4"
												/>
												PayPal
											</Label>
										</div>
									</RadioGroup>
								</div>

								<div className="border rounded-md p-4 space-y-4">
									<div className="space-y-2">
										<Label htmlFor="card-number">Card Number</Label>
										<Input id="card-number" placeholder="1234 5678 9012 3456" />
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="expiry">Expiration Date</Label>
											<Input id="expiry" placeholder="MM/YY" />
										</div>
										<div className="space-y-2">
											<Label htmlFor="cvc">Security Code (CVC)</Label>
											<Input id="cvc" placeholder="123" />
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="name-on-card">Name on Card</Label>
										<Input id="name-on-card" placeholder="John Doe" />
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="billing-address">Billing Address</Label>
								<Select defaultValue="same">
									<SelectTrigger id="billing-address">
										<SelectValue placeholder="Select billing address" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="same">
											Same as contact address
										</SelectItem>
										<SelectItem value="different">
											Use a different address
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox id="save-payment" />
								<label
									htmlFor="save-payment"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Save this payment method for future transactions
								</label>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Back</Button>
							<Button className="gap-2">
								Continue <ArrowRight className="h-4 w-4" />
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				{/* Step 5: Review & Submit */}
				<TabsContent value="step5" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Review Your Application</CardTitle>
							<CardDescription>
								Please review your information before submitting
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<h3 className="font-medium">Account Type</h3>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 text-blue-600"
									>
										Edit
									</Button>
								</div>
								<div className="bg-gray-50 rounded-md p-3">
									<div className="flex items-center gap-2">
										<User className="h-5 w-5 text-blue-500" />
										<span className="font-medium">Individual</span>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<h3 className="font-medium">Contact Information</h3>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 text-blue-600"
									>
										Edit
									</Button>
								</div>
								<div className="bg-gray-50 rounded-md p-3 space-y-2">
									<p>John Doe</p>
									<p>john.doe@example.com</p>
									<p>+1 (555) 123-4567</p>
									<p>
										123 Main Street, Apt 4B
										<br />
										San Francisco, CA 94103
										<br />
										United States
									</p>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<h3 className="font-medium">Legal Agreements</h3>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 text-blue-600"
									>
										Edit
									</Button>
								</div>
								<div className="bg-gray-50 rounded-md p-3 space-y-2">
									<div className="flex items-center gap-2">
										<CheckCircle2 className="h-4 w-4 text-green-500" />
										<span>Developer Program License Agreement</span>
									</div>
									<div className="flex items-center gap-2">
										<CheckCircle2 className="h-4 w-4 text-green-500" />
										<span>App Store Review Guidelines</span>
									</div>
									<div className="flex items-center gap-2">
										<CheckCircle2 className="h-4 w-4 text-green-500" />
										<span>Apple Developer Code of Conduct</span>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<h3 className="font-medium">Payment Information</h3>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 text-blue-600"
									>
										Edit
									</Button>
								</div>
								<div className="bg-gray-50 rounded-md p-3 space-y-2">
									<div className="flex items-center gap-2">
										<CreditCard className="h-4 w-4 text-gray-500" />
										<span>Visa ending in 3456</span>
									</div>
									<p>Annual fee: $99.00 USD</p>
								</div>
							</div>

							<div className="bg-blue-50 border border-blue-100 rounded-md p-4">
								<div className="flex items-start">
									<Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
									<div>
										<h3 className="text-sm font-medium text-blue-800">
											What happens next?
										</h3>
										<p className="mt-1 text-sm text-blue-700">
											After submitting your application:
										</p>
										<ol className="mt-2 text-sm text-blue-700 list-decimal pl-5 space-y-1">
											<li>Your payment will be processed immediately</li>
											<li>
												We'll verify your identity (this may take up to 48
												hours)
											</li>
											<li>
												Once approved, you'll receive access to the Developer
												Portal
											</li>
											<li>
												You can then start creating and submitting apps to the
												App Store
											</li>
										</ol>
									</div>
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox id="confirm-accurate" />
								<label
									htmlFor="confirm-accurate"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									I confirm that all information provided is accurate and
									complete
								</label>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Back</Button>
							<Button>Submit Application</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>

			<div className="mt-8 text-center text-sm text-gray-500">
				<p>
					Need help? Contact{" "}
					<Link to="#" className="text-blue-600 hover:underline">
						Developer Support
					</Link>{" "}
					or visit the{" "}
					<Link to="#" className="text-blue-600 hover:underline">
						Developer Forums
					</Link>
				</p>
			</div>
		</main>
	);
}
