import type { CounterRow, PartialWithId } from "$lib/common/types";

export interface CounterState {
	value: number;
	id: number;
	name: string;
	index: number;
	collectionId: number;
}

function toRow(counter: CounterState): CounterRow {
	return {
		id: counter.id,
		name: counter.name,
		value: counter.value,
		position: counter.index,
		collection_id: counter.collectionId
	};
}

function toRowPartial(counter: PartialWithId<CounterState>): PartialWithId<CounterRow> {
	return {
		id: counter.id,
		name: counter.name,
		value: counter.value,
		position: counter.index
	};
}

function toRowOmitId(counter: Omit<CounterState, "id">): Omit<CounterRow, "id"> {
	return {
		name: counter.name,
		value: counter.value,
		position: counter.index,
		collection_id: counter.collectionId
	};
}

function fromRow(counter: CounterRow): CounterState {
	return {
		id: counter.id,
		name: counter.name,
		value: counter.value,
		index: counter.position,
		collectionId: counter.collection_id
	};
}

export const counterState = {
	toRow,
	toRowPartial,
	toRowOmitId,
	fromRow
} as const;
