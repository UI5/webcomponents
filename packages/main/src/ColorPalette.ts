import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import {
	isSpace,
	isEnter,
	isDown,
	isRight,
	isUp,
	isLeft,
	isTabNext,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import ColorPaletteTemplate from "./ColorPaletteTemplate.js";
import type ColorPaletteItem from "./ColorPaletteItem.js";
import type Button from "./Button.js";
import type ColorPicker from "./ColorPicker.js";
import "./ColorPaletteItem.js";

import {
	COLORPALETTE_CONTAINER_LABEL,
	COLOR_PALETTE_MORE_COLORS_TEXT,
	COLOR_PALETTE_DEFAULT_COLOR_TEXT,
	COLOR_PALETTE_DIALOG_CANCEL_BUTTON,
	COLOR_PALETTE_DIALOG_OK_BUTTON,
	COLOR_PALETTE_DIALOG_TITLE,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ColorPaletteCss from "./generated/themes/ColorPalette.css.js";
import ColorPaletteDialogCss from "./generated/themes/ColorPaletteDialog.css.js";

/**
 * Interface for components that may be used inside a `ui5-color-palette` or `ui5-color-palette-popover`
 * @public
 */
interface IColorPaletteItem extends UI5Element, ITabbable {
	value?: string,
	index?: number,
	selected?: boolean,
}

type ColorPaletteNavigationItem = IColorPaletteItem | Button;

type ColorPaletteItemClickEventDetail = {
	color: string,
}

/**
 * @class
 *
 * ### Overview
 * The `ui5-color-palette` provides the users with a range of predefined colors. The colors are fixed and do not change with the theme.
 *
 * ### Usage
 *
 * The `ui5-color-palette` is meant for users that need to select a color from a predefined set.
 * To define the colors, use the `ui5-color-palette-item` component inside the default slot of the `ui5-color-palette`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ColorPalette.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.12
 * @public
 */
@customElement({
	tag: "ui5-color-palette",
	renderer: jsxRenderer,
	template: ColorPaletteTemplate,
	styles: [ColorPaletteCss, ColorPaletteDialogCss],
})

/**
 * Fired when the user selects a color.
 * @public
 * @since 1.0.0-rc.15
 * @param {string} color the selected color
 */
@event("item-click")
class ColorPalette extends UI5Element {
	eventDetails!: {
		"item-click": ColorPaletteItemClickEventDetail,
	}

	/**
	 * Defines whether the user can see the last used colors in the bottom of the component
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	showRecentColors = false;

	/**
	 * Defines whether the user can choose a custom color from a color picker
	 *
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	showMoreColors = false;

	/**
	 * Defines whether the user can choose the default color from a button.
	 * @default false
	 * @private
	 * @since 1.0.0-rc.16
	 */
	@property({ type: Boolean })
	showDefaultColor = false;

	/**
	 * Defines the default color of the color palette, only valid CSS color values accepted
	 *
	 * **Note:** The default color should be a part of the ColorPalette colors`
	 * @private
	 * @since 1.0.0-rc.16
	 */
	@property()
	defaultColor?: string;

	/**
	 * Defines the accessible name of the component.
	 * @default undefined
	 * @public
	 * @since 2.20.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 2.20.0
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the selected color, only valid CSS color values accepted
	 * @private
	 */
	@property()
	_selectedColor?: string;

	/**
	 * Defines if the palette is in Popup or Embeded mode.
	 * @private
	 */
	@property({ type: Boolean })
	popupMode = false;

	/**
	 * Defines if the palette is rendered on phone.
	 * @private
	 */
	@property({ type: Boolean })
	onPhone = false;

	/**

	 * The showMoreColors template.
	 * @private
	 */
	@property({ noAttribute: true })
	showMoreColorsTemplate?: JsxTemplate;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	dialogOpen = false;

	/**
	 * @private
	 */
	@property()
	colorPickerValue = "rgba(255,255,255,1)";

	/**
	 * Defines the `ui5-color-palette-item` elements.
	 * @public
	 */
	@slot({
		"default": true,
		type: HTMLElement,
		invalidateOnChildChange: true,
		individualSlots: true,
	})

	colors!: Array<IColorPaletteItem>;

	_itemNavigation: ItemNavigation;
	_itemNavigationRecentColors: ItemNavigation;
	_recentColors: Array<string>;
	_currentlySelected?: ColorPaletteItem;
	_shouldFocusRecentColors = false;

	@query(".ui5-cp-default-color-button")
	_defaultColorButton!: Button;

	@query(".ui5-cp-more-colors")
	_moreColorsButton!: Button;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();
		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this.displayedColors,
			rowSize: this.rowSize,
			behavior: ItemNavigationBehavior.Cyclic,
		});

		this._itemNavigationRecentColors = new ItemNavigation(this, {
			getItemsCallback: () => this.recentColorsElements,
			rowSize: this.rowSize,
			behavior: ItemNavigationBehavior.Cyclic,
		});

		this._recentColors = [];
	}

	onBeforeRendering() {
		this._ensureSingleSelectionOrDeselectAll();

		const selectedItem = this.selectedItem;

		if (selectedItem && !this.showRecentColors) {
			this._selectedColor = selectedItem.value;
		}

		this.displayedColors.forEach((item, index) => {
			item.index = index + 1;
		});

		if (this.showMoreColors) {
			// If the feature is preloaded (the user manually imported ColorPaletteMoreColors.js), the teplate is already available on the constructor
			if (ColorPalette.ColorPaletteMoreColorsTemplate) {
				this.showMoreColorsTemplate = ColorPalette.ColorPaletteMoreColorsTemplate;
			// If feature is not preloaded, load the template dynamically
			} else {
				import("./features/ColorPaletteMoreColorsTemplate.js").then(module => {
					this.showMoreColorsTemplate = module.default;
				});
			}
		}

		this.onPhone = isPhone();
	}

	onAfterRendering() {
		if (this.hasRecentColors && this._shouldFocusRecentColors) {
			if (this.selectedItem) {
				this.selectedItem.selected = false;
			}
			const firstRecentColor = this.recentColorsElements[0];
			firstRecentColor.selected = true;
			this._currentlySelected = firstRecentColor;
			this._currentlySelected.focus();
			this._shouldFocusRecentColors = false;
		}
	}

	selectColor(item: ColorPaletteItem) {
		if (!item.value) {
			return;
		}

		item.focus();

		if (this.displayedColors.includes(item)) {
			this._itemNavigation.setCurrentItem(item);
		}

		this._setColor(item.value);
	}

	_setColor(color: string) {
		this._selectedColor = color;

		if (this._recentColors[0] !== this._selectedColor) {
			if (this._recentColors.includes(this._selectedColor)) {
				this._recentColors.unshift(this._recentColors.splice(this._recentColors.indexOf(this._selectedColor), 1)[0]);
			} else {
				this._addRecentColor(this._selectedColor);
			}
		}

		this.fireDecoratorEvent("item-click", {
			color: this._selectedColor,
		});
	}

	get effectiveColorItems() {
		let colorItems = this.colors;

		if (this.popupMode) {
			colorItems = this.getSlottedNodes<ColorPaletteItem>("colors");
		}

		return colorItems;
	}

	/**
	 * Ensures that only one item is selected or only the last selected item remains active if more than one are explicitly set as 'selected'.
	 * @private
	 */
	_ensureSingleSelectionOrDeselectAll() {
		let lastSelectedItem: IColorPaletteItem;

		this.allColorsInPalette.forEach(item => {
			if (item.selected) {
				if (lastSelectedItem) {
					lastSelectedItem.selected = false;
				}
				lastSelectedItem = item;
			}
		});
	}

	_onclick(e: MouseEvent) {
		this.handleSelection(e.target as ColorPaletteItem);
	}

	_onmousedown(e: MouseEvent) {
		const target = e.target as HTMLElement;

		if (!target.hasAttribute("ui5-color-palette-item")) {
			return;
		}

		const colorItem = target as ColorPaletteItem;

		if (this.displayedColors.includes(colorItem)) {
			this._itemNavigation.setCurrentItem(colorItem);
		} else if (this.recentColorsElements.includes(colorItem)) {
			this._itemNavigationRecentColors.setCurrentItem(colorItem);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		if (isSpace(e)) {
			e.preventDefault();
			this.handleSelection(target);
		}
	}

	_onkeydown(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		if (isEnter(e)) {
			this.handleSelection(target);
		}

		if (isSpace(e)) {
			e.preventDefault();
		}
	}

	handleSelection(target: ColorPaletteItem) {
		if (!target.hasAttribute("ui5-color-palette-item") || !target.value) {
			return;
		}

		this._shouldFocusRecentColors = false;

		this.selectColor(target);

		// Handle selection for items within the 'recentColorsElements'
		if (this.recentColorsElements.includes(target)) {
			this.recentColorsElements[0].selected = true;
			this.recentColorsElements[0].focus();
			this._currentlySelected = this.recentColorsElements[0];
		} else {
			this.allColorsInPalette.forEach(item => {
				item.selected = item === target;
			});
			this._currentlySelected = target;
		}

		this._ensureSingleSelectionOrDeselectAll();
	}

	getFocusDomRef(): HTMLElement | undefined {
		return this._itemNavigation._getCurrentItem();
	}

	_handleDefaultColorClick(e: KeyboardEvent) {
		e.preventDefault();
		this._onDefaultColorClick();
	}

	_onDefaultColorKeyUp(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._handleDefaultColorClick(e);
		}
	}

	_onDefaultColorKeyDown(e: KeyboardEvent) {
		if (isTabNext(e) && this.popupMode) {
			this._handleDefaultColorClick(e);
		}

		if (isEnter(e)) {
			this._handleDefaultColorClick(e);
		}

		if (this._isNext(e)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstDisplayedColor();
		} else if (isLeft(e)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusLastRecentColor(),
				() => this._focusMoreColors(),
				() => this._focusLastDisplayedColor(),
			);
		} else if (isUp(e)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusLastRecentColor(),
				() => this._focusMoreColors(),
				() => this._focusLastSwatchOfLastFullRow(),
				() => this._focusLastDisplayedColor(),
			);
		} else if (isEnd(e)) {
			// Prevent Home/End keys from working in embedded mode - they only work in popup mode as per design
			if (this._shouldPreventHomeEnd(e)) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusMoreColors(),
				() => this._focusLastDisplayedColor(),
			);
		}
	}

	_onMoreColorsKeyDown(e: KeyboardEvent) {
		if (isLeft(e)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusLastDisplayedColor();
		} else if (isUp(e)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusLastSwatchOfLastFullRow(),
				() => this._focusLastDisplayedColor(),
			);
		} else if (this._isNext(e)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusFirstRecentColor(),
				() => this._focusDefaultColor(),
				() => this._focusFirstDisplayedColor(),
			);
		} else if (isHome(e)) {
			// Prevent Home/End keys from working in embedded mode - they only work in popup mode as per design
			if (this._shouldPreventHomeEnd(e)) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusDefaultColor(),
				() => this._focusFirstDisplayedColor(),
			);
		} else if (isEnd(e)) {
			// Prevent Home/End keys from working in embedded mode - they only work in popup mode as per design
			if (this._shouldPreventHomeEnd(e)) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			// More Colors button is typically the last element, so END key stays here
			e.preventDefault();
			e.stopPropagation();
		}
	}

	_onColorContainerKeyDown(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		const isLastSwatchInSingleRow = this._isSingleRow() && this._isLastSwatch(target, this.displayedColors);

		// Prevent Home/End keys from working in embedded mode - they only work in popup mode as per design
		if (this._shouldPreventHomeEnd(e)) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (this._isUpOrDownNavigatableColorPaletteItem(e)) {
			this._currentlySelected = undefined;
		}

		if (isTabNext(e) && this.popupMode) {
			e.preventDefault();
			this.selectColor(target);
		}

		if (this._isPrevious(e) && this._isFirstSwatch(target, this.displayedColors)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusDefaultColor(),
				() => this._focusLastRecentColor(),
				() => this._focusMoreColors(),
				() => this._focusLastSwatchOfLastFullRow(),
				() => this._focusLastDisplayedColor(),
			);
		} else if ((isRight(e) && this._isLastSwatch(target, this.displayedColors))
			|| (isDown(e) && (this._isLastSwatchOfLastFullRow(target) || isLastSwatchInSingleRow))
		) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusMoreColors(),
				() => this._focusFirstRecentColor(),
				() => this._focusDefaultColor(),
				() => this._focusFirstDisplayedColor(),
			);
		} else if (isHome(e) && this._isFirstSwatchInRow(target)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusDefaultColor(),
				() => this._focusMoreColors(),
				() => this._focusFirstDisplayedColor(),
			);
		} else if (isEnd(e) && this._isLastSwatchInRow(target)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusMoreColors(),
				() => this._focusDefaultColor(),
				() => this._focusLastDisplayedColor(),
			);
		} else if (isEnd(e) && this._isSwatchInLastRow(target)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusLastDisplayedColor();
		}
	}

	_onRecentColorsContainerKeyDown(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;

		// Prevent Home/End keys from working in embedded mode - they only work in popup mode as per design
		if (this._shouldPreventHomeEnd(e)) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (this._isUpOrDownNavigatableColorPaletteItem(e)) {
			this._currentlySelected = undefined;
		}

		if (this._isNext(e) && this._isLastSwatch(target, this.recentColorsElements)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusDefaultColor(),
				() => this._focusMoreColors(),
				() => this._focusFirstDisplayedColor(),
			);
		} else if (this._isPrevious(e) && this._isFirstSwatch(target, this.recentColorsElements)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirstAvailable(
				() => this._focusMoreColors(),
				() => this._focusLastSwatchOfLastFullRow(),
				() => this._focusLastDisplayedColor(),
				() => this._focusDefaultColor(),
			);
		} else if (isEnd(e)) {
			e.preventDefault();
			e.stopPropagation();
			this._focusLastRecentColor();
		}
	}

	/**
	 * Checks if the keyboard event is up/down navigation on a displayed color palette item
	 * @private
	 */
	_isUpOrDownNavigatableColorPaletteItem(e: KeyboardEvent): boolean {
		if (!(isUp(e) || isDown(e)) || !this._currentlySelected) {
			return false;
		}

		return this.displayedColors.includes(this._currentlySelected)
			|| this.recentColorsElements.includes(this._currentlySelected);
	}

	_isPrevious(e: KeyboardEvent): boolean {
		return isUp(e) || isLeft(e);
	}

	_isNext(e: KeyboardEvent): boolean {
		return isDown(e) || isRight(e);
	}

	_isFirstSwatch(target: ColorPaletteItem, swatches: Array<IColorPaletteItem>): boolean {
		return swatches && Boolean(swatches.length) && swatches[0] === target;
	}

	_isLastSwatch(target: ColorPaletteItem, swatches: Array<IColorPaletteItem>): boolean {
		return swatches && Boolean(swatches.length) && swatches[swatches.length - 1] === target;
	}

	/**
	 * Checks if the target swatch is the first swatch in its row.
	 * @private
	 */
	_isFirstSwatchInRow(target: ColorPaletteItem): boolean {
		const index = this.displayedColors.indexOf(target);
		return index >= 0 ? index % this.rowSize === 0 : false;
	}

	/**
	 * Checks if the target swatch is the last swatch in its row.
	 * @private
	 */
	_isLastSwatchInRow(target: ColorPaletteItem): boolean {
		const index = this.displayedColors.indexOf(target);
		return index >= 0 ? (index + 1) % this.rowSize === 0 || index === this.displayedColors.length - 1 : false;
	}

	/**
	 * Checks if the given color swatch is the last swatch of the last full row.
	 *
	 * Example 1: 12 colors with rowSize 5
	 * Row 1: [0, 1, 2, 3, 4]  ← Complete row
	 * Row 2: [5, 6, 7, 8, 9]  ← Complete row (last complete row)
	 * Row 3: [10, 11]         ← Incomplete row
	 *
	 * @param target The color swatch to check.
	 * @returns True if the swatch is the last of the last full row, false otherwise.
	 */
	_isLastSwatchOfLastFullRow(target: ColorPaletteItem): boolean {
		const index = this.displayedColors.indexOf(target);
		const rowSize = this.rowSize;
		const total = this.displayedColors.length;
		const lastCompleteRowEndIndex = this._getLastCompleteRowEndIndex(total, rowSize);
		return index >= 0 && index === lastCompleteRowEndIndex;
	}

	_isSwatchInLastRow(target: ColorPaletteItem): boolean {
		const index = this.displayedColors.indexOf(target);
		const lastRowSwatchesCount = this.displayedColors.length % this.rowSize;
		return index >= 0 && index >= this.displayedColors.length - lastRowSwatchesCount;
	}

	/**
	 * Checks if HOME/END navigation should be prevented in embedded mode.
	 * In embedded mode, HOME/END keys are blocked as they only work in popup mode per design.
	 * @private
	 * @param e The keyboard event to check
	 * @returns True if the event should be prevented, false otherwise
	 */
	_shouldPreventHomeEnd(e: KeyboardEvent): boolean {
		return !this.popupMode && (isHome(e) || isEnd(e));
	}

	/**
	 * Helper to check if all displayed colors fit in a single row
	 * @private
	 */
	_isSingleRow(): boolean {
		return this.displayedColors.length <= this.rowSize;
	}

	/**
	 * Helper to focus the first available element from a list of candidates.
	 *
	 * This method implements a fallback chain pattern for keyboard navigation in the color palette.
	 * It attempts to execute focus actions in priority order, stopping at the first successful one.
	 *
	 * For example when navigating left from the default color button, try these options in order:
	 * this._focusFirstAvailable(
	 *   () => this._focusLastRecentColor(),    // 1st choice: focus last recent color if available
	 *   () => this._focusMoreColors(),         // 2nd choice: focus "More Colors" button if available
	 *   () => this._focusLastDisplayedColor()  // 3rd choice: focus last color in the main palette
	 * );
	 *
	 * @private
	 * @param candidates - Functions that attempt to focus an element. Each function should return true if focus was successful, false otherwise.
	 * @returns True if any candidate successfully focused an element, false if all failed.
	 */
	_focusFirstAvailable(...candidates: Array<() => boolean>): boolean {
		return candidates.some(focusAction => focusAction());
	}

	/**
	 * Helper to focus default color button if available
	 * @private
	 */
	_focusDefaultColor(): boolean {
		if (this.showDefaultColor && this._defaultColorButton) {
			this._defaultColorButton.focus();
			return true;
		}
		return false;
	}

	/**
	 * Helper to focus more colors button if available
	 * @private
	 */
	_focusMoreColors(): boolean {
		if (this.showMoreColors && this._moreColorsButton) {
			this._moreColorsButton.focus();
			return true;
		}
		return false;
	}

	/**
	 * Helper to focus first displayed color if available
	 * @private
	 */
	_focusFirstDisplayedColor(): boolean {
		if (this.displayedColors.length) {
			this.focusColorElement(this.displayedColors[0], this._itemNavigation);
			return true;
		}
		return false;
	}

	/**
	 * Helper to focus last displayed color if available
	 * @private
	 */
	_focusLastDisplayedColor(): boolean {
		if (this.displayedColors.length) {
			this.focusColorElement(this.displayedColors[this.displayedColors.length - 1], this._itemNavigation);
			return true;
		}
		return false;
	}

	/**
	 * Helper to focus last swatch of last full row if available
	 * @private
	 */
	_focusLastSwatchOfLastFullRow(): boolean {
		const rowSize = this.rowSize;
		const total = this.displayedColors.length;
		const lastCompleteRowEndIndex = this._getLastCompleteRowEndIndex(total, rowSize);

		// Return false if there are no full rows (less than one complete row)
		if (lastCompleteRowEndIndex < 0 || !this.displayedColors[lastCompleteRowEndIndex]) {
			return false;
		}

		this.focusColorElement(this.displayedColors[lastCompleteRowEndIndex], this._itemNavigation);
		return true;
	}

	/**
	 * Returns the index of the last swatch in the last complete row.
	 * @private
	 */
	_getLastCompleteRowEndIndex(total: number, rowSize: number): number {
		return Math.floor(total / rowSize) * rowSize - 1;
	}

	/**
	 * Helper to focus first recent color if available
	 * @private
	 */
	_focusFirstRecentColor(): boolean {
		if (this.hasRecentColors && this.recentColorsElements.length) {
			this.focusColorElement(this.recentColorsElements[0], this._itemNavigationRecentColors);
			return true;
		}
		return false;
	}

	/**
	 * Helper to focus last recent color if available
	 * @private
	 */
	_focusLastRecentColor(): boolean {
		if (this.hasRecentColors && this.recentColorsElements.length) {
			this.focusColorElement(this.recentColorsElements[this.recentColorsElements.length - 1], this._itemNavigationRecentColors);
			return true;
		}
		return false;
	}

	focusColorElement(element: ColorPaletteNavigationItem, itemNavigation: ItemNavigation) {
		itemNavigation.setCurrentItem(element);
		itemNavigation._focusCurrentItem();
	}

	onColorPickerChange(e: Event) {
		this.colorPickerValue = (e.target as ColorPicker).value;
	}

	_chooseCustomColor() {
		this._setColor(this.colorPickerValue);
		this._closeDialog();
		this._shouldFocusRecentColors = true;
	}

	_addRecentColor(color: string) {
		if (this.showRecentColors && !this._recentColors.includes(color)) {
			this._recentColors.unshift(color);
			if (this._recentColors.length > this.rowSize) {
				this._recentColors.pop();
			}
		}
	}

	_closeDialog() {
		this.dialogOpen = false;
	}

	_openMoreColorsDialog() {
		const value = this._currentlySelected ? this._currentlySelected.value : undefined;

		if (value) {
			this.colorPickerValue = value;
		}
		this.dialogOpen = true;
	}

	_onDefaultColorClick() {
		if (this.defaultColor) {
			this._setColor(this.defaultColor);
			this._addRecentColor(this.defaultColor);

			if (this.selectedItem) {
				this.selectedItem.selected = false;
				this._currentlySelected = undefined;
			}
		}
	}

	/**
	 * Returns the selected item.
	 */
	get selectedItem() {
		return this.allColorsInPalette.find(item => item.selected);
	}

	get allColorsInPalette() {
		return [...this.effectiveColorItems, ...this.recentColorsElements];
	}

	get colorPaletteDialogTitle() {
		return ColorPalette.i18nBundle.getText(COLOR_PALETTE_DIALOG_TITLE);
	}

	get colorPaletteDialogOKButton() {
		return ColorPalette.i18nBundle.getText(COLOR_PALETTE_DIALOG_OK_BUTTON);
	}

	get colorPaletteCancelButton() {
		return ColorPalette.i18nBundle.getText(COLOR_PALETTE_DIALOG_CANCEL_BUTTON);
	}

	/**
	 * Returns the selected color.
	 */
	get selectedColor() {
		return this._selectedColor;
	}

	get displayedColors(): Array<IColorPaletteItem> {
		const colors = this.getSlottedNodes<IColorPaletteItem>("colors");
		return colors.filter(item => item.value).slice(0, 15);
	}

	get colorContainerLabel() {
		const effectiveLabel = getEffectiveAriaLabelText(this);
		return effectiveLabel
			? `${ColorPalette.i18nBundle.getText(COLORPALETTE_CONTAINER_LABEL)} ${effectiveLabel}`
			: ColorPalette.i18nBundle.getText(COLORPALETTE_CONTAINER_LABEL);
	}

	get colorPaletteMoreColorsText() {
		return ColorPalette.i18nBundle.getText(COLOR_PALETTE_MORE_COLORS_TEXT);
	}

	get colorPaletteDefaultColorText() {
		return ColorPalette.i18nBundle.getText(COLOR_PALETTE_DEFAULT_COLOR_TEXT);
	}

	get rowSize() {
		return 5;
	}

	get hasRecentColors() {
		return this.showRecentColors && this.recentColors[0];
	}

	get recentColors() {
		if (this._recentColors.length > this.rowSize) {
			this._recentColors = this._recentColors.slice(0, this.rowSize);
		}

		while (this._recentColors.length < this.rowSize) {
			this._recentColors.push("");
		}

		return this._recentColors;
	}

	get recentColorsElements(): Array<ColorPaletteItem> {
		const domRef = this.getDomRef();
		if (domRef) {
			return Array.from(domRef.querySelectorAll<ColorPaletteItem>(".ui5-cp-recent-colors-wrapper [ui5-color-palette-item]")).filter(x => x.value !== "");
		}

		return [];
	}

	get classes() {
		// Remove after deleting the hbs template, it's added in the jsx template
		return {
			colorPaletteRoot: {
				"ui5-cp-root": true,
				"ui5-cp-root-phone": isPhone(),
			},
		};
	}

	static ColorPaletteMoreColorsTemplate?: JsxTemplate;
}

ColorPalette.define();

export default ColorPalette;
export type {
	ColorPaletteItemClickEventDetail,
	IColorPaletteItem,
};
