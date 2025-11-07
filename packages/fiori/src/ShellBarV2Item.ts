import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import ShellBarV2ItemTemplate from "./ShellBarV2ItemTemplate.js";
import shellBarV2ItemStyles from "./generated/themes/ShellBarV2Item.css.js";

type ShellBarV2ItemClickEventDetail = {
	targetRef: HTMLElement,
};

type ShellBarV2ItemAccessibilityAttributes = Pick<AccessibilityAttributes, "expanded" | "hasPopup" | "controls">;

/**
 * @class
 * The `ui5-shellbar-v2-item` represents a custom item for `ui5-shellbar-v2`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBarV2Item.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-shellbar-v2-item",
	renderer: jsxRenderer,
	template: ShellBarV2ItemTemplate,
	styles: shellBarV2ItemStyles,
	dependencies: [Button, ButtonBadge, ListItemStandard],
})
/**
 * Fired when the item is clicked.
 * @param {HTMLElement} targetRef DOM ref of the clicked element
 * @public
 */
@event("click", {
	bubbles: true,
	cancelable: true,
})
class ShellBarV2Item extends UI5Element {
	eventDetails!: {
		click: ShellBarV2ItemClickEventDetail,
	}

	/**
	 * Defines the item's icon.
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines the item text.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the count displayed in badge.
	 * @default undefined
	 * @public
	 */
	@property()
	count?: string;

	/**
	 * Defines accessibility attributes.
	 * @default {}
	 * @public
	 */
	@property({ type: Object })
	accessibilityAttributes: ShellBarV2ItemAccessibilityAttributes = {};

	/**
	 * Indicates if item is in overflow popover.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	inOverflow = false;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	hasListItems() {
		return this.inOverflow;
	}

	get listItems() {
		const domRef = this.getDomRef();
		if (!domRef || !this.inOverflow) {
			return [];
		}
		return [domRef];
	}
}

ShellBarV2Item.define();

export default ShellBarV2Item;
export type { ShellBarV2ItemClickEventDetail, ShellBarV2ItemAccessibilityAttributes };
