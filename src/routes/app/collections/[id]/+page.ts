import { CounterStore } from "$lib/stores/counter-store.svelte";
import type { PageLoad } from "./$types";

export const load = (async (request) => {
	const data = await request.parent();

	return {
		counterStore: new CounterStore(data.supabase, Number(request.params.id))
	};
}) satisfies PageLoad;
