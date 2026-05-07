import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type { ColorRGB } from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
import "@ui5/webcomponents-icons/dist/expand.js";
import ColorValue from "./colorpicker-utils/ColorValue.js";
import type Input from "./Input.js";
import type Slider from "./Slider.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base/dist/index.js";
type ColorCoordinates = {
    x: number;
    y: number;
};
type ColorChannelInput = {
    id: string;
    value: number;
    accessibleName: string;
    label: string;
    showPercentSymbol?: boolean;
};
/**
 * @class
 *
 * ### Overview
 * The `ui5-color-picker` allows users to choose any color and provides different input options for selecting colors.
 *
 * ### Usage
 *
 * #### When to use
 * Use the color picker if:
 *
 * -  users need to select any color freely.
 *
 * #### When not to use
 *
 * -  Users need to select one color from a predefined set of colors. Use the ColorPalette component instead.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ColorPicker.js";`
 * @constructor
 * @since 1.0.0-rc.12
 * @extends UI5Element
 * @public
 */
declare class ColorPicker extends UI5Element implements IFormInputElement {
    eventDetails: {
        change: void;
    };
    /**
     * Defines the currently selected color of the component.
     *
     * **Note**: use HEX, RGB, RGBA, HSV formats or a CSS color name when modifying this property.
     * @default "rgba(255,255,255,1)"
     * @public
     */
    value: string;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default undefined
     * @public
     * @since 2.0.0
     */
    name?: string;
    /**
     * When set to `true`, the alpha slider and inputs for RGB values will not be displayed.
     * @default false
     * @public
     * @since 2.5.0
     */
    simplified: boolean;
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
     * Defines the current main color which is selected via the hue slider and is shown in the main color square.
     * @private
     */
    _mainValue: ColorRGB;
    /**
     * Defines the currenty selected color.
     * @private
     */
    _colorValue: ColorValue;
    /**
     * @private
     */
    _selectedCoordinates: ColorCoordinates;
    /**
     * @private
     */
    _alpha: number;
    /**
     * this is the alpha value in the input only while editing, since it can container invalid/empty values temporarily
     * @private
     */
    _alphaTemp?: string;
    /**
     * @private
     */
    _hue: number;
    /**
     * @private
     */
    _isSelectedColorChanged: boolean;
    /**
     * @private
     */
    _isHueValueChanged: boolean;
    /**
     * @private
     */
    _wrongHEX: boolean;
    /**
     * @private
     */
    _displayHSL: boolean;
    selectedHue: number;
    mouseDown: boolean;
    mouseIn: boolean;
    static i18nBundle: I18nBundle;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): string;
    constructor();
    onBeforeRendering(): void;
    _handleMouseDown(e: MouseEvent): void;
    _handleMouseUp(): void;
    _handleMouseOut(e: MouseEvent): void;
    _handleMouseMove(e: MouseEvent): void;
    _handleAlphaInput(e: UI5CustomEvent<Input, "input"> | UI5CustomEvent<Slider, "input">): void;
    _handleHueInput(e: CustomEvent): void;
    _handleHEXChange(e: CustomEvent | KeyboardEvent): void;
    _togglePickerMode(): void;
    _handleColorInputChange(e: Event): void;
    _setMainColor(hueValue: number): void;
    _handleAlphaChange(): void;
    _changeSelectedColor(x: number, y: number): void;
    _onkeydown(e: KeyboardEvent): void;
    _calculateColorFromCoordinates(x: number, y: number): {
        h: number;
        s: number;
        l: number;
    } | undefined;
    _setValue(color: string): void;
    _updateColorGrid(): void;
    _isColorValueEqual(value: ColorRGB): boolean;
    get colorPickerLabel(): string;
    get sliderGroupLabel(): string;
    get hueSliderLabel(): string;
    get alphaSliderLabel(): string;
    get hexInputLabel(): string;
    get redInputLabel(): string;
    get greenInputLabel(): string;
    get blueInputLabel(): string;
    get hueInputLabel(): string;
    get saturationInputLabel(): string;
    get lightInputLabel(): string;
    get alphaInputLabel(): string;
    get percentageLabel(): string;
    get colorFieldsAnnouncementText(): string;
    get toggleModeTooltip(): string;
    get inputsDisabled(): true | undefined;
    get hexInputErrorState(): `${ValueState}`;
    get rgbInputs(): Array<ColorChannelInput>;
    get hslInputs(): Array<ColorChannelInput>;
    get HEX(): string;
    get colorChannelInputs(): ColorChannelInput[];
    get _isDefaultPickerMode(): boolean;
}
export default ColorPicker;
