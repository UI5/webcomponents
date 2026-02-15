import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import "@ui5/webcomponents-icons/dist/less.js";
import "@ui5/webcomponents-icons/dist/add.js";
import type Input from "./Input.js";
import type { InputAccInfo, InputEventDetail } from "./Input.js";
import InputType from "./types/InputType.js";
import NumberFormat from "@ui5/webcomponents-localization/dist/NumberFormat.js";
type StepInputValueStateChangeEventDetail = {
    valueState: `${ValueState}`;
    valid: boolean;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-step-input` consists of an input field and buttons with icons to increase/decrease the value
 * with the predefined step.
 *
 * The user can change the value of the component by pressing the increase/decrease buttons,
 * by typing a number directly, by using the keyboard up/down and page up/down,
 * or by using the mouse scroll wheel. Decimal values are supported.
 *
 * ### Usage
 *
 * The default step is 1 but the app developer can set a different one.
 *
 * App developers can set a maximum and minimum value for the `StepInput`.
 * The increase/decrease button and the up/down keyboard navigation become disabled when
 * the value reaches the max/min or a new value is entered from the input which is greater/less than the max/min.
 *
 * #### When to use:
 *
 * - To adjust amounts, quantities, or other values quickly.
 * - To adjust values for a specific step.
 *
 * #### When not to use:
 *
 * - To enter a static number (for example, postal code, phone number, or ID). In this case,
 * use the regular `ui5-input` instead.
 * - To display a value that rarely needs to be adjusted and does not pertain to a particular step.
 * In this case, use the regular `ui5-input` instead.
 * - To enter dates and times. In this case, use date/time related components instead.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/StepInput.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.13
 * @public
 */
declare class StepInput extends UI5Element implements IFormInputElement {
    eventDetails: {
        change: void;
        input: InputEventDetail;
        "value-state-change": StepInputValueStateChangeEventDetail;
    };
    /**
     * Defines a value of the component.
     * @default 0
     * @public
     */
    value: number;
    /**
     * Defines a minimum value of the component.
     * @default undefined
     * @public
     */
    min?: number;
    /**
     * Defines a maximum value of the component.
     * @default undefined
     * @public
     */
    max?: number;
    /**
     * Defines a step of increasing/decreasing the value of the component.
     * @default 1
     * @public
     */
    step: number;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component is required.
     * @default false
     * @public
     */
    required: boolean;
    /**
     * Determines whether the component is displayed as disabled.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Determines whether the component is displayed as read-only.
     * @default false
     * @public
     */
    readonly: boolean;
    /**
     * Defines a short hint, intended to aid the user with data entry when the
     * component has no value.
     *
     * **Note:** When no placeholder is set, the format pattern is displayed as a placeholder.
     * Passing an empty string as the value of this property will make the component appear empty - without placeholder or format pattern.
     * @default undefined
     * @public
     */
    placeholder?: string;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Determines the number of digits after the decimal point of the component.
     * @default 0
     * @public
     */
    valuePrecision: number;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef?: string;
    _decIconDisabled: boolean;
    _incIconDisabled: boolean;
    focused: boolean;
    _inputFocused: boolean;
    _previousValue: number | undefined;
    _waitTimeout: number;
    _speed: number;
    _btnDown?: boolean;
    _spinTimeoutId?: Timeout;
    _spinStarted: boolean;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the component is in `Information`, `Critical` or `Negative` value state.
     * @public
     */
    valueStateMessage: Slot<HTMLElement>;
    _initialValueState?: `${ValueState}`;
    _formatter?: NumberFormat;
    _languageChangeHandler?: (lang: string) => Promise<void>;
    _languageChanged?: boolean;
    static i18nBundle: I18nBundle;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    get formFormattedValue(): FormData | string | null;
    get type(): InputType;
    get decIconTitle(): string;
    get incIconTitle(): string;
    get _decIconClickable(): boolean;
    get _incIconClickable(): boolean;
    get _isFocused(): boolean;
    get _displayValue(): string;
    get accInfo(): InputAccInfo;
    get inputAttributes(): {
        min: number | undefined;
        max: number | undefined;
        step: number;
    };
    onBeforeRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _setupLanguageChangeHandler(): void;
    _cleanupLanguageChangeHandler(): void;
    get formatter(): NumberFormat;
    get input(): Input;
    get innerInput(): HTMLInputElement;
    get inputOuter(): Element;
    _onButtonFocusOut(): void;
    _onInput(e: CustomEvent<InputEventDetail>): void;
    _onInputFocusIn(): void;
    _onInputFocusOut(): void;
    _onMouseWheel(e: WheelEvent): void;
    _setButtonState(): void;
    _validate(): void;
    _updateValueState(): void;
    _preciseValue(value: number): number;
    _fireChangeEvent(): void;
    /**
     * Value modifier - modifies the value of the component, validates the new value and enables/disables increment and
     * decrement buttons according to the value and min/max values (if set). Fires `change` event when requested
     * @private
     * @param modifier modifies the value of the component with the given modifier (positive or negative)
     * @param fireChangeEvent if `true`, fires `change` event when the value is changed
     */
    _modifyValue(modifier: number, fireChangeEvent?: boolean): void;
    /**
     * Formats a number with thousands separator based on current locale
     * @private
     */
    _formatNumber(value: number): string;
    /**
     * Parses formatted number string back to numeric value
     * @private
    */
    _parseNumber(formattedValue: string): number;
    _incValue(): void;
    _decValue(): void;
    get _isValueWithCorrectPrecision(): boolean;
    _onInputChange(): void;
    _setDefaultInputValueIfNeeded(): void;
    _isValueChanged(inputValue: number): boolean;
    _updateValueAndValidate(inputValue: number): void;
    _onfocusin(): void;
    _onfocusout(): void;
    _onInputRequestSubmit(): void;
    _onkeydown(e: KeyboardEvent): void;
    _getCaretPosition(): number | null;
    _getValueOnkeyDown(e: KeyboardEvent, inputValue: string, cursorPosition?: number): string;
    _isInputValueValid(typedValue: string, parsedValue: number): boolean;
    _decSpin(): void;
    _incSpin(): void;
    /**
     * Calculates the time which should be waited until _spinValue function is called.
     */
    _calcWaitTimeout(): number;
    /**
     * Called when the increment or decrement button is pressed and held to set new value.
     * @private
     * @param increment - is this the increment button or not so the values should be spin accordingly up or down
     * @param resetVariables - whether to reset the spin-related variables or not
     */
    _spinValue(increment: boolean, resetVariables?: boolean): void;
    /**
    * Resets spin process
    */
    _resetSpin(): void;
    /**
    * Resets spin process when mouse outs + or - buttons
    */
    _resetSpinOut(): void;
}
export default StepInput;
export type { StepInputValueStateChangeEventDetail, };
