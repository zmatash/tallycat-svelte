import { collectionRepository } from "$lib/repository/collection-repository";
import type { ResultPromise } from "$lib/utility/result";
import { collectionState, type CollectionState } from "$lib/utility/state/collection";
import type { Supabase } from "$lib/utility/types/supabase";

interface CollectionStore {
	collections: () => CollectionState[];
	isLoading: boolean;
	isInitialising: boolean;
	initialise: (supabase: Supabase) => ResultPromise<null>;
}

// const _tempId = -1;

let isLoading = $state(false);
const isInitialising = $state(false);

let _collectionMap = $state<Record<number, CollectionState>>({});
const _collections = $derived(Object.values(_collectionMap).sort((a, b) => a.position - b.position));

async function initialise(supabase: Supabase): ResultPromise<null> {
	if (isInitialising) return { success: true, data: null };
	isLoading = true;

	if (!supabase.user) {
		return { success: false, error: new Error("Not logged in") };
	}

	const result = await collectionRepository.getCollections(supabase);
	if (!result.success) {
		isLoading = false;
		return result;
	}

	const collectionMap: Record<number, CollectionState> = {};
	for (const row of result.data) {
		collectionMap[row.id] = collectionState.fromRow(row);
	}
	_collectionMap = collectionMap;
	isLoading = false;
	return { success: true, data: null };
}

function collections() {
	return _collections;
}

export const collectionStore: CollectionStore = {
	collections,
	isLoading,
	isInitialising,
	initialise
} as const;
