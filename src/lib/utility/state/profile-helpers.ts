import type { ProfileRow } from "$lib/common/types";

export interface ProfileState {
	activeCollection: number | null;
}

function fromRow(row: ProfileRow): ProfileState {
	return {
		activeCollection: row.active_collection
	};
}

function toRowPartial(update: Partial<ProfileState>): Partial<ProfileRow> {
	return {
		active_collection: update.activeCollection
	};
}

export const profileHelpers = {
	fromRow,
	toRowPartial
} as const;
