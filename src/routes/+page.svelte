<script lang="ts">
	import CurrentWeather from '$lib/components/CurrentWeather.svelte';
	import WeatherMetrics from '$lib/components/WeatherMetrics.svelte';
	import DailyForecast from '$lib/components/DailyForecast.svelte';
	import HourlyForecast from '$lib/components/HourlyForecast.svelte';
	import type { 
		CurrentWeather as CurrentWeatherType, 
		DailyForecast as DailyForecastType,
		HourlyForecast as HourlyForecastType,
		Location 
	} from '$lib/types/weather';
	
	const mockLocation: Location = {
		name: 'Berlin',
		latitude: 52.52,
		longitude: 13.41,
		country: 'Germany'
	};
	
	const mockCurrent: CurrentWeatherType = {
		temperature: 20,
		weatherCode: 1,
		time: '2025-08-05T15:00',
		windSpeed: 14,
		windDirection: 180,
		apparentTemperature: 18,
		precipitation: 0,
		humidity: 46
	};
	
	const mockDaily: DailyForecastType = {
		time: ['2025-08-05', '2025-08-06', '2025-08-07', '2025-08-08', '2025-08-09', '2025-08-10', '2025-08-11'],
		weatherCode: [1, 3, 0, 2, 61, 3, 95],
		temperatureMax: [20, 21, 24, 25, 21, 25, 24],
		temperatureMin: [14, 15, 14, 13, 15, 16, 15],
		precipitationSum: [0, 0, 0, 0.3, 1.2, 0, 0]
	};
	
	function generateMockHourly(): HourlyForecastType {
		const hours = 168;
		const time: string[] = [];
		const temperature: number[] = [];
		const weatherCode: number[] = [];
		const precipitation: number[] = [];
		const windSpeed: number[] = [];
		const humidity: number[] = [];
		
		const startDate = new Date('2025-08-05T00:00:00');
		
		for (let i = 0; i < hours; i++) {
			const date = new Date(startDate.getTime() + i * 60 * 60 * 1000);
			time.push(date.toISOString().slice(0, 16));
			temperature.push(Math.round(15 + Math.random() * 10));
			weatherCode.push([0, 1, 2, 3, 61][Math.floor(Math.random() * 5)]);
			precipitation.push(Math.random() * 2);
			windSpeed.push(Math.round(10 + Math.random() * 15));
			humidity.push(Math.round(40 + Math.random() * 40));
		}
		
		return { time, temperature, weatherCode, precipitation, windSpeed, humidity };
	}
	
	const mockHourly = generateMockHourly();
</script>

<div class="min-h-screen p-8">
	<div class="max-w-6xl mx-auto space-y-8">
		<h1 class="text-3xl font-display font-bold text-center mb-8">
			Weather Components Test
		</h1>
		
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<div class="lg:col-span-2 space-y-8">
				<CurrentWeather 
					current={mockCurrent} 
					location={mockLocation}
					temperatureUnit="celsius"
				/>
				
				<WeatherMetrics 
					current={mockCurrent}
					windSpeedUnit="kmh"
					precipitationUnit="mm"
				/>
				
				<DailyForecast daily={mockDaily} />
			</div>
			
			<div class="lg:col-span-1">
				<HourlyForecast hourly={mockHourly} />
			</div>
		</div>
	</div>
</div>