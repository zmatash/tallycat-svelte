export default function windowListener<T extends keyof WindowEventMap>(
	type: T | T[],
	fn: (event: WindowEventMap[T]) => void,
	options?: boolean | AddEventListenerOptions
) {
	const eventTypes = Array.isArray(type) ? type : [type];
	for (const eventType of eventTypes) {
		window.addEventListener(eventType, fn, options);
	}

	return () => {
		for (const eventType of eventTypes) {
			window.removeEventListener(eventType, fn, options);
		}
	};
}
