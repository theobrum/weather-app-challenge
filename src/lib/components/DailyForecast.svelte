<script lang="ts">
	import type { DailyForecast as DailyForecastType } from '$lib/types/weather';
	import { formatDayOfWeek, formatTemperature } from '$lib/utils/formatters';
	import iconSunny from '$lib/assets/images/icon-sunny.webp';
	import iconPartlyCloudy from '$lib/assets/images/icon-partly-cloudy.webp';
	import iconOvercast from '$lib/assets/images/icon-overcast.webp';
	import iconFog from '$lib/assets/images/icon-fog.webp';
	import iconDrizzle from '$lib/assets/images/icon-drizzle.webp';
	import iconRain from '$lib/assets/images/icon-rain.webp';
	import iconSnow from '$lib/assets/images/icon-snow.webp';
	import iconStorm from '$lib/assets/images/icon-storm.webp';
	
	let {
		daily
	}: {
		daily: DailyForecastType;
	} = $props();
	
	function getWeatherIcon(code: number): string {
		if (code === 0 || code === 1) return iconSunny;
		if (code === 2) return iconPartlyCloudy;
		if (code === 3) return iconOvercast;
		if (code === 45 || code === 48) return iconFog;
		if (code >= 51 && code <= 57) return iconDrizzle;
		if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return iconRain;
		if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return iconSnow;
		if (code >= 95) return iconStorm;
		return iconSunny;
	}
	
	let days = $derived(
		daily.time.map((time, index) => ({
			day: formatDayOfWeek(time),
			icon: getWeatherIcon(daily.weatherCode[index]),
			tempMax: Math.round(daily.temperatureMax[index]),
			tempMin: Math.round(daily.temperatureMin[index])
		}))
	);
</script>

<div>
	<h3 class="text-xl font-semibold mb-4">Daily forecast</h3>
	
	<div class="grid grid-cols-3 md:grid-cols-7 gap-4">
		{#each days as day}
			<div class="bg-neutral-700 rounded-xl p-4 flex flex-col items-center">
				<p class="font-medium mb-3">{day.day}</p>
				<img src={day.icon} alt="" class="w-12 h-12 mb-3" />
				<div class="flex items-center justify-between w-full gap-2 text-sm">
					<span class="font-semibold">{day.tempMax}°</span>
					<span class="text-neutral-300 text-right">{day.tempMin}°</span>
				</div>
			</div>
		{/each}
	</div>
</div>