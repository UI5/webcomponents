import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type Popover from "./Popover.js";
declare enum ResizeHandlePlacement {
    TopLeft = "TopLeft",
    TopRight = "TopRight",
    BottomLeft = "BottomLeft",
    BottomRight = "BottomRight"
}
/**
 * Manages resize functionality for Popover components
 * @private
 */
declare class PopoverResize {
    private _popover;
    private _resizeMouseMoveHandler;
    private _resizeMouseUpHandler;
    _initialClientX?: number;
    _initialClientY?: number;
    _initialBoundingRect?: DOMRect;
    _minWidth?: number;
    _minHeight?: number;
    _resized: boolean;
    _currentDeltaX?: number;
    _currentDeltaY?: number;
    _totalDeltaX?: number;
    _totalDeltaY?: number;
    constructor(popover: Popover);
    /**
     * Resets the resize state
     */
    reset(): void;
    /**
     * Returns whether the popover has been resized
     */
    get isResized(): boolean;
    getCorrectedLeft(left: number): number;
    getCorrectedTop(top: number): number;
    setCorrectResizeHandleClass(allClasses: ClassMap): void;
    getResizeHandlePlacement(): "TopLeft" | "TopRight" | "BottomLeft" | "BottomRight" | ResizeHandlePlacement | undefined;
    /**
     * Handles mouse down event on resize handle
     */
    onResizeMouseDown(e: MouseEvent): void;
    /**
     * Handles mouse move event during resize
     */
    private _onResizeMouseMove;
    /**
     * Handles mouse up event after resize
     */
    private _onResizeMouseUp;
    /**
     * Attaches mouse event handlers for resize
     */
    private _attachMouseResizeHandlers;
    /**
     * Detaches mouse event handlers for resize
     */
    private _detachMouseResizeHandlers;
}
export { ResizeHandlePlacement };
export default PopoverResize;
