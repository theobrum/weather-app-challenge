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

<header class="flex items-center justify-between py-6 px-8">
	<div class="flex items-center gap-3">
		<img src={logo} alt="Weather Now" class="w-28 h-28" />
	</div>
	
	<UnitsDropdown bind:units onChange={onUnitsChange} />
</header>