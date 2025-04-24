export interface TimeBlock {
	id: string;
	name: string;
	startTime: string;
	endTime: string;
}

export interface HabitGoal {
	value: number;
	unit: "Times" | "Mins";
	frequency: "Per Day" | "Per Week" | "Per Month";
	repeat: "Daily" | "Weekly" | "Monthly";
}

export type HabitIcon = "🏃‍♂️" | "📚" | "💪" | "🧘‍♂️" | "🎨" | "🎵";

export interface HabitT {
	id: string;
	name: string;
	icon: HabitIcon;
	timeBlockId: string;
	description?: string;
	completed?: boolean;
	goal?: HabitGoal;
	startDate: string;
}

export interface TimerData {
	habitId: string;
	date: string;
	totalMinutes: number;
	isCompleted: boolean;
}

export interface LocalStorageData {
	timeBlocks: TimeBlock[];
	habits: HabitT[];
	timerData: TimerData[];
}
