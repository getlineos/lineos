import { cn } from "@/utils";
import { Empty } from "antd";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

type TodoT = {
	title: string;
	isCompleted: boolean;
};

export default function TodoWidget() {
	const [todos] = useState<TodoT[]>([]);
	const isLg = window.innerHeight > 900;

	return (
		<div
			className={cn(
				"bg-white w-[400px] rounded-xl px-2.5 py-2 relative",
				isLg ? "min-h-10" : "min-h-8"
			)}
		>
			<h2 className="font-semibold text-sm">Today</h2>
			<div>
				{todos?.length ? (
					todos.map((todo) => <div>{todo.title}</div>)
				) : (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						className={cn(isLg ? "my-16" : "my-12")}
					/>
				)}
			</div>

			<button className="w-8 h-8 bg-[#4f9dff] rounded-full absolute bottom-2 right-2 flex items-center justify-center">
				<IoAddOutline className="text-white text-2xl" />
			</button>
		</div>
	);
}
