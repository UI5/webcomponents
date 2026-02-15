import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import Input from "./Input.js";
import type Token from "./Token.js";
import type Tokenizer from "./Tokenizer.js";
import type { TokenizerTokenDeleteEventDetail } from "./Tokenizer.js";
import type { InputSelectionChangeEventDetail as MultiInputSelectionChangeEventDetail } from "./Input.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
interface IToken extends UI5Element, ITabbable {
    text?: string;
    readonly: boolean;
    selected: boolean;
    isTruncatable: boolean;
}
type MultiInputTokenDeleteEventDetail = {
    tokens: Token[];
};
/**
 * @class
 * ### Overview
 * A `ui5-multi-input` field allows the user to enter multiple values, which are displayed as `ui5-token`.
 *
 * User can choose interaction for creating tokens.
 * Fiori Guidelines say that user should create tokens when:
 *
 * - Type a value in the input and press enter or focus out the input field (`change` event is fired)
 * - Move between suggestion items (`selection-change` event is fired)
 * - Clicking on a suggestion item (`selection-change` event is fired if the clicked item is different than the current value. Also `change` event is fired )
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MultiInput.js";`
 * @constructor
 * @extends Input
 * @since 1.0.0-rc.9
 * @public
 */
declare class MultiInput extends Input implements IFormInputElement {
    eventDetails: Input["eventDetails"] & {
        "value-help-trigger": void;
        "token-delete": MultiInputTokenDeleteEventDetail;
    };
    /**
     * Determines whether a value help icon will be visualized in the end of the input.
     * Pressing the icon will fire `value-help-trigger` event.
     * @default false
     * @public
     */
    showValueHelpIcon: boolean;
    /**
     * Indicates whether the tokenizer has tokens
     * @default false
     * @private
     */
    tokenizerAvailable: boolean;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * **Note:** When the component is used inside a form element,
     * the value is sent as the first element in the form data, even if it's empty.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Indicates whether to show tokens in suggestions popover
     * @default false
     * @private
     */
    _showTokensInSuggestions: boolean;
    /**
     * Tracks whether user has explicitly toggled the show tokens state
     * @default false
     * @private
     */
    _userToggledShowTokens: boolean;
    /**
     * Defines the component tokens.
     * @public
     */
    tokens: Slot<IToken>;
    _skipOpenSuggestions: boolean;
    _valueHelpIconPressed: boolean;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    get formFormattedValue(): FormData | string | null;
    constructor();
    valueHelpPress(): void;
    tokenDelete(e: CustomEvent<TokenizerTokenDeleteEventDetail>): void;
    valueHelpMouseDown(e: MouseEvent): void;
    _tokenizerFocusOut(e: FocusEvent): void;
    valueHelpMouseUp(): void;
    innerFocusIn(): void;
    _showMoreItemsPress(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onTokenizerKeydown(e: KeyboardEvent): void;
    _handleLeft(e: KeyboardEvent): void;
    _handleBackspace(e: KeyboardEvent): void;
    _focusFirstToken(e: KeyboardEvent): void;
    _onfocusout(e: FocusEvent): void;
    /**
     * @override
     */
    _onfocusin(e: FocusEvent): void;
    onBeforeRendering(): void;
    /**
     * Override the _handlePickerAfterOpen method to handle token display based on device type
     */
    _handlePickerAfterOpen(): void;
    onAfterRendering(): void;
    get iconsCount(): number;
    get tokenizer(): Tokenizer;
    get tokenizerExpanded(): boolean;
    get _tokensCountText(): string;
    get _valueHelpText(): string;
    get _filterButtonAccessibleName(): string;
    get _tokensCountTextId(): string;
    get _valueHelpTextId(): "" | "hiddenText-value-help";
    /**
     * Returns the placeholder value when there are no tokens.
     * @protected
     */
    get _placeholder(): string | undefined;
    get accInfo(): {
        ariaRoledescription: string;
        ariaDescribedBy: string;
        ariaInvalid: boolean | undefined;
        ariaHasPopup: import("@ui5/webcomponents-base/dist/types.js").AriaHasPopup | undefined;
        ariaAutoComplete: "list" | "none" | "inline" | "both" | undefined;
        role: import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").JSXInternal.AriaRole | undefined;
        ariaControls: string | undefined;
        ariaExpanded: boolean | undefined;
        ariaDescription: string;
        accessibleDescription: string | undefined;
        ariaLabel: string | undefined;
    };
    get valueHelpLabel(): string;
    get ariaRoleDescription(): string;
    get morePopoverOpener(): HTMLElement;
    get shouldDisplayOnlyValueStateMessage(): boolean;
    /**
     * Computes the effective state for showing tokens in suggestions.
     * Returns false (show suggestions) by default, true only when explicitly set.
     */
    get _effectiveShowTokensInSuggestions(): boolean;
}
export default MultiInput;
export type { IToken, MultiInputTokenDeleteEventDetail, MultiInputSelectionChangeEventDetail, };
