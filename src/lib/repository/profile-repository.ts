import type { ProfileRow } from "$lib/common/types";
import { createResult, type ResultPromise } from "$lib/utility/result";
import type { Supabase } from "$lib/utility/types/supabase";

interface ProfileRepository {
	getProfile: (supabase: Supabase) => ResultPromise<ProfileRow>;
	getValidActiveCollection: (supabase: Supabase) => ResultPromise<number | null>;
	updateProfile: (supabase: Supabase, updatedProfile: Partial<ProfileRow>) => ResultPromise<null>;
}

async function getProfile(supabase: Supabase): ResultPromise<ProfileRow> {
	if (!supabase.user) return { success: false, error: new Error("Not logged in") };
	const response = await supabase.client.from("profiles").select("*").eq("id", supabase.user.id).single();
	return createResult(response);
}

async function getValidActiveCollection(supabase: Supabase): ResultPromise<number | null> {
	if (!supabase.user) return { success: false, error: new Error("Not logged in") };
	const response = await supabase.client.rpc("get_valid_active_collection", { profile_id: supabase.user.id });
	return createResult(response);
}

async function updateProfile(supabase: Supabase, updatedProfile: Partial<ProfileRow>): ResultPromise<null> {
	if (!supabase.user) return { success: false, error: new Error("Not logged in") };
	const response = await supabase.client.from("profiles").update(updatedProfile).eq("id", supabase.user.id);
	return createResult(response);
}

export const profileRepository: ProfileRepository = {
	getProfile,
	getValidActiveCollection,
	updateProfile
} as const;
