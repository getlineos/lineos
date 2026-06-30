import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { themes } from "@/theme/config";
import type { ThemeId } from "@/theme/types";
import { cn } from "@/utils";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useLineOSTheme } from "./provider";

export default function ThemeChoiceModal() {
	const { hasChosenTheme, previewTheme, setTheme, themeId } = useLineOSTheme();
	const selectableThemes = themes.filter((theme) => theme.id !== "custom");
	const [selectedTheme, setSelectedTheme] = useState<ThemeId>(
		themeId === "custom" ? "default" : themeId
	);

	useEffect(() => {
		if (!hasChosenTheme) {
			previewTheme(selectedTheme);
		}
	}, [hasChosenTheme, previewTheme, selectedTheme]);

	const chooseTheme = () => {
		setTheme(selectedTheme);
	};

	return (
		<Dialog open={!hasChosenTheme}>
			<DialogContent
				hideClose
				className="max-w-5xl border-white/20 bg-white/95 text-slate-950 shadow-2xl"
			>
				<DialogHeader>
					<DialogTitle>Choose your LineOS theme</DialogTitle>
					<DialogDescription>
						Pick the desktop style you want to use. You can change it later in
						Settings.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{selectableThemes.map((theme) => {
						const isSelected = selectedTheme === theme.id;
						return (
							<button
								key={theme.id}
								type="button"
								className={cn(
									"rounded-lg border p-2 text-left transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--lineos-accent)]",
									isSelected
										? "border-[var(--lineos-accent)] bg-slate-50"
										: "border-slate-200 bg-white"
								)}
								onClick={() => setSelectedTheme(theme.id)}
							>
								<ThemePreview
									themeId={theme.id}
									className={theme.previewClassName}
								/>
								<div className="flex items-center justify-between gap-2">
									<span className="text-sm font-semibold">{theme.name}</span>
									{isSelected && <Check className="h-4 w-4 text-blue-600" />}
								</div>
								<p className="mt-1 text-xs leading-5 text-slate-500">
									{theme.description}
								</p>
							</button>
						);
					})}
				</div>
				<div className="flex justify-end">
					<Button onClick={chooseTheme}>Continue</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function ThemePreview({
	themeId,
	className,
}: {
	themeId: ThemeId;
	className: string;
}) {
	if (themeId === "default") {
		return (
			<div className="mb-3 flex h-20 items-end rounded-md border border-sky-200/80 bg-[linear-gradient(135deg,#eef7ff_0%,#f8fbff_48%,#dbeafe_100%)] p-2 shadow-inner">
				<div className="flex gap-1.5">
					<div className="h-5 w-5 rounded-md bg-gradient-to-br from-sky-400 to-blue-600 shadow ring-1 ring-white/90" />
					<div className="h-5 w-5 rounded-md bg-gradient-to-br from-emerald-300 to-teal-500 shadow ring-1 ring-white/90" />
					<div className="h-5 w-5 rounded-md bg-gradient-to-br from-amber-300 to-orange-500 shadow ring-1 ring-white/90" />
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"mb-3 flex h-20 items-end rounded-md bg-gradient-to-br p-2",
				className
			)}
		>
			<div className="flex gap-1.5">
				<div className="h-5 w-5 rounded bg-white/90 shadow" />
				<div className="h-5 w-5 rounded bg-white/75 shadow" />
				<div className="h-5 w-5 rounded bg-white/60 shadow" />
			</div>
		</div>
	);
}
