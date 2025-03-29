<script lang="ts">
	import PhoneNavbar from "$lib/components/phone-navbar/phone-navbar.svelte";
	import { collectionStore } from "$lib/stores/collection-store.svelte.js";
	import { profileStore } from "$lib/stores/profile-store.svelte.js";
	import { onMount } from "svelte";

	let { children, data } = $props();

	onMount(() => {
		collectionStore.initialise(data.supabase);

		const authChangeSubscription = data.supabase.client.auth.onAuthStateChange((_, newSession) => {
			if (newSession) {
				profileStore.initialise(data.supabase);
			} else {
				profileStore.invalidate();
			}
		}).data.subscription;

		return () => {
			authChangeSubscription.unsubscribe();
		};
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
