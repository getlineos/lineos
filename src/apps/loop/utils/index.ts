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
