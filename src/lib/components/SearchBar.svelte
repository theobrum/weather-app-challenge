<script lang="ts">
	import iconSearch from '$lib/assets/images/icon-search.svg';
	
	let { 
		value = $bindable(''),
		placeholder = 'Search for a place...',
		onSearch
	}: { 
		value?: string;
		placeholder?: string;
		onSearch: (query: string) => void;
	} = $props();
	
	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		// IVAN: para evitar repetir código capaz:
		// const parsedValue = value.trim();
		if (value.trim()) {
			onSearch(value.trim());
		}
	}
	
	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		onSearch(target.value);
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
	<div class="relative flex-1">
		<img 
			src={iconSearch} 
			alt="" 
			class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300"
		/>
		<input
			type="text"
			id="location-search"
			name="location"
			{value}
			{placeholder}
			oninput={handleInput}
			class="w-full bg-neutral-700 text-neutral-0 pl-12 pr-4 py-3.5 rounded-lg 
				   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
				   placeholder:text-neutral-300"
		/>
	</div>
	
	<button
		type="submit"
		class="w-full sm:w-auto px-8 py-3.5 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium 
			   transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
	>
		Search
	</button>
</form>