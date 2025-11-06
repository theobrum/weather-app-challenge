<script lang="ts">
	import type { CurrentWeather } from '$lib/types/weather';
	import { formatTemperature, formatWindSpeed, formatPrecipitation, formatHumidity } from '$lib/utils/formatters';
	
	let {
		current,
		windSpeedUnit,
		precipitationUnit
	}: {
		current: CurrentWeather;
		windSpeedUnit: 'kmh' | 'mph';
		precipitationUnit: 'mm' | 'inch';
	} = $props();
	
	let windUnit = $derived(windSpeedUnit === 'kmh' ? 'km/h' : 'mph');
	let precipUnit = $derived(precipitationUnit === 'mm' ? 'mm' : 'in');
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
	<div class="bg-neutral-700 rounded-xl p-6">
		<p class="text-neutral-300 text-sm mb-2">Feels Like</p>
		<p class="text-2xl font-semibold">{formatTemperature(current.apparentTemperature)}</p>
	</div>
	
	<div class="bg-neutral-700 rounded-xl p-6">
		<p class="text-neutral-300 text-sm mb-2">Humidity</p>
		<p class="text-2xl font-semibold">{formatHumidity(current.humidity)}</p>
	</div>
	
	<div class="bg-neutral-700 rounded-xl p-6">
		<p class="text-neutral-300 text-sm mb-2">Wind</p>
		<p class="text-2xl font-semibold">{formatWindSpeed(current.windSpeed, windUnit)}</p>
	</div>
	
	<div class="bg-neutral-700 rounded-xl p-6">
		<p class="text-neutral-300 text-sm mb-2">Precipitation</p>
		<p class="text-2xl font-semibold">{formatPrecipitation(current.precipitation, precipUnit)}</p>
	</div>
</div>