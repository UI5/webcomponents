import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import {
	isSpace,
	isLeft,
	isRight,
	isMinus,
	isPlus,
} from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationGroupTemplate from "./SideNavigationGroupTemplate.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

import {
	SIDE_NAVIGATION_ICON_COLLAPSE,
	SIDE_NAVIGATION_ICON_EXPAND,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import SideNavigationGroupCss from "./generated/themes/SideNavigationGroup.css.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";

/**
 * @class
 *
 * ### Overview
 *
 * Represents a group of navigation actions within `ui5-side-navigation`.
 * The `ui5-side-navigation-group` can only be used inside a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";`
 *
 * @constructor
 * @extends SideNavigationItemBase
 * @public
 * @abstract
 * @since 1.24.0
 */
@customElement({
	tag: "ui5-side-navigation-group",
	renderer: jsxRender,
	template: SideNavigationGroupTemplate,
	styles: SideNavigationGroupCss,
})
class SideNavigationGroup extends SideNavigationItemBase {
	/**
	 * Defines if the item is expanded
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	expanded = false;

	belowGroup = false;

	/**
	 * Defines nested items by passing `ui5-side-navigation-item` to the default slot.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: DefaultSlot<SideNavigationItem>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	onBeforeRendering() {
		this.allItems.forEach(item => {
			item._groupDisabled = this.disabled;
		});
	}

	get overflowItems() : Array<HTMLElement> {
		const separator1 = this.shadowRoot!.querySelector<HTMLElement>(".ui5-sn-item-separator:first-child")!;
		const separator2 = this.shadowRoot!.querySelector<HTMLElement>(".ui5-sn-item-separator:last-child")!;

		const overflowItems = this.items.reduce((result, item) => {
			return result.concat(item.overflowItems);
		}, new Array<SideNavigationItem>());

		return [separator1, ...overflowItems, separator2];
	}

	get selectableItems() : Array<SideNavigationSelectableItemBase> {
		return this.items.reduce((result, item) => {
			return result.concat(item.selectableItems);
		}, new Array<SideNavigationSelectableItemBase>());
	}

	get focusableItems() : Array<SideNavigationItemBase> {
		if (this.sideNavCollapsed) {
			return this.items;
		}

		if (this.expanded) {
			return this.items.reduce((result, item) => {
				return result.concat(item.focusableItems);
			}, new Array<SideNavigationItemBase>(this));
		}

		return [this];
	}

	get allItems() : Array<SideNavigationItemBase> {
		return this.items.reduce((result, item) => {
			return result.concat(item.allItems);
		}, new Array<SideNavigationItemBase>(this));
	}

	get _groupId() {
		if (!this.items.length) {
			return undefined;
		}

		return `${this._id}-group`;
	}

	get _expanded() {
		if (!this.items.length) {
			return undefined;
		}

		return this.expanded;
	}

	get belowGroupClassName() {
		return this.belowGroup ? "ui5-sn-item-group-below-group" : "";
	}

	get _arrowTooltip() {
		return this.expanded ? SideNavigationGroup.i18nBundle.getText(SIDE_NAVIGATION_ICON_COLLAPSE)
			: SideNavigationGroup.i18nBundle.getText(SIDE_NAVIGATION_ICON_EXPAND);
	}

	_onkeydown(e: KeyboardEvent) {
		if (this.disabled) {
			return;
		}

		if (isSpace(e)) {
			e.preventDefault();
		}

		const isRTL = this.effectiveDir === "rtl";

		if (isLeft(e)) {
			e.preventDefault();
			this.expanded = isRTL;
			return;
		}

		if (isRight(e)) {
			e.preventDefault();
			this.expanded = !isRTL;
		}

		if (isMinus(e)) {
			e.preventDefault();
			this.expanded = false;
			return;
		}

		if (isPlus(e)) {
			e.preventDefault();
			this.expanded = true;
		}
	}

	_onclick() {
		this._toggle();
	}

	_onfocusin(e: FocusEvent) {
		e.stopPropagation();

		this.sideNavigation?.focusItem(this);
	}

	_toggle() {
		if (!this.disabled) {
			this.expanded = !this.expanded;
		}
	}

	get isSideNavigationGroup() {
		return true;
	}
}

SideNavigationGroup.define();

export const isInstanceOfSideNavigationGroup = createInstanceChecker<SideNavigationGroup>("isSideNavigationGroup");
export default SideNavigationGroup;
