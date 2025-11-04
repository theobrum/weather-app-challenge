<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import UnitsDropdown from '$lib/components/UnitsDropdown.svelte';
	import type { UnitSettings } from '$lib/types/weather';

	let searchQuery = $state('');
	let units = $state<UnitSettings>({
		temperature: 'celsius',
		windSpeed: 'kmh',
		precipitation: 'mm'
	});

	function handleSearch(query: string) {
		console.log('Search for:', query);
		searchQuery = query;
	}

	function handleUnitsChange(newUnits: UnitSettings) {
		console.log('Units changed:', newUnits);
	}
</script>

<div class="min-h-screen p-8">
	<div class="mx-auto max-w-4xl space-y-8">
		<h1 class="text-center font-display text-3xl font-bold">Interactive Components Test</h1>

		<div class="flex items-start justify-between gap-4">
			<SearchBar bind:value={searchQuery} onSearch={handleSearch} />
			<UnitsDropdown bind:units onChange={handleUnitsChange} />
		</div>

		<div class="rounded-xl bg-neutral-800 p-6">
			<h2 class="mb-4 text-xl font-semibold">Current State:</h2>
			<div class="space-y-2 text-neutral-300">
				<p>
					Search Query: <span class="font-semibold text-neutral-0">{searchQuery || 'None'}</span>
				</p>
				<p>Temperature: <span class="font-semibold text-neutral-0">{units.temperature}</span></p>
				<p>Wind Speed: <span class="font-semibold text-neutral-0">{units.windSpeed}</span></p>
				<p>
					Precipitation: <span class="font-semibold text-neutral-0">{units.precipitation}</span>
				</p>
			</div>
		</div>
	</div>
</div>
