<script lang="ts">
	import iconUnits from '$lib/assets/images/icon-units.svg';
	import iconDropdown from '$lib/assets/images/icon-dropdown.svg';
	import iconCheckmark from '$lib/assets/images/icon-checkmark.svg';
	import type { UnitSettings } from '$lib/types/weather';
	
	let { 
		units = $bindable({
			temperature: 'celsius',
			windSpeed: 'kmh',
			precipitation: 'mm'
		}),
		onChange
	}: { 
		units?: UnitSettings;
		onChange?: (units: UnitSettings) => void;
	} = $props();
	
	let isOpen = $state(false);
	let dropdownRef: HTMLDivElement;
	
	function toggleDropdown(e: MouseEvent) {
		e.stopPropagation();
		isOpen = !isOpen;
	}
	
	function handleWindowClick(e: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
			isOpen = false;
		}
	}
	
	function handleTemperatureChange(temp: 'celsius' | 'fahrenheit') {
		units = { ...units, temperature: temp };
		onChange?.(units);
	}
	
	function handleWindSpeedChange(speed: 'kmh' | 'mph') {
		units = { ...units, windSpeed: speed };
		onChange?.(units);
	}
	
	function handlePrecipitationChange(precip: 'mm' | 'inch') {
		units = { ...units, precipitation: precip };
		onChange?.(units);
	}
	
	function switchToImperial() {
		units = {
			temperature: 'fahrenheit',
			windSpeed: 'mph',
			precipitation: 'inch'
		};
		onChange?.(units);
	}
	
	function switchToMetric() {
		units = {
			temperature: 'celsius',
			windSpeed: 'kmh',
			precipitation: 'mm'
		};
		onChange?.(units);
	}
	
	let isMetric = $derived(
		units.temperature === 'celsius' && 
		units.windSpeed === 'kmh' && 
		units.precipitation === 'mm'
	);
	
	let isImperial = $derived(
		units.temperature === 'fahrenheit' && 
		units.windSpeed === 'mph' && 
		units.precipitation === 'inch'
	);
</script>

<svelte:window onclick={handleWindowClick} />

<div class="relative" bind:this={dropdownRef}>
	<button
		onclick={toggleDropdown}
		class="flex items-center gap-2 px-4 py-2.5 bg-neutral-700 hover:bg-neutral-600 
			   rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
		class:ring-2={isOpen}
		class:ring-blue-500={isOpen}
	>
		<img src={iconUnits} alt="" class="w-5 h-5" />
		<span>Units</span>
		<img 
			src={iconDropdown} 
			alt="" 
			class="w-4 h-4 transition-transform"
			class:rotate-180={isOpen}
		/>
	</button>
	
	{#if isOpen}
		<div 
			class="absolute right-0 mt-2 w-64 bg-neutral-700 rounded-lg shadow-xl z-50 overflow-hidden"
		>
			<button
				onclick={switchToImperial}
				class="w-full px-4 py-3 text-left hover:bg-neutral-600 transition-colors border-b border-neutral-600
					   focus:outline-none focus:bg-neutral-600"
			>
				Switch to Imperial
			</button>
			
			<div class="p-4 space-y-4">
				<div>
					<p class="text-sm text-neutral-300 mb-2">Temperature</p>
					<div class="space-y-1">
						<button
							onclick={() => handleTemperatureChange('celsius')}
							class="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-600 
								   transition-colors focus:outline-none focus:bg-neutral-600"
						>
							<span>Celsius (°C)</span>
							{#if units.temperature === 'celsius'}
								<img src={iconCheckmark} alt="" class="w-4 h-4" />
							{/if}
						</button>
						<button
							onclick={() => handleTemperatureChange('fahrenheit')}
							class="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-600 
								   transition-colors focus:outline-none focus:bg-neutral-600"
						>
							<span>Fahrenheit (°F)</span>
							{#if units.temperature === 'fahrenheit'}
								<img src={iconCheckmark} alt="" class="w-4 h-4" />
							{/if}
						</button>
					</div>
				</div>
				
				<div>
					<p class="text-sm text-neutral-300 mb-2">Wind Speed</p>
					<div class="space-y-1">
						<button
							onclick={() => handleWindSpeedChange('kmh')}
							class="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-600 
								   transition-colors focus:outline-none focus:bg-neutral-600"
						>
							<span>km/h</span>
							{#if units.windSpeed === 'kmh'}
								<img src={iconCheckmark} alt="" class="w-4 h-4" />
							{/if}
						</button>
						<button
							onclick={() => handleWindSpeedChange('mph')}
							class="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-600 
								   transition-colors focus:outline-none focus:bg-neutral-600"
						>
							<span>mph</span>
							{#if units.windSpeed === 'mph'}
								<img src={iconCheckmark} alt="" class="w-4 h-4" />
							{/if}
						</button>
					</div>
				</div>
				
				<div>
					<p class="text-sm text-neutral-300 mb-2">Precipitation</p>
					<div class="space-y-1">
						<button
							onclick={() => handlePrecipitationChange('mm')}
							class="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-600 
								   transition-colors focus:outline-none focus:bg-neutral-600"
						>
							<span>Millimeters (mm)</span>
							{#if units.precipitation === 'mm'}
								<img src={iconCheckmark} alt="" class="w-4 h-4" />
							{/if}
						</button>
						<button
							onclick={() => handlePrecipitationChange('inch')}
							class="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-600 
								   transition-colors focus:outline-none focus:bg-neutral-600"
						>
							<span>Inches (in)</span>
							{#if units.precipitation === 'inch'}
								<img src={iconCheckmark} alt="" class="w-4 h-4" />
							{/if}
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>