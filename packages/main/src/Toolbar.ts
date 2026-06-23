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

import type ToolbarItemBase from "./ToolbarItemBase.js";
import type ToolbarSeparator from "./ToolbarSeparator.js";

import type Button from "./Button.js";
import type Popover from "./Popover.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

type ToolbarMinWidthChangeEventDetail = {
	minWidth: number,
};

/**
 * One step of the overflow distribution algorithm — either a single ungrouped item or
 * all members of one non-empty `overflowGroup`, treated atomically. A unit's order key
 * for the right-to-left distribution walk is the rightmost member's slot index; its
 * width is the sum of member widths.
 */
type DistributionUnit = {
	group: string,
	members: Array<ToolbarItemBase>,
	width: number,
	rightmostIndex: number,
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
 * ### Grouped Overflow
 *
 * Items that share the same non-empty `overflowGroup` string are treated as one atomic
 * unit during overflow distribution: when any member must move into the overflow
 * popover, all members move together. The visible bar always preserves slot order;
 * the group becomes adjacent only inside the popover. See the `overflowGroup` property
 * on `ToolbarItemBase` for the full contract.
 *
 * ### Keyboard Handling
 * The `ui5-toolbar` provides advanced keyboard handling.
 *
 * - The control is not interactive, but can contain of interactive elements
 * - [Tab] - iterates through elements
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
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the input.
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
	itemsToOverflow: Array<ToolbarItemBase> = [];
	itemsWidth = 0;
	minContentWidth = 0;
	// Snapshot of children's `overflowGroup` values, joined with "|". Tracks whether
	// the grouping decision has changed even when total content width has not.
	_groupingKey = "";

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
			const currentGroupingKey = this.items.map(item => item.overflowGroup).join("|");
			if (currentItemsWidth !== this.itemsWidth || currentGroupingKey !== this._groupingKey) {
				this.onToolbarItemChange();
			}
		}
	}

	onBeforeRendering() {
		this.detachListeners();
		this.attachListeners();
		if (getActiveElement() === this.overflowButtonDOM?.getFocusDomRef() && this.hideOverflowButton) {
			const lastItem = this.standardItems.filter(item => item.isInteractive).at(-1);
			lastItem?.focus();
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
		this._groupingKey = this.items.map(item => item.overflowGroup).join("|");
	}

	distributeItems(overflowSpace = 0) {
		this.itemsToOverflow = [];

		// distribute items that always overflow
		this.distributeItemsThatAlwaysOverflow();

		// Bucket movable items (in slot order) into distribution units.
		// A unit is either a single ungrouped item, or a group of items
		// sharing the same non-empty `overflowGroup`. A unit is atomic:
		// when it is pushed into overflow, all its members move together.
		// The unit's representative slot position is its rightmost member's
		// index — that index is what orders the unit during distribution.
		const units = this.buildDistributionUnits();

		// Walk units from rightmost to leftmost, pushing each atomically.
		// A unit is pushed in full as soon as overflowSpace is still positive;
		// the post-push budget is allowed to go negative — over-shoot is accepted
		// by design (ADR-0001 §Consequences) because a group is indivisible.
		const overflowedItems: Array<ToolbarItemBase> = [];
		let nextNonOverflowedUnitIndex = units.length - 1;
		for (let i = units.length - 1; i >= 0; i--) {
			if (overflowSpace <= 0) {
				nextNonOverflowedUnitIndex = i;
				break;
			}
			const unit = units[i];
			overflowedItems.push(...unit.members);
			overflowSpace -= unit.width;
			nextNonOverflowedUnitIndex = i - 1;
		}

		// If the last bar item is a separator, force it (and any contiguous
		// trailing separators) into overflow even if there is enough space.
		// Only single-member separator units are considered — pushing a
		// group's entire content (non-separator content included) because its
		// rightmost member happens to be a separator would be wrong.
		while (nextNonOverflowedUnitIndex >= 0) {
			const unit = units[nextNonOverflowedUnitIndex];
			if (unit.members.length === 1 && unit.members[0].isSeparator) {
				overflowedItems.push(...unit.members);
				nextNonOverflowedUnitIndex--;
			} else {
				break;
			}
		}

		// itemsToOverflow must be in slot order so popover rendering matches
		// the developer's source order (group members adjacent by construction).
		const slotIndex = new Map<ToolbarItemBase, number>();
		this.items.forEach((item, idx) => slotIndex.set(item, idx));
		overflowedItems.sort((a, b) => (slotIndex.get(a)! - slotIndex.get(b)!));
		this.itemsToOverflow.push(...overflowedItems);

		this.setSeperatorsVisibilityInOverflow();
	}

	/**
	 * Buckets `movableItems` (in slot order) into atomic distribution units.
	 * Each unit either holds a single ungrouped item or all members of one
	 * non-empty `overflowGroup`. A unit's order key is its rightmost member's
	 * slot index. Returned units are sorted ascending by that key.
	 */
	buildDistributionUnits(): Array<DistributionUnit> {
		const movable = this.movableItems;
		const slotIndex = new Map<ToolbarItemBase, number>();
		this.items.forEach((item, idx) => slotIndex.set(item, idx));

		const groupUnits = new Map<string, DistributionUnit>();
		const units: Array<DistributionUnit> = [];

		movable.forEach(item => {
			const itemWidth = this.getCachedItemWidth(item._id) || 0;
			const slotIdx = slotIndex.get(item)!;
			const groupKey = item.overflowGroup;
			if (groupKey === "") {
				units.push({
					group: "",
					members: [item],
					width: itemWidth,
					rightmostIndex: slotIdx,
				});
				return;
			}
			const existing = groupUnits.get(groupKey);
			if (existing) {
				existing.members.push(item);
				existing.width += itemWidth;
				if (slotIdx > existing.rightmostIndex) {
					existing.rightmostIndex = slotIdx;
				}
			} else {
				const unit: DistributionUnit = {
					group: groupKey,
					members: [item],
					width: itemWidth,
					rightmostIndex: slotIdx,
				};
				groupUnits.set(groupKey, unit);
				units.push(unit);
			}
		});

		units.sort((a, b) => a.rightmostIndex - b.rightmostIndex);
		return units;
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
	}

	detachListeners() {
		this.removeEventListener("ui5-close-overflow", this._onCloseOverflow);
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
}

Toolbar.define();

export default Toolbar;
export type {
	ToolbarMinWidthChangeEventDetail,
};
