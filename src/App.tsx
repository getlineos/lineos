import { Route, Routes } from "react-router";
import "@/assets/css/index.scss";
import { Provider } from "react-redux";
import { store } from "./store";
import wallpaper from "@/assets/img/wallpaper.jpg";
import Home from "@/pages/home";
import Launchpad from "@/pages/launchpad";
import AppWrapper from "@/apps/AppWrapper";
import Loop from "@/apps/loop";
import Notes from "@/apps/notes";
import Music from "@/apps/music";
import Dock from "@/components/Dock";
import Store from "@/apps/store";

export default function App() {
	return (
		<Provider store={store}>
			<div
				className="relative h-screen !bg-no-repeat !bg-cover"
				style={{ background: `url(${wallpaper})` }}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/launchpad" element={<Launchpad />} />
					<Route path="/" element={<AppWrapper />}>
						<Route path="loop" element={<Loop />} />
						<Route path="notes" element={<Notes />} />
						<Route path="music" element={<Music />} />
						<Route path="store" element={<Store />} />
					</Route>
				</Routes>
				<Dock />
			</div>
		</Provider>
	);
}
