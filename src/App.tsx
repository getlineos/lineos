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
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import DynamicApp from "./apps/[slug]";
import ZrxbPage from "./apps/zrxb";
import { Toaster } from "./components/ui/toaster";
import { initializeInstalledApps } from "./config/apps";
import ResetPage from "./pages/reset";
import { store } from "./store";
export default function App() {
	useEffect(() => {
		initializeInstalledApps();
	}, []);

	return (
		<Provider store={store}>
			<div
				className="relative h-screen !bg-no-repeat !bg-cover"
				style={{ background: `url(${wallpaper})` }}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/launchpad" element={<Launchpad />} />
					<Route path="/reset" element={<ResetPage />} />
					<Route path="/" element={<AppWrapper />}>
						<Route path="loop" element={<Loop />} />
						<Route path="music" element={<Music />} />
						<Route path="store/*" element={<Store />} />
						<Route path="zrxb" element={<ZrxbPage />} />
						<Route path="/:slug" element={<DynamicApp />} />
					</Route>
				</Routes>
				<Dock />
				<Toaster />
			</div>
		</Provider>
	);
}
