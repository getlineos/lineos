import { Button } from "antd";
import { HabitT, TimerData } from "@/apps/loop/types";
import { formatTime } from "@/apps/loop/utils";
import {
	getTimerData,
	toggleHabitCompletion,
	updateTimerData,
} from "@/apps/loop/utils/storage";
import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { LuCirclePause } from "react-icons/lu";
import { cn } from "@/utils";

const emitTimerStopEvent = () => {
	const event = new CustomEvent("habitTimerStop");
	window.dispatchEvent(event);
};

type HabitProps = {
	habit: HabitT;
	currentDate: string;
	setSelectedHabit: ({
		habit,
		timeBlockName,
	}: {
		habit: HabitT;
		timeBlockName: string;
	}) => void;
	activeTimer: TimerData | null;
	setActiveTimer: (timer: TimerData | null) => void;
	habits: HabitT[];
};

export default function Habit({
	habit,
	currentDate,
	setSelectedHabit,
	activeTimer,
	setActiveTimer,
	habits,
}: HabitProps) {
	const [isCompleted, setIsCompleted] = useState(false);
	const [storedTimerData, setStoredTimerData] = useState<TimerData | null>(
		null
	);

	useEffect(() => {
		const timerData = getTimerData(habit.id, currentDate);
		setStoredTimerData(timerData || null);
		setIsCompleted(timerData?.isCompleted ?? false);
	}, [currentDate, habit.id]);

	const getProgress = (habit: HabitT) => {
		if (!activeTimer || activeTimer.habitId !== habit.id || !habit.goal)
			return 0;
		const progress = (activeTimer.totalMinutes / habit.goal.value) * 100;
		return Math.min(progress, 100);
	};

	const handleTimerClick = (e: React.MouseEvent, habit: HabitT) => {
		e.stopPropagation();

		if (!habit.goal) return;

		if (activeTimer && activeTimer.habitId !== habit.id) {
			const prevHabit = habits.find((h) => h.id === activeTimer.habitId);
			if (prevHabit?.goal) {
				updateTimerData({
					habitId: activeTimer.habitId,
					date: currentDate,
					totalMinutes: activeTimer.totalMinutes,
					isCompleted: activeTimer.totalMinutes >= prevHabit.goal.value,
				});
				emitTimerStopEvent();
			}
		}

		if (activeTimer?.habitId === habit.id) {
			const newTotalMinutes = activeTimer.totalMinutes;
			const newIsCompleted = newTotalMinutes >= habit.goal.value;

			const updatedTimerData = {
				habitId: habit.id,
				date: currentDate,
				totalMinutes: newTotalMinutes,
				isCompleted: newIsCompleted,
			};

			updateTimerData(updatedTimerData);
			setStoredTimerData(updatedTimerData);
			setIsCompleted(newIsCompleted);
			setActiveTimer(null);
			emitTimerStopEvent();
		} else {
			const existingData = getTimerData(habit.id, currentDate);

			setActiveTimer({
				habitId: habit.id,
				totalMinutes: existingData?.totalMinutes || 0,
				date: currentDate,
				isCompleted: false,
			});

			if (!existingData) {
				const newTimerData = {
					habitId: habit.id,
					date: currentDate,
					totalMinutes: 0,
					isCompleted: false,
				};
				updateTimerData(newTimerData);
				setStoredTimerData(newTimerData);
			}
		}
	};

	const handleDoneClick = (e: React.MouseEvent, habitId: string) => {
		e.stopPropagation();
		toggleHabitCompletion(habitId, currentDate);
		setIsCompleted((prev) => !prev);
	};

	return (
		<div
			key={habit.id}
			className="flex items-center justify-between p-3 rounded-lg bg-white cursor-pointer"
			onClick={() =>
				setSelectedHabit({ habit, timeBlockName: habit.timeBlockId })
			}
		>
			<div className="flex items-center gap-4">
				<button
					onClick={(e) => {
						e.stopPropagation();
						toggleHabitCompletion(habit.id, currentDate);
					}}
					className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl transition-opacity ${
						isCompleted ? "opacity-40" : "opacity-100"
					} hover:opacity-80`}
				>
					{habit.icon}
				</button>
				<div className="flex items-center gap-2">
					<span
						className={`text-base ${
							isCompleted ? "line-through text-gray-400" : ""
						}`}
					>
						{habit.name}
					</span>
				</div>
			</div>
			{habit.goal?.unit === "Mins" ? (
				<Button
					onClick={(e) => handleTimerClick(e, habit)}
					type={activeTimer?.habitId === habit.id ? "primary" : "default"}
					style={{
						position: "relative",
						overflow: "hidden",
						width: "100px",
						border:
							activeTimer?.habitId === habit.id
								? "none"
								: "1px solid rgba(0, 0, 0, 0.1)",
					}}
					className={cn({ "bg-green-500 text-white !border-0": isCompleted })}
				>
					<div
						className={`absolute inset-y-0 left-0 transition-[width] duration-1000 linear`}
						style={{
							width: `${getProgress(habit)}%`,
							backgroundColor:
								activeTimer?.habitId === habit.id
									? "rgb(34, 197, 94)"
									: "rgba(34, 197, 94, 0)",
						}}
					/>
					<div className="relative flex items-center gap-2">
						{activeTimer?.habitId === habit.id ? (
							<div className="flex items-center gap-2">
								<LuCirclePause className="w-4 h-4" />
								<span>
									{formatTime(
										activeTimer.totalMinutes,
										activeTimer.totalMinutes >= 60 ? "hm" : "ms"
									)}
								</span>
							</div>
						) : storedTimerData?.totalMinutes ? (
							<div className="flex items-center gap-2">
								<BsClock className="w-4 h-4" />
								<span>
									{formatTime(
										storedTimerData.totalMinutes,
										storedTimerData.totalMinutes >= 60 ? "hm" : "ms"
									)}
								</span>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<BsClock className="w-4 h-4" />
								<span>Start</span>
							</div>
						)}
					</div>
				</Button>
			) : (
				<Button
					onClick={(e) => handleDoneClick(e, habit.id)}
					type={isCompleted ? "primary" : "default"}
					className={isCompleted ? "bg-green-500" : ""}
					style={{
						border: isCompleted ? "none" : "1px solid rgba(0, 0, 0, 0.1)",
						width: 100,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CiCircleCheck className="w-5 h-5" />
					Done
				</Button>
			)}
		</div>
	);
}
