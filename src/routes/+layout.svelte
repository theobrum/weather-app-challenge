<script lang="ts">
	import { QueryClient } from '@tanstack/svelte-query';
	import { setQueryClientContext } from '@tanstack/svelte-query';
	import '../app.css';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				refetchOnWindowFocus: false
			}
		}
	});

	setQueryClientContext(queryClient);
</script>

<!-- slot es de la api vieja de Svelte, ahora se usa @children() -->
<slot />
