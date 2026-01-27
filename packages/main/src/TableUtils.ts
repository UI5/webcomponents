import type TableRow from "./TableRow.js";

const isSelectionCell = (e: Event) => {
	return e.composedPath().some((el: EventTarget) => (el as HTMLElement).hasAttribute?.("data-ui5-table-selection-cell"));
};

const isHeaderSelectionCell = (e: Event) => {
	return isSelectionCell(e) && e.composedPath().some((el: EventTarget) => el instanceof HTMLElement && el.hasAttribute("ui5-table-header-row"));
};

const findRowInPath = (composedPath: Array<EventTarget>) => {
	return composedPath.find((el: EventTarget) => el instanceof HTMLElement && el.hasAttribute("ui5-table-row")) as TableRow;
};

const findVerticalScrollContainer = (element: HTMLElement): HTMLElement => {
	while (element) {
		const { overflowY } = window.getComputedStyle(element);
		if (overflowY === "auto" || overflowY === "scroll") {
			return element;
		}

		if (element.parentNode instanceof ShadowRoot) {
			element = element.parentNode.host as HTMLElement;
		} else {
			element = element.parentElement as HTMLElement;
		}
	}

	return document.scrollingElement as HTMLElement || document.documentElement;
};

const scrollElementIntoView = (scrollContainer: HTMLElement, element: HTMLElement, stickyElements: HTMLElement[], isRtl: boolean) => {
	if (stickyElements.length === 0) {
		return;
	}

	const elementRect = element.getBoundingClientRect();
	const inline = isRtl ? "right" : "left";

	const { x: stickyX, y: stickyY } = stickyElements.reduce(({ x, y }, stickyElement) => {
		const { top, [inline]: inlineStart } = getComputedStyle(stickyElement);
		const stickyElementRect = stickyElement.getBoundingClientRect();
		if (top !== "auto" && stickyElementRect.bottom > elementRect.top) {
			y = Math.max(y, stickyElementRect.bottom);
		}
		if (inlineStart !== "auto") {
			if (!isRtl && stickyElementRect.right > elementRect.left) {
				x = Math.max(x, stickyElementRect.right);
			} else if (isRtl && stickyElementRect.left < elementRect.right) {
				x = Math.min(x, stickyElementRect.left);
			}
		}

		return { x, y };
	}, { x: elementRect[inline], y: elementRect.top });

	const scrollX = elementRect[inline] - stickyX;
	const scrollY = elementRect.top - stickyY;

	if (scrollX === 0 && scrollY === 0) {
		// avoid unnecessary scroll call, when nothing changes
		return;
	}

	scrollContainer.scrollBy({
		top: scrollY,
		left: scrollX,
	});
};

const isFeature = <T>(element: any, identifier: string): element is T => {
	return element.identifier === identifier;
};

const throttle = (callback: () => void) => {
	let timer: number;
	return () => {
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(() => {
			callback();
		});
	};
};

const toggleAttribute = (element: HTMLElement, attribute: string, condition: boolean | undefined, value?: string) => {
	if (condition) {
		if (value === undefined) {
			element.toggleAttribute(attribute, true);
		} else {
			element.setAttribute(attribute, value);
		}
	} else if (element.hasAttribute(attribute)) {
		element.removeAttribute(attribute);
	}
};

/**
 * Checks if a given width is valid for a column.
 *
 * @param width Width string to check
 * @returns {boolean} true if the width is valid, false otherwise
 */
const isValidColumnWidth = (width: string | undefined): width is string => {
	const element = document.createElement("div");
	element.style.width = `max(3rem, ${width})`;
	return element.style.width !== "";
};

export {
	isSelectionCell,
	isHeaderSelectionCell,
	findRowInPath,
	findVerticalScrollContainer,
	scrollElementIntoView,
	isFeature,
	throttle,
	toggleAttribute,
	isValidColumnWidth,
};
