import type MovePlacement from "../../types/MovePlacement.js";
import MultipleDragGhostCss from "../../generated/css/MultipleDragGhost.css.js";

import { getI18nBundle } from "../../i18nBundle.js";

import {
	DRAG_DROP_MULTIPLE_TEXT,
} from "../../generated/i18n/i18n-defaults.js";

const MIN_MULTI_DRAG_COUNT = 2;

let draggedElement: HTMLElement | null = null;

const setDraggedElement = (element: HTMLElement | null) => {
	draggedElement = element;
};

const clearDraggedElement = () => {
	draggedElement = null;
};

const getDraggedElement = () => {
	return draggedElement;
};

const createDefaultMultiDragElement = async (count: number): Promise<HTMLElement> => {
	const dragElement = document.createElement("div");
	const i18nBundle = await getI18nBundle("@ui5/webcomponents-base");

	const dragElementShadow = dragElement.attachShadow({ mode: "open" });

	const styles = new CSSStyleSheet();
	styles.replaceSync(MultipleDragGhostCss);

	dragElementShadow.adoptedStyleSheets = [styles];
	dragElementShadow.textContent = i18nBundle.getText(DRAG_DROP_MULTIPLE_TEXT, count);

	return dragElement;
};

/**
 * Starts a multiple drag operation by creating a drag ghost element.
 * The drag ghost will be displayed when dragging multiple items.
 *
 * @param {number} count - The number of items being dragged.
 * @param {DragEvent} e - The drag event that triggered the operation.
 * @public
 */
const startMultipleDrag = async (count: number, e: DragEvent) => {
	if (count < MIN_MULTI_DRAG_COUNT) {
		console.warn(`Cannot start multiple drag with count ${count}. Minimum is ${MIN_MULTI_DRAG_COUNT}.`); // eslint-disable-line
		return;
	}

	if (!e.dataTransfer) {
		return;
	}

	const customDragElement = await createDefaultMultiDragElement(count);

	// Add to document body temporarily
	document.body.appendChild(customDragElement);

	e.dataTransfer.setDragImage(customDragElement, 0, 0);

	// Clean up the temporary element after the drag operation starts
	requestAnimationFrame(() => {
		customDragElement.remove();
	});
};

type DragAndDropSettings = {
	/**
	 * Allow cross-browser and file drag and drop.
	 */
	crossDnD?: boolean;
	/**
	 * Pass the original event in the event parameters.
	 */
	originalEvent?: boolean;
};

type MoveEventDetail = {
	originalEvent: Event,
	source: {
		element: HTMLElement,
	},
	destination: {
		element: HTMLElement,
		placement: `${MovePlacement}`,
	}
};

const DragRegistry = {
	setDraggedElement,
	clearDraggedElement,
	getDraggedElement,
	startMultipleDrag,
};

export default DragRegistry;
export {
	startMultipleDrag,
};

export type {
	DragAndDropSettings,
	MoveEventDetail,
};
