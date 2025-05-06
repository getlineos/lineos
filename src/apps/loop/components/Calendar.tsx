import { cn } from "@/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { getDailyMinutesSpent } from "../utils";
import { getGoalMinutes } from "../utils/storage";

interface CalendarProps {
	currentDate: string;
	onDateChange: (date: string) => void;
	progress?: { [key: string]: number };
}

export default function Calendar({ currentDate, onDateChange }: CalendarProps) {
	const currentDayjs = dayjs(currentDate);
	const [selectedMonth, setSelectedMonth] = useState(currentDayjs.month());
	const [selectedYear, setSelectedYear] = useState(currentDayjs.year());
	const [dailyMinutesSpent, setDailyMinutesSpent] = useState<
		Record<string, number>
	>({});

	const getDaysInMonth = (month: number, year: number) => {
		return dayjs().year(year).month(month).daysInMonth();
	};

	const getFirstDayOfMonth = (month: number, year: number) => {
		return dayjs().year(year).month(month).startOf("month").day();
	};

	const handleDateSelect = (day: number) => {
		const newDate = dayjs()
			.year(selectedYear)
			.month(selectedMonth)
			.date(day)
			.format("YYYY-MM-DD");
		onDateChange(newDate);
	};

	const handleMonthChange = (increment: number) => {
		const newDate = dayjs()
			.year(selectedYear)
			.month(selectedMonth)
			.add(increment, "month");

		setSelectedMonth(newDate.month());
		setSelectedYear(newDate.year());
	};

	const today = dayjs().format("YYYY-MM-DD");
	const goalMinutes = getGoalMinutes();

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

	const fetchDayData = () => {
		setDailyMinutesSpent(getDailyMinutesSpent(currentDate));
	};

	return (
		<div className="bg-white p-6 rounded-2xl">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold">
					{dayjs().month(selectedMonth).format("MMMM")}, {selectedYear}
				</h3>
				<div className="flex gap-2">
					<button
						className="p-1 hover:bg-gray-100 rounded"
						onClick={() => handleMonthChange(-1)}
					>
						<BsChevronLeft size={20} />
					</button>
					<button
						className="p-1 hover:bg-gray-100 rounded"
						onClick={() => handleMonthChange(1)}
					>
						<BsChevronRight size={20} />
					</button>
				</div>
			</div>
			<div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
				{["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
					<div key={i} className="text-gray-500">
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-2 text-center">
				{Array.from({
					length: getFirstDayOfMonth(selectedMonth, selectedYear),
				}).map((_, i) => (
					<div key={`empty-${i}`} />
				))}
				{Array.from({
					length: getDaysInMonth(selectedMonth, selectedYear),
				}).map((_, i) => {
					const day = i + 1;
					const currentDateString = dayjs()
						.year(selectedYear)
						.month(selectedMonth)
						.date(day)
						.format("YYYY-MM-DD");

					return (
						<DayCell
							key={i}
							day={day}
							isSelected={currentDateString === currentDate}
							isToday={currentDateString === today}
							progress={
								((dailyMinutesSpent[currentDateString] || 0) / goalMinutes) *
								100
							}
							onDateChange={handleDateSelect}
						/>
					);
				})}
			</div>
		</div>
	);
}

type DayCellProps = {
	day: number;
	progress: number;
	isSelected: boolean;
	onDateChange: (day: number) => void;
	isToday: boolean;
};

const DayCell = ({
	day,
	progress,
	isSelected,
	onDateChange,
	isToday,
}: DayCellProps) => {
	return (
		<button
			onClick={() => onDateChange(day)}
			className={cn(
				"p-2 rounded-full relative overflow-hidden bg-progress-gradient",
				isSelected && "bg-blue-500 text-white",
				isToday && !isSelected && "bg-blue-100",
				!isSelected && !isToday && "hover:bg-gray-100"
			)}
			style={{ "--progress": `${progress}%` } as React.CSSProperties}
		>
			{day}
		</button>
	);
};
