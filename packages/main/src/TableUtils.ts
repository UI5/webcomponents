import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import type Table from "./Table.js";
import type TableRow from "./TableRow.js";

const isInstanceOfTable = createInstanceChecker<Table>("isTable");

const isSelectionCell = (e: Event) => {
	return e.composedPath().some((el: EventTarget) => (el as HTMLElement).hasAttribute?.("data-ui5-table-selection-cell"));
};

const isHeaderSelectionCell = (e: Event) => {
	return isSelectionCell(e) && e.composedPath().some((el: EventTarget) => el instanceof HTMLElement && el.hasAttribute("ui5-table-header-row"));
};

const findRowInPath = (composedPath: Array<EventTarget>) => {
	return composedPath.find((el: EventTarget) => el instanceof HTMLElement && el.hasAttribute("ui5-table-row")) as TableRow;
};

const findVerticalScrollContainer = (element: HTMLElement, requireOverflow = false): HTMLElement => {
	while (element) {
		const { overflowY } = window.getComputedStyle(element);
		if ((overflowY === "auto" || overflowY === "scroll") && (!requireOverflow || element.scrollHeight > element.clientHeight)) {
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

type Axis = "x" | "y";

const AXIS_PROPS = {
	x: { start: "left", end: "right", size: "width" },
	y: { start: "top", end: "bottom", size: "height" },
} as const;

// Computes the scroll delta needed to bring an element into view within a scroll container, considering sticky elements that may be in the way
const computeAxisScrollDelta = (
	element: HTMLElement,
	scrollContainer: HTMLElement,
	stickyElements: HTMLElement[],
	axis: Axis,
): number => {
	const { start, end, size } = AXIS_PROPS[axis];
	const elementRect = element.getBoundingClientRect();
	const scrollContainerRect = scrollContainer.getBoundingClientRect();

	let pinStart = 0;
	let pinEnd = 0;
	stickyElements.forEach(sticky => {
		if (sticky === element || sticky.contains(element)) {
			return;
		}

		const stickyStyle = getComputedStyle(sticky);
		const stickyRect = sticky.getBoundingClientRect();
		if (stickyStyle[start] !== "auto") {
			pinStart = Math.max(pinStart, stickyRect[end] - scrollContainerRect[start]);
		}
		if (stickyStyle[end] !== "auto") {
			pinEnd = Math.max(pinEnd, scrollContainerRect[end] - stickyRect[start]);
		}
	});

	const viewportStart = scrollContainerRect[start] + pinStart;
	const viewportEnd = scrollContainerRect[end] - pinEnd;

	// Element already spans the whole container
	if (elementRect[start] <= scrollContainerRect[start] && elementRect[end] >= scrollContainerRect[end]) {
		return 0;
	}
	// Element larger than the visible viewport
	if (elementRect[size] > viewportEnd - viewportStart) {
		return (axis === "x" && element.matches(":dir(rtl)")) ? elementRect[end] - viewportEnd : elementRect[start] - viewportStart;
	}
	if (elementRect[start] < viewportStart) {
		return elementRect[start] - viewportStart;
	}
	if (elementRect[end] > viewportEnd) {
		return elementRect[end] - viewportEnd;
	}
	return 0;
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
	isInstanceOfTable,
	isSelectionCell,
	isHeaderSelectionCell,
	findRowInPath,
	findVerticalScrollContainer,
	computeAxisScrollDelta,
	isFeature,
	throttle,
	toggleAttribute,
	isValidColumnWidth,
};
