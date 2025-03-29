import type { CollectionRow, PartialWithId } from "$lib/common/types";

export interface CollectionState {
	id: number;
	name: string;
	memberCount: number;
	position: number;
}

function toRow(userId: string, collection: CollectionState): CollectionRow {
	return {
		id: collection.id,
		name: collection.name,
		member_count: collection.memberCount,
		position: collection.position,
		user_id: userId
	};
}

function toRowPartial(collection: PartialWithId<CollectionState>): PartialWithId<CollectionRow> {
	return {
		id: collection.id,
		name: collection.name,
		member_count: collection.memberCount,
		position: collection.position
	};
}

function toRowOmitId(collection: Omit<CollectionState, "id"> | CollectionState): Omit<CollectionRow, "id" | "user_id"> {
	return {
		name: collection.name,
		member_count: collection.memberCount,
		position: collection.position
	};
}

function fromRow(collection: CollectionRow): CollectionState {
	return {
		id: collection.id,
		name: collection.name,
		memberCount: collection.member_count,
		position: collection.position
	};
}

export const collectionState = {
	toRow,
	toRowPartial,
	toRowOmitId,
	fromRow
} as const;
