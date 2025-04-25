import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import Ad from "./components/Ad";
import Categories from "./components/Categories";
import FeaturedApps from "./components/FeaturedApps";
import Sidebar from "./components/Sidebar";
import TopApps from "./components/TopApps";
import Trending from "./components/Trending";

export default function AppStore() {
	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			<div className="flex-1 overflow-auto">
				<Header />
				<main className="p-6">
					<div className="grid grid-cols-3 gap-6">
						<div className="col-span-2">
							<FeaturedApps />
							<Categories />
							<TopApps />
						</div>
						<div className="col-span-1">
							<Trending />
							<Ad />
						</div>
					</div>
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
				<button className="text-gray-500 hover:text-gray-700">
					<Bell className="h-5 w-5" />
				</button>
				<div className="relative w-64">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
					<Input
						type="text"
						placeholder="Search"
						className="pl-9 bg-gray-100 border-0"
					/>
				</div>
				<div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
					<img
						src="https://www.electricallicenserenewal.com/app-assets/images/avatar/avatar-7.png"
						alt="Profile"
						width={32}
						height={32}
						className="object-cover"
					/>
				</div>
			</div>
		</header>
	);
};
