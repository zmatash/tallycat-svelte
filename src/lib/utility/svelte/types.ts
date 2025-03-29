import type { Snippet } from "svelte";

export interface WithChildren {
	children: Snippet<[]>;
}

export type CSSProp = string | Array<string | { [key: string]: boolean }>;
