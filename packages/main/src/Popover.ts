import { instanceOfUI5Element } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
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
import type { ResizeHandlePlacement } from "./PopoverResize.js";

// Template
import PopoverTemplate from "./PopoverTemplate.js";
// Styles
import PopupsCommonCss from "./generated/themes/PopupsCommon.css.js";
import PopoverCss from "./generated/themes/Popover.css.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";

const ARROW_SIZE = 8;

type PopoverSize = {
	width: number;
	height: number;
}

enum PopoverActualHorizontalAlign {
	Center = "Center",
	Left = "Left",
	Right = "Right",
	Stretch = "Stretch",
}

enum PopoverActualPlacement {
	Left = "Left",
	Right = "Right",
	Top = "Top",
	Bottom = "Bottom",
}

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
@customElement({
	tag: "ui5-popover",
	styles: [
		Popup.styles,
		PopupsCommonCss,
		PopoverCss,
	],
	template: PopoverTemplate,
})
class Popover extends Popup {
	eventDetails!: Popup["eventDetails"];
	/**
	 * Defines the header text.
	 *
	 * **Note:** If `header` slot is provided, the `headerText` is ignored.
	 * @default undefined
	 * @public
	 */
	@property()
	headerText?: string;

	/**
	 * Determines on which side the component is placed at.
	 * @default "End"
	 * @public
	 */
	@property()
	placement: `${PopoverPlacement}` = "End";

	/**
	 * Determines the horizontal alignment of the component.
	 * @default "Center"
	 * @public
	 */
	@property()
	horizontalAlign: `${PopoverHorizontalAlign}` = "Center";

	/**
	 * Determines the vertical alignment of the component.
	 * @default "Center"
	 * @public
	 */
	@property()
	verticalAlign: `${PopoverVerticalAlign}` = "Center";

	/**
	 * Defines whether the component should close when
	 * clicking/tapping outside the popover.
	 * If enabled, it blocks any interaction with the background.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	modal = false;

	/**
	 * Determines whether the component arrow is hidden.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	hideArrow = false;

	/**
	 * Determines if there is no enough space, the component can be placed
	 * over the target.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	allowTargetOverlap = false;

	/**
	 * Determines whether the component is resizable.
	 * **Note:** This property is effective only on desktop devices.
	 * @default false
	 * @public
	 * @since 2.19.0
	 */
	@property({ type: Boolean })
	resizable = false;

	/**
	 * Sets the X translation of the arrow
	 * @private
	 */
	@property({ type: Number, noAttribute: true })
	arrowTranslateX = 0;

	/**
	 * Sets the Y translation of the arrow
	 * @private
	 */
	@property({ type: Number, noAttribute: true })
	arrowTranslateY = 0;

	/**
	 * Returns the calculated placement depending on the free space
	 * @private
	 */
	@property()
	actualPlacement: `${PopoverActualPlacement}` = "Right";

	@property({ noAttribute: true })
	_resizeHandlePlacement?: `${ResizeHandlePlacement}`;

	/**
	 * Defines the header HTML Element.
	 * @public
	 */
	@slot()
	header!: Slot<HTMLElement>;

	/**
	 * Defines the footer HTML Element.
	 * @public
	 */
	@slot()
	footer!: Slot<HTMLElement>;

	_opener?: HTMLElement | string | null | undefined;
	_openerRect?: DOMRect;
	_openerElement?: HTMLElement | null;

	_popoverResize: PopoverResize;

	_initialWidth?: string;
	_initialHeight?: string;

	static _anchorCounter = 0;
	_anchorName: string;

	static get VIEWPORT_MARGIN() {
		return 10; // px
	}

	constructor() {
		super();

		this._anchorName = `--ui5-popover-anchor-${++Popover._anchorCounter}`;
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
	@property({ converter: DOMReferenceConverter })
	set opener(value: HTMLElement | string | null) {
		if (this._opener === value) {
			return;
		}

		this._opener = value;

		if (value && this.open) {
			this.openPopup();
		}
	}

	get opener(): HTMLElement | string | null | undefined {
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

	closePopup(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) : void {
		// Clean up anchor-name from opener
		if (this._openerElement) {
			this._openerElement.style.removeProperty("anchor-name");
			this._openerElement = null;
		}

		// Clean up CSS anchor positioning inline styles from popover host
		this.style.removeProperty("position-anchor");
		this.style.removeProperty("position-area");
		this.style.removeProperty("position-try-fallbacks");

		Object.assign(this.style, {
			width: this._initialWidth,
			height: this._initialHeight,
		});

		this._popoverResize.reset();
		delete this._resizeHandlePlacement;

		super.closePopup(escPressed, preventRegistryUpdate, preventFocusRestore);
	}

	isOpenerClicked(e: MouseEvent) {
		const target = e.target as HTMLElement;
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

	isClicked(e: MouseEvent) {
		if (this._showResizeHandle) {
			const resizeHandle = this.shadowRoot!.querySelector(".ui5-popover-resize-handle");
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

	getOpenerHTMLElement(opener: HTMLElement | string | null | undefined): HTMLElement | null | undefined {
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

		let openerHTMLElement = (rootNode as Document | ShadowRoot).getElementById(opener);

		if (rootNode instanceof ShadowRoot && !openerHTMLElement) {
			openerHTMLElement = document.getElementById(opener);
		}

		if (openerHTMLElement) {
			return this._isUI5AbstractElement(openerHTMLElement) ? openerHTMLElement.getFocusDomRef() : openerHTMLElement;
		}

		return openerHTMLElement;
	}

	shouldCloseDueToOverflow(placement: `${PopoverActualPlacement}`, openerRect: DOMRect): boolean {
		const threshold = 32;
		const limits = {
			"Left": openerRect.right,
			"Right": openerRect.left,
			"Top": openerRect.top,
			"Bottom": openerRect.bottom,
		};

		const opener = this.getOpenerHTMLElement(this.opener);
		const closedPopupParent = getClosedPopupParent(opener!);
		let overflowsBottom = false;
		let overflowsTop = false;

		if (closedPopupParent instanceof Popover) {
			const contentRect = closedPopupParent.getBoundingClientRect();
			overflowsBottom = openerRect.top > (contentRect.top + contentRect.height);
			overflowsTop = (openerRect.top + openerRect.height) < contentRect.top;
		}

		return (limits[placement] < 0 || (limits[placement] + threshold > (closedPopupParent as unknown as Window).innerHeight)) || overflowsBottom || overflowsTop;
	}

	shouldCloseDueToNoOpener(openerRect: DOMRect): boolean {
		return openerRect.top === 0
			&& openerRect.bottom === 0
			&& openerRect.left === 0
			&& openerRect.right === 0;
	}

	isOpenerOutsideViewport(openerRect: DOMRect): boolean {
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
		return Popover.VIEWPORT_MARGIN;
	}

	/**
	 * Maps placement + horizontalAlign/verticalAlign to a CSS position-area value.
	 * Uses CSS logical values (start/end) so RTL is handled automatically.
	 * @private
	 */
	_getPositionArea(): string {
		const placement = this.placement;
		const hAlign = this.horizontalAlign;
		const vAlign = this.verticalAlign;

		if (placement === PopoverPlacement.Top || placement === PopoverPlacement.Bottom) {
			const vertical = placement === PopoverPlacement.Top ? "top" : "bottom";
			switch (hAlign) {
			case PopoverHorizontalAlign.Start:
				return `${vertical} start`;
			case PopoverHorizontalAlign.End:
				return `${vertical} end`;
			case PopoverHorizontalAlign.Stretch:
				return `${vertical} span-all`;
			case PopoverHorizontalAlign.Center:
			default:
				return `${vertical} center`;
			}
		}

		// Start/End placements
		const horizontal = placement === PopoverPlacement.Start ? "start" : "end";
		switch (vAlign) {
		case PopoverVerticalAlign.Top:
			return `top ${horizontal}`;
		case PopoverVerticalAlign.Bottom:
			return `bottom ${horizontal}`;
		case PopoverVerticalAlign.Stretch:
			return `span-all ${horizontal}`;
		case PopoverVerticalAlign.Center:
		default:
			return `center ${horizontal}`;
		}
	}

	/**
	 * Returns CSS position-try-fallbacks value based on placement.
	 * @private
	 */
	_getPositionTryFallbacks(): string {
		const placement = this.placement;

		if (placement === PopoverPlacement.Top || placement === PopoverPlacement.Bottom) {
			return "flip-block";
		}

		// Start/End: try inline flip first, then block, then both
		return "flip-inline, flip-block, flip-block flip-inline";
	}

	reposition() {
		if (!this._opened) {
			return;
		}

		const opener = this.getOpenerHTMLElement(this.opener);
		if (!opener) {
			return;
		}

		this._openerRect = opener.getBoundingClientRect();

		if (this.isOpenerOutsideViewport(this._openerRect)) {
			this.closePopup();
			return;
		}

		if (this.shouldCloseDueToNoOpener(this._openerRect)) {
			if (!this.isFocusWithin()) {
				this.closePopup();
				return;
			}
		}

		this._updateActualPlacement();
		this._updateArrowPosition();

		if (this.shouldCloseDueToOverflow(this.actualPlacement, this._openerRect)) {
			this.closePopup();
			return;
		}

		if (this.resizable) {
			this._resizeHandlePlacement = this._popoverResize.getResizeHandlePlacement();
		}
	}

	_show() {
		super._show();

		const opener = this.getOpenerHTMLElement(this.opener);

		if (!opener) {
			return;
		}

		if (opener && instanceOfUI5Element(opener) && !opener.getDomRef()) {
			return;
		}

		this._openerElement = opener;

		// Set anchor-name on the opener element
		opener.style.setProperty("anchor-name", this._anchorName);

		// Set CSS anchor positioning on the popover host
		this.style.setProperty("position-anchor", this._anchorName);
		this.style.setProperty("position-area", this._getPositionArea());
		this.style.setProperty("position-try-fallbacks", this._getPositionTryFallbacks());

		// Handle stretch sizing
		if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && this.isVertical) {
			this.style.width = `${opener.getBoundingClientRect().width}px`;
		}

		if (this.verticalAlign === PopoverVerticalAlign.Stretch && !this.isVertical) {
			this.style.height = `${opener.getBoundingClientRect().height}px`;
		}

		// After the browser applies CSS anchor positioning, detect actual placement and update arrow
		requestAnimationFrame(() => {
			if (!this._opened && !this.open) {
				return;
			}

			this._openerRect = opener.getBoundingClientRect();

			if (this.isOpenerOutsideViewport(this._openerRect)) {
				this.closePopup();
				return;
			}

			if (this.shouldCloseDueToNoOpener(this._openerRect) || this.shouldCloseDueToOverflow(this.actualPlacement, this._openerRect)) {
				this.closePopup();
				return;
			}

			this._updateActualPlacement();
			this._updateArrowPosition();

			if (this.resizable) {
				this._resizeHandlePlacement = this._popoverResize.getResizeHandlePlacement();
			}
		});
	}

	/**
	 * Detects the actual placement side by comparing popover and opener rects
	 * after the browser applies CSS anchor positioning.
	 * @private
	 */
	_updateActualPlacement() {
		const popoverRect = this.getBoundingClientRect();
		const openerRect = this._openerRect;

		if (!openerRect) {
			return;
		}

		const tolerance = 2;

		if (popoverRect.bottom <= openerRect.top + tolerance) {
			this.actualPlacement = PopoverActualPlacement.Top;
		} else if (popoverRect.top >= openerRect.bottom - tolerance) {
			this.actualPlacement = PopoverActualPlacement.Bottom;
		} else if (popoverRect.right <= openerRect.left + tolerance) {
			this.actualPlacement = PopoverActualPlacement.Left;
		} else {
			this.actualPlacement = PopoverActualPlacement.Right;
		}
	}

	/**
	 * After CSS positions the popover, calculates arrow offset to point at the opener center.
	 * @private
	 */
	_updateArrowPosition() {
		if (this.hideArrow) {
			return;
		}

		const popoverRect = this.getBoundingClientRect();
		const openerRect = this._openerRect;

		if (!openerRect) {
			return;
		}

		const isVerticalPlacement = this.actualPlacement === PopoverActualPlacement.Top
			|| this.actualPlacement === PopoverActualPlacement.Bottom;

		const borderRadius = Number.parseInt(window.getComputedStyle(this).getPropertyValue("border-radius"));

		let arrowTranslateX = 0;
		let arrowTranslateY = 0;

		if (isVerticalPlacement) {
			// Arrow X offset: center of opener relative to center of popover
			arrowTranslateX = (openerRect.left + openerRect.width / 2) - (popoverRect.left + popoverRect.width / 2);

			const safeRange = popoverRect.width / 2 - borderRadius - ARROW_SIZE / 2 - 2;
			arrowTranslateX = clamp(arrowTranslateX, -safeRange, safeRange);
		} else {
			// Arrow Y offset: center of opener relative to center of popover
			arrowTranslateY = (openerRect.top + openerRect.height / 2) - (popoverRect.top + popoverRect.height / 2);

			const safeRange = popoverRect.height / 2 - borderRadius - ARROW_SIZE / 2 - 2;
			arrowTranslateY = clamp(arrowTranslateY, -safeRange, safeRange);
		}

		this.arrowTranslateX = Math.round(arrowTranslateX);
		this.arrowTranslateY = Math.round(arrowTranslateY);
	}

	getPopoverSize(): PopoverSize {
		const rect = this.getBoundingClientRect();
		return { width: rect.width, height: rect.height };
	}

	_isUI5AbstractElement(el: HTMLElement): el is UI5Element {
		return instanceOfUI5Element(el) && el.isUI5AbstractElement;
	}

	get arrowDOM() {
		return this.shadowRoot!.querySelector(".ui5-popover-arrow")!;
	}

	/**
	 * @protected
	 */
	focusOpener() {
		this.getOpenerHTMLElement(this.opener)?.focus();
	}

	get isVertical() : boolean {
		return this.placement === PopoverPlacement.Top || this.placement === PopoverPlacement.Bottom;
	}

	get isModal() { // Required by Popup.js
		return this.modal;
	}

	get _ariaLabelledBy() { // Required by Popup.js
		if (!this._ariaLabel && this._displayHeader) {
			return "ui5-popup-header";
		}

		return undefined;
	}

	get styles() {
		return {
			...super.styles,
			root: {},
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

	get _actualHorizontalAlign() : PopoverActualHorizontalAlign {
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

	_onResizeMouseDown(e: MouseEvent) {
		this._popoverResize.onResizeMouseDown(e);
		this._resizeHandlePlacement = this._popoverResize.getResizeHandlePlacement();
	}

	// for instance checks
	readonly isPopover = true;
}

Popover.define();

export default Popover;
export const instanceOfPopover = createInstanceChecker<Popover>("isPopover");
export { PopoverActualPlacement, PopoverActualHorizontalAlign };
