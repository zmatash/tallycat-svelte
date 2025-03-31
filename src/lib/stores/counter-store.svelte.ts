import type { PartialWithId } from "$lib/common/types";
import { counterRepository } from "$lib/repository/counter-repository";
import type { Result } from "$lib/utility/result";
import { counterState, type CounterState } from "$lib/utility/state/counter";
import type { Supabase } from "$lib/utility/types/supabase";

export class CounterStore {
	private tempId = -1;
	private _isLoading: boolean = $state(true);
	private _counterMap: Record<number, CounterState> = $state({});
	private _counters: CounterState[] = $derived(Object.values(this._counterMap).sort((a, b) => a.index - b.index));
	collectionId: number;

	constructor(supabase: Supabase, collectionId: number) {
		this.collectionId = collectionId;
		this.initialise(supabase);
	}

	get counters() {
		return this._counters;
	}

	get isLoading() {
		return this._isLoading;
	}

	private async initialise(supabase: Supabase): Promise<Result<null>> {
		this._isLoading = true;

		const data = await counterRepository.getCounters(supabase, this.collectionId);
		if (!data.success) {
			this._isLoading = false;
			return data;
		}

		const collectionMap: Record<number, CounterState> = {};
		for (const row of data.data) {
			collectionMap[row.id] = counterState.fromRow(row);
		}
		this._counterMap = collectionMap;

		this._isLoading = false;
		return { success: true, data: null };
	}

	getCounter(id: number): CounterState | null {
		return this._counterMap[id] ?? null;
	}

	async updateCounter(supabase: Supabase, update: PartialWithId<CounterState>): Promise<Result<null>> {
		const user = supabase.user;
		if (!user) {
			return { success: false, error: new Error("Not logged in") };
		}

		const originalCounterState = this._counterMap[update.id];
		if (!originalCounterState) {
			return { success: false, error: new Error("Counter not found") };
		}

		const updatedCounter: CounterState = {
			...originalCounterState,
			...update
		};
		this._counterMap[updatedCounter.id] = updatedCounter;

		const row = counterState.toRowPartial(update);
		const result = await counterRepository.patchCounter(supabase, row);
		if (!result.success) {
			this._counterMap[updatedCounter.id] = originalCounterState;
			return result;
		}
		return result;
	}

	async addCounter(supabase: Supabase, name: string): Promise<Result<null>> {
		const user = supabase.user;
		if (!user) {
			return { success: false, error: new Error("Not logged in") };
		}

		const tempState: CounterState = {
			id: --this.tempId,
			name,
			value: 0,
			index: this._counters.length,
			collectionId: this.collectionId
		};
		this._counterMap[tempState.id] = tempState;

		const dbResult = await counterRepository.insertCounter(supabase, counterState.toRowOmitId(tempState));
		if (!dbResult.success) {
			delete this._counterMap[tempState.id];
			return dbResult;
		}

		const realId = dbResult.data.id;
		delete this._counterMap[tempState.id];
		this._counterMap[realId] = { ...tempState, id: realId };
		return { success: true, data: null };
	}

	async removeCounter(supabase: Supabase, id: number): Promise<Result<null>> {
		const user = supabase.user;
		if (!user) {
			return { success: false, error: new Error("Not logged in") };
		}

		const counter = this._counterMap[id];
		if (!counter) {
			return { success: false, error: new Error("Counter not found") };
		}
		delete this._counterMap[id];

		const result = await counterRepository.deleteCounter(supabase, id);
		if (!result.success) {
			this._counterMap[id] = counter;
			return result;
		}

		return result;
	}
}
