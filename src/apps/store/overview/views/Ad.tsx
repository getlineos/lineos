export default function Ad() {
	return (
		<div className="bg-white rounded-xl overflow-hidden border border-gray-200">
			<div className="h-48 bg-amber-100">
				<img
					src="https://m.media-amazon.com/images/I/91gncdmS6CL.png"
					alt="Bring You Home"
					width={384}
					height={192}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-4">
				<h3 className="text-xl font-bold mb-1">Bring You Home</h3>
				<p className="text-gray-500 mb-4">Puzzle Game</p>
				<button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium">
					$21.50
				</button>
			</div>
		</div>
	);
}
