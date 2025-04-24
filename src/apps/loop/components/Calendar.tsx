import dayjs from "dayjs";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface CalendarProps {
	currentDate: string;
	onDateChange: (date: string) => void;
}

export default function Calendar({ currentDate, onDateChange }: CalendarProps) {
	const currentDayjs = dayjs(currentDate);
	const [selectedMonth, setSelectedMonth] = useState(currentDayjs.month());
	const [selectedYear, setSelectedYear] = useState(currentDayjs.year());

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
						<button
							key={day}
							onClick={() => handleDateSelect(day)}
							className={`p-2 rounded-full ${
								currentDateString === currentDate
									? "bg-blue-500 text-white"
									: currentDateString === today
									? "bg-blue-100"
									: "hover:bg-gray-100"
							}`}
						>
							{day}
						</button>
					);
				})}
			</div>
		</div>
	);
}
