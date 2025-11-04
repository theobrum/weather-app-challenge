<script lang="ts">
	import iconError from '$lib/assets/images/icon-error.svg';
	import iconRetry from '$lib/assets/images/icon-retry.svg';
	
	export let title: string = 'Something went wrong';
	export let message: string = "We couldn't connect to the server (API error). Please try again in a few moments.";
	export let onRetry: (() => void) | undefined = undefined;
</script>

<div class="flex flex-col items-center justify-center py-20 px-4">
	<img src={iconError} alt="" class="w-20 h-20 mb-6" />
	
	<h2 class="text-2xl font-bold mb-2">{title}</h2>
	<p class="text-neutral-300 text-center max-w-md mb-6">{message}</p>
	
	{#if onRetry}
		<button
			on:click={onRetry}
			class="px-6 py-2.5 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors flex items-center gap-2"
		>
			<img src={iconRetry} alt="" class="w-4 h-4" />
			Retry
		</button>
	{/if}
</div>