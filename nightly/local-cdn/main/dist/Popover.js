var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popover_1;
import { instanceOfUI5Element } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import { isIOS } from "@ui5/webcomponents-base/dist/Device.js";
import { isClickInRect, getClosedPopupParent } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import clamp from "@ui5/webcomponents-base/dist/util/clamp.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import Popup from "./Popup.js";
import PopoverPlacement from "./types/PopoverPlacement.js";
import PopoverVerticalAlign from "./types/PopoverVerticalAlign.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import { addOpenedPopover, removeOpenedPopover } from "./popup-utils/PopoverRegistry.js";
import PopoverResize from "./PopoverResize.js";
// Template
import PopoverTemplate from "./PopoverTemplate.js";
// Styles
import PopupsCommonCss from "./generated/themes/PopupsCommon.css.js";
import PopoverCss from "./generated/themes/Popover.css.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
const ARROW_SIZE = 8;
var PopoverActualHorizontalAlign;
(function (PopoverActualHorizontalAlign) {
    PopoverActualHorizontalAlign["Center"] = "Center";
    PopoverActualHorizontalAlign["Left"] = "Left";
    PopoverActualHorizontalAlign["Right"] = "Right";
    PopoverActualHorizontalAlign["Stretch"] = "Stretch";
})(PopoverActualHorizontalAlign || (PopoverActualHorizontalAlign = {}));
var PopoverActualPlacement;
(function (PopoverActualPlacement) {
    PopoverActualPlacement["Left"] = "Left";
    PopoverActualPlacement["Right"] = "Right";
    PopoverActualPlacement["Top"] = "Top";
    PopoverActualPlacement["Bottom"] = "Bottom";
})(PopoverActualPlacement || (PopoverActualPlacement = {}));
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-popover` component displays additional information for an object
 * in a compact way and without leaving the page.
 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
 * It can also include actions in the footer.
 *
 * ### Structure
 *
 * The popover has three main areas:
 *
 * - Header (optional)
 * - Content
 * - Footer (optional)
 *
 * **Note:** The `ui5-popover` is closed when the user clicks
 * or taps outside the popover
 * or selects an action within the popover. You can prevent this with the
 * `modal` property.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Popover.js";`
 *
 * @constructor
 * @extends Popup
 * @since 1.0.0-rc.6
 * @public
 * @csspart header - Used to style the header of the component
 * @csspart content - Used to style the content of the component
 * @csspart footer - Used to style the footer of the component
 */
let Popover = Popover_1 = class Popover extends Popup {
    static get VIEWPORT_MARGIN() {
        return 10; // px
    }
    constructor() {
        super();
        /**
         * Determines on which side the component is placed at.
         * @default "End"
         * @public
         */
        this.placement = "End";
        /**
         * Determines the horizontal alignment of the component.
         * @default "Center"
         * @public
         */
        this.horizontalAlign = "Center";
        /**
         * Determines the vertical alignment of the component.
         * @default "Center"
         * @public
         */
        this.verticalAlign = "Center";
        /**
         * Defines whether the component should close when
         * clicking/tapping outside the popover.
         * If enabled, it blocks any interaction with the background.
         * @default false
         * @public
         */
        this.modal = false;
        /**
         * Determines whether the component arrow is hidden.
         * @default false
         * @public
         * @since 1.0.0-rc.15
         */
        this.hideArrow = false;
        /**
         * Determines if there is no enough space, the component can be placed
         * over the target.
         * @default false
         * @public
         */
        this.allowTargetOverlap = false;
        /**
         * Determines whether the component is resizable.
         * **Note:** This property is effective only on desktop devices.
         * @default false
         * @public
         * @since 2.19.0
         */
        this.resizable = false;
        /**
         * Sets the X translation of the arrow
         * @private
         */
        this.arrowTranslateX = 0;
        /**
         * Sets the Y translation of the arrow
         * @private
         */
        this.arrowTranslateY = 0;
        /**
         * Returns the calculated placement depending on the free space
         * @private
         */
        this.actualPlacement = "Right";
        // for instance checks
        this.isPopover = true;
        this._popoverResize = new PopoverResize(this);
    }
    /**
     * Defines the ID or DOM Reference of the element at which the popover is shown.
     * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
     * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
     * @public
     * @default undefined
     * @since 1.2.0
     */
    set opener(value) {
        if (this._opener === value) {
            return;
        }
        this._opener = value;
        if (value && this.open) {
            this.openPopup();
        }
    }
    get opener() {
        return this._opener;
    }
    async openPopup() {
        if (this._opened) {
            return;
        }
        const opener = this.getOpenerHTMLElement(this.opener);
        if (!opener) {
            return;
        }
        if (!opener || this.isOpenerOutsideViewport(opener.getBoundingClientRect())) {
            await renderFinished();
            this.open = false;
            this.fireDecoratorEvent("close");
            return;
        }
        this._initialWidth = this.style.width;
        this._initialHeight = this.style.height;
        this._openerRect = opener.getBoundingClientRect();
        await super.openPopup();
    }
    closePopup(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
        Object.assign(this.style, {
            width: this._initialWidth,
            height: this._initialHeight,
        });
        this._popoverResize.reset();
        delete this._resizeHandlePlacement;
        super.closePopup(escPressed, preventRegistryUpdate, preventFocusRestore);
    }
    isOpenerClicked(e) {
        const target = e.target;
        const opener = this.getOpenerHTMLElement(this.opener);
        if (!opener) {
            return false;
        }
        if (target === opener) {
            return true;
        }
        if (this._isUI5AbstractElement(target) && target.getFocusDomRef() === opener) {
            return true;
        }
        return e.composedPath().indexOf(opener) > -1;
    }
    isClicked(e) {
        if (this._showResizeHandle) {
            const resizeHandle = this.shadowRoot.querySelector(".ui5-popover-resize-handle");
            if (resizeHandle === e.composedPath()[0]) {
                return true;
            }
        }
        return isClickInRect(e, this.getBoundingClientRect());
    }
    /**
     * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
     * @private
     */
    _addOpenedPopup() {
        addOpenedPopover(this);
    }
    /**
     * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
     * @private
     */
    _removeOpenedPopup() {
        removeOpenedPopover(this);
    }
    getOpenerHTMLElement(opener) {
        if (opener === undefined || opener === null) {
            return opener;
        }
        if (opener instanceof HTMLElement) {
            return this._isUI5AbstractElement(opener) ? opener.getFocusDomRef() : opener;
        }
        let rootNode = this.getRootNode();
        if (rootNode === this) {
            rootNode = document;
        }
        let openerHTMLElement = rootNode.getElementById(opener);
        if (rootNode instanceof ShadowRoot && !openerHTMLElement) {
            openerHTMLElement = document.getElementById(opener);
        }
        if (openerHTMLElement) {
            return this._isUI5AbstractElement(openerHTMLElement) ? openerHTMLElement.getFocusDomRef() : openerHTMLElement;
        }
        return openerHTMLElement;
    }
    shouldCloseDueToOverflow(placement, openerRect) {
        const threshold = 32;
        const limits = {
            "Left": openerRect.right,
            "Right": openerRect.left,
            "Top": openerRect.top,
            "Bottom": openerRect.bottom,
        };
        const opener = this.getOpenerHTMLElement(this.opener);
        const closedPopupParent = getClosedPopupParent(opener);
        let overflowsBottom = false;
        let overflowsTop = false;
        if (closedPopupParent instanceof Popover_1) {
            const contentRect = closedPopupParent.getBoundingClientRect();
            overflowsBottom = openerRect.top > (contentRect.top + contentRect.height);
            overflowsTop = (openerRect.top + openerRect.height) < contentRect.top;
        }
        return (limits[placement] < 0 || (limits[placement] + threshold > closedPopupParent.innerHeight)) || overflowsBottom || overflowsTop;
    }
    shouldCloseDueToNoOpener(openerRect) {
        return openerRect.top === 0
            && openerRect.bottom === 0
            && openerRect.left === 0
            && openerRect.right === 0;
    }
    isOpenerOutsideViewport(openerRect) {
        return openerRect.bottom < 0
            || openerRect.top > window.innerHeight
            || openerRect.right < 0
            || openerRect.left > window.innerWidth;
    }
    /**
     * @override
     */
    _resize() {
        super._resize();
        if (this.open) {
            this.reposition();
        }
    }
    get _viewportMargin() {
        return Popover_1.VIEWPORT_MARGIN;
    }
    reposition() {
        this._show();
        if (this.resizable) {
            this._resizeHandlePlacement = this._popoverResize.getResizeHandlePlacement();
        }
    }
    async _show() {
        super._show();
        const opener = this.getOpenerHTMLElement(this.opener);
        if (!opener) {
            Object.assign(this.style, {
                top: `0px`,
                left: `0px`,
            });
            return;
        }
        if (opener && instanceOfUI5Element(opener) && !opener.getDomRef()) {
            return;
        }
        if (!this._opened) {
            this._showOutsideViewport();
        }
        const popoverSize = this.getPopoverSize();
        let placement;
        if (popoverSize.width === 0 || popoverSize.height === 0) {
            // size can not be determined properly at this point, popover will be shown with the next reposition
            return;
        }
        if (this.open) {
            // update opener rect if it was changed during the popover being opened
            this._openerRect = opener.getBoundingClientRect();
        }
        if (this._oldPlacement && this.shouldCloseDueToNoOpener(this._openerRect) && this.isFocusWithin()) {
            // reuse the old placement as the opener is not available,
            // but keep the popover open as the focus is within
            placement = this._oldPlacement;
        }
        else {
            placement = this.calcPlacement(this._openerRect, popoverSize);
        }
        if (this._preventRepositionAndClose || this.isOpenerOutsideViewport(this._openerRect)) {
            await this._waitForDomRef();
            return this.closePopup();
        }
        this._oldPlacement = placement;
        this.actualPlacement = placement.actualPlacement;
        let left = clamp(this._left, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientWidth - popoverSize.width - Popover_1.VIEWPORT_MARGIN);
        if (this.actualPlacement === PopoverActualPlacement.Right) {
            left = Math.max(left, this._left);
        }
        let top = clamp(this._top, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientHeight - popoverSize.height - Popover_1.VIEWPORT_MARGIN);
        if (this.actualPlacement === PopoverActualPlacement.Bottom) {
            top = Math.max(top, this._top);
        }
        this.arrowTranslateX = placement.arrow.x;
        this.arrowTranslateY = placement.arrow.y;
        top = this._adjustForIOSKeyboard(top);
        Object.assign(this.style, {
            top: `${top}px`,
            left: `${left}px`,
        });
        if (this._popoverResize.isResized) {
            return;
        }
        if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && this._width) {
            this.style.width = this._width;
        }
        if (this.verticalAlign === PopoverVerticalAlign.Stretch && this._height) {
            this.style.height = this._height;
        }
    }
    /**
     * Adjust the desired top position to compensate for shift of the screen
     * caused by opened keyboard on iOS which affects all elements with position:fixed.
     * @private
     * @param top The target top in px.
     * @returns The adjusted top in px.
     */
    _adjustForIOSKeyboard(top) {
        if (!isIOS()) {
            return top;
        }
        const actualTop = Math.ceil(this.getBoundingClientRect().top);
        return top + (Number.parseInt(this.style.top || "0") - actualTop);
    }
    getPopoverSize(calcScrollHeight = false) {
        const rect = this.getBoundingClientRect();
        const width = rect.width;
        let height;
        const domRef = this.getDomRef();
        if (calcScrollHeight && domRef) {
            const header = domRef.querySelector(".ui5-popup-header-root");
            const content = domRef.querySelector(".ui5-popup-content");
            const footer = domRef.querySelector(".ui5-popup-footer-root");
            height = content?.scrollHeight || 0;
            height += header?.scrollHeight || 0;
            height += footer?.scrollHeight || 0;
        }
        else {
            height = rect.height;
        }
        return { width, height };
    }
    _showOutsideViewport() {
        Object.assign(this.style, {
            top: "-10000px",
            left: "-10000px",
        });
    }
    _isUI5AbstractElement(el) {
        return instanceOfUI5Element(el) && el.isUI5AbstractElement;
    }
    get arrowDOM() {
        return this.shadowRoot.querySelector(".ui5-popover-arrow");
    }
    /**
     * @protected
     */
    focusOpener() {
        this.getOpenerHTMLElement(this.opener)?.focus();
    }
    /**
     * @private
     */
    calcPlacement(targetRect, popoverSize) {
        let left = Popover_1.VIEWPORT_MARGIN;
        let top = 0;
        const allowTargetOverlap = this.allowTargetOverlap;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        let maxHeight = clientHeight;
        let maxWidth = clientWidth;
        const actualPlacement = this.getActualPlacement(targetRect);
        this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(actualPlacement, targetRect);
        const isVertical = actualPlacement === PopoverActualPlacement.Top
            || actualPlacement === PopoverActualPlacement.Bottom;
        if (!this._popoverResize.isResized) {
            if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && isVertical) {
                popoverSize.width = targetRect.width;
                this._width = `${targetRect.width}px`;
            }
            else if (this.verticalAlign === PopoverVerticalAlign.Stretch && !isVertical) {
                popoverSize.height = targetRect.height;
                this._height = `${targetRect.height}px`;
            }
        }
        const arrowOffset = this.hideArrow ? 0 : ARROW_SIZE;
        // calc popover positions
        switch (actualPlacement) {
            case PopoverActualPlacement.Top:
                left = this.getVerticalLeft(targetRect, popoverSize);
                top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);
                if (!allowTargetOverlap) {
                    maxHeight = targetRect.top - arrowOffset;
                }
                break;
            case PopoverActualPlacement.Bottom:
                left = this.getVerticalLeft(targetRect, popoverSize);
                top = targetRect.bottom + arrowOffset;
                if (allowTargetOverlap) {
                    top = Math.max(Math.min(top, clientHeight - popoverSize.height), 0);
                }
                else {
                    maxHeight = clientHeight - targetRect.bottom - arrowOffset;
                }
                break;
            case PopoverActualPlacement.Left:
                left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
                top = this.getHorizontalTop(targetRect, popoverSize);
                if (!allowTargetOverlap) {
                    maxWidth = targetRect.left - arrowOffset;
                }
                break;
            case PopoverActualPlacement.Right:
                left = targetRect.left + targetRect.width + arrowOffset;
                top = this.getHorizontalTop(targetRect, popoverSize);
                if (allowTargetOverlap) {
                    left = Math.max(Math.min(left, clientWidth - popoverSize.width), 0);
                }
                else {
                    maxWidth = clientWidth - targetRect.right - arrowOffset;
                }
                break;
        }
        // correct popover positions
        if (isVertical) {
            if (popoverSize.width > clientWidth || left < Popover_1.VIEWPORT_MARGIN) {
                left = Popover_1.VIEWPORT_MARGIN;
            }
            else if (left + popoverSize.width > clientWidth - Popover_1.VIEWPORT_MARGIN) {
                left = clientWidth - Popover_1.VIEWPORT_MARGIN - popoverSize.width;
            }
        }
        else {
            if (popoverSize.height > clientHeight || top < Popover_1.VIEWPORT_MARGIN) { // eslint-disable-line
                top = Popover_1.VIEWPORT_MARGIN;
            }
            else if (top + popoverSize.height > clientHeight - Popover_1.VIEWPORT_MARGIN) {
                top = clientHeight - Popover_1.VIEWPORT_MARGIN - popoverSize.height;
            }
        }
        this._maxHeight = Math.round(maxHeight - Popover_1.VIEWPORT_MARGIN);
        this._maxWidth = Math.round(maxWidth - Popover_1.VIEWPORT_MARGIN);
        if (this._left === undefined || Math.abs(this._left - left) > 1.5) {
            this._left = Math.round(left);
        }
        if (this._top === undefined || Math.abs(this._top - top) > 1.5) {
            this._top = Math.round(top);
        }
        const borderRadius = Number.parseInt(window.getComputedStyle(this).getPropertyValue("border-radius"));
        const arrowPos = this.getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius);
        this._left += this.getRTLCorrectionLeft();
        return {
            arrow: arrowPos,
            top: this._top,
            left: this._left,
            actualPlacement,
        };
    }
    get isVertical() {
        return this.placement === PopoverPlacement.Top || this.placement === PopoverPlacement.Bottom;
    }
    getRTLCorrectionLeft() {
        return parseFloat(window.getComputedStyle(this).left) - this.getBoundingClientRect().left;
    }
    /**
     * Calculates the position for the arrow.
     * @private
     * @param targetRect BoundingClientRect of the target element
     * @param popoverSize Width and height of the popover
     * @param left Left offset of the popover
     * @param top Top offset of the popover
     * @param isVertical If the popover is positioned vertically to the target element
     * @param borderRadius Value of the border-radius property
     * @returns  Arrow's coordinates
     */
    getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius) {
        const actualHorizontalAlign = this._actualHorizontalAlign;
        let arrowXCentered = actualHorizontalAlign === PopoverActualHorizontalAlign.Center || actualHorizontalAlign === PopoverActualHorizontalAlign.Stretch;
        if (actualHorizontalAlign === PopoverActualHorizontalAlign.Right && left <= targetRect.left) {
            arrowXCentered = true;
        }
        if (actualHorizontalAlign === PopoverActualHorizontalAlign.Left && left + popoverSize.width >= targetRect.left + targetRect.width) {
            arrowXCentered = true;
        }
        let arrowTranslateX = 0;
        if (isVertical && arrowXCentered) {
            arrowTranslateX = targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2;
        }
        let arrowTranslateY = 0;
        if (!isVertical) {
            arrowTranslateY = targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2;
        }
        // Restricts the arrow's translate value along each dimension,
        // so that the arrow does not clip over the popover's rounded borders.
        const safeRangeForArrowY = popoverSize.height / 2 - borderRadius - ARROW_SIZE / 2 - 2;
        arrowTranslateY = clamp(arrowTranslateY, -safeRangeForArrowY, safeRangeForArrowY);
        const safeRangeForArrowX = popoverSize.width / 2 - borderRadius - ARROW_SIZE / 2 - 2;
        arrowTranslateX = clamp(arrowTranslateX, -safeRangeForArrowX, safeRangeForArrowX);
        return {
            x: Math.round(arrowTranslateX),
            y: Math.round(arrowTranslateY),
        };
    }
    /**
     * Fallbacks to new placement, prioritizing `Left` and `Right` placements.
     * @private
     */
    fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) {
        if (targetRect.left > popoverSize.width) {
            return PopoverActualPlacement.Left;
        }
        if (clientWidth - targetRect.right > targetRect.left) {
            return PopoverActualPlacement.Right;
        }
        if (clientHeight - targetRect.bottom > popoverSize.height) {
            return PopoverActualPlacement.Bottom;
        }
        if (clientHeight - targetRect.bottom < targetRect.top) {
            return PopoverActualPlacement.Top;
        }
    }
    getActualPlacement(targetRect) {
        const placement = this.placement;
        const popoverSize = this.getPopoverSize(!this.allowTargetOverlap);
        let actualPlacement = PopoverActualPlacement.Right;
        switch (placement) {
            case PopoverPlacement.Start:
                actualPlacement = this.isRtl ? PopoverActualPlacement.Right : PopoverActualPlacement.Left;
                break;
            case PopoverPlacement.End:
                actualPlacement = this.isRtl ? PopoverActualPlacement.Left : PopoverActualPlacement.Right;
                break;
            case PopoverPlacement.Top:
                actualPlacement = PopoverActualPlacement.Top;
                break;
            case PopoverPlacement.Bottom:
                actualPlacement = PopoverActualPlacement.Bottom;
                break;
        }
        const clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        let popoverHeight = popoverSize.height;
        if (this.isVertical) {
            popoverHeight += this.hideArrow ? 0 : ARROW_SIZE;
            clientHeight -= Popover_1.VIEWPORT_MARGIN;
        }
        switch (actualPlacement) {
            case PopoverActualPlacement.Top:
                if (targetRect.top < popoverHeight
                    && targetRect.top < clientHeight - targetRect.bottom) {
                    actualPlacement = PopoverActualPlacement.Bottom;
                }
                break;
            case PopoverActualPlacement.Bottom:
                if (clientHeight - targetRect.bottom < popoverHeight
                    && clientHeight - targetRect.bottom < targetRect.top) {
                    actualPlacement = PopoverActualPlacement.Top;
                }
                break;
            case PopoverActualPlacement.Left:
                if (targetRect.left < popoverSize.width) {
                    actualPlacement = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || actualPlacement;
                }
                break;
            case PopoverActualPlacement.Right:
                if (clientWidth - targetRect.right < popoverSize.width) {
                    actualPlacement = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || actualPlacement;
                }
                break;
        }
        return actualPlacement;
    }
    getVerticalLeft(targetRect, popoverSize) {
        const actualHorizontalAlign = this._actualHorizontalAlign;
        let left = Popover_1.VIEWPORT_MARGIN;
        switch (actualHorizontalAlign) {
            case PopoverActualHorizontalAlign.Center:
            case PopoverActualHorizontalAlign.Stretch:
                left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
                left = this._popoverResize.getCorrectedLeft(left);
                break;
            case PopoverActualHorizontalAlign.Left:
                left = targetRect.left;
                break;
            case PopoverActualHorizontalAlign.Right:
                left = targetRect.right - popoverSize.width;
                break;
        }
        return left;
    }
    getHorizontalTop(targetRect, popoverSize) {
        let top = 0;
        switch (this.verticalAlign) {
            case PopoverVerticalAlign.Center:
            case PopoverVerticalAlign.Stretch:
                top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
                top = this._popoverResize.getCorrectedTop(top);
                break;
            case PopoverVerticalAlign.Top:
                top = targetRect.top;
                break;
            case PopoverVerticalAlign.Bottom:
                top = targetRect.bottom - popoverSize.height;
                break;
        }
        return top;
    }
    get isModal() {
        return this.modal;
    }
    get _ariaLabelledBy() {
        if (!this._ariaLabel && this._displayHeader) {
            return "ui5-popup-header";
        }
        return undefined;
    }
    get styles() {
        return {
            ...super.styles,
            root: {
                "max-height": this._maxHeight ? `${this._maxHeight}px` : "",
                "max-width": this._maxWidth ? `${this._maxWidth}px` : "",
            },
            arrow: {
                transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`,
            },
        };
    }
    get classes() {
        const allClasses = super.classes;
        allClasses.root["ui5-popover-root"] = true;
        allClasses.root["ui5-popover-rtl"] = this.isRtl;
        if (this.resizable) {
            this._popoverResize.setCorrectResizeHandleClass(allClasses);
        }
        return allClasses;
    }
    /**
     * Hook for descendants to hide header.
     */
    get _displayHeader() {
        return !!(this.header.length || this.headerText);
    }
    /**
     * Hook for descendants to hide footer.
     */
    get _displayFooter() {
        return true;
    }
    get isRtl() {
        return this.effectiveDir === "rtl";
    }
    get _actualHorizontalAlign() {
        switch (this.horizontalAlign) {
            case PopoverHorizontalAlign.Start:
                return this.isRtl ? PopoverActualHorizontalAlign.Right : PopoverActualHorizontalAlign.Left;
            case PopoverHorizontalAlign.End:
                return this.isRtl ? PopoverActualHorizontalAlign.Left : PopoverActualHorizontalAlign.Right;
            case PopoverHorizontalAlign.Stretch:
                return PopoverActualHorizontalAlign.Stretch;
            case PopoverHorizontalAlign.Center:
            default:
                return PopoverActualHorizontalAlign.Center;
        }
    }
    get _showResizeHandle() {
        return this.resizable && this.onDesktop;
    }
    get resizeHandlePlacement() {
        return this._resizeHandlePlacement;
    }
    _onResizeMouseDown(e) {
        this._popoverResize.onResizeMouseDown(e);
        this._resizeHandlePlacement = this._popoverResize.getResizeHandlePlacement();
    }
};
__decorate([
    property()
], Popover.prototype, "headerText", void 0);
__decorate([
    property()
], Popover.prototype, "placement", void 0);
__decorate([
    property()
], Popover.prototype, "horizontalAlign", void 0);
__decorate([
    property()
], Popover.prototype, "verticalAlign", void 0);
__decorate([
    property({ type: Boolean })
], Popover.prototype, "modal", void 0);
__decorate([
    property({ type: Boolean })
], Popover.prototype, "hideArrow", void 0);
__decorate([
    property({ type: Boolean })
], Popover.prototype, "allowTargetOverlap", void 0);
__decorate([
    property({ type: Boolean })
], Popover.prototype, "resizable", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], Popover.prototype, "arrowTranslateX", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], Popover.prototype, "arrowTranslateY", void 0);
__decorate([
    property()
], Popover.prototype, "actualPlacement", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], Popover.prototype, "_maxHeight", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], Popover.prototype, "_maxWidth", void 0);
__decorate([
    property({ noAttribute: true })
], Popover.prototype, "_resizeHandlePlacement", void 0);
__decorate([
    slot()
], Popover.prototype, "header", void 0);
__decorate([
    slot()
], Popover.prototype, "footer", void 0);
__decorate([
    property({ converter: DOMReferenceConverter })
], Popover.prototype, "opener", null);
Popover = Popover_1 = __decorate([
    customElement({
        tag: "ui5-popover",
        styles: [
            Popup.styles,
            PopupsCommonCss,
            PopoverCss,
        ],
        template: PopoverTemplate,
    })
], Popover);
Popover.define();
export default Popover;
export const instanceOfPopover = createInstanceChecker("isPopover");
export { PopoverActualPlacement, PopoverActualHorizontalAlign };
//# sourceMappingURL=Popover.js.map