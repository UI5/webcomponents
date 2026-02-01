import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import SliderBase from "./SliderBase.js";
type AriaHandlesText = {
    startHandleText?: string;
    endHandleText?: string;
};
type AffectedValue = "startValue" | "endValue";
/**
 * @class
 *
 * ### Overview
 * Represents a numerical interval and two handles (grips) to select a sub-range within it.
 * The purpose of the component to enable visual selection of sub-ranges within a given interval.
 *
 * ### Structure
 * The most important properties of the Range Slider are:
 *
 * - min - The minimum value of the slider range.
 * - max - The maximum value of the slider range.
 * - value - The current value of the slider.
 * - step - Determines the increments in which the slider will move.
 * - showTooltip - Determines if a tooltip should be displayed above the handle.
 * - showTickmarks - Displays a visual divider between the step values.
 * - labelInterval - Labels some or all of the tickmarks with their values.
 *
 * #### Notes:
 *
 * - The right and left handle can be moved individually and their positions could therefore switch.
 * - The entire range can be moved along the interval.
 *
 * ### Usage
 * The most common use case is to select and move sub-ranges on a continuous numerical scale.
 *
 * ### Responsive Behavior
 * You can move the currently selected range by clicking on it and dragging it along the interval.
 *
 * ### Keyboard Handling
 *
 * - `Left or Down Arrow` - Moves a component's handle or the entire selection one step to the left;
 * - `Right or Up Arrow` - Moves a component's handle or the entire selection one step to the right;
 * - `Left or Down Arrow + Ctrl/Cmd` - Moves a component's handle to the left or the entire range with step equal to 1/10th of the entire range;
 * - `Right or Up Arrow + Ctrl/Cmd` - Moves a component's handle to the right or the entire range with step equal to 1/10th of the entire range;
 * - `Plus` - Same as `Right or Up Arrow`;
 * - `Minus` - Same as `Left or Down Arrow`;
 * - `Home` - Moves the entire selection or the selected handle to the beginning of the component's range;
 * - `End` - Moves the entire selection or the selected handle to the end of the component's range;
 * - `Page Up` - Same as `Right or Up Arrow + Ctrl/Cmd`;
 * - `Page Down` - Same as `Left or Down Arrow + Ctrl/Cmd`;
 * - `Escape` - Resets the `startValue` and `endValue` properties to the values prior the component focusing;
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/RangeSlider.js";`
 * @constructor
 * @extends SliderBase
 * @since 1.0.0-rc.11
 * @public
 * @csspart progress-container - Used to style the progress container, the horizontal bar that visually represents the range between the minimum and maximum values, of the `ui5-range-slider`.
 * @csspart progress-bar - Used to style the progress bar, which shows the progress of the `ui5-range-slider`.
 * @csspart handle - Used to style the handles of the `ui5-range-slider`.
 */
declare class RangeSlider extends SliderBase implements IFormInputElement {
    /**
     * Defines start point of a selection - position of a first handle on the slider.
     * @default 0
     * @formEvents change input
     * @formProperty
     * @public
     */
    set startValue(value: number);
    get startValue(): number;
    /**
     * Defines end point of a selection - position of a second handle on the slider.
     * @default 100
     * @formEvents change input
     * @formProperty
     * @public
     */
    set endValue(value: number);
    get endValue(): number;
    tooltipStartValue: string;
    tooltipEndValue: string;
    tooltipStartValueState: `${ValueState}`;
    tooltipEndValueState: `${ValueState}`;
    rangePressed: boolean;
    _isStartValueValid: boolean;
    _isEndValueValid: boolean;
    _startValue: number;
    _endValue: number;
    _startValueInitial?: number;
    _endValueInitial?: number;
    _valueAffected?: AffectedValue;
    _isPressInCurrentRange: boolean;
    _handeIsPressed: boolean;
    _initialPageXPosition?: number;
    _startValueAtBeginningOfAction?: number;
    _endValueAtBeginningOfAction?: number;
    _initialStartHandlePageX?: number;
    _firstHandlePositionFromStart?: number;
    _secondHandlePositionFromStart?: number;
    _selectedRange?: number;
    _reversedValues: boolean;
    _lastValidStartValue: string;
    _lastValidEndValue: string;
    _areInputValuesSwapped: boolean;
    static i18nBundle: I18nBundle;
    get formFormattedValue(): FormData;
    constructor();
    get _ariaDisabled(): true | undefined;
    get _ariaLabelledByText(): string;
    get _ariaHandlesText(): AriaHandlesText;
    get _ariaValueNow(): number;
    /**
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
    _onfocusin(): void;
    /**
     * Handles focus out event of the focusable components inner elements.
     * Prevent focusout when the focus is getting initially set within the slider before the
     * slider customElement itself is finished focusing.
     *
     * Prevents the focus from leaving the Range Slider when the focus is managed between
     * its inner elements in result of user interactions.
     *
     * Resets the stored Range Slider's initial values saved when it was first focused
     * @private
     */
    _onfocusout(e: FocusEvent): void;
    /**
    * Handles keyup logic. If one of the handles came across the other
    * swap the start and end values. Reset the affected value by the finished
    * user interaction.
    * @private
    */
    _onkeyup(e: KeyboardEvent): void;
    _handleActionKeyPress(e: KeyboardEvent): void;
    /**
     * Determines affected value (start/end) depending on the currently
     * active inner element within the Range Slider - used in the keyboard handling.
     * @private
     */
    _setAffectedValueByFocusedElement(): void;
    /**
     * Calculates the start and end values when the 'Home" or 'End' keys
     * are pressed on the selected range bar.
     * @private
     */
    _homeEndForSelectedRange(e: KeyboardEvent, affectedValue: string, min: number, max: number): void;
    /**
     * Update values, stored inner state and the visual UI representation of the component.
     * If no specific type of value property is passed - the range is selected - update both handles,
     * otherwise update the handle corresponding to the affected by the user interacton value prop.
     * @private
     */
    update(affectedValue: string | undefined, startValue: number | undefined, endValue: number | undefined): void;
    /**
     * Called when the user starts interacting with the slider
     * @private
     */
    _onmousedown(e: TouchEvent | MouseEvent): void;
    /**
     * Determines and saves needed values from the start of the interaction:
     *
     * Is the value calculated is within the currently selected range;
     * Initial pageX position of the start handle affected by the interaction;
     * Initial pageX value of the pressed postion;
     * Affected value property by the action;
     * @private
     */
    _saveInteractionStartData(e: TouchEvent | MouseEvent, newValue: number): void;
    /**
     * Called when the user moves the slider
     * @private
     */
    _handleMove(e: TouchEvent | MouseEvent): void;
    /**
     * Updates UI and state when dragging a single Range Slider handle
     * @private
     */
    _updateValueOnHandleDrag(event: TouchEvent | MouseEvent): void;
    /**
     * Updates UI and state when dragging of the whole selected range
     * @private
     */
    _updateValueOnRangeDrag(event: TouchEvent | MouseEvent): void;
    _handleUp(): void;
    /**
     * Determines where the press occured and which values of the Range Slider
     * handles should be updated on further interaction.
     *
     * If the press is not in the selected range or over one of the Range Slider handles
     * determines which one from the value/endValue properties has to be updated
     * after the user action (based on closest handle).
     *
     * Set flags if the press is over a handle or in the selected range,
     * in such cases no values are changed on interaction start, but could be
     * updated later when dragging.
     * @private
     */
    _pressTargetAndAffectedValue(clientX: number, value: number): void;
    /**
     * Sets the value property (start/end) that will get updated
     * by a user action depending on that user action's characteristics
     * - mouse press position - cursor coordinates relative to the start/end handles
     * - selected inner element via a keyboard navigation
     * @param affectedValue The value that will get modified by the interaction
     * @private
     */
    _setAffectedValue(affectedValue: AffectedValue | undefined): void;
    /**
     * Flag if press action is made on the currently selected range of values
     * @param isPressInCurrentRange Did the current press action occur in the current range (between the two handles)
     * @private
     */
    _setIsPressInCurrentRange(isPressInCurrentRange: boolean): void;
    /**
     * Manage the focus between the focusable inner elements within the component.
     *
     * On initial focusin or if the whole range is affected by the user interaction
     * set the focus on the progress selection, otherwise on one of the Range Slider
     * handles based on the determined affected value by the user action.
     *
     * If one of the handles came across the other one in result of a user action
     * switch the focus between them to keep it visually consistent.
     *
     * Note:
     * In some cases this function is going to get called twice on one user action.
     *
     * 1. When the focus is initially set to an inner element it is done in the very beginning,
     * of an interaction - on 'mousedown' and 'keydown' events. The focus of the host custom element
     * is still not being received, causining an immediate focusout that we prevent by
     * calling this function once again.
     *
     * 2. When the focused is manually switched from one inner element to another.
     * The focusout handler is one and the same for all focusable parts within the
     * Range Slider and when is called it checks if it should keep the focus within
     * the component and which part of it should get focused if that is the case.
     * @protected
     */
    focusInnerElement(): void;
    /**
     * Calculates startValue/endValue properties when the whole range is moved.
     *
     * Uses the change of the position of the start handle and adds the initially
     * selected range to it, to determine the whole range offset.
     * @param currentPageXPos The current horizontal position of the cursor/touch
     * @param initialStartHandlePageXPos The initial horizontal position of the start handle
     * @private
     */
    _calculateRangeOffset(currentPageXPos: number, initialStartHandlePageXPos: number): number[];
    /**
     * Computes the new value based on the difference of the current cursor location from the
     * start of the interaction.
     * @param currentPageXPos The current horizontal position of the cursor/touch
     * @param initialStartHandlePageXPos The initial horizontal position of the start handle
     * @private
     */
    _calculateStartValueByOffset(currentPageXPos: number, initialStartHandlePageXPos: number): number;
    /**
     * Updates the visual representation of the component by calculating
     * the styles of the handles and the range selection based on the new state.
     * @private
     */
    _updateHandlesAndRange(newValue: number): void;
    bringToFrontTooltip(handle: "start" | "end"): void;
    _onTooltopForwardFocus(e: CustomEvent): void;
    _onTooltipChange(e: CustomEvent): void;
    _onTooltipFocusChange(e: CustomEvent): void;
    _onTooltipOpen(): void;
    _onTooltipInput(e: CustomEvent): void;
    _onTooltipKeydown(e: KeyboardEvent): void;
    _getFormattedValue(value: string): string;
    /**
     * Swaps the start and end values of the handles if one came accros the other:
     * - If the start value is greater than the endValue swap them and their handles
     * - If the endValue become less than the start value swap them and their handles
     *
     * Switches the focus to the opposite of the currently focused handle.
     *
     * Note: Only the property values are reversed, the DOM elements of the handles
     * corresponding to them are never switched.
     * @private
     */
    _swapValues(): void;
    /**
     * Flag that we have swapped the values of the 'start' and 'end' properties,
     * to correctly switch the focus within the component from one handle to another
     * when the swapping is finished. As we only swap property values and not
     * the handle elements themselves, we must also swap their focus.
     * @private
     */
    _setValuesAreReversed(): void;
    _areValuesReversed(): boolean;
    get tickmarksObject(): boolean[];
    get _startHandle(): HTMLElement;
    get _endHandle(): HTMLElement;
    get _progressBar(): HTMLElement;
    get _ariaLabelledByStartHandleText(): string;
    get _ariaLabelledByEndHandleText(): string;
    get _ariaLabelledByInputText(): string;
    get _ariaDescribedByInputText(): string;
    get styles(): {
        progress: {
            [x: string]: string;
            width: string;
            "transform-origin": string;
        };
        startHandle: {
            [x: string]: string;
        };
        endHandle: {
            [x: string]: string;
        };
    };
}
export default RangeSlider;
