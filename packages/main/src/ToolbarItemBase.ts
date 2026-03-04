import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import type ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

type ToolbarItemEventDetail = {
	targetRef: HTMLElement;
}

/**
 * Interface that defines the public API contract for interactive toolbar items.
 *
 * Interactive toolbar items (ToolbarButton, ToolbarSelect, ToolbarItem) implement this interface
 * to expose overflow control APIs and events as part of their public API.
 * Non-interactive items (ToolbarSeparator, ToolbarSpacer) only extend ToolbarItemBase
 * and do not implement this interface.
 *
 * ### Properties
 *
 * **overflowPriority** - `ToolbarItemOverflowBehavior` (default: "Default")
 *
 * Property used to define the access of the item to the overflow Popover.
 *
 * **preventOverflowClosing** - `boolean` (default: false)
 *
 * Defines if the toolbar overflow popup should close upon interaction with the item.
 * When set to `false` (default), the overflow popover closes automatically after the item is clicked or activated.
 * When set to `true`, the overflow popover remains open after interaction, useful for items that require
 * multiple interactions or should not trigger popover closing.
 *
 * ### Events
 *
 * **close-overflow**
 *
 * Fired when the overflow popover should be closed due to interaction with the item.
 * This event bubbles up to the parent toolbar component to trigger popover closing.
 * The event is only fired when `preventOverflowClosing` is set to `false`.
 *
 * @public
 * @since 2.20.0
 */
interface IToolbarItem extends ToolbarItemBase {
	overflowPriority?: `${ToolbarItemOverflowBehavior}`;

	preventOverflowClosing?: boolean;

	/**
	 * Fired when the overflow popover is closed.
	 * @private
	 * @since 1.17.0
	 */
	eventDetails: {
		"close-overflow": void
	}
}

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
}

export type {
	ToolbarItemEventDetail,
	IToolbarItem,
};
export default ToolbarItemBase;
