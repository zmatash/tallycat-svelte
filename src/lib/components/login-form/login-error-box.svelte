<script lang="ts">
	import getSprite from "$lib/utility/sprite-helpers";

	interface Props {
		errorMessage: string | null;
	}
	let props: Props = $props();
</script>

<div class="placeholder">
	{#if props.errorMessage}
		<div class={["error-box row-centred corner-4 pad-8 gap-8", { inactive: !props.errorMessage }]}>
			<svg>
				<use href={getSprite("shield-alert")} />
			</svg>
			<span>{props.errorMessage}</span>
		</div>
	{/if}
</div>

<style>
	.placeholder {
		width: 100%;
		height: var(--size40);
	}

	.error-box {
		width: 100%;
		height: 100%;
		background: color-mix(in srgb, var(--red) 20%, transparent);
		border: 1px solid var(--red);
		overflow: hidden;
		color: var(--red);
	}

	.error-box svg {
		color: var(--red);
	}
</style>
