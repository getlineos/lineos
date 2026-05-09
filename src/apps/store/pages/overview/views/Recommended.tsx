const recommendations = [
	{
		name: "HBO Max",
		category: "Entertainment",
		price: "GET",
		image: "https://telaviva.com.br/wp-content/uploads/2023/03/hbo-max.jpg",
	},
	{
		name: "Procreate",
		category: "Graphics & Design",
		price: "$12.00",
		image: "https://procreate-assets-cdn.procreate.com/_nuxt/default_en.rxoU7ubg.jpg",
	},
	{
		name: "Canva",
		category: "Design",
		price: "$25.00",
		image:
			"https://static-cse.canva.com/blob/1522769/CC2024PR_Workplaceenterprisecentricfeatures.png",
	},
];

export default function Recommended() {
	return (
		<section className="mb-9">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-2xl font-semibold tracking-normal">
					Recommended for you
				</h2>
				<button className="text-sm font-semibold text-[#0071e3]">Show all</button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{recommendations.map((app) => (
					<div
						key={app.name}
						className="overflow-hidden rounded-[18px] bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(0,0,0,0.09)]"
					>
						<div className="h-36 bg-[#1d1d1f]">
							<img
								src={app.image}
								alt={app.name}
								width={240}
								height={144}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex items-center justify-between gap-3 p-4">
							<div className="min-w-0">
								<h3 className="truncate font-semibold text-[#1d1d1f]">
									{app.name}
								</h3>
								<p className="text-xs text-[#6e6e73]">{app.category}</p>
							</div>
							<button className="shrink-0 rounded-full bg-[#eef5ff] px-4 py-1.5 text-xs font-bold text-[#0071e3]">
								{app.price}
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
