export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}

export function formatDayOfWeek(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function formatHour(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		hour12: true
	});
}

export function formatTemperature(temp: number, decimals: number = 0): string {
	return Math.round(temp * Math.pow(10, decimals)) / Math.pow(10, decimals) + '°';
}

export function formatWindSpeed(speed: number, unit: string): string {
	return `${Math.round(speed)} ${unit}`;
}

export function formatPrecipitation(amount: number, unit: string): string {
	return `${amount.toFixed(1)} ${unit}`;
}

export function formatHumidity(humidity: number): string {
	return `${Math.round(humidity)}%`;
}
