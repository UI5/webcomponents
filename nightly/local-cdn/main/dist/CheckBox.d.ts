import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type WrappingType from "./types/WrappingType.js";
import type { AriaRole, AriaChecked, AriaDisabled, AriaReadonly } from "@ui5/webcomponents-base/dist/types.js";
type CheckBoxAccInfo = {
    role?: AriaRole;
    ariaChecked?: AriaChecked;
    ariaReadonly?: AriaReadonly;
    ariaDisabled?: AriaDisabled;
    ariaRequired?: boolean;
    tabindex?: number | undefined;
};
/**
 * @class
 *
 * ### Overview
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 *
 * The `ui5-checkbox` component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the `ui5-checkbox`, the user has to click or tap the square
 * box or its label.
 *
 * The `ui5-checkbox` component only has 2 states - checked and unchecked.
 * Clicking or tapping toggles the `ui5-checkbox` between checked and unchecked state.
 *
 * ### Usage
 *
 * You can define the checkbox text with via the `text` property. If the text exceeds the available width, it is truncated by default.
 * In case you prefer text to truncate, set the `wrappingType` property to "None".
 * The touchable area for toggling the `ui5-checkbox` ends where the text ends.
 *
 * You can disable the `ui5-checkbox` by setting the `disabled` property to
 * `true`,
 * or use the `ui5-checkbox` in read-only mode by setting the `readonly`
 * property to `true`.
 *
 * ### Keyboard Handling
 *
 * The user can use the following keyboard shortcuts to toggle the checked state of the `ui5-checkbox`.
 *
 * - [Space],[Enter] - Toggles between different states: checked, not checked.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CheckBox.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart root - Used to style the outermost wrapper of the `ui5-checkbox`
 * @csspart label - Used to style the label of the `ui5-checkbox`
 * @csspart icon - Used to style the icon of the `ui5-checkbox`
 */
declare class CheckBox extends UI5Element implements IFormInputElement {
    eventDetails: {
        "change": void;
        "value-changed": void;
    };
    /**
     * Receives id(or many ids) of the elements that label the component
     * @default undefined
     * @public
     * @since 1.1.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessible ARIA name of the component.
     * @public
     * @default undefined
     * @since 1.1.0
     */
    accessibleName?: string;
    /**
     * Defines whether the component is disabled.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines whether the component is read-only.
     *
     * **Note:** A read-only component is not editable,
     * but still provides visual feedback upon user interaction.
     * @default false
     * @public
     */
    readonly: boolean;
    /**
     * Determines whether the `ui5-checkbox` is in display only state.
     *
     * When set to `true`, the `ui5-checkbox` is not interactive, not editable, not focusable
     * and not in the tab chain. This setting is used for forms in review mode.
     *
     * **Note:** When the property `disabled` is set to `true` this property has no effect.
     * @since 1.22.0
     * @public
     * @default false
     */
    displayOnly: boolean;
    /**
     * Defines whether the component is required.
     *
     * **Note:** We advise against using the text property of the checkbox when there is a
     * label associated with it to avoid having two required asterisks.
     * @default false
     * @public
     * @since 1.3.0
     */
    required: boolean;
    /**
    * Defines whether the component is displayed as partially checked.
    *
    * **Note:** The indeterminate state can be set only programmatically and can’t be achieved by user
    * interaction and the resulting visual state depends on the values of the `indeterminate`
    * and `checked` properties:
    *
    * -  If the component is checked and indeterminate, it will be displayed as partially checked
    * -  If the component is checked and it is not indeterminate, it will be displayed as checked
    * -  If the component is not checked, it will be displayed as not checked regardless value of the indeterminate attribute
    * @default false
    * @public
    * @since 1.0.0-rc.15
    */
    indeterminate: boolean;
    /**
     * Defines if the component is checked.
     *
     * **Note:** The property can be changed with user interaction,
     * either by cliking/tapping on the component, or by
     * pressing the Enter or Space key.
     * @default false
     * @formEvents change
     * @formProperty
     * @public
     */
    checked: boolean;
    /**
     * Defines the text of the component.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component text wraps when there is not enough space.
     *
     * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
     * **Note:** for option "None" the text will be truncated with an ellipsis.
     * @default "Normal"
     * @public
     */
    wrappingType: `${WrappingType}`;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Defines the form value of the component that is submitted when the checkbox is checked.
     *
     * When a form containing `ui5-checkbox` elements is submitted, only the values of the
     * **checked** checkboxes are included in the form data sent to the server. Unchecked
     * checkboxes do not contribute any data to the form submission.
     *
     * This property is particularly useful for **checkbox groups**, where multiple checkboxes with the same `name` but different `value` properties can be used to represent a set of related options.
     *
     * @default "on"
     * @public
     */
    value: string;
    /**
     * Defines the active state (pressed or not) of the component.
     * @private
     */
    active: boolean;
    /**
     * Defines custom aria implementation object.
     * @private
     */
    _accInfo?: CheckBoxAccInfo;
    static i18nBundle: I18nBundle;
    _deactivate: () => void;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): string | null;
    constructor();
    onEnterDOM(): void;
    _onclick(): void;
    _onmousedown(): void;
    _onmouseup(): void;
    _onfocusout(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    toggle(): this;
    canToggle(): boolean;
    valueStateTextMappings(): {
        Negative: string;
        Critical: string;
        Positive: string;
    };
    get ariaLabelText(): string | undefined;
    get classes(): {
        main: {
            "ui5-checkbox--hoverable": boolean;
        };
    };
    get ariaReadonly(): "true" | undefined;
    get effectiveAriaDisabled(): "true" | undefined;
    get effectiveAriaChecked(): boolean | "mixed";
    get ariaLabelledBy(): string | undefined;
    get ariaDescribedBy(): string | undefined;
    get hasValueState(): boolean;
    get valueStateText(): string | undefined;
    get effectiveTabIndex(): number | undefined;
    get tabbable(): boolean;
    get isCompletelyChecked(): boolean;
    get isDisplayOnly(): boolean;
    get accessibilityInfo(): {
        role: import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").JSXInternal.AriaRole | undefined;
        type: string;
        description: string;
        label: string | undefined;
        disabled: boolean;
        readonly: boolean;
        required: boolean | undefined;
    };
    get accInfo(): {
        role: import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").JSXInternal.AriaRole | undefined;
        ariaChecked: import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").JSXInternal.Signalish<import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").Booleanish | "mixed" | undefined>;
        ariaReadonly: import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").JSXInternal.Signalish<import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").Booleanish | undefined>;
        ariaDisabled: import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").JSXInternal.Signalish<import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").Booleanish | undefined>;
        ariaRequired: boolean | undefined;
        tabindex: number | undefined;
    };
}
export default CheckBox;
