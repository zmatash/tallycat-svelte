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

	return {
		supabase,
		dispose: () => subscription.unsubscribe()
	};
};
