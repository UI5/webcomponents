import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { AccessibilityAttributes, UI5CustomEvent } from "@ui5/webcomponents-base";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import ShellBarItemTemplate from "./ShellBarItemTemplate.js";
import ShellBarItemStyles from "./generated/themes/ShellBarItem.css.js";

type ShellBarItemClickEventDetail = {
	targetRef: HTMLElement,
};

type ShellBarItemAccessibilityAttributes = Pick<AccessibilityAttributes, "expanded" | "hasPopup" | "controls">;

/**
 * @class
 * The `ui5-shellbar-item` represents a custom item for `ui5-shellbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-shellbar-item",
	renderer: jsxRenderer,
	template: ShellBarItemTemplate,
	styles: ShellBarItemStyles,
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
class ShellBarItem extends UI5Element {
	eventDetails!: {
		click: ShellBarItemClickEventDetail,
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
	accessibilityAttributes: ShellBarItemAccessibilityAttributes = {};

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

	fireClickEvent(e: UI5CustomEvent<Button, "click">) {
		return this.fireDecoratorEvent("click", {
			targetRef: (e.target as HTMLElement),
		});
	}
}

ShellBarItem.define();

export default ShellBarItem;
export type { ShellBarItemClickEventDetail, ShellBarItemAccessibilityAttributes };
