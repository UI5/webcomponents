import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";
import type { DragAndDropSettings } from "./DragRegistry.js";
type DragOverResult = {
    targetReference: HTMLElement | null;
    placement: any;
};
type DragPosition = {
    element: HTMLElement;
    placements: MovePlacement[];
};
/**
 * Handles the dragover event.
 */
declare function handleDragOver<T extends UI5Element>(e: DragEvent, component: T, position: DragPosition, target: HTMLElement, settings?: DragAndDropSettings): DragOverResult;
export default handleDragOver;
