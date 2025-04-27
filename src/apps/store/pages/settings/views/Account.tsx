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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { ChevronRight, CreditCard, LogOut, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { authService } from "../../../services/authService";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";

export default function Account() {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const user = useAppSelector((state) => state.auth.user);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			await authService.signOut();
			navigate("/");
		} catch (error) {
			console.error("Failed to logout:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<TabsContent value="account" className="space-y-6">
			<div className="flex items-center gap-4">
				<div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 relative">
					<img
						src="https://www.electricallicenserenewal.com/app-assets/images/avatar/avatar-7.png"
						alt="Profile"
						width={80}
						height={80}
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
						<span className="text-white text-xs font-medium">Change</span>
					</div>
				</div>
				<div>
					<h2 className="text-xl font-semibold">
						{user?.user_metadata.name ??
							user?.email?.split("@")[0] ??
							"John Doe"}
					</h2>
					<p className="text-gray-500">{user?.email}</p>
					<Badge className="mt-1">Apple ID</Badge>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
					<CardDescription>Update your personal details</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="first-name">First Name</Label>
							<Input id="first-name" defaultValue="John" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="last-name">Last Name</Label>
							<Input id="last-name" defaultValue="Doe" />
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email Address</Label>
						<Input id="email" type="email" defaultValue={user?.email} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Phone Number</Label>
						<Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
					</div>
				</CardContent>
				<CardFooter>
					<Button>Save Changes</Button>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Password & Authentication</CardTitle>
					<CardDescription>
						Manage your password and security settings
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Change Password</h3>
							<p className="text-sm text-gray-500">
								Update your password regularly for better security
							</p>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline">Change</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Change Password</DialogTitle>
									<DialogDescription>
										Enter your current password and a new password.
									</DialogDescription>
								</DialogHeader>
								<div className="space-y-4 py-4">
									<div className="space-y-2">
										<Label htmlFor="current-password">Current Password</Label>
										<Input id="current-password" type="password" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="new-password">New Password</Label>
										<Input id="new-password" type="password" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="confirm-password">
											Confirm New Password
										</Label>
										<Input id="confirm-password" type="password" />
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline">Cancel</Button>
									<Button>Save Changes</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Two-Factor Authentication</h3>
							<p className="text-sm text-gray-500">
								Add an extra layer of security to your account
							</p>
						</div>
						<Switch id="two-factor" defaultChecked />
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Recovery Options</h3>
							<p className="text-sm text-gray-500">
								Manage your account recovery methods
							</p>
						</div>
						<Button variant="outline">Manage</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Payment Information</CardTitle>
					<CardDescription>Manage your payment methods</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<CreditCard className="h-5 w-5 text-gray-500" />
							<div>
								<h3 className="font-medium">Payment Methods</h3>
								<p className="text-sm text-gray-500">
									Manage your cards and payment options
								</p>
							</div>
						</div>
						<Link to="/billing">
							<Button variant="outline" className="gap-1">
								Manage <ChevronRight className="h-4 w-4" />
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>

			<Card className="border-red-200">
				<CardHeader>
					<CardTitle className="text-red-600">Danger Zone</CardTitle>
					<CardDescription>Irreversible account actions</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Log Out of All Devices</h3>
							<p className="text-sm text-gray-500">
								Sign out from all devices where you're currently logged in
							</p>
						</div>
						<Button
							variant="outline"
							className="border-red-200 text-red-600 hover:bg-red-50"
							onClick={handleLogout}
							disabled={isLoggingOut}
						>
							<LogOut className="h-4 w-4 mr-2" />
							{isLoggingOut ? "Logging out..." : "Log Out All"}
						</Button>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium">Delete Account</h3>
							<p className="text-sm text-gray-500">
								Permanently delete your account and all associated data
							</p>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="destructive">
									<Trash2 className="h-4 w-4 mr-2" /> Delete Account
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Delete Account</DialogTitle>
									<DialogDescription>
										Are you sure you want to delete your account? This action
										cannot be undone and all your data will be permanently lost.
									</DialogDescription>
								</DialogHeader>
								<div className="space-y-4 py-4">
									<div className="space-y-2">
										<Label htmlFor="delete-confirm">
											Type "DELETE" to confirm
										</Label>
										<Input id="delete-confirm" placeholder="DELETE" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="delete-password">Enter your password</Label>
										<Input id="delete-password" type="password" />
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline">Cancel</Button>
									<Button variant="destructive">Delete Permanently</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
