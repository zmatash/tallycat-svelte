<script lang="ts">
	import CreateCollectionCard from "$lib/components/collection-card/collection-create.svelte";
	import Collection from "$lib/components/collection-card/collection.svelte";
	import { collectionStore } from "$lib/stores/collection-store.svelte";
	import type { CollectionState } from "$lib/utility/state/collection.js";

	let { data } = $props();

	const initialiseCollectionCreate = () => {
		inCreationCollection = {
			name: `Collection ${collectionStore.collections.length + 1}`,
			memberCount: 0,
			position: collectionStore.collections.length,
			id: -1
		};
		isCreatingCollection = true;
	};
	const createCollection = async (_: number, name: string) => {
		collectionStore.createCollection(data.supabase, name);
		isCreatingCollection = false;
		inCreationCollection = null;
	};
	const updateCollectionName = async (id: number, name: string) => {
		const collection = collectionStore.getCollection(id);
		if (collection && collection.name !== name) {
			console.log(id, name, "update not implemented yet");
		}
	};

	let isCreatingCollection = $state(false);
	let inCreationCollection: CollectionState | null = $state(null);
</script>

<div class="fill-parent wrapper">
	<div class="controls-container"></div>
	<div class="collection-container pad-16 gap-16 col-centred">
		{#each collectionStore.collections as collection (collection.id)}
			<Collection {collection} onNameBlur={updateCollectionName} />
		{/each}
		{#if !isCreatingCollection}
			<CreateCollectionCard onClick={initialiseCollectionCreate} />
		{:else if inCreationCollection}
			<Collection
				collection={inCreationCollection}
				focusInput={true}
				onNameBlur={createCollection}
				selected={true}
				editable={true}
			/>
		{/if}
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
