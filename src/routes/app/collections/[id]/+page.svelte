<script lang="ts">
	import { goto } from "$app/navigation";
	import type { PartialWithId } from "$lib/common/types.js";
	import Counter from "$lib/components/cards/counter.svelte";
	import CreateCard from "$lib/components/cards/create-card.svelte";
	import { getCollectionStoreContext } from "$lib/stores/collection-store.svelte.js";
	import { setCounterStoreContext } from "$lib/stores/counter-store.svelte.js";
	import type { CounterState } from "$lib/utility/state/counter-helpers.js";

	let { data } = $props();

	const { counterData, supabase, collectionId } = data;

	const collectionStore = getCollectionStoreContext();
	const counterStore = setCounterStoreContext(supabase, collectionId, collectionStore);

	counterData.then((result) => {
		if (result.success) {
			counterStore.dataToState(result.data);
			if (collectionStore.collectionsMap[collectionId]) {
				goto(`/app/collections/${collectionId}`);
			}
		} else {
			// TODO: goto error page
			throw result.error;
		}
	});

	const createCounter = (name: string) => counterStore.createCounter(name);
	const updateCounter = (update: PartialWithId<CounterState>) => counterStore.updateCounter(update);
</script>

{#await data.counterData}
	<div>
		<p>Loading counters...</p>
	</div>
{:then}
	<div class="fill-parent col-centred pad-16 gap-16">
		{#each counterStore.countersArray as counter (counter.id)}
			<Counter {counter} update={updateCounter} />
		{/each}
		<CreateCard onSubmit={createCounter} label="New Counter" />
	</div>
{/await}

<style></style>
