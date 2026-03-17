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
import shellBarV2ItemStyles from "./generated/themes/ShellBarItem.css.js";

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
 */
@customElement({
	tag: "ui5-shellbar-item",
	renderer: jsxRenderer,
	template: ShellBarItemTemplate,
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
	 *
	 * **Note:** The text is only displayed inside the overflow popover list view.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the count displayed in badge.
	 * @default undefined
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@property()
	count?: string;

	/**
	 * Defines additional accessibility attributes on Shellbar Items.
	 *
	 * The accessibility attributes support the following values:
	 *
	 * - **expanded**: Indicates whether the button, or another grouping element it controls,
	 * is currently expanded or collapsed.
	 * Accepts the following string values: `true` or `false`.
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element,
	 * such as menu or dialog, that can be triggered by the button.
	 *
	 * - **controls**: Identifies the element (or elements) whose contents
	 * or presence are controlled by the component.
	 * Accepts a lowercase string value, referencing the ID of the element it controls.
	 *
	 * @default {}
	 * @public
	 * @since 2.9.0
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
