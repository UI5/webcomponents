import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type ResponsivePopover from "./ResponsivePopover.js";
import type List from "./List.js";
import type { ListItemDeleteEventDetail } from "./List.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import type Token from "./Token.js";
import type { IToken } from "./MultiInput.js";
import type { TokenDeleteEventDetail } from "./Token.js";
import type Button from "./Button.js";
type TokenizerTokenDeleteEventDetail = {
    tokens: Token[];
};
type TokenizerSelectionChangeEventDetail = {
    tokens: Token[];
};
type TokenizerDialogButtonPressDetail = {
    confirm: boolean;
};
declare enum ClipboardDataOperation {
    cut = "cut",
    copy = "copy"
}
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-tokenizer` is an invisible container for `ui5-token`s that supports keyboard navigation and token selection.
 *
 * The `ui5-tokenizer` consists of two parts:
 * - Tokens - displays the available tokens.
 * - N-more indicator - contains the number of the remaining tokens that cannot be displayed due to the limited space.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The `ui5-tokenizer` provides advanced keyboard handling.
 * When a token is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Left] or [Right] / [Up] or [Down] - Navigates left and right through the tokens.
 * - [Home] - Navigates to the first token.
 * - [End] - Navigates to the last token.
 *
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete):
 *
 * - [Space] - Selects a token.
 * - [Backspace] / [Delete] - Deletes a token.
 * **Note:** The deletion of a token is handled by the application with the use of the `token-delete` event.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Tokenizer.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 * @experimental This component is availabe since 2.0 under an experimental flag and its API and behaviour are subject to change.
 */
declare class Tokenizer extends UI5Element implements IFormInputElement {
    eventDetails: {
        "token-delete": TokenizerTokenDeleteEventDetail;
        "selection-change": TokenizerSelectionChangeEventDetail;
        "show-more-items-press": void;
        "before-more-popover-open": void;
    };
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
     * Defines whether tokens are displayed on multiple lines.
     *
     * **Note:** The `multiLine` property is in an experimental state and is a subject to change.
     * @default false
     * @since 2.5.0
     * @public
     */
    multiLine: boolean;
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
     * Defines whether "Clear All" button is present. Ensure `multiLine` is enabled, otherwise `showClearAll` will have no effect.
     *
     * **Note:** The `showClearAll` property is in an experimental state and is a subject to change.
     * @default false
     * @since 2.5.0
     * @public
     */
    showClearAll: boolean;
    /**
     * Defines whether the component is disabled.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     */
    accessibleNameRef?: string;
    /**
     * Indicates if the tokenizer should show all tokens or n more label instead
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @default false
     * @private
     */
    expanded: boolean;
    /**
     * Indicates if the nMore popover is open
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @default false
     * @private
     */
    open: boolean;
    /**
     * Defines the ID or DOM Reference of the element that the menu is shown at
     * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the tokenizer.
     * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @private
     * @default undefined
     */
    opener?: HTMLElement | string | null;
    /**
     * Sets the min-width of the nMore Popover.
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @private
     */
    popoverMinWidth?: number;
    /**
     * Prevents tokens to be part of the tab chain.
     * **Note:** Used inside MultiInput, MultiComboBox and FileUploader components.
     * @default false
     * @private
     */
    preventInitialFocus: boolean;
    /**
     * Prevent opening of n-more Popover when label is clicked
     * **Note:** Used inside MultiComboBox component.
     * @default false
     * @private
     */
    preventPopoverOpen: boolean;
    /**
     * Hides the popover arrow.
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @default false
     * @private
     */
    hidePopoverArrow: boolean;
    _nMoreCount: number;
    _tokensCount: number;
    /**
     * Defines the tokens to be displayed.
     * @public
     */
    tokens: DefaultSlot<Token>;
    static i18nBundle: I18nBundle;
    _resizeHandler: ResizeObserverCallback;
    _itemNav: ItemNavigation;
    _scrollEnablement: ScrollEnablement | undefined;
    _expandedScrollWidth?: number;
    _tokenDeleting: boolean;
    _preventCollapse: boolean;
    _skipTabIndex: boolean;
    _previousToken: Token | null;
    _focusedElementBeforeOpen?: HTMLElement | null;
    _deletedDialogItems: Token[];
    _lastFocusedToken: Token | null;
    _isFocusSetInternally: boolean;
    /**
     * Scroll to end when tokenizer is expanded
     * @private
     */
    _scrollToEndOnExpand: boolean;
    _handleResize(): void;
    get formFormattedValue(): FormData | null;
    constructor();
    handleClearAll(): void;
    onBeforeRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _handleNMoreClick(): void;
    _onmousedown(e: MouseEvent): void;
    onTokenSelect(e: CustomEvent): void;
    _getVisibleTokens(): Token[];
    onAfterRendering(): void;
    /**
     * Scrolls the container to the end to ensure very long tokens are visible at their end.
     * Otherwise, tokens may appear visually cut off.
     * @protected
     */
    _scrollToEndIfNeeded(): void;
    _delete(e: CustomEvent<TokenDeleteEventDetail>): void;
    _tokenClickDelete(e: CustomEvent<TokenDeleteEventDetail>, token: Token): void;
    _handleCurrentItemAfterDeletion(nextToken: Token): void;
    /**
     * Removes a token from the Tokenizer.
     * This method should only be used by ui5-multi-combobox and ui5-multi-input
     * @protected
     * @param token Token to be focused.
     * @param forwardFocusToPrevious Indicates whether the focus will be forwarded to previous or next token after deletion.
     */
    deleteToken(token: Token, forwardFocusToPrevious?: boolean): void;
    itemDelete(e: CustomEvent<ListItemDeleteEventDetail>): Promise<void>;
    handleBeforeClose(): void;
    handleBeforeOpen(): void;
    handleAfterClose(): void;
    handleDialogButtonPress(e: UI5CustomEvent<Button, "click">): void;
    _onkeydown(e: KeyboardEvent): void;
    _onPopoverListKeydown(e: KeyboardEvent): void;
    _handleItemNavigation(e: KeyboardEvent, tokens: Array<Token>): void | -1;
    _handleHome(tokens: Array<Token>, endKeyPressed: boolean): -1 | undefined;
    _handleHomeShift(e: KeyboardEvent): void;
    _handleEndShift(e: KeyboardEvent): void;
    _calcNextTokenIndex(focusedToken: IToken, tokens: Array<IToken>, backwards: boolean): number;
    _handleArrowCtrl(e: KeyboardEvent, focusedToken: IToken, tokens: Array<IToken>, backwards: boolean): void;
    _handleArrowShift(focusedToken: Token, tokens: Array<Token>, backwards: boolean): void;
    _click(e: MouseEvent): void;
    _onfocusin(e: FocusEvent): void;
    _addTokenToNavigation(token: Token): void;
    _onfocusout(e: FocusEvent): void;
    /**
     * Determines the DOM element to focus when the Tokenizer receives focus.
     * If the last-focused token is not overflown, focus is restored to it.
     * Otherwise, the focus defaults to the first visible token.
     */
    getFocusDomRef(): HTMLElement | undefined;
    _toggleTokenSelection(tokens: Array<Token>): void;
    _handleTokenSelection(e: KeyboardEvent | MouseEvent, deselectAll?: boolean): void;
    get hasTokens(): boolean;
    get showEffectiveClearAll(): boolean;
    _fillClipboard(shortcutName: ClipboardDataOperation, tokens: Array<IToken>): void;
    /**
     * Scrolls the container of the tokens to its beginning.
     * This method is used by MultiInput and MultiComboBox.
     * @protected
     */
    scrollToStart(): void;
    /**
     * Scrolls the container of the tokens to its end when expanded.
     * This method is used by MultiInput and MultiComboBox.
     * @protected
     */
    scrollToEnd(): void;
    /**
     * Scrolls token to the visible area of the container.
     * Adds 5 pixels to the scroll position to ensure padding and border visibility on both ends
     * For the last token, if its width is more than the needed space, scroll to the end without offset
     * @protected
     */
    _scrollToToken(token: IToken): void;
    _getList(): List;
    get _tokens(): Token[];
    get morePopoverOpener(): HTMLElement | string | null;
    get _nMoreText(): string | undefined;
    get _clearAllText(): string;
    get showNMore(): boolean;
    get contentDom(): HTMLElement;
    get moreLink(): HTMLElement | null;
    get tokenizerLabel(): string;
    get _okButtonText(): string;
    get _cancelButtonText(): string;
    get tokenizerAriaDescription(): string | undefined;
    get _ariaDisabled(): true | undefined;
    get _ariaReadonly(): true | undefined;
    get morePopoverTitle(): string;
    get overflownTokens(): Token[];
    get _isPhone(): boolean;
    get _selectedTokens(): Token[];
    get _nMoreListMode(): ListSelectionMode.None | ListSelectionMode.Delete;
    get styles(): {
        popover: {
            "min-width": string;
        };
    };
    /**
     * @protected
     */
    _focusLastToken(): void;
    getPopover(): ResponsivePopover;
    getTokenByRefId(refId: string): Token;
}
declare const getTokensCountText: (iTokenCount: number) => string;
export default Tokenizer;
export { getTokensCountText };
export { ClipboardDataOperation };
export type { TokenizerTokenDeleteEventDetail, TokenizerSelectionChangeEventDetail, TokenizerDialogButtonPressDetail };
