<script lang="ts">
	import type { CounterState } from "$lib/utility/state/counter";
	import Card from "../card.svelte";

	import getSprite from "$lib/utility/sprite-helpers";
	import styles from "../../style/modules/card.module.css";

	interface Props {
		counter: CounterState;
		updateCounter: (id: number, value: number) => void;
	}

	let props: Props = $props();

	let inputRef: HTMLInputElement | undefined = $state(undefined);

	const onFocus = () => inputRef?.select();
	const onIncrement = () => props.updateCounter(props.counter.id, props.counter.value + 1);
	const onDecrement = () => props.updateCounter(props.counter.id, props.counter.value - 1);
	const onBlur = () => {
		if (!inputRef) return;
		props.updateCounter(props.counter.id, Number(inputRef.value));
	};
</script>

<Card class={`row-centred just-between gap-16 ${styles["collection-card"]}`}>
	<button
		type="button"
		class="counter-button button-decrement col-centred just-center"
		aria-label="Decrement"
		onclick={onDecrement}
	>
		<svg>
			<title>Minus</title>
			<use href={getSprite("minus")} />
		</svg>
	</button>

	<form class="fill-parent col-centred just-evenly pad-8" onsubmit={() => inputRef?.blur()}>
		<label for="counter-value">{props.counter.name}</label>
		<input
			id="counter-value"
			type="number"
			value={props.counter.value}
			bind:this={inputRef}
			onfocus={onFocus}
			onblur={onBlur}
		/>
	</form>

	<button
		type="button"
		class="counter-button button-increment col-centred just-center"
		aria-label="Increment"
		onclick={onIncrement}
	>
		<svg>
			<title>Plus</title>
			<use href={getSprite("plus")} />
		</svg>
	</button>
</Card>

<style>
	.counter-button {
		height: 100%;
		aspect-ratio: 1;
		flex-shrink: 0;
	}

	.button-decrement {
		background: linear-gradient(to left, var(--red), var(--maroon));
		border-radius: var(--size16) 0 0 var(--size16);
	}

	.button-increment {
		background: linear-gradient(to right, var(--green), var(--teal));
		border-radius: 0 var(--size16) var(--size16) 0;
	}

	input,
	label {
		font-size: var(--size24);
		text-align: center;
	}

	input {
		font-weight: 600;
	}

	label {
		font-weight: 500;
		color: var(--subtext1);
	}

	svg {
		height: var(--size56);
		width: var(--size56);
		color: var(--surface0);
	}
</style>
