import isElementTabbable from "./isElementTabbable.js";

/**
 * Returns the tabbable elements within the provided HTMLElement.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { Array<HTMLElement> } the tabbable elements
 */
const getTabbableElements = (el: HTMLElement): Array<HTMLElement> => {
	return getTabbables(el.tagName === "SLOT" ? [el] : [...el.children]);
};

/**
 * Returns the last tabbable element within the provided HTMLElement.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { HTMLElement | null } the last tabbable element or "null" if not found
 */
const getLastTabbableElement = (el: HTMLElement): HTMLElement | null => {
	const tabbables = getTabbables([...el.children]);
	return tabbables.length ? tabbables[tabbables.length - 1] : null;
};

const getTabbables = (nodes: Array<Node>, tabbables?: Array<HTMLElement>): Array<HTMLElement> => {
	const tabbableElements = tabbables || [];

	if (!nodes) {
		return tabbableElements;
	}

	nodes.forEach(currentNode => {
		if (currentNode.nodeType === Node.TEXT_NODE || currentNode.nodeType === Node.COMMENT_NODE) {
			return;
		}

		const currentElement = currentNode as HTMLElement;
		if (currentElement.hasAttribute("data-sap-no-tab-ref")) {
			return;
		}

		if (isElementTabbable(currentElement)) {
			tabbableElements.push(currentElement);
		}

		if (currentElement.tagName === "SLOT") {
			getTabbables((currentElement as HTMLSlotElement).assignedElements(), tabbableElements);
		} else {
			const children = currentElement.shadowRoot ? currentElement.shadowRoot.children : currentElement.children;
			getTabbables([...children], tabbableElements);
		}
	});

	return tabbableElements;
};

export {
	getTabbableElements,
	getLastTabbableElement,
};
