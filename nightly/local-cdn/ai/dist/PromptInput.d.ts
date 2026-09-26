import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type { IInputSuggestionItem } from "@ui5/webcomponents/dist/Input.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base/dist/index.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-ai-prompt-input` component allows the user to write custom instructions in natural language, so that AI is guided to generate content tailored to user needs.
 *
 * **Note:** The web component is in an experimental state
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/PromptInput.js"`
 * @class
 * @constructor
 * @public
 * @extends UI5Element
 * @experimental The **@ui5/webcomponents-ai** package is under development and considered experimental - components' APIs are subject to change.
 * Furthermore, the package supports **Horizon** themes only.
 */
declare class PromptInput extends UI5Element {
    eventDetails: {
        submit: void;
        input: void;
        change: void;
    };
    /**
     * Defines the value of the component.
     *
     * @default ""
     * @since 2.0.0
     * @public
     */
    value: string;
    /**
     * Defines a short hint intended to aid the user with data entry when the
     * component has no value.
     * @default undefined
     * @since 2.0.0
     * @public
     */
    placeholder?: string;
    /**
     * Defines the label of the input field.
     *
     * @default undefined
     * @since 2.0.0
     * @public
     */
    label?: string;
    /**
     * Defines whether the clear icon of the input will be shown.
     * @default false
     * @public
     * @since 2.0.0
     */
    showClearIcon: boolean;
    /**
     * Determines whether the characters exceeding the maximum allowed character count are visible
     * in the component.
     *
     * If set to `false`, the user is not allowed to enter more characters than what is set in the
     * `maxlength` property.
     * If set to `true` the characters exceeding the `maxlength` value are selected on
     * paste and the counter below the component displays their number.
     * @default false
     * @public
     * @since 2.0.0
     */
    showExceededText: boolean;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     * @since 2.0.0
     */
    disabled: boolean;
    /**
     * Defines whether the component is read-only.
     *
     * **Note:** A read-only component is not editable,
     * but still provides visual feedback upon user interaction.
     * @default false
     * @public
     * @since 2.0.0
     */
    readonly: boolean;
    /**
     * Sets the maximum number of characters available in the input field.
     *
     * @default undefined
     * @since 2.0.0
     * @public
     */
    maxlength?: number;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @since 2.0.0
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component should show suggestions, if such are present.
     *
     * @default false
     * @public
     */
    showSuggestions: boolean;
    /**
     * Defines the suggestion items.
     *
     * **Note:** The suggestions would be displayed only if the `showSuggestions`
     * property is set to `true`.
     *
     * **Note:** The `<ui5-suggestion-item>`, `<ui5-suggestion-item-group>` and `ui5-suggestion-item-custom` are recommended to be used as suggestion items.
     *
     * @public
     */
    suggestionItems: DefaultSlot<IInputSuggestionItem>;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     * The value state message slot should contain only one root element.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the component is in `Information`, `Critical` or `Negative` value state.
     *
     * @since 2.0.0
     * @public
     */
    valueStateMessage: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    _onkeydown(e: KeyboardEvent): void;
    _onInnerInput(e: UI5CustomEvent<Input, "input">): void;
    _onInnerChange(): void;
    _onButtonClick(): void;
    _onTypeAhead(e: UI5CustomEvent<Input, "type-ahead">): void;
    get _exceededText(): string | undefined;
    get _maxLenght(): number | undefined;
    get _submitButtonDisabled(): boolean;
}
export default PromptInput;
