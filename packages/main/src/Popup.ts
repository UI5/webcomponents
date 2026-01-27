import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UI5Element, { type DefaultSlot, type Slot, type IsDefaultSlot, type IsSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	isChrome,
	isDesktop,
	isPhone,
} from "@ui5/webcomponents-base/dist/Device.js";
import { getFirstFocusableElement, getLastFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import {
	registerUI5Element,
	getEffectiveAriaLabelText,
	getEffectiveAriaDescriptionText,
	getAllAccessibleDescriptionRefTexts,
	deregisterUI5Element,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { hasStyle, createStyle } from "@ui5/webcomponents-base/dist/ManagedStyles.js";
import { isEnter, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import { getFocusedElement, isFocusedElementWithinNode } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import PopupTemplate from "./PopupTemplate.js";
import PopupAccessibleRole from "./types/PopupAccessibleRole.js";
import { addOpenedPopup, removeOpenedPopup } from "./popup-utils/OpenedPopupsRegistry.js";

// Styles
import popupStlyes from "./generated/themes/Popup.css.js";
import popupBlockLayerStyles from "./generated/themes/PopupBlockLayer.css.js";
import globalStyles from "./generated/themes/PopupGlobal.css.js";

const createBlockingStyle = (): void => {
	if (!hasStyle("data-ui5-popup-scroll-blocker")) {
		createStyle(globalStyles, "data-ui5-popup-scroll-blocker");
	}
};

createBlockingStyle();

const pageScrollingBlockers = new Set<Popup>();

type PopupScrollEventDetail = {
	scrollTop: number;
	targetRef: HTMLElement;
}

type PopupBeforeCloseEventDetail = {
	escPressed: boolean;
}

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
@customElement({
	renderer: jsxRender,
	styles: [popupStlyes, popupBlockLayerStyles],
	template: PopupTemplate,
})
/**
 * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening.
 * @public
 */
@event("before-open", {
	cancelable: true,
})

/**
 * Fired after the component is opened.
 * @public
 */
@event("open")

/**
 * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing.
 * @public
 * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
 */
@event("before-close", {
	cancelable: true,
})

/**
 * Fired after the component is closed.
 * @public
 */
@event("close")

/**
 * Fired whenever the popup content area is scrolled
 * @private
 */
@event("scroll", {
	bubbles: true,
})
abstract class Popup extends UI5Element {
	eventDetails!: {
		"before-open": void
		"open": void
		"before-close": PopupBeforeCloseEventDetail
		"close": void
		"scroll": PopupScrollEventDetail
	}

	/**
	 * Defines the ID of the HTML Element, which will get the initial focus.
	 *
	 * **Note:** If an element with `autofocus` attribute is added inside the component,
	 * `initialFocus` won't take effect.
	 * @default undefined
	 * @public
	 */
	@property()
	initialFocus?: string;

	/**
	 * Defines if the focus should be returned to the previously focused element,
	 * when the popup closes.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.8
	*/
	@property({ type: Boolean })
	preventFocusRestore = false;

	/**
	 * Defines the accessible name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the IDs of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 1.1.0
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Allows setting a custom role.
	 * @default "Dialog"
	 * @public
	 * @since 1.10.0
	 */
	@property()
	accessibleRole: `${PopupAccessibleRole}` = "Dialog";

	/**
	 * Defines the accessible description of the component.
	 * @default undefined
	 * @public
	 * @since 2.11.0
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Receives id(or many ids) of the elements that describe the component.
	 * @default undefined
	 * @public
	 * @since 2.11.0
	 */
	@property()
	accessibleDescriptionRef?: string;

	/**
	 * Constantly updated value of texts collected from the associated labels.
	 * @private
	 */
	@property({ noAttribute: true })
	_associatedDescriptionRefTexts?: string;

	/**
	 * Defines the current media query size.
	 * @private
	 */
	@property()
	mediaRange?: string;

	/**
	 * Indicates whether initial focus should be prevented.
	 * @public
	 * @default false
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	preventInitialFocus = false;

	/**
	 * Indicates if the element is the top modal popup
	 *
	 * This property is calculated automatically
	 * @private
	 * @default false
	 */
	@property({ type: Boolean, noAttribute: true })
	isTopModalPopup = false;

	/**
	 * Defines the content of the Popup.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: DefaultSlot<Array<HTMLElement>>;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	onPhone = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	onDesktop = false;

	_resizeHandler: ResizeObserverCallback;
	_shouldFocusRoot?: boolean;
	_focusedElementBeforeOpen?: HTMLElement | null;
	_opened = false;
	_open = false;
	_resizeHandlerRegistered = false;

	constructor() {
		super();

		this._resizeHandler = this._resize.bind(this);

		this._getRealDomRef = () => {
			return this.shadowRoot!.querySelector<HTMLElement>("[root-element]")!;
		};
	}

	onBeforeRendering() {
		this.onPhone = isPhone();
		this.onDesktop = isDesktop();
	}

	onAfterRendering() {
		renderFinished().then(() => {
			this._updateMediaRange();
		});

		if (this.open) {
			this._registerResizeHandler();
		} else {
			this._deregisterResizeHandler();
		}
	}

	onEnterDOM() {
		this.setAttribute("popover", "manual");

		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}

		this.tabIndex = -1;

		this.handleOpenOnEnterDOM();

		this.setAttribute("data-sap-ui-fastnavgroup-container", "true");
		registerUI5Element(this, this._updateAssociatedLabelsTexts.bind(this));
	}

	handleOpenOnEnterDOM() {
		if (this.open) {
			this.showPopover();
			this.openPopup();
		}
	}

	onExitDOM() {
		if (this._opened) {
			Popup.unblockPageScrolling(this);
			this._removeOpenedPopup();
		}

		this._deregisterResizeHandler();
		this._detachBrowserEvents();
		deregisterUI5Element(this);
	}

	/**
	 * Indicates if the element is open
	 * @public
	 * @default false
	 * @since 1.2.0
	 */
	@property({ type: Boolean })
	set open(value: boolean) {
		if (this._open === value) {
			return;
		}

		this._open = value;

		if (value) {
			this.openPopup();
		} else {
			this.closePopup();
		}
	}

	get open() : boolean {
		return this._open;
	}

	async openPopup() {
		if (this._opened) {
			return;
		}

		const prevented = !this.fireDecoratorEvent("before-open");

		if (prevented) {
			this.open = false;
			return;
		}

		this._attachBrowserEvents();

		if (this.isModal) {
			Popup.blockPageScrolling(this);
		}

		this._focusedElementBeforeOpen = getFocusedElement();

		this._show();
		this._opened = true;

		if (this.getDomRef()) {
			this._updateMediaRange();
		}

		this._addOpenedPopup();

		this.open = true;

		// initial focus, if focused element is statically created
		await this.applyInitialFocus();

		await renderFinished();

		if (this.isConnected) {
			this.fireDecoratorEvent("open");
		}
	}

	_resize() {
		this._updateMediaRange();
	}

	/**
	 * Prevents the user from interacting with the content under the block layer
	 */
	_preventBlockLayerFocus(e: KeyboardEvent | MouseEvent) {
		e.preventDefault();
	}

	_attachBrowserEvents() {

	}

	_detachBrowserEvents() {

	}

	/**
	 * Temporarily removes scrollbars from the html element
	 * @protected
	 */
	static blockPageScrolling(popup: Popup) {
		pageScrollingBlockers.add(popup);

		if (pageScrollingBlockers.size !== 1) {
			return;
		}

		document.documentElement.classList.add("ui5-popup-scroll-blocker");
	}

	/**
	 * Restores scrollbars on the html element, if needed
	 * @protected
	 */
	static unblockPageScrolling(popup: Popup) {
		pageScrollingBlockers.delete(popup);

		if (pageScrollingBlockers.size !== 0) {
			return;
		}

		document.documentElement.classList.remove("ui5-popup-scroll-blocker");
	}

	_scroll(e: Event) {
		this.fireDecoratorEvent("scroll", {
			scrollTop: (e.target as HTMLElement).scrollTop,
			targetRef: e.target as HTMLElement,
		});
	}

	_onkeydown(e: KeyboardEvent) {
		const isTabOutAttempt = e.target === this._root && isTabPrevious(e);
		// if the popup is closed, focus is already moved, so Enter keydown may result in click on the newly focused element
		const isEnterOnClosedPopupChild = isEnter(e) && !this.open;

		if (isTabOutAttempt || isEnterOnClosedPopupChild) {
			e.preventDefault();
		}
	}

	_onfocusout(e: FocusEvent) {
		// relatedTarget is the element, which will get focus. If no such element exists, focus the root.
		// This happens after the mouse is released in order to not interrupt text selection.
		if (!e.relatedTarget) {
			this._shouldFocusRoot = true;
		}
	}

	_onmousedown(e: MouseEvent) {
		if (this.shadowRoot!.contains(e.target as HTMLElement)) {
			this._shouldFocusRoot = true;
		} else {
			this._shouldFocusRoot = false;
		}
	}

	_onmouseup() {
		if (this._shouldFocusRoot) {
			if (isChrome()) {
				this._root.focus();
			}
			this._shouldFocusRoot = false;
		}
	}

	/**
	 * Focus trapping
	 * @private
	 */
	async forwardToFirst() {
		const firstFocusable = await getFirstFocusableElement(this);

		if (firstFocusable) {
			firstFocusable.focus();
		} else {
			this._root.focus();
		}
	}

	/**
	 * Focus trapping
	 * @private
	 */
	async forwardToLast() {
		const lastFocusable = await getLastFocusableElement(this);

		if (lastFocusable) {
			lastFocusable.focus();
		} else {
			this._root.focus();
		}
	}

	/**
	 * Use this method to focus the element denoted by "initialFocus", if provided,
	 * or the first focusable element otherwise.
	 * @protected
	 */
	async applyInitialFocus() {
		if (!this.preventInitialFocus) {
			await this.applyFocus();
		}
	}

	/**
	 * Focuses the element denoted by `initialFocus`, if provided,
	 * or the first focusable element otherwise.
	 * @public
	 * @returns Promise that resolves when the focus is applied
	 */
	async applyFocus(): Promise<void> {
		// do nothing if the standard HTML autofocus is used
		if (this.querySelector("[autofocus]")) {
			return;
		}

		await this._waitForDomRef();

		if (this.getRootNode() === this) {
			return;
		}

		let element;

		if (this.initialFocus) {
			element = (this.getRootNode() as Document).getElementById(this.initialFocus)
			|| document.getElementById(this.initialFocus);
		}

		element = element || await getFirstFocusableElement(this) || this._root; // in case of no focusable content focus the root

		if (element) {
			if (element === this._root) {
				element.tabIndex = -1;
			}
			element.focus();
		}
	}

	isFocusWithin() {
		return isFocusedElementWithinNode(this._root);
	}

	_updateMediaRange() {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef()!.offsetWidth);
	}

	_updateAssociatedLabelsTexts() {
		this._associatedDescriptionRefTexts = getAllAccessibleDescriptionRefTexts(this);
	}

	/**
	 * Adds the popup to the "opened popups registry"
	 * @protected
	 */
	_addOpenedPopup() {
		addOpenedPopup(this);
	}

	/**
	 * Closes the popup.
	 */
	closePopup(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false): void {
		if (!this._opened) {
			return;
		}

		const prevented = !this.fireDecoratorEvent("before-close", { escPressed });
		if (prevented) {
			this.open = true;
			return;
		}

		this._opened = false;

		if (this.isModal) {
			Popup.unblockPageScrolling(this);
		}

		this.hide();
		this.open = false;

		this._detachBrowserEvents();

		if (!preventRegistryUpdate) {
			this._removeOpenedPopup();
		}

		if (!this.preventFocusRestore && !preventFocusRestore) {
			this.resetFocus();
		}

		this.fireDecoratorEvent("close");
	}

	/**
	 * Removes the popup from the "opened popups registry"
	 * @protected
	 */
	_removeOpenedPopup() {
		removeOpenedPopup(this);
	}

	/**
	 * Returns the focus to the previously focused element
	 * @protected
	 */
	resetFocus() {
		this._focusedElementBeforeOpen?.focus();
		this._focusedElementBeforeOpen = null;
	}

	/**
	 * Sets "block" display to the popup. The property can be overriden by derivatives of Popup.
	 * @protected
	 */
	_show() {
		if (this.isConnected) {
			this.setAttribute("popover", "manual");
			this.showPopover();
		}
	}

	_registerResizeHandler() {
		if (!this._resizeHandlerRegistered) {
			ResizeHandler.register(this, this._resizeHandler);
			this._resizeHandlerRegistered = true;
		}
	}

	_deregisterResizeHandler() {
		if (this._resizeHandlerRegistered) {
			ResizeHandler.deregister(this, this._resizeHandler);
			this._resizeHandlerRegistered = false;
		}
	}

	/**
	 * Sets "none" display to the popup
	 * @protected
	 */
	hide() {
		this.isConnected && this.hidePopover();
	}

	/**
	 * Implement this getter with relevant logic regarding the modality of the popup (e.g. based on a public property)
	 * @protected
	 */
	abstract get isModal(): boolean

	/**
	 * Return the ID of an element in the shadow DOM that is going to label this popup
	 * @protected
	 */
	abstract get _ariaLabelledBy(): string | undefined

	/**
	 * Ensures ariaLabel is never null or empty string
	 * @protected
	 */
	get _ariaLabel() {
		return getEffectiveAriaLabelText(this);
	}

	get _accInfoAriaDescription() {
		return this.ariaDescriptionText || "";
	}

	get ariaDescriptionText() {
		return this._associatedDescriptionRefTexts || getEffectiveAriaDescriptionText(this);
	}

	get ariaDescriptionTextId() {
		return this.ariaDescriptionText ? "accessibleDescription" : "";
	}

	get ariaDescribedByIds() {
		return [
			this.ariaDescriptionTextId,
		].filter(Boolean).join(" ");
	}

	get _root(): HTMLElement {
		return this.shadowRoot!.querySelector(".ui5-popup-root")!;
	}

	get _role() {
		return (this.accessibleRole === PopupAccessibleRole.None) ? undefined : toLowercaseEnumValue(this.accessibleRole);
	}

	get _ariaModal(): "true" | undefined {
		return this.accessibleRole === PopupAccessibleRole.None ? undefined : "true";
	}

	get contentDOM(): HTMLElement {
		return this.shadowRoot!.querySelector(".ui5-popup-content")!;
	}

	get styles() {
		return {
			root: {},
			content: {},
		};
	}

	get classes(): ClassMap {
		return {
			root: {
				"ui5-popup-root": true,
			},
			content: {
				"ui5-popup-content": true,
			},
		};
	}
}

export default Popup;
export type { PopupScrollEventDetail, PopupBeforeCloseEventDetail };
