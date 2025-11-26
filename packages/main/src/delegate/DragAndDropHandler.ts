import { DragRegistry, handleDragOver, handleDrop, findClosestPosition } from "@ui5/webcomponents-base";
import type Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type DropIndicator from "../DropIndicator.js";
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

type DragAndDropConfig = {
	getItems: () => Array<HTMLElement>;
	getDropIndicator: () => DropIndicator | null;
	orientation?: `${Orientation}`;
	useOriginalEvent?: boolean;
	clientCoordinate?: "clientX" | "clientY";
	transformElement?: (element: HTMLElement) => HTMLElement;
	validateDraggedElement?: (draggedElement: HTMLElement, targetElement: HTMLElement) => boolean;
	filterPlacements?: (placements: MovePlacement[], draggedElement: HTMLElement, targetElement: HTMLElement) => MovePlacement[];
};

class DragAndDropHandler {
	component: UI5Element;
	config: DragAndDropConfig;

	constructor(component: UI5Element, config: DragAndDropConfig) {
		this.component = component;
		this.config = {
			orientation: "Vertical",
			clientCoordinate: "clientY",
			...config,
		};
	}

	ondragenter(e: DragEvent) {
		e.preventDefault();
	}

	ondragleave(e: DragEvent) {
		if (e.relatedTarget instanceof Node && this.component.shadowRoot?.contains(e.relatedTarget)) {
			return;
		}

		const dropIndicator = this.config.getDropIndicator();
		if (dropIndicator) {
			dropIndicator.targetReference = null;
		}
	}

	ondragover(e: DragEvent) {
		if (!this._validateDragOver(e)) {
			return;
		}

		const draggedElement = DragRegistry.getDraggedElement()!;
		const dropIndicator = this.config.getDropIndicator()!;
		const closestPosition = this._findClosestPosition(e);

		if (!closestPosition) {
			dropIndicator.targetReference = null;
			return;
		}

		const targetElement = this._transformTargetElement(closestPosition.element);

		if (!this._isValidDragTarget(draggedElement, targetElement)) {
			dropIndicator.targetReference = null;
			return;
		}

		// Filter placements if needed (e.g., ListItemGroup filtering out MovePlacement.On)
		const placements = this._filterPlacements(closestPosition.placements, draggedElement, targetElement);

		const settings = this.config.useOriginalEvent ? { originalEvent: true } : {};
		const { targetReference, placement } = handleDragOver(e, this.component, {
			element: targetElement,
			placements,
		}, targetElement, settings);

		dropIndicator.targetReference = targetReference;
		dropIndicator.placement = placement;
	}

	ondrop(e: DragEvent) {
		const dropIndicator = this.config.getDropIndicator();

		if (!dropIndicator?.targetReference || !dropIndicator?.placement) {
			e.preventDefault();
			return;
		}

		const settings = this.config.useOriginalEvent ? { originalEvent: true } : {};
		handleDrop(e, this.component, dropIndicator.targetReference, dropIndicator.placement, settings);
		dropIndicator.targetReference = null;
	}

	_validateDragOver(e: DragEvent): boolean {
		if (!(e.target instanceof HTMLElement)) {
			return false;
		}

		const draggedElement = DragRegistry.getDraggedElement();
		const dropIndicator = this.config.getDropIndicator();

		return !!(draggedElement && dropIndicator);
	}

	_findClosestPosition(e: DragEvent) {
		const items = this.config.getItems();
		const coordinate = this.config.clientCoordinate === "clientX" ? e.clientX : e.clientY;

		return findClosestPosition(
			items,
			coordinate,
			this.config.orientation!,
		);
	}

	_transformTargetElement(element: HTMLElement): HTMLElement {
		if (this.config.transformElement) {
			return this.config.transformElement(element);
		}
		return element;
	}

	_isValidDragTarget(draggedElement: HTMLElement, targetElement: HTMLElement): boolean {
		if (this.config.validateDraggedElement) {
			return this.config.validateDraggedElement(draggedElement, targetElement);
		}
		return true;
	}

	_filterPlacements(placements: MovePlacement[], draggedElement: HTMLElement, targetElement: HTMLElement): MovePlacement[] {
		if (this.config.filterPlacements) {
			return this.config.filterPlacements(placements, draggedElement, targetElement);
		}
		return placements;
	}
}

export default DragAndDropHandler;
export type {
	DragAndDropConfig,
};
