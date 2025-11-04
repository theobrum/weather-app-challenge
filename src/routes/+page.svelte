<script lang="ts">
	import LoadingState from '$lib/components/LoadingState.svelte';
	import ErrorState from '$lib/components/ErrorState.svelte';
	import NoResults from '$lib/components/NoResults.svelte';

	let currentState: 'loading' | 'error' | 'noResults' | 'normal' = 'normal';

	function handleRetry() {
		console.log('Retry clicked!');
		currentState = 'loading';
		setTimeout(() => {
			currentState = 'normal';
		}, 2000);
	}
</script>

<div class="min-h-screen p-8">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-3xl font-display font-bold mb-8 text-center">Component Tests</h1>
		
		<div class="flex gap-4 justify-center mb-8">
			<button
				on:click={() => currentState = 'loading'}
				class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition-colors"
			>
				Show Loading
			</button>
			<button
				on:click={() => currentState = 'error'}
				class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition-colors"
			>
				Show Error
			</button>
			<button
				on:click={() => currentState = 'noResults'}
				class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition-colors"
			>
				Show No Results
			</button>
			<button
				on:click={() => currentState = 'normal'}
				class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
			>
				Clear
			</button>
		</div>

		<div class="bg-neutral-800 rounded-xl min-h-[400px] flex items-center justify-center">
			{#if currentState === 'loading'}
				<LoadingState />
			{:else if currentState === 'error'}
				<ErrorState onRetry={handleRetry} />
			{:else if currentState === 'noResults'}
				<NoResults query="Berlin" />
			{:else}
				<p class="text-neutral-300">Click a button to test components</p>
			{/if}
		</div>
	</div>
</div>