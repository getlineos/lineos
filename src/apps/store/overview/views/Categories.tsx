import { Gamepad2 } from "lucide-react";

export default function Categories() {
	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Categories</h2>
				<button className="text-blue-500 text-sm font-medium">Show all</button>
			</div>

			<div className="grid grid-cols-4 gap-4 mb-8">
				<div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
					<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
						<Gamepad2 className="h-5 w-5 text-gray-500" />
					</div>
					<span className="text-sm font-medium">Games</span>
				</div>

				<div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
					<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-gray-500"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<circle cx="12" cy="12" r="4"></circle>
						</svg>
					</div>
					<span className="text-sm font-medium">Creation</span>
				</div>

				<div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
					<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-gray-500"
						>
							<path d="M12 2L2 7l10 5 10-5-10-5z"></path>
							<path d="M2 17l10 5 10-5"></path>
							<path d="M2 12l10 5 10-5"></path>
						</svg>
					</div>
					<span className="text-sm font-medium">Development</span>
				</div>

				<div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
					<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-gray-500"
						>
							<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
						</svg>
					</div>
					<span className="text-sm font-medium">Work</span>
				</div>
			</div>
		</div>
	);
}
