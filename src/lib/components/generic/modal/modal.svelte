<script lang="ts">
	import portal from "$lib/utility/svelte/portal";
	import type { WithChildren } from "$lib/utility/svelte/types";
	import { setContext } from "svelte";

	interface Props extends WithChildren {
		isOpen: boolean;
		setClose: () => void;
	}

	let props: Props = $props();
	let cardElement: HTMLDivElement | undefined = $state();

	setContext("closeModal", props.setClose);

	const handleOutOfBoundsClick = (event: MouseEvent | TouchEvent) => {
		if (!cardElement) return;

		event.stopPropagation();

		const target = event.target as Node;
		if (cardElement && !cardElement.contains(target)) {
			props.setClose();
		}
	};
</script>

{#if props.isOpen}
	<div class="fixed fill-screen col-centred just-center" use:portal>
		<div class="card col-centred pad-32" bind:this={cardElement}>
			{@render props.children()}
		</div>
		<div class="fixed filter-layer fill-screen pad-16" aria-hidden={true} onclick={handleOutOfBoundsClick}></div>
	</div>
{/if}

<style>
	.fixed {
		position: fixed;
		top: 0;
		left: 0;
	}

	.card {
		min-height: 128px;
		height: auto;
		width: 85%;
		background: var(--surface0);
		border-radius: var(--size16);
		z-index: 50;
	}

	.filter-layer {
		background: var(--overlay2);
		opacity: 0.55;
		z-index: 49;
		pointer-events: all;
		filter: saturate(0);
	}
</style>
