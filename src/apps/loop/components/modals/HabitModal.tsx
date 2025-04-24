import { Modal, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Habit } from "../../types";
import { useState } from "react";
import NewHabitModal from "./NewHabitModal";
import { useLoop } from "../../context/LoopContext";

interface HabitModalProps {
	habit: Habit;
	timeBlockName: string;
	open: boolean;
	onClose: () => void;
}

export default function HabitModal({
	habit,
	timeBlockName,
	open,
	onClose,
}: HabitModalProps) {
	const [isEditMode, setIsEditMode] = useState(false);
	const { deleteHabit } = useLoop();

	const handleDelete = () => {
		deleteHabit(habit.id);
		onClose();
	};

	if (isEditMode) {
		return (
			<NewHabitModal
				open={true}
				onClose={() => setIsEditMode(false)}
				editHabit={habit}
			/>
		);
	}

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={[
				<Button
					key="edit"
					type="primary"
					icon={<EditOutlined />}
					onClick={() => setIsEditMode(true)}
					className="bg-blue-500"
				>
					Edit
				</Button>,
				<Popconfirm
					key="delete"
					title="Delete habit"
					description="Are you sure you want to delete this habit?"
					onConfirm={handleDelete}
					okText="Yes"
					cancelText="No"
					okButtonProps={{ danger: true }}
				>
					<Button danger icon={<DeleteOutlined />}>
						Delete
					</Button>
				</Popconfirm>,
			]}
		>
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<span className="text-4xl">{habit.icon}</span>
					<div>
						<h3 className="text-xl font-semibold">{habit.name}</h3>
						<p className="text-gray-500">{timeBlockName}</p>
					</div>
				</div>

				<div className="space-y-2">
					<h4 className="font-medium">Goal</h4>
					<p>
						{habit.goal?.value} {habit.goal?.unit} {habit.goal?.frequency}
					</p>
					<p className="text-gray-500">
						Repeats {habit.goal?.repeat.toLowerCase()}
					</p>
				</div>

				{habit.description && (
					<div className="space-y-2">
						<h4 className="font-medium">Reminders</h4>
						<p className="text-gray-600">{habit.description}</p>
					</div>
				)}
			</div>
		</Modal>
	);
}
