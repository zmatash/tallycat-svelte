import type { PartialWithId } from "$lib/common/types";
import { collectionRepository } from "$lib/repository/collection-repository";
import type { ResultPromise } from "$lib/utility/result";
import { collectionState, type CollectionState } from "$lib/utility/state/collection";
import type { Supabase } from "$lib/utility/types/supabase";

interface ICollectionStore {
	collections: CollectionState[];
	getCollection: (id: number) => CollectionState | null;
	isLoading: boolean;
	initialise: (supabase: Supabase) => ResultPromise<null>;
	createCollection: (supabase: Supabase, name: string) => ResultPromise<null>;
	updateCollection: (supabase: Supabase, update: PartialWithId<CollectionState>) => ResultPromise<null>;
}

let _tempId = -1;

let isLoading = $state(true);

let _collectionMap = $state<Record<number, CollectionState>>({});
const _collections = $derived(Object.values(_collectionMap).sort((a, b) => a.position - b.position));

async function initialise(supabase: Supabase): ResultPromise<null> {
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

function getCollection(id: number): CollectionState | null {
	return _collectionMap[id] ?? null;
}

async function updateCollection(supabase: Supabase, update: PartialWithId<CollectionState>): ResultPromise<null> {
	const user = supabase.user;
	if (!user) {
		return { success: false, error: new Error("Not logged in") };
	}
	const originalCollectionState = _collectionMap[update.id];
	if (!originalCollectionState) {
		return { success: false, error: new Error("Collection not found") };
	}

	const updatedCollection: CollectionState = {
		...originalCollectionState,
		...update
	};
	_collectionMap[updatedCollection.id] = updatedCollection;

	const row = collectionState.toRowPartial(update);
	const result = await collectionRepository.patchCollection(supabase, row);
	if (result.success) {
		return result;
	}

	_collectionMap[updatedCollection.id] = originalCollectionState;
	return result;
}

async function createCollection(supabase: Supabase, name: string): ResultPromise<null> {
	const user = supabase.user;
	if (!user) {
		return { success: false, error: new Error("Not logged in") };
	}

	const tempState: CollectionState = {
		id: _tempId--,
		name,
		memberCount: 0,
		position: 0
	};
	_collectionMap[tempState.id] = tempState;

	const dbResult = await collectionRepository.insertCollection(supabase, collectionState.toRowOmitId(tempState));
	if (dbResult.success) {
		const realId = dbResult.data.id;
		delete _collectionMap[tempState.id];
		_collectionMap[realId] = { ...tempState, id: realId };
		return { success: true, data: null };
	}

	delete _collectionMap[tempState.id];
	return dbResult;
}

export const collectionStore: ICollectionStore = {
	get collections() {
		return _collections;
	},
	get isLoading() {
		return isLoading;
	},
	getCollection,
	initialise,
	createCollection,
	updateCollection
} as const;
