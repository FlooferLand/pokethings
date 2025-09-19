<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "$styles/main.scss";

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="page-body">
	{@render children()}
</div>
<footer>
	{#if data.isRoot}
		<p>Back to <a href="https://flooferland.com">flooferland.com</a></p>
	{:else}
		<p>Back to <a href="/">Pokethings</a></p>
	{/if}
</footer>

<style lang="scss">
	footer {
		margin: 5rem 0.8rem 0rem 0.8rem;
		padding: 0.5rem;
		background-color: color-mix(in srgb, light-dark(white, black) 30%, transparent);
	}

	#page-body {
		margin: 0.8rem;
		padding: 0;
	}
</style>
