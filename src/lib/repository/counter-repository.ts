import type { CounterRow, PartialWithId } from "$lib/common/types";
import { createResult, type ResultPromise } from "$lib/utility/result";
import type { Supabase } from "$lib/utility/types/supabase";

interface ICounterRepository {
	getCounters: (supabase: Supabase, collectionId: number) => ResultPromise<CounterRow[]>;
	updateCounter: (supabase: Supabase, update: PartialWithId<CounterRow>) => ResultPromise<null>;
	insertCounter: (supabase: Supabase, counter: Omit<CounterRow, "id">) => ResultPromise<{ id: number }>;
	deleteCounter: (supabase: Supabase, id: number) => ResultPromise<null>;
}

async function getCounters(supabase: Supabase, collectionId: number): ResultPromise<CounterRow[]> {
	const response = await supabase.client.from("counters").select("*").eq("collection_id", collectionId);
	return createResult(response);
}

async function updateCounter(supabase: Supabase, update: PartialWithId<CounterRow>): ResultPromise<null> {
	const response = await supabase.client.from("counters").update(update).eq("id", update.id);
	return createResult(response);
}

async function insertCounter(supabase: Supabase, counter: Omit<CounterRow, "id">): ResultPromise<{ id: number }> {
	const response = await supabase.client.from("counters").insert(counter).select("id").single();
	return createResult(response);
}

async function deleteCounter(supabase: Supabase, id: number): ResultPromise<null> {
	const response = await supabase.client.from("counters").delete().eq("id", id);
	return createResult(response);
}

export const counterRepository: ICounterRepository = {
	getCounters,
	updateCounter,
	insertCounter,
	deleteCounter
} as const;
