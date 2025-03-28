<script lang="ts">
	import type { WithChildren } from "$lib/utility/svelte/types";

	interface Props extends WithChildren {
		class?: string;
		buttonType: "button" | "submit" | "reset";
		ariaLabel: string;
		onClick?: () => void;
	}

	let props: Props = $props();
</script>

<button class={`card ${props.class}`} type={props.buttonType} aria-label={props.ariaLabel} onclick={props.onClick}>
	{@render props.children()}
</button>

<style>
	.card {
		border-radius: var(--size16);
		background: var(--surface0);
	}
</style>
