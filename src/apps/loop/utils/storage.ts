import dayjs from "dayjs";
import { HabitT, LocalStorageData, TimeBlock, TimerData } from "../types";

const STORAGE_KEY = "loop-app-data";

export const getStoredData = (): LocalStorageData => {
	const storedData = localStorage.getItem(STORAGE_KEY);
	return storedData
		? JSON.parse(storedData)
		: { timeBlocks: [], habits: [], timerData: [] };
};

export const saveTimeBlock = (timeBlock: TimeBlock) => {
	const data = getStoredData();
	data.timeBlocks.push(timeBlock);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const saveHabit = (habit: HabitT) => {
	const data = getStoredData();
	data.habits.push(habit);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getTimeBlocks = (): TimeBlock[] => {
	return getStoredData().timeBlocks;
};

export const getHabits = (): HabitT[] => {
	return getStoredData().habits;
};

export const getTimerData = (
	habitId: string,
	date: string
): TimerData | undefined => {
	const data = getStoredData();
	return data.timerData?.find(
		(timer) => timer.habitId === habitId && timer.date === date
	);
};

export const updateTimerData = (timerData: TimerData) => {
	const data = getStoredData();

	if (!data.timerData) {
		data.timerData = [];
	}

	// Ensure date is in correct format
	timerData.date = dayjs(timerData.date).format("YYYY-MM-DD");

	const index = data.timerData.findIndex(
		(timer) =>
			timer.habitId === timerData.habitId && timer.date === timerData.date
	);

	if (index >= 0) {
		// Preserve totalMinutes if it exists in the current data
		const currentData = data.timerData[index];
		data.timerData[index] = {
			...timerData,
			totalMinutes: timerData.totalMinutes ?? currentData.totalMinutes ?? 0,
		};
	} else {
		data.timerData.push({
			...timerData,
			totalMinutes: timerData.totalMinutes ?? 0,
		});
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const toggleHabitCompletion = (habitId: string, date: string) => {
	const existingData = getTimerData(habitId, date);

	if (existingData) {
		updateTimerData({
			...existingData,
			isCompleted: !existingData.isCompleted,
		});
	} else {
		updateTimerData({
			habitId,
			date,
			isCompleted: true,
			totalMinutes: 0,
		});
	}
};
