import { Button } from "@/components/ui/button";

export default function FeaturedApps() {
	return (
		<div className="relative rounded-xl overflow-hidden mb-8">
			<div className="relative">
				<img
					src="https://clockify.me/blog/wp-content/uploads/2022/12/Best-productivity-apps-for-android-cover.png"
					alt="Vectornator"
					width={800}
					height={300}
					className="w-full h-60 object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
					<div className="text-xs font-medium text-blue-400 mb-1">
						GRAPHICS AND DESIGN
					</div>
					<h2 className="text-2xl font-bold text-white mb-1">
						Vectornator: Design Software
					</h2>
					<p className="text-white/80 text-sm mb-4">
						Create designs, interfaces and beautiful illustrations with this
						tool
					</p>
					<Button className="w-24 bg-blue-500 hover:bg-blue-600 text-white">
						Download
					</Button>
				</div>
			</div>
		</div>
	);
}
