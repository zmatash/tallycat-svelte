export type ResultSuccess<T> = {
	success: true;
	data: T;
};

export type ResultError = {
	success: false;
	error: Error;
};

interface ResponseType<T, U extends Error> {
	error: U | null;
	data: T | null;
}

export type Result<T> = ResultSuccess<T> | ResultError;
export type ResultPromise<T> = Promise<Result<T>>;

export function createResult<T, U extends Error>(response: ResponseType<T, U>): Result<T> {
	if (response.error) {
		return { success: false, error: response.error };
	}
	return { success: true, data: response.data as T };
}
