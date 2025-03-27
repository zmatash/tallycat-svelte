<script lang="ts">
	import getSprite from "$lib/utility/sprite-helpers";

	interface Props {
		field: "email" | "password";
		onChange: (value: string) => void;
		hasError: boolean;
	}

	let props: Props = $props();

	let isInputHidden = $state(true);
	let type = $derived(props.field === "email" ? "email" : isInputHidden ? "password" : "text");
	const placeholder = props.field === "email" ? "Email" : "Password";
</script>

<div class={["input-container corner-4 row-centred just-between gap-8", { error: props.hasError }]}>
	<svg>
		<use href={getSprite(props.field === "email" ? "mail" : "lock-keyhole")} />
	</svg>
	<input
		aria-label={placeholder}
		name={props.field}
		{type}
		{placeholder}
		onchange={(e) => props.onChange(e.currentTarget.value)}
	/>
	{#if props.field === "password"}
		<button
			type="button"
			onclick={() => (isInputHidden = !isInputHidden)}
			aria-label={isInputHidden ? "Show" : "Hide"}
		>
			<svg>
				<use href={getSprite(isInputHidden ? "eye" : "eye-off")} />
			</svg>
		</button>
	{/if}
</div>

<style>
	.input-container {
		background: var(--surface0);
		width: 100%;
		border: 1px solid transparent;
		padding: 0 8px;
	}

	/* Border itself must be set in the parent to avoid a layout shift */
	.error {
		border-color: var(--red);
	}

	input {
		height: var(--size48);
		width: 100%;
		font-size: var(--size24);
	}
</style>
