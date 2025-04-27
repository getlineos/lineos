import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WeatherData {
	name: string;
	main: {
		temp: number;
		temp_max: number;
		temp_min: number;
	};
	weather: {
		description: string;
		icon: string;
	}[];
}

interface HourlyForecast {
	dt: number;
	main: {
		temp: number;
	};
	weather: {
		icon: string;
	}[];
}

interface ForecastResponse {
	list: HourlyForecast[];
}

export const weatherApi = createApi({
	reducerPath: "weatherApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.openweathermap.org/data/2.5/",
	}),
	endpoints: (builder) => ({
		getCurrentWeather: builder.query<WeatherData, { lat: number; lon: number }>(
			{
				query: ({ lat, lon }) => ({
					url: "weather",
					params: {
						lat,
						lon,
						units: "metric",
						appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
					},
				}),
			}
		),
		getHourlyForecast: builder.query<
			ForecastResponse,
			{ lat: number; lon: number }
		>({
			query: ({ lat, lon }) => ({
				url: "forecast",
				params: {
					lat,
					lon,
					units: "metric",
					appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
				},
			}),
		}),
	}),
});

export const { useGetCurrentWeatherQuery, useGetHourlyForecastQuery } =
	weatherApi;
