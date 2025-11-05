<script lang="ts">
	import iconLoading from '$lib/assets/images/icon-loading.svg';

	let { message = 'Loading...' }: { message?: string } = $props();
</script>

<div class="flex flex-col items-center justify-center py-20">
	<img src={iconLoading} alt="" class="mb-4 h-12 w-12 animate-spin" />
	<p class="text-neutral-300">{message}</p>
</div>
