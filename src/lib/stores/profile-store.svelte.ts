import type { ProfileRow } from "$lib/common/types";
import { profileRepository } from "$lib/repository/profile-repository";
import type { Result } from "$lib/utility/result";
import { profileHelpers, type ProfileState } from "$lib/utility/state/profile-helpers";
import type { Supabase } from "$lib/utility/types/supabase";
import { getContext, setContext } from "svelte";

export class ProfileStore {
	private supabase: Required<Supabase>;
	profile: ProfileState | null = $state(null);

	constructor(supabase: Supabase) {
		this.supabase = supabase;
		if (!this.supabase.user) {
			throw new Error("Not logged in");
		}
	}

	dataToState(data: ProfileRow) {
		this.profile = profileHelpers.fromRow(data);
	}

	async updateProfile(update: Partial<ProfileState>): Promise<Result<null>> {
		if (!this.profile) {
			return { success: false, error: new Error("Profile not found") };
		}

		const originalState = this.profile;
		const row = profileHelpers.toRowPartial(update);
		this.profile = { ...this.profile, ...update };

		const result = await profileRepository.updateProfile(this.supabase, row);
		if (result.success) {
			return result;
		}

		this.profile = originalState;
		return result;
	}
}

export type IProfileStore = ProfileStore;

const PROFILE_KEY = Symbol("profile");

export function setProfileStoreContext(supabase: Supabase): IProfileStore {
	return setContext(PROFILE_KEY, new ProfileStore(supabase));
}

export function getProfileStoreContext() {
	return getContext<IProfileStore>(PROFILE_KEY);
}
