import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import type { Database } from "$lib/common/generated/database-types";
import type { Supabase } from "$lib/utility/types/supabase";
import { createBrowserClient, createServerClient, isBrowser } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export const load = async ({ data, depends, fetch }) => {
	depends("supabase:auth");

	let client: SupabaseClient<Database>;

	if (isBrowser()) {
		client = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			global: {
				fetch
			}
		});
	} else {
		client = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			global: {
				fetch
			},
			cookies: {
				getAll() {
					return data?.cookies ?? [];
				}
			}
		});
	}

	const session = (await client.auth.getSession()).data.session;
	const user = (await client.auth.getUser()).data.user;

	const supabase: Supabase = {
		client,
		session,
		user
	};
	return { supabase };
};
