import {
	BarChart3,
	Download,
	Gamepad2,
	Grid,
	LogOut,
	Settings,
} from "lucide-react";

export default function Sidebar() {
	return (
		<div className="w-64 bg-white border-r border-gray-200">
			<div className="p-4 flex items-center gap-2">
				<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
					<span className="text-white text-xl font-bold">A</span>
				</div>
				<span className="font-semibold text-lg">AppStore</span>
			</div>

			<nav className="mt-4 px-2">
				<div className="space-y-1">
					<button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white">
						<Grid className="h-5 w-5" />
						<span>Overview</span>
					</button>

					<button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100">
						<Gamepad2 className="h-5 w-5 text-gray-500" />
						<span>Arcade</span>
					</button>

					<button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100">
						<BarChart3 className="h-5 w-5 text-gray-500" />
						<span>Charts</span>
					</button>

					<button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100">
						<Download className="h-5 w-5 text-gray-500" />
						<span>Updates</span>
					</button>

					<button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100">
						<Settings className="h-5 w-5 text-gray-500" />
						<span>Settings</span>
					</button>
				</div>
			</nav>

			<div className="mx-4 mt-4 mb-4">
				<div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
					<button className="absolute top-2 right-2 text-white/80 hover:text-white">
						<span className="sr-only">Close</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
					<h3 className="text-xl font-bold mb-1">1 Month</h3>
					<h3 className="text-xl font-bold mb-1">Apple Music</h3>
					<p className="text-lg font-medium mb-1">subscribe</p>
					<p className="text-lg font-medium mb-4">for Free</p>
					<button className="w-full bg-white text-purple-700 rounded-full py-2 font-medium text-sm">
						Get Subscribe
					</button>
				</div>
			</div>

			<div className="p-4 border-t border-gray-200">
				<button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100">
					<LogOut className="h-5 w-5 text-gray-500" />
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
}
