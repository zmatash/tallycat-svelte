import type { Database } from "$lib/common/generated/database-types";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

export interface Supabase {
	client: SupabaseClient<Database>;
	session: Session | null;
	user: User | null;
}
