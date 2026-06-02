import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import {
	isLeft,
	isRight,
	isHome,
	isEnd,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";

import {
	TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL,
	TOOLBAR_POPOVER_AVAILABLE_VALUES,
} from "./generated/i18n/i18n-defaults.js";

import ToolbarTemplate from "./ToolbarTemplate.js";
import ToolbarCss from "./generated/themes/Toolbar.css.js";

import ToolbarPopoverCss from "./generated/themes/ToolbarPopover.css.js";

import type ToolbarAlign from "./types/ToolbarAlign.js";
import type ToolbarDesign from "./types/ToolbarDesign.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

import ToolbarItemBase from "./ToolbarItemBase.js";
import type ToolbarSeparator from "./ToolbarSeparator.js";

import type Button from "./Button.js";
import type Popover from "./Popover.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";

type ToolbarMinWidthChangeEventDetail = {
	minWidth: number,
};

function calculateCSSREMValue(styleSet: CSSStyleDeclaration, propertyName: string): number {
	return Number(styleSet.getPropertyValue(propertyName).replace("rem", "")) * parseInt(getComputedStyle(document.body).getPropertyValue("font-size"));
}

function parsePxValue(styleSet: CSSStyleDeclaration, propertyName: string): number {
	return Number(styleSet.getPropertyValue(propertyName).replace("px", ""));
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toolbar` component is used to create a horizontal layout with items.
 * The items can be overflowing in a popover, when the space is not enough to show all of them.
 *
 * ### Keyboard Handling
 * The `ui5-toolbar` provides advanced keyboard handling.
 *
 * - [Left]/[Right] - navigate among toolbar items
 * - [Home]/[End] - move to first/last toolbar item
 * - [Tab] / [Shift]+[Tab] - exit the toolbar
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Toolbar.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-toolbar",
	languageAware: true,
	renderer: jsxRenderer,
	template: ToolbarTemplate,
})
/**
 * @private
*/
@event("_min-content-width-change", {
	bubbles: true,
})

class Toolbar extends UI5Element {
	eventDetails!: {
		"_min-content-width-change": ToolbarMinWidthChangeEventDetail
	}
	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	/**
	 * Indicated the direction in which the Toolbar items will be aligned.
	 * @public
	 * @default "End"
	 */
	@property()
	alignContent: `${ToolbarAlign}` = "End";

	/**
	 * Calculated width of the whole toolbar.
	 * @private
	 * @default undefined
	 */
	@property({ type: Number })
	width?: number;

	/**
	 * Calculated width of the toolbar content.
	 * @private
	 * @default undefined
	 */
	@property({ type: Number })
	contentWidth?: number;

	/**
	 * Notifies the toolbar if it should show the items in a reverse way if Toolbar Popover needs to be placed on "Top" position.
	 * @private
	 */
	@property({ type: Boolean })
	reverseOverflow = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * **Note:** It is strongly recommended to always set this property or `accessibleNameRef`
	 * when the toolbar has `role="toolbar"` (i.e. when it contains more than one interactive item).
	 * Without an accessible name, screen readers will announce the toolbar without any context,
	 * making it harder for keyboard-only and AT users to understand its purpose.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the input.
	 *
	 * **Note:** When the toolbar has `role="toolbar"`, at least one of `accessibleName` or
	 * `accessibleNameRef` should be provided to satisfy WCAG 2.1 success criterion 4.1.2.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the accessible ARIA name of the overflow button of the component.
	 *
	 * **Note:** When not set, the built-in translation for "Additional Options" is used.
	 * @default undefined
	 * @public
	 * @since 2.22.0
	 */
	@property()
	overflowButtonAccessibleName?: string;

	/**
	 * Defines the toolbar design.
	 * @public
	 * @default "Solid"
	 * @since 2.0.0
	 */
	@property()
	design: `${ToolbarDesign}` = "Solid"

	@property({ type: Boolean })
	popoverOpen = false;

	/**
	 * Defines the items of the component.
	 *
	 * **Note:** Currently only `ui5-toolbar-button`, `ui5-toolbar-select`, `ui5-toolbar-separator` and `ui5-toolbar-spacer` are allowed here.
	 * @public
	 */
	@slot({
		"default": true, type: HTMLElement, invalidateOnChildChange: true, individualSlots: true,
	})
	items!: DefaultSlot<ToolbarItemBase>

	_onResize!: ResizeObserverCallback;
	_onCloseOverflow!: EventListener;
	_onFocusIn!: (e: FocusEvent) => void;
	_onKeyDown!: (e: KeyboardEvent) => void;
	itemsToOverflow: Array<ToolbarItemBase> = [];
	itemsWidth = 0;
	minContentWidth = 0;
	_lastFocusedItem?: ToolbarItemBase | HTMLElement;
	_originalTabIndexes = new WeakMap<HTMLElement, string | null>();

	ITEMS_WIDTH_MAP: Map<string, number> = new Map();

	static get styles() {
		return [
			ToolbarCss,
			ToolbarPopoverCss,
		];
	}

	constructor() {
		super();

		this._onResize = this.onResize.bind(this);
		this._onCloseOverflow = this.closeOverflow.bind(this);
		this._onFocusIn = this._onfocusin.bind(this);
		this._onKeyDown = this._onkeydown.bind(this);
	}

	/**
	 * Read-only members
	 */

	get overflowButtonSize(): number {
		return this.overflowButtonDOM?.getBoundingClientRect().width || 0;
	}

	get padding(): number {
		const toolbarComputedStyle = getComputedStyle(this.getDomRef()!);
		return calculateCSSREMValue(toolbarComputedStyle, "--_ui5-toolbar-padding-left")
			+ calculateCSSREMValue(toolbarComputedStyle, "--_ui5-toolbar-padding-right");
	}

	get alwaysOverflowItems() {
		return this.items.filter(item => item.overflowPriority === ToolbarItemOverflowBehavior.AlwaysOverflow);
	}

	get movableItems() {
		return this.items.filter(item => item.overflowPriority !== ToolbarItemOverflowBehavior.AlwaysOverflow && item.overflowPriority !== ToolbarItemOverflowBehavior.NeverOverflow);
	}

	get overflowItems() {
		// spacers are ignored
		const overflowItems = this.itemsToOverflow.filter(item => !item.ignoreSpace);
		return this.reverseOverflow ? overflowItems.reverse() : overflowItems;
	}

	get standardItems() {
		return this.items.filter(item => this.itemsToOverflow.indexOf(item) === -1);
	}

	get hideOverflowButton() {
		return this.itemsToOverflow.filter(item => !(item.ignoreSpace || item.isSeparator)).length === 0;
	}

	get interactiveItems() {
		return this.items.filter((item: ToolbarItemBase) => item.isInteractive);
	}

	/**
	 * Accessibility
	 */

	get hasAriaSemantics() {
		return this.interactiveItems.length > 1;
	}

	get accessibleRole() {
		return this.hasAriaSemantics ? "toolbar" as const : undefined;
	}

	get ariaLabelText() {
		return this.hasAriaSemantics ? getEffectiveAriaLabelText(this) : undefined;
	}

	get accInfo() {
		return {
			root: {
				role: this.accessibleRole,
				accessibleName: this.ariaLabelText,
			},
			overflowButton: {
				accessibleName: this.overflowButtonAccessibleName || Toolbar.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL),
				tooltip: Toolbar.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL),
				accessibilityAttributes: {
					expanded: this.popoverOpen,
					hasPopup: "menu" as const,
				},
			},
			popover: {
				accessibleName: Toolbar.i18nBundle.getText(TOOLBAR_POPOVER_AVAILABLE_VALUES),
			},
		};
	}

	/**
	 * Toolbar Overflow Popover
	 */

	get overflowButtonDOM(): Button | null {
		return this.shadowRoot!.querySelector(".ui5-tb-overflow-btn");
	}

	get hasFlexibleSpacers() {
		return this.items.some((item: ToolbarItemBase) => item.hasFlexibleWidth);
	}

	/**
	 * Lifecycle methods
	 */
	onEnterDOM() {
		ResizeHandler.register(this, this._onResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._onResize);
	}

	onInvalidation(changeInfo: ChangeInfo) {
		if (changeInfo.reason === "childchange") {
			const currentItemsWidth = this.items.reduce((total, item) => total + this.getItemWidth(item), 0);
			if (currentItemsWidth !== this.itemsWidth) {
				this.onToolbarItemChange();
			}
		}
	}

	onBeforeRendering() {
		this.detachListeners();
		this.attachListeners();
		if (getActiveElement() === this.overflowButtonDOM?.getFocusDomRef() && this.hideOverflowButton) {
			const items = this._getNavigableItems();
			const lastItem = items.at(-1);
			if (lastItem) {
				this._lastFocusedItem = lastItem;
				lastItem.focusForToolbarNavigation(false);
			}
		}
		this.prePopulateAlwaysOverflowItems();
	}

	async onAfterRendering() {
		await renderFinished();
		this.storeItemsWidth();
		this.processOverflowLayout();
		this.items.forEach(item => {
			this.addItemsAdditionalProperties(item);
		});
		this._refreshOriginalTabIndexes();
		this._applyRovingTabIndex();
		this._restoreOverflowTabOrder();
	}

	addItemsAdditionalProperties(item: ToolbarItemBase) {
		item.isOverflowed = this.overflowItems.indexOf(item) !== -1;
		const itemWrapper = this.shadowRoot!.querySelector(`#${item._individualSlot}`) as HTMLElement;
		if (item.hasOverflow && !item.isOverflowed && itemWrapper) {
			// We need to set the max-width to the self-overflow element in order ot prevent it from taking all the available space,
			// since, unlike the other items, it is allowed to grow and shrink
			// We need to set the max-width to none and its position to absolute to allow the item to grow and measure its width,
			// then when set, the max-width will be cached and we will set its highest value to not cut it when the Toolbar shrinks it
			// on rendering and then we resize it manually.
			itemWrapper.style.maxWidth = `none`;
			itemWrapper?.classList.add("ui5-tb-self-overflow-grow");
			item._maxWidth = Math.max(this.getItemWidth(item), item._maxWidth);
			itemWrapper.style.maxWidth = `${item._maxWidth}px`;
			itemWrapper?.classList.remove("ui5-tb-self-overflow-grow");
		}
	}

	/**
	 * Returns if the overflow popup is open.
	 * @public
	 */
	isOverflowOpen(): boolean {
		const overflowPopover = this.getOverflowPopover();
		return overflowPopover.open;
	}

	openOverflow(): void {
		const overflowPopover = this.getOverflowPopover();
		overflowPopover.opener = this.overflowButtonDOM!;
		overflowPopover.open = true;
		this.reverseOverflow = overflowPopover.actualPlacement === "Top";
	}

	closeOverflow() {
		const overflowPopover = this.getOverflowPopover();
		overflowPopover.open = false;
	}

	toggleOverflow() {
		if (this.popoverOpen) {
			this.closeOverflow();
		} else {
			this.openOverflow();
		}
	}

	getOverflowPopover(): Popover {
		return this.shadowRoot!.querySelector<Popover>(".ui5-overflow-popover")!;
	}

	/**
	 * Layout management
	 */

	processOverflowLayout() {
		if (this.offsetWidth === 0) {
			return;
		}
		const containerWidth = this.offsetWidth - this.padding;
		const contentWidth = this.itemsWidth;
		let overflowSpace = contentWidth - containerWidth + this.overflowButtonSize;

		if (contentWidth <= containerWidth) {
			overflowSpace = 0;
		}

		// skip calculation if the width has not been changed or if the items width has not been changed
		if (this.width === containerWidth && this.contentWidth === contentWidth) {
			return;
		}

		this.distributeItems(overflowSpace);
		this.width = containerWidth;
		this.contentWidth = contentWidth;
	}

	storeItemsWidth() {
		let totalWidth = 0,
			minWidth = 0;

		this.items.forEach(item => {
			const itemWidth = this.getItemWidth(item);
			totalWidth += itemWidth;
			if (item.overflowPriority === ToolbarItemOverflowBehavior.NeverOverflow) {
				minWidth += itemWidth;
			}
			this.ITEMS_WIDTH_MAP.set(item._id, itemWidth);
		});

		if (minWidth !== this.minContentWidth) {
			const spaceAroundContent = this.offsetWidth - this.getDomRef()!.offsetWidth;
			this.fireDecoratorEvent("_min-content-width-change", {
				minWidth: minWidth + spaceAroundContent + this.overflowButtonSize,
			});
		}

		this.itemsWidth = totalWidth;
		this.minContentWidth = minWidth;
	}

	distributeItems(overflowSpace = 0) {
		const movableItems = this.movableItems.reverse();
		let index = 0;
		let currentItem = movableItems[index];

		this.itemsToOverflow = [];

		// distribute items that always overflow
		this.distributeItemsThatAlwaysOverflow();

		while (overflowSpace > 0 && currentItem) {
			this.itemsToOverflow.unshift(currentItem);
			overflowSpace -= this.getCachedItemWidth(currentItem?._id) || 0;
			index++;
			currentItem = movableItems[index];
		}

		// If the last bar item is a spacer, force it to the overflow even if there is enough space for it
		if (index < movableItems.length) {
			let lastItem = movableItems[index];
			while (index <= movableItems.length - 1 && lastItem.isSeparator) {
				this.itemsToOverflow.unshift(lastItem);
				index++;
				lastItem = movableItems[index];
			}
		}

		this.setSeperatorsVisibilityInOverflow();
	}

	distributeItemsThatAlwaysOverflow() {
		this.alwaysOverflowItems.forEach((item: ToolbarItemBase) => {
			this.itemsToOverflow.push(item);
		});
	}

	setSeperatorsVisibilityInOverflow() {
		this.itemsToOverflow.forEach((item, idx, items) => {
			if (item.isSeparator) {
				(item as ToolbarSeparator).visible = this.shouldShowSeparatorInOverflow(idx, items);
			}
		});
	}

	shouldShowSeparatorInOverflow(separatorIdx: number, overflowItems: Array<ToolbarItemBase>) {
		let foundPrevNonSeparatorItem = false;
		let foundNextNonSeperatorItem = false;

		// search for non-separator item before and after the seperator
		overflowItems.forEach((item, idx) => {
			if (idx < separatorIdx && !item.isSeparator) {
				foundPrevNonSeparatorItem = true;
			}
			if (idx > separatorIdx && !item.isSeparator) {
				foundNextNonSeperatorItem = true;
			}
		});

		return foundPrevNonSeparatorItem && foundNextNonSeperatorItem;
	}

	/**
	 * Adds AlwaysOverflow items to overflow to ensure they are never rendered outside overflow (and visual flash is prevented)
	 */
	prePopulateAlwaysOverflowItems() {
		this.alwaysOverflowItems.forEach(item => {
			if (!this.itemsToOverflow.includes(item)) {
				this.itemsToOverflow.push(item);
			}
		});
	}

	/**
	 * Event Handlers
	 */

	onOverflowPopoverClosed() {
		this.popoverOpen = false;
	}

	onOverflowPopoverOpened() {
		this.popoverOpen = true;
		this._restoreOverflowTabOrder();
	}

	onResize() {
		this.closeOverflow();
		this.storeItemsWidth();
		this.processOverflowLayout();
	}

	/**
	 * Private members
	 */

	attachListeners() {
		this.addEventListener("ui5-close-overflow", this._onCloseOverflow);
		this.addEventListener("focusin", this._onFocusIn);
		this.addEventListener("keydown", this._onKeyDown, true);
	}

	detachListeners() {
		this.removeEventListener("ui5-close-overflow", this._onCloseOverflow);
		this.removeEventListener("focusin", this._onFocusIn);
		this.removeEventListener("keydown", this._onKeyDown, true);
	}

	onToolbarItemChange() {
		// some items were updated reset the cache and trigger a re-render
		this.itemsToOverflow = [];
		this.contentWidth = 0; // re-render
	}

	getItemWidth(item: ToolbarItemBase): number {
		// Spacer width - always 0 for flexible spacers, so that they shrink, otherwise - measure the width normally
		if (item.ignoreSpace || item.isSeparator) {
			return 0;
		}
		const id: string = item._id;
		// Measure rendered width for spacers with width, and for normal items
		const renderedItem = this.shadowRoot!.querySelector<HTMLElement>(`#${item._individualSlot}`);

		let itemWidth = 0;

		if (renderedItem && !renderedItem.classList.contains("ui5-tb-popover-item") && renderedItem.offsetWidth && item._isRendering === false) {
			const ItemCSSStyleSet = getComputedStyle(renderedItem);
			itemWidth = renderedItem.offsetWidth + parsePxValue(ItemCSSStyleSet, "margin-inline-end")
				+ parsePxValue(ItemCSSStyleSet, "margin-inline-start");
		} else {
			itemWidth = this.getCachedItemWidth(id) || 0;
		}

		return Math.ceil(itemWidth);
	}

	getCachedItemWidth(id: string) {
		return this.ITEMS_WIDTH_MAP.get(id);
	}

	/**
	 * Keyboard Navigation
	 */

	_getFocusableItems(): Array<HTMLElement> {
		const items: Array<HTMLElement> = [];

		this.standardItems
			.filter(item => item.isInteractive && !item.hidden && !item.isOverflowed
				&& !("disabled" in item && (item as { disabled?: boolean }).disabled))
			.forEach(item => {
				const focusRef = item.getFocusDomRef();
				if (focusRef && !focusRef.hasAttribute("disabled")) {
					items.push(focusRef);
				}
			});

		const overflowRef = this.overflowButtonDOM?.getFocusDomRef();
		if (!this.hideOverflowButton && overflowRef) {
			items.push(overflowRef);
		}

		return items;
	}

	_getOverflowTabTargets(item: ToolbarItemBase): Array<HTMLElement> {
		return item._getNavigationTargets();
	}

	_storeOriginalTabIndex(target: HTMLElement) {
		if (!this._originalTabIndexes.has(target)) {
			this._originalTabIndexes.set(target, target.getAttribute("tabindex"));
		}
	}

	_refreshOriginalTabIndexes() {
		this._originalTabIndexes = new WeakMap<HTMLElement, string | null>();

		this.standardItems
			.filter(item => item.isInteractive && !item.hidden)
			.forEach(item => {
				const focusRef = item.getFocusDomRef();
				if (focusRef) {
					this._storeOriginalTabIndex(focusRef);
				}

				if (item.handlesOwnKeyboardNavigation) {
					item._getNavigationTargets().forEach(target => this._storeOriginalTabIndex(target));
				}
			});

		this.overflowItems
			.filter(item => item.isInteractive && !item.hidden)
			.forEach(item => {
				this._getOverflowTabTargets(item).forEach(target => this._storeOriginalTabIndex(target));
			});
	}

	_restoreOriginalTabIndex(target: HTMLElement) {
		const originalTabIndex = this._originalTabIndexes.get(target);

		if (originalTabIndex === undefined || originalTabIndex === null) {
			target.removeAttribute("tabindex");
			return;
		}

		target.setAttribute("tabindex", originalTabIndex);
	}

	_restoreOverflowTabOrder() {
		this.overflowItems
			.filter(item => item.isInteractive && !item.hidden)
			.forEach(item => {
				const isDisabled = "disabled" in item && !!(item as { disabled?: boolean }).disabled;
				const targets = this._getOverflowTabTargets(item);

				targets.forEach(target => {
					if (isDisabled) {
						target.tabIndex = -1;
						target.setAttribute("aria-disabled", "true");
						return;
					}

					this._restoreOriginalTabIndex(target);
					target.removeAttribute("aria-disabled");
				});
			});
	}

	_applyDisabledItemsAccessibility() {
		this.standardItems
			.filter(item => item.isInteractive && !item.hidden && !item.isOverflowed
				&& "disabled" in item && (item as { disabled?: boolean }).disabled)
			.forEach(item => {
				const focusRef = item.getFocusDomRef();
				if (focusRef) {
					this._storeOriginalTabIndex(focusRef);
					focusRef.tabIndex = -1;
					focusRef.setAttribute("aria-disabled", "true");
				}
			});
	}

	_findCurrentIndex(items: Array<HTMLElement>, e?: Event): number {
		const active = getActiveElement() as HTMLElement | null;
		if (!active) {
			if (!e) {
				return -1;
			}
			const path = e.composedPath();
			return items.findIndex(item => path.includes(item));
		}

		const activeIndex = items.findIndex(item => item === active || item.contains(active)
			|| (item.shadowRoot?.contains(active) ?? false));

		if (activeIndex !== -1) {
			return activeIndex;
		}

		if (!e) {
			return -1;
		}

		const path = e.composedPath();
		return items.findIndex(item => path.includes(item));
	}

	_findToolbarItem(focusRef: HTMLElement, active?: HTMLElement | null): ToolbarItemBase | undefined {
		return this.standardItems.find(item => {
			const ref = item.getFocusDomRef();
			const focusMatches = ref === focusRef
				|| item === focusRef
				|| item.contains(focusRef)
				|| !!(ref && (ref.contains(focusRef)
					|| focusRef.contains(ref)
					|| ref.shadowRoot?.contains(focusRef)));

			if (focusMatches) {
				return true;
			}

			if (!active) {
				return false;
			}

			return item === active
				|| item.contains(active)
				|| !!(ref && (ref === active
					|| ref.contains(active)
					|| active.contains(ref)
					|| ref.shadowRoot?.contains(active)));
		});
	}

	_applyRovingTabIndex() {
		const items = this._getNavigationChain();

		if (!items.length) {
			return;
		}

		if (!this._lastFocusedItem || !items.includes(this._lastFocusedItem)) {
			this._lastFocusedItem = items[0];
		}

		this._setCurrentItem(this._lastFocusedItem);

		this._applyDisabledItemsAccessibility();
	}

	/**
	 * For ToolbarItem groups (handlesOwnKeyboardNavigation), ensures only
	 * the active child is tabbable so Tab exits the toolbar instead of
	 * moving between children within the same group.
	 */
	_applySingleTabStopToGroups(current: HTMLElement) {
		this.standardItems
			.filter(item => item.handlesOwnKeyboardNavigation && !item.isOverflowed && !item.hidden)
			.forEach(item => {
				const targets = item._getNavigationTargets();
				if (targets.length <= 1) {
					return;
				}

				targets.forEach(target => {
					this._storeOriginalTabIndex(target);
				});

				// If this group's primary ref is not the current roving tab item,
				// all its children should be untabbable
				const primaryRef = item.getFocusDomRef();
				if (primaryRef !== current) {
					targets.forEach(t => { t.tabIndex = -1; });
					return;
				}

				// This is the active group - only the focused child should be tabbable
				const activeEl = getActiveElement() as HTMLElement | null;
				const activeTarget = activeEl
					? targets.find(t => t === activeEl || t.contains(activeEl) || !!t.shadowRoot?.contains(activeEl))
					: null;

				const focusedTarget = activeTarget || targets[0];

				targets.forEach(t => {
					t.tabIndex = t === focusedTarget ? 0 : -1;
				});
			});
	}

	_onfocusin(e: FocusEvent) {
		const currentTarget = this._findItemByPath(e.composedPath())
			|| this._findOverflowButtonByPath(e.composedPath())
			|| this._findCurrentTargetByActiveElement();

		if (currentTarget) {
			this._setCurrentItem(currentTarget);
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (isTabNext(e) || isTabPrevious(e)) {
			const moved = this._focusAdjacentToolbarOrOutside(isTabPrevious(e), e.composedPath());
			if (moved) {
				e.preventDefault();
			}
			return;
		}

		const isForward = this.effectiveDir === "rtl" ? isLeft(e) : isRight(e);
		const isBackward = this.effectiveDir === "rtl" ? isRight(e) : isLeft(e);
		const isHomeKey = isHome(e);
		const isEndKey = isEnd(e);

		if (!isForward && !isBackward && !isHomeKey && !isEndKey) {
			return;
		}

		const currentTarget = this._findItemByPath(e.composedPath())
			|| this._findOverflowButtonByPath(e.composedPath())
			|| this._findCurrentTargetByActiveElement()
			|| this._lastFocusedItem;
		if (!currentTarget) {
			return;
		}

		if (currentTarget instanceof ToolbarItemBase && (isForward || isBackward)) {
			const movementInfo = currentTarget.getToolbarMovementInfo();
			if (movementInfo) {
				const { currentIndex, itemCount } = movementInfo;
				const atForwardBoundary = itemCount <= 1 || (isForward && currentIndex >= itemCount - 1);
				const atBackwardBoundary = itemCount <= 1 || (isBackward && currentIndex <= 0);

				if (atForwardBoundary || atBackwardBoundary) {
					e.preventDefault();
					e.stopPropagation();

					if (isForward) {
						this._moveToNext();
					} else {
						this._moveToPrev();
					}
					return;
				}

				if (currentTarget.moveWithinToolbarItem(isForward)) {
					e.preventDefault();
					e.stopPropagation();
				}

				// Not at boundary -> nested control (or fallback mover) handles traversal.
				return;
			}
		}

		if (isHomeKey) {
			this._moveToFirst();
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (isEndKey) {
			this._moveToLast();
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (isForward || isBackward) {
			if (isForward) {
				this._moveToNext();
			} else {
				this._moveToPrev();
			}

			e.preventDefault();
			e.stopPropagation();
		}
	}

	_findItemByPath(path: Array<EventTarget>): ToolbarItemBase | undefined {
		return (path as HTMLElement[]).find(el => el instanceof ToolbarItemBase) as ToolbarItemBase;
	}

	_findOverflowButtonByPath(path: Array<EventTarget>): HTMLElement | undefined {
		const overflowButton = this.overflowButtonDOM as unknown as HTMLElement | null;
		if (!overflowButton) {
			return undefined;
		}

		const active = getActiveElement() as HTMLElement | null;
		return path.includes(overflowButton)
			|| !!(active && this._isNodeInsideElement(active, overflowButton))
			? overflowButton
			: undefined;
	}

	_isNodeInsideElement(node: Node, element: HTMLElement) {
		let current: Node | null = node;

		while (current) {
			if (current === element) {
				return true;
			}

			const root = current.getRootNode?.();
			if (root instanceof ShadowRoot) {
				current = root.host;
			} else {
				current = current.parentNode;
			}
		}

		return false;
	}

	_findCurrentTargetByActiveElement(): ToolbarItemBase | HTMLElement | undefined {
		const active = getActiveElement() as HTMLElement | null;
		if (!active) {
			return undefined;
		}

		const overflowButton = this.overflowButtonDOM as unknown as HTMLElement | null;
		if (overflowButton && this._isNodeInsideElement(active, overflowButton)) {
			return overflowButton;
		}

		return this._getNavigableItems().find(item => {
			const focusRef = item.getFocusDomRef();
			if (focusRef && this._isNodeInsideElement(active, focusRef)) {
				return true;
			}

			return item._getNavigationTargets().some(target => {
				return this._isNodeInsideElement(active, target);
			});
		});
	}

	_getNavigationChain() {
		const chain: Array<ToolbarItemBase | HTMLElement> = [...this._getNavigableItems()];
		const overflowButton = this.overflowButtonDOM as unknown as HTMLElement | null;

		if (!this.hideOverflowButton && overflowButton) {
			chain.push(overflowButton);
		}

		return chain;
	}

	_getNavigableItems() {
		return this.items.filter(item => (item.isToolbarNavigatable ?? true) && !item.isOverflowed);
	}

	_setCurrentItem(item: ToolbarItemBase | HTMLElement) {
		this._lastFocusedItem = item;
		const allItems = this._getNavigableItems();
		allItems.forEach(i => {
			i.setToolbarForcedTabIndex(i === item ? "0" : "-1");
		});

		const overflowButton = this.overflowButtonDOM as unknown as HTMLElement | null;
		if (overflowButton) {
			overflowButton.tabIndex = item === overflowButton ? 0 : -1;
		}
	}

	_moveToNext() {
		this._moveToItem((current, items) => (current + 1) % items.length, true);
	}

	_moveToPrev() {
		this._moveToItem((current, items) => (current === 0 ? items.length - 1 : current - 1), false);
	}

	_moveToFirst() {
		this._moveToItem(() => 0, true);
	}

	_moveToLast() {
		this._moveToItem((_, items) => items.length - 1, false);
	}

	_moveToItem(indexCalc: (currentIndex: number, items: Array<ToolbarItemBase | HTMLElement>) => number, isForward: boolean) {
		const items = this._getNavigationChain();
		if (!items.length) {
			return;
		}
		const currentIndex = this._lastFocusedItem ? items.indexOf(this._lastFocusedItem) : -1;
		const nextIndex = indexCalc(currentIndex === -1 ? 0 : currentIndex, items);
		const nextItem = items[nextIndex];
		this._setCurrentItem(nextItem);

		if (nextItem instanceof ToolbarItemBase) {
			nextItem.focusForToolbarNavigation(isForward);
		} else {
			nextItem.focus();
		}
	}

	_focusToolbarEntry() {
		const chain = this._getNavigationChain();
		if (!chain.length) {
			return false;
		}

		const target = this._lastFocusedItem && chain.includes(this._lastFocusedItem)
			? this._lastFocusedItem
			: chain[0];

		this._setCurrentItem(target);

		if (target instanceof ToolbarItemBase) {
			const targets = target._getNavigationTargets();
			const focusTarget = targets.find(item => item.tabIndex === 0)
				|| targets[0]
				|| target.getFocusDomRef();

			if (!focusTarget) {
				return false;
			}

			focusTarget.focus();
			return true;
		}

		target.focus();
		return true;
	}

	_focusAdjacentToolbarOrOutside(backward: boolean, path: Array<EventTarget>) {
		const toolbars = Array.from(document.querySelectorAll("ui5-toolbar"));
		const currentToolbarIndex = toolbars.indexOf(this);

		if (currentToolbarIndex !== -1) {
			const step = backward ? -1 : 1;

			for (let i = currentToolbarIndex + step; i >= 0 && i < toolbars.length; i += step) {
				const toolbar = toolbars[i];
				const canFocusToolbar = toolbar instanceof Toolbar
					&& toolbar !== this
					&& toolbar.isConnected
					&& toolbar.offsetParent !== null;

				if (canFocusToolbar && toolbar._focusToolbarEntry()) {
					return true;
				}
			}
		}

		return this._focusOutsideToolbar(backward, path);
	}

	_focusOutsideToolbar(backward: boolean, path: Array<EventTarget>) {
		const active = getActiveElement() as HTMLElement | null;
		const tabbables = getTabbableElements(document.body);

		if (!tabbables.length) {
			return false;
		}

		const currentIndexFromActive = active
			? tabbables.findIndex(el => el === active || el.contains(active) || active.contains(el))
			: -1;

		const currentIndexFromPath = currentIndexFromActive === -1
			? tabbables.findIndex(el => path.includes(el))
			: -1;

		const currentIndex = currentIndexFromActive !== -1 ? currentIndexFromActive : currentIndexFromPath;

		if (currentIndex !== -1) {
			const step = backward ? -1 : 1;
			for (let i = currentIndex + step; i >= 0 && i < tabbables.length; i += step) {
				const candidate = tabbables[i];
				if (!this.contains(candidate) && !this.shadowRoot?.contains(candidate)) {
					candidate.focus();
					return true;
				}
			}
		}

		const insideIndices = tabbables
			.map((el, index) => ({ el, index }))
			.filter(({ el }) => this.contains(el) || !!this.shadowRoot?.contains(el))
			.map(({ index }) => index);

		if (!insideIndices.length) {
			return false;
		}

		const firstInside = insideIndices[0];
		const lastInside = insideIndices[insideIndices.length - 1];
		const startIndex = backward ? firstInside - 1 : lastInside + 1;
		const step = backward ? -1 : 1;

		for (let i = startIndex; i >= 0 && i < tabbables.length; i += step) {
			const candidate = tabbables[i];
			if (!this.contains(candidate) && !this.shadowRoot?.contains(candidate)) {
				candidate.focus();
				return true;
			}
		}

		return false;
	}
}

Toolbar.define();

export default Toolbar;
export type {
	ToolbarMinWidthChangeEventDetail,
};
