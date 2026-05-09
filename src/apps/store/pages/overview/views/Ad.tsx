export default function Ad() {
	return (
		<section className="overflow-hidden rounded-[20px] bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
			<div className="h-48 bg-[#fff4e8]">
				<img
					src="https://m.media-amazon.com/images/I/91gncdmS6CL.png"
					alt="Bring You Home"
					width={384}
					height={192}
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="p-4">
				<p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#86868b]">
					Game spotlight
				</p>
				<h3 className="mb-1 text-xl font-semibold">Bring You Home</h3>
				<p className="mb-4 text-sm text-[#6e6e73]">Puzzle Game</p>
				<button className="w-full rounded-full bg-[#0071e3] py-2 text-sm font-semibold text-white transition hover:bg-[#0077ed]">
					$21.50
				</button>
			</div>
		</section>
	);
}
