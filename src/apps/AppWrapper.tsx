import { useLineOSTheme } from "@/theme/provider";
import type { ThemeShell } from "@/theme/types";
import { cn } from "@/utils";
import { Outlet } from "react-router";

function appScreenWidthClass(shell: ThemeShell) {
	switch (shell) {
		case "macos":
			return "w-app-screen";
		case "ubuntu":
			return "w-[calc(100vw-76px)]";
		default:
			return "w-full";
	}
}

export default function AppWrapper() {
	const { theme } = useLineOSTheme();

	return (
		<div
			className={cn(
				appScreenWidthClass(theme.shell),
				"h-screen overflow-hidden rounded-[13px]"
			)}
		>
			<Outlet />
		</div>
	);
}
