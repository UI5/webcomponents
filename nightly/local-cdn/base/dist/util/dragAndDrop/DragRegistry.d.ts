import type MovePlacement from "../../types/MovePlacement.js";
/**
 * Starts a multiple drag operation by creating a drag ghost element.
 * The drag ghost will be displayed when dragging multiple items.
 *
 * @param {number} count - The number of items being dragged.
 * @param {DragEvent} e - The drag event that triggered the operation.
 * @public
 */
declare const startMultipleDrag: (count: number, e: DragEvent) => Promise<void>;
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
    originalEvent: Event;
    source: {
        element: HTMLElement;
    };
    destination: {
        element: HTMLElement;
        placement: `${MovePlacement}`;
    };
};
declare const DragRegistry: {
    setDraggedElement: (element: HTMLElement | null) => void;
    clearDraggedElement: () => void;
    getDraggedElement: () => HTMLElement | null;
    startMultipleDrag: (count: number, e: DragEvent) => Promise<void>;
};
export default DragRegistry;
export { startMultipleDrag, };
export type { DragAndDropSettings, MoveEventDetail, };
