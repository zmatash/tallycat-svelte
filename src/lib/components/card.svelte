<script lang="ts">
	import type { WithChildren } from "$lib/utility/svelte/types";

	interface Props extends WithChildren {
		class?: string;
	}

	let props: Props = $props();
</script>

<div class={`card ${props.class}`}>
	{@render props.children()}
</div>

<style>
	.card {
		border-radius: var(--size16);
		background: var(--surface0);
	}
</style>
