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
	class={`col-centred just-center gap-8 ${styles["collection-card"]}`}
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
</CardButton>

<style>
	svg {
		width: var(--size40);
		height: var(--size40);
	}

	.icon-container {
		background: var(--surface1);
		border-radius: 50%;
		width: var(--size72);
		height: var(--size72);
	}
</style>
