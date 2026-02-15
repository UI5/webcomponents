var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Tokenizer_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getFocusedElement } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import { isSpace, isSpaceCtrl, isSpaceShift, isLeftCtrl, isRightCtrl, isUpCtrl, isDownCtrl, isUpShift, isDownShift, isLeftShift, isRightShift, isLeftShiftCtrl, isRightShiftCtrl, isDeleteShift, isInsertCtrl, isEnd, isHome, isHomeShift, isEndShift, isPageUpShift, isPageDownShift, isHomeCtrl, isEndCtrl, isRight, isLeft, isUp, isDown, isEscape, } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import TokenizerTemplate from "./TokenizerTemplate.js";
import { MULTIINPUT_SHOW_MORE_TOKENS, TOKENIZER_ARIA_LABEL, TOKENIZER_ARIA_CONTAIN_TOKEN, TOKENIZER_ARIA_CONTAIN_ONE_TOKEN, TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS, TOKENIZER_SHOW_ALL_ITEMS, TOKENIZER_CLEAR_ALL, TOKENIZER_DIALOG_OK_BUTTON, TOKENIZER_DIALOG_CANCEL_BUTTON, INPUT_SUGGESTIONS_TITLE, } from "./generated/i18n/i18n-defaults.js";
// Styles
import TokenizerCss from "./generated/themes/Tokenizer.css.js";
import TokenizerPopoverCss from "./generated/themes/TokenizerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
// reuse suggestions focus styling for NMore popup
import SuggestionsCss from "./generated/themes/Suggestions.css.js";
var ClipboardDataOperation;
(function (ClipboardDataOperation) {
    ClipboardDataOperation["cut"] = "cut";
    ClipboardDataOperation["copy"] = "copy";
})(ClipboardDataOperation || (ClipboardDataOperation = {}));
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
let Tokenizer = Tokenizer_1 = class Tokenizer extends UI5Element {
    _handleResize() {
        this._nMoreCount = this.overflownTokens.length;
    }
    get formFormattedValue() {
        const tokens = this.tokens || [];
        if (this.name && tokens.length) {
            const formData = new FormData();
            const name = this.name;
            tokens.forEach(token => {
                formData.append(name, token.text || "");
            });
            return formData;
        }
        return null;
    }
    constructor() {
        super();
        /**
         * Defines whether the component is read-only.
         *
         * **Note:** A read-only component is not editable,
         * but still provides visual feedback upon user interaction.
         * @default false
         * @public
         */
        this.readonly = false;
        /**
         * Defines whether tokens are displayed on multiple lines.
         *
         * **Note:** The `multiLine` property is in an experimental state and is a subject to change.
         * @default false
         * @since 2.5.0
         * @public
         */
        this.multiLine = false;
        /**
         * Defines whether "Clear All" button is present. Ensure `multiLine` is enabled, otherwise `showClearAll` will have no effect.
         *
         * **Note:** The `showClearAll` property is in an experimental state and is a subject to change.
         * @default false
         * @since 2.5.0
         * @public
         */
        this.showClearAll = false;
        /**
         * Defines whether the component is disabled.
         *
         * **Note:** A disabled component is completely noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Indicates if the tokenizer should show all tokens or n more label instead
         * **Note:** Used inside MultiInput and MultiComboBox components.
         * @default false
         * @private
         */
        this.expanded = false;
        /**
         * Indicates if the nMore popover is open
         * **Note:** Used inside MultiInput and MultiComboBox components.
         * @default false
         * @private
         */
        this.open = false;
        /**
         * Prevents tokens to be part of the tab chain.
         * **Note:** Used inside MultiInput, MultiComboBox and FileUploader components.
         * @default false
         * @private
         */
        this.preventInitialFocus = false;
        /**
         * Prevent opening of n-more Popover when label is clicked
         * **Note:** Used inside MultiComboBox component.
         * @default false
         * @private
         */
        this.preventPopoverOpen = false;
        /**
         * Hides the popover arrow.
         * **Note:** Used inside MultiInput and MultiComboBox components.
         * @default false
         * @private
         */
        this.hidePopoverArrow = false;
        this._nMoreCount = 0;
        this._tokensCount = 0;
        this._tokenDeleting = false;
        this._preventCollapse = false;
        this._skipTabIndex = false;
        this._previousToken = null;
        this._lastFocusedToken = null;
        this._isFocusSetInternally = false;
        /**
         * Scroll to end when tokenizer is expanded
         * @private
         */
        this._scrollToEndOnExpand = false;
        this._resizeHandler = this._handleResize.bind(this);
        this._itemNav = new ItemNavigation(this, {
            currentIndex: -1,
            getItemsCallback: this._getVisibleTokens.bind(this),
        });
        this._deletedDialogItems = [];
    }
    handleClearAll() {
        this.fireDecoratorEvent("token-delete", { tokens: this._tokens });
    }
    onBeforeRendering() {
        if (!this.multiLine) {
            this._scrollEnablement = new ScrollEnablement(this);
        }
        const tokensLength = this._tokens.length;
        this._tokensCount = tokensLength;
        this._tokens.forEach(token => {
            token.singleToken = (tokensLength === 1) || this.multiLine;
            token.readonly = this.readonly;
        });
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._resizeHandler);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._resizeHandler);
    }
    _handleNMoreClick() {
        if (this.disabled) {
            return;
        }
        this.expanded = true;
        if (!this.preventPopoverOpen) {
            this.open = true;
        }
        this._tokens.forEach(token => {
            token.forcedTabIndex = "-1";
        });
        this._skipTabIndex = true;
        this.fireDecoratorEvent("show-more-items-press");
    }
    _onmousedown(e) {
        if (e.target.hasAttribute("ui5-token")) {
            const target = e.target;
            if (this.open) {
                this._preventCollapse = true;
            }
            if (!target.toBeDeleted) {
                this._addTokenToNavigation(target);
                this._scrollToToken(target);
            }
        }
    }
    onTokenSelect(e) {
        const tokens = this._tokens;
        const firstToken = tokens[0];
        const targetToken = e.target;
        if (tokens.length === 1 && firstToken.isTruncatable) {
            this.open = firstToken.selected;
        }
        if (this.multiLine && targetToken.isTruncatable) {
            this.opener = targetToken;
            this.open = targetToken.selected;
        }
    }
    _getVisibleTokens() {
        if (this.disabled) {
            return [];
        }
        return this._tokens.filter((token, index) => {
            return index < (this._tokens.length - this._nMoreCount);
        });
    }
    onAfterRendering() {
        const tokensArray = this._tokens;
        const firstToken = tokensArray[0];
        this._nMoreCount = this.overflownTokens.length;
        if (firstToken && !this.disabled && !this.preventInitialFocus && !this._skipTabIndex && !this._isFocusSetInternally) {
            firstToken.forcedTabIndex = "0";
        }
        if (this._scrollEnablement) {
            this._scrollEnablement.scrollContainer = this.contentDom;
        }
        if (this.expanded) {
            this._expandedScrollWidth = this.contentDom.scrollWidth;
        }
        this._scrollToEndIfNeeded();
        this._tokenDeleting = false;
    }
    /**
     * Scrolls the container to the end to ensure very long tokens are visible at their end.
     * Otherwise, tokens may appear visually cut off.
     * @protected
     */
    _scrollToEndIfNeeded() {
        // if scroll to end is prevented, skip scroll to the end
        if (!this._scrollToEndOnExpand) {
            return;
        }
        if (this.tokens.length || this.expanded) {
            this.scrollToEnd();
        }
    }
    _delete(e) {
        const target = e.target;
        if (!e.detail) { // if there are no details, the event is triggered by a click
            this._tokenClickDelete(e, target);
            this.open = false;
            return;
        }
        this.deleteToken(target, e.detail.backSpace);
    }
    _tokenClickDelete(e, token) {
        const tokens = this._getVisibleTokens();
        const target = e.target;
        const deletedTokenIndex = token ? tokens.indexOf(token) : tokens.indexOf(target); // The index of the token that just got deleted
        const nextTokenIndex = deletedTokenIndex === tokens.length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1; // The index of the next token that needs to be focused next due to the deletion
        const nextToken = tokens[nextTokenIndex]; // if the last item was deleted this will be undefined
        this._handleCurrentItemAfterDeletion(nextToken);
        this._tokenDeleting = true;
        this.fireDecoratorEvent("token-delete", { tokens: [token] });
    }
    _handleCurrentItemAfterDeletion(nextToken) {
        if (nextToken && !isPhone()) {
            setTimeout(() => {
                nextToken.focus();
            }, 0);
        }
    }
    /**
     * Removes a token from the Tokenizer.
     * This method should only be used by ui5-multi-combobox and ui5-multi-input
     * @protected
     * @param token Token to be focused.
     * @param forwardFocusToPrevious Indicates whether the focus will be forwarded to previous or next token after deletion.
     */
    deleteToken(token, forwardFocusToPrevious) {
        const tokens = this._getVisibleTokens();
        const deletedTokenIndex = tokens.indexOf(token);
        let nextTokenIndex = (deletedTokenIndex === tokens.length - 1) ? deletedTokenIndex - 1 : deletedTokenIndex + 1;
        const notSelectedTokens = tokens.filter(t => !t.selected);
        if (forwardFocusToPrevious) { // on backspace key select the previous item (unless deleting the first)
            nextTokenIndex = deletedTokenIndex === 0 ? deletedTokenIndex + 1 : deletedTokenIndex - 1;
        }
        else { // on delete key or mouse click on the "x" select the next item (unless deleting the last)
            nextTokenIndex = deletedTokenIndex === tokens.length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1;
        }
        let nextToken = tokens[nextTokenIndex];
        if (notSelectedTokens.length > 1) {
            while (nextToken && nextToken.selected) {
                nextTokenIndex = forwardFocusToPrevious ? --nextTokenIndex : ++nextTokenIndex;
                if (nextTokenIndex < 0) {
                    nextToken = notSelectedTokens[0];
                }
                if (nextTokenIndex > notSelectedTokens.length) {
                    nextToken = notSelectedTokens[notSelectedTokens.length - 1];
                }
            }
        }
        else {
            nextToken = notSelectedTokens[0];
        }
        this._handleCurrentItemAfterDeletion(nextToken);
        this._tokenDeleting = true;
        if (this._selectedTokens.length) {
            this.fireDecoratorEvent("token-delete", { tokens: this._selectedTokens });
        }
        else {
            this.fireDecoratorEvent("token-delete", { tokens: [token] });
        }
    }
    async itemDelete(e) {
        const token = this.getTokenByRefId(e.detail.item.getAttribute("data-ui5-token-ref-id"));
        const tokensArray = this._tokens;
        // delay the token deletion in order to close the popover before removing token of the DOM
        if (tokensArray.length === 1) {
            const morePopover = this.getPopover();
            morePopover.addEventListener("ui5-close", () => {
                this.fireDecoratorEvent("token-delete", { tokens: [token] });
            }, {
                once: true,
            });
            this.open = false;
        }
        else {
            if (isPhone()) {
                this._deletedDialogItems.push(token);
            }
            else {
                this.fireDecoratorEvent("token-delete", { tokens: [token] });
            }
            const currentListItem = e.detail.item;
            const nextListItem = currentListItem.nextElementSibling;
            const previousListItem = currentListItem.previousElementSibling;
            const focusItem = nextListItem || previousListItem;
            if (focusItem) {
                await renderFinished();
                focusItem.focus();
            }
        }
    }
    handleBeforeClose() {
        if (!this._tokenDeleting && !this._preventCollapse) {
            this._preventCollapse = false;
            this.expanded = false;
        }
    }
    handleBeforeOpen() {
        const list = this._getList();
        const firstListItem = list.querySelectorAll("[ui5-li]")[0];
        list._itemNavigation.setCurrentItem(firstListItem);
        this.fireDecoratorEvent("before-more-popover-open");
    }
    handleAfterClose() {
        this.open = false;
        this._preventCollapse = false;
        this._focusedElementBeforeOpen = null;
    }
    handleDialogButtonPress(e) {
        const isOkButton = e.target.hasAttribute("data-ui5-tokenizer-dialog-ok-button");
        const confirm = !!isOkButton;
        if (confirm && this._deletedDialogItems.length) {
            this.fireDecoratorEvent("token-delete", { tokens: this._deletedDialogItems });
        }
        this.open = false;
    }
    _onkeydown(e) {
        const isCtrl = !!(e.metaKey || e.ctrlKey);
        if ((isCtrl && ["c", "x"].includes(e.key.toLowerCase())) || isDeleteShift(e) || isInsertCtrl(e)) {
            e.preventDefault();
            const isCut = e.key.toLowerCase() === "x" || isDeleteShift(e);
            const selectedTokens = this._tokens.filter(token => token.selected);
            const focusedToken = selectedTokens.find(token => token.focused);
            if (isCut) {
                const cutResult = this._fillClipboard(ClipboardDataOperation.cut, selectedTokens);
                focusedToken && this.deleteToken(focusedToken);
                return cutResult;
            }
            return this._fillClipboard(ClipboardDataOperation.copy, selectedTokens);
        }
        if (isCtrl && e.key.toLowerCase() === "i" && this._tokens.length > 0) {
            e.preventDefault();
            this._preventCollapse = true;
            this._focusedElementBeforeOpen = getFocusedElement();
            this.open = true;
        }
        if (isSpaceShift(e)) {
            e.preventDefault();
        }
        if (isSpace(e) || isSpaceCtrl(e)) {
            e.preventDefault();
            return this._handleTokenSelection(e, false);
        }
        if (isHomeShift(e) || isPageUpShift(e)) {
            this._handleHomeShift(e);
        }
        if (isEndShift(e) || isPageDownShift(e)) {
            this._handleEndShift(e);
        }
        this._handleItemNavigation(e, this._tokens);
    }
    _onPopoverListKeydown(e) {
        const isCtrl = !!(e.metaKey || e.ctrlKey);
        if ((isCtrl && e.key.toLowerCase() === "i") || isEscape(e)) {
            e.preventDefault();
            this.open = false;
            this._preventCollapse = true;
            this._focusedElementBeforeOpen && this._focusedElementBeforeOpen.focus();
            if (!this._focusedElementBeforeOpen) {
                this._focusLastToken();
            }
        }
        if (e.key.toLowerCase() === "f7") {
            e.preventDefault();
            const eventTarget = e.target;
            const activeElement = getActiveElement();
            if (activeElement?.part.value === "native-li") {
                eventTarget.shadowRoot.querySelector("[part=delete-button]").focus();
            }
            else {
                eventTarget.focus();
            }
        }
    }
    _handleItemNavigation(e, tokens) {
        const isCtrl = !!(e.metaKey || e.ctrlKey);
        const target = e.target;
        if (isLeftCtrl(e) || isRightCtrl(e) || isDownCtrl(e) || isUpCtrl(e)) {
            return this._handleArrowCtrl(e, target, tokens, isRightCtrl(e) || isDownCtrl(e));
        }
        if (isLeftShift(e) || isRightShift(e) || isUpShift(e) || isDownShift(e) || isLeftShiftCtrl(e) || isRightShiftCtrl(e)) {
            e.preventDefault();
            return this._handleArrowShift(target, tokens, (isRightShift(e) || isRightShiftCtrl(e) || isDownShift(e)));
        }
        if (isHome(e) || isEnd(e) || isHomeCtrl(e) || isEndCtrl(e)) {
            e.preventDefault();
            return this._handleHome(tokens, isEnd(e) || isEndCtrl(e));
        }
        if (isCtrl && e.key.toLowerCase() === "a") {
            e.preventDefault();
            return this._toggleTokenSelection(tokens);
        }
        if (isLeft(e) || isRight(e) || isUp(e) || isDown(e)) {
            e.preventDefault();
            const nextTokenIdx = this._calcNextTokenIndex(this._tokens.find(token => token.focused), tokens, (isRight(e) || isDown(e)));
            this._scrollToToken(tokens[nextTokenIdx]);
        }
    }
    _handleHome(tokens, endKeyPressed) {
        if (!tokens || !tokens.length) {
            return -1;
        }
        const index = endKeyPressed ? tokens.length - 1 : 0;
        tokens[index].focus();
    }
    _handleHomeShift(e) {
        const tokens = this._tokens;
        const target = e.target;
        const currentTokenIdx = tokens.indexOf(target);
        const previousSelectedTokens = [...this._selectedTokens];
        tokens.filter((token, index) => index <= currentTokenIdx).forEach(token => {
            token.selected = true;
        });
        const selectedTokensChanged = JSON.stringify(previousSelectedTokens) !== JSON.stringify(this._selectedTokens);
        if (selectedTokensChanged) {
            this.fireDecoratorEvent("selection-change", {
                tokens: this._selectedTokens,
            });
        }
        tokens[0].focus();
    }
    _handleEndShift(e) {
        const tokens = this._tokens;
        const target = e.target;
        const currentTokenIdx = tokens.indexOf(target);
        const previousSelectedTokens = [...this._selectedTokens];
        tokens.filter((token, index) => index >= currentTokenIdx).forEach(token => {
            token.selected = true;
        });
        const selectedTokensChanged = JSON.stringify(previousSelectedTokens) !== JSON.stringify(this._selectedTokens);
        if (selectedTokensChanged) {
            this.fireDecoratorEvent("selection-change", {
                tokens: this._selectedTokens,
            });
        }
        tokens[tokens.length - 1].focus();
    }
    _calcNextTokenIndex(focusedToken, tokens, backwards) {
        if (!tokens.length) {
            return -1;
        }
        const focusedTokenIndex = tokens.indexOf(focusedToken);
        let nextIndex = backwards ? (focusedTokenIndex + 1) : (focusedTokenIndex - 1);
        if (nextIndex >= tokens.length) {
            nextIndex = tokens.length - 1;
        }
        if (nextIndex < 0) {
            nextIndex = 0;
        }
        return nextIndex;
    }
    _handleArrowCtrl(e, focusedToken, tokens, backwards) {
        const nextIndex = this._calcNextTokenIndex(focusedToken, tokens, backwards);
        e.preventDefault();
        if (nextIndex === -1) {
            return;
        }
        setTimeout(() => {
            tokens[nextIndex].focus();
        }, 0);
        this._scrollToToken(tokens[nextIndex]);
    }
    _handleArrowShift(focusedToken, tokens, backwards) {
        const focusedTokenIndex = tokens.indexOf(focusedToken);
        const nextIndex = backwards ? (focusedTokenIndex + 1) : (focusedTokenIndex - 1);
        const previousSelectedTokens = [...this._selectedTokens];
        if (nextIndex === -1 || nextIndex === tokens.length) {
            return;
        }
        focusedToken.selected = true;
        tokens[nextIndex].selected = true;
        const selectedTokensChanged = JSON.stringify(previousSelectedTokens) !== JSON.stringify(this._selectedTokens);
        if (selectedTokensChanged) {
            this.fireDecoratorEvent("selection-change", {
                tokens: this._selectedTokens,
            });
        }
        tokens[nextIndex].focus();
        this._scrollToToken(tokens[nextIndex]);
    }
    _click(e) {
        if (e.metaKey || e.ctrlKey) {
            this.fireDecoratorEvent("selection-change", {
                tokens: this._selectedTokens,
            });
            return;
        }
        const targetToken = e.target;
        if (!e.shiftKey) {
            this._previousToken = targetToken;
        }
        let focusedToken = targetToken;
        if (this._previousToken) {
            focusedToken = this._previousToken;
        }
        else {
            this._previousToken = focusedToken;
        }
        if (e.shiftKey) {
            const tokensArray = this._tokens;
            const lastClickedIndex = tokensArray.indexOf(targetToken);
            const firstSelectedTokenIndex = tokensArray.indexOf(focusedToken);
            const start = Math.min(lastClickedIndex, firstSelectedTokenIndex);
            const end = Math.max(lastClickedIndex, firstSelectedTokenIndex);
            if (lastClickedIndex !== -1) {
                tokensArray.forEach((token, i) => {
                    token.selected = i >= start && i <= end;
                });
            }
            this.fireDecoratorEvent("selection-change", {
                tokens: this._selectedTokens,
            });
            return;
        }
        this._handleTokenSelection(e);
    }
    _onfocusin(e) {
        const target = e.target;
        this._lastFocusedToken = target;
        if (target && target.toBeDeleted) {
            this._tokenDeleting = true;
            return;
        }
        this.open = false;
        this.expanded = true;
        this._addTokenToNavigation(e.target);
    }
    _addTokenToNavigation(token) {
        this._scrollToEndOnExpand = false;
        this._itemNav.setCurrentItem(token);
    }
    _onfocusout(e) {
        const relatedTarget = e.relatedTarget;
        this._tokens.forEach(token => {
            token.forcedTabIndex = "-1";
        });
        this._itemNav._currentIndex = -1;
        this._skipTabIndex = true;
        if (!this.contains(relatedTarget)) {
            this._tokens[0].forcedTabIndex = "0";
            this._isFocusSetInternally = false;
            this._skipTabIndex = false;
        }
        if (!this._tokenDeleting && !this._preventCollapse) {
            this._preventCollapse = false;
            this.expanded = false;
        }
    }
    /**
     * Determines the DOM element to focus when the Tokenizer receives focus.
     * If the last-focused token is not overflown, focus is restored to it.
     * Otherwise, the focus defaults to the first visible token.
     */
    getFocusDomRef() {
        if (this._lastFocusedToken && !this.overflownTokens.includes(this._lastFocusedToken)) {
            this._itemNav._currentIndex = this.tokens.indexOf(this._lastFocusedToken);
            this._isFocusSetInternally = true;
            this.tokens[0].forcedTabIndex = "-1";
        }
        else {
            this._itemNav._currentIndex = 0;
        }
        return this._itemNav._getCurrentItem();
    }
    _toggleTokenSelection(tokens) {
        if (!tokens || !tokens.length) {
            return;
        }
        const tokensAreSelected = tokens.every(token => token.selected);
        tokens.forEach(token => { token.selected = !tokensAreSelected; });
        this.fireDecoratorEvent("selection-change", {
            tokens: this._selectedTokens,
        });
    }
    _handleTokenSelection(e, deselectAll = true) {
        const target = e.target;
        if (target.hasAttribute("ui5-token")) {
            const deselectTokens = deselectAll ? this._tokens : [];
            deselectTokens.forEach(token => {
                if (token !== target) {
                    token.selected = false;
                }
            });
            this.fireDecoratorEvent("selection-change", {
                tokens: this._selectedTokens,
            });
        }
    }
    get hasTokens() {
        return this._tokens.length > 0;
    }
    get showEffectiveClearAll() {
        return this.showClearAll && this.hasTokens && this.multiLine && !this.readonly;
    }
    _fillClipboard(shortcutName, tokens) {
        const tokensTexts = tokens.filter(token => token.selected).map(token => token.text).join("\r\n");
        const cutToClipboard = (e) => {
            navigator.clipboard.writeText(tokensTexts);
            e.preventDefault();
        };
        document.addEventListener(shortcutName, cutToClipboard);
        document.execCommand(shortcutName);
        document.removeEventListener(shortcutName, cutToClipboard);
    }
    /**
     * Scrolls the container of the tokens to its beginning.
     * This method is used by MultiInput and MultiComboBox.
     * @protected
     */
    scrollToStart() {
        if (this._scrollEnablement?.scrollContainer) {
            this._scrollEnablement?.scrollTo(0, 0);
        }
    }
    /**
     * Scrolls the container of the tokens to its end when expanded.
     * This method is used by MultiInput and MultiComboBox.
     * @protected
     */
    scrollToEnd() {
        const expandedTokenizerScrollWidth = this.contentDom && (this.effectiveDir !== "rtl" ? this.contentDom.scrollWidth : -this.contentDom.scrollWidth);
        if (this._scrollEnablement?.scrollContainer) {
            this._scrollEnablement?.scrollTo(expandedTokenizerScrollWidth, 0, 5, 10);
        }
    }
    /**
     * Scrolls token to the visible area of the container.
     * Adds 5 pixels to the scroll position to ensure padding and border visibility on both ends
     * For the last token, if its width is more than the needed space, scroll to the end without offset
     * @protected
     */
    _scrollToToken(token) {
        if (!this.contentDom) {
            return;
        }
        const tokenRect = token.getBoundingClientRect();
        const tokenContainerRect = this.contentDom.getBoundingClientRect();
        const oneSideBorderAndPaddingOffset = 5;
        const isLastToken = this._tokens.indexOf(token) === this._tokens.length - 1;
        if (isLastToken) {
            this.scrollToEnd();
            return;
        }
        if (tokenRect.left < tokenContainerRect.left) {
            this._scrollEnablement?.scrollTo(this.contentDom.scrollLeft - (tokenContainerRect.left - tokenRect.left + oneSideBorderAndPaddingOffset), 0);
        }
        else if (tokenRect.right > tokenContainerRect.right) {
            this._scrollEnablement?.scrollTo(this.contentDom.scrollLeft + (tokenRect.right - tokenContainerRect.right + oneSideBorderAndPaddingOffset), 0);
        }
    }
    _getList() {
        return this.getPopover().querySelector("[ui5-list]");
    }
    get _tokens() {
        return this.getSlottedNodes("tokens");
    }
    get morePopoverOpener() {
        // return this.opener ? this : this.opener;
        if (this.opener) {
            return this.opener;
        }
        return this;
    }
    get _nMoreText() {
        if (!this._nMoreCount) {
            return;
        }
        if (this._getVisibleTokens().length) {
            return Tokenizer_1.i18nBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS, this._nMoreCount);
        }
        return Tokenizer_1.i18nBundle.getText(TOKENIZER_SHOW_ALL_ITEMS, this._nMoreCount);
    }
    get _clearAllText() {
        return Tokenizer_1.i18nBundle.getText(TOKENIZER_CLEAR_ALL);
    }
    get showNMore() {
        return !this.expanded && !!this.overflownTokens.length;
    }
    get contentDom() {
        return this.shadowRoot.querySelector(".ui5-tokenizer--content");
    }
    get moreLink() {
        return this.shadowRoot.querySelector(".ui5-tokenizer-more-text");
    }
    get tokenizerLabel() {
        const effectiveLabelText = getEffectiveAriaLabelText(this);
        return effectiveLabelText || Tokenizer_1.i18nBundle.getText(TOKENIZER_ARIA_LABEL);
    }
    get _okButtonText() {
        return Tokenizer_1.i18nBundle.getText(TOKENIZER_DIALOG_OK_BUTTON);
    }
    get _cancelButtonText() {
        return Tokenizer_1.i18nBundle.getText(TOKENIZER_DIALOG_CANCEL_BUTTON);
    }
    get tokenizerAriaDescription() {
        return getEffectiveAriaLabelText(this) ? Tokenizer_1.i18nBundle.getText(TOKENIZER_ARIA_LABEL) : undefined;
    }
    get _ariaDisabled() {
        return this.disabled || undefined;
    }
    get _ariaReadonly() {
        return this.readonly || undefined;
    }
    get morePopoverTitle() {
        return getEffectiveAriaLabelText(this) || Tokenizer_1.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
    }
    get overflownTokens() {
        if (!this.contentDom) {
            return [];
        }
        const tokensArray = this._tokens;
        // Reset the overflow prop of the tokens first in order
        // to use their dimensions for calculation because already
        // hidden tokens are set to 'display: none'
        tokensArray.forEach(token => {
            token.overflows = false;
        });
        return tokensArray.filter(token => {
            const parentRect = this.contentDom.getBoundingClientRect();
            const tokenRect = token.getBoundingClientRect();
            const tokenEnd = Number(tokenRect.right.toFixed(2));
            const parentEnd = Number(parentRect.right.toFixed(2));
            const tokenStart = Number(tokenRect.left.toFixed(2));
            const parentStart = Number(parentRect.left.toFixed(2));
            token.overflows = !this.expanded && ((tokenStart < parentStart) || (tokenEnd > parentEnd));
            return token.overflows;
        });
    }
    get _isPhone() {
        return isPhone();
    }
    get _selectedTokens() {
        return this._tokens.filter(token => token.selected);
    }
    get _nMoreListMode() {
        if (this.readonly || this.disabled) {
            return ListSelectionMode.None;
        }
        return ListSelectionMode.Delete;
    }
    get styles() {
        return {
            popover: {
                "min-width": this.popoverMinWidth ? `${this.popoverMinWidth}px` : `${this.getBoundingClientRect().width}px`,
            },
        };
    }
    /**
     * @protected
     */
    _focusLastToken() {
        const tokens = this._tokens;
        if (tokens.length === 0) {
            return;
        }
        const lastToken = tokens[tokens.length - 1];
        lastToken.focus();
    }
    getPopover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    getTokenByRefId(refId) {
        return this._tokens.find(token => token._id === refId);
    }
};
__decorate([
    property({ type: Boolean })
], Tokenizer.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], Tokenizer.prototype, "multiLine", void 0);
__decorate([
    property({ type: String })
], Tokenizer.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], Tokenizer.prototype, "showClearAll", void 0);
__decorate([
    property({ type: Boolean })
], Tokenizer.prototype, "disabled", void 0);
__decorate([
    property()
], Tokenizer.prototype, "accessibleName", void 0);
__decorate([
    property()
], Tokenizer.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Boolean })
], Tokenizer.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean })
], Tokenizer.prototype, "open", void 0);
__decorate([
    property({
        converter: DOMReferenceConverter,
    })
], Tokenizer.prototype, "opener", void 0);
__decorate([
    property({ type: Number })
], Tokenizer.prototype, "popoverMinWidth", void 0);
__decorate([
    property({ type: Boolean })
], Tokenizer.prototype, "preventInitialFocus", void 0);
__decorate([
    property({ type: Boolean })
], Tokenizer.prototype, "preventPopoverOpen", void 0);
__decorate([
    property({ type: Boolean })
], Tokenizer.prototype, "hidePopoverArrow", void 0);
__decorate([
    property({ type: Number })
], Tokenizer.prototype, "_nMoreCount", void 0);
__decorate([
    property({ type: Number })
], Tokenizer.prototype, "_tokensCount", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
        individualSlots: true,
        invalidateOnChildChange: {
            properties: ["text"],
            slots: false,
        },
    })
], Tokenizer.prototype, "tokens", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Tokenizer, "i18nBundle", void 0);
Tokenizer = Tokenizer_1 = __decorate([
    customElement({
        tag: "ui5-tokenizer",
        languageAware: true,
        formAssociated: true,
        renderer: jsxRenderer,
        template: TokenizerTemplate,
        styles: [
            TokenizerCss,
            ResponsivePopoverCommonCss,
            SuggestionsCss,
            TokenizerPopoverCss,
        ],
    })
    /**
     * Fired when tokens are being deleted (delete icon, delete or backspace is pressed)
     * @param {Array} tokens An array containing the deleted tokens.
     * @public
     */
    ,
    event("token-delete", {
        bubbles: true,
    })
    /**
     * Fired when token selection is changed by user interaction
     *
     * @param {Array<Token>} tokens An array of the selected items.
     * @public
     */
    ,
    event("selection-change", {
        bubbles: true,
    })
    /**
     * Fired when nMore link is pressed.
     * @private
     */
    ,
    event("show-more-items-press", {
        bubbles: true,
    })
    /**
     * Fired before nMore Popover is opened.
     * @private
     */
    ,
    event("before-more-popover-open", {
        bubbles: true,
    })
], Tokenizer);
const getTokensCountText = (iTokenCount) => {
    const tokenCountMap = {
        0: TOKENIZER_ARIA_CONTAIN_TOKEN,
        1: TOKENIZER_ARIA_CONTAIN_ONE_TOKEN,
    };
    if (iTokenCount in tokenCountMap) {
        return Tokenizer.i18nBundle.getText(tokenCountMap[iTokenCount]);
    }
    return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS, iTokenCount);
};
Tokenizer.define();
export default Tokenizer;
export { getTokensCountText };
export { ClipboardDataOperation };
//# sourceMappingURL=Tokenizer.js.map