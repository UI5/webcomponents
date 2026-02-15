var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MultiComboBox_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isShow, isDown, isUp, isSpace, isSpaceCtrl, isSpaceShift, isRight, isLeft, isHome, isEnd, isTabNext, isTabPrevious, isUpShift, isDownShift, isLeftCtrl, isRightCtrl, isUpCtrl, isDownCtrl, isHomeCtrl, isEndCtrl, isCtrlA, isInsertShift, isBackSpace, isDelete, isEscape, isEnter, isCtrlAltF8, } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isPhone, isAndroid, isFirefox, isMac, } from "@ui5/webcomponents-base/dist/Device.js";
import { attachListeners } from "@ui5/webcomponents-base/dist/util/valueStateNavigation.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import { getAssociatedLabelForTexts, getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import arraysAreEqual from "@ui5/webcomponents-base/dist/util/arraysAreEqual.js";
import { submitForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import MultiComboBoxItem, { isInstanceOfMultiComboBoxItem } from "./MultiComboBoxItem.js";
import MultiComboBoxItemGroup, { isInstanceOfMultiComboBoxItemGroup } from "./MultiComboBoxItemGroup.js";
import ListItemGroup from "./ListItemGroup.js";
import Tokenizer, { getTokensCountText } from "./Tokenizer.js";
import Token from "./Token.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import ToggleButton from "./ToggleButton.js";
import * as Filters from "./Filters.js";
import Button from "./Button.js";
import { VALUE_STATE_SUCCESS, VALUE_STATE_ERROR, VALUE_STATE_WARNING, VALUE_STATE_INFORMATION, VALUE_STATE_TYPE_SUCCESS, VALUE_STATE_TYPE_INFORMATION, VALUE_STATE_TYPE_ERROR, VALUE_STATE_TYPE_WARNING, VALUE_STATE_LINK, VALUE_STATE_LINKS, VALUE_STATE_LINK_MAC, VALUE_STATE_LINKS_MAC, INPUT_SUGGESTIONS_TITLE, SELECT_OPTIONS, SHOW_SELECTED_BUTTON, MULTICOMBOBOX_DIALOG_OK_BUTTON, MULTICOMBOBOX_DIALOG_CANCEL_BUTTON, COMBOBOX_AVAILABLE_OPTIONS, VALUE_STATE_ERROR_ALREADY_SELECTED, MCB_SELECTED_ITEMS, INPUT_CLEAR_ICON_ACC_NAME, FORM_MIXED_TEXTFIELD_REQUIRED, } from "./generated/i18n/i18n-defaults.js";
// Templates
import MultiComboBoxTemplate from "./MultiComboBoxTemplate.js";
// Styles
import multiCbxStyles from "./generated/themes/MultiComboBox.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";
import MultiComboBoxPopover from "./generated/themes/MultiComboBoxPopover.css.js";
import CheckBox from "./CheckBox.js";
import Input from "./Input.js";
import SuggestionItem from "./SuggestionItem.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-multi-combobox` component consists of a list box with items and a text field allowing the user to either type a value directly into the text field, or choose from the list of existing items.
 *
 * The drop-down list is used for selecting and filtering values, it enables users to select one or more options from a predefined list. The control provides an editable input field to filter the list, and a dropdown arrow to expand/collapse the list of available options.
 * The options in the list have checkboxes that permit multi-selection. Entered values are displayed as tokens.
 * ### Structure
 * The `ui5-multi-combobox` consists of the following elements:
 *
 * -  Tokenizer - a list of tokens with selected options.
 * -  Input field - displays the selected option/s as token/s. Users can type to filter the list.
 * -  Drop-down arrow - expands\collapses the option list.
 * -  Option list - the list of available options.
 *
 * ### Keyboard Handling
 *
 * The `ui5-multi-combobox` provides advanced keyboard handling.
 *
 * #### Picker
 * If the `ui5-multi-combobox` is focused,
 * you can open or close the drop-down by pressing [F4], [Alt] + [Up] or [Alt] + [Down] keys.
 * Once the drop-down is opened, you can use the `UP` and `DOWN` arrow keys
 * to navigate through the available options and select one by pressing the `Space` or `Enter` keys.
 * [Ctrl]+[Alt]+[F8] or [Command]+[Option]+[F8] - Focuses the first link in the value state message, if available. Pressing [Tab] moves the focus to the next link in the value state message, or closes the value state message if there are no more links.
 *
 * #### Tokens
 *
 * -  Left/Right arrow keys - moves the focus selection form the currently focused token to the previous/next one (if available).
 * -  Delete -  deletes the token and focuses the previous token.
 * -  Backspace -  deletes the token and focus the next token.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MultiComboBox.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.11.0
 * @csspart token-\{index\} - Used to style each token(where `token-0` corresponds to the first item)
 */
let MultiComboBox = MultiComboBox_1 = class MultiComboBox extends UI5Element {
    get formValidityMessage() {
        return MultiComboBox_1.i18nBundle.getText(FORM_MIXED_TEXTFIELD_REQUIRED);
    }
    get formValidity() {
        const selectedItems = (this.items || []).filter(item => item.selected);
        return { valueMissing: this.required && !this.value && !selectedItems.length };
    }
    async formElementAnchor() {
        return this.getFocusDomRefAsync();
    }
    get formFormattedValue() {
        const selectedItems = (this.items || []).filter(item => item.selected);
        if (selectedItems.length && this.name) {
            const formData = new FormData();
            formData.append(this.name, this.value);
            for (let i = 0; i < selectedItems.length; i++) {
                formData.append(this.name, selectedItems[i].text);
            }
            return formData;
        }
        return this.value;
    }
    constructor() {
        super();
        /**
         * Defines the value of the component.
         *
         * **Note:** The property is updated upon typing.
         * @default ""
         * @formEvents change input
         * @formProperty
         * @public
         */
        this.value = "";
        /**
         * Defines whether the value will be autcompleted to match an item
         * @default false
         * @public
         * @since 1.4.0
         */
        this.noTypeahead = false;
        /**
         * Defines if the user input will be prevented, if no matching item has been found
         * @default false
         * @public
         */
        this.noValidation = false;
        /**
         * Defines whether the component is in disabled state.
         *
         * **Note:** A disabled component is completely noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines the value state of the component.
         * @default "None"
         * @public
         */
        this.valueState = "None";
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
         * Defines whether the component is required.
         * @default false
         * @public
         * @since 1.0.0-rc.5
         */
        this.required = false;
        /**
         * Indicates whether a loading indicator should be shown in the picker.
         * @default false
         * @public
         */
        this.loading = false;
        /**
         * Defines the filter type of the component.
         * @default "StartsWithPerTerm"
         * @public
         */
        this.filter = "StartsWithPerTerm";
        /**
         * Defines whether the clear icon of the multi-combobox will be shown.
         * @default false
         * @public
         * @since 1.20.1
         */
        this.showClearIcon = false;
        /**
         * Determines if the select all checkbox is visible on top of suggestions.
         * @default false
         * @public
         */
        this.showSelectAll = false;
        this._effectiveValueState = "None";
        /**
         * Indicates whether the value state message popover is open.
         * @private
         */
        this.valueStateOpen = false;
        /**
         * Indicates whether the Tokenizer n-more popover is open.
         * @private
         */
        this.tokenizerOpen = false;
        /**
         * Indicates whether the items picker is open.
         * @public
         * @since 2.9.0
         */
        this.open = false;
        this._valueBeforeOpen = this.value;
        this.filterSelected = false;
        this.focused = false;
        this._tokenizerFocused = false;
        this._iconPressed = false;
        this._inputWidth = 0;
        this._listWidth = 0;
        this._performingSelectionTwice = false;
        this._allSelected = false;
        this._effectiveShowClearIcon = false;
        this._dialogInputValueState = "None";
        /**
         * Indicates whether the tokenizer has tokens
         * @private
         */
        this.tokenizerAvailable = false;
        /**
         * Indicates whether link navigation is being handled.
         * @private
         * @since 2.11.0
         * @default false
         */
        this._handleLinkNavigation = false;
        /**
         * @private
         */
        this._linksListenersArray = [];
        /**
         * Indicates whether IME composition is currently active
         * @default false
         * @private
         */
        this._isComposing = false;
        this._filteredItems = [];
        this.selectedItems = [];
        this._previouslySelectedItems = [];
        this.selectedValues = [];
        this._itemsBeforeOpen = [];
        this._inputLastValue = "";
        this._deleting = false;
        this._validationTimeout = null;
        this._handleResizeBound = this._handleResize.bind(this);
        this.valueBeforeAutoComplete = "";
        this._lastValue = this.getAttribute("value") || "";
        this.currentItemIdx = -1;
        this._valueStateLinks = [];
        this._suppressNextLiveChange = false;
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResizeBound);
        this._enableComposition();
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResizeBound);
        this._removeLinksEventListeners();
        this._composition?.removeEventListeners();
    }
    _handleResize() {
        this._inputWidth = this.offsetWidth;
    }
    _handleMobileInput(e) {
        if (!this.open || this.readonly) {
            return;
        }
        const target = e.target;
        const value = target.value;
        if (!this.noValidation && !this._filterItems(value).length) {
            this._dialogInputValueState = ValueState.Negative;
        }
        else {
            this._dialogInputValueState = this.valueState;
        }
        if (this.filterSelected) {
            this.filterSelected = false;
        }
        this.value = value;
        this._shouldFilterItems = true;
        this.valueBeforeAutoComplete = value;
        this.fireDecoratorEvent("input");
    }
    _inputChange() {
        if (!this._clearingValue && this._lastValue !== this.value) {
            this._lastValue = this.value;
            this.fireDecoratorEvent("change");
        }
    }
    _onMobileInputKeydown(e) {
        if (!isEnter(e)) {
            return;
        }
        const { value } = e.target;
        const matchingItem = this._getItems().find(item => item.text === value);
        if (!matchingItem) {
            return;
        }
        const initiallySelected = matchingItem?.selected;
        const changePrevented = this.fireSelectionChange();
        if (!changePrevented) {
            matchingItem.selected = !initiallySelected;
            this._getResponsivePopover().preventFocusRestore = false;
            this.open = false;
            this.value = "";
        }
    }
    _toggleTokenizerPopover() {
        this.tokenizerOpen = false;
        this.open = !this.open;
    }
    togglePopoverByDropdownIcon() {
        this._shouldFilterItems = false;
        this.open = !this.open;
        this.tokenizerOpen = false;
    }
    _showFilteredItems() {
        this.filterSelected = true;
        this._showMorePressed = true;
        this._tokenizer._scrollToEndOnExpand = true;
        this._toggleTokenizerPopover();
    }
    filterSelectedItems(e) {
        this.filterSelected = e.target.pressed;
        const selectedItems = this._filteredItems.filter(item => item.selected);
        this.selectedItems = this._getItems().filter((item, idx, allItems) => MultiComboBox_1._groupItemFilter(item, ++idx, allItems, selectedItems) || selectedItems.indexOf(item) !== -1);
    }
    get _showAllItemsButtonPressed() {
        return this.filterSelected;
    }
    get _inputDom() {
        return this.shadowRoot.querySelector("#ui5-multi-combobox-input");
    }
    _inputLiveChange(e) {
        // This ensures proper input clearing after Enter-based token creation during composition
        if (this._suppressNextLiveChange) {
            this._suppressNextLiveChange = false;
            return;
        }
        const input = e.target;
        const value = input.value;
        const filteredItems = this._filterItems(value);
        this._shouldFilterItems = true;
        if (this.filterSelected) {
            this.filterSelected = false;
        }
        if (this._validationTimeout) {
            if (this._filterItems(value).length) {
                this._updateValueState(this._effectiveValueState);
                this._validationTimeout = null;
            }
            else {
                return;
            }
        }
        // Save the original value state before setting validation error
        if (this.valueState !== ValueState.Negative) {
            this._effectiveValueState = this.valueState;
        }
        if (!this._isComposing && !filteredItems.length && value && !this.noValidation) {
            this._updateValueState(ValueState.Negative);
            this._shouldAutocomplete = false;
        }
        else if ((filteredItems.length || !value) && this.valueState === ValueState.Negative) {
            this._updateValueState(this._effectiveValueState);
        }
        if (!this._isComposing) {
            this._inputLastValue = input.value;
        }
        this.value = input.value;
        this._filteredItems = filteredItems;
        if (!isPhone()) {
            if (filteredItems.length === 0) {
                this.open = false;
            }
            else {
                this.open = true;
            }
        }
        this.fireDecoratorEvent("input");
    }
    _updateValueState(newValueState) {
        const oldValueState = this.valueState;
        if (oldValueState !== newValueState) {
            const eventPrevented = !this.fireDecoratorEvent("value-state-change", {
                valueState: newValueState,
            });
            if (!eventPrevented) {
                this.valueState = newValueState;
            }
        }
    }
    _tokenDelete(e) {
        this._previouslySelectedItems = this._getSelectedItems();
        const token = e.detail.tokens;
        const deletingItems = this._getItems().filter(item => token.some(t => t.getAttribute("data-ui5-id") === item._id));
        deletingItems.forEach(item => {
            item.selected = false;
        });
        this._deleting = true;
        this._preventTokenizerToggle = true;
        this.focus();
        const changePrevented = this.fireSelectionChange();
        if (changePrevented) {
            this._revertSelection();
        }
    }
    get _getPlaceholder() {
        if (this._getSelectedItems().length) {
            return "";
        }
        return this.placeholder || "";
    }
    // If the input is focused and the cursor is at the beginning/end of the input,
    // focus the last token if the direction is LTR/ RTL
    get _shouldFocusLastToken() {
        const inputDomRef = this._inputDom;
        const cursorPosition = inputDomRef.selectionStart || 0;
        const isTextSelected = ((inputDomRef.selectionEnd || 0) - cursorPosition) > 0;
        return cursorPosition === 0 && !isTextSelected;
    }
    _handleArrowKey(direction) {
        if (this._shouldFocusLastToken && this.effectiveDir === direction) {
            this._tokenizer._focusLastToken();
        }
    }
    _handleArrowLeft() {
        this._handleArrowKey("ltr");
    }
    _handleArrowRight() {
        this._handleArrowKey("rtl");
    }
    _onPopoverFocusOut() {
        if (!isPhone() || !this._handleLinkNavigation) {
            this._tokenizer.expanded = this.open;
        }
    }
    _tokenizerFocusOut(e) {
        this._tokenizerFocused = false;
        const tokensCount = this._tokenizer.tokens.length;
        const selectedTokens = this._selectedTokensCount;
        const lastTokenBeingDeleted = tokensCount - 1 === 0 && this._deleting;
        const allTokensAreBeingDeleted = selectedTokens === tokensCount && this._deleting;
        const relatedTarget = e.relatedTarget;
        if (!this.shadowRoot?.contains(relatedTarget)) {
            this._tokenizer.tokens.forEach(token => {
                token.selected = false;
            });
            this._tokenizer.expanded = this._preventTokenizerToggle ? this._tokenizer.expanded : false;
        }
        if (allTokensAreBeingDeleted || lastTokenBeingDeleted) {
            setTimeout(() => {
                if (!isPhone()) {
                    this._inputDom.focus();
                }
                this._deleting = false;
            }, 0);
        }
    }
    _tokenizerFocusIn() {
        this._tokenizerFocused = true;
        this.focused = false;
    }
    _onkeydown(e) {
        const isArrowDownCtrl = isDownCtrl(e);
        const isCtrl = e.metaKey || e.ctrlKey;
        if (isShow(e) && !this.disabled) {
            this._handleShow(e);
            return;
        }
        if (isDownShift(e) || isUpShift(e)) {
            e.preventDefault();
            return;
        }
        if (isUp(e) || isDown(e) || isUpCtrl(e) || isArrowDownCtrl) {
            this._handleArrowNavigation(e, isArrowDownCtrl);
            return;
        }
        // CTRL + Arrow Down navigation is performed by the ItemNavigation module of the List,
        // here we only implement the text selection of the selected item
        if (isArrowDownCtrl && !this.open) {
            setTimeout(() => this._inputDom.setSelectionRange(0, this._inputDom.value.length), 0);
        }
        if (isLeftCtrl(e) || isRightCtrl(e)) {
            this._handleArrowCtrl(e);
            return;
        }
        if (isInsertShift(e)) {
            this._handleInsertPaste(e);
            return;
        }
        if (isCtrl && e.key.toLowerCase() === "i" && this._tokenizer.tokens.length > 0) {
            e.preventDefault();
            this._toggleTokenizerPopover();
        }
        if (isSpaceShift(e)) {
            e.preventDefault();
        }
        if (isCtrlAltF8(e)) {
            return this._handleCtrlALtF8();
        }
        if (e.key === "ArrowLeft"
            || e.key === "ArrowRight"
            || e.key === "Show"
            || e.key === "PageUp"
            || e.key === "PageDown"
            || e.key === "Backspace"
            || e.key === "Escape"
            || e.key === "Home"
            || e.key === "End"
            || e.key === "Tab"
            || e.key === "ArrowDown"
            || e.key === "Enter") {
            this[`_handle${e.key}`](e);
        }
        this._shouldAutocomplete = !this.noTypeahead && !(isBackSpace(e) || isDelete(e) || isEscape(e) || isEnter(e));
    }
    _selectItems(matchingItems) {
        this._previouslySelectedItems = this._getSelectedItems();
        matchingItems.forEach(item => {
            item.selected = true;
            this.value = "";
            const changePrevented = this.fireSelectionChange();
            if (changePrevented) {
                this._revertSelection();
            }
        });
    }
    async _handlePaste(e) {
        if (this.readonly) {
            return;
        }
        e.preventDefault();
        const pastedText = await navigator.clipboard.readText();
        document.execCommand("insertText", true, pastedText ?? "");
        const inputEvent = new Event("input", {
            bubbles: true,
            cancelable: true,
        });
        // Dispatch it
        this._innerInput.dispatchEvent(inputEvent);
        if (!pastedText) {
            return;
        }
        this._handleTokenCreationUponPaste(pastedText, e);
    }
    _handleTokenCreationUponPaste(pastedText, e) {
        const separatedText = pastedText.split(/\r\n|\r|\n|\t/g).filter(t => !!t);
        const matchingItems = this._getItems().filter(item => !item.isGroupItem && !item.selected && separatedText.includes(item.text));
        if (matchingItems.length > 1) {
            e.preventDefault();
            this._selectItems(matchingItems);
        }
    }
    async _handleInsertPaste(e) {
        if (this.readonly || isFirefox()) {
            return;
        }
        e.preventDefault();
        const pastedText = await navigator.clipboard.readText();
        document.execCommand("insertText", true, pastedText ?? "");
        const inputEvent = new Event("input", {
            bubbles: true,
            cancelable: true,
        });
        // Dispatch it
        this._innerInput.dispatchEvent(inputEvent);
        if (!pastedText) {
            return;
        }
        this._handleTokenCreationUponPaste(pastedText, e);
    }
    _handleShow(e) {
        const items = this._getItems();
        const selectedItem = this._getSelectedItems()[0];
        const focusedToken = this._tokenizer.tokens.find(token => token.focused);
        const value = this.value;
        const matchingItem = this._getItems().find(item => item.text?.localeCompare(value, undefined, { sensitivity: "base" }) === 0);
        e.preventDefault();
        if (this.readonly) {
            return;
        }
        this._isOpenedByKeyboard = true;
        this._shouldFilterItems = false;
        this._filteredItems = this._getItems();
        this._toggleTokenizerPopover();
        if (!focusedToken && matchingItem) {
            this._itemToFocus = matchingItem;
            return;
        }
        if (selectedItem && !focusedToken) {
            this._itemToFocus = selectedItem;
        }
        else if (focusedToken && e.target === focusedToken) {
            this._itemToFocus = items.find(item => item.text === focusedToken.text);
        }
        else {
            this._itemToFocus = items.find(item => isInstanceOfMultiComboBoxItem(item));
        }
    }
    _handlePageUp(e) {
        e.preventDefault();
    }
    _handlePageDown(e) {
        e.preventDefault();
    }
    _handleBackspace(e) {
        if (e.target.value === "") {
            e.preventDefault();
            this._tokenizer._focusLastToken();
        }
    }
    _handleEscape() {
        const innerInput = this._innerInput;
        const isAutoCompleted = ((innerInput.selectionEnd || 0) - (innerInput.selectionStart || 0)) > 0;
        if (isAutoCompleted) {
            this.value = this.valueBeforeAutoComplete;
        }
        if (!this.noValidation || (!this.open && this.noValidation)) {
            this.value = this._lastValue;
        }
    }
    _handleHome(e) {
        const shouldFocusToken = this._isFocusInside && e.target.selectionStart === 0 && this._tokenizer.tokens.length > 0;
        if (shouldFocusToken) {
            e.preventDefault();
            this._tokenizer.tokens[0].focus();
        }
    }
    _handleEnd(e) {
        const tokens = this._tokenizer.tokens;
        const lastTokenIdx = tokens.length - 1;
        const shouldFocusInput = e.target === tokens[lastTokenIdx] && tokens[lastTokenIdx] === this.shadowRoot.activeElement;
        if (shouldFocusInput) {
            e.preventDefault();
            this._inputDom.focus();
        }
    }
    _handleTab() {
        this.open = false;
    }
    _handleSelectAll() {
        const filteredItems = this._getItems().filter(item => item._isVisible && !item.isGroupItem);
        const allItemsSelected = filteredItems.every(item => item.selected);
        this._previouslySelectedItems = filteredItems.filter(item => item.selected).map(item => item);
        filteredItems.forEach(item => {
            item.selected = !allItemsSelected;
        });
        const changePrevented = this.fireSelectionChange();
        if (changePrevented) {
            this._revertSelection();
        }
    }
    _onListHeaderKeydown(e) {
        const isArrowDown = isDown(e);
        const isArrowUp = isUp(e);
        const isSelectAllFocused = e.target.classList.contains("ui5-mcb-select-all-checkbox");
        if (isTabNext(e) || isTabPrevious(e)) {
            this._onItemTab();
            return;
        }
        e.preventDefault();
        if (isArrowDown || isDownCtrl(e)) {
            if (this.showSelectAll && !isSelectAllFocused) {
                return this._getResponsivePopover().querySelector(".ui5-mcb-select-all-checkbox").focus();
            }
            this._handleArrowDown();
        }
        if (isArrowUp || isUpCtrl(e)) {
            if (e.target === this.valueStateHeader || (this.showSelectAll && isSelectAllFocused)) {
                this._shouldAutocomplete = true;
                return this._inputDom.focus();
            }
        }
    }
    _handleSelectAllCheckboxClick(e) {
        if (!this.filterSelected) {
            this._handleSelectAll();
            this.filterSelected = false;
        }
        else {
            this._previouslySelectedItems = this._getSelectedItems();
            this.selectedItems?.filter(item => !item.isGroupItem).forEach(item => {
                item.selected = e.target.checked;
            });
            if (!e.target.checked) {
                this.filterSelected = false;
            }
            const changePrevented = this.fireSelectionChange();
            if (changePrevented) {
                this._revertSelection();
            }
        }
    }
    _onItemKeydown(e) {
        const isFirstItemGroup = this.list?.getSlottedNodes("items")[1] === e.target && this.list?.getSlottedNodes("items")[0].hasAttribute("ui5-li-group");
        const isFirstItem = this.list?.getSlottedNodes("items")[0] === e.target || isFirstItemGroup;
        const isArrowUp = isUp(e) || isUpCtrl(e);
        if (this.hasValueStateMessage && !this.valueStateHeader) {
            this._setValueStateHeader();
        }
        if (isTabNext(e) || isTabPrevious(e)) {
            this._onItemTab();
            return;
        }
        if (isHomeCtrl(e)) {
            this.list?._itemNavigation._handleHome();
            this.list?.getSlottedNodes("items")[this.list?._itemNavigation._currentIndex].focus();
        }
        if (isEndCtrl(e)) {
            this.list?._itemNavigation._handleEnd();
            this.list?.getSlottedNodes("items")[this.list?._itemNavigation._currentIndex].focus();
        }
        e.preventDefault();
        if (isCtrlAltF8(e)) {
            return this._handleCtrlALtF8();
        }
        if (isDownShift(e) || isUpShift(e)) {
            this._handleItemRangeSelection(e);
            return;
        }
        if ((isUpCtrl(e)) && !isFirstItem) {
            this.list?._itemNavigation._handleUp();
            this.list?.getSlottedNodes("items")[this.list?._itemNavigation._currentIndex].focus();
        }
        if (isDownCtrl(e)) {
            this.list?._itemNavigation._handleDown();
            this.list?.getSlottedNodes("items")[this.list?._itemNavigation._currentIndex].focus();
        }
        if (isShow(e)) {
            this._toggleTokenizerPopover();
        }
        if (isCtrlA(e)) {
            this._handleSelectAll();
            return;
        }
        if (isFirstItem && isArrowUp) {
            if (this.showSelectAll) {
                if (isFirstItemGroup) {
                    this.list?.getSlottedNodes("items")[0].focus();
                    return;
                }
                this._getResponsivePopover().querySelector(".ui5-mcb-select-all-checkbox").focus();
            }
            else {
                this._inputDom.focus();
                this._shouldAutocomplete = true;
            }
        }
    }
    _handleArrowCtrl(e) {
        const input = this._inputDom;
        const isArrowLeft = isLeftCtrl(e);
        if (isArrowLeft && input.selectionStart === 0 && input.selectionEnd === 0) {
            e.preventDefault();
        }
        if (isArrowLeft && ((input.selectionEnd || 0) - (input.selectionStart || 0) > 0)) {
            input.setSelectionRange(0, 0);
        }
    }
    _onItemTab() {
        this._getResponsivePopover().preventFocusRestore = true;
        this._inputDom.focus();
        this.open = false;
        this._tokenizer.expanded = false;
    }
    _handleArrowNavigation(e, isDownControl) {
        const isArrowDown = isDownControl || isDown(e);
        const hasSuggestions = this._getItems().length;
        e.preventDefault();
        if (this.hasValueStateMessage && !this.valueStateHeader) {
            this._setValueStateHeader();
        }
        if (isArrowDown && this.open) {
            if (this.showSelectAll) {
                this._getResponsivePopover().querySelector(".ui5-mcb-select-all-checkbox").focus();
                return;
            }
        }
        if (isArrowDown && hasSuggestions) {
            this._handleArrowDown();
        }
        if (!isArrowDown && !this.open && !this.readonly) {
            this._navigateToPrevItem();
        }
    }
    async _handleArrowDown() {
        const firstListItem = this.list?.getSlottedNodes("items")[0];
        const focusRef = firstListItem?.hasAttribute("ui5-mcb-item-group") ? firstListItem.getFocusDomRef() : firstListItem;
        if (this.open) {
            firstListItem && focusRef && this.list?._itemNavigation.setCurrentItem(focusRef);
            this.value = this.valueBeforeAutoComplete || this.value;
            // wait item navigation to apply correct tabindex
            await renderFinished();
            firstListItem?.focus();
        }
        else if (!this.readonly) {
            this._navigateToNextItem();
        }
    }
    _handleCtrlALtF8() {
        const links = this.linksInAriaValueStateHiddenText;
        if (links.length > 0) {
            links[0].focus();
        }
        this._handleLinkNavigation = true;
    }
    _handleItemRangeSelection(e) {
        const items = this._getItems();
        const listItems = this.list?.getSlottedNodes("items");
        const currentItemIdx = Number(listItems?.indexOf(e.target));
        const nextItemIdx = currentItemIdx + 1;
        const prevItemIdx = currentItemIdx - 1;
        this._previouslySelectedItems = this._getSelectedItems();
        if (isDownShift(e) && items[nextItemIdx]) {
            items[nextItemIdx].selected = items[currentItemIdx].selected;
            items[nextItemIdx].focus();
        }
        if (isUpShift(e) && items[prevItemIdx]) {
            items[prevItemIdx].selected = items[currentItemIdx].selected;
            items[prevItemIdx].focus();
        }
        const changePrevented = this.fireSelectionChange();
        if (changePrevented) {
            this._revertSelection();
        }
    }
    _navigateToNextItem() {
        const items = this._getItems();
        const itemsCount = items.length;
        const previousItemIdx = this.currentItemIdx;
        if (previousItemIdx > -1 && items[previousItemIdx].text !== this.value) {
            this.currentItemIdx = -1;
        }
        if (previousItemIdx >= itemsCount - 1) {
            return;
        }
        let currentItem = this._getItems()[++this.currentItemIdx];
        while ((this.currentItemIdx < itemsCount - 1 && currentItem.selected) || currentItem.isGroupItem) {
            currentItem = this._getItems()[++this.currentItemIdx];
        }
        if (currentItem.selected === true || currentItem.isGroupItem) {
            this.currentItemIdx = previousItemIdx;
            return;
        }
        this.value = currentItem.text;
        this._innerInput.value = currentItem.text;
        this._innerInput.setSelectionRange(0, currentItem.text.length);
    }
    _navigateToPrevItem() {
        const items = this._getItems();
        let previousItemIdx = this.currentItemIdx;
        if ((!this.value && previousItemIdx !== -1) || (previousItemIdx !== -1 && this.value && this.value !== items[previousItemIdx].text)) {
            previousItemIdx = -1;
        }
        if (previousItemIdx === -1) {
            this.currentItemIdx = items.length;
        }
        if (previousItemIdx === 0) {
            this.currentItemIdx = 0;
            return;
        }
        let currentItem = this._getItems()[--this.currentItemIdx];
        while ((currentItem && this.currentItemIdx > 0) && (currentItem.selected || currentItem.isGroupItem)) {
            currentItem = this._getItems()[--this.currentItemIdx];
        }
        if (!currentItem) {
            return;
        }
        if (currentItem.selected || currentItem.isGroupItem) {
            this.currentItemIdx = previousItemIdx;
            return;
        }
        this.value = currentItem.text;
        this._innerInput.value = currentItem.text;
        this._innerInput.setSelectionRange(0, currentItem.text.length);
    }
    _handleEnter() {
        const lowerCaseValue = this.value.toLowerCase();
        const matchingItem = this._getItems().find(item => (!item.isGroupItem && item.text.toLowerCase() === lowerCaseValue));
        const oldValueState = this.valueState;
        const innerInput = this._innerInput;
        if (matchingItem) {
            if (matchingItem.selected) {
                if (this._validationTimeout) {
                    return;
                }
                this._updateValueState(ValueState.Negative);
                this._performingSelectionTwice = true;
                this._resetValueState(oldValueState, () => {
                    this._performingSelectionTwice = false;
                });
            }
            else {
                this._previouslySelectedItems = this._getSelectedItems();
                matchingItem.selected = true;
                this.value = "";
                // during composition prevent _inputLiveChange for proper input clearing
                if (this._isComposing) {
                    this._suppressNextLiveChange = true;
                }
                const changePrevented = this.fireSelectionChange();
                if (changePrevented) {
                    this._revertSelection();
                }
            }
            innerInput.setSelectionRange(matchingItem.text.length, matchingItem.text.length);
            this.open = false;
        }
        else {
            if (this._lastValue !== this.value) {
                this._inputChange();
            }
            if (this._internals?.form) {
                submitForm(this);
            }
        }
    }
    _resetValueState(valueState, callback) {
        this._validationTimeout = setTimeout(() => {
            this._effectiveValueState = this.valueState;
            this._dialogInputValueState = valueState;
            this._updateValueState(valueState);
            this._validationTimeout = null;
            this._innerInput.focus();
            callback && callback();
        }, 2000);
    }
    _onTokenizerKeydown(e) {
        if ((isRight(e) && this.effectiveDir === "ltr") || (isLeft(e) && this.effectiveDir === "rtl")) {
            const lastTokenIndex = this._tokenizer.tokens.length - this._tokenizer.overflownTokens.length - 1;
            if (e.target === this._tokenizer.tokens[lastTokenIndex]) {
                setTimeout(() => {
                    this._inputDom.focus();
                }, 0);
            }
        }
        if (isInsertShift(e)) {
            this._handleInsertPaste(e);
        }
        if (isHome(e)) {
            this._handleHome(e);
        }
        if (isEnd(e)) {
            this._handleEnd(e);
        }
        if (isShow(e) && !this.readonly && !this.disabled) {
            this._preventTokenizerToggle = true;
            this._handleShow(e);
        }
    }
    _filterItems(str) {
        const itemsToFilter = this._getItems().filter(item => !item.isGroupItem);
        const filteredItems = (Filters[this.filter] || Filters.StartsWithPerTerm)(str, itemsToFilter, "text");
        this._getItems().forEach(item => {
            if (isInstanceOfMultiComboBoxItem(item)) {
                item._isVisible = filteredItems.includes(item);
            }
        });
        return this.items.filter(item => {
            if (item.isGroupItem) {
                return item.items.some(listItem => listItem._isVisible) ? item : false;
            }
            return item._isVisible;
        });
    }
    /**
     * Returns true if the group header should be shown (if there is a filtered suggestion item for this group item)
     * @private
     */
    static _groupItemFilter(item, idx, allItems, filteredItems) {
        if (item.isGroupItem) {
            let groupHasFilteredItems;
            while (allItems[idx] && !allItems[idx].isGroupItem && !groupHasFilteredItems) {
                groupHasFilteredItems = filteredItems.indexOf(allItems[idx]) !== -1;
                idx++;
            }
            return groupHasFilteredItems;
        }
    }
    _afterOpen() {
        const action = this.open ? "open" : "close";
        if (!isPhone() && !this._isOpenedByKeyboard) {
            this._innerInput.focus();
        }
        else if (this._isOpenedByKeyboard) {
            this._itemToFocus?.focus();
        }
        else {
            this._getResponsivePopover().focus();
        }
        this.fireDecoratorEvent(action);
        this._previouslySelectedItems = this._getSelectedItems();
        this._isOpenedByKeyboard = false;
    }
    /**
     * Retrieves a flat structure of all MultiComboBox items from the slotted nodes.
     *
     * @private
     */
    _getItems() {
        const items = [];
        const slottedItems = this.getSlottedNodes("items");
        slottedItems.forEach(item => {
            if (isInstanceOfMultiComboBoxItemGroup(item)) {
                const groupItems = [item, ...item.items].filter(Boolean);
                items.push(...groupItems);
            }
            else {
                items.push(item);
            }
        });
        return items;
    }
    _getSelectedItems() {
        // Angular 2 way data binding
        this.selectedValues = this._getItems().filter(item => item.selected);
        return this.selectedValues;
    }
    _listSelectionChange(e) {
        let changePrevented;
        if (this.readonly) {
            e.preventDefault();
            return;
        }
        if (!isPhone()) {
            this._previouslySelectedItems = e.detail.previouslySelectedItems;
        }
        // don't call selection change right after selection as user can cancel it on phone
        if (!isPhone()) {
            changePrevented = this.fireSelectionChange();
            if (changePrevented) {
                e.preventDefault();
                this._revertSelection();
            }
        }
        // casted to KeyboardEvent since isSpace and isSpaceCtrl accepts KeyboardEvent only
        const castedEvent = { key: e.detail.key };
        if (!e.detail.selectedItems.length && this.filterSelected) {
            this.filterSelected = false;
        }
        if (!e.detail.selectionComponentPressed && !isSpace(castedEvent) && !isSpaceCtrl(castedEvent)) {
            this.open = false;
            this.value = "";
            // if the item (not checkbox) is clicked, call the selection change
            if (isPhone()) {
                changePrevented = this.fireSelectionChange();
                if (changePrevented) {
                    e.preventDefault();
                    this._revertSelection();
                }
            }
            this.fireDecoratorEvent("input");
            return;
        }
        this.value = this.valueBeforeAutoComplete || "";
    }
    fireSelectionChange() {
        const changePrevented = !this.fireDecoratorEvent("selection-change", {
            items: this._getSelectedItems(),
        });
        return changePrevented;
    }
    _getList() {
        this.list = this.shadowRoot.querySelector(".ui5-multi-combobox-all-items-list");
        return this.list;
    }
    _click() {
        if (isPhone() && !this.readonly && !this._showMorePressed && !this._deleting) {
            this.open = true;
        }
        this._showMorePressed = false;
    }
    handleBeforeTokenizerPopoverOpen() {
        const tokens = this._tokenizer.tokens;
        const hasTruncatedToken = tokens.length === 1 && tokens[0].isTruncatable;
        const popover = this._getResponsivePopover();
        if (hasTruncatedToken && popover) {
            popover.preventFocusRestore = true;
            popover.open = false;
        }
    }
    _beforeClose() {
        this.open = false;
    }
    _afterClose() {
        const action = this.open ? "open" : "close";
        // close device's keyboard and prevent further typing
        if (isPhone()) {
            this._dialogInputValueState = this.valueState;
            this._tokenizer.expanded = false;
        }
        this.fireDecoratorEvent(action);
        this._iconPressed = false;
        this._preventTokenizerToggle = false;
        this.filterSelected = false;
    }
    _beforeOpen() {
        this.open = true;
        this._itemsBeforeOpen = this._getItems().map(item => {
            return {
                ref: item,
                selected: item.selected,
            };
        });
        this._valueBeforeOpen = this.value;
        this._dialogInputValueState = this.valueState;
        // in order to use the autocomplete feature of the input we should not set value in state
        this._innerInput.value = this.value;
        if (this.filterSelected) {
            const selectedItems = this._filteredItems.filter(item => item.selected);
            this.selectedItems = this._getItems().filter((item, idx, allItems) => MultiComboBox_1._groupItemFilter(item, ++idx, allItems, selectedItems) || selectedItems.indexOf(item) !== -1);
        }
    }
    _addLinksEventListeners() {
        const links = this.linksInAriaValueStateHiddenText;
        links.forEach((link, index) => {
            this._linksListenersArray.push((e) => {
                attachListeners(e, links, index, {
                    closeValueState: () => {
                        if (this.open) {
                            this.open = false;
                        }
                        if (this.valueStateOpen) {
                            this.valueStateOpen = false;
                        }
                    },
                    navigateToItem: () => {
                        this._handleLinkNavigation = false;
                        if (this.open) {
                            this._forwardFocusToInner();
                            this._handleArrowDown();
                        }
                    },
                    focusInput: () => {
                        this._handleLinkNavigation = false;
                        this._forwardFocusToInner();
                    },
                    isPopoverOpen: () => this.open,
                });
            });
            link.addEventListener("keydown", this._linksListenersArray[index]);
        });
    }
    _removeLinksEventListeners() {
        const links = this.linksInAriaValueStateHiddenText;
        links.forEach((link, index) => {
            link.removeEventListener("keydown", this._linksListenersArray[index]);
        });
        this._linksListenersArray = [];
        this._handleLinkNavigation = false;
    }
    _handleTypeAhead(item, filterValue) {
        if (!item) {
            return;
        }
        const value = item.text;
        const innerInput = this._innerInput;
        filterValue = filterValue || "";
        this.value = value;
        innerInput.value = value;
        innerInput.setSelectionRange(filterValue.length, value.length);
        this._shouldAutocomplete = false;
    }
    _getFirstMatchingItem(current) {
        if (!this._getItems().length) {
            return;
        }
        const matchingItems = this._startsWithMatchingItems(current).filter(item => !item.selected);
        if (matchingItems.length) {
            return matchingItems[0];
        }
    }
    _startsWithMatchingItems(str) {
        return Filters.StartsWith(str, this._getItems().filter(item => !item.isGroupItem), "text");
    }
    _revertSelection() {
        this._filteredItems.forEach(item => {
            item.selected = this._previouslySelectedItems.includes(item);
        });
    }
    onBeforeRendering() {
        const input = this._innerInput;
        const autoCompletedChars = input && (input.selectionEnd || 0) - (input.selectionStart || 0);
        const value = input && input.value;
        if (this.open) {
            const list = this._getList();
            const selectedListItemsCount = this.items.filter(item => item.selected).length;
            this._allSelected = selectedListItemsCount > 0 && ((selectedListItemsCount === this.items.length) || (list?.getSlottedNodes("items").length === selectedListItemsCount));
        }
        this._effectiveShowClearIcon = (this.showClearIcon && !!this.value && !this.readonly && !this.disabled);
        if (input && !input.value) {
            this.valueBeforeAutoComplete = "";
            this._filteredItems = this._getItems();
        }
        this.tokenizerAvailable = this._getSelectedItems().length > 0;
        this.style.setProperty("--_ui5-input-icons-count", `${this.iconsCount}`);
        if (!input || !value) {
            this._getItems().forEach(item => {
                if (isInstanceOfMultiComboBoxItem(item)) {
                    item._isVisible = true;
                    item._readonly = this.readonly;
                }
            });
            return;
        }
        // Typehead causes issues on Android devices, so we disable it for now
        // If there is already a selection the autocomplete has already been performed
        if (this._shouldAutocomplete && !isAndroid()) {
            const item = this._getFirstMatchingItem(value);
            // Prevent typeahead during composition to avoid interfering with the composition process
            if (!this._isComposing && item) {
                // Keep the original typed in text intact
                this.valueBeforeAutoComplete = value;
                this._handleTypeAhead(item, value);
            }
        }
        if (this._shouldFilterItems) {
            this._filteredItems = this._filterItems(autoCompletedChars ? this.valueBeforeAutoComplete : value);
        }
        else {
            this._filteredItems = this._getItems();
        }
    }
    onAfterRendering() {
        this._getList();
        this.valueStateOpen = this.shouldDisplayOnlyValueStateMessage || (this._handleLinkNavigation && !this.open);
        this.storeResponsivePopoverWidth();
        this._deleting = false;
        // force resize of the tokenizer on invalidation
        this._tokenizer._handleResize();
        this._tokenizer.preventInitialFocus = true;
        if (this.open && !isPhone()) {
            this._tokenizer._scrollToEndOnExpand = true;
            this._tokenizer.expanded = true;
        }
        if (!arraysAreEqual(this._valueStateLinks, this.linksInAriaValueStateHiddenText)) {
            this._removeLinksEventListeners();
            this._addLinksEventListeners();
            this._valueStateLinks = this.linksInAriaValueStateHiddenText;
        }
    }
    get _isPhone() {
        return isPhone();
    }
    _onIconMousedown() {
        this._iconPressed = true;
    }
    _clear() {
        this.value = "";
        this._inputDom.value = "";
        this.fireDecoratorEvent("input");
        if (!this._isPhone) {
            this.focus();
        }
    }
    _iconMouseDown() {
        this._clearingValue = true;
    }
    storeResponsivePopoverWidth() {
        if (this.open && !this._listWidth && this.list) {
            this._listWidth = this.list.offsetWidth;
        }
    }
    handleCancel() {
        this._itemsBeforeOpen.forEach(item => {
            if (isInstanceOfMultiComboBoxItem(item.ref)) {
                item.ref.selected = item.selected;
            }
        });
        this._toggleTokenizerPopover();
        this.value = this._valueBeforeOpen;
    }
    handleOK() {
        if (isPhone()) {
            const changePrevented = this.fireSelectionChange();
            if (changePrevented) {
                this._revertSelection();
            }
        }
        if (!this.noValidation) {
            this.value = "";
        }
        this._toggleTokenizerPopover();
    }
    _forwardFocusToInner() {
        this._innerInput.focus();
    }
    get morePopoverOpener() {
        const tokens = this._tokenizer?.tokens;
        if (tokens?.length === 1 && tokens[0].isTruncatable) {
            return tokens[0];
        }
        return this;
    }
    _getPopover() {
        return this.shadowRoot.querySelector("[ui5-popover]");
    }
    _getResponsivePopover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    _setValueStateHeader() {
        const responsivePopover = this._getResponsivePopover();
        this.valueStateHeader = responsivePopover.querySelector("div.ui5-responsive-popover-header.ui5-valuestatemessage-root");
    }
    get _tokenizer() {
        return this.shadowRoot.querySelector("[ui5-tokenizer]");
    }
    inputFocusIn(e) {
        if (!isPhone()) {
            this.focused = true;
            this._tokenizer._scrollToEndOnExpand = true;
            this._tokenizer.expanded = true;
        }
        else {
            this._innerInput.blur();
        }
        this._clearingValue = false;
        if (!isPhone() && e.target === this._innerInput) {
            this._innerInput.setSelectionRange(0, this.value.length);
        }
        this._tokenizer.tokens.forEach(token => {
            token.selected = false;
        });
        this.valueBeforeAutoComplete = "";
    }
    inputFocusOut(e) {
        const responsivePopover = this._getResponsivePopover();
        const popover = this._getPopover();
        const focusIsGoingInPopover = [responsivePopover, popover].some(popup => popup?.contains(e.relatedTarget));
        const focusIsGoingInValueStatePopup = this?.contains(e.relatedTarget);
        if (focusIsGoingInValueStatePopup || this._handleLinkNavigation) {
            this.focused = false;
            e.stopImmediatePropagation();
            return;
        }
        if ((!this.shadowRoot.contains(e.relatedTarget) || focusIsGoingInPopover) && !this._deleting && !this._clearingValue) {
            this.focused = false;
            if (this._lastValue !== this.value) {
                this._inputChange();
            }
            this._tokenizer.expanded = this.open;
        }
    }
    /**
     * Enables IME composition handling.
     * Dynamically loads the InputComposition feature and sets up event listeners.
     * @private
     */
    _enableComposition() {
        if (this._composition) {
            return;
        }
        const setup = (InputCompositionClass) => {
            this._composition = new InputCompositionClass({
                getInputEl: () => this._innerInput,
                updateCompositionState: (isComposing) => {
                    this._isComposing = isComposing;
                },
            });
            this._composition.addEventListeners();
        };
        if (MultiComboBox_1.composition) {
            setup(MultiComboBox_1.composition);
        }
        else {
            import("./features/InputComposition.js").then(CompositionModule => {
                MultiComboBox_1.composition = CompositionModule.default;
                setup(CompositionModule.default);
            });
        }
    }
    get editable() {
        return !this.readonly;
    }
    get _isFocusInside() {
        return !isPhone() && (this.focused || this._tokenizerFocused);
    }
    get selectedItemsListMode() {
        return this.readonly ? "None" : "Multiple";
    }
    get _listItemsType() {
        return this.readonly ? "Inactive" : "Active";
    }
    get hasValueState() {
        const isValueStateSet = this.valueState !== ValueState.None;
        if (isPhone()) {
            return isValueStateSet || (this._dialogInputValueState !== ValueState.None);
        }
        return isValueStateSet;
    }
    get hasValueStateMessage() {
        const valueState = isPhone() ? this._dialogInputValueState : this.valueState;
        return this.hasValueState && valueState !== ValueState.Positive;
    }
    get ariaValueStateHiddenText() {
        if (!this.hasValueState) {
            return;
        }
        let text = "";
        if (this.valueState !== ValueState.None) {
            text = this.valueStateTypeMappings[this.valueState];
        }
        if (this.shouldDisplayDefaultValueStateMessage) {
            return `${text} ${this.valueStateDefaultText || ""}`;
        }
        let valueStateInnerText = this.valueStateMessage.map(el => el.textContent).join(" ");
        // append space before the value state message text if it is not empty
        valueStateInnerText = valueStateInnerText.trim().length ? ` ${valueStateInnerText}` : "";
        if (this.getValueStateLinksShortcutsTextAcc) {
            return `${text} ${this.getValueStateLinksShortcutsTextAcc}${valueStateInnerText}`;
        }
        return `${text}${valueStateInnerText}`;
    }
    get valueStateDefaultText() {
        const valueState = isPhone() ? this._dialogInputValueState : this.valueState;
        if (valueState === ValueState.None) {
            return "";
        }
        if (this._performingSelectionTwice) {
            return MultiComboBox_1.i18nBundle.getText(VALUE_STATE_ERROR_ALREADY_SELECTED);
        }
        return this.valueStateTextMappings[valueState];
    }
    get valueStateTextId() {
        return this.hasValueState ? `ui5-multi-combobox-valueStateDesc` : "";
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this);
    }
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageIcon() {
        const valueState = (isPhone() && this.open) ? this._dialogInputValueState : this.valueState;
        if (valueState === ValueState.None) {
            return "";
        }
        return {
            [ValueState.Negative]: "error",
            [ValueState.Critical]: "alert",
            [ValueState.Positive]: "sys-enter-2",
            [ValueState.Information]: "information",
        }[valueState];
    }
    get linksInAriaValueStateHiddenText() {
        const links = [];
        if (this.valueStateMessage) {
            this.valueStateMessage.forEach(element => {
                if (element.children.length) {
                    element.querySelectorAll("ui5-link").forEach(link => {
                        links.push(link);
                    });
                }
            });
        }
        return links;
    }
    get getValueStateLinksShortcutsTextAcc() {
        const links = this.linksInAriaValueStateHiddenText;
        if (!links.length) {
            return "";
        }
        if (isMac()) {
            return links.length === 1
                ? MultiComboBox_1.i18nBundle.getText(VALUE_STATE_LINK_MAC)
                : MultiComboBox_1.i18nBundle.getText(VALUE_STATE_LINKS_MAC);
        }
        return links.length === 1
            ? MultiComboBox_1.i18nBundle.getText(VALUE_STATE_LINK)
            : MultiComboBox_1.i18nBundle.getText(VALUE_STATE_LINKS);
    }
    get _valueStateLinksShortcutsTextAccId() {
        return this.linksInAriaValueStateHiddenText.length > 0 ? `hiddenText-value-state-link-shortcut` : "";
    }
    get _tokensCountText() {
        if (!this._tokenizer) {
            return;
        }
        return getTokensCountText(this.selectedValues.length);
    }
    get _tokensCountTextId() {
        return "ui5-multi-combobox-hiddenText-nMore";
    }
    get _selectedTokensCount() {
        return this._tokenizer.tokens.filter(token => token.selected).length;
    }
    get ariaDescribedByText() {
        return `${this._tokensCountTextId} ${this.valueStateTextId} ${this._valueStateLinksShortcutsTextAccId}`.trim();
    }
    get shouldDisplayDefaultValueStateMessage() {
        return !this.valueStateMessage.length && this.hasValueStateMessage;
    }
    get shouldDisplayOnlyValueStateMessage() {
        return this.focused && !this.readonly && this.hasValueStateMessage && !this._iconPressed && !this.open;
    }
    get valueStateTypeMappings() {
        return {
            [ValueState.Positive]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
            [ValueState.Information]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
            [ValueState.Negative]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
            [ValueState.Critical]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
        };
    }
    get valueStateTextMappings() {
        return {
            [ValueState.Positive]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            [ValueState.Negative]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_ERROR),
            [ValueState.Critical]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_WARNING),
            [ValueState.Information]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
        };
    }
    get _innerInput() {
        if (isPhone()) {
            if (this._getResponsivePopover()?.open) {
                return this._getResponsivePopover().querySelector("[ui5-input]").shadowRoot.querySelector("input");
            }
        }
        return this._inputDom;
    }
    get _headerTitleText() {
        return MultiComboBox_1.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
    }
    get _iconAccessibleNameText() {
        return MultiComboBox_1.i18nBundle.getText(SELECT_OPTIONS);
    }
    get _showSelectedButtonAccessibleNameText() {
        return MultiComboBox_1.i18nBundle.getText(SHOW_SELECTED_BUTTON);
    }
    get _dialogOkButton() {
        return MultiComboBox_1.i18nBundle.getText(MULTICOMBOBOX_DIALOG_OK_BUTTON);
    }
    get _dialogCancelButton() {
        return MultiComboBox_1.i18nBundle.getText(MULTICOMBOBOX_DIALOG_CANCEL_BUTTON);
    }
    get _tokenizerExpanded() {
        if (isPhone()) {
            return false;
        }
        if (this._preventTokenizerToggle) {
            return this._tokenizer.expanded;
        }
        const isCurrentlyExpanded = this._tokenizer?.expanded;
        const shouldBeExpanded = this.focused || this.open || isCurrentlyExpanded;
        return shouldBeExpanded;
    }
    get iconsCount() {
        const slottedIconsCount = this.icon?.length || 0;
        const clearIconCount = Number(this._effectiveShowClearIcon) ?? 0;
        const arrowDownIconsCount = this.readonly ? 0 : 1;
        return slottedIconsCount + clearIconCount + arrowDownIconsCount;
    }
    get clearIconAccessibleName() {
        return MultiComboBox_1.i18nBundle.getText(INPUT_CLEAR_ICON_ACC_NAME);
    }
    get selectAllCheckboxLabel() {
        const items = this._getItems().filter(item => !item.isGroupItem);
        const selected = items.filter(item => item.selected);
        return MultiComboBox_1.i18nBundle.getText(MCB_SELECTED_ITEMS, selected.length, items.length);
    }
    get _popupLabel() {
        return MultiComboBox_1.i18nBundle.getText(COMBOBOX_AVAILABLE_OPTIONS);
    }
    get responsivePopoverId() {
        return `${this._id}-popover`;
    }
    get classes() {
        const popover = {
            "ui5-multi-combobox-all-items-responsive-popover": true,
            "ui5-suggestions-popover": true,
            "ui5-popover-with-value-state-header-phone": this._isPhone && this.hasValueStateMessage,
            "ui5-popover-with-value-state-header": !this._isPhone && this.hasValueStateMessage,
        };
        const popoverValueState = {
            "ui5-valuestatemessage-root": true,
            "ui5-valuestatemessage-header": true,
            "ui5-valuestatemessage--success": (this.valueState === ValueState.Positive) || (isPhone() && this._dialogInputValueState === ValueState.Positive),
            "ui5-valuestatemessage--error": (this.valueState === ValueState.Negative) || (isPhone() && this._dialogInputValueState === ValueState.Negative),
            "ui5-valuestatemessage--warning": (this.valueState === ValueState.Critical) || (isPhone() && this._dialogInputValueState === ValueState.Critical),
            "ui5-valuestatemessage--information": (this.valueState === ValueState.Information) || (isPhone() && this._dialogInputValueState === ValueState.Information),
        };
        return {
            popover,
            popoverValueState,
            responsivePopoverHeaderValueState: {
                "ui5-responsive-popover-header": true,
                ...popoverValueState,
            },
        };
    }
    get styles() {
        const remSizeIxPx = parseInt(getComputedStyle(document.documentElement).fontSize);
        return {
            popoverValueStateMessage: {
                "width": `${this._listWidth || 0}px`,
                "display": this._listWidth === 0 ? "none" : "inline-block",
            },
            popoverHeader: {
                "max-width": isPhone() ? "100%" : `22rem`,
            },
            suggestionsPopover: {
                "min-width": `${this._inputWidth}px`,
                "max-width": (this._inputWidth / remSizeIxPx) > 40 ? `${this._inputWidth}px` : "40rem",
            },
        };
    }
};
__decorate([
    property()
], MultiComboBox.prototype, "value", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "noTypeahead", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "noValidation", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "disabled", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "loading", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "filter", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "showClearIcon", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "accessibleName", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "showSelectAll", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "_effectiveValueState", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "valueStateOpen", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "tokenizerOpen", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "open", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "_valueBeforeOpen", void 0);
__decorate([
    property({ type: Array })
], MultiComboBox.prototype, "_filteredItems", void 0);
__decorate([
    property({ type: Array })
], MultiComboBox.prototype, "_previouslySelectedItems", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "filterSelected", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_tokenizerFocused", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_iconPressed", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], MultiComboBox.prototype, "_inputWidth", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], MultiComboBox.prototype, "_listWidth", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_performingSelectionTwice", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_allSelected", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_effectiveShowClearIcon", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "_dialogInputValueState", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "tokenizerAvailable", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "_handleLinkNavigation", void 0);
__decorate([
    property({ type: Array })
], MultiComboBox.prototype, "_linksListenersArray", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_isComposing", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
        invalidateOnChildChange: true,
        individualSlots: true,
    })
], MultiComboBox.prototype, "items", void 0);
__decorate([
    slot()
], MultiComboBox.prototype, "icon", void 0);
__decorate([
    slot()
], MultiComboBox.prototype, "valueStateMessage", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], MultiComboBox, "i18nBundle", void 0);
MultiComboBox = MultiComboBox_1 = __decorate([
    customElement({
        tag: "ui5-multi-combobox",
        languageAware: true,
        formAssociated: true,
        renderer: jsxRender,
        template: MultiComboBoxTemplate,
        styles: [
            multiCbxStyles,
            ResponsivePopoverCommonCss,
            ValueStateMessageCss,
            SuggestionsCss,
            MultiComboBoxPopover,
        ],
        dependencies: [
            MultiComboBoxItem,
            MultiComboBoxItemGroup,
            Tokenizer,
            Token,
            Icon,
            Input,
            ResponsivePopover,
            Popover,
            List,
            ListItemStandard,
            ListItemGroup,
            ToggleButton,
            Button,
            CheckBox,
            SuggestionItem,
        ],
    })
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout.
     * @public
     */
    ,
    event("change", {
        bubbles: true,
    })
    /**
     * Fired when the value of the component changes at each keystroke or clear icon is pressed.
     * @public
     */
    ,
    event("input", {
        bubbles: true,
    })
    /**
     * Fired when the dropdown is opened.
     * @since 2.0.0
     * @public
     */
    ,
    event("open")
    /**
     * Fired when the dropdown is closed.
     * @since 2.0.0
     * @public
     */
    ,
    event("close")
    /**
     * Fired when selection is changed by user interaction.
     * @param {IMultiComboBoxItem[]} items an array of the selected items.
     * @public
     */
    ,
    event("selection-change", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired before the value state of the component is updated internally.
     * The event is preventable, meaning that if it's default action is
     * prevented, the component will not update the value state.
     * @public
     * @since 2.19.0
     * @param {string} valueState The new `valueState` that will be set.
     */
    ,
    event("value-state-change", {
        bubbles: true,
        cancelable: true,
    })
], MultiComboBox);
MultiComboBox.define();
export default MultiComboBox;
//# sourceMappingURL=MultiComboBox.js.map