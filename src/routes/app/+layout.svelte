<script lang="ts">
	import PhoneNavbar from "$lib/components/phone-navbar/phone-navbar.svelte";
	import { collectionStore } from "$lib/stores/collection-store.svelte.js";
	import { onDestroy, onMount } from "svelte";

	let { children, data } = $props();

	onMount(() => {
		collectionStore.initialise(data.supabase);
	});

	onDestroy(() => {
		data.dispose();
	});
</script>

<div class="container fill-screen">
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
