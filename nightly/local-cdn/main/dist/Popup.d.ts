import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import PopupAccessibleRole from "./types/PopupAccessibleRole.js";
type PopupScrollEventDetail = {
    scrollTop: number;
    targetRef: HTMLElement;
};
type PopupBeforeCloseEventDetail = {
    escPressed: boolean;
};
/**
 * @class
 * ### Overview
 * Base class for all popup Web Components.
 *
 * If you need to create your own popup-like custom UI5 Web Components.
 *
 * 1. The Popup class handles modality:
 *  - The "isModal" getter can be overridden by derivatives to provide their own conditions when they are modal or not
 *  - Derivatives may call the "blockPageScrolling" and "unblockPageScrolling" static methods to temporarily remove scrollbars on the html element
 *  - Derivatives may call the "openPopup" and "closePopup" methods which handle focus, manage the popup registry and for modal popups, manage the blocking layer
 *
 *  2. Provides blocking layer (relevant for modal popups only):
 *   - Controlled by the "open" and "close" methods
 *
 * 3. The Popup class "traps" focus:
 *  - Derivatives may call the "applyInitialFocus" method (usually when opening, to transfer focus inside the popup)
 *
 * 4. The template of this component exposes two inline partials you can override in derivatives:
 *  - beforeContent (upper part of the box, useful for header/title/close button)
 *  - afterContent (lower part, useful for footer/action buttons)
 * @constructor
 * @extends UI5Element
 * @public
 */
declare abstract class Popup extends UI5Element {
    eventDetails: {
        "before-open": void;
        "open": void;
        "before-close": PopupBeforeCloseEventDetail;
        "close": void;
        "scroll": PopupScrollEventDetail;
    };
    /**
     * Defines the ID of the HTML Element, which will get the initial focus.
     *
     * **Note:** If an element with `autofocus` attribute is added inside the component,
     * `initialFocus` won't take effect.
     * @default undefined
     * @public
     */
    initialFocus?: string;
    /**
     * Defines if the focus should be returned to the previously focused element,
     * when the popup closes.
     * @default false
     * @public
     * @since 1.0.0-rc.8
    */
    preventFocusRestore: boolean;
    /**
     * Defines the accessible name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Defines the IDs of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.1.0
     */
    accessibleNameRef?: string;
    /**
     * Allows setting a custom role.
     * @default "Dialog"
     * @public
     * @since 1.10.0
     */
    accessibleRole: `${PopupAccessibleRole}`;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.11.0
     */
    accessibleDescription?: string;
    /**
     * Receives id(or many ids) of the elements that describe the component.
     * @default undefined
     * @public
     * @since 2.11.0
     */
    accessibleDescriptionRef?: string;
    /**
     * Constantly updated value of texts collected from the associated labels.
     * @private
     */
    _associatedDescriptionRefTexts?: string;
    /**
     * Defines the current media query size.
     * @private
     */
    mediaRange?: string;
    /**
     * Indicates whether initial focus should be prevented.
     * @public
     * @default false
     * @since 2.0.0
     */
    preventInitialFocus: boolean;
    /**
     * Indicates if the element is the top modal popup
     *
     * This property is calculated automatically
     * @private
     * @default false
     */
    isTopModalPopup: boolean;
    /**
     * Defines the content of the Popup.
     * @public
     */
    content: DefaultSlot<HTMLElement>;
    /**
     * @private
     */
    onPhone: boolean;
    /**
     * @private
     */
    onDesktop: boolean;
    _resizeHandler: ResizeObserverCallback;
    _shouldFocusRoot?: boolean;
    _focusedElementBeforeOpen?: HTMLElement | null;
    _opened: boolean;
    _open: boolean;
    _resizeHandlerRegistered: boolean;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    handleOpenOnEnterDOM(): void;
    onExitDOM(): void;
    /**
     * Indicates if the element is open
     * @public
     * @default false
     * @since 1.2.0
     */
    set open(value: boolean);
    get open(): boolean;
    openPopup(): Promise<void>;
    _resize(): void;
    /**
     * Prevents the user from interacting with the content under the block layer
     */
    _preventBlockLayerFocus(e: KeyboardEvent | MouseEvent): void;
    _attachBrowserEvents(): void;
    _detachBrowserEvents(): void;
    /**
     * Temporarily removes scrollbars from the html element
     * @protected
     */
    static blockPageScrolling(popup: Popup): void;
    /**
     * Restores scrollbars on the html element, if needed
     * @protected
     */
    static unblockPageScrolling(popup: Popup): void;
    _scroll(e: Event): void;
    _onkeydown(e: KeyboardEvent): void;
    _onfocusout(e: FocusEvent): void;
    _onmousedown(e: MouseEvent): void;
    _onmouseup(): void;
    /**
     * Focus trapping
     * @private
     */
    forwardToFirst(): Promise<void>;
    /**
     * Focus trapping
     * @private
     */
    forwardToLast(): Promise<void>;
    /**
     * Use this method to focus the element denoted by "initialFocus", if provided,
     * or the first focusable element otherwise.
     * @protected
     */
    applyInitialFocus(): Promise<void>;
    /**
     * Focuses the element denoted by `initialFocus`, if provided,
     * or the first focusable element otherwise.
     * @public
     * @returns Promise that resolves when the focus is applied
     */
    applyFocus(): Promise<void>;
    isFocusWithin(): boolean;
    _updateMediaRange(): void;
    _updateAssociatedLabelsTexts(): void;
    /**
     * Adds the popup to the "opened popups registry"
     * @protected
     */
    _addOpenedPopup(): void;
    /**
     * Closes the popup.
     */
    closePopup(escPressed?: boolean, preventRegistryUpdate?: boolean, preventFocusRestore?: boolean): void;
    /**
     * Removes the popup from the "opened popups registry"
     * @protected
     */
    _removeOpenedPopup(): void;
    /**
     * Returns the focus to the previously focused element
     * @protected
     */
    resetFocus(): void;
    /**
     * Sets "block" display to the popup. The property can be overriden by derivatives of Popup.
     * @protected
     */
    _show(): void;
    _registerResizeHandler(): void;
    _deregisterResizeHandler(): void;
    /**
     * Sets "none" display to the popup
     * @protected
     */
    hide(): void;
    /**
     * Implement this getter with relevant logic regarding the modality of the popup (e.g. based on a public property)
     * @protected
     */
    abstract get isModal(): boolean;
    /**
     * Return the ID of an element in the shadow DOM that is going to label this popup
     * @protected
     */
    abstract get _ariaLabelledBy(): string | undefined;
    /**
     * Ensures ariaLabel is never null or empty string
     * @protected
     */
    get _ariaLabel(): string | undefined;
    get _accInfoAriaDescription(): string;
    get ariaDescriptionText(): string | undefined;
    get ariaDescriptionTextId(): "" | "accessibleDescription";
    get ariaDescribedByIds(): string;
    get _root(): HTMLElement;
    get _role(): "dialog" | "alertdialog" | undefined;
    get _ariaModal(): "true" | undefined;
    get contentDOM(): HTMLElement;
    get styles(): {
        root: {};
        content: {};
    };
    get classes(): ClassMap;
}
export default Popup;
export type { PopupScrollEventDetail, PopupBeforeCloseEventDetail };
