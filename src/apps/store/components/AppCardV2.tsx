import { Star } from "lucide-react";
import { Link } from "react-router";

interface AppCardProps {
	id: string | number;
	name: string;
	icon: string;
	category: string;
	rating: number;
	index?: number;
	showRank?: boolean;
}

export function AppCardV2({
	id,
	name,
	icon,
	category,
	rating,
	index,
	showRank = false,
}: AppCardProps) {
	return (
		<Link
			to={`/store/app/${id}`}
			className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-black/[0.035]"
		>
			<div className="relative shrink-0">
				<img
					src={icon || "/placeholder.svg"}
					alt={name}
					width={64}
					height={64}
					className="h-14 w-14 rounded-[14px] object-cover shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
				/>
				{showRank && index !== undefined && (
					<div className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1d1d1f] text-xs font-bold text-white shadow-sm">
						{index + 1}
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<h3 className="truncate text-sm font-semibold text-[#1d1d1f]">{name}</h3>
				<p className="truncate text-xs text-[#6e6e73]">{category}</p>
				<div className="mt-1 flex items-center">
					<Star className="h-3 w-3 fill-[#ffcc00] text-[#ffcc00]" />
					<span className="ml-1 text-xs text-[#6e6e73]">{rating}</span>
				</div>
			</div>
			<span className="rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-bold text-[#0071e3]">
				GET
			</span>
		</Link>
	);
}
