import {
	useGetCurrentWeatherQuery,
	useGetHourlyForecastQuery,
} from "@/store/apis/weatherApi";
import { useEffect, useState } from "react";

type CoordsT = {
	lat: number;
	lon: number;
} | null;

type MessageT = {
	text: string;
	type: "error" | "info";
} | null;

const initialCoords = {
	lat: 40.7128,
	lon: -74.006,
};

export default function useWeather() {
	const [coords, setCoords] = useState<CoordsT>(initialCoords);
	const [hasPermission, setHasPermission] = useState(false);
	const [message, setMessage] = useState<MessageT>(null);
	const { data: weatherData } = useGetCurrentWeatherQuery(coords!, {
		skip: !coords,
	});

	const { data: forecastData } = useGetHourlyForecastQuery(coords!, {
		skip: !coords,
	});

	useEffect(() => {
		if (navigator.permissions) {
			navigator.permissions
				.query({ name: "geolocation" })
				.then((permissionStatus) => {
					const isPermissionGranted = permissionStatus.state === "granted";
					setHasPermission(isPermissionGranted);

					if (isPermissionGranted) {
						getLocation();
					} else {
						setMessage({
							text: "Enable location to see accurate weather data",
							type: "info",
						});
					}
				});
		}
	}, []);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCoords({
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					});
					setMessage(null);
					setHasPermission(true);
				},
				(error) => {
					setMessage({
						text: "Enable location access to get weather data",
						type: "error",
					});
					console.error(error);
				}
			);
		} else {
			setMessage({
				text: "Geolocation is not supported by your browser",
				type: "error",
			});
		}
	};

	return {
		weatherData,
		forecastData,
		getLocation,
		hasPermission,
		message,
	};
}
