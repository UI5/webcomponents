import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type DropIndicator from "../DropIndicator.js";
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
type DragAndDropConfig = {
    getItems: () => Array<HTMLElement>;
    getDropIndicator: () => DropIndicator | null;
    orientation?: Orientation;
    useOriginalEvent?: boolean;
    clientCoordinate?: "clientX" | "clientY";
    transformElement?: (element: HTMLElement) => HTMLElement;
    validateDraggedElement?: (draggedElement: HTMLElement, targetElement: HTMLElement) => boolean;
    filterPlacements?: (placements: MovePlacement[], draggedElement: HTMLElement, targetElement: HTMLElement) => MovePlacement[];
};
declare class DragAndDropHandler {
    component: UI5Element;
    config: DragAndDropConfig;
    constructor(component: UI5Element, config: DragAndDropConfig);
    ondragenter(e: DragEvent): void;
    ondragleave(e: DragEvent): void;
    ondragover(e: DragEvent): void;
    ondrop(e: DragEvent): void;
    _validateDragOver(e: DragEvent): boolean;
    _findClosestPosition(e: DragEvent): {
        element: HTMLElement;
        placements: MovePlacement[];
    } | null;
    _transformTargetElement(element: HTMLElement): HTMLElement;
    _isValidDragTarget(draggedElement: HTMLElement, targetElement: HTMLElement): boolean;
    _filterPlacements(placements: MovePlacement[], draggedElement: HTMLElement, targetElement: HTMLElement): MovePlacement[];
}
export default DragAndDropHandler;
export type { DragAndDropConfig, };
