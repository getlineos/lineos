import { cn } from "@/utils";
import dayjs from "dayjs";
import useWeather from "./useWeather";

export default function WeatherWidget() {
	const { weatherData, forecastData, getLocation, hasPermission, message } =
		useWeather();

	const next6Hours = forecastData?.list.slice(0, 6) || [];
	const isLg = window.innerHeight > 900;

	return (
		<div>
			<div
				className={cn(
					"flex flex-col gap-3 justify-between p-4 rounded-t-xl bg-gradient-to-b text-white select-none from-gray-900 to-gray-600 w-[400px]",
					isLg ? "min-h-[224px]" : "min-h-[200px]",
					hasPermission && "rounded-b-xl"
				)}
			>
				<div className="flex justify-between items-center">
					<div>
						<p className="m-0">{weatherData?.name}</p>
						<p className="text-5xl m-0">
							{Math.round(weatherData?.main.temp || 0)}°
						</p>
					</div>
					<div className="text-right text-sm md:text-base">
						<img
							src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
							alt="weather icon"
							className="w-12 h-12 ml-auto"
						/>
						<p className="m-0 mt-2 leading-tight font-medium text-sm capitalize">
							{weatherData?.weather[0].description}
						</p>
						<p className="m-0 leading-tight font-medium text-sm">
							H:{Math.round(weatherData?.main.temp_max || 0)}° L:
							{Math.round(weatherData?.main.temp_min || 0)}°
						</p>
					</div>
				</div>
				<div className="flex justify-between w-full">
					{next6Hours.map((hour, index) => {
						const time = dayjs(hour.dt * 1000).format("hA");

						return (
							<div key={index} className="flex flex-col m-0 items-center">
								<p className="text-xs md:text-sm mb-0 opacity-75">{time}</p>
								<img
									src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
									alt="weather icon"
									className="w-8 h-8"
								/>
								<p className="text-sm md:text-base m-0 font-medium">
									{Math.round(hour.main.temp)}°
								</p>
							</div>
						);
					})}
				</div>
			</div>
			{message ? (
				<div
					className={cn(
						"h-[20px] cursor-pointer bg-white rounded-b-2xl flex items-center justify-center",
						{
							"bg-red-500 text-white": message.type === "error",
							"bg-blue-500 text-white": message.type === "info",
						}
					)}
					onClick={getLocation}
				>
					<p className="text-xs">{message.text}</p>
				</div>
			) : null}
		</div>
	);
}
