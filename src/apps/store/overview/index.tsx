import Ad from "./views/Ad";
import Categories from "./views/Categories";
import FeaturedApps from "./views/FeaturedApps";
import TopApps from "./views/TopApps";
import Trending from "./views/Trending";

export default function OverviewPage() {
	return (
		<div className="grid grid-cols-3 gap-6">
			<div className="col-span-2">
				<FeaturedApps />
				<Categories />
				<TopApps />
			</div>
			<div className="col-span-1">
				<Trending />
				<Ad />
			</div>
		</div>
	);
}
