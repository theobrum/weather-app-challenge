<script lang="ts">
	import iconError from '$lib/assets/images/icon-error.svg';
	import iconRetry from '$lib/assets/images/icon-retry.svg';

	let {
		title = 'Something went wrong',
		message = "We couldn't connect to the server (API error). Please try again in a few moments.",
		onRetry
	}: {
		title?: string;
		message?: string;
		onRetry?: () => void;
	} = $props();
</script>

<div class="flex flex-col items-center justify-center px-4 py-20">
	<img src={iconError} alt="" class="mb-6 h-20 w-20" />

	<h2 class="mb-2 text-2xl font-bold">{title}</h2>
	<p class="mb-6 max-w-md text-center text-neutral-300">{message}</p>

	{#if onRetry}
		<button
			onclick={onRetry}
			class="flex items-center gap-2 rounded-lg bg-neutral-700 px-6 py-2.5 transition-colors hover:bg-neutral-600"
		>
			<img src={iconRetry} alt="" class="h-4 w-4" />
			Retry
		</button>
	{/if}
</div>
