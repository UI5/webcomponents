import UI5Element, { type Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter, isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import ProductSwitchItemTemplate from "./ProductSwitchItemTemplate.js";
import type { IProductSwitchItem } from "./ProductSwitch.js";

// Styles
import ProductSwitchItemCss from "./generated/themes/ProductSwitchItem.css.js";

/**
 * @class
 * ### Overview
 * The `ui5-product-switch-item` web component represents the items displayed in the
 * `ui5-product-switch` web component.
 *
 * **Note:** `ui5-product-switch-item` is not supported when used outside of `ui5-product-switch`.
 *
 * ### Keyboard Handling
 * The `ui5-product-switch` provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Space] / [Enter] or [Return] - Trigger `ui5-click` event
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @implements {IProductSwitchItem}
 * @since 1.0.0-rc.5
 */
@customElement({
	tag: "ui5-product-switch-item",
	renderer: jsxRenderer,
	styles: ProductSwitchItemCss,
	template: ProductSwitchItemTemplate,
})
/**
 * Fired when the `ui5-product-switch-item` is activated either with a
 * click/tap or by using the Enter or Space key.
 * @public
 */
@event("click", {
	bubbles: true,
})
@event("_focused", {
	bubbles: true,
})
class ProductSwitchItem extends UI5Element implements IProductSwitchItem {
	eventDetails!: {
		click: { item: ProductSwitchItem },
		_focused: void,
	}
	/**
	 * Defines the title of the component.
	 * @default undefined
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	titleText?: string;

	/**
	 * Defines the subtitle of the component.
	 * @default undefined
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	subtitleText?: string;

	/**
	 * Defines the icon to be displayed as a graphical element within the component.
	 *
	 * Example:
	 *
	 * `<ui5-product-switch-item icon="palette">`
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines a target where the `targetSrc` content must be open.
	 *
	 * Available options are:
	 *
	 * - `_self`
	 * - `_top`
	 * - `_blank`
	 * - `_parent`
	 * - `_search`
	 *
	 * **Note:** By default target will be open in the same frame as it was clicked.
	 * @default undefined
	 * @public
	 */
	@property()
	target?: string;

	/**
	 * Defines the component target URI. Supports standard hyperlink behavior.
	 * @default undefined
	 * @public
	 */
	@property()
	targetSrc?: string;

	/**
	 * Used to switch the active state (pressed or not) of the component.
	 * @private
	 */
	@property({ type: Boolean })
	private active = false;

	/**
	 * Used to set the selected state of the component. Only one selected in a sequence.
	 * **Note:** Set by the `ProductSwitch`
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines the component tabindex.
	 */
	@property({ noAttribute: true })
	forcedTabIndex?: string;

	/**
	 * Defines an image to be displayed instead of the standard icon.
	 *
	 * **Note:** The image slot takes precedence over the icon property.
	 * **Note:** We recommend using non-interactive ui5-avatar with size S, Square shape and Transparent colorScheme for best alignment.
	 * @public
	 * @since 2.14.0
	 */
	@slot({ type: HTMLElement })
	image!: Slot<Array<HTMLElement>>;

	_deactivate: () => void;

	constructor() {
		super();

		this._deactivate = () => {
			if (this.active) {
				this.active = false;
			}
		};
	}

	onEnterDOM() {
		document.addEventListener("mouseup", this._deactivate);

		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this._deactivate);
	}

	_onmousedown() {
		this.active = true;
	}

	get _effectiveTarget() {
		return this.target || "_self";
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.active = true;
		}

		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this._fireItemClick();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.active = false;
		}

		if (isSpace(e)) {
			if (isSpaceShift(e)) {
				e.stopPropagation();
			}
			this._fireItemClick();
		}
	}

	_onfocusout() {
		this.active = false;
	}

	_onfocusin() {
		this.fireDecoratorEvent("_focused");
	}

	_fireItemClick() {
		this.fireDecoratorEvent("click", { item: this });
	}
}

ProductSwitchItem.define();

export default ProductSwitchItem;
