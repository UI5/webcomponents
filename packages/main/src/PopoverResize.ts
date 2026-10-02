import clamp from "@ui5/webcomponents-base/dist/util/clamp.js";
import {
	isUpShift, isDownShift, isLeftShift, isRightShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type Popover from "./Popover.js";
import { PopoverActualPlacement, PopoverActualHorizontalAlign } from "./Popover.js";

const STEP_SIZE = 16;

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
	_maxWidth?: number;
	_maxHeight?: number;
	_resized = false;

	_currentDeltaX?: number;
	_currentDeltaY?: number;

	// These variables track the cumulative resize difference throughout the entire resizing process.
	// It covers scenarios where: the mouse is pressed down,
	// moved, and released; the popover remains open;
	// and the mouse is pressed down, moved, and released again.
	_totalDeltaX?: number;
	_totalDeltaY?: number;

	// Anchor edges captured on the first keyboard resize keypress.
	// Using a stored constant prevents the dynamic minimum from oscillating
	// due to sub-pixel rendering changes across key presses.
	_keyboardAnchorBottom?: number;
	_keyboardAnchorTop?: number;
	_keyboardAnchorLeft?: number;
	_keyboardAnchorRight?: number;

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

		delete this._keyboardAnchorBottom;
		delete this._keyboardAnchorTop;
		delete this._keyboardAnchorLeft;
		delete this._keyboardAnchorRight;
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
			left -= this._currentDeltaX ?? 0;
		}

		return left;
	}

	/*
	 * Gets the corrected top position considering resize deltas
	 */
	getCorrectedTop(top: number): number {
		if (this.isResized) {
			top -= this._currentDeltaY ?? 0;
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

		if (this._resized && popover.resizeHandlePlacement) {
			return popover.resizeHandlePlacement;
		}

		const opener = popover.getOpenerHTMLElement(popover.opener);

		if (!opener) {
			return undefined;
		}

		const offset = 2;
		const isRtl = popover.isRtl;
		const actualHorizontalAlign = popover._actualHorizontalAlign;

		const openerRect = opener.getBoundingClientRect();
		const popoverWrapperRect = popover.getBoundingClientRect();

		const openerCX = Math.floor(openerRect.x + openerRect.width / 2);
		const openerCY = Math.floor(openerRect.y + openerRect.height / 2);
		const popoverCX = Math.floor(popoverWrapperRect.x + popoverWrapperRect.width / 2);
		const popoverCY = Math.floor(popoverWrapperRect.y + popoverWrapperRect.height / 2);

		const actualPlacement = popover.getActualPlacement(openerRect);

		switch (actualPlacement) {
		case PopoverActualPlacement.Left:
		case PopoverActualPlacement.Right: {
			const isRight = actualPlacement === PopoverActualPlacement.Right;
			let isBottom: boolean;
			if (popover.verticalAlign === "Top") {
				isBottom = true;
			} else if (popover.verticalAlign === "Bottom") {
				isBottom = false;
			} else {
				// Right placement defaults to BottomRight, Left placement defaults to TopLeft.
				// Achieved by flipping the bias based on direction.
				isBottom = popoverCY + (isRight ? offset : -offset) >= openerCY;
			}
			if (isBottom) {
				return isRight ? ResizeHandlePlacement.BottomRight : ResizeHandlePlacement.BottomLeft;
			}
			return isRight ? ResizeHandlePlacement.TopRight : ResizeHandlePlacement.TopLeft;
		}
		case PopoverActualPlacement.Bottom:
		case PopoverActualPlacement.Top:
		default: {
			const isTop = actualPlacement === PopoverActualPlacement.Top;
			let isRight: boolean;
			if (actualHorizontalAlign === PopoverActualHorizontalAlign.Left) {
				isRight = true;
			} else if (actualHorizontalAlign === PopoverActualHorizontalAlign.Right) {
				isRight = false;
			} else {
				// Center/Stretch: flip result in RTL so the handle is at the visual Start corner
				const centeredIsRight = !(popoverCX + offset < openerCX);
				isRight = isRtl ? !centeredIsRight : centeredIsRight;
			}
			if (isTop) {
				return isRight ? ResizeHandlePlacement.TopRight : ResizeHandlePlacement.TopLeft;
			}
			return isRight ? ResizeHandlePlacement.BottomRight : ResizeHandlePlacement.BottomLeft;
		}
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
			maxWidth,
			maxHeight,
		} = window.getComputedStyle(this._popover);

		this._initialClientX = e.clientX;
		this._initialClientY = e.clientY;

		this._minWidth = Number.parseFloat(minWidth);
		this._minHeight = Number.parseFloat(minHeight);

		const viewportMargin = this._popover._viewportMargin;
		const defaultMaxWidth = window.innerWidth - 2 * viewportMargin;
		const defaultMaxHeight = window.innerHeight - 2 * viewportMargin;

		const computedMaxWidth = maxWidth !== "none" ? Number.parseFloat(maxWidth) : Infinity;
		const computedMaxHeight = maxHeight !== "none" ? Number.parseFloat(maxHeight) : Infinity;

		this._maxWidth = computedMaxWidth < defaultMaxWidth ? computedMaxWidth : Infinity;
		this._maxHeight = computedMaxHeight < defaultMaxHeight ? computedMaxHeight : Infinity;

		this._attachMouseResizeHandlers();
	}

	/**
	 * Handles mouse move event during resize
	 */
	private _onResizeMouseMove(e: MouseEvent) {
		const popover = this._popover;
		const margin = popover._viewportMargin;
		const { clientX, clientY } = e;
		const resizeHandlePlacement = this.getResizeHandlePlacement();
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
			const maxWidthFromLeft = Math.min(
				initialBoundingRect.x + initialBoundingRect.width - margin,
				this._maxWidth!,
			);

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
			const maxWidthFromRight = Math.min(
				window.innerWidth - initialBoundingRect.x - margin,
				this._maxWidth!,
			);

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
			const maxHeightFromTop = Math.min(
				initialBoundingRect.y + initialBoundingRect.height - margin,
				this._maxHeight!,
			);

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
			const maxHeightFromBottom = Math.min(
				window.innerHeight - initialBoundingRect.y - margin,
				this._maxHeight!,
			);

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
		delete this._maxWidth;
		delete this._maxHeight;

		this._detachMouseResizeHandlers();
	}

	/**
	 * Handles keyboard resize via Shift+Arrow keys.
	 * Direction is handle-corner-aware: the arrow moves the free edge (the edge where the handle is).
	 * Right handle: Shift+Right grows, Shift+Left shrinks.
	 * Left handle: Shift+Left grows, Shift+Right shrinks.
	 * Bottom handle: Shift+Down grows, Shift+Up shrinks.
	 * Top handle: Shift+Up grows, Shift+Down shrinks.
	 */
	onResizeKeyDown(e: KeyboardEvent) {
		if (!isUpShift(e) && !isDownShift(e) && !isLeftShift(e) && !isRightShift(e)) {
			return;
		}

		e.preventDefault();

		const popover = this._popover;
		const openerRect = popover._openerRect;
		if (!openerRect) {
			return;
		}

		this._resized = true;

		const handlePlacement = this.getResizeHandlePlacement();
		const isRightHandle = handlePlacement === ResizeHandlePlacement.TopRight
			|| handlePlacement === ResizeHandlePlacement.BottomRight;
		const isTopHandle = handlePlacement === ResizeHandlePlacement.TopLeft
			|| handlePlacement === ResizeHandlePlacement.TopRight;

		const rect = popover.getBoundingClientRect();
		const style = window.getComputedStyle(popover);
		const minWidth = Number.parseFloat(style.minWidth);
		const minHeight = Number.parseFloat(style.minHeight);
		const margin = popover._viewportMargin;

		let widthStep = 0;
		let heightStep = 0;

		if (isLeftShift(e) || isRightShift(e)) {
			widthStep = (isRightShift(e) === isRightHandle) ? STEP_SIZE : -STEP_SIZE;
		} else {
			heightStep = (isUpShift(e) === isTopHandle) ? STEP_SIZE : -STEP_SIZE;
		}

		// Freeze all 4 edges on the first keypress — used for viewport max and opener min constraints.
		this._keyboardAnchorLeft ??= rect.left;
		this._keyboardAnchorRight ??= rect.right;
		this._keyboardAnchorTop ??= rect.top;
		this._keyboardAnchorBottom ??= rect.bottom;

		const maxWidth = isRightHandle
			? window.innerWidth - this._keyboardAnchorLeft - margin
			: this._keyboardAnchorRight - margin;
		const maxHeight = isTopHandle
			? this._keyboardAnchorBottom - margin
			: window.innerHeight - this._keyboardAnchorTop - margin;

		// Dynamic minimum: the free edge must not cross the opener's far edge.
		// Skipped when the opener is already larger than the popover so shrinking still works.
		const constrainedMinWidth = widthStep !== 0
			? Math.max(0, isRightHandle
				? Math.ceil(openerRect.right - this._keyboardAnchorLeft)
				: Math.ceil(this._keyboardAnchorRight - openerRect.left))
			: 0;
		const effectiveMinWidth = widthStep !== 0
			? Math.max(minWidth, constrainedMinWidth <= rect.width ? constrainedMinWidth : 0)
			: minWidth;

		const constrainedMinHeight = heightStep !== 0
			? Math.max(0, isTopHandle
				? Math.ceil(this._keyboardAnchorBottom - openerRect.top)
				: Math.ceil(openerRect.bottom - this._keyboardAnchorTop))
			: 0;
		const effectiveMinHeight = heightStep !== 0
			? Math.max(minHeight, constrainedMinHeight <= rect.height ? constrainedMinHeight : 0)
			: minHeight;

		const newWidth = widthStep !== 0
			? clamp(rect.width + widthStep, effectiveMinWidth, maxWidth)
			: rect.width;
		const newHeight = heightStep !== 0
			? clamp(rect.height + heightStep, effectiveMinHeight, maxHeight)
			: rect.height;

		if (Math.abs(newWidth - rect.width) < 1 && Math.abs(newHeight - rect.height) < 1) {
			return;
		}

		const actualWidthChange = newWidth - rect.width;
		const actualHeightChange = newHeight - rect.height;

		// Update deltas BEFORE calcPlacement so getCorrectedLeft/Top feeds the anchor-based
		// position into calcPlacement's viewport-clamping and placement-flip decisions.
		if (widthStep !== 0) {
			this._currentDeltaX = (this._currentDeltaX ?? 0) + (isRightHandle ? -actualWidthChange / 2 : actualWidthChange / 2);
		}
		if (heightStep !== 0) {
			this._currentDeltaY = (this._currentDeltaY ?? 0) + (isTopHandle ? actualHeightChange / 2 : -actualHeightChange / 2);
		}

		const placement = popover.calcPlacement(openerRect, { width: newWidth, height: newHeight });
		popover.arrowTranslateX = placement.arrow.x;
		popover.arrowTranslateY = placement.arrow.y;

		Object.assign(popover.style, {
			left: `${placement.left}px`,
			top: `${placement.top}px`,
			width: `${newWidth}px`,
			height: `${newHeight}px`,
		});
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
