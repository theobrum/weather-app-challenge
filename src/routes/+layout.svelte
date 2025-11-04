<script lang="ts">
	import { QueryClient } from '@tanstack/svelte-query';
	import { setQueryClientContext } from '@tanstack/svelte-query';
	import '../app.css';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5, // 5 minutos
				refetchOnWindowFocus: false
			}
		}
	});

	setQueryClientContext(queryClient);
</script>

<slot />
