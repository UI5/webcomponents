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
	 * `NeverOverflow` are forbidden inside a group — setting one of those on a grouped item
	 * emits a one-shot `console.warn` and the item's priority is treated as `Default` for
	 * the layout pass. Spacers (`ui5-toolbar-spacer`) do not participate in grouping; setting
	 * a non-empty `overflowGroup` on a spacer emits a one-shot `console.warn` and the spacer's
	 * existing overflow behavior is unchanged.
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

	// One-shot guards for `overflowGroup` validation warnings — suppress repeat
	// warnings across re-renders, consistent with `ToolbarItem.checkForWrapper`.
	_overflowGroupPriorityWarned = false;
	_overflowGroupSpacerWarned = false;

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

	/**
	 * Returns the `overflowPriority` actually used by the toolbar's distribution
	 * algorithm. Items in a non-empty `overflowGroup` must have `Default` priority
	 * (ADR-0001); when a developer puts `AlwaysOverflow` or `NeverOverflow` on a
	 * grouped non-spacer item, this getter emits a one-shot `console.warn` and
	 * downgrades the priority to `"Default"` for layout. Spacers are exempt
	 * from the priority-violation rule — they get their own spacer-rule warning
	 * elsewhere and keep their declared priority here.
	 *
	 * @protected
	 */
	get effectiveOverflowPriority(): `${ToolbarItemOverflowBehavior}` {
		const declared = this.overflowPriority;
		if (
			!this.isSpacer
			&& this.overflowGroup !== ""
			&& (declared === "AlwaysOverflow" || declared === "NeverOverflow")
		) {
			if (!this._overflowGroupPriorityWarned) {
				this._overflowGroupPriorityWarned = true;
				// eslint-disable-next-line no-console
				console.warn(
					`[ui5-toolbar] ${this.tagName.toLowerCase()} has both overflow-group="${this.overflowGroup}" and overflow-priority="${declared}". `
					+ `Items in a non-empty overflow-group must use overflow-priority="Default"; priority dropped to Default for layout.`,
					this,
				);
			}
			return "Default";
		}
		return declared;
	}

	/**
	 * Returns the `overflowGroup` actually used by the toolbar's distribution
	 * algorithm. Spacers cannot participate in grouping (ADR-0001); a spacer
	 * with a non-empty `overflowGroup` emits a one-shot `console.warn` and this
	 * getter returns `""` so the spacer is treated as ungrouped by the algorithm.
	 *
	 * @protected
	 */
	get effectiveOverflowGroup(): string {
		const declared = this.overflowGroup;
		if (this.isSpacer && declared !== "") {
			if (!this._overflowGroupSpacerWarned) {
				this._overflowGroupSpacerWarned = true;
				// eslint-disable-next-line no-console
				console.warn(
					`[ui5-toolbar] ${this.tagName.toLowerCase()} has overflow-group="${declared}". `
					+ `Spacers cannot participate in an overflow-group; the group tag is ignored.`,
					this,
				);
			}
			return "";
		}
		return declared;
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
