import AppWrapper from "@/apps/AppWrapper";
import CalendarApp from "@/apps/calendar";
import CalculatorApp from "@/apps/calculator";
import NotesApp from "@/apps/notes";
import SettingsApp from "@/apps/settings";
import TestFlightApp from "@/apps/testflight";
import Store from "@/apps/store";
import "@/assets/css/index.css";
import wallpaper from "@/assets/img/wallpaper.jpg";
import AppLauncher from "@/components/AppLauncher";
import Home from "@/pages/home";
import Launchpad from "@/pages/launchpad";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import DynamicApp from "./apps/[slug]";
import { useAuth } from "./apps/store/hooks/useAuth";
import ShellChrome, { shellBackgroundClass } from "./components/ShellChrome";
import { Toaster } from "./components/ui/toaster";
import { initializeInstalledApps } from "./config/apps";
import ResetPage from "./pages/reset";
import ThemeChoiceModal from "./theme/ThemeChoiceModal";
import { useLineOSTheme } from "./theme/provider";

export default function App() {
	const location = useLocation();
	const { theme } = useLineOSTheme();
	const isMacOS = theme.shell === "macos";

	useAuth();
	useEffect(() => {
		initializeInstalledApps();
	}, []);

	return (
		<div
			className={shellBackgroundClass(theme.shell)}
			style={isMacOS ? { background: `url(${wallpaper})` } : undefined}
		>
			<ShellChrome isHome={location.pathname === "/"}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/launchpad" element={<Launchpad />} />
					<Route path="/reset" element={<ResetPage />} />
					<Route path="/" element={<AppWrapper />}>
						<Route path="calculator" element={<CalculatorApp />} />
						<Route path="calendar" element={<CalendarApp />} />
						<Route path="notes" element={<NotesApp />} />
						<Route path="settings" element={<SettingsApp />} />
						<Route path="testflight" element={<TestFlightApp />} />
						<Route path="store/*" element={<Store />} />
						<Route path="/:slug" element={<DynamicApp />} />
					</Route>
				</Routes>
			</ShellChrome>
			<AppLauncher />
			<ThemeChoiceModal />
			<Toaster />
		</div>
	);
}
