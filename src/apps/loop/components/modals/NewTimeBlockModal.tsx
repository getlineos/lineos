import { Form, Input, Modal, TimePicker } from "antd";
import { useLoop } from "../../context/LoopContext";

interface NewTimeBlockModalProps {
	open: boolean;
	onClose: () => void;
}

export default function NewTimeBlockModal({
	open,
	onClose,
}: NewTimeBlockModalProps) {
	const [form] = Form.useForm();
	const { addTimeBlock } = useLoop();

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			addTimeBlock({
				name: values.name,
				startTime: values.timeRange[0].format("HH:mm"),
				endTime: values.timeRange[1].format("HH:mm"),
			});
			form.resetFields();
			onClose();
		});
	};

	return (
		<Modal
			title="New Time Block"
			open={open}
			onOk={handleSubmit}
			onCancel={onClose}
		>
			<Form form={form} layout="vertical">
				<Form.Item
					name="name"
					label="Name"
					rules={[{ required: true, message: "Please enter a name" }]}
				>
					<Input placeholder="e.g., Morning, Afternoon, Evening" />
				</Form.Item>
				<Form.Item
					name="timeRange"
					label="Time Range"
					rules={[{ required: true, message: "Please select time range" }]}
				>
					<TimePicker.RangePicker format="HH:mm" />
				</Form.Item>
			</Form>
		</Modal>
	);
}
