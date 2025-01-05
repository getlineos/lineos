import wallpaper from "assets/img/wallpaper.jpg";
import Menubar from "components/Menubar";
import TodoWidget from "widgets/Todo";
import WeatherWidget from "widgets/Weather";

export default function Home() {
	return (
		<div
			style={{ background: `url(${wallpaper})` }}
			className="h-screen !bg-no-repeat !bg-cover"
		>
			<Menubar />
			<div>
				<TodoWidget />
				<WeatherWidget />
				{/* <ClockWidget /> */}
			</div>
		</div>
	);
}
