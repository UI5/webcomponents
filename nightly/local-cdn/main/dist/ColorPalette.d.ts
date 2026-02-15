import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type ColorPaletteItem from "./ColorPaletteItem.js";
import type Button from "./Button.js";
import "./ColorPaletteItem.js";
/**
 * Interface for components that may be used inside a `ui5-color-palette` or `ui5-color-palette-popover`
 * @public
 */
interface IColorPaletteItem extends UI5Element, ITabbable {
    value?: string;
    index?: number;
    selected?: boolean;
}
type ColorPaletteNavigationItem = IColorPaletteItem | Button;
type ColorPaletteItemClickEventDetail = {
    color: string;
};
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
declare class ColorPalette extends UI5Element {
    eventDetails: {
        "item-click": ColorPaletteItemClickEventDetail;
    };
    /**
     * Defines whether the user can see the last used colors in the bottom of the component
     * @private
     * @since 1.0.0-rc.15
     */
    showRecentColors: boolean;
    /**
     * Defines whether the user can choose a custom color from a color picker
     *
     * @private
     * @since 1.0.0-rc.15
     */
    showMoreColors: boolean;
    /**
     * Defines whether the user can choose the default color from a button.
     * @default false
     * @private
     * @since 1.0.0-rc.16
     */
    showDefaultColor: boolean;
    /**
     * Defines the default color of the color palette, only valid CSS color values accepted
     *
     * **Note:** The default color should be a part of the ColorPalette colors`
     * @private
     * @since 1.0.0-rc.16
     */
    defaultColor?: string;
    /**
     * Defines the accessible name of the component.
     * @default undefined
     * @public
     * @since 2.20.0
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     * @since 2.20.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the selected color, only valid CSS color values accepted
     * @private
     */
    _selectedColor?: string;
    /**
     * Defines if the palette is in Popup or Embeded mode.
     * @private
     */
    popupMode: boolean;
    /**
     * Defines if the palette is rendered on phone.
     * @private
     */
    onPhone: boolean;
    /**

     * The showMoreColors template.
     * @private
     */
    showMoreColorsTemplate?: JsxTemplate;
    /**
     * @private
     */
    dialogOpen: boolean;
    /**
     * @private
     */
    colorPickerValue: string;
    /**
     * Defines the `ui5-color-palette-item` elements.
     * @public
     */
    colors: DefaultSlot<IColorPaletteItem>;
    _itemNavigation: ItemNavigation;
    _itemNavigationRecentColors: ItemNavigation;
    _recentColors: Array<string>;
    _currentlySelected?: ColorPaletteItem;
    _shouldFocusRecentColors: boolean;
    _defaultColorButton: Button;
    _moreColorsButton: Button;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    selectColor(item: ColorPaletteItem): void;
    _setColor(color: string): void;
    get effectiveColorItems(): IColorPaletteItem[];
    /**
     * Ensures that only one item is selected or only the last selected item remains active if more than one are explicitly set as 'selected'.
     * @private
     */
    _ensureSingleSelectionOrDeselectAll(): void;
    _onclick(e: MouseEvent): void;
    _onmousedown(e: MouseEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    handleSelection(target: ColorPaletteItem): void;
    getFocusDomRef(): HTMLElement | undefined;
    _handleDefaultColorClick(e: KeyboardEvent): void;
    _onDefaultColorKeyUp(e: KeyboardEvent): void;
    _onDefaultColorKeyDown(e: KeyboardEvent): void;
    _onMoreColorsKeyDown(e: KeyboardEvent): void;
    _onColorContainerKeyDown(e: KeyboardEvent): void;
    _onRecentColorsContainerKeyDown(e: KeyboardEvent): void;
    /**
     * Checks if the keyboard event is up/down navigation on a displayed color palette item
     * @private
     */
    _isUpOrDownNavigatableColorPaletteItem(e: KeyboardEvent): boolean;
    _isPrevious(e: KeyboardEvent): boolean;
    _isNext(e: KeyboardEvent): boolean;
    _isFirstSwatch(target: ColorPaletteItem, swatches: Array<IColorPaletteItem>): boolean;
    _isLastSwatch(target: ColorPaletteItem, swatches: Array<IColorPaletteItem>): boolean;
    /**
     * Checks if the target swatch is the first swatch in its row.
     * @private
     */
    _isFirstSwatchInRow(target: ColorPaletteItem): boolean;
    /**
     * Checks if the target swatch is the last swatch in its row.
     * @private
     */
    _isLastSwatchInRow(target: ColorPaletteItem): boolean;
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
    _isLastSwatchOfLastFullRow(target: ColorPaletteItem): boolean;
    _isSwatchInLastRow(target: ColorPaletteItem): boolean;
    /**
     * Checks if HOME/END navigation should be prevented in embedded mode.
     * In embedded mode, HOME/END keys are blocked as they only work in popup mode per design.
     * @private
     * @param e The keyboard event to check
     * @returns True if the event should be prevented, false otherwise
     */
    _shouldPreventHomeEnd(e: KeyboardEvent): boolean;
    /**
     * Helper to check if all displayed colors fit in a single row
     * @private
     */
    _isSingleRow(): boolean;
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
    _focusFirstAvailable(...candidates: Array<() => boolean>): boolean;
    /**
     * Helper to focus default color button if available
     * @private
     */
    _focusDefaultColor(): boolean;
    /**
     * Helper to focus more colors button if available
     * @private
     */
    _focusMoreColors(): boolean;
    /**
     * Helper to focus first displayed color if available
     * @private
     */
    _focusFirstDisplayedColor(): boolean;
    /**
     * Helper to focus last displayed color if available
     * @private
     */
    _focusLastDisplayedColor(): boolean;
    /**
     * Helper to focus last swatch of last full row if available
     * @private
     */
    _focusLastSwatchOfLastFullRow(): boolean;
    /**
     * Returns the index of the last swatch in the last complete row.
     * @private
     */
    _getLastCompleteRowEndIndex(total: number, rowSize: number): number;
    /**
     * Helper to focus first recent color if available
     * @private
     */
    _focusFirstRecentColor(): boolean;
    /**
     * Helper to focus last recent color if available
     * @private
     */
    _focusLastRecentColor(): boolean;
    focusColorElement(element: ColorPaletteNavigationItem, itemNavigation: ItemNavigation): void;
    onColorPickerChange(e: Event): void;
    _chooseCustomColor(): void;
    _addRecentColor(color: string): void;
    _closeDialog(): void;
    _openMoreColorsDialog(): void;
    _onDefaultColorClick(): void;
    /**
     * Returns the selected item.
     */
    get selectedItem(): ColorPaletteItem | IColorPaletteItem | undefined;
    get allColorsInPalette(): (ColorPaletteItem | IColorPaletteItem)[];
    get colorPaletteDialogTitle(): string;
    get colorPaletteDialogOKButton(): string;
    get colorPaletteCancelButton(): string;
    /**
     * Returns the selected color.
     */
    get selectedColor(): string | undefined;
    get displayedColors(): Array<IColorPaletteItem>;
    get colorContainerLabel(): string;
    get colorPaletteMoreColorsText(): string;
    get colorPaletteDefaultColorText(): string;
    get rowSize(): number;
    get hasRecentColors(): string | false;
    get recentColors(): string[];
    get recentColorsElements(): Array<ColorPaletteItem>;
    get classes(): {
        colorPaletteRoot: {
            "ui5-cp-root": boolean;
            "ui5-cp-root-phone": boolean;
        };
    };
    static ColorPaletteMoreColorsTemplate?: JsxTemplate;
}
export default ColorPalette;
export type { ColorPaletteItemClickEventDetail, IColorPaletteItem, };
