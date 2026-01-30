import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import {
	isDown,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import CalendarLegendTemplate from "./CalendarLegendTemplate.js";
import "./CalendarLegendItem.js";
import type CalendarLegendItem from "./CalendarLegendItem.js";
import { CAL_LEGEND_ROLE_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";

// Styles
import CalendarLegendCss from "./generated/themes/CalendarLegend.css.js";

type CalendarLegendItemSelectionChangeEventDetail = {
	item: CalendarLegendItem;
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-calendar-legend` component is designed for use within the `ui5-calendar` to display a legend.
 * Each `ui5-calendar-legend-item` represents a unique date type, specifying its visual style
 * and a corresponding textual label.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CalendarLegend.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.23.0
 */
@customElement({
	tag: "ui5-calendar-legend",
	renderer: jsxRenderer,
	styles: CalendarLegendCss,
	template: CalendarLegendTemplate,
})
@event("calendar-legend-selection-change", {
	bubbles: true,
})
@event("calendar-legend-focus-out", {
	bubbles: true,
})
class CalendarLegend extends UI5Element {
	eventDetails!: {
		"calendar-legend-selection-change": CalendarLegendItemSelectionChangeEventDetail,
		"calendar-legend-focus-out": void,
	};

	/**
	 * Hides the Today item in the legend.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideToday = false;

	/**
	 * Hides the Selected day item in the legend.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideSelectedDay = false;

	/**
	 * Hides the Non-Working day item in the legend.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideNonWorkingDay = false;

	/**
	 * Hides the Working day item in the legend.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideWorkingDay = false;

	/**
	 * Defines the items of the component.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: true,
		individualSlots: true,
		"default": true,
	 })
	items!: DefaultSlot<CalendarLegendItem[]>;

	_itemNavigation!: ItemNavigation;
	_lastFocusedItemIndex: number | null;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._lastFocusedItemIndex = null;
	}

	onAfterRendering(): void {
		if (!this._itemNavigation) {
			this._itemNavigation = new ItemNavigation(this, {
				navigationMode: NavigationMode.Horizontal,
				behavior: ItemNavigationBehavior.Static,
				getItemsCallback: () => this.focusableElements,
			});

			const focusableItemIndex = this._lastFocusedItemIndex !== null ? this._lastFocusedItemIndex : 0;
			this._itemNavigation.setCurrentItem(this.focusableElements[focusableItemIndex]);
		}
	}

	getFocusDomRef(): HTMLElement | undefined {
		return this._itemNavigation._getCurrentItem();
	}

	_onMouseDown(e: MouseEvent) {
		e.stopPropagation();
		const target = e.target as CalendarLegendItem;

		this._itemNavigation.setCurrentItem(target);
		this._itemNavigation._focusCurrentItem();
		this._lastFocusedItemIndex = this.focusableElements.indexOf(target);
	}

	_onFocusIn(e: FocusEvent) {
		const target = e.target as CalendarLegendItem;

		this.fireDecoratorEvent("calendar-legend-selection-change", {
			item: target,
		});
		this._lastFocusedItemIndex = this.focusableElements.indexOf(target);
	}

	_onFocusOut() {
		this.fireDecoratorEvent("calendar-legend-focus-out");
	}

	_onItemKeyDown(e: KeyboardEvent) {
		const items = this.focusableElements;
		const itemsCount = items.length;
		const currentItem = e.target as CalendarLegendItem;
		const currentIndex = items.indexOf(currentItem);

		if (isDown(e)) {
			e.preventDefault();
			const nextIndex = currentIndex + 1;

			if (nextIndex < itemsCount) {
				this._itemNavigation.setCurrentItem(items[nextIndex]);
				this._itemNavigation._focusCurrentItem();
				this._lastFocusedItemIndex = nextIndex;
			}
		}

		if (isUp(e)) {
			e.preventDefault();
			const nextIndex = currentIndex - 1;

			if (nextIndex >= 0) {
				this._itemNavigation.setCurrentItem(items[nextIndex]);
				this._itemNavigation._focusCurrentItem();
				this._lastFocusedItemIndex = nextIndex;
			}
		}
	}

	get focusableElements() {
		const allFocusableItems = [...this.shadowRoot!.querySelectorAll<CalendarLegendItem>("[ui5-calendar-legend-item]"), ...this.legendItems];
		return allFocusableItems;
	}

	get legendItems() {
		const items = this.getSlottedNodes<CalendarLegendItem>("items");
		return items.filter(item => item.hasAttribute("ui5-calendar-legend-item"));
	}

	get defaultItemsMapping() {
		const typeMapping = [
			{ type: CalendarLegendItemType.Today, hide: this.hideToday },
			{ type: CalendarLegendItemType.Selected, hide: this.hideSelectedDay },
			{ type: CalendarLegendItemType.Working, hide: this.hideWorkingDay },
			{ type: CalendarLegendItemType.NonWorking, hide: this.hideNonWorkingDay },
		];

		return typeMapping;
	}

	get _roleDescription() {
		return CalendarLegend.i18nBundle.getText(CAL_LEGEND_ROLE_DESCRIPTION);
	}
}

CalendarLegend.define();

export default CalendarLegend;
export type {
	CalendarLegendItemSelectionChangeEventDetail,
};
