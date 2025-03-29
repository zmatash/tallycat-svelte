<script lang="ts">
	import { goto } from "$app/navigation";
	import type { CollectionState } from "$lib/utility/state/collection";
	import Card from "../card.svelte";

	import styles from "./card.module.css";

	interface Props {
		collection: CollectionState;
	}

	let props: Props = $props();

	const onClick = () => {
		goto(`/app/collections/${props.collection.id}`);
	};

	let name = $state(props.collection.name);
</script>

<Card class={`row-centred gap-16 pad-16 ${styles["collection-card"]}`}>
	<img
		alt="collection icon"
		src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png"
	/>
	<div class="wrapper">
		<div class="name-container">
			<input type="text" class="name-span" bind:value={name} />
		</div>
		<span class="counter-span">{props.collection.memberCount} Counters</span>
	</div>
</Card>

<style>
	.wrapper {
		justify-content: start;
		align-items: start;
		height: var(--size72);
		flex-direction: column;
		display: flex;
		justify-content: space-evenly;
	}

	.name-container {
		height: var(--size24);
	}

	.counter-span {
		font-size: var(--size16);
		color: var(--subtext0);
		text-align: start;
	}

	img {
		width: var(--size72);
		height: var(--size72);
	}

	input {
		font-size: var(--size24);
		font-weight: 500;
		color: var(--subtext0);
	}
</style>
