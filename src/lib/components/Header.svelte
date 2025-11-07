<script lang="ts">
	import logo from '$lib/assets/images/logo.svg';
	import UnitsDropdown from './UnitsDropdown.svelte';
	import type { UnitSettings } from '$lib/types/weather';
	
	let {
		units = $bindable({
			temperature: 'celsius',
			windSpeed: 'kmh',
			precipitation: 'mm'
		}),
		onUnitsChange
	}: {
		units?: UnitSettings;
		onUnitsChange?: (units: UnitSettings) => void;
	} = $props();
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-0.5 pt-3 sm:pt-7 pb-3 sm:pb-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<img src={logo} alt="Weather Now" class="w-35 h-auto" />
		</div>
		
		<UnitsDropdown bind:units onChange={onUnitsChange} />
	</div>
</div>