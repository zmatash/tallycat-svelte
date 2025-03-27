import { profileStore } from "$lib/stores/profile-store.svelte";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async (props) => {
	const { supabase } = await props.parent();

	const subscription = supabase.client.auth.onAuthStateChange((_, newSession) => {
		if (newSession) {
			profileStore.initialise(supabase);
		} else {
			profileStore.invalidate();
		}
	}).data.subscription;

	return {
		dispose: () => subscription.unsubscribe()
	};
};
