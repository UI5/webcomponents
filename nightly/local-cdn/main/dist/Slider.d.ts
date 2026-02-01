import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import SliderBase from "./SliderBase.js";
import type SliderTooltip from "./SliderTooltip.js";
import type { SliderTooltipChangeEventDetails } from "./SliderTooltip.js";
/**
 * @class
 *
 * ### Overview
 * The Slider component represents a numerical range and a handle (grip).
 * The purpose of the component is to enable visual selection of a value in
 * a continuous numerical range by moving an adjustable handle.
 *
 * ### Structure
 * The most important properties of the Slider are:
 *
 * - min - The minimum value of the slider range.
 * - max - The maximum value of the slider range.
 * - value - The current value of the slider range.
 * - step - Determines the increments in which the slider will move.
 * - showTooltip - Determines if a tooltip should be displayed above the handle.
 * - showTickmarks - Displays a visual divider between the step values.
 * - labelInterval - Labels some or all of the tickmarks with their values.
 *
 * ### Usage
 * The most common use case is to select values on a continuous numerical scale (e.g. temperature, volume, etc. ).
 *
 * ### Responsive Behavior
 * The `ui5-slider` component adjusts to the size of its parent container by recalculating and
 * resizing the width of the control. You can move the slider handle in several different ways:
 *
 * - Drag and drop the handle to the desired value.
 * - Click/tap on the range bar to move the handle to that location.
 *
 * ### Keyboard Handling
 *
 * - `Left or Down Arrow` - Moves the handle one step to the left, effectively decreasing the component's value by `step` amount;
 * - `Right or Up Arrow` - Moves the handle one step to the right, effectively increasing the component's value by `step` amount;
 * - `Left or Down Arrow + Ctrl/Cmd` - Moves the handle to the left with step equal to 1/10th of the entire range, effectively decreasing the component's value by 1/10th of the range;
 * - `Right or Up Arrow + Ctrl/Cmd` - Moves the handle to the right with step equal to 1/10th of the entire range, effectively increasing the component's value by 1/10th of the range;
 * - `Plus` - Same as `Right or Up Arrow`;
 * - `Minus` - Same as `Left or Down Arrow`;
 * - `Home` - Moves the handle to the beginning of the range;
 * - `End` - Moves the handle to the end of the range;
 * - `Page Up` - Same as `Right or Up + Ctrl/Cmd`;
 * - `Page Down` - Same as `Left or Down + Ctrl/Cmd`;
 * - `Escape` - Resets the value property after interaction, to the position prior the component's focusing;
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Slider.js";`
 * @constructor
 * @extends SliderBase
 * @since 1.0.0-rc.11
 * @public
 * @csspart progress-container - Used to style the progress container, the horizontal bar that visually represents the range between the minimum and maximum values, of the `ui5-slider`.
 * @csspart progress-bar - Used to style the progress bar, which shows the progress of the `ui5-slider`.
 * @csspart handle - Used to style the handle of the `ui5-slider`.
 */
declare class Slider extends SliderBase implements IFormInputElement {
    /**
     * Current value of the slider
     * @default 0
     * @formEvents change input
     * @formProperty
     * @public
     */
    value: number;
    tooltipValueState: `${ValueState}`;
    tooltipValue: string;
    _valueInitial?: number;
    _valueOnInteractionStart?: number;
    _progressPercentage: number;
    _handlePositionFromStart: number;
    _lastValidInputValue: string;
    get formFormattedValue(): string;
    static i18nBundle: I18nBundle;
    constructor();
    /**
     *
     * Check if the previously saved state is outdated. That would mean
     * either it is the initial rendering or that a property has been changed
     * programmatically - because the previous state is always updated in
     * the interaction handlers.
     *
     * Normalize current properties, update the previously stored state.
     * Update the visual UI representation of the Slider.
     *
     */
    onBeforeRendering(): void;
    onAfterRendering(): void;
    syncUIAndState(): void;
    /**
     * Called when the user starts interacting with the slider
     * @private
     */
    _onmousedown(e: TouchEvent | MouseEvent): void;
    _onfocusin(): void;
    _onfocusout(e: FocusEvent): void;
    _onTooltipChange(e: CustomEvent<SliderTooltipChangeEventDetails>): void;
    _onTooltipFocusChange(): void;
    _onTooltipKeydown(e: KeyboardEvent): void;
    _onTooltipOpen(): void;
    _onTooltipInput(e: CustomEvent): void;
    /**
     * Called when the user moves the slider
     * @private
     */
    _handleMove(e: TouchEvent | MouseEvent): void;
    /** Called when the user finish interacting with the slider
     * @private
     */
    _handleUp(): void;
    _onkeyup(e: KeyboardEvent): void;
    /** Determines if the press is over the handle
     * @private
     */
    _isHandlePressed(clientX: number): boolean;
    /** Updates the UI representation of the progress bar and handle position
     * @private
     */
    _updateHandleAndProgress(newValue: number): void;
    _handleActionKeyPress(e: KeyboardEvent): void;
    _onTooltopForwardFocus(e: CustomEvent): void;
    get inputValue(): string;
    get tooltip(): SliderTooltip | null | undefined;
    get styles(): {
        progress: {
            width: string;
            border: string;
        };
        handle: {
            [x: string]: string;
        };
    };
    get _sliderHandle(): HTMLElement;
    get _ariaDisabled(): true | undefined;
    get _ariaLabelledByText(): string;
    get _ariaDescribedByInputText(): string;
    get _ariaLabelledByInputText(): string;
    get tickmarksObject(): boolean[];
}
export default Slider;
