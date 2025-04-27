import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router";
import APIPage from "./pages/api";
import AppDetailPage from "./pages/app-details";
import ArcadePage from "./pages/arcade";
import BillingPage from "./pages/billing";
import CategoriesPage from "./pages/categories";
import DevApplication from "./pages/dev-application";
import DeveloperApps from "./pages/developer/apps";
import MyApps from "./pages/my-apps";
import MyReviews from "./pages/my-reviews";
import OverviewPage from "./pages/overview";
import Sidebar from "./pages/overview/views/Sidebar";
import PublishPage from "./pages/publish";
import SettingsPage from "./pages/settings";
import SupportPage from "./pages/support";
import { authService } from "./services/authService";
import { getPageTitle } from "./utils";

export default function AppStore() {
	return (
		<div className="flex h-full bg-gray-100">
			<Sidebar />
			<div className="flex-1 overflow-auto">
				<Header />
				<main className="p-6">
					<Routes>
						<Route index element={<OverviewPage />} />
						<Route path="billing" element={<BillingPage />} />
						<Route path="settings" element={<SettingsPage />} />
						<Route path="support" element={<SupportPage />} />
						<Route path="publish" element={<PublishPage />} />
						<Route path="api" element={<APIPage />} />
						<Route path="arcade" element={<ArcadePage />} />
						<Route path="categories" element={<CategoriesPage />} />
						<Route path="my-apps" element={<MyApps />} />
						<Route path="reviews" element={<MyReviews />} />
						<Route path="dev-application" element={<DevApplication />} />
						<Route path="developer">
							<Route path="apps" element={<DeveloperApps />} />
						</Route>
						<Route path="app/:id" element={<AppDetailPage />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}

const Header = () => {
	const location = useLocation();
	const path = location.pathname.split("/").pop() || "overview";
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			await authService.signOut();
		} catch (error) {
			console.error("Failed to logout:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<div>
			<header className="fixed w-[calc(100%-256px)] z-50 bg-white p-4 flex items-center justify-between border-b border-gray-200">
				<h1 className="text-2xl font-bold">{getPageTitle(path)}</h1>
				<div className="flex items-center gap-4">
					<button className="text-gray-500 hover:text-gray-700 cursor-pointer">
						<Bell className="h-5 w-5" />
					</button>
					<div className="relative w-64">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<Input
							type="text"
							placeholder="Search"
							className="pl-9 bg-gray-100 border-0 cursor-pointer"
						/>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden cursor-pointer">
								<img
									src="https://www.electricallicenserenewal.com/app-assets/images/avatar/avatar-7.png"
									alt="Profile"
									width={32}
									height={32}
									className="object-cover"
								/>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link to="/store/my-apps">
										My Apps
										<DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link to="#">
										Purchases
										<DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link to="/store/reviews">
										My Reviews
										<DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link to="/store/billing">
									Billing
									<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link to="/store/settings">
									Settings
									<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link to="#">Support</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={handleLogout}
								disabled={isLoggingOut}
							>
								{isLoggingOut ? "Logging out..." : "Log out"}
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<div className="h-[69px]" />
		</div>
	);
};
