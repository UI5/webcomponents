import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import TimePickerInternals from "./TimePickerInternals.js";
import type Input from "./Input.js";
import InputType from "./types/InputType.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-time-selection-inputs` displays a popover with `ui5-input` components of type="number" and an
 * optional a AM/PM `ui5-segmented-button` according to the display format given to the `ui5-time-picker`.
 * Using of numeric input components enables display of mobile devices' native numeric keyboard, which speeds up entering of the time.
 * The popup appears only on mobile devices when there is a tap on the `ui5-time-picker` input.
 *
 * This component should not be used separately.
 * @constructor
 * @extends TimePickerInternals
 * @abstract
 * @since 1.18.0
 * @private
 */
declare class TimeSelectionInputs extends TimePickerInternals {
    eventDetails: TimePickerInternals["eventDetails"] & {
        "close-inputs": void;
    };
    _editedInput: number;
    _editedInputValue?: string;
    get enterHoursLabel(): string;
    get enterMinutesLabel(): string;
    get enterSecondsLabel(): string;
    get _numberType(): InputType;
    get _isHoursInput(): boolean;
    get _is24HoursFormat(): boolean | undefined;
    onBeforeRendering(): void;
    _addNumericAttributes(): void;
    /**
     * Returns Input component by index or name.
     * @param indexOrName the index or name of the component
     * @returns component (if exists) or undefined
     */
    _inputComponent(indexOrName: number | string): Input | undefined | null;
    /**
     * Returns the inner input element DOM reference.
     * @param input the Input component
     * @returns inner input element
     */
    _innerInput(input: Input): HTMLInputElement | null;
    /**
     * Creates clock and button components according to the display format pattern.
     */
    _createComponents(): void;
    /**
     * Switches to the specific input.
     * @param index the index (in _entities array) of the input
     * @private
     */
    _switchInput(index: number): void;
    /**
     * Switches to the next input that can de focused.
     * @param wrapAround whether to start with first clock after reaching the last one, or not
     * @private
     */
    _switchNextInput(wrapAround?: boolean): void;
    /**
     * Return a value as string, formatted and prepended with zero if necessary.
     * @param num A number to format
     * @param prependZero Whether to prepend with zero or not
     * @returns Formatted value
     * @private
     */
    _formatNumberToString(num: number, prependZero: boolean): string;
    _onkeydown(evt: KeyboardEvent): void;
    /**
     * Input 'change' event handler.
     * @param value new value to set on active input
     */
    _inputChange(value: number): void;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(): void;
    _oninput(): void;
}
export default TimeSelectionInputs;
