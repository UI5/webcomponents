import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { InputEventDetail } from "./Input.js";
import type NumberInput from "./NumberInput.js";
import type { NumberInputValueStateChangeEventDetail } from "./NumberInput.js";
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
     * @default undefined
     * @public
     */
    placeholder?: string;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
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
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     * @public
     */
    valueStateMessage: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    get _innerNumberInput(): NumberInput;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    get formFormattedValue(): FormData | string | null;
    getFocusDomRef(): HTMLElement | undefined;
    get _associatedLabelText(): string | undefined;
    _onNumberInputChange(e: Event): void;
    _onNumberInputInput(e: CustomEvent<InputEventDetail>): void;
    _onNumberInputValueStateChange(e: CustomEvent<StepInputValueStateChangeEventDetail>): void;
    _syncFromInner(): void;
    _onRequestSubmit(): void;
}
export default StepInput;
export type { StepInputValueStateChangeEventDetail, };
