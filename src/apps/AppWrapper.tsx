import { Outlet } from "react-router";

export default function AppWrapper() {
	return (
		<div className="w-screen h-[calc(100vh-80px)] bg-gray-50 overflow-hidden">
			<Outlet />
		</div>
	);
}
