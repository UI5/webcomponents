import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

import type ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

type ToolbarItemEventDetail = {
	targetRef: HTMLElement;
}

@event("close-overflow", {
	bubbles: true,
})
/**
 * @class
 * Represents an abstract base class for items used in the `ui5-toolbar`.
 *
 *
 * @cssState overflowed - When the item is displayed in the overflow popover.
 * Use this state to apply different styles when the item is overflowed.
 * Available since 2.20.0.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.17.0
 */
class ToolbarItemBase extends UI5Element {
	eventDetails!: {
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
	 * Co-overflow tag. Items in the same `ui5-toolbar` whose `overflowGroup` is the same
	 * non-empty string overflow as one atomic unit: either all visible in the bar, or all
	 * in the overflow popover, never split. The empty string (the default) means "no group" —
	 * the item participates in overflow independently.
	 *
	 * The tag is a free-form, case-sensitive string label (e.g. `"filters"`, `"search"`). It is
	 * layout-only and carries no ARIA, keyboard, or visual-cluster semantics. Items in a
	 * non-empty group must have `overflowPriority = "Default"`; `AlwaysOverflow` and
	 * `NeverOverflow` are forbidden inside a group.
	 *
	 * The visible bar always preserves slot order — ungrouped items between group members
	 * keep their slot positions and the toolbar never reorders DOM children. In the popover
	 * group members appear adjacent in slot order.
	 *
	 * @public
	 * @default ""
	 * @since 2.27.0
	 */
	@property()
	overflowGroup = "";

	/**
	 * Defines if the toolbar overflow popup should close upon interaction with the item.
	 * It will close by default.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	preventOverflowClosing = false;

	_isOverflowed: boolean = false;

	get isOverflowed(): boolean {
		return this._isOverflowed;
	}

	/**
	 * Defines if the toolbar item is overflowed.
	 * @default false
	 * @protected
	 * @since 2.11.0
	 */
	@property({ type: Boolean })
	set isOverflowed(value: boolean) {
		this._isOverflowed = value;

		if (value) {
			this._internals.states.add("overflowed");
		} else {
			this._internals.states.delete("overflowed");
		}
	}

	_maxWidth = 0;
	_isRendering = true;

	onAfterRendering(): void {
		this._isRendering = false;
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

	get hasOverflow(): boolean {
		return false;
	}

	/**
	 * Returns if the item is separator.
	 * @protected
	 */
	get isSeparator() {
		return false;
	}

	/**
	 * Returns if the item is a spacer.
	 * A spacer item is an item that takes space in the toolbar, but does not render any content.
	 * @protected
	 * @since 2.21.0
	 */

	get isSpacer() {
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

	get styles() {
		return {};
	}
}

export type {
	ToolbarItemEventDetail,
};
export default ToolbarItemBase;
