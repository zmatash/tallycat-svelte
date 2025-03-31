import type { CollectionRow, PartialWithId } from "$lib/common/types";
import { collectionRepository } from "$lib/repository/collection-repository";
import type { Result } from "$lib/utility/result";
import { collectionHelpers, type CollectionState } from "$lib/utility/state/collection-helpers";
import type { Supabase } from "$lib/utility/types/supabase";
import { getContext, setContext } from "svelte";

class CollectionStore {
	private supabase: Required<Supabase>;
	private tempId = -1;

	collectionsMap: Record<number, CollectionState> = $state({});
	collectionsArray: CollectionState[] = $derived(
		Object.values(this.collectionsMap).sort((a, b) => a.position - b.position)
	);

	constructor(supabase: Supabase) {
		this.supabase = supabase;
		if (!this.supabase.user) {
			throw new Error("Not logged in");
		}
	}

	async dataToState(data: CollectionRow[]) {
		const collectionMap: Record<number, CollectionState> = {};
		for (const row of data) {
			collectionMap[row.id] = collectionHelpers.fromRow(row);
		}
		this.collectionsMap = collectionMap;
	}

	async createCollection(name: string): Promise<Result<null>> {
		const tempState: CollectionState = {
			id: --this.tempId,
			name,
			memberCount: 0,
			position: this.collectionsArray.length
		};

		this.collectionsMap[tempState.id] = tempState;
		const result = await collectionRepository.insertCollection(
			this.supabase,
			collectionHelpers.toRowOmitId(tempState)
		);

		if (result.success) {
			const realId = result.data.id;
			delete this.collectionsMap[tempState.id];
			this.collectionsMap[realId] = { ...tempState, id: realId };
			return { success: true, data: null };
		}

		delete this.collectionsMap[tempState.id];
		return result;
	}

	async removeCollection(id: number): Promise<Result<null>> {
		const collection = this.collectionsMap[id];
		if (!collection) {
			return { success: false, error: new Error(`Collection not found with id ${id}`) };
		}

		delete this.collectionsMap[id];
		const result = await collectionRepository.deleteCollection(this.supabase, id);
		if (result.success) {
			return result;
		}
		this.collectionsMap[id] = collection;
		return result;
	}

	async updateCollection(update: PartialWithId<CollectionState>): Promise<Result<null>> {
		const originalState = this.collectionsMap[update.id];
		if (!originalState) {
			return { success: false, error: new Error(`Collection not found with id ${update.id}`) };
		}

		const updatedCollection = { ...originalState, ...update };
		this.collectionsMap[updatedCollection.id] = updatedCollection;

		const result = await collectionRepository.patchCollection(
			this.supabase,
			collectionHelpers.toRowPartial(update)
		);
		if (result.success) {
			return result;
		}

		this.collectionsMap[updatedCollection.id] = originalState;
		return result;
	}
}

export type ICollectionStore = CollectionStore;

const COLLECTIONS_KEY = Symbol("collections");

export function setCollectionStoreContext(supabase: Supabase) {
	return setContext(COLLECTIONS_KEY, new CollectionStore(supabase)) as ICollectionStore;
}

export function getCollectionStoreContext() {
	return getContext<ICollectionStore>(COLLECTIONS_KEY);
}
