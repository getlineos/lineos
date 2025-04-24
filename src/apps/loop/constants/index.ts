import { HabitIcon } from "../types";

export const EMOJI_ICONS = {
	EXERCISE: "🏃‍♂️" as HabitIcon,
	READING: "📚" as HabitIcon,
	STRENGTH: "💪" as HabitIcon,
	MEDITATION: "🧘‍♂️" as HabitIcon,
	ART: "🎨" as HabitIcon,
	MUSIC: "🎵" as HabitIcon,
	WRITING: "✍️" as HabitIcon,
	COOKING: "🥘" as HabitIcon,
	SLEEP: "😴" as HabitIcon,
	STUDY: "📝" as HabitIcon,
	HYDRATE: "💧" as HabitIcon,
} as const;

export const HABIT_ICONS = Object.values(EMOJI_ICONS);

export const TIME_BLOCK_COLORS = [
	"bg-blue-50",
	"bg-green-50",
	"bg-purple-50",
	"bg-yellow-50",
	"bg-pink-50",
	"bg-indigo-50",
] as const;

export const TIME_BLOCK_BORDER_COLORS = [
	"border-blue-200",
	"border-green-200",
	"border-purple-200",
	"border-yellow-200",
	"border-pink-200",
	"border-indigo-200",
] as const;

export const FREQUENCY_OPTIONS = ["Per Day", "Per Week", "Per Month"] as const;
export const REPEAT_OPTIONS = ["Daily", "Weekly", "Monthly"] as const;
export const UNIT_OPTIONS = ["Times", "Mins"] as const;
