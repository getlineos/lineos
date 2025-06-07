import AppWrapper from "@/apps/AppWrapper";
import Loop from "@/apps/loop";
import Music from "@/apps/music";
import Store from "@/apps/store";
import "@/assets/css/index.css";
import wallpaper from "@/assets/img/wallpaper.jpg";
import Dock from "@/components/Dock";
import Home from "@/pages/home";
import Launchpad from "@/pages/launchpad";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import DynamicApp from "./apps/[slug]";
import { useAuth } from "./apps/store/hooks/useAuth";
import Menubar from "./components/Menubar";
import { Toaster } from "./components/ui/toaster";
import { initializeInstalledApps } from "./config/apps";
import ResetPage from "./pages/reset";

export default function App() {
	const location = useLocation();

	useAuth();
	useEffect(() => {
		initializeInstalledApps();
	}, []);

	return (
		<div
			className="relative h-screen !bg-no-repeat !bg-cover"
			style={{ background: `url(${wallpaper})` }}
		>
			{location.pathname === "/" && <Menubar />}
			<div className="ml-[65px]">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/launchpad" element={<Launchpad />} />
					<Route path="/reset" element={<ResetPage />} />
					<Route path="/" element={<AppWrapper />}>
						<Route path="loop" element={<Loop />} />
						<Route path="music" element={<Music />} />
						<Route path="store/*" element={<Store />} />
						<Route path="/:slug" element={<DynamicApp />} />
					</Route>
				</Routes>
			</div>
			<Dock />
			<Toaster />
		</div>
	);
}
