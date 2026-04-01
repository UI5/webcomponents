import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import eventStrict from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import LinkDesign from "./types/LinkDesign.js";

type BreadcrumbsItemClickEventDetail = {
	altKey: boolean;
	ctrlKey: boolean;
	metaKey: boolean;
	shiftKey: boolean;
};

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
/**
 * Fired when the component is activated either with a mouse/tap or by using the Enter or Space key.
 *
 * **Note:** The event is also fired for the current page location item (the last item), which is not a link by design.
 *
 * @param {boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
 * @param {boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
 * @param {boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
 * @param {boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
 * @public
 * @since 2.10.0
 */
@eventStrict("click", {
	bubbles: true,
	cancelable: true,
})
class BreadcrumbsItem extends UI5Element {
	eventDetails!: {
		"click": BreadcrumbsItemClickEventDetail,
	}
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
export type { BreadcrumbsItemClickEventDetail };
