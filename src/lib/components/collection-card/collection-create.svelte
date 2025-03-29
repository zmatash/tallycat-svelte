<script lang="ts">
	import getSprite from "$lib/utility/sprite-helpers";
	import CardButton from "../card-button.svelte";

	import styles from "./card.module.css";

	interface Props {
		onClick: () => void;
	}

	let props: Props = $props();
</script>

<CardButton
	class={`row-centred gap-16 pad-16 ${styles["collection-card"]}`}
	ariaLabel="Create Collection"
	buttonType="button"
	onClick={props.onClick}
>
	<div class="icon-container col-centred just-center">
		<svg>
			<title>Plus</title>
			<use href={getSprite("plus")} />
		</svg>
	</div>
	<span>New Collection</span>
</CardButton>

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
</style>
