export interface Location {
	name: string;
	latitude: number;
	longitude: number;
	country: string;
	admin1?: string;
}

export interface CurrentWeather {
	temperature: number;
	weatherCode: number;
	time: string;
	windSpeed: number;
	windDirection: number;
	apparentTemperature: number;
	precipitation: number;
	humidity: number;
}

export interface DailyForecast {
	time: string[];
	weatherCode: number[];
	temperatureMax: number[];
	temperatureMin: number[];
	precipitationSum: number[];
}

export interface HourlyForecast {
	time: string[];
	temperature: number[];
	weatherCode: number[];
	precipitation: number[];
	windSpeed: number[];
	humidity: number[];
}

export interface WeatherData {
	location: Location;
	current: CurrentWeather;
	daily: DailyForecast;
	hourly: HourlyForecast;
}

export type Units = 'metric' | 'imperial';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type WindSpeedUnit = 'kmh' | 'mph';

export type PrecipitationUnit = 'mm' | 'inch';

export interface UnitSettings {
	temperature: TemperatureUnit;
	windSpeed: WindSpeedUnit;
	precipitation: PrecipitationUnit;
}
