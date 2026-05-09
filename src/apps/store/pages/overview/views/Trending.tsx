import { FileStack, MessageCircle, Phone, Trophy } from "lucide-react";

const trendingApps = [
	{
		name: "Telegram",
		category: "Social networks",
		icon: MessageCircle,
		tint: "bg-[#eef5ff] text-[#0071e3]",
	},
	{
		name: "WhatsApp Desktop",
		category: "Trending",
		icon: Phone,
		tint: "bg-[#eaf8ef] text-[#248a3d]",
	},
	{
		name: "Machinarium",
		category: "Adventure game",
		icon: Trophy,
		tint: "bg-[#fff4e8] text-[#bf5b00]",
	},
	{
		name: "Microsoft Word",
		category: "Text editor",
		icon: FileStack,
		tint: "bg-[#edf2ff] text-[#3157d5]",
	},
];

export default function Trending() {
	return (
		<section className="rounded-[20px] bg-white p-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-lg font-semibold">Trending</h2>
				<button className="text-sm font-semibold text-[#0071e3]">Show all</button>
			</div>

			<div className="divide-y divide-black/[0.06]">
				{trendingApps.map(({ name, category, icon: Icon, tint }) => (
					<div key={name} className="flex items-center gap-3 py-3 first:pt-0">
						<div
							className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] ${tint}`}
						>
							<Icon className="h-5 w-5" />
						</div>
						<div className="min-w-0 flex-1">
							<h3 className="truncate text-sm font-semibold text-[#1d1d1f]">
								{name}
							</h3>
							<p className="truncate text-xs text-[#6e6e73]">{category}</p>
						</div>
						<button className="rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-bold text-[#0071e3]">
							GET
						</button>
					</div>
				))}
			</div>
		</section>
	);
}
