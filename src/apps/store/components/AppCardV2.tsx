import { Star } from "lucide-react";
import { Link } from "react-router";

interface AppCardProps {
	id: string;
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
			to={`/app/${id}`}
			className="group flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
		>
			<div className="relative flex-shrink-0">
				<img
					src={icon || "/placeholder.svg"}
					alt={name}
					width={64}
					height={64}
					className="rounded-xl"
				/>
				{showRank && index !== undefined && (
					<div className="absolute -top-2 -left-2 bg-[#18181b] text-primary-foreground text-snow w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
						{index + 1}
					</div>
				)}
			</div>
			<div className="flex-grow min-w-0">
				<h3 className="font-medium truncate">{name}</h3>
				<p className="text-sm text-muted-foreground">{category}</p>
				<div className="flex items-center mt-1">
					<Star className="h-3 w-3 fill-primary text-primary" />
					<span className="text-xs ml-1">{rating}</span>
				</div>
			</div>
		</Link>
	);
}
