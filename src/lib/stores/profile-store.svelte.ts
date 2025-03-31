import { profileRepository } from "$lib/repository/profile-repository";
import type { Result } from "$lib/utility/result";
import { profileState, type ProfileState } from "$lib/utility/state/profile";
import type { Supabase } from "$lib/utility/types/supabase";

let _profile: ProfileState | null = $state(null);

interface IProfileStore {
	profile: ProfileState | null;
	initialise: (supabase: Supabase) => Promise<Result<null>>;
	invalidate: () => void;
	updateProfile: (supabase: Supabase, update: Partial<ProfileState>) => Promise<Result<null>>;
}

async function initialise(supabase: Supabase): Promise<Result<null>> {
	const result = await profileRepository.getProfile(supabase);
	if (!result.success) {
		return result;
	}
	_profile = profileState.fromRow(result.data);
	return { success: true, data: null };
}

async function updateProfile(supabase: Supabase, update: Partial<ProfileState>): Promise<Result<null>> {
	const orginalProfile = _profile;
	if (!orginalProfile) {
		return { success: false, error: new Error("Profile not found") };
	}

	const row = profileState.toRowPartial(update);
	_profile = { ...orginalProfile, ...update };

	const result = await profileRepository.updateProfile(supabase, row);
	if (!result.success) {
		_profile = orginalProfile;
		return result;
	}
	return { success: true, data: null };
}

function invalidate() {
	_profile = null;
}

export const profileStore: IProfileStore = {
	get profile() {
		return _profile;
	},
	initialise,
	invalidate,
	updateProfile
} as const;
