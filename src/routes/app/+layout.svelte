<script lang="ts">
	import PhoneNavbar from "$lib/components/phone-navbar/phone-navbar.svelte";
	import { setCollectionStoreContext } from "$lib/stores/collection-store.svelte.js";
	import { setProfileStoreContext } from "$lib/stores/profile-store.svelte.js";

	let { children, data } = $props();

	const profileStore = setProfileStoreContext(data.supabase);
	const collectionStore = setCollectionStoreContext(data.supabase);

	data.collectionsData.then((result) => {
		if (result.success) {
			collectionStore.dataToState(result.data);
		} else {
			// TODO: goto error page
			throw result.error;
		}
	});

	data.profileData.then((result) => {
		if (result.success) {
			profileStore.dataToState(result.data);
		} else {
			// TODO: goto error page
			throw result.error;
		}
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
