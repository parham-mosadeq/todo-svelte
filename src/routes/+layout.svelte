<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="/index.css">
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
