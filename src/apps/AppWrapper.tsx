import { Outlet } from "react-router";

export default function AppWrapper() {
	return (
		<div className="w-app-screen h-screen bg-gray-50 overflow-hidden">
			<Outlet />
		</div>
	);
}
