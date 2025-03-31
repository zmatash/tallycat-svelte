<script lang="ts">
	import type { CounterState } from "$lib/utility/state/counter-helpers";
	import Card from "../card.svelte";

	import type { PartialWithId } from "$lib/common/types";
	import getSprite from "$lib/utility/sprite-helpers";
	import styles from "../../style/modules/card.module.css";

	interface Props {
		counter: CounterState;
		update: (update: PartialWithId<CounterState>) => void;
	}

	let props: Props = $props();

	let valueInputRef: HTMLInputElement | undefined = $state(undefined);

	const onValueFocus = () => valueInputRef?.select();
	const onIncrement = () => props.update?.({ id: props.counter.id, value: props.counter.value + 1 });
	const onDecrement = () => props.update?.({ id: props.counter.id, value: props.counter.value - 1 });
	const onBlur = () => props.update?.({ id: props.counter.id, value: Number(valueInputRef!.value) });
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

	<form class="fill-parent col-centred just-evenly pad-8" onsubmit={() => valueInputRef?.blur()}>
		<span>{props.counter.name}</span>
		<input
			aria-label="Counter Value"
			type="number"
			value={props.counter.value}
			bind:this={valueInputRef}
			onfocus={onValueFocus}
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
	span {
		font-size: var(--size24);
		text-align: center;
		width: 100%;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	input {
		font-weight: 500;
	}

	svg {
		height: var(--size56);
		width: var(--size56);
		color: var(--surface0);
	}
</style>
