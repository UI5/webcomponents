import UI5Element, { property, Device } from "@ui5/webcomponents-base";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type SideNavigation from "./SideNavigation.js";

const {
	isDesktop,
} = Device;

type SideNavigationItemClickEventDetail = {
	altKey: boolean;
	ctrlKey: boolean;
	metaKey: boolean;
	shiftKey: boolean;
}

/**
 * @class
 * Base class for the items that are accepted by the `ui5-side-navigation` component.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.19.0
 */
class SideNavigationItemBase extends UI5Element implements ITabbable {
	eventDetails!: {
		click: SideNavigationItemClickEventDetail
	}

	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;

	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 *
	 * @default false
	 * @public
	 * @since 1.19.0
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the tooltip of the component.
	 *
	 * A tooltip attribute should be provided, in order to represent meaning/function,
	 * when the component is collapsed ("icon only" design is visualized) or the item text is truncated.
	 *
	 * @default undefined
	 * @public
	 * @since 2.0.0
	 */
	@property()
	tooltip?: string;

	@property({ noAttribute: true })
	forcedTabIndex = "-1";

	@property({ type: Boolean })
	sideNavCollapsed = false;

	@property({ type: Boolean })
	inPopover = false;

	_sideNavigation!: SideNavigation;

	/**
	 * Defines if the item's group is disabled.
	 * @private
	 * @default false
	 * @since 2.10.0
	 */
	@property({ type: Boolean, noAttribute: true })
	_groupDisabled: boolean = false;

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	get _tooltip() {
		return this.tooltip || undefined;
	}

	get hasSubItems() {
		return false;
	}

	get effectiveDisabled() {
		return this.disabled;
	}

	get classesArray() {
		const classes = [];

		if (this.effectiveDisabled) {
			classes.push("ui5-sn-item-disabled");
		}

		return classes;
	}

	get _classes() {
		return this.classesArray.join(" ");
	}

	get effectiveTabIndex() {
		return this.forcedTabIndex !== undefined ? parseInt(this.forcedTabIndex) : undefined;
	}

	get sideNavigation() {
		return this._sideNavigation;
	}

	set sideNavigation(sideNavigation) {
		this._sideNavigation = sideNavigation;
	}

	get isFixedItem() {
		let element : HTMLElement = this; // eslint-disable-line
		let parentElement = element.parentElement;

		while (parentElement) {
			if (parentElement.hasAttribute("ui5-side-navigation")) {
				break;
			}

			element = parentElement;
			parentElement = element.parentElement;
		}

		return element?.slot === "fixedItems";
	}

	get isSideNavigationItemBase() {
		return true;
	}

	/**
	 * @private
	 */
	applyInitialFocusInPopover() {

	}
}

const isInstanceOfSideNavigationItemBase = (object: any): object is SideNavigationItemBase => {
	return "isSideNavigationItemBase" in object;
};

export default SideNavigationItemBase;
export type {
	SideNavigationItemClickEventDetail,
};
export { isInstanceOfSideNavigationItemBase };
