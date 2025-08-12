import type Table from "./Table.js";
import type TableRow from "./TableRow.js";
import type { AccessibilityInfo } from "@ui5/webcomponents-base";
import I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";

import {
	TABLE_ACC_STATE_EMPTY,
	TABLE_ACC_STATE_REQUIRED,
	TABLE_ACC_STATE_DISABLED,
	TABLE_ACC_STATE_READONLY,
	TABLE_CELL_CONTAINS,
	TABLE_CELL_SINGLE_CONTROL,
	TABLE_CELL_MULTIPLE_CONTROLS,
} from "./generated/i18n/i18n-defaults.js";

let invisibleText: HTMLElement;
const i18nBundle = new I18nBundle("@ui5/webcomponents/main");

const isInstanceOfTable = (obj: any): obj is Table => {
	return !!obj && "isTable" in obj && !!obj.isTable;
};

const isSelectionCheckbox = (e: Event) => {
	return e.composedPath().some((el: EventTarget) => (el as HTMLElement).hasAttribute?.("data-ui5-table-selection-component"));
};

const isHeaderSelector = (e: Event) => {
	return isSelectionCheckbox(e) && e.composedPath().some((el: EventTarget) => el instanceof HTMLElement && el.hasAttribute("ui5-table-header-row"));
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

/**
 * Manages an invisible text element for accessibility and associates it with the given element via `aria-labelledby`.
 *
 * - Ensures a single invisible text element with a specific ID exists in the DOM.
 * - Updates the text content of the invisible text element to the provided `texts`.
 * - Adds or removes the invisible text element's ID from the target element's `aria-labelledby` attribute.
 * - If no text is provided, disassociates the invisible text element from the target element.
 *
 * @param element The target HTMLElement to associate with the invisible text for accessibility.
 * @param texts An optional array of strings to be joined and set as the invisible text content.
 */
const updateInvisibleText = (element: HTMLElement, texts: string[] = [], joiner: string = " . ") => {
	const invisibleTextId = "ui5-table-invisible-text";
	if (!invisibleText || !invisibleText.isConnected) {
		invisibleText = document.createElement("span");
		invisibleText.id = invisibleTextId;
		invisibleText.ariaHidden = "true";
		invisibleText.style.display = "none";
		document.body.appendChild(invisibleText);
	}

	let ariaLabelledBy = (element.getAttribute("aria-labelledby") || "").split(" ").filter(Boolean);
	const invisibleTextAssociated = ariaLabelledBy.includes(invisibleTextId);

	const text = texts.filter(Boolean).join(joiner).trim();
	if (text && !invisibleTextAssociated) {
		ariaLabelledBy.push(invisibleTextId);
	} else if (!text && invisibleTextAssociated) {
		ariaLabelledBy = ariaLabelledBy.filter(id => id !== invisibleTextId);
	}

	invisibleText.textContent = text;
	if (ariaLabelledBy.length > 0) {
		element.setAttribute("aria-labelledby", ariaLabelledBy.join(" "));
	} else {
		element.removeAttribute("aria-labelledby");
	}
};

const checkVisibility = (element: HTMLElement): boolean => {
	return element.checkVisibility() || getComputedStyle(element).display === "contents";
};

const getDefaultAccessibilityChildren = (element: Node, _nodes: Node[] = []): Node[] => {
	element.childNodes.forEach(child => {
		if (child.nodeType === Node.TEXT_NODE) {
			_nodes.push(child);
		} else if (child instanceof HTMLElement) {
			if (child.localName === "slot") {
				const assignedNodes = (child as HTMLSlotElement).assignedNodes();
				_nodes.push(...assignedNodes);
				return;
			}
			if (!checkVisibility(child)) {
				return;
			}
			if (child.hasAttribute("data-ui5-acc-text") || "accessibilityInfo" in child) {
				_nodes.push(child);
			} else {
				getDefaultAccessibilityChildren(child, _nodes);
			}
		}
	});

	return _nodes;
};

const getAccessibilityDescription = (element: Node, details: boolean = true, _isRootElement: boolean = true): string => {
	if (element.nodeType === Node.TEXT_NODE) {
		return (element as Text).data.trim();
	}

	if (!(element instanceof HTMLElement)) {
		return "";
	}

	if (!_isRootElement && !checkVisibility(element)) {
		return "";
	}

	if (element.dataset.ui5AccText) {
		return element.dataset.ui5AccText;
	}

	const parts = { self: [] as string[], children: [] as string[] };
	const accessibilityInfo = ((element as any).accessibilityInfo) as AccessibilityInfo | undefined;

	const type = accessibilityInfo ? accessibilityInfo.type : element.ariaRoleDescription;
	type && parts.self.push(type);

	const description = accessibilityInfo ? accessibilityInfo.description : element.ariaLabel;
	description && parts.self.push(description);

	if (details) {
		const required = accessibilityInfo ? accessibilityInfo.required : element.ariaRequired;
		required && parts.self.push(i18nBundle.getText(TABLE_ACC_STATE_REQUIRED));

		const disabled = accessibilityInfo ? accessibilityInfo.disabled : element.ariaDisabled;
		disabled && parts.self.push(i18nBundle.getText(TABLE_ACC_STATE_DISABLED));

		const readOnly = accessibilityInfo ? accessibilityInfo.readonly : element.ariaReadOnly;
		readOnly && parts.self.push(i18nBundle.getText(TABLE_ACC_STATE_READONLY));
	}

	const children = accessibilityInfo ? accessibilityInfo.children || [] : getDefaultAccessibilityChildren(element);
	children.forEach(child => {
		const childDescription = getAccessibilityDescription(child, details, false);
		childDescription && parts.children.push(childDescription);
	});

	if (_isRootElement && details && parts.children.length > 0 && getTabbableElements(element).length > 0) {
		const childrenDescription = parts.children.join(" ");
		parts.children = [i18nBundle.getText(TABLE_CELL_CONTAINS, childrenDescription)];
	}

	const fullDescription = [...parts.self, ...parts.children].join(" ").trim();
	if (_isRootElement && fullDescription === "") {
		const tabbables = getTabbableElements(element);
		const emptyTextBundleKey = [TABLE_ACC_STATE_EMPTY, TABLE_CELL_SINGLE_CONTROL, TABLE_CELL_MULTIPLE_CONTROLS][Math.min(tabbables.length, 2)];
		return i18nBundle.getText(emptyTextBundleKey);
	}

	return fullDescription;
};

export {
	isInstanceOfTable,
	isSelectionCheckbox,
	isHeaderSelector,
	findRowInPath,
	findVerticalScrollContainer,
	scrollElementIntoView,
	isFeature,
	throttle,
	toggleAttribute,
	isValidColumnWidth,
	getAccessibilityDescription,
	updateInvisibleText,
};
