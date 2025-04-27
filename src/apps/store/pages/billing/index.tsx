import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AlertCircle,
	Calendar,
	Download,
	Filter,
	Gift,
	Plus,
	Receipt,
	Search,
	Users,
} from "lucide-react";
import { myApps } from "../../utils";

const paymentMethods = [
	{
		id: 1,
		type: "visa",
		name: "Visa ending in 4242",
		expiry: "09/2025",
		isDefault: true,
		icon: "https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png",
	},
	{
		id: 2,
		type: "mastercard",
		name: "Mastercard ending in 5678",
		expiry: "12/2024",
		isDefault: false,
		icon: "https://download.logo.wine/logo/Mastercard/Mastercard-Logo.wine.png",
	},
	{
		id: 3,
		type: "paypal",
		name: "PayPal - user@example.com",
		expiry: null,
		isDefault: false,
		icon: "https://e7.pngegg.com/pngimages/782/863/png-clipart-paypal-logo-paypal-blue-text.png",
	},
];

const transactions = [
	{
		id: "T12345",
		date: "2023-11-15",
		app: "Vectornator Pro",
		amount: "$9.99",
		type: "Subscription",
		status: "Completed",
		icon: myApps[0].icon,
	},
	{
		id: "T12346",
		date: "2023-11-10",
		app: "Procreate",
		amount: "$12.99",
		type: "Purchase",
		status: "Completed",
		icon: myApps[1].icon,
	},
	{
		id: "T12347",
		date: "2023-11-05",
		app: "Notion Premium",
		amount: "$8.00",
		type: "Subscription",
		status: "Completed",
		icon: myApps[2].icon,
	},
	{
		id: "T12348",
		date: "2023-10-28",
		app: "Figma Mirror Pro",
		amount: "$15.99",
		type: "Subscription",
		status: "Completed",
		icon: myApps[3].icon,
	},
	{
		id: "T12349",
		date: "2023-10-15",
		app: "App Store Gift Card",
		amount: "$50.00",
		type: "Reload",
		status: "Completed",
		icon: myApps[4].icon,
	},
	{
		id: "T12350",
		date: "2023-10-10",
		app: "Swift Playgrounds Pro",
		amount: "$4.99",
		type: "In-App Purchase",
		status: "Completed",
		icon: myApps[5].icon,
	},
];

const subscriptions = [
	{
		id: 1,
		name: "Vectornator Pro",
		price: "$9.99/month",
		renewalDate: "December 15, 2023",
		status: "Active",
		icon: myApps[0].icon,
	},
	{
		id: 2,
		name: "Notion Premium",
		price: "$8.00/month",
		renewalDate: "December 5, 2023",
		status: "Active",
		icon: myApps[2].icon,
	},
	{
		id: 3,
		name: "Figma Mirror Pro",
		price: "$15.99/month",
		renewalDate: "November 28, 2023",
		status: "Active",
		icon: myApps[3].icon,
	},
	{
		id: 4,
		name: "Adobe Creative Cloud",
		price: "$52.99/month",
		renewalDate: "Canceled",
		status: "Expired",
		icon: myApps[4].icon,
	},
];

export default function Billing() {
	return (
		<Tabs defaultValue="payment-methods" className="space-y-4">
			<TabsList className="grid grid-cols-5 w-full max-w-4xl">
				<TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
				<TabsTrigger value="transactions">Transactions</TabsTrigger>
				<TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
				<TabsTrigger value="family-sharing">Family Sharing</TabsTrigger>
				<TabsTrigger value="gift-cards">Gift Cards</TabsTrigger>
			</TabsList>

			{/* Payment Methods Tab */}
			<TabsContent value="payment-methods" className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">Your Payment Methods</h2>
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<Plus className="h-4 w-4 mr-2" /> Add Payment Method
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Add Payment Method</DialogTitle>
								<DialogDescription>
									Enter your payment details to add a new payment method.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="card-number" className="text-right">
										Card Number
									</Label>
									<Input
										id="card-number"
										placeholder="1234 5678 9012 3456"
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">
										Name on Card
									</Label>
									<Input
										id="name"
										placeholder="John Doe"
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="expiry" className="text-right">
										Expiry Date
									</Label>
									<Input
										id="expiry"
										placeholder="MM/YY"
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="cvc" className="text-right">
										CVC
									</Label>
									<Input id="cvc" placeholder="123" className="col-span-3" />
								</div>
							</div>
							<DialogFooter>
								<Button type="submit">Save Payment Method</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<div className="grid gap-3">
					{paymentMethods.map((method) => (
						<Card key={method.id}>
							<CardContent className="p-6">
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-4">
										<div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
											<img
												src={method.icon || "/placeholder.svg"}
												alt={method.type}
												width={60}
												height={40}
												className="object-contain"
											/>
										</div>
										<div>
											<h3 className="font-medium">{method.name}</h3>
											{method.expiry && (
												<p className="text-sm text-gray-500">
													Expires {method.expiry}
												</p>
											)}
										</div>
									</div>
									<div className="flex items-center gap-4">
										{method.isDefault && <Badge>Default</Badge>}
										<div className="flex gap-2">
											<Button variant="outline" size="sm">
												Edit
											</Button>
											{!method.isDefault && (
												<Button variant="outline" size="sm">
													Set as Default
												</Button>
											)}
											{!method.isDefault && (
												<Button
													variant="outline"
													size="sm"
													className="text-red-500 hover:text-red-600"
												>
													Remove
												</Button>
											)}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Billing Address</CardTitle>
						<CardDescription>
							Your billing address is used for payment verification.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-1">
							<p>John Doe</p>
							<p>123 Main Street</p>
							<p>Apt 4B</p>
							<p>San Francisco, CA 94103</p>
							<p>United States</p>
						</div>
					</CardContent>
					<CardFooter>
						<Button variant="outline">Edit Address</Button>
					</CardFooter>
				</Card>
			</TabsContent>

			{/* Transactions Tab */}
			<TabsContent value="transactions" className="space-y-4">
				<div className="flex flex-col sm:flex-row justify-between gap-4">
					<h2 className="text-xl font-semibold">Transaction History</h2>
					<div className="flex gap-2 items-center">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								type="text"
								placeholder="Search transactions"
								className="pl-9 min-w-[200px]"
							/>
						</div>

						<Select defaultValue="all-time">
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Time period" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all-time">All Time</SelectItem>
								<SelectItem value="this-month">This Month</SelectItem>
								<SelectItem value="last-month">Last Month</SelectItem>
								<SelectItem value="last-3-months">Last 3 Months</SelectItem>
								<SelectItem value="last-year">Last Year</SelectItem>
							</SelectContent>
						</Select>

						<Button variant="outline" className="gap-2 bg-snow">
							<Filter className="h-4 w-4" />
							Filter
						</Button>

						<Button variant="outline" className="gap-2 bg-snow">
							<Download className="h-4 w-4" />
							Export
						</Button>
					</div>
				</div>

				<Card>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Date</TableHead>
									<TableHead>App</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{transactions.map((transaction) => (
									<TableRow key={transaction.id}>
										<TableCell>
											<div className="font-medium">
												{new Date(transaction.date).toLocaleDateString()}
											</div>
											<div className="text-xs text-gray-500">
												ID: {transaction.id}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<div className="w-8 h-8 bg-gray-100 rounded overflow-hidden">
													<img
														src={transaction.icon || "/placeholder.svg"}
														alt={transaction.app}
														width={32}
														height={32}
														className="object-cover"
													/>
												</div>
												<span>{transaction.app}</span>
											</div>
										</TableCell>
										<TableCell>{transaction.type}</TableCell>
										<TableCell>{transaction.amount}</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className="bg-green-50 text-green-700 border-green-200"
											>
												{transaction.status}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											<Button variant="ghost" size="sm">
												<Receipt className="h-4 w-4 mr-1" /> Receipt
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<div className="flex justify-center">
					<Button variant="outline" className="bg-snow">
						Load More
					</Button>
				</div>
			</TabsContent>

			{/* Subscriptions Tab */}
			<TabsContent value="subscriptions" className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">Active Subscriptions</h2>
				</div>

				<div className="grid gap-3">
					{subscriptions
						.filter((sub) => sub.status === "Active")
						.map((subscription) => (
							<Card key={subscription.id}>
								<CardContent className="p-6">
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden">
												<img
													src={subscription.icon || "/placeholder.svg"}
													alt={subscription.name}
													width={48}
													height={48}
													className="object-cover"
												/>
											</div>
											<div>
												<h3 className="font-medium">{subscription.name}</h3>
												<p className="text-sm text-gray-500">
													{subscription.price}
												</p>
											</div>
										</div>
										<div className="flex flex-col items-end gap-2">
											<div className="flex items-center gap-1 text-sm">
												<Calendar className="h-4 w-4 text-gray-500" />
												<span>Renews on {subscription.renewalDate}</span>
											</div>
											<div className="flex gap-2">
												<Button variant="outline" size="sm">
													Manage
												</Button>
												<Dialog>
													<DialogTrigger asChild>
														<Button
															variant="outline"
															size="sm"
															className="text-red-500 hover:text-red-600"
														>
															Cancel
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>Cancel Subscription</DialogTitle>
															<DialogDescription>
																Are you sure you want to cancel your
																subscription to {subscription.name}? You will
																continue to have access until the end of your
																current billing period.
															</DialogDescription>
														</DialogHeader>
														<DialogFooter>
															<Button variant="outline">
																Keep Subscription
															</Button>
															<Button variant="destructive">
																Cancel Subscription
															</Button>
														</DialogFooter>
													</DialogContent>
												</Dialog>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
				</div>

				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="expired">
						<AccordionTrigger>Expired Subscriptions</AccordionTrigger>
						<AccordionContent>
							<div className="grid gap-4 pt-2">
								{subscriptions
									.filter((sub) => sub.status === "Expired")
									.map((subscription) => (
										<Card key={subscription.id}>
											<CardContent className="p-6">
												<div className="flex justify-between items-center">
													<div className="flex items-center gap-4">
														<div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden">
															<img
																src={subscription.icon || "/placeholder.svg"}
																alt={subscription.name}
																width={48}
																height={48}
																className="object-cover"
															/>
														</div>
														<div>
															<h3 className="font-medium">
																{subscription.name}
															</h3>
															<p className="text-sm text-gray-500">
																{subscription.price}
															</p>
														</div>
													</div>
													<div className="flex flex-col items-end gap-2">
														<Badge variant="outline" className="bg-gray-100">
															Expired
														</Badge>
														<Button variant="outline" size="sm">
															Resubscribe
														</Button>
													</div>
												</div>
											</CardContent>
										</Card>
									))}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Card>
					<CardHeader>
						<CardTitle>Subscription Settings</CardTitle>
						<CardDescription>
							Manage your subscription preferences
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label htmlFor="auto-renew">Automatic Renewal</Label>
								<p className="text-sm text-muted-foreground">
									Automatically renew subscriptions before they expire
								</p>
							</div>
							<Switch id="auto-renew" defaultChecked />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label htmlFor="renewal-notifications">
									Renewal Notifications
								</Label>
								<p className="text-sm text-muted-foreground">
									Receive notifications before subscriptions renew
								</p>
							</div>
							<Switch id="renewal-notifications" defaultChecked />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label htmlFor="price-increase">
									Price Increase Notifications
								</Label>
								<p className="text-sm text-muted-foreground">
									Notify me when subscription prices increase
								</p>
							</div>
							<Switch id="price-increase" defaultChecked />
						</div>
					</CardContent>
				</Card>
			</TabsContent>

			{/* Family Sharing Tab */}
			<TabsContent value="family-sharing" className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">Family Sharing</h2>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Family Purchases</CardTitle>
						<CardDescription>
							Manage payment settings for your family group
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Alert>
							<Users className="h-4 w-4" />
							<AlertTitle>Family Organizer</AlertTitle>
							<AlertDescription>
								You are the family organizer. You are responsible for all
								payments made by family members.
							</AlertDescription>
						</Alert>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Require Approval for</Label>
								</div>
							</div>

							<div className="ml-6 space-y-3">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label htmlFor="purchases">
											Purchases and In-App Purchases
										</Label>
										<p className="text-sm text-muted-foreground">
											Require your approval when family members attempt to make
											purchases
										</p>
									</div>
									<Switch id="purchases" defaultChecked />
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label htmlFor="free-downloads">Free Downloads</Label>
										<p className="text-sm text-muted-foreground">
											Require your approval when family members download free
											apps
										</p>
									</div>
									<Switch id="free-downloads" />
								</div>
							</div>
						</div>

						<div className="pt-4">
							<h3 className="text-lg font-medium mb-2">Family Members</h3>
							<div className="space-y-3">
								<div className="flex items-center justify-between p-3 border rounded-lg">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
											JD
										</div>
										<div>
											<p className="font-medium">John Doe (You)</p>
											<p className="text-sm text-gray-500">Family Organizer</p>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-between p-3 border rounded-lg">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
											JS
										</div>
										<div>
											<p className="font-medium">Jane Smith</p>
											<p className="text-sm text-gray-500">Adult</p>
										</div>
									</div>
									<Button variant="outline" size="sm">
										Manage
									</Button>
								</div>

								<div className="flex items-center justify-between p-3 border rounded-lg">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
											TD
										</div>
										<div>
											<p className="font-medium">Tim Doe</p>
											<p className="text-sm text-gray-500">Child (Age 12)</p>
										</div>
									</div>
									<Button variant="outline" size="sm">
										Manage
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline">Add Family Member</Button>
						<Button
							variant="outline"
							className="text-red-500 hover:text-red-600"
						>
							Leave Family Group
						</Button>
					</CardFooter>
				</Card>
			</TabsContent>

			{/* Gift Cards Tab */}
			<TabsContent value="gift-cards" className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">
						App Store & iTunes Gift Cards
					</h2>
					<Button>
						<Plus className="h-4 w-4 mr-2" /> Redeem Gift Card
					</Button>
				</div>

				<div className="grid md:grid-cols-2 gap-4">
					<Card>
						<CardHeader>
							<CardTitle>Account Balance</CardTitle>
							<CardDescription>
								Your current App Store & iTunes balance
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
									<Gift className="h-8 w-8 text-white" />
								</div>
								<div>
									<p className="text-3xl font-bold">$75.50</p>
									<p className="text-sm text-gray-500">Available Balance</p>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button variant="outline">View Balance History</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Gift Card Management</CardTitle>
							<CardDescription>
								Send gifts or check gift card balance
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Button className="w-full">Send Gift Card</Button>
							<Button variant="outline" className="w-full">
								Check Gift Card Balance
							</Button>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Recently Redeemed Gift Cards</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Date</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Card Number</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>October 15, 2023</TableCell>
									<TableCell>$50.00</TableCell>
									<TableCell>XXXX-XXXX-XXXX-1234</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className="bg-green-50 text-green-700 border-green-200"
										>
											Redeemed
										</Badge>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>September 3, 2023</TableCell>
									<TableCell>$25.00</TableCell>
									<TableCell>XXXX-XXXX-XXXX-5678</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className="bg-green-50 text-green-700 border-green-200"
										>
											Redeemed
										</Badge>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>August 12, 2023</TableCell>
									<TableCell>$100.00</TableCell>
									<TableCell>XXXX-XXXX-XXXX-9012</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className="bg-green-50 text-green-700 border-green-200"
										>
											Redeemed
										</Badge>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Alert
					variant="default"
					className="bg-blue-50 text-blue-800 border-blue-200"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>About Gift Cards</AlertTitle>
					<AlertDescription>
						App Store & iTunes Gift Cards can be used to make purchases in the
						App Store, iTunes Store, and Apple Books. They cannot be used to
						purchase physical products.
					</AlertDescription>
				</Alert>
			</TabsContent>
		</Tabs>
	);
}
