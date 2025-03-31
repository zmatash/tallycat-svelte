<script lang="ts">
	import { getCollectionStoreContext } from "$lib/stores/collection-store.svelte";
	import { getProfileStoreContext } from "$lib/stores/profile-store.svelte";
	import PhoneNavButton from "./phone-nav-button.svelte";

	const profileStore = getProfileStoreContext();
	const collectionStore = getCollectionStoreContext();

	let activeCollectionProps = $derived.by(() => {
		const activeId = profileStore.profile?.activeCollection;
		const collection = activeId ? collectionStore.collectionsMap[activeId] : null;

		if (!profileStore.profile || !activeId || !collection) {
			return {
				label: "Disabled",
				isEnabled: false
			};
		}
		return {
			label: collection.name,
			isEnabled: true,
			goto: `/app/collections/${collection.id}`
		};
	});
</script>

<nav class="row-centred just-evenly">
	<PhoneNavButton goto="/app/collections" sprite="group" label="Collections" />
	<PhoneNavButton
		goto={activeCollectionProps.goto ?? ""}
		sprite="pin"
		label={activeCollectionProps.label}
		isEnabled={activeCollectionProps.isEnabled}
	/>
	<PhoneNavButton goto="/app/settings" sprite="settings" label="Settings" />
</nav>

<style>
	nav {
		border-top: 1px solid var(--surface1);
		padding: var(--size8) 0 var(--size8) 0;
	}
</style>
