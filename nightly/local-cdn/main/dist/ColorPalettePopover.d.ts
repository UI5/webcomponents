import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type PopoverPlacement from "./types/PopoverPlacement.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type ColorPalette from "./ColorPalette.js";
import type { ColorPaletteItemClickEventDetail, IColorPaletteItem } from "./ColorPalette.js";
import type ColorPaletteItem from "./ColorPaletteItem.js";
type ColorPalettePopoverItemClickEventDetail = ColorPaletteItemClickEventDetail;
/**
 * @class
 *
 * ### Overview
 * Represents a predefined range of colors for easier selection.
 *
 * Overview
 * The ColorPalettePopover provides the users with a slot to predefine colors.
 *
 * You can customize them with the use of the colors property. You can specify a defaultColor and display a "Default color" button for the user to choose directly.
 * You can display a "More colors..." button that opens an additional color picker for the user to choose specific colors that are not present in the predefined range.
 *
 * ### Usage
 *
 * The palette is intended for users, who don't want to check and remember the different values of the colors and spend large amount of time to configure the right color through the color picker.
 *
 * For the `ui5-color-palette-popover`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/ColorPalettePopover.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.16
 */
declare class ColorPalettePopover extends UI5Element {
    eventDetails: {
        "item-click": ColorPalettePopoverItemClickEventDetail;
        "close": void;
    };
    /**
     * Defines whether the user can see the last used colors in the bottom of the component
     * @default false
     * @public
     */
    showRecentColors: boolean;
    /**
     * Defines whether the user can choose a custom color from a component.
     *
     * @default false
     * @public
     */
    showMoreColors: boolean;
    /**
     * Defines whether the user can choose the default color from a button.
     * @default false
     * @public
     */
    showDefaultColor: boolean;
    /**
     * Defines the default color of the component.
     *
     * **Note:** The default color should be a part of the ColorPalette colors`
     * @default undefined
     * @public
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
     * Defines the open | closed state of the popover.
     * @public
     * @default false
     * @since 1.21.0
     */
    open: boolean;
    /**
     * Defines the ID or DOM Reference of the element that the popover is shown at.
     * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
     * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
     * @public
     * @default undefined
     * @since 1.21.0
     */
    opener?: HTMLElement | string | null;
    /**
     * Determines on which side the component is placed at.
     * @default "Bottom"
     * @public
     * @since 2.19.0
     */
    placement: `${PopoverPlacement}`;
    /**
     * Defines the content of the component.
     * @public
     */
    colors: DefaultSlot<IColorPaletteItem>;
    static i18nBundle: I18nBundle;
    constructor();
    get responsivePopover(): ResponsivePopover;
    get respPopover(): ResponsivePopover;
    closePopover(): void;
    onAfterClose(): void;
    onAfterOpen(): void;
    onSelectedColor(e: CustomEvent<ColorPaletteItemClickEventDetail>): void;
    get _colorPalette(): ColorPalette;
    /**
     * Returns if the component is opened.
     * @protected
     * @since 1.0.0-rc.16
     */
    isOpen(): boolean;
    get colorPaletteColors(): ColorPaletteItem[];
    get _colorPaletteTitle(): string;
    get _cancelButtonLabel(): string;
    get _open(): true | undefined;
}
export default ColorPalettePopover;
export type { ColorPalettePopoverItemClickEventDetail };
