<script lang="ts">
	import type { HourlyForecast as HourlyForecastType } from '$lib/types/weather';
	import { formatHour } from '$lib/utils/formatters';
	import iconDropdown from '$lib/assets/images/icon-dropdown.svg';
	import iconSunny from '$lib/assets/images/icon-sunny.webp';
	import iconPartlyCloudy from '$lib/assets/images/icon-partly-cloudy.webp';
	import iconOvercast from '$lib/assets/images/icon-overcast.webp';
	import iconFog from '$lib/assets/images/icon-fog.webp';
	import iconDrizzle from '$lib/assets/images/icon-drizzle.webp';
	import iconRain from '$lib/assets/images/icon-rain.webp';
	import iconSnow from '$lib/assets/images/icon-snow.webp';
	import iconStorm from '$lib/assets/images/icon-storm.webp';
	
	let {
		hourly
	}: {
		hourly: HourlyForecastType;
	} = $props();
	
	let selectedDayIndex = $state(0);
	let isDropdownOpen = $state(false);
	let dropdownRef: HTMLDivElement;
	
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
	
	function toggleDropdown(e: MouseEvent) {
		e.stopPropagation();
		isDropdownOpen = !isDropdownOpen;
	}
	
	function handleWindowClick(e: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
			isDropdownOpen = false;
		}
	}
	
	function selectDay(index: number) {
		selectedDayIndex = index;
		isDropdownOpen = false;
	}
	
	let dayGroups = $derived.by(() => {
		const groups: { date: string; hours: Array<{ time: string; temp: number; icon: string }> }[] = [];
		const daysMap = new Map<string, Array<{ time: string; temp: number; icon: string }>>();
		
		hourly.time.forEach((time, index) => {
			const date = time.split('T')[0];
			const hour = formatHour(time);
			
			if (!daysMap.has(date)) {
				daysMap.set(date, []);
			}
			
			daysMap.get(date)!.push({
				time: hour,
				temp: Math.round(hourly.temperature[index]),
				icon: getWeatherIcon(hourly.weatherCode[index])
			});
		});
		
		daysMap.forEach((hours, date) => {
			groups.push({ date, hours });
		});
		
		return groups;
	});
	
	let availableDays = $derived.by(() => {
		return dayGroups.map((group, index) => {
			const date = new Date(group.date);
			return {
				index,
				label: date.toLocaleDateString('en-US', { weekday: 'long' }),
				date: group.date
			};
		});
	});
	
	let selectedDayHours = $derived.by(() => {
		return dayGroups[selectedDayIndex]?.hours || [];
	});
	
	let selectedDayLabel = $derived.by(() => {
		return availableDays[selectedDayIndex]?.label || 'Monday';
	});
</script>

<svelte:window onclick={handleWindowClick} />

<div class="bg-neutral-800 rounded-xl p-6 flex flex-col h-full">
	<div class="flex items-center justify-between mb-6">
		<h3 class="text-xl font-semibold">Hourly forecast</h3>
		
		<div class="relative" bind:this={dropdownRef}>
			<button
				onclick={toggleDropdown}
				class="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 
					   rounded-lg transition-colors"
			>
				<span>{selectedDayLabel}</span>
				<img 
					src={iconDropdown} 
					alt="" 
					class="w-4 h-4 transition-transform"
					class:rotate-180={isDropdownOpen}
				/>
			</button>
			
			{#if isDropdownOpen}
				<div class="absolute right-0 mt-2 w-48 bg-neutral-700 rounded-lg shadow-xl z-50 overflow-hidden">
					{#each availableDays as day}
						<button
							onclick={() => selectDay(day.index)}
							class="w-full px-4 py-3 text-left hover:bg-neutral-600 transition-colors
								   focus:outline-none focus:bg-neutral-600"
							class:bg-neutral-600={selectedDayIndex === day.index}
						>
							{day.label}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	
	<div class="flex-1 overflow-y-auto space-y-3">
		{#each selectedDayHours as hour}
			<div class="flex items-center gap-4 py-3 px-4 bg-neutral-700 rounded-lg">
				<img src={hour.icon} alt="" class="w-10 h-10 shrink-0" />
				<span class="text-neutral-300 flex-1">{hour.time}</span>
				<span class="font-semibold text-lg">{hour.temp}°</span>
			</div>
		{/each}
	</div>
</div>