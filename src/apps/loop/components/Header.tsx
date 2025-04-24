import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useState } from "react";
import { BsCalendar4, BsClock, BsPlus } from "react-icons/bs";
import NewHabitModal from "./modals/NewHabitModal";
import NewTimeBlockModal from "./modals/NewTimeBlockModal";
import dayjs from "dayjs";

const DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default function Header({ currentDate }: { currentDate: string }) {
	const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
	const [isTimeBlockModalOpen, setIsTimeBlockModalOpen] = useState(false);

	const formatDate = (date: string) => {
		const day = DAYS[dayjs(date).day()];
		const month = MONTHS[dayjs(date).month()];
		return `${day}, ${dayjs(date).date()} ${month} ${dayjs(date).year()}`;
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: "New Habit",
			icon: <BsCalendar4 />,
			onClick: () => setIsHabitModalOpen(true),
		},
		{
			key: "2",
			label: "New Time Block",
			icon: <BsClock />,
			onClick: () => setIsTimeBlockModalOpen(true),
		},
	];

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-4xl font-bold text-gray-800">
						Happy {DAYS[dayjs(currentDate).day()]} 👋
					</h1>
					<p className="text-gray-600 mt-2">{formatDate(currentDate)}</p>
				</div>
				<div>
					<Dropdown.Button
						menu={{
							items,
						}}
						onClick={() => setIsHabitModalOpen(true)}
					>
						<BsPlus /> Create Habit
					</Dropdown.Button>
				</div>
			</div>

			<NewHabitModal
				open={isHabitModalOpen}
				onClose={() => setIsHabitModalOpen(false)}
			/>
			<NewTimeBlockModal
				open={isTimeBlockModalOpen}
				onClose={() => setIsTimeBlockModalOpen(false)}
			/>
		</>
	);
}
