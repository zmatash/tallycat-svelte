<script lang="ts">
	let { children } = $props();
</script>

<div class="container fill-screen col-centred">
	<main class="fill-parent">
		{@render children()}
	</main>
</div>

<style>
	.container {
		background: var(--base);
	}
</style>
