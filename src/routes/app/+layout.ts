import { collectionStore } from "$lib/stores/collection-store.svelte";
import { profileStore } from "$lib/stores/profile-store.svelte";

export const load = async ({ parent }) => {
	const { supabase } = await parent();

	const subscription = supabase.client.auth.onAuthStateChange((_, newSession) => {
		if (newSession) {
			profileStore.initialise(supabase);
		} else {
			profileStore.invalidate();
		}
	}).data.subscription;

	collectionStore.initialise(supabase);

	return {
		supabase,
		dispose: () => subscription.unsubscribe()
	};
};
