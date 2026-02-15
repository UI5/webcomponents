import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type Popover from "./Popover.js";
type TokenizedText = Array<string>;
type IndexedTokenizedText = Array<{
    text: string;
    last: boolean;
}>;
type ExceededText = {
    exceededText?: string;
    leftCharactersCount?: number;
    calcedMaxLength?: number;
};
type TextAreaInputEventDetail = {
    escapePressed?: boolean;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-textarea` component is used to enter multiple rows of text.
 *
 * When empty, it can hold a placeholder similar to a `ui5-input`.
 * You can define the rows of the `ui5-textarea` and also determine specific behavior when handling long texts.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TextArea.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart textarea - Used to style the native textarea
 */
declare class TextArea extends UI5Element implements IFormInputElement {
    eventDetails: {
        "change": void;
        "input": TextAreaInputEventDetail;
        "select": void;
        "scroll": void;
        "value-changed": void;
    };
    /**
     * Defines the value of the component.
     * @formEvents change input
     * @formProperty
     * @default ""
     * @public
     */
    value: string;
    /**
     * Indicates whether the user can interact with the component or not.
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
     * Defines whether the component is required.
     * @default false
     * @public
     * @since 1.0.0-rc.3
     */
    required: boolean;
    /**
     * Defines a short hint intended to aid the user with data entry when the component has no value.
     * @default undefined
     * @public
     */
    placeholder?: string;
    /**
     * Defines the value state of the component.
     *
     * **Note:** If `maxlength` property is set,
     * the component turns into "Critical" state once the characters exceeds the limit.
     * In this case, only the "Negative" state is considered and can be applied.
     * @default "None"
     * @since 1.0.0-rc.7
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines the number of visible text rows for the component.
     *
     * **Notes:**
     *
     * - If the `growing` property is enabled, this property defines the minimum rows to be displayed
     * in the textarea.
     * - The CSS `height` property wins over the `rows` property, if both are set.
     * @default 0
     * @public
     */
    rows: number;
    /**
     * Defines the maximum number of characters that the `value` can have.
     * @default undefined
     * @public
     */
    maxlength?: number;
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
     */
    showExceededText: boolean;
    /**
     * Enables the component to automatically grow and shrink dynamically with its content.
     * @default false
     * @public
     */
    growing: boolean;
    /**
     * Defines the maximum number of rows that the component can grow.
     * @default 0
     * @public
     */
    growingMaxRows: number;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the textarea.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.16.0
     */
    accessibleDescription?: string;
    /**
     * Receives id(or many ids) of the elements that describe the textarea.
     * @default undefined
     * @public
     * @since 2.16.0
     */
    accessibleDescriptionRef?: string;
    /**
     * @private
     */
    focused: boolean;
    /**
     * @private
     */
    exceeding: boolean;
    /**
     * @private
     */
    _mirrorText: IndexedTokenizedText;
    /**
     * @private
     */
    _maxHeight?: string;
    /**
     * @private
     */
    _width?: number;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     * The value state message slot should contain only one root element.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed if the component has
     * `valueState` of type `Information`, `Critical` or `Negative`.
     * @since 1.0.0-rc.7
     * @public
     */
    valueStateMessage: Slot<HTMLElement>;
    _fnOnResize: ResizeObserverCallback;
    _firstRendering: boolean;
    _openValueStateMsgPopover: boolean;
    _exceededTextProps: ExceededText;
    _keyDown?: boolean;
    previousValue: string;
    valueStatePopover?: Popover;
    static i18nBundle: I18nBundle;
    get formValidityMessage(): string | undefined;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): FormData | string | null;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    getInputDomRef(): HTMLTextAreaElement;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(): void;
    _onfocusin(): void;
    _onfocusout(e: FocusEvent): void;
    _onchange(): void;
    _onselect(): void;
    _onscroll(): void;
    _oninput(e: InputEvent): void;
    _onResize(): void;
    _setCSSParams(): void;
    toggleValueStateMessage(toggle: boolean): void;
    openPopover(): void;
    closePopover(): void;
    _getPopover(): Popover;
    _tokenizeText(value: string): {
        text: string;
        last: boolean;
    }[];
    _mapTokenizedTextToObject(tokenizedText: TokenizedText): {
        text: string;
        last: boolean;
    }[];
    _calcExceededText(): {
        exceededText: string | undefined;
        leftCharactersCount: number | undefined;
        calcedMaxLength: number | undefined;
    };
    get classes(): {
        root: {
            "ui5-textarea-root": boolean;
        };
        valueStateMsg: {
            "ui5-valuestatemessage-header": boolean;
            "ui5-valuestatemessage--error": boolean;
            "ui5-valuestatemessage--warning": boolean;
            "ui5-valuestatemessage--information": boolean;
        };
    };
    get tabIndex(): 0 | -1;
    get ariaLabelText(): string | undefined;
    get ariaDescriptionText(): string | undefined;
    get ariaDescriptionTextId(): "" | "accessibleDescription";
    get ariaDescribedBy(): string | undefined;
    get ariaValueStateHiddenText(): string | undefined;
    get valueStateDefaultText(): string;
    get _ariaInvalid(): "true" | undefined;
    get openValueStateMsgPopover(): boolean;
    get displayValueStateMessagePopover(): boolean;
    get hasCustomValueState(): boolean;
    get hasValueState(): boolean;
    get valueStateTextMappings(): {
        Positive: string;
        Information: string;
        Negative: string;
        Critical: string;
    };
    get valueStateTypeMappings(): {
        Positive: string;
        Information: string;
        Negative: string;
        Critical: string;
    };
}
export default TextArea;
export { TextArea as BaseTextArea };
export type { TextAreaInputEventDetail };
