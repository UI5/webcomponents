import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isUp,
	isDown,
	isUpCtrl,
	isDownCtrl,
	isUpShift,
	isDownShift,
	isUpShiftCtrl,
	isDownShiftCtrl,
	isPageUpShift,
	isPageDownShift,
	isEscape,
	isEnter,
	isMinus,
} from "@ui5/webcomponents-base/dist/Keys.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import StepInputTemplate from "./StepInputTemplate.js";
import {
	STEPINPUT_DEC_ICON_TITLE,
	STEPINPUT_INC_ICON_TITLE,
	STEPINPUT_PATTER_MISSMATCH,
	STEPINPUT_RANGEOVERFLOW,
	STEPINPUT_RANGEUNDERFLOW,
} from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/less.js";
import "@ui5/webcomponents-icons/dist/add.js";

import type Input from "./Input.js";
import type { InputAccInfo, InputEventDetail } from "./Input.js";
import InputType from "./types/InputType.js";
import NumberFormat from "@ui5/webcomponents-localization/dist/NumberFormat.js";

// Styles
import StepInputCss from "./generated/themes/StepInput.css.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { attachLanguageChange, detachLanguageChange } from "@ui5/webcomponents-base/dist/locale/languageChange.js";

// Spin variables
const INITIAL_WAIT_TIMEOUT = 500; // milliseconds
const ACCELERATION = 0.8;
const MIN_WAIT_TIMEOUT = 50; // milliseconds
const INITIAL_SPEED = 120; // milliseconds

type StepInputValueStateChangeEventDetail = {
	valueState: `${ValueState}`,
	valid: boolean,
}

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
@customElement({
	tag: "ui5-step-input",
	cldr: true,
	formAssociated: true,
	renderer: jsxRenderer,
	styles: StepInputCss,
	template: StepInputTemplate,
	languageAware: true,
})
/**
 * Fired when the input operation has finished by pressing Enter or on focusout.
 * @public
 */
@event("change", {
	bubbles: true,
})
/**
 * Fired when the value of the component changes at each keystroke.
 * @public
 * @since 2.6.0
 */
@event("input", {
	cancelable: true,
	bubbles: true,
})
/**
 * Fired before the value state of the component is updated internally.
 * The event is preventable, meaning that if it's default action is
 * prevented, the component will not update the value state.
 * @since 1.23.0
 * @public
 * @param {string} valueState The new `valueState` that will be set.
 * @param {boolean} valid Indicator if the value is in between the min and max value.
 */
@event("value-state-change", {
	bubbles: true,
	cancelable: true,
})
class StepInput extends UI5Element implements IFormInputElement {
	eventDetails!: {
		change: void
		input: InputEventDetail
		"value-state-change": StepInputValueStateChangeEventDetail
	}

	/**
	 * Defines a value of the component.
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	value = 0;

	/**
	 * Defines a minimum value of the component.
	 * @default undefined
	 * @public
	 */
	@property({ type: Number })
	min?: number;

	/**
	 * Defines a maximum value of the component.
	 * @default undefined
	 * @public
	 */
	@property({ type: Number })
	max?: number;

	/**
	 * Defines a step of increasing/decreasing the value of the component.
	 * @default 1
	 * @public
	 */
	@property({ type: Number })
	step: number = 1;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Determines whether the component is displayed as disabled.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Determines whether the component is displayed as read-only.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Defines a short hint, intended to aid the user with data entry when the
	 * component has no value.
	 *
	 * **Note:** When no placeholder is set, the format pattern is displayed as a placeholder.
	 * Passing an empty string as the value of this property will make the component appear empty - without placeholder or format pattern.
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Determines the number of digits after the decimal point of the component.
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	valuePrecision = 0;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleNameRef?: string;

	@property({ noAttribute: true })
	_decIconDisabled = false;

	@property({ noAttribute: true })
	_incIconDisabled = false;

	@property({ type: Boolean })
	focused = false;

	@property({ noAttribute: true })
	_inputFocused = false;

	@property({ noAttribute: true })
	_previousValue: number | undefined;

	@property({ noAttribute: true })
	_waitTimeout: number = INITIAL_WAIT_TIMEOUT;

	@property({ noAttribute: true })
	_speed: number = INITIAL_SPEED;

	@property({ noAttribute: true })
	_btnDown?: boolean;

	@property({ noAttribute: true })
	_spinTimeoutId?: Timeout;

	@property({ noAttribute: true })
	_spinStarted = false;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the component is in `Information`, `Critical` or `Negative` value state.
	 * @public
	 */
	@slot()
	valueStateMessage!: Slot<Array<HTMLElement>>;

	_initialValueState?: `${ValueState}`;

	_formatter?: NumberFormat;

	_languageChangeHandler?: (lang: string) => Promise<void>;

	_languageChanged?: boolean = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	async formElementAnchor() {
		return (await this.getFocusDomRefAsync() as UI5Element)?.getFocusDomRefAsync();
	}

	get formValidityMessage() {
		const validity = this.formValidity;

		if (validity.patternMismatch) {
			return StepInput.i18nBundle.getText(STEPINPUT_PATTER_MISSMATCH, this.valuePrecision);
		}
		if (validity.rangeUnderflow) {
			return StepInput.i18nBundle.getText(STEPINPUT_RANGEUNDERFLOW, this.min as number);
		}
		if (validity.rangeOverflow) {
			return StepInput.i18nBundle.getText(STEPINPUT_RANGEOVERFLOW, this.max as number);
		}

		return ""; // No error
	}

	get formValidity(): ValidityStateFlags {
		return {
			patternMismatch: this.value !== 0 && !this._isValueWithCorrectPrecision,
			rangeOverflow: this.max !== undefined && this.value >= this.max,
			rangeUnderflow: this.min !== undefined && this.value <= this.min,
		};
	}

	get formFormattedValue(): FormData | string | null {
		return this.value.toString();
	}

	get type() {
		return InputType.Text;
	}

	// icons-related

	get decIconTitle() {
		return StepInput.i18nBundle.getText(STEPINPUT_DEC_ICON_TITLE);
	}

	get incIconTitle() {
		return StepInput.i18nBundle.getText(STEPINPUT_INC_ICON_TITLE);
	}

	get _decIconClickable() {
		return !this._decIconDisabled && !this.readonly && !this.disabled;
	}

	get _incIconClickable() {
		return !this._incIconDisabled && !this.readonly && !this.disabled;
	}

	get _isFocused() {
		return this.focused;
	}

	get _displayValue() {
		if (this._languageChanged) {
			this._languageChanged = false;
			this.valueState = ValueState.None; // to reset the value state visual
			return this._formatNumber(this.value);
		}
		// For the cases when there is set value precision but the input value is not with correct precision we don't need to format it
		const value = this.input?.value && !this._isValueWithCorrectPrecision ? this.input.value : this._formatNumber(this.value);
		if ((this.value === 0) || (Number.isInteger(this.value))) {
			return value;
		}

		if (this.input && this.value === this._parseNumber(this.input.value)) { // For the cases where the number is fractional and is ending with 0s.
			return this.input.value;
		}

		return value;
	}

	get accInfo(): InputAccInfo {
		return {
			"ariaRequired": this.required,
			"ariaLabel": getEffectiveAriaLabelText(this),
		};
	}

	get inputAttributes() {
		return {
			min: this.min === undefined ? undefined : this.min,
			max: this.max === undefined ? undefined : this.max,
			step: this.step,
		};
	}

	onBeforeRendering() {
		this._setButtonState();
	}
	onEnterDOM() {
		this._setupLanguageChangeHandler();
	}

	onExitDOM() {
		this._cleanupLanguageChangeHandler();
	}

	_setupLanguageChangeHandler() {
		if (this._languageChangeHandler) {
			return;
		}

		this._languageChangeHandler = () => {
			this._formatter = undefined;
			this._languageChanged = true;

			return Promise.resolve();
		};
		attachLanguageChange(this._languageChangeHandler);
	}

	_cleanupLanguageChangeHandler() {
		if (this._languageChangeHandler) {
			detachLanguageChange(this._languageChangeHandler);
			this._languageChangeHandler = undefined;
		}
	}

	get formatter(): NumberFormat {
		if (!this._formatter) {
			this._formatter = NumberFormat.getFloatInstance({
				decimals: this.valuePrecision,
			});
		}

		return this._formatter;
	}

	get input(): Input {
		return this.shadowRoot!.querySelector<Input>("[ui5-input]")!;
	}

	get innerInput(): HTMLInputElement {
		return this.input.shadowRoot!.querySelector<HTMLInputElement>("input")!;
	}

	get inputOuter() {
		return this.shadowRoot!.querySelector(".ui5-step-input-input")!;
	}

	_onButtonFocusOut() {
		setTimeout(() => {
			if (!this._inputFocused) {
				this.inputOuter.removeAttribute("focused");
			}
		}, 0);
	}

	_onInput(e: CustomEvent<InputEventDetail>) {
		const prevented = !this.fireDecoratorEvent("input", { inputType: e.detail.inputType });

		if (prevented) {
			e.preventDefault();
		}
	}

	_onInputFocusIn() {
		this._inputFocused = true;
	}

	_onInputFocusOut() {
		this._inputFocused = false;
		this._onInputChange();
	}

	_onMouseWheel(e: WheelEvent) {
		if (this.disabled || this.readonly) {
			return;
		}

		if (this._isFocused) {
			e.preventDefault();
		}

		const isScrollUp = e.deltaY < 0;
		const modifier = isScrollUp ? this.step : -this.step;
		this._modifyValue(modifier, true);
	}

	_setButtonState() {
		this._decIconDisabled = this.min !== undefined && this.value <= this.min;
		this._incIconDisabled = this.max !== undefined && this.value >= this.max;
	}

	_validate() {
		if (this._initialValueState === undefined) {
			this._initialValueState = this.valueState;
		}

		this._updateValueState();
	}

	_updateValueState() {
		const isWithinRange = (this.min === undefined || this._parseNumber(this.input.value) >= this.min)
							  && (this.max === undefined || this._parseNumber(this.input.value) <= this.max);
		const isValueWithCorrectPrecision = this._isValueWithCorrectPrecision;
		const previousValueState = this.valueState;
		const isValid = isWithinRange && isValueWithCorrectPrecision;

		this.valueState = isValid ? ValueState.None : ValueState.Negative;

		const eventPrevented = !this.fireDecoratorEvent("value-state-change", {
			valueState: this.valueState,
			valid: isValid,
		});

		if (eventPrevented) {
			this.valueState = previousValueState;
		}
	}

	_preciseValue(value: number) {
		const pow = 10 ** this.valuePrecision;
		return Math.round(value * pow) / pow;
	}

	_fireChangeEvent() {
		if (this._previousValue !== this.value) {
			this._previousValue = this.value;
			this.fireDecoratorEvent("change");
		}
	}

	/**
	 * Value modifier - modifies the value of the component, validates the new value and enables/disables increment and
	 * decrement buttons according to the value and min/max values (if set). Fires `change` event when requested
	 * @private
	 * @param modifier modifies the value of the component with the given modifier (positive or negative)
	 * @param fireChangeEvent if `true`, fires `change` event when the value is changed
	 */
	_modifyValue(modifier: number, fireChangeEvent = false) {
		let value;
		value = this.value + modifier;
		if (this.min !== undefined && value < this.min) {
			value = this.min;
		}
		if (this.max !== undefined && value > this.max) {
			value = this.max;
		}
		value = this._preciseValue(value);
		if (value !== this.value) {
			this.value = value;
			this.input.value = this._formatNumber(value);
			this._validate();
			this._setButtonState();
			this.focused = true;
			this.inputOuter.setAttribute("focused", "");
			if (fireChangeEvent) {
				this._fireChangeEvent();
			} else {
				this.input.focus();
			}
		}
	}

	/**
 	 * Formats a number with thousands separator based on current locale
 	 * @private
 	 */
	_formatNumber(value: number): string {
		return this.formatter.format(value);
	}

	/**
 	 * Parses formatted number string back to numeric value
 	 * @private
 	*/
	_parseNumber(formattedValue: string): number {
		return this.formatter.parse(formattedValue) as number;
	}

	_incValue() {
		if (this._incIconClickable && !this.disabled && !this.readonly) {
			this._modifyValue(this.step, true);
			this._previousValue = this.value;
		}
	}

	_decValue() {
		if (this._decIconClickable && !this.disabled && !this.readonly) {
			this._modifyValue(-this.step, true);
			this._previousValue = this.value;
		}
	}

	get _isValueWithCorrectPrecision() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		// gets either "." or "," as delimiter which is based on locale, and splits the number by it
		const delimiter = localeData.getNumberSymbol("decimal") || ".";
		// check if the value will be displayed with correct precision
		// _displayValue has special formatting logic
		if (this.valuePrecision === 0 && !this.input?.value.includes(delimiter) && ((this.value === 0) || (Number.isInteger(this.value)))) {
			// integers and zero will be formatted with toFixed, so thex y're always valid
			return true;
		}
		const numberParts = this.input?.value?.split(delimiter);
		const decimalPartLength = numberParts?.length > 1 ? numberParts[1].length : 0;

		return decimalPartLength === this.valuePrecision;
	}

	_onInputChange() {
		this._setDefaultInputValueIfNeeded();
		const inputValue = this._parseNumber(this.input.value);
		if (this._isValueChanged(inputValue)) {
			this._updateValueAndValidate(Number.isNaN(inputValue) ? this.min || 0 : inputValue);
			this.innerInput.value = this.input.value;
		}
	}

	_setDefaultInputValueIfNeeded() {
		if (this.input.value === "") {
			const defaultValue = this._formatNumber(this.min || 0);
			this.input.value = defaultValue;
			this.innerInput.value = defaultValue; // we need to update inner input value as well, to avoid empty input scenario
		}
	}

	_isValueChanged(inputValue: number) {
		const isValueWithCorrectPrecision = this._isValueWithCorrectPrecision;
		// Treat values as distinct when modified to match a specific precision (e.g., from 3.4000 to 3.40),
		// even if JavaScript sees them as equal, to correctly update valueState based on expected valuePrecision.
		const isPrecisionCorrectButValueStateError = isValueWithCorrectPrecision && this.valueState === ValueState.Negative;

		return this.value !== this._previousValue
			|| this.value !== inputValue
			|| inputValue === 0
			|| !isValueWithCorrectPrecision
			|| isPrecisionCorrectButValueStateError
			|| Number.isNaN(inputValue);
	}

	_updateValueAndValidate(inputValue: number) {
		this.value = inputValue;
		this._validate();
		this._setButtonState();
		this._fireChangeEvent();
	}

	_onfocusin() {
		this.focused = true;
		this._previousValue = this.value;
	}

	_onfocusout() {
		this.focused = false;
		this._previousValue = undefined;
	}

	_onkeydown(e: KeyboardEvent) {
		let preventDefault = true;
		if (this.disabled || this.readonly) {
			return;
		}

		if (isEnter(e)) {
			this._onInputChange();
			return;
		}

		if (isUp(e)) {
			// step up
			this._modifyValue(this.step);
		} else if (isDown(e)) {
			// step down
			this._modifyValue(-this.step);
		} else if (isEscape(e)) {
			// return previous value
			if (this._previousValue === undefined) {
				this._previousValue = this.value;
			}
			this.value = this._previousValue;
			this.input.value = this.value.toFixed(this.valuePrecision);
		} else if (this.max !== undefined && (isPageUpShift(e) || isUpShiftCtrl(e))) {
			// step to max
			this._modifyValue(this.max - this.value);
		} else if (this.min !== undefined && (isPageDownShift(e) || isDownShiftCtrl(e))) {
			// step to min
			this._modifyValue(this.min - this.value);
		} else if (!isUpCtrl(e) && !isDownCtrl(e) && !isUpShift(e) && !isDownShift(e)) {
			preventDefault = false;
		}

		if (e.key && e.key.length !== 1) {
			return;
		}

		const caretPosition = this._getCaretPosition();
		const inputValue = this.innerInput.value;
		const typedValue = this._getValueOnkeyDown(e, inputValue, caretPosition!);
		const parsedValue = this._parseNumber(typedValue);
		const isValidTypedValue = this._isInputValueValid(typedValue, parsedValue);

		if (preventDefault || !isValidTypedValue) {
			e.preventDefault();
		}

		if (caretPosition === 0 && isMinus(e)) {
			this._updateValueAndValidate(parsedValue);
		}
	}

	_getCaretPosition() {
		return this.input.getDomRef()!.querySelector("input")!.selectionStart;
	}

	_getValueOnkeyDown(e: KeyboardEvent, inputValue: string, cursorPosition?: number) {
		return `${inputValue.substring(0, cursorPosition)}${e.key}${inputValue.substring(cursorPosition!)}`;
	}

	_isInputValueValid(typedValue: string, parsedValue: number) {
		return !Number.isNaN(parsedValue) && !/, {2,}/.test(typedValue);
	}

	_decSpin() {
		if (!this._decIconDisabled) {
			this._spinValue(false, true);
		}
	}

	_incSpin() {
		if (!this._incIconDisabled) {
			this._spinValue(true, true);
		}
	}

	/**
	 * Calculates the time which should be waited until _spinValue function is called.
	 */
	_calcWaitTimeout() {
		this._speed *= ACCELERATION;
		this._waitTimeout = ((this._waitTimeout - this._speed) < MIN_WAIT_TIMEOUT ? MIN_WAIT_TIMEOUT : (this._waitTimeout - this._speed));
		return this._waitTimeout;
	}

	/**
	 * Called when the increment or decrement button is pressed and held to set new value.
	 * @private
	 * @param increment - is this the increment button or not so the values should be spin accordingly up or down
	 * @param resetVariables - whether to reset the spin-related variables or not
	 */
	_spinValue(increment: boolean, resetVariables = false) {
		if (resetVariables) {
			this._waitTimeout = INITIAL_WAIT_TIMEOUT;
			this._speed = INITIAL_SPEED;
			this._btnDown = true;
		}
		this._spinTimeoutId = setTimeout(() => {
			if (this._btnDown) {
				this._spinStarted = true;
				this._modifyValue(increment ? this.step : -this.step);
				this._setButtonState();
				if ((!this._incIconDisabled && increment) || (!this._decIconDisabled && !increment)) {
					this._spinValue(increment);
				} else {
					this._resetSpin();
					this._fireChangeEvent();
				}
			}
		}, this._calcWaitTimeout());
	}

	/**
	* Resets spin process
	*/
	_resetSpin() {
		clearTimeout(this._spinTimeoutId);
		this._btnDown = false;
		this._spinStarted = false;
	}

	/**
	* Resets spin process when mouse outs + or - buttons
	*/
	_resetSpinOut() {
		if (this._btnDown) {
			this._resetSpin();
			this._fireChangeEvent();
		}
	}
}
StepInput.define();

export default StepInput;
export type {
	StepInputValueStateChangeEventDetail,
};
