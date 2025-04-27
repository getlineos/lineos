export default function Recommended() {
	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Recommended for you</h2>
				<button className="text-blue-500 text-sm font-medium">Show all</button>
			</div>

			<div className="grid grid-cols-3 gap-4">
				<div className="bg-white rounded-xl overflow-hidden border border-gray-200">
					<div className="h-36 bg-black">
						<img
							src="https://telaviva.com.br/wp-content/uploads/2023/03/hbo-max.jpg"
							alt="Tayasui sketches"
							width={240}
							height={144}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="p-3">
						<h3 className="font-medium mb-1">HBO Max</h3>
						<p className="text-xs text-gray-500 mb-2">Creation</p>
						<button className="text-xs text-blue-500 font-medium">
							Download
						</button>
					</div>
				</div>

				<div className="bg-white rounded-xl overflow-hidden border border-gray-200">
					<div className="h-36 bg-black">
						<img
							src="https://procreate-assets-cdn.procreate.com/_nuxt/default_en.rxoU7ubg.jpg"
							alt="Myst"
							width={240}
							height={144}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="p-3">
						<h3 className="font-medium mb-1">Procreate</h3>
						<div className="flex justify-between items-center">
							<p className="text-xs text-gray-500">Tools</p>
							<p className="text-xs text-blue-500 font-medium">$12.00</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl overflow-hidden border border-gray-200">
					<div className="h-36 bg-black">
						<img
							src="https://static-cse.canva.com/blob/1522769/CC2024PR_Workplaceenterprisecentricfeatures.png"
							alt="Canva"
							width={240}
							height={144}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="p-3">
						<h3 className="font-medium mb-1">Canva</h3>
						<div className="flex justify-between items-center">
							<p className="text-xs text-gray-500">Development</p>
							<p className="text-xs text-blue-500 font-medium">$25.00</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
