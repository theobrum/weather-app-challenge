<script lang="ts">
	import type { CurrentWeather as CurrentWeatherType, Location } from '$lib/types/weather';
	import { formatDate } from '$lib/utils/formatters';
	import iconSunny from '$lib/assets/images/icon-sunny.webp';
	import iconPartlyCloudy from '$lib/assets/images/icon-partly-cloudy.webp';
	import iconOvercast from '$lib/assets/images/icon-overcast.webp';
	import iconFog from '$lib/assets/images/icon-fog.webp';
	import iconDrizzle from '$lib/assets/images/icon-drizzle.webp';
	import iconRain from '$lib/assets/images/icon-rain.webp';
	import iconSnow from '$lib/assets/images/icon-snow.webp';
	import iconStorm from '$lib/assets/images/icon-storm.webp';
	import bgLarge from '$lib/assets/images/bg-today-large.svg';
	
	let {
		current,
		location,
		temperatureUnit
	}: {
		current: CurrentWeatherType;
		location: Location;
		temperatureUnit: 'celsius' | 'fahrenheit';
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
	
	let weatherIcon = $derived(getWeatherIcon(current.weatherCode));
	let formattedDate = $derived(formatDate(current.time));
	let tempSymbol = $derived(temperatureUnit === 'celsius' ? '°C' : '°F');
</script>

<div 
	class="relative overflow-hidden rounded-2xl p-6 sm:py-20 sm:px-6 text-white"
	style="background: linear-gradient(135deg, hsl(233, 67%, 56%) 0%, hsl(248, 70%, 36%) 100%);"
>
	<img 
		src={bgLarge} 
		alt="" 
		class="absolute inset-0 w-full h-full object-cover opacity-20"
	/>
	
	<div class="relative z-10">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
			<div class="text-center sm:text-left mb-6 sm:mb-0">
				<h2 class="text-xl sm:text-2xl font-semibold mb-1">
					{location.name}, {location.country}
				</h2>
				<p class="text-neutral-200">{formattedDate}</p>
			</div>
			
			<div class="flex justify-center sm:justify-end">
				<div class="flex items-center gap-4 sm:gap-6">
					<img src={weatherIcon} alt="" class="w-20 sm:w-24 h-20 sm:h-auto" />
					<div class="text-5xl sm:text-8xl font-display font-bold">
						{Math.round(current.temperature)}{tempSymbol}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>