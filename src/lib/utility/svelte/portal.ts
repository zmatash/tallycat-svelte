function portal(element: HTMLElement, target: string = "body") {
	const targetElement = document.querySelector(target);
	if (targetElement) {
		targetElement.appendChild(element);
	}

	return {
		destroy() {
			element?.remove();
		}
	};
}

export default portal;
