import Dock from "@/components/Dock";
import Menubar from "@/components/Menubar";
import { Button } from "@/components/ui/button";
import { useLineOSTheme } from "@/theme/provider";
import { cn } from "@/utils";
import {
	ArrowLeft,
	Grid3X3,
	Home,
	Monitor,
	Search,
	Settings,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type ShellChromeProps = {
	isHome: boolean;
	children: React.ReactNode;
};

export default function ShellChrome({ isHome, children }: ShellChromeProps) {
	const { theme } = useLineOSTheme();

	if (theme.shell === "macos") {
		return (
			<>
				{isHome && <Menubar />}
				<div className="ml-[65px]">{children}</div>
				<Dock variant="macos" />
			</>
		);
	}

	if (theme.shell === "windows") {
		return (
			<>
				<div className="pb-[76px]">{children}</div>
				<WindowsTaskbar />
			</>
		);
	}

	if (theme.shell === "ubuntu") {
		return (
			<>
				<UbuntuTopbar />
				<div className="ml-[76px] pt-[32px]">{children}</div>
				<Dock variant="ubuntu" />
			</>
		);
	}

	return (
		<div>
			{children}
			{!isHome && <DefaultAssistiveMenu />}
		</div>
	);
}

function DefaultAssistiveMenu() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const actions = [
		{
			label: "Home",
			icon: Home,
			onClick: () => navigate("/"),
			className: "bg-slate-950 text-white",
		},
		{
			label: "App Store",
			icon: Grid3X3,
			onClick: () => navigate("/store"),
			className: "bg-white text-slate-950",
		},
		{
			label: "Settings",
			icon: Settings,
			onClick: () => navigate("/settings"),
			className: "bg-white text-slate-950",
		},
		{
			label: "Back",
			icon: ArrowLeft,
			onClick: () => navigate(-1),
			className: "bg-white text-slate-950",
		},
	];

	return (
		<>
			<div
				className="fixed left-0 top-1/2 z-[1000] h-48 w-[25px] -translate-y-1/2"
				aria-hidden="true"
				onMouseEnter={() => setIsOpen(true)}
			/>
			<div
				className={cn(
					"fixed left-2.5 top-1/2 z-[1000] -translate-y-1/2 transition-all duration-200",
					isOpen
						? "pointer-events-auto translate-x-0 opacity-100"
						: "pointer-events-none -translate-x-full opacity-0"
				)}
				onMouseLeave={() => setIsOpen(false)}
			>
				<div className="rounded-[2rem] border border-white/50 bg-white/55 p-2 shadow-2xl shadow-slate-900/20 backdrop-blur-2xl">
					<div className="flex flex-col gap-3">
						{actions.map(({ label, icon: Icon, onClick, className }) => (
							<button
								key={label}
								type="button"
								aria-label={label}
								className={cn(
									"flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-slate-900/10 transition hover:scale-105 active:scale-95",
									className
								)}
								onClick={onClick}
							>
								<Icon className="h-6 w-6" />
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

function WindowsTaskbar() {
	const navigate = useNavigate();

	return (
		<div className="fixed inset-x-0 bottom-0 z-[999] flex h-16 items-center justify-center border-t border-white/50 bg-white/80 px-4 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
			<div className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/70 p-1.5 shadow-sm">
				<Button
					type="button"
					size="icon"
					variant="ghost"
					title="Home"
					onClick={() => navigate("/")}
					className="h-10 w-10 rounded-lg text-blue-700 hover:bg-blue-50"
				>
					<Monitor className="h-5 w-5" />
				</Button>
				<Button
					type="button"
					size="icon"
					variant="ghost"
					title="Apps"
					onClick={() => navigate("/launchpad")}
					className="h-10 w-10 rounded-lg text-slate-700 hover:bg-blue-50"
				>
					<Grid3X3 className="h-5 w-5" />
				</Button>
				<div className="hidden h-10 w-60 items-center gap-2 rounded-lg bg-slate-100 px-3 text-sm text-slate-500 sm:flex">
					<Search className="h-4 w-4" />
					<span>Search apps</span>
				</div>
			</div>
		</div>
	);
}

function UbuntuTopbar() {
	return (
		<div className="fixed inset-x-0 top-0 z-[999] flex h-8 items-center justify-between bg-zinc-950 px-4 text-[13px] text-white">
			<div className="font-semibold">LineOS</div>
			<div className="rounded-full bg-white/10 px-3 py-0.5">Activities</div>
		</div>
	);
}

export function shellBackgroundClass(shell: string) {
	return cn(
		"lineos-shell relative min-h-screen overflow-hidden text-[var(--lineos-text)]",
		shell === "windows" && "lineos-shell-windows",
		shell === "ubuntu" && "lineos-shell-ubuntu",
		shell === "launchpad" && "lineos-shell-default"
	);
}
