<script lang="ts">
	import { onDestroy } from "svelte";

	let { children, data } = $props();

	onDestroy(() => {
		data.dispose();
	});
</script>

<main>
	{@render children()}
</main>

<style>
</style>
