import { Outlet } from "react-router";

export default function AppWrapper() {
	return (
		<div className="w-screen h-[calc(100vh-80px)] overflow-hidden">
			<Outlet />
		</div>
	);
}
