<script lang="ts">
	import type { ValidationArray } from "$lib/common/types";
	import LoginForm from "$lib/components/login-form/login-form.svelte";

	const loginPasswordValidation: ValidationArray<string>[] = [
		{ validator: (value) => value.length > 0, errorMessage: "Password cannot be empty" }
	];
	const loginEmailValidation: ValidationArray<string>[] = [
		{ validator: (value) => value.length > 0, errorMessage: "Email cannot be empty" },
		{ validator: (value) => value.includes("@"), errorMessage: "Not a valid email format, no '@' symbol" }
	];
</script>

<LoginForm
	serverError={null}
	actions={{ login: "?/login", register: "?/register" }}
	submitionRules={{
		login: { email: loginEmailValidation, password: loginPasswordValidation },
		register: { email: loginEmailValidation, password: loginPasswordValidation }
	}}
/>
