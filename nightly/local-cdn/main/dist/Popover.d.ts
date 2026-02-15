import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Popup from "./Popup.js";
import PopoverPlacement from "./types/PopoverPlacement.js";
import PopoverVerticalAlign from "./types/PopoverVerticalAlign.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import PopoverResize from "./PopoverResize.js";
import type { ResizeHandlePlacement } from "./PopoverResize.js";
type PopoverSize = {
    width: number;
    height: number;
};
type ArrowPosition = {
    x: number;
    y: number;
};
declare enum PopoverActualHorizontalAlign {
    Center = "Center",
    Left = "Left",
    Right = "Right",
    Stretch = "Stretch"
}
declare enum PopoverActualPlacement {
    Left = "Left",
    Right = "Right",
    Top = "Top",
    Bottom = "Bottom"
}
type CalculatedPlacement = {
    arrow: ArrowPosition;
    top: number;
    left: number;
    actualPlacement: `${PopoverActualPlacement}`;
};
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
declare class Popover extends Popup {
    eventDetails: Popup["eventDetails"];
    /**
     * Defines the header text.
     *
     * **Note:** If `header` slot is provided, the `headerText` is ignored.
     * @default undefined
     * @public
     */
    headerText?: string;
    /**
     * Determines on which side the component is placed at.
     * @default "End"
     * @public
     */
    placement: `${PopoverPlacement}`;
    /**
     * Determines the horizontal alignment of the component.
     * @default "Center"
     * @public
     */
    horizontalAlign: `${PopoverHorizontalAlign}`;
    /**
     * Determines the vertical alignment of the component.
     * @default "Center"
     * @public
     */
    verticalAlign: `${PopoverVerticalAlign}`;
    /**
     * Defines whether the component should close when
     * clicking/tapping outside the popover.
     * If enabled, it blocks any interaction with the background.
     * @default false
     * @public
     */
    modal: boolean;
    /**
     * Determines whether the component arrow is hidden.
     * @default false
     * @public
     * @since 1.0.0-rc.15
     */
    hideArrow: boolean;
    /**
     * Determines if there is no enough space, the component can be placed
     * over the target.
     * @default false
     * @public
     */
    allowTargetOverlap: boolean;
    /**
     * Determines whether the component is resizable.
     * **Note:** This property is effective only on desktop devices.
     * @default false
     * @public
     * @since 2.19.0
     */
    resizable: boolean;
    /**
     * Sets the X translation of the arrow
     * @private
     */
    arrowTranslateX: number;
    /**
     * Sets the Y translation of the arrow
     * @private
     */
    arrowTranslateY: number;
    /**
     * Returns the calculated placement depending on the free space
     * @private
     */
    actualPlacement: `${PopoverActualPlacement}`;
    _maxHeight?: number;
    _maxWidth?: number;
    _resizeHandlePlacement?: `${ResizeHandlePlacement}`;
    /**
     * Defines the header HTML Element.
     * @public
     */
    header: Slot<HTMLElement>;
    /**
     * Defines the footer HTML Element.
     * @public
     */
    footer: Slot<HTMLElement>;
    _opener?: HTMLElement | string | null | undefined;
    _openerRect?: DOMRect;
    _preventRepositionAndClose?: boolean;
    _top?: number;
    _left?: number;
    _oldPlacement?: CalculatedPlacement;
    _width?: string;
    _height?: string;
    _popoverResize: PopoverResize;
    _initialWidth?: string;
    _initialHeight?: string;
    static get VIEWPORT_MARGIN(): number;
    constructor();
    /**
     * Defines the ID or DOM Reference of the element at which the popover is shown.
     * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
     * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
     * @public
     * @default undefined
     * @since 1.2.0
     */
    set opener(value: HTMLElement | string | null);
    get opener(): HTMLElement | string | null | undefined;
    openPopup(): Promise<void>;
    closePopup(escPressed?: boolean, preventRegistryUpdate?: boolean, preventFocusRestore?: boolean): void;
    isOpenerClicked(e: MouseEvent): boolean;
    isClicked(e: MouseEvent): boolean;
    /**
     * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
     * @private
     */
    _addOpenedPopup(): void;
    /**
     * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
     * @private
     */
    _removeOpenedPopup(): void;
    getOpenerHTMLElement(opener: HTMLElement | string | null | undefined): HTMLElement | null | undefined;
    shouldCloseDueToOverflow(placement: `${PopoverActualPlacement}`, openerRect: DOMRect): boolean;
    shouldCloseDueToNoOpener(openerRect: DOMRect): boolean;
    isOpenerOutsideViewport(openerRect: DOMRect): boolean;
    /**
     * @override
     */
    _resize(): void;
    get _viewportMargin(): number;
    reposition(): void;
    _show(): Promise<void>;
    /**
     * Adjust the desired top position to compensate for shift of the screen
     * caused by opened keyboard on iOS which affects all elements with position:fixed.
     * @private
     * @param top The target top in px.
     * @returns The adjusted top in px.
     */
    _adjustForIOSKeyboard(top: number): number;
    getPopoverSize(calcScrollHeight?: boolean): PopoverSize;
    _showOutsideViewport(): void;
    _isUI5AbstractElement(el: HTMLElement): el is UI5Element;
    get arrowDOM(): Element;
    /**
     * @protected
     */
    focusOpener(): void;
    /**
     * @private
     */
    calcPlacement(targetRect: DOMRect, popoverSize: PopoverSize): CalculatedPlacement;
    get isVertical(): boolean;
    getRTLCorrectionLeft(): number;
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
    getArrowPosition(targetRect: DOMRect, popoverSize: PopoverSize, left: number, top: number, isVertical: boolean, borderRadius: number): ArrowPosition;
    /**
     * Fallbacks to new placement, prioritizing `Left` and `Right` placements.
     * @private
     */
    fallbackPlacement(clientWidth: number, clientHeight: number, targetRect: DOMRect, popoverSize: PopoverSize): PopoverActualPlacement | undefined;
    getActualPlacement(targetRect: DOMRect): `${PopoverActualPlacement}`;
    getVerticalLeft(targetRect: DOMRect, popoverSize: PopoverSize): number;
    getHorizontalTop(targetRect: DOMRect, popoverSize: PopoverSize): number;
    get isModal(): boolean;
    get _ariaLabelledBy(): "ui5-popup-header" | undefined;
    get styles(): {
        root: {
            "max-height": string;
            "max-width": string;
        };
        arrow: {
            transform: string;
        };
        content: {};
    };
    get classes(): import("@ui5/webcomponents-base/dist/types.js").ClassMap;
    /**
     * Hook for descendants to hide header.
     */
    get _displayHeader(): boolean;
    /**
     * Hook for descendants to hide footer.
     */
    get _displayFooter(): boolean;
    get isRtl(): boolean;
    get _actualHorizontalAlign(): PopoverActualHorizontalAlign;
    get _showResizeHandle(): boolean;
    get resizeHandlePlacement(): "TopLeft" | "TopRight" | "BottomLeft" | "BottomRight" | undefined;
    _onResizeMouseDown(e: MouseEvent): void;
    readonly isPopover = true;
}
export default Popover;
export declare const instanceOfPopover: (object: any) => object is Popover;
export { PopoverActualPlacement, PopoverActualHorizontalAlign };
