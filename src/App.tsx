import { Route, Routes } from "react-router";
import "./assets/css/index.scss";
import Home from "pages/home";
import Launchpad from "pages/launchpad";
import Dock from "components/Dock";

export default function App() {
	return (
		<div className="relative">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/launchpad" element={<Launchpad />} />
				<Route path="/" element={<App />} />
			</Routes>
			<Dock />
		</div>
	);
}
