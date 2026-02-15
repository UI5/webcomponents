import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ClassMap, Timeout } from "@ui5/webcomponents-base/dist/types.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import MultiComboBoxItem from "./MultiComboBoxItem.js";
import Tokenizer from "./Tokenizer.js";
import type { TokenizerTokenDeleteEventDetail } from "./Tokenizer.js";
import type { IIcon } from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import type { ListSelectionChangeEventDetail } from "./List.js";
import ToggleButton from "./ToggleButton.js";
import type ComboBoxFilter from "./types/ComboBoxFilter.js";
import type { InputEventDetail } from "./Input.js";
import type InputComposition from "./features/InputComposition.js";
/**
 * Interface for components that may be slotted inside a `ui5-multi-combobox` as items
 * @public
 */
interface IMultiComboBoxItem extends UI5Element {
    text?: string;
    additionalText?: string;
    headerText?: string;
    selected: boolean;
    isGroupItem?: boolean;
    _isVisible?: boolean;
    items?: Array<IMultiComboBoxItem>;
}
type ValueStateAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;
type ValueStateTypeAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;
type MultiComboBoxSelectionChangeEventDetail = {
    items: Array<MultiComboBoxItem>;
};
type MultiComboboxItemWithSelection = {
    ref: IMultiComboBoxItem;
    selected: boolean;
};
type MultiComboBoxValueStateChangeEventDetail = {
    valueState: `${ValueState}`;
};
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
declare class MultiComboBox extends UI5Element implements IFormInputElement {
    eventDetails: {
        change: void;
        input: void;
        open: void;
        close: void;
        "selection-change": MultiComboBoxSelectionChangeEventDetail;
        "value-state-change": MultiComboBoxValueStateChangeEventDetail;
    };
    /**
     * Defines the value of the component.
     *
     * **Note:** The property is updated upon typing.
     * @default ""
     * @formEvents change input
     * @formProperty
     * @public
     */
    value: string;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * **Note:** When the component is used inside a form element,
     * the value is sent as the first element in the form data, even if it's empty.
     * @default undefined
     * @public
     * @since 2.0.0
     */
    name?: string;
    /**
     * Defines whether the value will be autcompleted to match an item
     * @default false
     * @public
     * @since 1.4.0
     */
    noTypeahead: boolean;
    /**
     * Defines a short hint intended to aid the user with data entry when the
     * component has no value.
     * @default undefined
     * @public
     */
    placeholder?: string;
    /**
     * Defines if the user input will be prevented, if no matching item has been found
     * @default false
     * @public
     */
    noValidation: boolean;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
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
     * @since 1.0.0-rc.5
     */
    required: boolean;
    /**
     * Indicates whether a loading indicator should be shown in the picker.
     * @default false
     * @public
     */
    loading: boolean;
    /**
     * Defines the filter type of the component.
     * @default "StartsWithPerTerm"
     * @public
     */
    filter: `${ComboBoxFilter}`;
    /**
     * Defines whether the clear icon of the multi-combobox will be shown.
     * @default false
     * @public
     * @since 1.20.1
     */
    showClearIcon: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.4.0
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.4.0
     */
    accessibleNameRef?: string;
    /**
     * Determines if the select all checkbox is visible on top of suggestions.
     * @default false
     * @public
     */
    showSelectAll: boolean;
    _effectiveValueState: `${ValueState}`;
    /**
     * Indicates whether the value state message popover is open.
     * @private
     */
    valueStateOpen: boolean;
    /**
     * Indicates whether the Tokenizer n-more popover is open.
     * @private
     */
    tokenizerOpen: boolean;
    /**
     * Indicates whether the items picker is open.
     * @public
     * @since 2.9.0
     */
    open: boolean;
    _valueBeforeOpen: string;
    _filteredItems: Array<IMultiComboBoxItem>;
    _previouslySelectedItems: Array<IMultiComboBoxItem>;
    filterSelected: boolean;
    focused: boolean;
    _tokenizerFocused: boolean;
    _iconPressed: boolean;
    _inputWidth: number;
    _listWidth: number;
    _performingSelectionTwice: boolean;
    _allSelected: boolean;
    _effectiveShowClearIcon: boolean;
    _dialogInputValueState: `${ValueState}`;
    /**
     * Indicates whether the tokenizer has tokens
     * @private
     */
    tokenizerAvailable: boolean;
    /**
     * Indicates whether link navigation is being handled.
     * @private
     * @since 2.11.0
     * @default false
     */
    _handleLinkNavigation: boolean;
    /**
     * @private
     */
    _linksListenersArray: Array<(args: any) => void>;
    /**
     * Indicates whether IME composition is currently active
     * @default false
     * @private
     */
    _isComposing: boolean;
    /**
     * Defines the component items.
     * @public
     */
    items: DefaultSlot<IMultiComboBoxItem>;
    /**
    * Defines the icon to be displayed in the component.
    * @public
    * @since 1.0.0-rc.9
    */
    icon: Slot<IIcon>;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     * The value state message slot should contain only one root element.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the component is in `Information`, `Critical` or `Negative` value state.
     * @since 1.0.0-rc.9
     * @public
     */
    valueStateMessage: Slot<HTMLElement>;
    selectedValues: Array<IMultiComboBoxItem>;
    _inputLastValue: string;
    _deleting: boolean;
    _validationTimeout: Timeout | null;
    _handleResizeBound: ResizeObserverCallback;
    valueBeforeAutoComplete: string;
    currentItemIdx: number;
    _lastValue: string;
    _shouldFilterItems?: boolean;
    _showMorePressed?: boolean;
    _clearingValue?: boolean;
    valueStateHeader?: HTMLElement;
    list?: List;
    _shouldAutocomplete?: boolean;
    _preventTokenizerToggle?: boolean;
    _isOpenedByKeyboard?: boolean;
    _itemToFocus?: IMultiComboBoxItem;
    _itemsBeforeOpen: Array<MultiComboboxItemWithSelection>;
    selectedItems: Array<IMultiComboBoxItem>;
    _valueStateLinks: Array<HTMLElement>;
    _composition?: InputComposition;
    _suppressNextLiveChange: boolean;
    static i18nBundle: I18nBundle;
    static composition: typeof InputComposition;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): FormData | string | null;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    _handleResize(): void;
    _handleMobileInput(e: CustomEvent<InputEventDetail>): void;
    _inputChange(): void;
    _onMobileInputKeydown(e: KeyboardEvent): void;
    _toggleTokenizerPopover(): void;
    togglePopoverByDropdownIcon(): void;
    _showFilteredItems(): void;
    filterSelectedItems(e: UI5CustomEvent<ToggleButton, "click">): void;
    get _showAllItemsButtonPressed(): boolean;
    get _inputDom(): HTMLInputElement;
    _inputLiveChange(e: InputEvent): void;
    _updateValueState(newValueState: `${ValueState}`): void;
    _tokenDelete(e: CustomEvent<TokenizerTokenDeleteEventDetail>): void;
    get _getPlaceholder(): string;
    get _shouldFocusLastToken(): boolean;
    _handleArrowKey(direction: string): void;
    _handleArrowLeft(): void;
    _handleArrowRight(): void;
    _onPopoverFocusOut(): void;
    _tokenizerFocusOut(e: FocusEvent): void;
    _tokenizerFocusIn(): void;
    _onkeydown(e: KeyboardEvent): void;
    _selectItems(matchingItems: IMultiComboBoxItem[]): void;
    _handlePaste(e: ClipboardEvent): Promise<void>;
    _handleTokenCreationUponPaste(pastedText: string, e: KeyboardEvent | ClipboardEvent): void;
    _handleInsertPaste(e: KeyboardEvent): Promise<void>;
    _handleShow(e: KeyboardEvent): void;
    _handlePageUp(e: KeyboardEvent): void;
    _handlePageDown(e: KeyboardEvent): void;
    _handleBackspace(e: KeyboardEvent): void;
    _handleEscape(): void;
    _handleHome(e: KeyboardEvent): void;
    _handleEnd(e: KeyboardEvent): void;
    _handleTab(): void;
    _handleSelectAll(): void;
    _onListHeaderKeydown(e: KeyboardEvent): void | Promise<void>;
    _handleSelectAllCheckboxClick(e: CustomEvent): void;
    _onItemKeydown(e: KeyboardEvent): void;
    _handleArrowCtrl(e: KeyboardEvent): void;
    _onItemTab(): void;
    _handleArrowNavigation(e: KeyboardEvent, isDownControl: boolean): void;
    _handleArrowDown(): Promise<void>;
    _handleCtrlALtF8(): void;
    _handleItemRangeSelection(e: KeyboardEvent): void;
    _navigateToNextItem(): void;
    _navigateToPrevItem(): void;
    _handleEnter(): void;
    _resetValueState(valueState: `${ValueState}`, callback?: () => void): void;
    _onTokenizerKeydown(e: KeyboardEvent): void;
    _filterItems(str: string): IMultiComboBoxItem[];
    /**
     * Returns true if the group header should be shown (if there is a filtered suggestion item for this group item)
     * @private
     */
    static _groupItemFilter(item: IMultiComboBoxItem, idx: number, allItems: Array<IMultiComboBoxItem>, filteredItems: Array<IMultiComboBoxItem>): boolean | undefined;
    _afterOpen(): void;
    /**
     * Retrieves a flat structure of all MultiComboBox items from the slotted nodes.
     *
     * @private
     */
    _getItems(): Array<IMultiComboBoxItem>;
    _getSelectedItems(): Array<MultiComboBoxItem>;
    _listSelectionChange(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    fireSelectionChange(): boolean;
    _getList(): List;
    _click(): void;
    handleBeforeTokenizerPopoverOpen(): void;
    _beforeClose(): void;
    _afterClose(): void;
    _beforeOpen(): void;
    _addLinksEventListeners(): void;
    _removeLinksEventListeners(): void;
    _handleTypeAhead(item: IMultiComboBoxItem, filterValue: string): void;
    _getFirstMatchingItem(current: string): IMultiComboBoxItem | undefined;
    _startsWithMatchingItems(str: string): IMultiComboBoxItem[];
    _revertSelection(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    get _isPhone(): boolean;
    _onIconMousedown(): void;
    _clear(): void;
    _iconMouseDown(): void;
    storeResponsivePopoverWidth(): void;
    handleCancel(): void;
    handleOK(): void;
    _forwardFocusToInner(): void;
    get morePopoverOpener(): HTMLElement;
    _getPopover(): Popover;
    _getResponsivePopover(): ResponsivePopover;
    _setValueStateHeader(): void;
    get _tokenizer(): Tokenizer;
    inputFocusIn(e: FocusEvent): void;
    inputFocusOut(e: FocusEvent): void;
    /**
     * Enables IME composition handling.
     * Dynamically loads the InputComposition feature and sets up event listeners.
     * @private
     */
    _enableComposition(): void;
    get editable(): boolean;
    get _isFocusInside(): boolean;
    get selectedItemsListMode(): "None" | "Multiple";
    get _listItemsType(): "Inactive" | "Active";
    get hasValueState(): boolean;
    get hasValueStateMessage(): boolean;
    get ariaValueStateHiddenText(): string | undefined;
    get valueStateDefaultText(): string;
    get valueStateTextId(): "" | "ui5-multi-combobox-valueStateDesc";
    get ariaLabelText(): string | undefined;
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageIcon(): string;
    get linksInAriaValueStateHiddenText(): HTMLElement[];
    get getValueStateLinksShortcutsTextAcc(): string;
    get _valueStateLinksShortcutsTextAccId(): "" | "hiddenText-value-state-link-shortcut";
    get _tokensCountText(): string | undefined;
    get _tokensCountTextId(): string;
    get _selectedTokensCount(): number;
    get ariaDescribedByText(): string;
    get shouldDisplayDefaultValueStateMessage(): boolean;
    get shouldDisplayOnlyValueStateMessage(): boolean;
    get valueStateTypeMappings(): ValueStateTypeAnnouncement;
    get valueStateTextMappings(): ValueStateAnnouncement;
    get _innerInput(): HTMLInputElement;
    get _headerTitleText(): string;
    get _iconAccessibleNameText(): string;
    get _showSelectedButtonAccessibleNameText(): string;
    get _dialogOkButton(): string;
    get _dialogCancelButton(): string;
    get _tokenizerExpanded(): boolean;
    get iconsCount(): number;
    get clearIconAccessibleName(): string;
    get selectAllCheckboxLabel(): string;
    get _popupLabel(): string;
    get responsivePopoverId(): string;
    get classes(): ClassMap;
    get styles(): {
        popoverValueStateMessage: {
            width: string;
            display: string;
        };
        popoverHeader: {
            "max-width": string;
        };
        suggestionsPopover: {
            "min-width": string;
            "max-width": string;
        };
    };
}
export default MultiComboBox;
export type { IMultiComboBoxItem, MultiComboBoxSelectionChangeEventDetail, MultiComboBoxValueStateChangeEventDetail, };
