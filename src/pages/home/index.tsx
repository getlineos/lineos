import wallpaper from "assets/img/wallpaper.jpg";
import Menubar from "components/Menubar";
import TodoWidget from "widgets/Todo";
import WeatherWidget from "widgets/Weather";
import DesktopColumn from "./components/DesktopColumn";

export default function Home() {
	return (
		<div
			style={{ background: `url(${wallpaper})` }}
			className="h-screen !bg-no-repeat !bg-cover"
		>
			<Menubar />
			<div className="flex justify-between">
				<div className="m-5 flex flex-col gap-5">
					<TodoWidget />
					<WeatherWidget />
					{/* <ClockWidget /> */}
				</div>
				<div className="m-5">
					<DesktopColumn />
				</div>
			</div>
		</div>
	);
}
