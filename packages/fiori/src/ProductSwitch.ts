import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
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

// The popover shows at most this many rows; anything beyond scrolls.
const MAX_VISIBLE_ROWS = 4;

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
 * @since 1.0.0
 * @ui5subcomponent ProductSwitchItem
 */
@customElement({
	tag: "ui5-product-switch",
	renderer: jsxRenderer,
	styles: ProductSwitchCss,
	template: ProductSwitchTemplate,
})
class ProductSwitch extends UI5Element {
	/**
	 * Defines whether the component is in loading state.
	 * When set to `true`, the component displays a busy indicator over its content.
	 * @default false
	 * @public
	 * @since 2.29.0
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
	 * @default 1000
	 * @public
	 * @since 2.29.0
	 */
	@property({ type: Number })
	loadingDelay = 1000;

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
	items!: DefaultSlot<IProductSwitchItem>

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

	get _ariaLabelText() {
		return ProductSwitch.i18nBundle.getText(PRODUCT_SWITCH_CONTAINER_LABEL);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}

	onBeforeRendering() {
		if (this.items.length > 6) {
			this.desktopColumns = 4;
		} else if (this.items.length <= 2) {
			this.desktopColumns = 2;
		} else {
			this.desktopColumns = 3;
		}
	}

	onAfterRendering() {
		// Recompute the row cap after content changes (items added/removed or re-wrapped).
		this._updateMaxHeight();
	}

	_handleResize() {
		const items = this.items;
		if (!items.length) {
			return;
		}

		const root = this.shadowRoot?.querySelector<HTMLElement>(".ui5-product-switch-root");
		if (!root) {
			return;
		}

		// Derive the column count from the component's own available width (not the
		// viewport), so the keyboard navigation matches the columns that actually render.
		const firstItemStyle = getComputedStyle(items[0]);
		const itemOuterWidth = items[0].offsetWidth
			+ parseFloat(firstItemStyle.marginLeft)
			+ parseFloat(firstItemStyle.marginRight);

		if (itemOuterWidth <= 0) {
			return;
		}

		const rootStyle = getComputedStyle(root);
		const availableWidth = root.clientWidth
			- parseFloat(rootStyle.paddingLeft)
			- parseFloat(rootStyle.paddingRight);

		let maxColumnsByItems = 3;
		if (items.length > 6) {
			maxColumnsByItems = 4;
		} else if (items.length <= 2) {
			maxColumnsByItems = 2;
		}

		const columnsByWidth = Math.floor(availableWidth / itemOuterWidth);

		this._setRowSize(Math.max(1, Math.min(columnsByWidth, maxColumnsByItems)));

		this._updateMaxHeight();
	}

	/**
	 * Caps the visible height to `MAX_VISIBLE_ROWS` rows. Rows grow to fit wrapped text,
	 * so the cap is measured from the first rendered rows rather than assuming a fixed row
	 * height; anything beyond that scrolls. The result is exposed as a CSS custom property
	 * consumed by the root's `max-height`.
	 */
	_updateMaxHeight() {
		const items = this.items;
		const root = this.shadowRoot?.querySelector<HTMLElement>(".ui5-product-switch-root");
		if (!root || !items.length) {
			return;
		}

		const rootStyle = getComputedStyle(root);

		// In the single-column (phone) layout the CSS removes the cap, so there is nothing to compute.
		if (rootStyle.flexDirection === "column") {
			this.style.removeProperty("--_ui5-product-switch-max-height");
			return;
		}

		const rowSize = this._rowSize;
		const rowCount = Math.ceil(items.length / rowSize);

		if (rowCount <= MAX_VISIBLE_ROWS) {
			this.style.removeProperty("--_ui5-product-switch-max-height");
			return;
		}

		let maxHeight = parseFloat(rootStyle.paddingTop) + parseFloat(rootStyle.paddingBottom);

		for (let row = 0; row < MAX_VISIBLE_ROWS; row++) {
			let rowHeight = 0;
			for (let col = 0; col < rowSize; col++) {
				const item = items[row * rowSize + col];
				if (!item) {
					break;
				}
				const itemStyle = getComputedStyle(item);
				const itemHeight = item.offsetHeight
					+ parseFloat(itemStyle.marginTop)
					+ parseFloat(itemStyle.marginBottom);
				rowHeight = Math.max(rowHeight, itemHeight);
			}
			maxHeight += rowHeight;
		}

		// If a scroll container ancestor (e.g. a Popover) is already constrained to less than
		// maxHeight, applying our own cap here produces nested scrollbars. Defer to that container.
		if (this._getScrollAncestorHeight() < maxHeight) {
			this.style.removeProperty("--_ui5-product-switch-max-height");
			return;
		}

		this.style.setProperty("--_ui5-product-switch-max-height", `${maxHeight}px`);
	}

	// Returns the usable height of the nearest scroll-capable ancestor (e.g. a Popover's
	// internal popup-content div), or Infinity when there is none. Walks up through shadow
	// root boundaries via assignedSlot so it can leave the ProductSwitch's own light DOM and
	// reach the host component's shadow DOM. clientHeight is compared directly rather than
	// gating on scrollHeight > clientHeight, because whether the ancestor currently overflows
	// depends on whether our own cap is applied, which would make the result flip per render.
	_getScrollAncestorHeight(): number {
		let el: Element | null = this.assignedSlot ?? this.parentElement;
		while (el) {
			if (el === document.documentElement || el === document.body) {
				break;
			}
			const style = getComputedStyle(el);
			if (style.overflowY === "auto" || style.overflowY === "scroll") {
				return (el as HTMLElement).clientHeight;
			}
			if (el.parentElement) {
				el = el.parentElement;
			} else {
				const root = el.getRootNode();
				el = root instanceof ShadowRoot ? root.host : null;
			}
		}
		return Infinity;
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
