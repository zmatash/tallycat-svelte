<script lang="ts">
	import type { WithChildren } from "$lib/utility/svelte/types";

	interface Props extends WithChildren {
		class?: string;
		buttonType: "button" | "submit" | "reset";
		selected?: boolean;
		ariaLabel: string;
		onClick?: () => void;
	}

	let props: Props = $props();
</script>

<button
	class={[`row-centred gap-16 pad-16 card ${props.class}`, { active: props.selected === true }]}
	type={props.buttonType}
	aria-label={props.ariaLabel}
	onclick={props.onClick}
>
	{@render props.children()}
</button>

<style>
	.card {
		background: var(--surface0);
		border: 3px solid transparent;
	}

	.active {
		border: 3px solid var(--blue);
	}
</style>
