<script lang="ts">
	import { onMount } from 'svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import Header from '$lib/components/Header.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CurrentWeather from '$lib/components/CurrentWeather.svelte';
	import WeatherMetrics from '$lib/components/WeatherMetrics.svelte';
	import DailyForecast from '$lib/components/DailyForecast.svelte';
	import HourlyForecast from '$lib/components/HourlyForecast.svelte';
	import LoadingState from '$lib/components/LoadingState.svelte';
	import ErrorState from '$lib/components/ErrorState.svelte';
	import NoResults from '$lib/components/NoResults.svelte';
	import { searchLocations } from '$lib/services/geocoding';
	import { getWeatherData } from '$lib/services/weather';
	import type { UnitSettings } from '$lib/types/weather';
	
	let searchQuery = $state('');
	let units = $state<UnitSettings>({
		temperature: 'celsius',
		windSpeed: 'kmh',
		precipitation: 'mm'
	});
	let selectedLocation = $state<{ lat: number; lon: number; name: string } | null>(null);
	let isGettingLocation = $state(false);
	let geolocationError = $state(false);
	
	onMount(() => {
		if (navigator.geolocation) {
			isGettingLocation = true;
			navigator.geolocation.getCurrentPosition(
				(position) => {
					selectedLocation = {
						lat: position.coords.latitude,
						lon: position.coords.longitude,
						name: 'Your Location'
					};
					isGettingLocation = false;
				},
				(error) => {
					isGettingLocation = false;
					geolocationError = true;
				}
			);
		}
	});
	
	const locationQuery = createQuery(() => ({
		queryKey: ['locations', searchQuery],
		queryFn: () => searchLocations(searchQuery),
		enabled: searchQuery.length > 2
	}));
	
	const weatherQuery = createQuery(() => ({
		queryKey: ['weather', selectedLocation?.lat, selectedLocation?.lon, units],
		queryFn: async () => {
			if (!selectedLocation) return null;
			
			const locationData = {
				name: selectedLocation.name,
				latitude: selectedLocation.lat,
				longitude: selectedLocation.lon,
				country: ''
			};
			
			return getWeatherData(
				{
					latitude: selectedLocation.lat,
					longitude: selectedLocation.lon,
					temperatureUnit: units.temperature,
					windSpeedUnit: units.windSpeed,
					precipitationUnit: units.precipitation
				},
				locationData
			);
		},
		enabled: selectedLocation !== null
	}));
	
	function handleSearch(query: string) {
		searchQuery = query;
	}
	
	function handleLocationSelect(location: any) {
		selectedLocation = {
			lat: location.latitude,
			lon: location.longitude,
			name: `${location.name}, ${location.country}`
		};
		searchQuery = '';
	}
	
	function handleUnitsChange(newUnits: UnitSettings) {
		units = newUnits;
	}
</script>

<div class="min-h-screen">
	<Header bind:units onUnitsChange={handleUnitsChange} />
	
	<main class="max-w-7xl mx-auto px-8 py-6">
		<div class="text-center mb-12">
			<h2 class="text-5xl font-display font-bold mb-6">
				How's the sky looking today?
			</h2>
			
			<div class="flex justify-center mb-8">
				<SearchBar value={searchQuery} onSearch={handleSearch} />
			</div>
			
			{#if locationQuery.isLoading}
				<div class="bg-neutral-700 rounded-lg p-4 max-w-md mx-auto">
					<p class="text-neutral-300">Search in progress...</p>
				</div>
			{:else if locationQuery.data && locationQuery.data.length > 0}
				<div class="bg-neutral-700 rounded-lg max-w-md mx-auto">
					{#each locationQuery.data as location}
						<button
							onclick={() => handleLocationSelect(location)}
							class="w-full px-4 py-3 text-left hover:bg-neutral-600 transition-colors border-b border-neutral-600 last:border-b-0"
						>
							{location.name}, {location.country}
						</button>
					{/each}
				</div>
			{:else if searchQuery.length > 2 && locationQuery.data?.length === 0}
				<NoResults query={searchQuery} />
			{/if}
		</div>
		
		{#if isGettingLocation}
			<LoadingState message="Getting your location..." />
		{:else if weatherQuery.isPending && selectedLocation}
			<LoadingState />
		{:else if weatherQuery.isError}
			<ErrorState onRetry={() => weatherQuery.refetch()} />
		{:else if weatherQuery.data}
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div class="lg:col-span-2 space-y-8">
					<CurrentWeather 
						current={weatherQuery.data.current}
						location={weatherQuery.data.location}
						temperatureUnit={units.temperature}
					/>
					
					<WeatherMetrics 
						current={weatherQuery.data.current}
						windSpeedUnit={units.windSpeed}
						precipitationUnit={units.precipitation}
					/>
					
					<DailyForecast daily={weatherQuery.data.daily} />
				</div>
				
				<div class="lg:col-span-1">
					<HourlyForecast hourly={weatherQuery.data.hourly} />
				</div>
			</div>
		{/if}
	</main>
</div>