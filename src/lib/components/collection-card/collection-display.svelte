<script lang="ts">
	import type { CollectionState } from "$lib/utility/state/collection";

	interface Props {
		collection: CollectionState;
	}

	let props: Props = $props();
</script>

<button aria-label={`${props.collection.name} Collection`} type="button" class="col-centred just-center gap-8">
	<img
		alt="collection icon"
		src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png"
	/>
	<div>
		<span class="name-span">{props.collection.name}</span>
		<span class="counter-span">{props.collection.memberCount} Counters</span>
	</div>
</button>

<style>
	button {
		border-radius: var(--size16);
		background: var(--surface0);
		width: 100%;
		aspect-ratio: 1.2;
	}

	img {
		width: var(--size64);
		height: var(--size64);
	}

	.name-span {
		font-size: var(--size16);
		font-weight: 500;
	}

	.counter-span {
		font-size: var(--size16);
		color: var(--subtext0);
	}
</style>
