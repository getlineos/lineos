export default function Trending() {
	return (
		<div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="font-bold">Trending</h2>
				<button className="text-blue-500 text-sm font-medium">Show all</button>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
						</svg>
					</div>
					<div className="flex-1">
						<h3 className="font-medium text-sm">Telegram</h3>
						<p className="text-xs text-gray-500">Social networks</p>
					</div>
					<button className="text-xs text-blue-500 font-medium">
						Download
					</button>
				</div>

				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
						</svg>
					</div>
					<div className="flex-1">
						<h3 className="font-medium text-sm">WhatsApp Desktop</h3>
						<p className="text-xs text-gray-500">Trending</p>
					</div>
					<button className="text-xs text-blue-500 font-medium">
						Download
					</button>
				</div>

				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M12 2L2 7l10 5 10-5-10-5z"></path>
							<path d="M2 17l10 5 10-5"></path>
							<path d="M2 12l10 5 10-5"></path>
						</svg>
					</div>
					<div className="flex-1">
						<h3 className="font-medium text-sm">Machinarium</h3>
						<p className="text-xs text-gray-500">Adventure game</p>
					</div>
					<button className="text-xs text-blue-500 font-medium">
						Download
					</button>
				</div>

				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
						<span className="text-white font-bold">W</span>
					</div>
					<div className="flex-1">
						<h3 className="font-medium text-sm">Microsoft Word</h3>
						<p className="text-xs text-gray-500">Text editor</p>
					</div>
					<button className="text-xs text-blue-500 font-medium">
						Download
					</button>
				</div>
			</div>
		</div>
	);
}
