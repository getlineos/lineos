import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { HabitT, TimeBlock } from "../types";
import {
	getHabits,
	getTimeBlocks,
	saveHabit,
	saveTimeBlock,
} from "../utils/storage";

interface LoopContextType {
	habits: HabitT[];
	timeBlocks: TimeBlock[];
	addHabit: (habit: Omit<HabitT, "id">) => void;
	updateHabit: (id: string, habit: Omit<HabitT, "id">) => void;
	deleteHabit: (id: string) => void;
	addTimeBlock: (timeBlock: Omit<TimeBlock, "id">) => void;
	toggleHabitComplete: (habitId: string) => void;
}

const LoopContext = createContext<LoopContextType | undefined>(undefined);

export function LoopProvider({ children }: { children: ReactNode }) {
	const [habits, setHabits] = useState<HabitT[]>([]);
	const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);

	useEffect(() => {
		// Load initial data from localStorage
		setHabits(getHabits());
		setTimeBlocks(getTimeBlocks());
	}, []);

	const addHabit = (habitData: Omit<HabitT, "id">) => {
		const newHabit = {
			...habitData,
			id: crypto.randomUUID(),
		};
		saveHabit(newHabit);
		setHabits((prev) => [...prev, newHabit]);
	};

	const updateHabit = (id: string, habitData: Omit<HabitT, "id">) => {
		const updatedHabit = { ...habitData, id };
		const updatedHabits = habits.map((habit) =>
			habit.id === id ? updatedHabit : habit
		);
		localStorage.setItem(
			"loop-app-data",
			JSON.stringify({ habits: updatedHabits, timeBlocks })
		);
		setHabits(updatedHabits);
	};

	const deleteHabit = (id: string) => {
		const updatedHabits = habits.filter((habit) => habit.id !== id);
		localStorage.setItem(
			"loop-app-data",
			JSON.stringify({ habits: updatedHabits, timeBlocks })
		);
		setHabits(updatedHabits);
	};

	const addTimeBlock = (timeBlockData: Omit<TimeBlock, "id">) => {
		const newTimeBlock = {
			...timeBlockData,
			id: crypto.randomUUID(),
		};
		saveTimeBlock(newTimeBlock);
		setTimeBlocks((prev) => [...prev, newTimeBlock]);
	};

	const toggleHabitComplete = (habitId: string) => {
		const updatedHabits = habits.map((habit) =>
			habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
		);
		// Update localStorage
		localStorage.setItem(
			"loop-app-data",
			JSON.stringify({ habits: updatedHabits, timeBlocks })
		);
		setHabits(updatedHabits);
	};

	return (
		<LoopContext.Provider
			value={{
				habits,
				timeBlocks,
				addHabit,
				updateHabit,
				deleteHabit,
				addTimeBlock,
				toggleHabitComplete,
			}}
		>
			{children}
		</LoopContext.Provider>
	);
}

export function useLoop() {
	const context = useContext(LoopContext);
	if (context === undefined) {
		throw new Error("useLoop must be used within a LoopProvider");
	}
	return context;
}
