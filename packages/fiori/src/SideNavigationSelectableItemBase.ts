import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import {
	isSpace,
	isEnter,
	isEnterShift,
	isEnterCtrl,
	isEnterAlt,
	isLeft,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationItemDesign from "./types/SideNavigationItemDesign.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import type { SideNavigationItemClickEventDetail } from "./SideNavigationItemBase.js";

type SideNavigationItemAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup">;

/**
 * Fired when the component is activated either with a click/tap or by using the [Enter] or [Space] keys.
 *
 * @public
 * @param {boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
 * @param {boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
 * @param {boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
 * @param {boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
 */
@event("click", {
	bubbles: true,
	cancelable: true,
})

/**
 * @class
 * Base class for the navigation items that support actions.
 *
 * @constructor
 * @extends SideNavigationItemBase
 * @abstract
 * @public
 * @since 1.24.0
 */
@customElement()
class SideNavigationSelectableItemBase extends SideNavigationItemBase {
	eventDetails!: SideNavigationItemBase["eventDetails"] & {
		"click": SideNavigationItemClickEventDetail
	}

	/**
	 * Defines if the item's parent is disabled.
	 * @private
	 * @default false
	 * @since 2.10.0
	 */
	@property({ type: Boolean, noAttribute: true })
	_parentDisabled: boolean = false;

	/**
	 * Defines the icon of the item.
	 *
	 * The SAP-icons font provides numerous options.
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @public
	 * @default undefined
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether the item is selected.
	 *
	 * **Note:** Items that have a set `href` and `target` set to `_blank` should not be selectable.
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines the link target URI. Supports standard hyperlink behavior.
	 * If a JavaScript action should be triggered,
	 * this should not be set, but instead an event handler
	 * for the `click` event should be registered.
	 *
	 * @public
	 * @default undefined
	 * @since 1.19.0
	 */
	@property()
	href?: string;

	/**
	 * Defines the component target.
	 *
	 * Possible values:
	 *
	 * - `_self`
	 * - `_top`
	 * - `_blank`
	 * - `_parent`
	 * - `framename`
	 *
	 * **Note:** Items that have a defined `href` and `target`
	 * attribute set to `_blank` should not be selectable.
	 *
	 * @public
	 * @default undefined
	 * @since 1.19.0
	 */
	@property()
	target?: string;

	/**
	 * Item design.
	 *
	 * **Note:** Items with "Action" design must not have sub-items.
	 *
	 * @public
	 * @default "Default"
	 * @since 2.7.0
	 */
	@property()
	design: `${SideNavigationItemDesign}` = "Default";

	/**
	 * Indicates whether the navigation item is selectable. By default, all items are selectable unless specifically marked as unselectable.
	 *
	 * When a parent item is marked as unselectable, selecting it will only expand or collapse its sub-items.
	 * To improve user experience do not mix unselectable parent items with selectable parent items in a single side navigation.
	 *
	 *
	 * **Guidelines**:
	 * - Items with an assigned `href` and a target of `_blank` should be marked as unselectable.
	 * - Items that trigger actions (with design "Action") should be marked as unselectable.
	 *
	 * @public
	 * @default false
	 * @since 2.7.0
	 */
	@property({ type: Boolean })
	unselectable = false;

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 * The following fields are supported:
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
	 * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
	 *
	 * **Note:** Do not use it on parent items, as it will be overridden if the item is in the overflow menu.
	 *
	 * @public
	 * @default {}
	 * @since 2.7.0
	 */
	@property({ type: Object })
	accessibilityAttributes: SideNavigationItemAccessibilityAttributes = {};

	/**
	 * @private
	 * @default false
	 */
	@property({ type: Boolean })
	isOverflow = false;

	/**
	 * Reference to the original side navigation item that opened the popover.
	 *
	 * @private
	 */
	associatedItem?: SideNavigationItemBase;

	get ariaRole() {
		if (this.sideNavCollapsed) {
			return this.isOverflow || this.unselectable ? "menuitem" : "menuitemradio";
		}

		return "treeitem";
	}

	get isSelectable() {
		return !this.unselectable && !this.effectiveDisabled;
	}

	get _href() {
		return (!this.effectiveDisabled && this.href) ? this.href : undefined;
	}

	get _target() {
		return (!this.effectiveDisabled && this.href && this.target) ? this.target : undefined;
	}

	get isExternalLink() {
		return this.href && this.target === "_blank";
	}

	get _selected() {
		return this.selected;
	}

	get _effectiveTag() {
		return this._href ? "a" : "div";
	}

	get effectiveDisabled() {
		return this.disabled || this._parentDisabled;
	}

	get _ariaHasPopup() {
		if (this.accessibilityAttributes?.hasPopup) {
			return this.accessibilityAttributes.hasPopup;
		}

		return undefined;
	}

	get classesArray() {
		const classes = [];

		if (this.effectiveDisabled) {
			classes.push("ui5-sn-item-disabled");
		}

		if (this._selected) {
			classes.push("ui5-sn-item-selected");
		}

		return classes;
	}

	get _classes() {
		return this.classesArray.join(" ");
	}

	get _ariaCurrent() {
		if (!this.sideNavCollapsed && !this.selected) {
			return undefined;
		}

		return "page";
	}

	get _ariaSelected() {
		if (!this.sideNavCollapsed) {
			return undefined;
		}

		return this.selected;
	}

	_onkeydown(e: KeyboardEvent) {
		const isRTL = this.effectiveDir === "rtl";

		if (isSpace(e) || isRight(e) || isLeft(e)) {
			e.preventDefault();
		}

		// "Enter" + "Meta" is missing since it is often reserved by the operating system or window manager
		if (isEnter(e) || isEnterShift(e) || isEnterCtrl(e) || isEnterAlt(e)) {
			if (!this.unselectable) {
				this._activate(e);
			}
		}

		if ((isRTL ? isLeft(e) : isRight(e)) && this.sideNavCollapsed && this.hasSubItems) {
			this._activate(e);
		}

		if ((isRTL ? isRight(e) : isLeft(e)) && this.inPopover) {
			this.associatedItem?.sideNavigation?.closePicker();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		// "Space" + modifier is often reserved by the operating system or window manager
		if (isSpace(e)) {
			this._activate(e);

			if (this.href && !e.defaultPrevented) {
				const customEvent = new MouseEvent("click");

				customEvent.stopImmediatePropagation();
				if (this.getDomRef()!.querySelector("a")) {
					this.getDomRef()!.querySelector("a")!.dispatchEvent(customEvent);
				} else {
					// when Side Navigation is collapsed and it is first level item we have directly <a> element
					this.getDomRef()!.dispatchEvent(customEvent);
				}
			}
		}
	}

	_onclick(e: MouseEvent) {
		this._activate(e);
	}

	_onfocusin(e: FocusEvent) {
		e.stopPropagation();

		this.sideNavigation?.focusItem(this);
	}

	_activate(e: KeyboardEvent | MouseEvent) {
		const {
			altKey,
			ctrlKey,
			metaKey,
			shiftKey,
		} = e;

		e.stopPropagation();

		if (this.isOverflow) {
			const executeEvent = this.fireDecoratorEvent("click", {
				altKey,
				ctrlKey,
				metaKey,
				shiftKey,
			});

			if (!executeEvent) {
				e.preventDefault();
			}
		} else {
			this.sideNavigation?._handleItemClick(e, this);
		}
	}

	get isSideNavigationSelectableItemBase() {
		return true;
	}
}

const isInstanceOfSideNavigationSelectableItemBase = (object: any): object is SideNavigationSelectableItemBase => {
	return "isSideNavigationSelectableItemBase" in object;
};

export default SideNavigationSelectableItemBase;
export {
	isInstanceOfSideNavigationSelectableItemBase,
};
export type {
	SideNavigationItemAccessibilityAttributes,
};
