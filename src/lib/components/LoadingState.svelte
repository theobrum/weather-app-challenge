<script lang="ts">
	import iconLoading from '$lib/assets/images/icon-loading.svg';
	
	export let message: string = 'Loading...';
</script>

<div class="flex flex-col items-center justify-center py-20">
	<img src={iconLoading} alt="" class="w-12 h-12 mb-4 animate-spin" />
	<p class="text-neutral-300">{message}</p>
</div>