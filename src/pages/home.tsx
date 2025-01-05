import wallpaper from "assets/img/wallpaper.jpg";
import Menubar from "components/Menubar";

export default function Home() {
	return (
		<div
			style={{ background: `url(${wallpaper})` }}
			className="h-screen !bg-no-repeat !bg-cover"
		>
			<Menubar />
		</div>
	);
}
