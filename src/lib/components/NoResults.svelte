<script lang="ts">
	let { query = '' }: { query?: string } = $props();
</script>

<div class="flex flex-col items-center justify-center px-4 py-20">
	<h2 class="mb-2 text-2xl font-bold">No search result found!</h2>
	{#if query}
		<p class="text-center text-neutral-300">
			We couldn't find any results for <span class="font-semibold">"{query}"</span>
		</p>
	{/if}
</div>
