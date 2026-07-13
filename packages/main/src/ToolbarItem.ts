import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarItemTemplate from "./ToolbarItemTemplate.js";
import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";
import ToolbarItemBase from "./ToolbarItemBase.js";
import type { DefaultSlot } from "@ui5/webcomponents-base";

/**
 * Interface for the slotted item in `ui5-toolbar-item`.
 *
 * It could be any HTMLElement or UI5 Web Component with option to specify custom overflow closing events and overflow behavior.
 *
 * @public
 * @since 2.20.0
 */
interface IToolbarItemContent extends HTMLElement {
	overflowCloseEvents?: string[];
	hasOverflow?: boolean;
}

/**
 * Interface for components that support toolbar navigation without ItemNavigation.
 * Implement this on your component to enable Up/Down navigation within a toolbar item.
 *
 * @public
 * @since 2.22.0
 */
interface IToolbarNavigatable {
	/**
	 * Number of navigable items. Mirrors ItemNavigation's `_getItems().length`.
	 */
	toolbarNavigationItemCount: number;
	/**
	 * 0-based index of currently focused item. Mirrors ItemNavigation's `_currentIndex`.
	 */
	toolbarNavigationCurrentIndex: number;
	/**
	 * Focus the item at the given index. Mirrors `setCurrentItem` + `_focusCurrentItem`.
	 */
	focusToolbarNavigationItem(index: number): void;
	/**
	 * Called when toolbar navigation enters this component from outside.
	 */
	handleToolbarNavigationEntry?(forward: boolean): void;
}

/**
 * Duck-typed interface for accessing a child component's ItemNavigation instance.
 */
interface IChildItemNavigation {
	_getItems: () => Array<{ id: string; forcedTabIndex?: string }>;
	_currentIndex: number;
	setCurrentItem: (item: { id: string; forcedTabIndex?: string }) => void;
	_focusCurrentItem: () => void;
	_applyTabIndex: () => void;
}

/**
 * Duck-typed host that may have an _itemNavigation property.
 */
interface IToolbarNavigatableHost extends HTMLElement {
	_itemNavigation?: Partial<IChildItemNavigation>;
}

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-item` is a wrapper component used to integrate UI5 Web Components into the `ui5-toolbar`.
 * It renders within the toolbar's shadow DOM and manages the lifecycle
 * and overflow behavior of its child component.
 *
 * ### Structure
 * The toolbar item wraps a single UI5 Web Component (such as CheckBox, Title, etc.) and handles:
 * - Overflow management (determining if the item should be displayed in the main toolbar or overflow popover)
 * - Automatic popover closing on interaction
 * - CSS custom state exposure for styling based on overflow state
 *
 * ### Usage
 * The `ui5-toolbar-item` is typically used implicitly when adding components to a toolbar,
 * but specialized wrappers like `ui5-toolbar-button` provide
 * component-specific functionality and should be preferred when available.
 *
 * @constructor
 * @extends ToolbarItemBase
 * @public
 * @since 2.20.0
 */
@customElement({
	tag: "ui5-toolbar-item",
	languageAware: true,
	renderer: jsxRenderer,
	template: ToolbarItemTemplate,
	styles: ToolbarItemCss,
})
class ToolbarItem extends ToolbarItemBase {
	_maxWidth = 0;
	_wrapperChecked = false;
	fireCloseOverflowRef = this.fireCloseOverflow.bind(this);


	closeOverflowSet = {
		"ui5-button": ["click"],
		"ui5-select": ["change"],
		"ui5-combobox": ["change"],
		"ui5-multi-combobox": ["selection-change"],
		"ui5-date-picker": ["change"],
		"ui5-switch": ["change"],
	}

	predefinedWrapperSet = {
		"ui5-button": "ToolbarButton",
		"ui5-select": "ToolbarSelect",
	}

	onBeforeRendering(): void {
		this.checkForWrapper();
		this.attachCloseOverflowHandlers();
		this._syncChildTabIndex();
	}

	onExitDOM(): void {
		this.detachCloseOverflowHandlers();
	}

	/**
	 * Wrapped component slot.
	 * @public
	 * @since 2.20.0
	 */

	@slot({
		"default": true, type: HTMLElement, invalidateOnChildChange: true,
	})
	item!: DefaultSlot<IToolbarItemContent>;

	// Method called by ui5-toolbar to inform about the existing toolbar wrapper
	checkForWrapper() {
		if (this._wrapperChecked) {
			return;
		}
		this._wrapperChecked = true;

		const tagName = this.itemTagName as keyof typeof this.predefinedWrapperSet;
		const ctor = this.constructor as typeof ToolbarItem;
		const wrapperName = ctor?.getMetadata ? ctor.getMetadata().getPureTag() : this.tagName;
		if (wrapperName === "ui5-toolbar-item"
			&& this.predefinedWrapperSet[tagName]) {
			// eslint-disable-next-line no-console
			console.warn(`This UI5 web component has its predefined toolbar wrapper called ${this.predefinedWrapperSet[tagName]}.`);
		}
	}

	// We want to close the overflow popover, when closing event is being executed
	getClosingEvents(): string[] {
		const item = this.item[0];

		const closeEvents = this.closeOverflowSet[this.itemTagName as keyof typeof this.closeOverflowSet] || [];
		if (!item) {
			return [...closeEvents];
		}
		const overflowCloseEvents = item.overflowCloseEvents ? item.overflowCloseEvents : [];

		return [...closeEvents, ...overflowCloseEvents];
	}

	attachCloseOverflowHandlers() {
		const closingEvents = this.getClosingEvents();
		closingEvents.forEach(clEvent => {
			if (!this.preventOverflowClosing) {
				this.addEventListener(clEvent, this.fireCloseOverflowRef);
			}
		});
	}

	detachCloseOverflowHandlers() {
		const closingEvents = this.getClosingEvents();
		closingEvents.forEach(clEvent => {
			this.removeEventListener(clEvent, this.fireCloseOverflowRef);
		});
	}

	fireCloseOverflow() {
		this.fireDecoratorEvent("close-overflow");
	}

	get itemTagName() {
		const ctor = this.getSlottedNodes<IToolbarItemContent>("item")[0]?.constructor as typeof ToolbarItem;
		return ctor?.getMetadata ? ctor.getMetadata().getPureTag() : this.getSlottedNodes<IToolbarItemContent>("item")[0]?.tagName;
	}

	get hasOverflow(): boolean {
		return this.item[0]?.hasOverflow ?? false;
	}

	getFocusDomRef(): HTMLElement | undefined {
		const child = this.item[0];
		if (child && typeof (child as HTMLElement & { getFocusDomRef?: () => HTMLElement }).getFocusDomRef === "function") {
			return (child as HTMLElement & { getFocusDomRef: () => HTMLElement }).getFocusDomRef() || child;
		}

		if (child) {
			return this._getFirstFocusableChild(child) || child;
		}

		return super.getFocusDomRef();
	}

	/**
	 * Returns the child's ItemNavigation instance if it has one (duck-typed).
	 * This enables auto-detection of components like SegmentedButton.
	 */
	_getChildItemNavigation(): IChildItemNavigation | null {
		const child = this.item[0] as IToolbarNavigatableHost | undefined;
		if (child
			&& child._itemNavigation
			&& typeof child._itemNavigation._getItems === "function"
			&& typeof child._itemNavigation.setCurrentItem === "function"
			&& "_currentIndex" in child._itemNavigation) {
			return child._itemNavigation as IChildItemNavigation;
		}
		return null;
	}

	/**
	 * Checks if the child implements the IToolbarNavigatable interface (duck-typed).
	 */
	_getChildNavigatable(): IToolbarNavigatable | null {
		const child = this.item[0] as Partial<IToolbarNavigatable> | undefined;
		if (child
			&& typeof child.toolbarNavigationItemCount === "number"
			&& typeof child.toolbarNavigationCurrentIndex === "number"
			&& typeof child.focusToolbarNavigationItem === "function") {
			return child as IToolbarNavigatable;
		}
		return null;
	}

	/**
	 * Syncs the child's internal tabindex state based on this item's forcedTabIndex.
	 */
	_syncChildTabIndex(): void {
		const childNav = this._getChildItemNavigation();
		if (childNav) {
			const items = childNav._getItems();
			if (this.forcedTabIndex === "-1") {
				items.forEach(item => { item.forcedTabIndex = "-1"; });
			} else {
				childNav._applyTabIndex();
			}
			return;
		}

		// Propagate forcedTabIndex to child if it supports it
		const child = this.item[0] as { forcedTabIndex?: string } | undefined;
		if (child && "forcedTabIndex" in child) {
			child.forcedTabIndex = this.forcedTabIndex;
		}
	}

	// --- Navigation interface ---

	get toolbarNavigationItemCount(): number {
		const childNav = this._getChildItemNavigation();
		if (childNav) {
			return childNav._getItems().length;
		}

		const navigatable = this._getChildNavigatable();
		if (navigatable) {
			return navigatable.toolbarNavigationItemCount;
		}

		return 1;
	}

	get toolbarNavigationCurrentIndex(): number {
		const childNav = this._getChildItemNavigation();
		if (childNav) {
			return childNav._currentIndex;
		}

		const navigatable = this._getChildNavigatable();
		if (navigatable) {
			return navigatable.toolbarNavigationCurrentIndex;
		}

		return 0;
	}

	focusToolbarNavigationItem(index: number): void {
		const childNav = this._getChildItemNavigation();
		if (childNav) {
			const items = childNav._getItems();
			if (items[index]) {
				childNav.setCurrentItem(items[index]);
				childNav._focusCurrentItem();
			}
			return;
		}

		const navigatable = this._getChildNavigatable();
		if (navigatable) {
			navigatable.focusToolbarNavigationItem(index);
			return;
		}

		this.getFocusDomRef()?.focus();
	}

	handleToolbarNavigationEntry(forward: boolean): void {
		const childNav = this._getChildItemNavigation();
		if (childNav) {
			childNav._focusCurrentItem();
			return;
		}

		const navigatable = this._getChildNavigatable();
		if (navigatable) {
			if (typeof navigatable.handleToolbarNavigationEntry === "function") {
				navigatable.handleToolbarNavigationEntry(forward);
			} else {
				navigatable.focusToolbarNavigationItem(
					forward ? 0 : navigatable.toolbarNavigationItemCount - 1,
				);
			}
			return;
		}

		this.getFocusDomRef()?.focus();
	}

	_getFirstFocusableChild(root: HTMLElement): HTMLElement | null {
		return root.querySelector<HTMLElement>(
			"a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
		);
	}
}

export type {
	IToolbarItemContent,
	IToolbarNavigatable,
};
ToolbarItem.define();

export default ToolbarItem;
