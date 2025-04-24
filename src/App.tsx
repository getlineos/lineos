import { Route, Routes } from "react-router";
import "./assets/css/index.scss";
import Home from "pages/home";
import Launchpad from "pages/launchpad";
import Dock from "components/Dock";
import Loop from "apps/loop";
import AppWrapper from "apps/AppWrapper";
import { Provider } from "react-redux";
import { store } from "./store";
import wallpaper from "assets/img/wallpaper.jpg";

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
					<Route path="/apps" element={<AppWrapper />}>
						<Route path="loop" element={<Loop />} />
					</Route>
				</Routes>
				<Dock />
			</div>
		</Provider>
	);
}
