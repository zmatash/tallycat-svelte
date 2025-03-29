<script lang="ts">
	import type { CollectionState } from "$lib/utility/state/collection";
	import Card from "../card.svelte";

	import styles from "./card.module.css";

	interface Props {
		collection: CollectionState;
		focusInput?: boolean;
		onNameBlur: (id: number, value: string) => void;
		eventCapture: "change" | "blur";
		selected?: boolean;
	}

	let props: Props = $props();
	let inputRef: HTMLInputElement | undefined = $state(undefined);
	let name = $state(props.collection.name);

	$effect(() => {
		if (props.focusInput && inputRef) {
			inputRef.focus();
			inputRef.select();
		}
	});

	const handleEvent = () => props.onNameBlur(props.collection.id, name);
</script>

<Card class={styles["collection-card"]} selected={props.selected}>
	<img
		alt="collection icon"
		src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png"
	/>
	<div class="wrapper">
		<div class="name-container">
			<input bind:this={inputRef} type="text" class="name-span" bind:value={name} onblur={handleEvent} />
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
