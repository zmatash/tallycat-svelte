import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "./generated/database-types";

export interface SupabaseAccess {
	client: SupabaseClient<Database>;
	user: User;
}

export type CollectionRow = Database["public"]["Tables"]["collections"]["Row"];
export type CounterRow = Database["public"]["Tables"]["counters"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export interface ValidationArray<T> {
	validator: (value: T) => boolean;
	errorMessage: string;
}

export type PartialWithRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type PartialWithId<T extends { id: number | string }> = Partial<T> & { id: T["id"] };
