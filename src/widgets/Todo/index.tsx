import { Empty } from "antd";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

type TodoT = {
	title: string;
	isCompleted: boolean;
};

export default function TodoWidget() {
	const [todos] = useState<TodoT[]>([]);

	return (
		<div className="bg-white w-[400px] rounded-xl min-h-10 m-5 px-2.5 py-2 relative">
			<h2 className="font-semibold text-sm">Today</h2>
			<div>
				{todos?.length ? (
					todos.map((todo) => <div>{todo.title}</div>)
				) : (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="my-16" />
				)}
			</div>

			<button className="w-8 h-8 bg-[#4f9dff] rounded-full absolute bottom-2 right-2 flex items-center justify-center">
				<IoAddOutline className="text-white text-2xl" />
			</button>
		</div>
	);
}
