import dayjs from "dayjs";
import { useState, useEffect } from "react";
import {
	useGetCurrentWeatherQuery,
	useGetHourlyForecastQuery,
} from "../../store/weatherApi";

type CoordsT = {
	lat: number;
	lon: number;
} | null;

export default function WeatherWidget() {
	const [coords, setCoords] = useState<CoordsT>(null);
	const [error, setError] = useState<string | null>(null);
	const [isCheckingPermission, setIsCheckingPermission] = useState(true);
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);

	const { data: weatherData, isLoading: isWeatherLoading } =
		useGetCurrentWeatherQuery(coords!, { skip: !coords });

	const { data: forecastData, isLoading: isForecastLoading } =
		useGetHourlyForecastQuery(coords!, { skip: !coords });

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCoords({
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					});
					setError(null);
				},
				(error) => {
					setError("Please enable location access to get weather data");
					console.error(error);
				}
			);
		} else {
			setError("Geolocation is not supported by your browser");
		}
	};

	useEffect(() => {
		if (navigator.permissions) {
			navigator.permissions
				.query({ name: "geolocation" })
				.then((permissionStatus) => {
					setHasPermission(permissionStatus.state === "granted");
					if (permissionStatus.state === "granted") {
						getLocation();
					}
					setIsCheckingPermission(false);
				});
		} else {
			setIsCheckingPermission(false);
		}
	}, []);

	const loading = isWeatherLoading || isForecastLoading;

	if (isCheckingPermission) {
		return (
			<div className="flex flex-col justify-center rounded-xl p-4 bg-gradient-to-b text-white cursor-pointer transform transition-transform duration-300 ease-in-out active:scale-105 focus:scale-105 hover:scale-105 select-none from-gray-900 to-gray-600 w-[400px] min-h-[223px]">
				<div className="flex justify-center items-center h-32">
					<p className="text-sm">Checking location permission...</p>
				</div>
			</div>
		);
	}

	if (!coords && hasPermission === false) {
		return (
			<div className="flex flex-col justify-center rounded-xl p-4 bg-gradient-to-b text-white cursor-pointer transform transition-transform duration-300 ease-in-out active:scale-105 focus:scale-105 hover:scale-105 select-none from-gray-900 to-gray-600 w-[400px] min-h-[223px]">
				<div className="flex flex-col justify-center items-center h-32 gap-3">
					<p className="text-center text-sm">
						Enable location to see weather data
					</p>
					<button
						onClick={getLocation}
						className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 rounded transition-colors text-sm"
					>
						Enable Location
					</button>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="flex flex-col justify-center rounded-xl p-4 bg-gradient-to-b text-white cursor-pointer transform transition-transform duration-300 ease-in-out active:scale-105 focus:scale-105 hover:scale-105 select-none from-gray-900 to-gray-600 w-[400px] min-h-[223px]">
				<div className="flex justify-center items-center h-32">
					<p className="text-sm">Loading weather data...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col justify-center rounded-xl p-4 bg-gradient-to-b text-white cursor-pointer transform transition-transform duration-300 ease-in-out active:scale-105 focus:scale-105 hover:scale-105 select-none from-gray-900 to-gray-600 w-[400px] min-h-[223px]">
				<div className="flex flex-col justify-center items-center h-32 gap-4">
					<p className="text-red-400">{error}</p>
					<button
						onClick={getLocation}
						className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 rounded transition-colors text-sm"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	const next6Hours = forecastData?.list.slice(0, 6) || [];

	return (
		<div className="flex flex-col justify-between rounded-xl p-4 bg-gradient-to-b text-white cursor-pointer transform transition-transform duration-300 ease-in-out active:scale-105 focus:scale-105 hover:scale-105 select-none from-gray-900 to-gray-600 w-[400px]">
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
			<div className="flex justify-between w-full mt-2 md:mt-6">
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
	);
}
