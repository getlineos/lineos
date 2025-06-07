import DesktopColumn from "./components/DesktopColumn";

export default function Home() {
	// const isLg = window.innerHeight > 900;

	return (
		<div>
			<div className="flex justify-between">
				<div className="m-5 flex flex-col gap-3">
					{/* {isLg && <TodoWidget />}
					<WeatherWidget />
					<div className="flex gap-3">
						<ClockWidget />
						<CalendarWidget />
					</div> */}
				</div>
				<div className="m-5">
					<DesktopColumn />
				</div>
			</div>
		</div>
	);
}
