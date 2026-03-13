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
	}

	/**
	 * Returns whether the popover has been resized
	 */
	get isResized(): boolean {
		return this._resized;
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

		if (this._resized && popover.resizeHandlePlacement) {
			return popover.resizeHandlePlacement;
		}

		const opener = popover.getOpenerHTMLElement(popover.opener);

		if (!opener) {
			return undefined;
		}

		const offset = 2;
		const isRtl = popover.isRtl;

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

		// Use the current actualPlacement from CSS anchor positioning
		switch (popover.actualPlacement) {
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
	 * Handles mouse down event on resize handle.
	 * Captures the current CSS-anchored position and switches to inline positioning
	 * so that drag-based resize works without CSS anchor interference.
	 */
	onResizeMouseDown(e: MouseEvent) {
		if (!this._popover.resizable) {
			return;
		}

		e.preventDefault();

		this._resized = true;
		this._initialBoundingRect = this._popover.getBoundingClientRect();

		// Bypass CSS anchor positioning: capture current position and switch to inline styles
		const rect = this._initialBoundingRect;
		this._popover.style.setProperty("position-area", "unset");
		this._popover.style.setProperty("position-anchor", "unset");
		this._popover.style.setProperty("position-try-fallbacks", "unset");
		Object.assign(this._popover.style, {
			top: `${rect.top}px`,
			left: `${rect.left}px`,
		});

		const {
			minWidth,
			minHeight,
		} = window.getComputedStyle(this._popover);

		const domRefComputedStyle = window.getComputedStyle(this._popover._getRealDomRef!());

		this._initialClientX = e.clientX;
		this._initialClientY = e.clientY;

		this._minWidth = Math.max(Number.parseFloat(minWidth), Number.parseFloat(domRefComputedStyle.minWidth));
		this._minHeight = Number.parseFloat(minHeight);

		this._attachMouseResizeHandlers();
	}

	/**
	 * Handles mouse move event during resize.
	 * Computes new size and position directly (no calcPlacement dependency).
	 */
	private _onResizeMouseMove(e: MouseEvent) {
		const popover = this._popover;
		const margin = popover._viewportMargin;
		const { clientX, clientY } = e;
		const resizeHandlePlacement = this.getResizeHandlePlacement();
		const initialBoundingRect = this._initialBoundingRect!;
		const deltaX = clientX - this._initialClientX!;
		const deltaY = clientY - this._initialClientY!;

		let newWidth: number;
		let newHeight: number;
		let newLeft = initialBoundingRect.x;
		let newTop = initialBoundingRect.y;

		// Determine if we're resizing from left or right edge
		const isResizingFromLeft = resizeHandlePlacement === ResizeHandlePlacement.TopLeft
			|| resizeHandlePlacement === ResizeHandlePlacement.BottomLeft;

		const isResizingFromTop = resizeHandlePlacement === ResizeHandlePlacement.TopLeft
			|| resizeHandlePlacement === ResizeHandlePlacement.TopRight;

		// Calculate width changes
		if (isResizingFromLeft) {
			const maxWidthFromLeft = initialBoundingRect.x + initialBoundingRect.width - margin;

			newWidth = clamp(
				initialBoundingRect.width - deltaX,
				this._minWidth!,
				maxWidthFromLeft,
			);

			newLeft = clamp(
				initialBoundingRect.x + deltaX,
				margin,
				initialBoundingRect.x + initialBoundingRect.width - this._minWidth!,
			);

			newWidth = Math.min(newWidth, initialBoundingRect.x + initialBoundingRect.width - newLeft);
		} else {
			const maxWidthFromRight = window.innerWidth - initialBoundingRect.x - margin;

			newWidth = clamp(
				initialBoundingRect.width + deltaX,
				this._minWidth!,
				maxWidthFromRight,
			);
		}

		// Calculate height changes
		if (isResizingFromTop) {
			const maxHeightFromTop = initialBoundingRect.y + initialBoundingRect.height - margin;

			newHeight = clamp(
				initialBoundingRect.height - deltaY,
				this._minHeight!,
				maxHeightFromTop,
			);

			newTop = clamp(
				initialBoundingRect.y + deltaY,
				margin,
				initialBoundingRect.y + initialBoundingRect.height - this._minHeight!,
			);

			newHeight = Math.min(newHeight, initialBoundingRect.y + initialBoundingRect.height - newTop);
		} else {
			const maxHeightFromBottom = window.innerHeight - initialBoundingRect.y - margin;

			newHeight = clamp(
				initialBoundingRect.height + deltaY,
				this._minHeight!,
				maxHeightFromBottom,
			);
		}

		// Update arrow position based on new dimensions
		popover._updateArrowPosition();

		Object.assign(popover.style, {
			left: `${newLeft}px`,
			top: `${newTop}px`,
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
