import AppGrid from "@/components/AppGrid";
import {
	appCategories,
	getAppCategory,
	type AppCategory,
} from "@/config/appCategories";
import type { RootState } from "@/store/persistence";
import { useLineOSTheme } from "@/theme/provider";
import { cn } from "@/utils";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import DesktopColumn from "./components/DesktopColumn";

export default function Home() {
	// const isLg = window.innerHeight > 900;
	const { theme } = useLineOSTheme();

	if (theme.shell === "launchpad") {
		return <DefaultHome />;
	}

	return (
		<div>
			<div className="flex justify-between">
				<div className="m-5 flex flex-col gap-3">
					{/* {isLg && <TodoWidget />}
					<WeatherWidget />
					<div className="flex gap-3">
						<ClockWidget />
						<CalendarWidget />
					</div> */}
				</div>
				<div className="m-5">
					<DesktopColumn />
				</div>
			</div>
		</div>
	);
}

function DefaultHome() {
	const [selectedCategory, setSelectedCategory] = useState<AppCategory>("All");
	const apps = useSelector(
		(state: RootState) => state.installedApps?.apps ?? []
	);
	const visibleApps = apps.filter((app) => app.showInLaunchpad !== false);

	const categoryCounts = useMemo(() => {
		const counts = new Map<AppCategory, number>([["All", visibleApps.length]]);

		for (const app of visibleApps) {
			const category = getAppCategory(app);
			counts.set(category, (counts.get(category) ?? 0) + 1);
		}

		return counts;
	}, [visibleApps]);

	const categoryAppsCount =
		selectedCategory === "All"
			? visibleApps.length
			: categoryCounts.get(selectedCategory) ?? 0;

	return (
		<main className="relative min-h-screen px-6 py-8 text-slate-900 sm:px-10 lg:px-16">
			<CategoryBars
				selectedCategory={selectedCategory}
				categoryCounts={categoryCounts}
				onSelectCategory={setSelectedCategory}
			/>

			<div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl pl-7 sm:pl-9">
				<div className="mb-8 flex flex-wrap items-end justify-between gap-3">
					<div>
						<h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
							{selectedCategory}
						</h1>
						<p className="mt-1 text-sm font-medium text-slate-500">
							{categoryAppsCount} apps
						</p>
					</div>
				</div>

				{categoryAppsCount > 0 ? (
					<AppGrid
						category={selectedCategory}
						className="grid-cols-[repeat(auto-fill,minmax(3.875rem,1fr))] justify-items-start gap-x-0 gap-y-7"
						iconClassName="h-11 w-11 sm:h-12 sm:w-12 lg:h-12 lg:w-12"
						labelClassName="max-w-16 text-center text-[12px] text-slate-800"
					/>
				) : (
					<div className="flex min-h-[240px] items-center justify-center text-sm font-medium text-slate-500">
						No apps in this category
					</div>
				)}
			</div>
		</main>
	);
}

type CategoryBarsProps = {
	selectedCategory: AppCategory;
	categoryCounts: Map<AppCategory, number>;
	onSelectCategory: (category: AppCategory) => void;
};

function CategoryBars({
	selectedCategory,
	categoryCounts,
	onSelectCategory,
}: CategoryBarsProps) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const baseWidth = 18;
	const maxWidth = 50;
	const getBarWidth = (index: number) => {
		if (hoveredIndex === null) {
			return baseWidth;
		}

		const distance = Math.abs(index - hoveredIndex);
		if (distance === 0) {
			return maxWidth;
		}
		if (distance === 1) {
			return 36;
		}
		if (distance === 2) {
			return 26;
		}

		return baseWidth;
	};

	return (
		<nav
			aria-label="App categories"
			className="fixed left-5 top-8 z-40 flex flex-col items-start gap-0 sm:left-7"
			onMouseLeave={() => setHoveredIndex(null)}
		>
			{appCategories.map((category, index) => {
				const isSelected = selectedCategory === category;
				const count = categoryCounts.get(category) ?? 0;
				const width = getBarWidth(index);

				return (
					<button
						key={category}
						type="button"
						aria-label={`${category}, ${count} apps`}
						className="group relative flex h-2 items-center text-left"
						style={{ width: `${maxWidth}px` }}
						onMouseEnter={() => setHoveredIndex(index)}
						onFocus={() => setHoveredIndex(index)}
						onBlur={() => setHoveredIndex(null)}
						onClick={() => onSelectCategory(category)}
					>
						<span
							className={cn(
								"h-0.5 w-[var(--category-bar-width)] rounded-full transition-all duration-200 ease-out",
								isSelected
									? "bg-slate-950"
									: "bg-slate-400 group-hover:bg-slate-800"
							)}
							style={
								{
									"--category-bar-width": `${width}px`,
								} as CSSProperties
							}
						/>
						<span className="pointer-events-none absolute left-[50px] whitespace-nowrap rounded-full bg-white/75 px-3 py-1 text-sm font-medium text-slate-800 opacity-0 shadow-lg shadow-slate-900/10 backdrop-blur-xl transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
							{category}
						</span>
					</button>
				);
			})}
		</nav>
	);
}
