import { initializeInstalledApps } from "@/config/apps";
import { useEffect } from "react";
import { Navigate } from "react-router";

export default function ResetPage() {
	useEffect(() => {
		initializeInstalledApps(true);
	}, []);

	return <Navigate to="/" />;
}
