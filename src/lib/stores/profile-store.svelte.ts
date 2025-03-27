import { profileRepository } from "$lib/repository/profile-repository";
import type { Result } from "$lib/utility/result";
import { profileState, type ProfileState } from "$lib/utility/state/profile";
import type { Supabase } from "$lib/utility/types/supabase";

let _profile: ProfileState | null = $state(null);

interface ProfileStore {
	profile: () => ProfileState | null;
	initialise: (supabase: Supabase) => Promise<Result<null>>;
	invalidate: () => void;
}

async function initialise(supabase: Supabase): Promise<Result<null>> {
	const result = await profileRepository.getProfile(supabase);
	if (!result.success) {
		return result;
	}
	_profile = profileState.fromRow(result.data);
	return { success: true, data: null };
}

function invalidate() {
	_profile = null;
}

function profile() {
	return _profile;
}

export const profileStore: ProfileStore = {
	profile,
	initialise,
	invalidate
} as const;
