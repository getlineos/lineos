import { getStoredData } from "./storage";

export const formatTime = (
	minutes: number,
	format: "hms" | "hm" | "ms" = "hms"
): string => {
	if (minutes < 1) {
		const seconds = Math.round(minutes * 60);
		if (seconds === 60) {
			return "1m";
		}
		return `${seconds}s`;
	}

	const hours = Math.floor(minutes / 60);
	const mins = Math.floor(minutes % 60);
	const secs = Math.round((minutes * 60) % 60);

	if (format === "hm") {
		if (hours > 0) {
			return `${hours}h ${mins}m`;
		}
		return `${mins}m`;
	}

	if (format === "ms") {
		return `${mins}m ${secs}s`;
	}

	if (hours > 0) {
		return `${hours}h ${mins}m ${secs}s`;
	}

	return `${mins}m ${secs}s`;
};

export const getDailyMinutesSpent = (currentDate: string) => {
	const [year, month] = currentDate.split("-");
	const { timerData } = getStoredData();

	const totalMinutes = timerData
		?.filter((timer) => timer.date.startsWith(`${year}-${month}`))
		.reduce((acc, timer) => {
			acc[timer.date] = (acc[timer.date] || 0) + (timer.totalMinutes || 0);
			return acc;
		}, {} as Record<string, number>);

	return totalMinutes;
};
