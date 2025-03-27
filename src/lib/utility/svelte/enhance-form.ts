import { applyAction } from "$app/forms";
import type { ActionResult } from "@sveltejs/kit";

interface FormSubmission {
	action: URL;
	formData: FormData;
	formElement: HTMLFormElement;
	controller: AbortController;
	submitter: HTMLElement | null;
	cancel: () => void;
}

interface ActionFailure<T> {
	type: "failure";
	status: number;
	data?: T;
}

interface ActionSuccess<T> {
	type: "success";
	status: number;
	data?: T;
}

interface ActionRedirect {
	type: "redirect";
	status: number;
	location: string;
}

interface ActionError {
	type: "error";
	status?: number;
	error: any;
}

interface PostReponse {
	result: ActionResult;
	update: () => void;
}

interface useFormProps {
	predicateSubmit?: (post: FormSubmission) => boolean;
	onFailure?: (post: FormSubmission, response: ActionFailure<any>) => void;
	onSuccess?: (post: FormSubmission, response: ActionSuccess<any>) => void;
	onRedirect?: (post: FormSubmission, response: ActionRedirect) => void;
	onError?: (post: FormSubmission, response: ActionError) => void;
	applyAction?: boolean;
}

export function enhanceForm(props: useFormProps) {
	return (submission: FormSubmission) => {
		if (props.predicateSubmit) {
			if (!props.predicateSubmit(submission)) {
				return submission.cancel();
			}
		}

		return async (response: PostReponse) => {
			let apply = props.applyAction ?? true;

			if (response.result.type === "failure") {
				if (props.onFailure) {
					props.onFailure(submission, response.result);
				}
			} else if (response.result.type === "success") {
				if (props.onSuccess) {
					props.onSuccess(submission, response.result);

					if (apply) {
						await applyAction(response.result);
					}
				} else {
					response.update();
				}
			} else if (response.result.type === "redirect") {
				if (props.onRedirect) {
					props.onRedirect(submission, response.result);

					if (apply) {
						await applyAction(response.result);
					}
				} else {
					response.update();
				}
			}
		};
	};
}

// use:enhance={({ formElement, formData, action, cancel, submitter }) => {
//     // `formElement` is this `<form>` element
//     // `formData` is its `FormData` object that's about to be submitted
//     // `action` is the URL to which the form is posted
//     // calling `cancel()` will prevent the submission
//     // `submitter` is the `HTMLElement` that caused the form to be submitted

//     return async ({ result, update }) => {
//         // `result` is an `ActionResult` object
//         // `update` is a function which triggers the default logic
//         // that would be triggered if this callback wasn't set
//     };
// }}
