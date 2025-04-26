import { cn } from "@/utils";
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
	Monitor,
	Star,
	Users,
	Wrench,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAppSelector } from "@/store/hooks";

export default function Sidebar() {
	const appStore = useAppSelector((state) => state.appStore);
	const isDeveloper = appStore.settings.developer.isDeveloper;

	return (
		<div className="w-64 bg-white border-r border-gray-200">
			<Link to="/store" className="p-4 flex items-center gap-2">
				<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
					<span className="text-white text-xl font-bold">A</span>
				</div>
				<span className="font-semibold text-lg">App Store</span>
			</Link>

			<nav className="mt-4 px-2">
				<div className="space-y-1">
					<div>
						<NavLink to="/store" icon={Star} text="Discover" />
						<NavLink to="/store/arcade" icon={Gamepad2} text="Arcade" />
						<NavLink to="/store/categories" icon={Grid} text="Categories" />
						<NavLink to="#" icon={Download} text="Updates" />
					</div>
					<div>
						<div className="py-2">
							<div className="h-px bg-gray-200 my-2"></div>
							<h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
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
		</div>
	);
}

const NavLink = ({
	to,
	icon: Icon,
	text,
}: {
	to: string;
	icon: React.ElementType;
	text: string;
}) => {
	const location = useLocation();
	const isActive = location.pathname === to;

	return (
		<Link
			to={to}
			className={cn(
				"w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100",
				{ "bg-blue-500 hover:bg-blue-600 text-white": isActive }
			)}
		>
			<Icon className="h-5 w-5" />
			<span>{text}</span>
		</Link>
	);
};

const DevSection = () => {
	return (
		<div>
			<div className="py-2">
				<div className="h-px bg-gray-200 my-2"></div>
				<h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
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
		<div className="mx-4 mt-4 mb-4">
			<div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
				<button className="absolute top-2 right-2 text-white/80 hover:text-white">
					<span className="sr-only">Close</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
				<h3 className="text-xl font-bold mb-1">1 Month</h3>
				<h3 className="text-xl font-bold mb-1">Apple Music</h3>
				<p className="text-lg font-medium mb-1">subscribe</p>
				<p className="text-lg font-medium mb-4">for Free</p>
				<button className="w-full bg-white text-purple-700 rounded-full py-2 font-medium text-sm">
					Get Subscribe
				</button>
			</div>
		</div>
	);
};
