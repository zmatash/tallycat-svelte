<script lang="ts">
	import type { PartialWithId } from "$lib/common/types.js";
	import Counter from "$lib/components/cards/counter.svelte";
	import CreateCard from "$lib/components/cards/create-card.svelte";
	import type { CounterState } from "$lib/utility/state/counter.js";

	let { data } = $props();

	const { counterStore, supabase } = data;

	const createCounter = (name: string) => counterStore.addCounter(supabase, name);
	const updateCounter = (update: PartialWithId<CounterState>) => counterStore.updateCounter(supabase, update);
</script>

<div class="fill-parent col-centred pad-16 gap-16">
	{#each counterStore.counters as counter (counter.id)}
		<Counter {counter} update={updateCounter} />
	{/each}
	<CreateCard onSubmit={createCounter} label="New Counter" />
</div>

<style></style>
