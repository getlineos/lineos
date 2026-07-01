import { useAppSelector } from "@/store/hooks";
import { useGetProfileQuery } from "@/store/slices/profileApi";
import { cn } from "@/utils";
import type { ElementType } from "react";
import {
	ChartNoAxesColumnIncreasing,
	CircleCheckBig,
	CopyCheck,
	CreditCard,
	Download,
	FileText,
	Gamepad2,
	Gift,
	Grid,
	Heart,
	X,
	Monitor,
	Star,
	Users,
	Wrench,
} from "lucide-react";
import { Link, useLocation } from "react-router";

export default function Sidebar() {
	const { user } = useAppSelector((state) => state.auth);
	const { data: profile } = useGetProfileQuery(user?.id ?? 0, {
		skip: !user?.id,
	});
	const isDeveloper = user && profile?.developer_status === "approved";

	return (
		<aside className="flex w-72 shrink-0 flex-col border-r border-black/10 bg-white/65 backdrop-blur-2xl">
			<Link to="/store" className="flex items-center px-5 py-5">
				<span className="text-lg font-semibold text-[#1d1d1f]">App Store</span>
			</Link>

			<nav className="flex-1 px-3 pb-4">
				<div className="space-y-1">
					<div>
						<NavLink to="/store" icon={Star} text="Discover" />
						<NavLink to="/store/arcade" icon={Gamepad2} text="Arcade" />
						<NavLink to="/store/categories" icon={Grid} text="Categories" />
						<NavLink to="#" icon={Download} text="Updates" />
					</div>
					<div>
						<div className="py-3">
							<div className="my-2 h-px bg-black/10" />
							<h3 className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">
								Your Library
							</h3>
						</div>
						<NavLink to="/store/my-apps" icon={CopyCheck} text="My Apps" />
						<NavLink to="#" icon={Heart} text="Wishlist" />
						<NavLink to="#" icon={CreditCard} text="Subscriptions" />
						<NavLink to="#" icon={Gift} text="Gift Cards" />
						<NavLink to="#" icon={Users} text="Family Sharing" />
					</div>
				</div>

				{isDeveloper ? <DevSection /> : null}
			</nav>

			{!isDeveloper ? <PromoSection /> : null}
		</aside>
	);
}

const NavLink = ({
	to,
	icon: Icon,
	text,
}: {
	to: string;
	icon: ElementType;
	text: string;
}) => {
	const location = useLocation();
	const isActive = location.pathname === to;

	return (
		<Link
			to={to}
			className={cn(
				"flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#424245] transition hover:bg-black/5",
				{ "bg-[#0071e3] text-white shadow-sm hover:bg-[#0071e3]": isActive }
			)}
		>
			<Icon className="h-[18px] w-[18px]" />
			<span>{text}</span>
		</Link>
	);
};

const DevSection = () => {
	return (
		<div>
			<div className="py-3">
				<div className="my-2 h-px bg-black/10" />
				<h3 className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">
					Developer
				</h3>
			</div>

			<NavLink to="/store/developer/apps" icon={Monitor} text="My Apps" />
			<NavLink to="/store/publish" icon={Wrench} text="Publish App" />
			<NavLink to="#" icon={ChartNoAxesColumnIncreasing} text="Analytics" />
			<NavLink to="#" icon={CircleCheckBig} text="TestFlight" />
			<NavLink to="#" icon={FileText} text="App Review" />
			<NavLink to="#" icon={CreditCard} text="Payments" />
		</div>
	);
};

const PromoSection = () => {
	return (
		<div className="mx-4 mb-5">
			<div className="relative overflow-hidden rounded-2xl bg-[#1d1d1f] p-4 text-white shadow-sm">
				<div className="absolute inset-x-0 top-0 h-1 bg-[#0071e3]" />
				<button className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white">
					<span className="sr-only">Close</span>
					<X className="h-4 w-4" />
				</button>
				<p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/55">
					Featured offer
				</p>
				<h3 className="mb-1 text-xl font-semibold">Apple Music</h3>
				<p className="mb-4 max-w-44 text-sm leading-5 text-white/70">
					Enjoy one month free with your LineOS account.
				</p>
				<button className="w-full rounded-full bg-white py-2 text-sm font-semibold text-[#0071e3] transition hover:bg-white/90">
					Try Free
				</button>
			</div>
		</div>
	);
};
