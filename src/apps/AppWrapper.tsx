import { Outlet } from "react-router";

export default function AppWrapper() {
	return (
		<div className="w-app-screen h-screen overflow-hidden rounded-[13px]">
			<Outlet />
		</div>
	);
}
