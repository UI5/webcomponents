import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { submitForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	NUMBERINPUT_PATTER_MISSMATCH,
	NUMBERINPUT_RANGEOVERFLOW,
	NUMBERINPUT_RANGEUNDERFLOW,
} from "./generated/i18n/i18n-defaults.js";
import StepInputTemplate from "./StepInputTemplate.js";
import type { InputEventDetail } from "./Input.js";
import type NumberInput from "./NumberInput.js";
import type { NumberInputValueStateChangeEventDetail } from "./NumberInput.js";

// Styles
import StepInputCss from "./generated/themes/StepInput.css.js";

type StepInputValueStateChangeEventDetail = NumberInputValueStateChangeEventDetail;

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
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
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

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * @public
	 */
	@slot()
	valueStateMessage!: Slot<HTMLElement>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get _innerNumberInput(): NumberInput {
		return this.shadowRoot!.querySelector<NumberInput>("[ui5-number-input]")!;
	}

	async formElementAnchor() {
		return (await this.getFocusDomRefAsync() as UI5Element)?.getFocusDomRefAsync();
	}

	get formValidityMessage() {
		const validity = this.formValidity;

		if (validity.patternMismatch) {
			return StepInput.i18nBundle.getText(NUMBERINPUT_PATTER_MISSMATCH, this.valuePrecision);
		}
		if (validity.rangeUnderflow) {
			return StepInput.i18nBundle.getText(NUMBERINPUT_RANGEUNDERFLOW, this.min as number);
		}
		if (validity.rangeOverflow) {
			return StepInput.i18nBundle.getText(NUMBERINPUT_RANGEOVERFLOW, this.max as number);
		}

		return "";
	}

	get formValidity(): ValidityStateFlags {
		return {
			patternMismatch: this.value !== 0 && (this._innerNumberInput?.formValidity.patternMismatch ?? false),
			rangeOverflow: this.max !== undefined && this.value > this.max,
			rangeUnderflow: this.min !== undefined && this.value < this.min,
		};
	}

	get formFormattedValue(): FormData | string | null {
		return this.value.toString();
	}

	getFocusDomRef(): HTMLElement | undefined {
		return this._innerNumberInput?.getFocusDomRef();
	}

	get _associatedLabelText(): string | undefined {
		return getAssociatedLabelForTexts(this) || undefined;
	}

	_onNiChange(e: Event) {
		e.stopPropagation();
		this._syncFromInner();
		this.fireDecoratorEvent("change");
	}

	_onNiInput(e: CustomEvent<InputEventDetail>) {
		e.stopPropagation();
		const prevented = !this.fireDecoratorEvent("input", { inputType: e.detail.inputType });
		if (prevented) {
			e.preventDefault();
		}
	}

	_onNiValueStateChange(e: CustomEvent<StepInputValueStateChangeEventDetail>) {
		e.stopPropagation();
		const prevented = !this.fireDecoratorEvent("value-state-change", {
			valueState: e.detail.valueState,
			valid: e.detail.valid,
		});
		if (prevented) {
			// Inner already applied the new valueState — revert it back to the outer's current value
			this._innerNumberInput.valueState = this.valueState;
		} else {
			this.valueState = e.detail.valueState;
		}
	}

	_syncFromInner() {
		const ni = this._innerNumberInput;
		if (!ni) {
			return;
		}
		this.value = ni.value;
		this.valueState = ni.valueState;
	}

	_onRequestSubmit() {
		if (this._internals.form) {
			submitForm(this);
		}
	}
}

StepInput.define();

export default StepInput;
export type {
	StepInputValueStateChangeEventDetail,
};
