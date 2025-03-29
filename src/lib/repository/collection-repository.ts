import type { CollectionRow, PartialWithId } from "$lib/common/types";
import { createResult, type ResultPromise } from "$lib/utility/result";
import type { Supabase } from "$lib/utility/types/supabase";

type CollectionRepository = {
	getCollections: (supabase: Supabase) => ResultPromise<CollectionRow[]>;
	getCollection: (supabase: Supabase, id: number) => ResultPromise<CollectionRow>;
	getCollectionIds: (supabase: Supabase) => ResultPromise<{ id: number }[]>;
	patchCollection: (supabase: Supabase, updatedCollection: PartialWithId<CollectionRow>) => ResultPromise<null>;
	insertCollection: (
		supabase: Supabase,
		collection: Omit<CollectionRow, "id" | "user_id">
	) => ResultPromise<{ id: number }>;
	deleteCollection: (supabase: Supabase, id: number) => ResultPromise<null>;
};

async function getCollections(supabase: Supabase): ResultPromise<CollectionRow[]> {
	if (!supabase.user) {
		return { success: false, error: new Error("Not logged in") };
	}

	const response = await supabase.client.from("collections").select("*").eq("user_id", supabase.user.id);
	return createResult(response);
}

async function getCollectionIds(supabase: Supabase): ResultPromise<{ id: number }[]> {
	if (!supabase.user) {
		return { success: false, error: new Error("Not logged in") };
	}
	const response = await supabase.client.from("collections").select("id").eq("user_id", supabase.user.id);
	return createResult(response);
}

async function getCollection(supabase: Supabase, id: number): ResultPromise<CollectionRow> {
	const response = await supabase.client.from("collections").select("*").eq("id", id).single();
	return createResult(response);
}

async function patchCollection(
	supabase: Supabase,
	updatedCollection: PartialWithId<CollectionRow>
): ResultPromise<null> {
	const response = await supabase.client.from("collections").update(updatedCollection).eq("id", updatedCollection.id);
	return createResult(response);
}

async function insertCollection(
	supabase: Supabase,
	collection: Omit<CollectionRow, "id" | "user_id">
): ResultPromise<{ id: number }> {
	const response = await supabase.client.from("collections").insert(collection).select("id").single();
	return createResult(response);
}

async function deleteCollection(supabase: Supabase, id: number): ResultPromise<null> {
	const response = await supabase.client.from("collections").delete().eq("id", id);
	return createResult(response);
}

export const collectionRepository: CollectionRepository = {
	getCollections,
	getCollection,
	getCollectionIds,
	patchCollection,
	insertCollection,
	deleteCollection
} as const;
