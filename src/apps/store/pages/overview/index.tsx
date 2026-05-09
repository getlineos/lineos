import Ad from "./views/Ad";
import Categories from "./views/Categories";
import Featured from "./views/Featured";
import FeaturedApps from "./views/FeaturedApps";
import Recommended from "./views/Recommended";
import TopApps from "./views/TopApps";
import Trending from "./views/Trending";

export default function OverviewPage() {
	return (
		<div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
			<div className="min-w-0">
				<FeaturedApps />
				<Categories />
				<Recommended />
				<TopApps />
				<Featured />
			</div>
			<div className="min-w-0 space-y-6">
				<Trending />
				<Ad />
			</div>
		</div>
	);
}
