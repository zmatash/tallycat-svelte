<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ValidationArray } from "$lib/common/types";
	import windowListener from "$lib/utility/listeners";
	import { enhanceForm } from "$lib/utility/svelte/enhance-form";
	import LoginButton from "./login-action-button.svelte";
	import LoginErrorBox from "./login-error-box.svelte";
	import LoginField from "./login-field.svelte";

	interface Props {
		actions: {
			login: string;
			register: string;
		};
		submitionRules?: {
			login: {
				email: ValidationArray<string>[];
				password: ValidationArray<string>[];
			};
			register: {
				email: ValidationArray<string>[];
				password: ValidationArray<string>[];
			};
		};
		serverError: string | null;
	}

	let props: Props = $props();

	const mode: "login" | "register" = $state("login");
	let headerText = $derived(mode === "login" ? "Sign In" : "Sign Up");

	let email = $state<string>("");
	let password = $state<string>("");

	let emailError: string | null = $state(null);
	let passwordError: string | null = $state(null);
	let formError: string | null = $state(props.serverError);

	$effect(() => {
		if (emailError || passwordError || formError) {
			return windowListener(["mousedown", "keydown", "touchstart"], () => {
				emailError = null;
				passwordError = null;
				formError = null;
			});
		}
		return;
	});

	const clientSideValidation = () => {
		if (!props.submitionRules) return true;

		for (const rule of props.submitionRules[mode].email) {
			if (!rule.validator(email)) {
				emailError = rule.errorMessage;
				return false;
			}
		}
		for (const rule of props.submitionRules[mode].password) {
			if (!rule.validator(password)) {
				passwordError = rule.errorMessage;
				return false;
			}
		}
		return true;
	};
</script>

<div class="container gap-16">
	<span class="form-title">{headerText}</span>
	<LoginErrorBox errorMessage={emailError || passwordError || formError} />
	<form
		action={props.actions[mode]}
		method="POST"
		use:enhance={enhanceForm({
			predicateSubmit: clientSideValidation,
			onFailure: (_, response) => {
				formError = response.data?.error || "An unknown error occurred";
			}
		})}
	>
		<LoginField field="email" hasError={!!emailError} onChange={(value) => (email = value)} />
		<LoginField field="password" hasError={!!passwordError} onChange={(value) => (password = value)} />
		<LoginButton {mode} />
	</form>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		background: var(--crust);
		padding: var(--size16);
	}

	.form-title {
		font-size: var(--size64);
		font-weight: bold;
	}

	form {
		gap: inherit;
	}
</style>
