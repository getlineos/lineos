import { useState } from "react";
import { useEffect } from "react";

export default function CalendarWidget() {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDate(new Date());
		}, 60000);

		return () => clearInterval(timer);
	}, []);

	const dayOfWeek = currentDate
		.toLocaleString("en-US", { weekday: "long" })
		.toUpperCase();
	const dayOfMonth = currentDate.getDate();

	return (
		<div className="bg-white rounded-xl p-4 shadow-lg w-full flex flex-col">
			<div className="text-red-500 font-medium text-sm">{dayOfWeek}</div>
			<div className="text-5xl font-light mt-2">{dayOfMonth}</div>
			<div className="text-gray-500 text-sm flex items-center flex-1">
				No events today
			</div>
		</div>
	);
}
