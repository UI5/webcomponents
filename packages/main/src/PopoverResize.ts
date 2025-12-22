import clamp from "@ui5/webcomponents-base/dist/util/clamp.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type Popover from "./Popover.js";
import { PopoverActualPlacement, PopoverActualHorizontalAlign } from "./Popover.js";
import PopoverVerticalAlign from "./types/PopoverVerticalAlign.js";

enum ResizeHandlePlacement {
	TopLeft = "TopLeft",
	TopRight = "TopRight",
	BottomLeft = "BottomLeft",
	BottomRight = "BottomRight",
}

/**
 * Manages resize functionality for Popover components
 * @private
 */
class PopoverResize {
	private _popover: Popover;
	private _resizeMouseMoveHandler: (e: MouseEvent) => void;
	private _resizeMouseUpHandler: (e: MouseEvent) => void;

	_initialClientX?: number;
	_initialClientY?: number;
	_initialBoundingRect?: DOMRect;
	_minWidth?: number;
	_minHeight?: number;
	_resized = false;

	_currentDeltaX?: number;
	_currentDeltaY?: number;

	// These variables track the cumulative resize difference throughout the entire resizing process.
	// It covers scenarios where: the mouse is pressed down,
	// moved, and released; the popover remains open;
	// and the mouse is pressed down, moved, and released again.
	_totalDeltaX?: number;
	_totalDeltaY?: number;

	constructor(popover: Popover) {
		this._popover = popover;
		this._resizeMouseMoveHandler = this._onResizeMouseMove.bind(this);
		this._resizeMouseUpHandler = this._onResizeMouseUp.bind(this);
	}

	/**
	 * Resets the resize state
	 */
	reset() {
		if (!this._resized) {
			return;
		}

		this._resized = false;

		delete this._currentDeltaX;
		delete this._currentDeltaY;

		delete this._totalDeltaX;
		delete this._totalDeltaY;

		delete this._popover._resizeHandlePlacement;
	}

	/**
	 * Returns whether the popover has been resized
	 */
	get isResized(): boolean {
		return this._resized;
	}

	/*
	 * Gets the corrected left position considering resize deltas
	 */
	getCorrectedLeft(left: number): number {
		if (this.isResized) {
			left -= this._currentDeltaX || 0;
		}

		return left;
	}

	/*
	 * Gets the corrected top position considering resize deltas
	 */
	getCorrectedTop(top: number): number {
		if (this.isResized) {
			top -= this._currentDeltaY || 0;
		}

		return top;
	}

	setCorrectResizeHandleClass(allClasses: ClassMap) {
		switch (this.getResizeHandlePlacement()) {
		case ResizeHandlePlacement.BottomLeft:
			allClasses.root["ui5-popover-resize-handle-bottom-left"] = true;
			break;
		case ResizeHandlePlacement.BottomRight:
			allClasses.root["ui5-popover-resize-handle-bottom-right"] = true;
			break;
		case ResizeHandlePlacement.TopLeft:
			allClasses.root["ui5-popover-resize-handle-top-left"] = true;
			break;
		case ResizeHandlePlacement.TopRight:
			allClasses.root["ui5-popover-resize-handle-top-right"] = true;
			break;
		}
	}

	getResizeHandlePlacement() {
		const popover = this._popover;

		if (this._resized) {
			return popover._resizeHandlePlacement;
		}

		const offset = 2;
		const isRtl = popover.isRtl;

		const opener = popover.getOpenerHTMLElement(popover.opener);

		if (!opener) {
			return ResizeHandlePlacement.BottomRight;
		}

		const openerRect = opener.getBoundingClientRect();
		const popoverWrapperRect = popover.getBoundingClientRect();

		let openerCX = Math.floor(openerRect.x + openerRect.width / 2);
		const openerCY = Math.floor(openerRect.y + openerRect.height / 2);

		let popoverCX = Math.floor(popoverWrapperRect.x + popoverWrapperRect.width / 2);
		const popoverCY = Math.floor(popoverWrapperRect.y + popoverWrapperRect.height / 2);

		const verticalAlign = popover.verticalAlign;
		const actualHorizontalAlign = popover._actualHorizontalAlign;

		const isPopoverWidthBiggerThanOpener = popoverWrapperRect.width > openerRect.width;
		const isPopoverHeightBiggerThanOpener = popoverWrapperRect.height > openerRect.height;

		if (isRtl) {
			openerCX = -openerCX;
			popoverCX = -popoverCX;
		}

		switch (popover.getActualPlacement(openerRect)) {
		case PopoverActualPlacement.Left:
			if (isPopoverHeightBiggerThanOpener) {
				if (popoverCY > openerCY + offset) {
					return ResizeHandlePlacement.BottomLeft;
				}

				return ResizeHandlePlacement.TopLeft;
			}

			if (verticalAlign === PopoverVerticalAlign.Top) {
				return ResizeHandlePlacement.BottomLeft;
			}

			return ResizeHandlePlacement.TopLeft;
		case PopoverActualPlacement.Right:
			if (isPopoverHeightBiggerThanOpener) {
				if (popoverCY + offset < openerCY) {
					return ResizeHandlePlacement.TopRight;
				}

				return ResizeHandlePlacement.BottomRight;
			}

			if (verticalAlign === PopoverVerticalAlign.Bottom) {
				return ResizeHandlePlacement.TopRight;
			}

			return ResizeHandlePlacement.BottomRight;
		case PopoverActualPlacement.Bottom:
			if (isPopoverWidthBiggerThanOpener) {
				if (popoverCX + offset < openerCX) {
					return isRtl ? ResizeHandlePlacement.BottomRight : ResizeHandlePlacement.BottomLeft;
				}

				return isRtl ? ResizeHandlePlacement.BottomLeft : ResizeHandlePlacement.BottomRight;
			}

			if (isRtl) {
				if (actualHorizontalAlign === PopoverActualHorizontalAlign.Left) {
					return ResizeHandlePlacement.BottomRight;
				}

				return ResizeHandlePlacement.BottomLeft;
			}

			if (actualHorizontalAlign === PopoverActualHorizontalAlign.Right) {
				return ResizeHandlePlacement.BottomLeft;
			}

			return ResizeHandlePlacement.BottomRight;
		case PopoverActualPlacement.Top:
		default:
			if (isPopoverWidthBiggerThanOpener) {
				if (popoverCX + offset < openerCX) {
					return isRtl ? ResizeHandlePlacement.TopRight : ResizeHandlePlacement.TopLeft;
				}

				return isRtl ? ResizeHandlePlacement.TopLeft : ResizeHandlePlacement.TopRight;
			}

			if (isRtl) {
				if (actualHorizontalAlign === PopoverActualHorizontalAlign.Left) {
					return ResizeHandlePlacement.TopRight;
				}

				return ResizeHandlePlacement.TopLeft;
			}

			if (actualHorizontalAlign === PopoverActualHorizontalAlign.Right) {
				return ResizeHandlePlacement.TopLeft;
			}

			return ResizeHandlePlacement.TopRight;
		}
	}

	/**
	 * Handles mouse down event on resize handle
	 */
	onResizeMouseDown(e: MouseEvent) {
		if (!this._popover.resizable) {
			return;
		}

		e.preventDefault();

		this._resized = true;
		this._initialBoundingRect = this._popover.getBoundingClientRect();

		this._totalDeltaX = this._currentDeltaX;
		this._totalDeltaY = this._currentDeltaY;

		const {
			minWidth,
			minHeight,
		} = window.getComputedStyle(this._popover);

		const domRefComputedStyle = window.getComputedStyle(this._popover._getRealDomRef!());

		this._initialClientX = e.clientX;
		this._initialClientY = e.clientY;

		this._minWidth = Math.max(Number.parseFloat(minWidth), Number.parseFloat(domRefComputedStyle.minWidth));
		this._minHeight = Number.parseFloat(minHeight);

		this._popover._resizeHandlePlacement = this.getResizeHandlePlacement();

		this._attachMouseResizeHandlers();
	}

	/**
	 * Handles mouse move event during resize
	 */
	private _onResizeMouseMove(e: MouseEvent) {
		const popover = this._popover;
		const margin = popover._viewportMargin;
		const { clientX, clientY } = e;
		const resizeHandlePlacement = popover._resizeHandlePlacement;
		const initialBoundingRect = this._initialBoundingRect!;
		const deltaX = clientX - this._initialClientX!;
		const deltaY = clientY - this._initialClientY!;

		let newWidth,
			newHeight;

		// Determine if we're resizing from left or right edge
		const isResizingFromLeft = resizeHandlePlacement === ResizeHandlePlacement.TopLeft
			|| resizeHandlePlacement === ResizeHandlePlacement.BottomLeft;

		const isResizingFromTop = resizeHandlePlacement === ResizeHandlePlacement.TopLeft
			|| resizeHandlePlacement === ResizeHandlePlacement.TopRight;

		// Calculate width changes
		if (isResizingFromLeft) {
			// Resizing from left edge - width increases when moving left (negative delta)
			const maxWidthFromLeft = initialBoundingRect.x + initialBoundingRect.width - margin;

			newWidth = clamp(
				initialBoundingRect.width - deltaX,
				this._minWidth!,
				maxWidthFromLeft,
			);

			// Adjust left position when resizing from left
			// Ensure the left edge respects the viewport margin and the right edge position
			const newLeft = clamp(
				initialBoundingRect.x + deltaX,
				margin,
				initialBoundingRect.x + initialBoundingRect.width - this._minWidth!,
			);

			// Recalculate width based on actual left position to stay within viewport with margin
			newWidth = Math.min(newWidth, initialBoundingRect.x + initialBoundingRect.width - newLeft);

			this._currentDeltaX = (initialBoundingRect.x - newLeft) / 2;
		} else {
			// Resizing from right edge - width increases when moving right (positive delta)
			const maxWidthFromRight = window.innerWidth - initialBoundingRect.x - margin;

			newWidth = clamp(
				initialBoundingRect.width + deltaX,
				this._minWidth!,
				maxWidthFromRight,
			);

			this._currentDeltaX = (initialBoundingRect.width - newWidth) / 2;
		}

		// Calculate height changes
		if (isResizingFromTop) {
			// Resizing from top edge - height increases when moving up (negative delta)
			const maxHeightFromTop = initialBoundingRect.y + initialBoundingRect.height - margin;

			newHeight = clamp(
				initialBoundingRect.height - deltaY,
				this._minHeight!,
				maxHeightFromTop,
			);

			// Adjust top position when resizing from top
			// Ensure the top edge respects the viewport margin and the bottom edge position
			const newTop = clamp(
				initialBoundingRect.y + deltaY,
				margin,
				initialBoundingRect.y + initialBoundingRect.height - this._minHeight!,
			);

			// Recalculate height based on actual top position to stay within viewport with margin
			newHeight = Math.min(newHeight, initialBoundingRect.y + initialBoundingRect.height - newTop);

			this._currentDeltaY = (initialBoundingRect.y - newTop) / 2;
		} else {
			// Resizing from bottom edge - height increases when moving down (positive delta)
			const maxHeightFromBottom = window.innerHeight - initialBoundingRect.y - margin;

			newHeight = clamp(
				initialBoundingRect.height + deltaY,
				this._minHeight!,
				maxHeightFromBottom,
			);

			this._currentDeltaY = (initialBoundingRect.height - newHeight) / 2;
		}

		this._currentDeltaX += this._totalDeltaX || 0;
		this._currentDeltaY += this._totalDeltaY || 0;

		const placement = this._popover.calcPlacement(this._popover._openerRect!, {
			width: newWidth,
			height: newHeight,
		});

		this._popover.arrowTranslateX = placement.arrow.x;
		this._popover.arrowTranslateY = placement.arrow.y;

		Object.assign(this._popover.style, {
			left: `${placement.left}px`,
			top: `${placement.top}px`,
			height: `${newHeight}px`,
			width: `${newWidth}px`,
		});
	}

	/**
	 * Handles mouse up event after resize
	 */
	private _onResizeMouseUp() {
		delete this._initialClientX;
		delete this._initialClientY;
		delete this._initialBoundingRect;
		delete this._minWidth;
		delete this._minHeight;

		this._detachMouseResizeHandlers();
	}

	/**
	 * Attaches mouse event handlers for resize
	 */
	private _attachMouseResizeHandlers() {
		window.addEventListener("mousemove", this._resizeMouseMoveHandler);
		window.addEventListener("mouseup", this._resizeMouseUpHandler);
	}

	/**
	 * Detaches mouse event handlers for resize
	 */
	private _detachMouseResizeHandlers() {
		window.removeEventListener("mousemove", this._resizeMouseMoveHandler);
		window.removeEventListener("mouseup", this._resizeMouseUpHandler);
	}
}

export { ResizeHandlePlacement };

export default PopoverResize;
