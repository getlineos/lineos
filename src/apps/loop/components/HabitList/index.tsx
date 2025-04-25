import { HabitT, TimerData } from "apps/loop/types";
import { useEffect, useState, useRef } from "react";
import { BsCalendar4 } from "react-icons/bs";
import { TIME_BLOCK_BORDER_COLORS, TIME_BLOCK_COLORS } from "../../constants";
import { useLoop } from "../../context/LoopContext";
import { updateTimerData } from "../../utils/storage";
import HabitModal from "../modals/HabitModal";
import Habit from "./Habit";

type selectedHabitT = {
	habit: HabitT;
	timeBlockName: string;
} | null;

interface TodoListProps {
	currentDate: string;
}

export default function HabitList({ currentDate }: TodoListProps) {
	const { habits, timeBlocks } = useLoop();
	const [selectedHabit, setSelectedHabit] = useState<selectedHabitT>(null);
	const [activeTimer, setActiveTimer] = useState<TimerData | null>(null);
	const timerStartRef = useRef<number | null>(null);

	useEffect(() => {
		let interval: number;

		if (activeTimer) {
			timerStartRef.current = Date.now();
			interval = window.setInterval(() => {
				if (timerStartRef.current) {
					const elapsedMinutes =
						(Date.now() - timerStartRef.current) / (1000 * 60);
					setActiveTimer((prev) => {
						if (!prev) return null;
						return {
							...prev,
							totalMinutes: prev.totalMinutes + elapsedMinutes,
						};
					});
					timerStartRef.current = Date.now();
				}
			}, 1000);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [activeTimer]);

	useEffect(() => {
		setActiveTimer(null);
		timerStartRef.current = null;
	}, [currentDate]);

	useEffect(() => {
		const handleBeforeUnload = () => {
			if (activeTimer) {
				const habit = habits.find((h) => h.id === activeTimer.habitId);
				updateTimerData({
					habitId: activeTimer.habitId,
					date: currentDate,
					totalMinutes: activeTimer.totalMinutes,
					isCompleted: activeTimer.totalMinutes >= (habit?.goal?.value || 0),
				});
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [activeTimer, currentDate, habits]);

	const sortedTimeBlocks = [...timeBlocks].sort((a, b) => {
		const timeA = a.startTime.split(":").map(Number);
		const timeB = b.startTime.split(":").map(Number);
		return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
	});

	const habitsByTimeBlock = sortedTimeBlocks.map((timeBlock, index) => {
		const blockHabits = habits.filter(
			(habit) => habit.timeBlockId === timeBlock.id
		);
		return {
			timeBlock,
			habits: blockHabits,
			bgColor: TIME_BLOCK_COLORS[index % TIME_BLOCK_COLORS.length],
			borderColor:
				TIME_BLOCK_BORDER_COLORS[index % TIME_BLOCK_BORDER_COLORS.length],
		};
	});

	return (
		<div className="bg-white p-6 rounded-2xl">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Today's Habits</h2>
			</div>
			<div className="space-y-6">
				{habitsByTimeBlock.map(
					({ timeBlock, habits: blockHabits, bgColor, borderColor }) => (
						<div
							key={timeBlock.id}
							className={`p-4 rounded-xl ${bgColor} border ${borderColor}`}
						>
							<div className="flex items-center gap-2 mb-4">
								<BsCalendar4 size={16} className="text-gray-600" />
								<h3 className="font-medium text-gray-700">
									{timeBlock.name} ({timeBlock.startTime} - {timeBlock.endTime})
								</h3>
							</div>
							<div className="space-y-3">
								{blockHabits.map((habit) => (
									<Habit
										key={habit.id}
										habit={habit}
										currentDate={currentDate}
										setSelectedHabit={setSelectedHabit}
										activeTimer={activeTimer}
										setActiveTimer={setActiveTimer}
										habits={habits}
									/>
								))}
								{blockHabits.length === 0 && (
									<div className="text-center text-gray-500 py-2">
										No habits scheduled for this time block
									</div>
								)}
							</div>
						</div>
					)
				)}
				{habitsByTimeBlock.length === 0 && (
					<div className="text-center text-gray-500 py-8">
						No time blocks added yet. Click the "Add New" button to create your
						first time block!
					</div>
				)}
			</div>

			{selectedHabit && (
				<HabitModal
					habit={selectedHabit.habit}
					timeBlockName={selectedHabit.timeBlockName}
					open={true}
					onClose={() => setSelectedHabit(null)}
				/>
			)}
		</div>
	);
}
