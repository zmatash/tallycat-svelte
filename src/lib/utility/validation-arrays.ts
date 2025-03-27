import type { ValidationArray } from "$lib/common/types";

export const passwordValidationArray: ValidationArray<string>[] = [
	{ validator: (value) => value.length > 0, errorMessage: "Password cannot be empty" },
	{ validator: (value) => value.length > 6, errorMessage: "Password must be at least 8 characters long" }
];
export const emailValidationArray: ValidationArray<string>[] = [
	{ validator: (value) => value.length > 0, errorMessage: "Email cannot be empty" },
	{ validator: (value) => value.includes("@"), errorMessage: "Not a valid email format, no '@' symbol" }
];
