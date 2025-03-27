export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			collection_id: {
				Row: {
					active_collection: number | null;
				};
				Insert: {
					active_collection?: number | null;
				};
				Update: {
					active_collection?: number | null;
				};
				Relationships: [];
			};
			collections: {
				Row: {
					id: number;
					member_count: number;
					name: string;
					position: number;
					user_id: string;
				};
				Insert: {
					id?: number;
					member_count?: number;
					name?: string;
					position: number;
					user_id?: string;
				};
				Update: {
					id?: number;
					member_count?: number;
					name?: string;
					position?: number;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "groups_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
			counters: {
				Row: {
					collection_id: number;
					id: number;
					name: string;
					position: number;
					value: number;
				};
				Insert: {
					collection_id: number;
					id?: number;
					name: string;
					position?: number;
					value?: number;
				};
				Update: {
					collection_id?: number;
					id?: number;
					name?: string;
					position?: number;
					value?: number;
				};
				Relationships: [
					{
						foreignKeyName: "counters_group_id_fkey";
						columns: ["collection_id"];
						isOneToOne: false;
						referencedRelation: "collections";
						referencedColumns: ["id"];
					}
				];
			};
			profiles: {
				Row: {
					active_collection: number | null;
					id: string;
				};
				Insert: {
					active_collection?: number | null;
					id?: string;
				};
				Update: {
					active_collection?: number | null;
					id?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			create_user: {
				Args: Record<PropertyKey, never>;
				Returns: undefined;
			};
			get_valid_active_collection: {
				Args: {
					profile_id: string;
				};
				Returns: number;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
