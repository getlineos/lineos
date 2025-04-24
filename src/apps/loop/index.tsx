import { useState } from "react";
import dayjs from "dayjs";
import Analytics from "./components/Analytics";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import TodoList from "./components/HabitList";
import { LoopProvider } from "./context/LoopContext";

export default function Loop() {
	const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));

	return (
		<LoopProvider>
			<div className="w-full h-full p-6 bg-gray-50 overflow-y-auto">
				<div className="max-w-6xl mx-auto">
					<Header currentDate={currentDate} />

					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-8">
							<TodoList currentDate={currentDate} />
						</div>

						<div className="col-span-4 space-y-6">
							<Calendar
								currentDate={currentDate}
								onDateChange={(date) =>
									setCurrentDate(dayjs(date).format("YYYY-MM-DD"))
								}
							/>
							<Analytics currentDate={currentDate} />
						</div>
					</div>
				</div>
			</div>
		</LoopProvider>
	);
}
