import type { Database } from "$lib/common/generated/database-types";
import { profileRepository } from "$lib/repository/profile-repository";
import type { SupabaseClient } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
	login: async ({ request, locals }) => {
		const formdata = await request.formData();
		const email = String(formdata.get("email"));
		const password = String(formdata.get("password"));

		if (!email) return fail(400, { error: "Email is required", email });
		if (!password) return fail(400, { error: "Password is required", email });

		const { supabase }: { supabase: SupabaseClient<Database> } = locals;
		const response = await supabase.auth.signInWithPassword({ email, password });

		if (response.error) {
			return fail(response.error.status || 400, {
				error: response.error.message,
				email
			});
		}

		const activeCollectionIdResult = await profileRepository.getValidActiveCollection({
			client: supabase,
			user: response.data.user,
			session: response.data.session
		});

		if (!activeCollectionIdResult.success || activeCollectionIdResult.data === null) {
			throw redirect(302, "app/collections");
		}

		throw redirect(302, `app/collections/${activeCollectionIdResult.data}`);
	}
} satisfies Actions;
