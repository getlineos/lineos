import ControlCenterIcon from "@/assets/img/menu/control-center.png";
import SearchIcon from "@/assets/img/menu/search.png";
import WifiIcon from "@/assets/img/menu/wifi.png";
import useMenubar from "./useMenubar";

export default function Menubar() {
	const { dateTime } = useMenubar();

	return (
		<div>
			<div className="bg-white bg-opacity-10 w-full h-[28px] absolute top-0 flex items-center justify-between px-4 text-[13px]">
				<div className="flex items-center">
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
				<div className="flex items-center gap-4">
					<img src={WifiIcon} alt="wifi" className="w-[16px]" />
					<img src={SearchIcon} alt="search" className="w-[14px]" />
					<img
						src={ControlCenterIcon}
						alt="control-center"
						className="w-[14px]"
					/>
					<div className="pl-1">{dateTime?.format("ddd D MMM h:mm A")}</div>
				</div>
			</div>
			<div className="h-[28px]" />
		</div>
	);
}
