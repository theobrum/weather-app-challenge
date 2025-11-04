<script lang="ts">
	export let query: string = '';
</script>

<div class="flex flex-col items-center justify-center py-20 px-4">
	<h2 class="text-2xl font-bold mb-2">No search result found!</h2>
	{#if query}
		<p class="text-neutral-300 text-center">
			We couldn't find any results for <span class="font-semibold">"{query}"</span>
		</p>
	{/if}
</div>