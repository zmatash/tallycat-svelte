<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	import "$lib/style/defaults.css";
	import "$lib/style/fixed.css";
	import "$lib/style/reset.css";
	import "$lib/style/theme.css";
	import "$lib/style/utilities.css";

	let { data, children } = $props();
	let { session, client } = $derived({ session: data.supabase.session, client: data.supabase.client });

	onMount(() => {
		const { data } = client.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});
		return () => data.subscription.unsubscribe();
	});
</script>

{@render children()}
