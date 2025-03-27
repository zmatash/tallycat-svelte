<script lang="ts">
	import { collectionStore } from "$lib/stores/collection-store.svelte";
	import { profileStore } from "$lib/stores/profile-store.svelte";
	import PhoneNavButton from "./phone-nav-button.svelte";

	let activeCollectionProps = $derived.by(() => {
		if (!profileStore.profile())
			return {
				label: "Disabled",
				isEnabled: false
			};
		const activeId = profileStore.profile()?.activeCollection;
		if (!activeId)
			return {
				label: "Disabled",
				isEnabled: false
			};
		const collection = collectionStore.collections().find((c) => c.id === activeId);
		return {
			label: collection?.name ?? "Disabled",
			isEnabled: collection !== undefined
		};
	});
</script>

<nav class="row-centred just-evenly">
	<PhoneNavButton goto="/app/collections" sprite="group" label="Collections" />
	<PhoneNavButton
		goto="/collections"
		sprite="check"
		label={activeCollectionProps.label}
		isEnabled={activeCollectionProps.isEnabled}
	/>
	<PhoneNavButton goto="/app/settings" sprite="settings" label="Settings" />
</nav>
