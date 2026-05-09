import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function FeaturedApps() {
	return (
		<section className="mb-9 overflow-hidden rounded-[22px] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
			<div className="relative min-h-[340px]">
				<img
					src="https://clockify.me/blog/wp-content/uploads/2022/12/Best-productivity-apps-for-android-cover.png"
					alt="Vectornator"
					width={800}
					height={300}
					className="absolute inset-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
				<div className="relative flex min-h-[340px] max-w-xl flex-col justify-end p-8">
					<div className="mb-3 flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/85 backdrop-blur-md">
						<Sparkles className="h-3.5 w-3.5" />
						GRAPHICS AND DESIGN
					</div>
					<h2 className="mb-2 text-4xl font-semibold leading-tight text-white">
						Vectornator: Design Software
					</h2>
					<p className="mb-5 text-base leading-6 text-white/82">
						Create designs, interfaces and beautiful illustrations with this
						tool
					</p>
					<Button className="h-9 w-24 rounded-full bg-[#0071e3] text-sm font-semibold text-white hover:bg-[#0077ed]">
						GET
					</Button>
				</div>
			</div>
		</section>
	);
}
