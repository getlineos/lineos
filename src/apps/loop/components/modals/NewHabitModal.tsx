import { Form, Input, InputNumber, Modal, Radio, Select } from "antd";
import {
	FREQUENCY_OPTIONS,
	HABIT_ICONS,
	REPEAT_OPTIONS,
	UNIT_OPTIONS,
} from "../../constants";
import { useLoop } from "../../context/LoopContext";
import { HabitT } from "../../types";

interface NewHabitModalProps {
	open: boolean;
	onClose: () => void;
	editHabit?: HabitT;
}

export default function NewHabitModal({
	open,
	onClose,
	editHabit,
}: NewHabitModalProps) {
	const [form] = Form.useForm();
	const { timeBlocks, addHabit, updateHabit } = useLoop();

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			const habitData = {
				name: values.name,
				icon: values.icon,
				timeBlockId: values.timeBlockId,
				description: values.description,
				completed: editHabit ? editHabit.completed : false,
				goal: {
					value: values.goalValue,
					unit: values.goalUnit,
					frequency: values.frequency,
					repeat: values.repeat,
				},
				startDate: editHabit ? editHabit.startDate : new Date().toISOString(),
			};

			if (editHabit) {
				updateHabit(editHabit.id, habitData);
			} else {
				addHabit(habitData);
			}
			form.resetFields();
			onClose();
		});
	};

	return (
		<Modal
			title={editHabit ? "Edit Habit" : "New Habit"}
			open={open}
			onOk={handleSubmit}
			onCancel={onClose}
			width={600}
		>
			<Form
				form={form}
				layout="vertical"
				initialValues={
					editHabit && editHabit.goal
						? {
								name: editHabit.name,
								icon: editHabit.icon,
								timeBlockId: editHabit.timeBlockId,
								description: editHabit.description,
								goalValue: editHabit.goal.value,
								goalUnit: editHabit.goal.unit,
								frequency: editHabit.goal.frequency,
								repeat: editHabit.goal.repeat,
						  }
						: {
								goalValue: 1,
								goalUnit: UNIT_OPTIONS[0],
								frequency: FREQUENCY_OPTIONS[0],
								repeat: REPEAT_OPTIONS[0],
								icon: HABIT_ICONS[0],
						  }
				}
			>
				<div className="grid grid-cols-12">
					<div className="col-span-12">
						<Form.Item
							name="icon"
							label="Icon"
							rules={[{ required: true, message: "Please select an icon" }]}
						>
							<Radio.Group className="flex flex-wrap gap-2">
								{HABIT_ICONS.map((icon) => (
									<Radio.Button
										key={icon}
										value={icon}
										className="flex items-center justify-center w-9 h-9 text-xl"
									>
										{icon}
									</Radio.Button>
								))}
							</Radio.Group>
						</Form.Item>
					</div>
					<div className="col-span-12">
						<Form.Item
							name="name"
							label="Name"
							rules={[{ required: true, message: "Please enter a habit name" }]}
						>
							<Input placeholder="e.g., Morning Exercise" />
						</Form.Item>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-8 space-y-4">
						<h3 className="font-medium text-gray-700">Goal</h3>
						<div className="flex gap-2">
							<Form.Item
								name="goalValue"
								className="mb-0"
								rules={[
									{ required: true, message: "Value is required" },
									{
										type: "number",
										min: 1,
										message: "Value must be at least 1",
									},
								]}
							>
								<InputNumber min={1} className="w-20" />
							</Form.Item>
							<Form.Item
								name="goalUnit"
								className="mb-0 flex-1"
								rules={[{ required: true, message: "Unit is required" }]}
							>
								<Select>
									{UNIT_OPTIONS.map((unit) => (
										<Select.Option key={unit} value={unit}>
											{unit}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								name="frequency"
								className="mb-0 flex-1"
								rules={[{ required: true, message: "Frequency is required" }]}
							>
								<Select>
									{FREQUENCY_OPTIONS.map((freq) => (
										<Select.Option key={freq} value={freq}>
											{freq}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</div>
					</div>

					<div className="col-span-4 space-y-4">
						<h3 className="font-medium text-gray-700">Schedule</h3>
						<Form.Item
							name="repeat"
							className="mb-0"
							rules={[{ required: true, message: "Required" }]}
						>
							<Select>
								{REPEAT_OPTIONS.map((repeat) => (
									<Select.Option key={repeat} value={repeat}>
										{repeat}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</div>
				</div>

				<Form.Item
					name="timeBlockId"
					label="Time of Day"
					rules={[{ required: true, message: "Please select a time block" }]}
					className="mt-4"
				>
					<Select placeholder="Select time block">
						{timeBlocks.map((block) => (
							<Select.Option key={block.id} value={block.id}>
								{block.name} ({block.startTime} - {block.endTime})
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item name="description" label="Reminders">
					<Input.TextArea placeholder="Optional reminders or notes" />
				</Form.Item>
			</Form>
		</Modal>
	);
}
