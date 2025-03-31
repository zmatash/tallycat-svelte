<script lang="ts">
	import type { CollectionState } from "$lib/utility/state/collection-helpers";
	import CardButton from "../card-button.svelte";

	import styles from "../../style/modules/card.module.css";
	import Card from "../card.svelte";

	interface Props {
		collection: CollectionState;
		focusInput?: boolean;
		onNameBlur: (id: number, value: string) => void;
		selected?: boolean;
		editable?: boolean;
		onClick?: (id: number) => void;
	}

	let props: Props = $props();
	let inputRef: HTMLInputElement | undefined = $state(undefined);

	const editable = $state(props.editable ?? false);
	let name = $state(props.collection.name);

	$effect(() => {
		if (!inputRef) return;

		if (props.focusInput || editable) {
			inputRef.focus();
			inputRef.select();
		}
	});

	const handleEvent = () => props.onNameBlur(props.collection.id, name);
</script>

{#snippet Collection()}
	<img
		alt="collection icon"
		src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png"
	/>
	<div class="wrapper">
		{#if editable}
			<form class="name-container" onsubmit={() => inputRef?.blur()}>
				<input bind:this={inputRef} type="text" class="name-span" bind:value={name} onblur={handleEvent} />
			</form>
		{:else}
			<div class="name-container">
				<span class="name-span">{props.collection.name}</span>
			</div>
		{/if}

		<span class="counter-span">{props.collection.memberCount} Counters</span>
	</div>
{/snippet}

{#if editable}
	<Card class={`row-centred gap-16 pad-16 ${styles["collection-card"]}`} selected={props.selected}>
		<Collection />
	</Card>
{:else}
	<CardButton
		class={`row-centred gap-16 pad-16 ${styles["collection-card"]}`}
		selected={props.selected}
		onClick={() => props.onClick?.(props.collection.id)}
		ariaLabel={`Go to ${props.collection.name}`}
		buttonType="button"
	>
		<Collection />
	</CardButton>
{/if}

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
		background: var(--surface0);
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

	.name-container > input,
	.name-container > span {
		font-size: var(--size24);
		font-weight: 500;
		color: var(--subtext0);
	}
</style>
