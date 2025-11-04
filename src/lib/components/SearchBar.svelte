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
		if (value.trim()) {
			onSearch(value.trim());
		}
	}
</script>

<form onsubmit={handleSubmit} class="flex w-full max-w-2xl gap-4">
	<div class="relative flex-1">
		<img
			src={iconSearch}
			alt=""
			class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-neutral-300"
		/>
		<input
			type="text"
			bind:value
			{placeholder}
			class="w-full rounded-lg bg-neutral-700 py-3.5 pr-4 pl-12 text-neutral-0
				   transition-all placeholder:text-neutral-300 focus:ring-2 focus:ring-blue-500
				   focus:outline-none"
		/>
	</div>

	<button
		type="submit"
		class="rounded-lg bg-blue-500 px-8 py-3.5 font-medium transition-colors
			   hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:outline-none"
	>
		Search
	</button>
</form>
