import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import UI5Element, { type DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import {
	isDown,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";

import ProductSwitchTemplate from "./ProductSwitchTemplate.js";

import {
	PRODUCT_SWITCH_CONTAINER_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ProductSwitchCss from "./generated/themes/ProductSwitch.css.js";

/**
 * Interface for components that may be slotted inside `ui5-product-switch` as items
 * @public
 */
interface IProductSwitchItem extends HTMLElement, ITabbable {
	titleText?: string,
	subtitleText?: string,
	icon?: string,
	target?: string,
	targetSrc?: string,
	selected: boolean,
}

/**
 * @class
 * ### Overview
 *
 * The `ui5-product-switch` is an SAP Fiori specific web component that is used in `ui5-shellbar`
 * and allows the user to easily switch between products.
 *
 * ### Keyboard Handling
 * The `ui5-product-switch` provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Tab] - Move focus to the next interactive element after the `ui5-product-switch`
 * - [Up] or [Down] - Navigates up and down the items
 * - [Left] or [Right] - Navigates left and right the items
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ProductSwitch.js";`
 *
 * `import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";` (for `ui5-product-switch-item`)
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.5
 */
@customElement({
	tag: "ui5-product-switch",
	renderer: jsxRenderer,
	styles: ProductSwitchCss,
	template: ProductSwitchTemplate,
})
class ProductSwitch extends UI5Element {
	/**
	 * Indicates how many columns are displayed.
	 * @private
	 */
	@property({ type: Number })
	desktopColumns?: number;

	/**
	 * Defines the items of the `ui5-product-switch`.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
	items!: DefaultSlot<Array<IProductSwitchItem>>

	_itemNavigation: ItemNavigation;
	_currentIndex: number;
	_rowSize: number;
	_handleResizeBound: ResizeObserverCallback;

	constructor() {
		super();

		this._currentIndex = 0;
		this._rowSize = 4;

		this._itemNavigation = new ItemNavigation(this, {
			rowSize: this._rowSize,
			getItemsCallback: () => this.items,
		});

		this._handleResizeBound = this._handleResize.bind(this);
	}

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	static get ROW_MIN_WIDTH() {
		return {
			ONE_COLUMN: 600,
			THREE_COLUMN: 900,
		};
	}

	get _ariaLabelText() {
		return ProductSwitch.i18nBundle.getText(PRODUCT_SWITCH_CONTAINER_LABEL);
	}

	onEnterDOM() {
		ResizeHandler.register(document.body, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(document.body, this._handleResizeBound);
	}

	onBeforeRendering() {
		this.desktopColumns = this.items.length > 6 ? 4 : 3;
	}

	_handleResize() {
		const documentWidth = document.body.clientWidth;

		if (documentWidth <= (this.constructor as typeof ProductSwitch).ROW_MIN_WIDTH.ONE_COLUMN) {
			this._setRowSize(1);
		} else if (documentWidth <= (this.constructor as typeof ProductSwitch).ROW_MIN_WIDTH.THREE_COLUMN || this.items.length <= 6) {
			this._setRowSize(3);
		} else {
			this._setRowSize(4);
		}
	}

	handleProductSwitchItemClick(e: MouseEvent) {
		this.items.forEach(item => { item.selected = false; });
		(e.target as IProductSwitchItem).selected = true;
	}

	_onfocusin(e: FocusEvent) {
		const target = e.target as IProductSwitchItem;

		this._itemNavigation.setCurrentItem(target);
		this._currentIndex = this.items.indexOf(target);
	}

	_setRowSize(size: number) {
		this._rowSize = size;
		this._itemNavigation.setRowSize(size);
	}

	_onkeydown(e: KeyboardEvent) {
		if (isDown(e)) {
			this._handleDown(e);
		} else if (isUp(e)) {
			this._handleUp(e);
		}
	}

	_handleDown(e: KeyboardEvent) {
		const itemsLength = this.items.length;
		if (this._currentIndex + this._rowSize > itemsLength) { // border reached, do nothing
			e.stopPropagation();
		}
	}

	_handleUp(e: KeyboardEvent) {
		if (this._currentIndex - this._rowSize < 0) { // border reached, do nothing
			e.stopPropagation();
		}
	}

	getFocusDomRef() {
		return this._itemNavigation._getCurrentItem();
	}
}

ProductSwitch.define();

export default ProductSwitch;

export type {
	IProductSwitchItem,
};
