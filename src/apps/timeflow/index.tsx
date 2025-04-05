import { motion } from "framer-motion";
import { Pause, Play, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Task {
	id: string;
	title: string;
	isRunning: boolean;
	timeSpent: number;
	createdAt: Date;
}

const STORAGE_KEY = "timeflow_tasks";

export default function TimeFlow() {
	const [tasks, setTasks] = useState<Task[]>(() => {
		// Load tasks from localStorage on initial render
		const savedTasks = localStorage.getItem(STORAGE_KEY);
		if (savedTasks) {
			const parsedTasks = JSON.parse(savedTasks);
			// Convert string dates back to Date objects
			return parsedTasks.map((task: any) => ({
				...task,
				createdAt: new Date(task.createdAt),
			}));
		}
		return [];
	});
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [activeView, setActiveView] = useState<"tasks" | "analytics">("tasks");

	// Save tasks to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	}, [tasks]);

	const addTask = () => {
		if (!newTaskTitle.trim()) return;

		const newTask: Task = {
			id: Date.now().toString(),
			title: newTaskTitle,
			isRunning: false,
			timeSpent: 0,
			createdAt: new Date(),
		};

		setTasks([...tasks, newTask]);
		setNewTaskTitle("");
	};

	const toggleTimer = (taskId: string) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === taskId) {
					return { ...task, isRunning: !task.isRunning };
				}
				return { ...task, isRunning: false }; // Stop other tasks
			})
		);
	};

	const deleteTask = (taskId: string) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
	};

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	// Update time for running tasks
	useEffect(() => {
		const interval = setInterval(() => {
			setTasks(
				tasks.map((task) => {
					if (task.isRunning) {
						return { ...task, timeSpent: task.timeSpent + 1 };
					}
					return task;
				})
			);
		}, 1000);

		return () => clearInterval(interval);
	}, [tasks]);

	// Calculate analytics
	const calculateAnalytics = () => {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
		const monthAgo = new Date(
			today.getFullYear(),
			today.getMonth() - 1,
			today.getDate()
		);

		const todayTotal = tasks.reduce((total, task) => {
			if (new Date(task.createdAt) >= today) {
				return total + task.timeSpent;
			}
			return total;
		}, 0);

		const weekTotal = tasks.reduce((total, task) => {
			if (new Date(task.createdAt) >= weekAgo) {
				return total + task.timeSpent;
			}
			return total;
		}, 0);

		const monthTotal = tasks.reduce((total, task) => {
			if (new Date(task.createdAt) >= monthAgo) {
				return total + task.timeSpent;
			}
			return total;
		}, 0);

		return {
			today: formatTime(todayTotal),
			week: formatTime(weekTotal),
			month: formatTime(monthTotal),
		};
	};

	const analytics = calculateAnalytics();

	return (
		<div className="w-full h-full p-6 bg-gray-50 overflow-y-auto">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">TimeFlow</h1>
					<div className="flex gap-4">
						<button
							onClick={() => setActiveView("tasks")}
							className={`px-4 py-2 rounded-lg ${
								activeView === "tasks"
									? "bg-blue-500 text-white"
									: "bg-gray-200"
							}`}
						>
							Tasks
						</button>
						<button
							onClick={() => setActiveView("analytics")}
							className={`px-4 py-2 rounded-lg ${
								activeView === "analytics"
									? "bg-blue-500 text-white"
									: "bg-gray-200"
							}`}
						>
							Analytics
						</button>
					</div>
				</div>

				{activeView === "tasks" ? (
					<>
						<div className="flex gap-4 mb-6">
							<input
								type="text"
								value={newTaskTitle}
								onChange={(e) => setNewTaskTitle(e.target.value)}
								placeholder="Add a new task..."
								className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								onKeyPress={(e) => e.key === "Enter" && addTask()}
							/>
							<button
								onClick={addTask}
								className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
							>
								<Plus size={20} />
							</button>
						</div>

						<div className="space-y-4">
							{tasks.map((task) => (
								<motion.div
									key={task.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
								>
									<div className="flex items-center gap-4">
										<button
											onClick={() => toggleTimer(task.id)}
											className={`p-2 rounded-full ${
												task.isRunning
													? "bg-red-500 text-white"
													: "bg-green-500 text-white"
											}`}
										>
											{task.isRunning ? (
												<Pause size={20} />
											) : (
												<Play size={20} />
											)}
										</button>
										<span className="text-lg font-medium">{task.title}</span>
									</div>
									<div className="flex items-center gap-4">
										<span className="text-gray-600 font-mono">
											{formatTime(task.timeSpent)}
										</span>
										<button
											onClick={() => deleteTask(task.id)}
											className="p-2 text-gray-400 hover:text-red-500 transition-colors"
										>
											<Trash2 size={20} />
										</button>
									</div>
								</motion.div>
							))}
						</div>
					</>
				) : (
					<div className="bg-white p-6 rounded-lg shadow-sm">
						<h2 className="text-xl font-semibold mb-4">Time Analytics</h2>
						<div className="grid grid-cols-3 gap-4">
							<div className="p-4 bg-blue-50 rounded-lg">
								<h3 className="text-sm text-gray-600">Today</h3>
								<p className="text-2xl font-bold">{analytics.today}</p>
							</div>
							<div className="p-4 bg-blue-50 rounded-lg">
								<h3 className="text-sm text-gray-600">This Week</h3>
								<p className="text-2xl font-bold">{analytics.week}</p>
							</div>
							<div className="p-4 bg-blue-50 rounded-lg">
								<h3 className="text-sm text-gray-600">This Month</h3>
								<p className="text-2xl font-bold">{analytics.month}</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
