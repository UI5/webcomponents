import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type WrappingType from "./types/WrappingType.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-radio-button` component enables users to select a single option from a set of options.
 * When a `ui5-radio-button` is selected by the user, the
 * `change` event is fired.
 * When a `ui5-radio-button` that is within a group is selected, the one
 * that was previously selected gets automatically deselected. You can group radio buttons by using the `name` property.
 *
 * **Note:** If `ui5-radio-button` is not part of a group, it can be selected once, but can not be deselected back.
 *
 * ### Keyboard Handling
 *
 * Once the `ui5-radio-button` is on focus, it might be selected by pressing the Space and Enter keys.
 *
 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group,
 * while TAB and SHIFT + TAB can be used to enter or leave the radio button group.
 *
 * **Note:** On entering radio button group, the focus goes to the currently selected radio button.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/RadioButton";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart outer-ring - Used to style the outer ring of the `ui5-radio-button`.
 * @csspart inner-ring - Used to style the inner ring of the `ui5-radio-button`.
 */
declare class RadioButton extends UI5Element implements IFormInputElement {
    eventDetails: {
        change: void;
    };
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
     * **Note:** A read-only component isn't editable or selectable.
     * However, because it's focusable, it still provides visual feedback upon user interaction.
     * @default false
     * @public
     */
    readonly: boolean;
    /**
     * Defines whether the component is required.
     * @default false
     * @public
     * @since 1.9.0
     */
    required: boolean;
    /**
     * Defines whether the component is checked or not.
     *
     * **Note:** The property value can be changed with user interaction,
     * either by clicking/tapping on the component,
     * or by using the Space or Enter key.
     *
     * **Note:** Only enabled radio buttons can be checked.
     * Read-only radio buttons are not selectable, and therefore are always unchecked.
     * @default false
     * @formEvents change
     * @formProperty
     * @public
     * @since 1.0.0-rc.15
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
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * Radio buttons with the same `name` will form a radio button group.
     *
     * **Note:** By this name the component will be identified upon submission in an HTML form.
     *
     * **Note:** The selection can be changed with `ARROW_UP/DOWN` and `ARROW_LEFT/RIGHT` keys between radio buttons in same group.
     *
     * **Note:** Only one radio button can be selected per group.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Defines the form value of the component.
     * When a form with a radio button group is submitted, the group's value
     * will be the value of the currently selected radio button.
     * @default ""
     * @public
     */
    value: string;
    /**
     * Defines whether the component text wraps when there is not enough space.
     *
     * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
     * @default "Normal"
     * @public
     */
    wrappingType: `${WrappingType}`;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.6.0
     */
    accessibleName?: string;
    /**
     * Defines the IDs of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.1.0
     */
    accessibleNameRef?: string;
    _tabIndex?: number;
    /**
     * Defines the active state (pressed or not) of the component.
     * @default false
     * @private
     */
    active: boolean;
    /**
     * Defines if the component is selected in specific group
     * @default false
     * @private
     */
    _groupChecked: boolean;
    _groupRequired: boolean;
    _deactivate: () => void;
    _name: string;
    _checked: boolean;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): string | null;
    static i18nBundle: I18nBundle;
    constructor();
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    syncGroup(forceRemove?: boolean): void;
    _onclick(): this;
    _handleDown(e: KeyboardEvent): void;
    _handleUp(e: KeyboardEvent): void;
    _onkeydown(e: KeyboardEvent): void | this;
    _onkeyup(e: KeyboardEvent): void;
    _onmousedown(): void;
    _onmouseup(): void;
    _onfocusout(): void;
    toggle(): this;
    canToggle(): boolean;
    get effectiveAriaDisabled(): true | undefined;
    get ariaLabelText(): string;
    get effectiveAriaDescribedBy(): string | undefined;
    get hasValueState(): boolean;
    get valueStateText(): string;
    get effectiveTabIndex(): number | undefined;
}
export default RadioButton;
