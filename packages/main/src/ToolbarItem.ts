import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarItemTemplate from "./ToolbarItemTemplate.js";
import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";
import type ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

type IEventOptions = {
	preventClosing: boolean;
}

type ToolbarItemEventDetail = {
	targetRef: HTMLElement;
}

type IOverflowToolbarItem = {
	hasToolbarWrapper?: string | undefined;
}

@event("close-overflow", {
	bubbles: true,
})

@customElement({
	tag: "ui5-toolbar-item",
	languageAware: true,
	renderer: jsxRenderer,
	template: ToolbarItemTemplate,
	styles: ToolbarItemCss,
})

/**
 * @class
 *
 * Represents an abstract class for items, used in the `ui5-toolbar`.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
class ToolbarItem extends UI5Element {
	// strictEvents: needed for parent class
	eventDetails!: {
		click: ToolbarItemEventDetail,
		"close-overflow": void;
	}
	/**
	 * Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
	 * the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
	 * @public
	 * @default "Default"
	 */
	@property()
	overflowPriority: `${ToolbarItemOverflowBehavior}` = "Default";

	/**
	 * Defines if the toolbar overflow popup should close upon intereaction with the item.
	 * It will close by default.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	preventOverflowClosing = false;

	/**
	 * Defines if the toolbar item is overflowed.
	 * @default false
	 * @protected
	 * @since 2.11.0
	 */

	@property({ type: Boolean })
	isOverflowed: boolean = false;

	/**
	 * Defines if the component, wrapped in the toolbar item, has his own overflow mechanism.
	 * @default false
	 * @public
	 * @since 2.17.0
	 */
	@property({ type: Boolean })
	selfOverflowed: boolean = false;

	/**
	 * Defines if the component, wrapped in the toolbar item, should be expanded in the overflow popover.
	 * @default false
	 * @public
	 * @since 2.17.0
	 */

	@property({ type: Boolean })
	expandInOverflow: boolean = false;

	_isRendering = true;
	_maxWidth = 0;

	onBeforeRendering(): void {
		this.checkForWrapper();
	}

	onAfterRendering(): void {
		this._isRendering = false;
	}

	/**
	 * Wrapped component slot.
	 * @public
	 * @since 2.17.0
	 */

	@slot({
		"default": true, type: HTMLElement, invalidateOnChildChange: true,
	})
	item!: HTMLElement | undefined;

	// Method called by ui5-toolbar to inform about the existing toolbar wrapper
	checkForWrapper() {
		if (this.tagName === "UI5-TOOLBAR-ITEM"
			&& this.getSlottedNodes<IOverflowToolbarItem>("item").length
			&& this.getSlottedNodes<IOverflowToolbarItem>("item")[0]!.hasToolbarWrapper) {
			// eslint-disable-next-line no-console
			console.warn(`This UI5 web component has its predefined toolbar wrapper called ${this.getSlottedNodes<IOverflowToolbarItem>("item")[0]!.hasToolbarWrapper}.`);
		}
	}
	/**
	* Defines if the width of the item should be ignored in calculating the whole width of the toolbar
	* @protected
	*/
	get ignoreSpace(): boolean {
		return false;
	}

	/**
	 * Returns if the item is flexible. An item that is returning true for this property will make
	 * the toolbar expand to fill the 100% width of its container.
	 * @protected
	 */
	get hasFlexibleWidth(): boolean {
		return false;
	}

	/**
	 * Returns if the item is interactive.
	 * This value is used to determinate if the toolbar should have its accessibility role and attributes set.
	 * At least two interactive items are needed for the toolbar to have the role="toolbar" attribute set.
	 * @protected
	 */
	get isInteractive(): boolean {
		return true;
	}

	/**
	 * Returns if the item is separator.
	 * @protected
	 */
	get isSeparator() {
		return false;
	}

	/**
	 * Returns if the item is default wrapper for certain component.
	 * @protected
	 */
	get isDefaultWrapper() {
		return false;
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	get classes() {
		return {
			root: {
				"ui5-tb-popover-item": this.isOverflowed,
				"ui5-tb-item": true,
			},
		};
	}

	/**
	 * Handles the click event on the toolbar item.
	 * If `preventOverflowClosing` is false, it will fire a "close-overflow" event.
	 */
	onClick(e: Event): void {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("click", { targetRef: e.target as HTMLElement });
		if (prevented && !this.preventOverflowClosing) {
			this.fireDecoratorEvent("close-overflow");
		}
	}
}

export type {
	IEventOptions,
	ToolbarItemEventDetail,
};
ToolbarItem.define();

export default ToolbarItem;
