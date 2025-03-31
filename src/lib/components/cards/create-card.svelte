<script lang="ts">
	import getSprite from "$lib/utility/sprite-helpers";
	import styles from "../../style/modules/card.module.css";
	import CardButton from "../card-button.svelte";
	import Card from "../card.svelte";

	interface Props {
		onSubmit: (name: string) => void;
		label?: string;
		placeholderNewName?: string;
	}

	let props: Props = $props();

	let inputRef: HTMLInputElement | undefined = $state(undefined);

	let isCreating = $state(false);
	let name = $state(props.placeholderNewName ?? "New Card");

	$effect(() => {
		if (!inputRef) return;
		if (isCreating) {
			inputRef.focus();
			inputRef.select();
		}
	});

	const onBlur = () => {
		props.onSubmit(name);
		isCreating = false;
	};
</script>

{#if isCreating}
	<Card class={`row-centred gap-16 pad-16 ${styles["collection-card"]}`}>
		<form class="fill-parent" onsubmit={() => inputRef?.blur()}>
			<input class="fill-parent" bind:value={name} onblur={onBlur} bind:this={inputRef} />
		</form>
	</Card>
{:else}
	<CardButton
		class={`row-centred gap-16 pad-16 ${styles["collection-card"]}`}
		ariaLabel="Create Collection"
		buttonType="button"
		onClick={() => (isCreating = true)}
	>
		<div class={["icon-container col-centred just-center"]}>
			<svg>
				<title>Plus</title>
				<use href={getSprite("plus")} />
			</svg>
		</div>
		<span>{props.label ?? "New"}</span>
	</CardButton>
{/if}

<style>
	.icon-container {
		background: var(--surface1);
		border-radius: 50%;
		width: var(--size72);
		height: var(--size72);
	}

	svg {
		width: var(--size40);
		height: var(--size40);
	}

	span {
		font-size: var(--size24);
		font-weight: 500;
	}

	input {
		text-align: center;
		font-size: var(--size24);
	}
</style>
