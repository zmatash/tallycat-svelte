import { collectionRepository } from "$lib/repository/collection-repository";
import { profileRepository } from "$lib/repository/profile-repository";
import type { LayoutLoad } from "./$types";

export const load = (async (request) => {
	const data = await request.parent();

	const profileData = profileRepository.getProfile(data.supabase);
	const collectionsData = collectionRepository.getCollections(data.supabase);

	return {
		profileData,
		collectionsData
	};
}) satisfies LayoutLoad;
