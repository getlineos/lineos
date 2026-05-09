import { BriefcaseBusiness, Code2, Gamepad2, PenTool } from "lucide-react";

const categories = [
	{ name: "Games", icon: Gamepad2, tint: "bg-[#eef5ff] text-[#0071e3]" },
	{ name: "Creation", icon: PenTool, tint: "bg-[#f6f0ff] text-[#7d4cff]" },
	{ name: "Development", icon: Code2, tint: "bg-[#eaf8ef] text-[#248a3d]" },
	{ name: "Work", icon: BriefcaseBusiness, tint: "bg-[#fff4e8] text-[#bf5b00]" },
];

export default function Categories() {
	return (
		<section className="mb-9">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-2xl font-semibold tracking-normal">Categories</h2>
				<button className="text-sm font-semibold text-[#0071e3]">Show all</button>
			</div>

			<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
				{categories.map(({ name, icon: Icon, tint }) => (
					<button
						key={name}
						className="flex items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]"
					>
						<span
							className={`flex h-11 w-11 items-center justify-center rounded-[12px] ${tint}`}
						>
							<Icon className="h-5 w-5" />
						</span>
						<span className="text-sm font-semibold text-[#1d1d1f]">{name}</span>
					</button>
				))}
			</div>
		</section>
	);
}
