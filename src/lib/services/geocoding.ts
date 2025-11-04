import type { Location } from '$lib/types/weather';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

export async function searchLocations(query: string): Promise<Location[]> {
	if (!query || query.trim().length < 2) {
		return [];
	}

	const params = new URLSearchParams({
		name: query.trim(),
		count: '5',
		language: 'en',
		format: 'json'
	});

	const response = await fetch(`${GEOCODING_API}?${params}`);

	if (!response.ok) {
		throw new Error('Failed to fetch locations');
	}

	const data = await response.json();

	if (!data.results) {
		return [];
	}

	return data.results.map((result: any) => ({
		name: result.name,
		latitude: result.latitude,
		longitude: result.longitude,
		country: result.country,
		admin1: result.admin1
	}));
}