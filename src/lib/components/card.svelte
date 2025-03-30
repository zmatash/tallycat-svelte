<script lang="ts">
	import type { WithChildren } from "$lib/utility/svelte/types";

	interface Props extends WithChildren {
		class?: string;
		selected?: boolean;
	}

	let props: Props = $props();
</script>

<div class={[`card ${props.class}`, { active: props.selected === true }]}>
	{@render props.children()}
</div>

<style>
	.card {
		background: var(--surface0);
		border: 3px solid transparent;
	}

	.active {
		border: 3px solid var(--blue);
	}
</style>
