import { profileService } from "@/apps/store/services/profileService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { initializeInstalledApps } from "@/config/apps";
import { useAppSelector } from "@/store/hooks";
import { setDeveloperStatus } from "@/store/slices/appStore";
import { setAuthRequired } from "@/store/slices/auth";
import { useGetProfileQuery } from "@/store/slices/profileApi";
import { Info } from "lucide-react";
import { useDispatch } from "react-redux";

export default function Developer() {
	const dispatch = useDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const {
		data: profile,
		isLoading: isProfileLoading,
		refetch,
	} = useGetProfileQuery(user?.id || "", { skip: !user?.id });

	const handleDeveloperStatusChange = async (status: boolean) => {
		if (!user) return;

		try {
			await profileService.applyForDeveloper(user.id);
			dispatch(setDeveloperStatus(status));
			refetch();
		} catch (error) {
			console.error("Failed to join developer program:", error);
		}
	};

	if (isProfileLoading) {
		return (
			<TabsContent value="developer" className="space-y-6">
				<Card>
					<CardContent className="flex items-center justify-center h-40">
						<div className="text-gray-500">Loading...</div>
					</CardContent>
				</Card>
			</TabsContent>
		);
	}

	return (
		<TabsContent value="developer" className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Developer Account</CardTitle>
					<CardDescription>
						Manage your developer account settings
					</CardDescription>
				</CardHeader>
				{profile?.developer_status === "approved" ? (
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Developer Status</h3>
								<p className="text-sm text-gray-500">
									Your current developer program status
								</p>
							</div>
							<Badge>Active</Badge>
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Developer ID</h3>
								<p className="text-sm text-gray-500">
									Your unique developer identifier
								</p>
							</div>
							<div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
								DEV123456789
							</div>
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Team</h3>
								<p className="text-sm text-gray-500">Your development team</p>
							</div>
							<Button variant="outline">Manage Team</Button>
						</div>
					</CardContent>
				) : user ? (
					<div className="flex items-center justify-center h-40">
						<Button
							variant="outline"
							onClick={() => handleDeveloperStatusChange(true)}
							className="bg-snow"
						>
							Join Developer Program
						</Button>
					</div>
				) : (
					<div className="mb-6 mx-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-start">
								<Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
								<div>
									<h3 className="text-sm font-medium text-blue-800">
										Authentication Required
									</h3>
									<p className="mt-1 text-sm text-blue-700">
										You need to be logged in to apply for a developer account.
										Please sign in or create an account to continue.
									</p>
								</div>
							</div>
							<Button
								variant="outline"
								onClick={() => dispatch(setAuthRequired(true))}
								className="bg-dark text-snow"
							>
								Login
							</Button>
						</div>
					</div>
				)}
			</Card>

			{profile?.developer_status === "approved" ? (
				<>
					<Card>
						<CardHeader>
							<CardTitle>App Development</CardTitle>
							<CardDescription>Settings for app development</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">TestFlight Settings</h3>
									<p className="text-sm text-gray-500">
										Manage beta testing for your apps
									</p>
								</div>
								<Button variant="outline">Configure</Button>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">API Keys</h3>
									<p className="text-sm text-gray-500">
										Manage API keys for App Store Connect
									</p>
								</div>
								<Button variant="outline">Manage Keys</Button>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">Certificates</h3>
									<p className="text-sm text-gray-500">
										Manage development and distribution certificates
									</p>
								</div>
								<Button variant="outline">Manage Certificates</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Analytics & Reports</CardTitle>
							<CardDescription>
								Configure developer analytics settings
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">Sales Reports</h3>
									<p className="text-sm text-gray-500">
										Configure sales report delivery
									</p>
								</div>
								<Select defaultValue="weekly">
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Report frequency" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="daily">Daily</SelectItem>
										<SelectItem value="weekly">Weekly</SelectItem>
										<SelectItem value="monthly">Monthly</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">App Analytics</h3>
									<p className="text-sm text-gray-500">
										Configure app usage analytics
									</p>
								</div>
								<Button
									variant="outline"
									onClick={() => initializeInstalledApps(true)}
								>
									Configure
								</Button>
							</div>
						</CardContent>
					</Card>
				</>
			) : null}
		</TabsContent>
	);
}
