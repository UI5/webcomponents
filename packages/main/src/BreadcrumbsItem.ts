import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import LinkDesign from "./types/LinkDesign.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-breadcrumbs-item` component defines the content of an item in `ui5-breadcrumbs`.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 * @abstract
 */
@customElement("ui5-breadcrumbs-item")
class BreadcrumbsItem extends UI5Element {
	/**
	 * Defines the link href.
	 *
	 * **Note:** Standard hyperlink behavior is supported.
	 * @default undefined
	 * @public
	 */
	@property()
	href?: string;

	/**
	 * Defines the link target.
	 *
	 * Available options are:
	 *
	 * - `_self`
	 * - `_top`
	 * - `_blank`
	 * - `_parent`
	 * - `_search`
	 *
	 * **Note:** This property must only be used when the `href` property is set.
	 * @default undefined
	 * @public
	 */
	@property()
	target?: string;

	/**
	 * Defines the accessible ARIA name of the item.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: DefaultSlot<Node>;

	_accessibleNameText?: string;
	_isCurrentPageItem?: boolean;
	_needsSeparator?: boolean;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	get _linkDesign() {
		return this._isCurrentPageItem ? LinkDesign.Emphasized : LinkDesign.Default;
	}

	get accessibilityAttributes(): Pick<AccessibilityAttributes, "current"> {
		return {
			current: this._isCurrentPageItem ? "page" : false,
		};
	}
}

BreadcrumbsItem.define();

export default BreadcrumbsItem;
