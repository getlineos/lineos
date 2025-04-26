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
import { Link, Route, Routes } from "react-router";
import APIPage from "./api";
import ArcadePage from "./arcade";
import BillingPage from "./billing";
import OverviewPage from "./overview";
import Sidebar from "./overview/views/Sidebar";
import PublishPage from "./publish";
import SettingsPage from "./settings";
import SupportPage from "./support";

export default function AppStore() {
	return (
		<div className="flex h-screen bg-gray-100">
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
					</Routes>
				</main>
			</div>
		</div>
	);
}

const Header = () => {
	return (
		<header className="bg-white p-4 flex items-center justify-between border-b border-gray-200">
			<h1 className="text-2xl font-bold">Overview</h1>
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
					<DropdownMenuContent align="end" className="w-56 bg-white">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link to="billing">
									Billing
									<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link to="settings">
									Settings
									<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild className="cursor-pointer">
							<Link to="support">Support</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild className="cursor-pointer">
							<Link to="publish">Publish App</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild className="cursor-pointer">
							<Link to="api">API</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer">
							Log out
							<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
