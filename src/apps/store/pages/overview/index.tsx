import Ad from "./views/Ad";
import Categories from "./views/Categories";
import Featured from "./views/Featured";
import FeaturedApps from "./views/FeaturedApps";
import Recommended from "./views/Recommended";
import TopApps from "./views/TopApps";
import Trending from "./views/Trending";

export default function OverviewPage() {
	return (
		<div className="grid grid-cols-3 gap-6">
			<div className="col-span-2">
				<FeaturedApps />
				<Categories />
				<Recommended />
				<TopApps />
				<Featured />
			</div>
			<div className="col-span-1">
				<Trending />
				<Ad />
			</div>
		</div>
	);
}
