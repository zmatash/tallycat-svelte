import type { CounterRow, PartialWithId } from "$lib/common/types";
import { counterRepository } from "$lib/repository/counter-repository";
import type { Result } from "$lib/utility/result";
import { counterHelpers, type CounterState } from "$lib/utility/state/counter-helpers";
import type { Supabase } from "$lib/utility/types/supabase";
import { getContext, setContext } from "svelte";
import type { ICollectionStore } from "./collection-store.svelte";

class CounterStore {
	private supabase: Required<Supabase>;
	private tempId = -1;

	countersMap: Record<number, CounterState> = $state({});
	countersArray: CounterState[] = $derived(Object.values(this.countersMap).sort((a, b) => a.index - b.index));
	collectionId: number;

	constructor(
		supabase: Supabase,
		collectionId: number,
		private _collectionStore: ICollectionStore
	) {
		this.supabase = supabase;
		this.collectionId = collectionId;
		if (!this.supabase.user) {
			throw new Error("Not logged in");
		}
	}

	async dataToState(data: CounterRow[]) {
		const collectionMap: Record<number, CounterState> = {};
		for (const row of data) {
			collectionMap[row.id] = counterHelpers.fromRow(row);
		}
		this.countersMap = collectionMap;
	}

	async createCounter(name: string): Promise<Result<null>> {
		const tempState: CounterState = {
			id: --this.tempId,
			name,
			value: 0,
			index: this.countersArray.length,
			collectionId: this.collectionId
		};
		this.countersMap[tempState.id] = tempState;

		const result = await counterRepository.insertCounter(this.supabase, counterHelpers.toRowOmitId(tempState));
		if (result.success) {
			const realId = result.data.id;
			delete this.countersMap[tempState.id];
			this.countersMap[realId] = { ...tempState, id: realId };
			this._collectionStore.updateCollection({ id: this.collectionId, memberCount: this.countersArray.length });
			return { success: true, data: null };
		}

		delete this.countersMap[tempState.id];
		return result;
	}

	async removeCounter(id: number): Promise<Result<null>> {
		const counter = this.countersMap[id];
		if (!counter) {
			return { success: false, error: new Error(`Counter not found with id ${id}`) };
		}

		delete this.countersMap[id];
		const result = await counterRepository.deleteCounter(this.supabase, id);
		if (result.success) {
			return result;
		}
		this.countersMap[id] = counter;
		return result;
	}

	async updateCounter(update: PartialWithId<CounterState>): Promise<Result<null>> {
		const originalState = this.countersMap[update.id];
		if (!originalState) {
			return { success: false, error: new Error(`Counter not found with id ${update.id}`) };
		}

		const updatedCounter = { ...originalState, ...update };
		this.countersMap[updatedCounter.id] = updatedCounter;

		const result = await counterRepository.patchCounter(this.supabase, counterHelpers.toRowPartial(update));
		if (result.success) {
			return result;
		}

		this.countersMap[updatedCounter.id] = originalState;
		return result;
	}
}

export type ICounterStore = CounterStore;

const COUNTERS_KEY = Symbol("counters");

export function setCounterStoreContext(supabase: Supabase, collectionId: number, collectionStore: ICollectionStore) {
	return setContext(COUNTERS_KEY, new CounterStore(supabase, collectionId, collectionStore));
}

export function getCounterStoreContext() {
	return getContext<ICounterStore>(COUNTERS_KEY);
}
