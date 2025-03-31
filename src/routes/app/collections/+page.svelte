<script lang="ts">
	import { goto } from "$app/navigation";
	import Collection from "$lib/components/cards/collection.svelte";
	import CreateCard from "$lib/components/cards/create-card.svelte";
	import { getCollectionStoreContext } from "$lib/stores/collection-store.svelte.js";
	import { getProfileStoreContext } from "$lib/stores/profile-store.svelte.js";

	const collectionStore = getCollectionStoreContext();
	const profileStore = getProfileStoreContext();

	const createCollection = (name: string) => collectionStore.createCollection(name);
	const updateCollectionName = async (id: number, name: string) => {
		const collection = collectionStore.collectionsMap[id];
		if (collection && collection.name !== name) {
			console.log(id, name, "update not implemented yet");
		}
	};

	const navigateToCollection = (id: number) => {
		profileStore.updateProfile({ activeCollection: id });
		goto(`/app/collections/${id}`);
	};

	let nextCollectionPlaceholder = $derived(`Collection ${collectionStore.collectionsArray.length + 1}`);
</script>

<div class="collection-container pad-16 gap-16 col-centred fill-parent">
	{#each collectionStore.collectionsArray as collection (collection.id)}
		<Collection {collection} onNameBlur={updateCollectionName} onClick={navigateToCollection} />
	{/each}
	<CreateCard onSubmit={createCollection} label="New Collection" placeholderNewName={nextCollectionPlaceholder} />
</div>

<style>
	.collection-container {
		overflow-y: auto;
	}
</style>
