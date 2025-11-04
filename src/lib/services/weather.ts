import type {
	WeatherData,
	CurrentWeather,
	DailyForecast,
	HourlyForecast,
	Location
} from '$lib/types/weather';

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

interface WeatherParams {
	latitude: number;
	longitude: number;
	temperatureUnit?: 'celsius' | 'fahrenheit';
	windSpeedUnit?: 'kmh' | 'mph';
	precipitationUnit?: 'mm' | 'inch';
}

export async function getWeatherData(
	params: WeatherParams,
	location: Location
): Promise<WeatherData> {
	const urlParams = new URLSearchParams({
		latitude: params.latitude.toString(),
		longitude: params.longitude.toString(),
		current: [
			'temperature_2m',
			'relative_humidity_2m',
			'apparent_temperature',
			'precipitation',
			'weather_code',
			'wind_speed_10m',
			'wind_direction_10m'
		].join(','),
		hourly: [
			'temperature_2m',
			'weather_code',
			'precipitation',
			'wind_speed_10m',
			'relative_humidity_2m'
		].join(','),
		daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'precipitation_sum'].join(
			','
		),
		temperature_unit: params.temperatureUnit || 'celsius',
		wind_speed_unit: params.windSpeedUnit || 'kmh',
		precipitation_unit: params.precipitationUnit || 'mm',
		timezone: 'auto',
		forecast_days: '7'
	});

	const response = await fetch(`${WEATHER_API}?${urlParams}`);

	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
	}

	const data = await response.json();

	const current: CurrentWeather = {
		temperature: data.current.temperature_2m,
		weatherCode: data.current.weather_code,
		time: data.current.time,
		windSpeed: data.current.wind_speed_10m,
		windDirection: data.current.wind_direction_10m,
		apparentTemperature: data.current.apparent_temperature,
		precipitation: data.current.precipitation,
		humidity: data.current.relative_humidity_2m
	};

	const daily: DailyForecast = {
		time: data.daily.time,
		weatherCode: data.daily.weather_code,
		temperatureMax: data.daily.temperature_2m_max,
		temperatureMin: data.daily.temperature_2m_min,
		precipitationSum: data.daily.precipitation_sum
	};

	const hourly: HourlyForecast = {
		time: data.hourly.time,
		temperature: data.hourly.temperature_2m,
		weatherCode: data.hourly.weather_code,
		precipitation: data.hourly.precipitation,
		windSpeed: data.hourly.wind_speed_10m,
		humidity: data.hourly.relative_humidity_2m
	};

	return {
		location,
		current,
		daily,
		hourly
	};
}
