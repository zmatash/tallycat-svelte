<script lang="ts">
	import CollectionDisplay from "$lib/components/collection-card/collection-display.svelte";
	import CreateCollectionCard from "$lib/components/collection-card/create-collection-card.svelte";
	import { collectionStore } from "$lib/stores/collection-store.svelte";

	let { data } = $props();

	const startCollectionCreate = () => {};
	const createCollection = async (name: string) => {
		collectionStore.createCollection(data.supabase, name);
	};
</script>

<div class="fill-parent wrapper">
	<div class="controls-container"></div>
	<div class="collection-container pad-16 gap-16 col-centred">
		{#each collectionStore.collections as collection (collection.id)}
			<CollectionDisplay {collection} />
		{/each}
		<CreateCollectionCard onClick={startCollectionCreate} />
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
