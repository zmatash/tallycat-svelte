<script lang="ts">
	interface Props {
		field: "email" | "password";
		onChange: (value: string) => void;
		hasError: boolean;
	}

	let props: Props = $props();

	const isInputHidden = $state(false);
	let type = $derived.by(() => {
		if (props.field === "email") {
			return "email";
		}
		if (isInputHidden) {
			return "password";
		}
		return "text";
	});
	const placeholder = props.field === "email" ? "Email" : "Password";
</script>

<div class={["input-container corner-4", { error: props.hasError }]}>
	<input
		aria-label={placeholder}
		name={props.field}
		class="pad-8"
		{type}
		{placeholder}
		onchange={(e) => props.onChange(e.currentTarget.value)}
	/>
</div>

<style>
	.input-container {
		background: var(--surface0);
		width: 100%;
		border: 1px solid transparent;
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
