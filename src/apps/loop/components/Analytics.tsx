import { useEffect, useState } from "react";
import { HabitT, TimerData } from "../types";
import { getHabits, getStoredData } from "../utils/storage";
import { formatTime } from "../utils";

interface AnalyticsProps {
	currentDate: string;
}

interface HabitTimeData {
	habitId: string;
	habitName: string;
	timeSpent: number;
	color: string;
}

export default function Analytics({ currentDate }: AnalyticsProps) {
	const [topHabits, setTopHabits] = useState<HabitTimeData[]>([]);

	const colors = [
		"rgb(59, 130, 246)",
		"rgb(16, 185, 129)",
		"rgb(239, 68, 68)",
		"rgb(217, 119, 6)",
		"rgb(147, 51, 234)",
	];

	const fetchDayData = () => {
		const { timerData } = getStoredData();
		const habits = getHabits();

		const habitTimes: { [key: string]: number } = {};

		timerData?.forEach((timer: TimerData) => {
			if (timer.date === currentDate && timer.totalMinutes > 0) {
				habitTimes[timer.habitId] =
					(habitTimes[timer.habitId] || 0) + timer.totalMinutes;
			}
		});

		const sortedHabits: HabitTimeData[] = Object.entries(habitTimes)
			.map(([habitId, timeSpent], index) => ({
				habitId,
				habitName:
					habits.find((h: HabitT) => h.id === habitId)?.name || "Unknown Habit",
				timeSpent,
				color: colors[index % colors.length],
			}))
			.sort((a, b) => b.timeSpent - a.timeSpent)
			.slice(0, 10);

		setTopHabits(sortedHabits);
	};

	useEffect(() => {
		fetchDayData();

		const handleTimerStop = () => {
			fetchDayData();
		};

		window.addEventListener("habitTimerStop", handleTimerStop);

		return () => {
			window.removeEventListener("habitTimerStop", handleTimerStop);
		};
	}, [currentDate]);

	const maxTime = Math.max(...topHabits.map((habit) => habit.timeSpent), 1);

	const getTotalHoursSpent = () => {
		const { timerData } = getStoredData();
		const totalMinutes = timerData
			?.filter((timer) => timer.date === currentDate)
			.reduce((acc, timer) => acc + (timer.totalMinutes || 0), 0);

		const hours = Math.floor(totalMinutes / 60);
		const minutes = Math.round(totalMinutes % 60);

		if (hours === 0) {
			return `${minutes}m`;
		}
		return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
	};

	return (
		<div className="bg-white p-6 rounded-2xl">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h3 className="text-lg font-semibold">Top Habits</h3>
				</div>
				<span className="text-sm text-gray-500">
					Total: {getTotalHoursSpent()}
				</span>
			</div>

			<div className="space-y-4">
				{topHabits.length > 0 ? (
					topHabits.map((habit) => (
						<div key={habit.habitId} className="space-y-1">
							<div className="flex justify-between text-sm mb-1">
								<span className="font-medium">{habit.habitName}</span>
								<span className="text-gray-600">
									{formatTime(habit.timeSpent)}
								</span>
							</div>
							<div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
								<div
									className="h-full rounded-full transition-all duration-500"
									style={{
										width: `${(habit.timeSpent / maxTime) * 100}%`,
										backgroundColor: habit.color,
									}}
								/>
							</div>
						</div>
					))
				) : (
					<div className="text-center text-gray-500 py-4">
						No habits tracked today
					</div>
				)}
			</div>
		</div>
	);
}
