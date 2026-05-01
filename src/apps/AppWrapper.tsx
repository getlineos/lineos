import { Outlet } from "react-router";

export default function AppWrapper() {
	return (
		<div className="w-app-screen h-screen overflow-hidden">
			<Outlet />
		</div>
	);
}
