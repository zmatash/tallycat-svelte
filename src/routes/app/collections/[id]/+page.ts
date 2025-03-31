import { counterRepository } from "$lib/repository/counter-repository";
import type { PageLoad } from "./$types";

export const load = (async (request) => {
	const data = await request.parent();

	const collectionId = Number(request.params.id);
	const counterData = counterRepository.getCounters(data.supabase, collectionId);

	return {
		counterData,
		collectionId
	};
}) satisfies PageLoad;
