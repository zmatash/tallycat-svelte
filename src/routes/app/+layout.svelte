<script lang="ts">
	import PhoneNavbar from "$lib/components/phone-navbar/phone-navbar.svelte";
	import { onDestroy } from "svelte";

	let { children, data } = $props();

	onDestroy(() => {
		data.dispose();
	});
</script>

<div class="container fill-parent">
	<main>
		{@render children()}
	</main>
	<PhoneNavbar />
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: 1fr 64px;
		background: var(--base);
	}
</style>
