<script lang="ts">
	interface Props {
		mode: "login" | "register";
	}

	let props: Props = $props();

	let buttonText = $derived(props.mode === "login" ? "Login" : "Register");
</script>

<button class="row-centred corner-4 just-center" type="submit">{buttonText}</button>

<style>
	button {
		width: 100%;
		height: var(--size48);
		background: linear-gradient(to right, var(--mauve) 0%, var(--pink) 100%);
		font-size: var(--size32);
		font-weight: 600;
	}
</style>
