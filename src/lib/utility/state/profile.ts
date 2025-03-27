import type { ProfileRow } from "$lib/common/types";

export interface ProfileState {
	activeCollection: number | null;
}

function fromRow(row: ProfileRow): ProfileState {
	return {
		activeCollection: row.active_collection
	};
}

export const profileState = {
	fromRow
} as const;
