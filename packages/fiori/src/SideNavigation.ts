import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import { createMultiInstanceChecker } from "@ui5/webcomponents-base/dist/util/createMultiInstanceChecker.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type NavigationMenu from "./NavigationMenu.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";

import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import type SideNavigationItemBase from "./SideNavigationItemBase.js";
import { isInstanceOfSideNavigationSelectableItemBase } from "./SideNavigationSelectableItemBase.js";
import { isInstanceOfSideNavigationItemBase } from "./SideNavigationItemBase.js";
import type SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import { isInstanceOfSideNavigationItem } from "./SideNavigationItem.js";
import { isInstanceOfSideNavigationGroup } from "./SideNavigationGroup.js";
import type SideNavigationItem from "./SideNavigationItem.js";
import type SideNavigationSubItem from "./SideNavigationSubItem.js";
import type SideNavigationGroup from "./SideNavigationGroup.js";
import SideNavigationTemplate from "./SideNavigationTemplate.js";

import {
	SIDE_NAVIGATION_POPOVER_HIDDEN_TEXT,
	SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_OVERFLOW_ACCESSIBLE_NAME,
	SIDE_NAVIGATION_FLEXIBLE_LIST_LABEL,
	SIDE_NAVIGATION_FIXED_LIST_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import SideNavigationCss from "./generated/themes/SideNavigation.css.js";
import SideNavigationPopoverCss from "./generated/themes/SideNavigationPopover.css.js";

const PAGE_UP_DOWN_SIZE = 10;
const SCREEN_WIDTH_BREAKPOINT = 600;

type SideNavigationPopoverContents = {
	item: SideNavigationItem,
	subItems: Array<SideNavigationSubItem>,
};

type SideNavigationSelectionChangeEventDetail = {
	item: SideNavigationItemBase,
};

type SideNavigationItemClickEventDetail = {
	item: SideNavigationSelectableItemBase,
};

type PopupSideNavigationItem = SideNavigationItem & { associatedItem: SideNavigationSelectableItemBase };

/**
 * @class
 *
 * ### Overview
 *
 * The `SideNavigation` is used as a standard menu in applications.
 * It consists of three containers: header (top-aligned), main navigation section (top-aligned) and the secondary section (bottom-aligned).
 *
 *  - The header is meant for displaying user related information - profile data, avatar, etc.
 *  - The main navigation section is related to the user's current work context
 *  - The secondary section is mostly used to link additional information that may be of interest (legal information, developer communities, external help, contact information and so on).
 *
 * ### Usage
 *
 * Use the available `ui5-side-navigation-group`, `ui5-side-navigation-item`
 * and `ui5-side-navigation-sub-item` components to build your menu.
 * The items can consist of text only or an icon with text. The use or non-use of icons must be consistent for all items on one level.
 * You must not combine entries with and without icons on the same level. We strongly recommend that you do not use icons on the second level.
 *
 * The `ui5-side-navigation` component is designed to be used within a `ui5-navigation-layout` component to ensure an optimal user experience.
 *
 * Using it standalone may not match the intended design and functionality.
 * For example, the side navigation may not exhibit the correct behavior on smaller screens.
 * Additionally, the padding of the `ui5-shellbar` will not match the padding of the side navigation.
 *
 * ### Keyboard Handling
 *
 * ### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigation.js"`
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";` (for `ui5-side-navigation-group`)
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";` (for `ui5-side-navigation-item`)
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";` (for `ui5-side-navigation-sub-item`)
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.8
 * @public
 */

@customElement({
	tag: "ui5-side-navigation",
	fastNavigation: true,
	renderer: jsxRender,
	template: SideNavigationTemplate,
	styles: [SideNavigationCss, SideNavigationPopoverCss],
})
/**
 * Fired when the selection has changed via user interaction
 *
 * @param {SideNavigationSelectableItemBase} item the clicked item.
 * @public
 */
@event("selection-change", {
	bubbles: true,
	cancelable: true,
})
/**
 * Fired when an item is clicked
 *
 * @param {SideNavigationSelectableItemBase} item the clicked item.
 * @public
 */
@event("item-click", {
	bubbles: true,
	cancelable: true,
})
class SideNavigation extends UI5Element {
	eventDetails!: {
		"selection-change": SideNavigationSelectionChangeEventDetail,
		"item-click": SideNavigationItemClickEventDetail
	}

	/**
	 * Defines whether the `ui5-side-navigation` is expanded or collapsed.
	 *
	 * **Note:** On small screens (screen width of 599px or less) the collapsed mode is not supported, and in
	 * expanded mode the side navigation will take the whole width of the screen.
	 * The `ui5-side-navigation` component is intended to be used within a `ui5-navigation-layout`
	 * component to ensure proper responsive behavior. If you choose not to use the
	 * `ui5-navigation-layout`, you will need to implement the appropriate responsive patterns yourself,
	 * particularly for smaller screens where the collapsed mode should not be used.
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	collapsed = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 2.9.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the main items of the component.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: DefaultSlot<SideNavigationItemBase>;

	/**
	 * Defines the fixed items at the bottom of the component.
	 *
	 * **Note:** In order to achieve the best user experience, it is recommended that you keep the fixed items "flat" (do not pass sub-items)
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	fixedItems!: Slot<SideNavigationItemBase>;

	/**
	 * Defines the header of the `ui5-side-navigation`.
	 *
	 * **Note:** The header is displayed when the component is expanded - the property `collapsed` is false;
	 *
	 * @public
	 * @since 1.0.0-rc.11
	 */
	@slot()
	header!: Slot<HTMLElement>;

	/**
	 * @private
	 */
	@property({ type: Object })
	_popoverContents!: SideNavigationPopoverContents;

	@property({ type: Boolean })
	inPopover= false;

	@property({ type: Object })
	_menuPopoverItems: Array<SideNavigationItem> = [];

	_isOverflow = false;
	_flexibleItemNavigation: ItemNavigation;
	_fixedItemNavigation: ItemNavigation;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._flexibleItemNavigation = new ItemNavigation(this, {
			skipItemsSize: PAGE_UP_DOWN_SIZE, // PAGE_UP and PAGE_DOWN will skip trough 10 items
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getEnabledFlexibleItems(),
		});

		this._fixedItemNavigation = new ItemNavigation(this, {
			skipItemsSize: PAGE_UP_DOWN_SIZE, // PAGE_UP and PAGE_DOWN will skip trough 10 items
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getEnabledFixedItems(),
		});

		this._handleResizeBound = this.handleResize.bind(this);
		this._isOverflow = false;
	}

	_handleResizeBound: () => void;

	onBeforeRendering() {
		super.onBeforeRendering();

		this._getAllItems(this.items)
			.concat(this._getAllItems(this.fixedItems))
			.forEach(item => {
				item.sideNavCollapsed = this.collapsed;
				item.inPopover = this.inPopover;
				item.sideNavigation = this;
			});

		this.initGroupsSettings(this.items);
		this.initGroupsSettings(this.fixedItems);
	}

	initGroupsSettings(items: Array<SideNavigationItemBase>) {
		let isPreviousItemGroup = false;

		items.forEach(item => {
			const isGroup = isInstanceOfSideNavigationGroup(item);

			if (isGroup) {
				item.belowGroup = isPreviousItemGroup;
			}

			isPreviousItemGroup = isGroup;
		});
	}

	_onAfterPopoverOpen() {
		// as the tree/list inside the popover is never destroyed,
		// item navigation index should be managed, because items are
		// dynamically recreated and tabIndexes are not updated
		const tree = this.getPickerTree();
		const selectedItem = tree._findSelectedItem(tree.items);
		if (selectedItem) {
			selectedItem.focus();
		} else {
			tree.items[0]?.applyInitialFocusInPopover();
		}
	}

	_onBeforePopoverOpen() {
		const popover = this.getPicker();
		(popover?.opener as HTMLElement)?.classList.add("ui5-sn-item-active");
	}

	_onBeforePopoverClose() {
		const popover = this.getPicker();
		(popover?.opener as HTMLElement)?.classList.remove("ui5-sn-item-active");
	}

	_onBeforeMenuOpen() {
		const popover = this.getOverflowPopover();
		popover._popover.preventFocusRestore = false;
		(popover?.opener as HTMLElement)?.classList.add("ui5-sn-item-active");
	}

	_onBeforeMenuClose() {
		const popover = this.getOverflowPopover();
		(popover?.opener as HTMLElement)?.classList.remove("ui5-sn-item-active");
	}

	_bn?: SideNavigationSelectableItemBase;

	_onMenuClose() {
		const menu = this.getOverflowPopover();
		if (!menu._popover.preventFocusRestore) {
			return;
		}

		const selectedItem = this._findSelectedItem(this.items);

		if (selectedItem) {
			this.focusItem(selectedItem);
			selectedItem.focus();
		}
	}

	get accSideNavigationPopoverHiddenText() {
		return SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_POPOVER_HIDDEN_TEXT);
	}

	get ariaRoleDescNavigationList() {
		let key = SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC;
		if (this.collapsed) {
			key = SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC;
		}

		return SideNavigation.i18nBundle.getText(key);
	}

	get navigationMenuPrimaryHiddenText() {
		return SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_FLEXIBLE_LIST_LABEL);
	}

	get navigationMenuFooterHiddenText() {
		return SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_FIXED_LIST_LABEL);
	}

	get overflowAccessibleName() {
		return SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_OVERFLOW_ACCESSIBLE_NAME);
	}

	handlePopupItemClick(e: KeyboardEvent | PointerEvent) {
		const associatedItem = (e.target as PopupSideNavigationItem).associatedItem;

		if (associatedItem.effectiveDisabled) {
			e.stopPropagation();
			e.preventDefault();
			return;
		}

		if (isInstanceOfSideNavigationItem(associatedItem) && associatedItem.unselectable) {
			return;
		}

		e.stopPropagation();

		const altKey = (e.detail as any)?.altKey,
			ctrlKey = (e.detail as any)?.ctrlKey,
			metaKey = (e.detail as any)?.metaKey,
			shiftKey = (e.detail as any)?.shiftKey;

		const executeEvent = associatedItem.fireDecoratorEvent("click", {
			altKey,
			ctrlKey,
			metaKey,
			shiftKey,
		});

		if (!executeEvent) {
			e.preventDefault();
			return;
		}

		if (associatedItem.selected) {
			this.closePicker();
			return;
		}

		this._selectItem(associatedItem);

		setTimeout(() => {
			this.closePicker();
			this._popoverContents.item?.getDomRef()!.classList.add("ui5-sn-item-no-hover-effect");
		});
	}

	getOverflowPopover() {
		return this.shadowRoot!.querySelector<NavigationMenu>(".ui5-side-navigation-overflow-menu")!;
	}

	getPicker() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	openPicker(opener: HTMLElement) {
		opener.classList.add("ui5-sn-item-active");

		const responsivePopover = this.getPicker();
		responsivePopover.opener = opener;
		responsivePopover.open = true;
	}

	openOverflowMenu(opener: HTMLElement) {
		opener.classList.add("ui5-sn-item-active");

		const menu = this.getOverflowPopover();
		menu.opener = opener;
		menu.open = true;
	}

	closePicker() {
		const responsivePopover = this.getPicker();
		responsivePopover.open = false;
	}

	closeMenu(preventFocusRestore: boolean = false) {
		const menu = this.getOverflowPopover();
		menu._popover.preventFocusRestore = preventFocusRestore;
		menu.open = false;
	}

	getPickerTree() {
		const picker = this.getPicker();
		return picker.querySelector<SideNavigation>("[ui5-side-navigation]")!;
	}

	get hasHeader() {
		return !!this.header.length;
	}

	get showHeader() {
		return this.hasHeader && !this.collapsed;
	}

	get hasFixedItems() {
		return !!this.fixedItems.length;
	}

	get _rootRole() {
		return this.inPopover ? "none" : undefined;
	}

	getEnabledFixedItems() : Array<ITabbable> {
		return this.getEnabledItems(this.fixedItems);
	}

	getEnabledFlexibleItems() : Array<ITabbable> {
		const items = this.getEnabledItems(this.items);

		if (this._overflowItem) {
			items.push(this._overflowItem);
		}

		return items;
	}

	getEnabledItems(items: Array<SideNavigationItemBase>) : Array<ITabbable> {
		const result = new Array<ITabbable>();

		this._getFocusableItems(items).forEach(item => {
			if (this.collapsed && item.classList.contains("ui5-sn-item-hidden")) {
				return;
			}

			result.push(item);
		});

		return result;
	}

	focusItem(item: SideNavigationItemBase) {
		if (item.isFixedItem) {
			this._fixedItemNavigation.setCurrentItem(item);
		} else {
			this._flexibleItemNavigation.setCurrentItem(item);
		}
	}

	onAfterRendering() {
		if (!this.getDomRef()?.matches(":focus-within")) {
			let selectedItem = this._findSelectedItem(this.items);
			if (selectedItem) {
				this._flexibleItemNavigation.setCurrentItem(selectedItem);
			}

			selectedItem = this._findSelectedItem(this.fixedItems);
			if (selectedItem) {
				this._fixedItemNavigation.setCurrentItem(selectedItem);
			}
		}

		if (this.collapsed) {
			this.handleResize();
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}

	handleResize() {
		// In smaller screen the side navigation hidden when collapsed and there is no overflow items
		if (window.innerWidth > SCREEN_WIDTH_BREAKPOINT) {
			this._updateOverflowItems();
		}
	}

	_updateOverflowItems() {
		const domRef = this.getDomRef();
		if (!this.collapsed || !domRef) {
			return null;
		}

		const overflowItem = this._overflowItem!;
		const flexibleContentDomRef : HTMLElement = domRef.querySelector(".ui5-sn-flexible")!;
		if (!overflowItem) {
			return null;
		}

		overflowItem.classList.add("ui5-sn-item-hidden");

		const overflowItems = this.overflowItems;

		let itemsHeight = overflowItems.reduce<number>((sum, itemRef) => {
			if (!itemRef) {
				return sum;
			}
			itemRef.classList.remove("ui5-sn-item-hidden");
			return sum + itemRef.offsetHeight;
		}, 0);

		const { paddingTop, paddingBottom } = window.getComputedStyle(flexibleContentDomRef);
		const listHeight = flexibleContentDomRef?.offsetHeight - parseInt(paddingTop) - parseInt(paddingBottom);

		if (itemsHeight <= listHeight) {
			return;
		}

		overflowItem.classList.remove("ui5-sn-item-hidden");

		itemsHeight = overflowItem.offsetHeight;

		const selectedItem = overflowItems.filter(isInstanceOfSideNavigationSelectableItemBase).find(item => item._selected);

		if (selectedItem) {
			const selectedItemDomRef = selectedItem.getDomRef();

			if (selectedItemDomRef) {
				const { marginTop, marginBottom } = window.getComputedStyle(selectedItemDomRef);
				itemsHeight += selectedItemDomRef.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom);
			}
		}

		overflowItems.forEach(item => {
			if (!item || item === selectedItem) {
				return;
			}

			let itemDomRef;

			if (isInstanceOfSideNavigationItemBase(item) && item.getDomRef()) {
				itemDomRef = item.getDomRef();
			} else {
				itemDomRef = item;
			}

			if (itemDomRef) {
				const { marginTop, marginBottom } = window.getComputedStyle(itemDomRef);
				itemsHeight += itemDomRef.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom);

				if (itemsHeight > listHeight) {
					item.classList.add("ui5-sn-item-hidden");
				}
			}
		});

		this._flexibleItemNavigation._init();
	}

	_findFocusedItem(items: Array<SideNavigationItemBase>) : SideNavigationItemBase | undefined {
		return this._getFocusableItems(items).find(item => item.forcedTabIndex === "0");
	}

	_getSelectableItems(items: Array<SideNavigationItemBase>) : Array<SideNavigationSelectableItemBase> {
		return items.filter(instanceOfItemOrGroup).reduce((result, item) => {
			return result.concat(item.selectableItems);
		}, new Array<SideNavigationSelectableItemBase>());
	}

	_getFocusableItems(items: Array<SideNavigationItemBase>) : Array<SideNavigationItemBase> {
		return items.filter(instanceOfItemOrGroup).reduce((result, item) => {
			return result.concat(item.focusableItems);
		}, new Array<SideNavigationItemBase>());
	}

	_getAllItems(items: Array<SideNavigationItemBase>) : Array<SideNavigationItemBase> {
		return items.filter(instanceOfItemOrGroup).reduce((result, item) => {
			return result.concat(item.allItems);
		}, new Array<SideNavigationItemBase>());
	}

	_findSelectedItem(items: Array<SideNavigationItemBase>) : SideNavigationSelectableItemBase | undefined {
		return this._getSelectableItems(items).find(item => item._selected);
	}

	get overflowItems() : Array<HTMLElement> {
		return this.items.filter(instanceOfItemOrGroup).reduce((result, item) => {
			return result.concat(item.overflowItems);
		}, new Array<HTMLElement>());
	}

	private _isSmallScreen(): boolean {
		return isPhone() || window.innerWidth < SCREEN_WIDTH_BREAKPOINT;
	}

	_handleItemClick(e: KeyboardEvent | MouseEvent, item: SideNavigationSelectableItemBase) {
		this.fireDecoratorEvent("item-click", { item });

		if (item.effectiveDisabled) {
			e.stopPropagation();
			e.preventDefault();
			return;
		}

		if (item.selected && !this.collapsed) {
			const {
				altKey,
				ctrlKey,
				metaKey,
				shiftKey,
			} = e;

			const executeEvent = item.fireDecoratorEvent("click", {
				altKey,
				ctrlKey,
				metaKey,
				shiftKey,
			});

			if (!executeEvent) {
				e.preventDefault();
			}

			return;
		}

		if (!this._isSmallScreen() && this.collapsed && isInstanceOfSideNavigationItem(item) && item.items.length) {
			e.preventDefault();
			this._isOverflow = false;

			this._popoverContents = {
				item,
				subItems: item.items,
			};

			this.openPicker(item.getFocusDomRef() as HTMLElement);
		} else {
			const {
				altKey,
				ctrlKey,
				metaKey,
				shiftKey,
			} = e;

			const executeEvent = item.fireDecoratorEvent("click", {
				altKey,
				ctrlKey,
				metaKey,
				shiftKey,
			});

			if (!executeEvent) {
				e.preventDefault();
				return;
			}

			if (!item.selected) {
				this._selectItem(item);
			}
		}
	}

	_handleOverflowClick() {
		this._isOverflow = true;
		this._menuPopoverItems = this._getOverflowItems();

		this.openOverflowMenu(this._overflowItem!);
	}

	_getOverflowItems(): Array<SideNavigationItem> {
		const overflowClass = "ui5-sn-item-hidden";
		const result: Array<SideNavigationItem> = [];

		this.overflowItems.forEach(item => {
			if (item && isInstanceOfSideNavigationItem(item) && item.classList.contains(overflowClass)) {
				result.push(item);
			}
		});

		return result;
	}

	_selectItem(item: SideNavigationSelectableItemBase) {
		if (!item.isSelectable) {
			return;
		}

		if (!this.fireDecoratorEvent("selection-change", { item })) {
			return;
		}

		let items = this._getSelectableItems(this.items);
		items = items.concat(this._getSelectableItems(this.fixedItems));

		items.forEach(current => {
			current.selected = false;
		});

		item.selected = true;
	}

	get _overflowItem() {
		const overflowItem = this.shadowRoot!.querySelector<SideNavigationItem>(".ui5-sn-item-overflow");
		if (overflowItem) {
			overflowItem.sideNavigation = this;
		}

		return overflowItem;
	}

	get isOverflow() {
		return this._isOverflow;
	}

	captureRef(ref: HTMLElement & { associatedItem?: UI5Element} | null) {
		if (ref) {
			ref.associatedItem = this;
		}
	}
}

const instanceOfItemOrGroup = createMultiInstanceChecker<SideNavigationItem | SideNavigationGroup>(["isSideNavigationItem", "isSideNavigationGroup"]);

SideNavigation.define();

export default SideNavigation;

export type {
	SideNavigationSelectionChangeEventDetail,
	SideNavigationItemClickEventDetail,
};
