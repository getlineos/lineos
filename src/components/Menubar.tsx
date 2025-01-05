import ControlCenterIcon from "assets/img/menu/control-center.png";
import SearchIcon from "assets/img/menu/search.png";
import WifiIcon from "assets/img/menu/wifi.png";

export default function Menubar() {
	return (
		<div className="bg-white bg-opacity-10 w-full h-[28px] absolute top-0 flex items-center justify-between px-4">
			<div className="flex items-center text-sm">
				<h3 className="font-semibold">Finder</h3>
				<ul className="flex items-center gap-3.5 ml-6">
					<li>File</li>
					<li>Edit</li>
					<li>View</li>
					<li>Go</li>
					<li>Window</li>
					<li>Help</li>
				</ul>
			</div>
			<div className="flex items-center gap-3 text-sm">
				<img src={ControlCenterIcon} alt="control-center" />
				<img src={SearchIcon} alt="search" />
				<img src={WifiIcon} alt="wifi" />
				<div className="pl-1">Sun 5 Jan 2:27 PM</div>
			</div>
		</div>
	);
}
