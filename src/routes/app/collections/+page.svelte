<script lang="ts">
	import { goto } from "$app/navigation";
	import Collection from "$lib/components/cards/collection.svelte";
	import CreateCard from "$lib/components/cards/create-card.svelte";
	import { collectionStore } from "$lib/stores/collection-store.svelte";
	import { profileStore } from "$lib/stores/profile-store.svelte.js";

	let { data } = $props();

	const createCollection = (name: string) => collectionStore.createCollection(data.supabase, name);
	const updateCollectionName = async (id: number, name: string) => {
		const collection = collectionStore.getCollection(id);
		if (collection && collection.name !== name) {
			console.log(id, name, "update not implemented yet");
		}
	};

	const navigateToCollection = (id: number) => {
		profileStore.updateProfile(data.supabase, { activeCollection: id });
		goto(`/app/collections/${id}`);
	};

	let nextCollectionPlaceholder = $derived(`Collection ${collectionStore.collections.length + 1}`);
</script>

<div class="fill-parent wrapper">
	<div class="controls-container"></div>
	<div class="collection-container pad-16 gap-16 col-centred">
		{#each collectionStore.collections as collection (collection.id)}
			<Collection {collection} onNameBlur={updateCollectionName} onClick={navigateToCollection} />
		{/each}
		<CreateCard onSubmit={createCollection} label="New Collection" placeholderNewName={nextCollectionPlaceholder} />
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-rows: 64px 1fr;
	}

	.controls-container {
		width: 100%;
		height: var(--size56);
		background: var(--mantle);
		border-bottom: 1px solid var(--surface1);
	}

	.collection-container {
		height: auto;
		width: 100%;
		overflow-y: auto;
	}
</style>
