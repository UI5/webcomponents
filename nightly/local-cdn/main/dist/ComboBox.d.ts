import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type { IIcon } from "./Icon.js";
import "./ComboBoxItem.js";
import type ComboBoxItem from "./ComboBoxItem.js";
import type Popover from "./Popover.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type List from "./List.js";
import type { ListItemClickEventDetail } from "./List.js";
import "./ComboBoxItemGroup.js";
import type ComboBoxFilter from "./types/ComboBoxFilter.js";
import type { InputEventDetail } from "./Input.js";
import type InputComposition from "./features/InputComposition.js";
/**
 * Interface for components that may be slotted inside a `ui5-combobox`
 * @public
 */
interface IComboBoxItem extends UI5Element {
    text?: string;
    headerText?: string;
    focused: boolean;
    isGroupItem?: boolean;
    selected?: boolean;
    additionalText?: string;
    _isVisible?: boolean;
    items?: Array<IComboBoxItem>;
}
type ValueStateAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;
type ValueStateTypeAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;
type ComboBoxSelectionChangeEventDetail = {
    item: ComboBoxItem | null;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-combobox` component represents a drop-down menu with a list of the available options and a text input field to narrow down the options.
 *
 * It is commonly used to enable users to select an option from a predefined list.
 *
 * ### Structure
 * The `ui5-combobox` consists of the following elements:
 *
 * -  Input field - displays the selected option or a custom user entry. Users can type to narrow down the list or enter their own value.
 * -  Drop-down arrow - expands\collapses the option list.
 * -  Option list - the list of available options.
 *
 * ### Keyboard Handling
 *
 * The `ui5-combobox` provides advanced keyboard handling.
 *
 * - [F4], [Alt]+[Up], or [Alt]+[Down] - Toggles the picker.
 * - [Escape] - Closes the picker, if open. If closed, cancels changes and reverts the typed in value.
 * - [Enter] or [Return] - If picker is open, takes over the currently selected item and closes it.
 * - [Down] - Selects the next matching item in the picker.
 * - [Up] - Selects the previous matching item in the picker.
 * - [Page Down] - Moves selection down by page size (10 items by default).
 * - [Page Up] - Moves selection up by page size (10 items by default).
 * - [Home] - If focus is in the ComboBox, moves cursor at the beginning of text. If focus is in the picker, selects the first item.
 * - [End] - If focus is in the ComboBox, moves cursor at the end of text. If focus is in the picker, selects the last item.
 * - [Ctrl]+[Alt]+[F8] or [Command]+[Option]+[F8] - Focuses the first link in the value state message, if available. Pressing [Tab] moves the focus to the next link in the value state message, or closes the value state message if there are no more links.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ComboBox.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.6
 */
declare class ComboBox extends UI5Element implements IFormInputElement {
    eventDetails: {
        "change": void;
        "input": void;
        "open": void;
        "close": void;
        "selection-change": ComboBoxSelectionChangeEventDetail;
    };
    /**
     * Defines the value of the component.
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
     * @default undefined
     * @public
     * @since 2.0.0
     */
    name?: string;
    /**
     * Defines whether the value will be autocompleted to match an item
     * @default false
     * @public
     * @since 1.19.0
     */
    noTypeahead: boolean;
    /**
     * Defines the "live" value of the component.
     *
     * **Note:** If we have an item e.g. "Bulgaria", "B" is typed, "ulgaria" is typed ahead, value will be "Bulgaria", filterValue will be "B".
     *
     * **Note:** Initially the filter value is synced with value.
     * @default ""
     * @private
     */
    filterValue: string;
    /**
     * Defines a short hint intended to aid the user with data entry when the
     * component has no value.
     * @default undefined
     * @public
     */
    placeholder?: string;
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
     * Defines whether the clear icon of the combobox will be shown.
     * @default false
     * @public
     * @since 1.20.1
     */
    showClearIcon: boolean;
    /**
     * Indicates whether the input is focused
     * @private
     */
    focused: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef?: string;
    _iconPressed: boolean;
    _filteredItems: Array<IComboBoxItem>;
    _listWidth?: number;
    _effectiveShowClearIcon: boolean;
    /**
     * Indicates whether the value state message popover is open.
     * @private
     * @since 2.0.0
     */
    valueStateOpen: boolean;
    /**
     * Indicates whether the items picker is open.
     * @public
     * @since 2.9.0
     */
    open: boolean;
    /**
     * Indicates whether link navigation is being handled.
     * @default false
     * @since 2.11.0
     * @private
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
    items: DefaultSlot<IComboBoxItem>;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     * The value state message slot should contain only one root element.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the `ui5-combobox` is in `Information`, `Critical` or `Negative` value state.
     * @since 1.0.0-rc.9
     * @public
     */
    valueStateMessage: Slot<HTMLElement>;
    /**
     * Defines the icon to be displayed in the input field.
     * @public
     * @since 1.0.0-rc.9
     */
    icon: Slot<IIcon>;
    _initialRendering: boolean;
    _itemFocused: boolean;
    _autocomplete: boolean;
    _isKeyNavigation: boolean;
    _selectionPerformed: boolean;
    _lastValue: string;
    _selectedItemText: string;
    _userTypedValue: string;
    _valueStateLinks: Array<HTMLElement>;
    _composition?: InputComposition;
    static i18nBundle: I18nBundle;
    static composition: typeof InputComposition;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): string;
    constructor();
    onBeforeRendering(): void;
    get iconsCount(): number;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _focusin(e: FocusEvent): void;
    _focusout(e: FocusEvent): void;
    _beforeOpenPopover(): void;
    _afterOpenPopover(): void;
    _afterClosePopover(): void;
    _toggleRespPopover(): void;
    storeResponsivePopoverWidth(): void;
    _handleValueStatePopoverFocusout(): void;
    _handleValueStatePopoverAfterClose(): void;
    _getValueStatePopover(): Popover;
    _getItemsList(): List;
    _resetFilter(): void;
    _resetItemVisibility(): void;
    _arrowClick(): void;
    _handleMobileKeydown(e: KeyboardEvent): void;
    _handleMobileInput(e: CustomEvent<InputEventDetail>): void;
    _input(e: InputEvent): void;
    shouldAutocomplete(e: InputEvent): boolean;
    _startsWithMatchingItems(str: string): Array<IComboBoxItem>;
    _clearFocus(): void;
    _getItems(): IComboBoxItem[];
    handleNavKeyPress(e: KeyboardEvent): void;
    _handleItemNavigation(e: KeyboardEvent, indexOfItem: number, isForward: boolean): void;
    _handleTypeAhead(value: string, filterValue: string): void;
    _handleArrowDown(e: KeyboardEvent, indexOfItem: number): void;
    _handleArrowUp(e: KeyboardEvent, indexOfItem: number): void;
    _handlePageUp(e: KeyboardEvent, indexOfItem: number): void;
    _handlePageDown(e: KeyboardEvent, indexOfItem: number): void;
    _handleHome(e: KeyboardEvent): void;
    _handleEnd(e: KeyboardEvent): void;
    _keyup(): void;
    _keydown(e: KeyboardEvent): void;
    _addLinksEventListeners(): void;
    _removeLinksEventListeners(): void;
    _handleCtrlALtF8(): void;
    _handlePopoverKeydown(e: KeyboardEvent): void;
    _handlePopoverFocusout(): void;
    _click(): void;
    _closeRespPopover(e?: Event | null): void;
    _openRespPopover(): void;
    _filterItems(str: string): IComboBoxItem[];
    _getFirstMatchingItem(current: string): IComboBoxItem | void;
    _applyAtomicValueAndSelection(item: IComboBoxItem, filterValue: string): void;
    _selectMatchingItem(): void;
    _fireChangeEvent(): void;
    _inputChange(e: Event): void;
    _itemMousedown(e: MouseEvent): void;
    _selectItem(e: CustomEvent<ListItemClickEventDetail>): void;
    _onItemFocus(): void;
    _announceSelectedItem(indexOfItem: number): void;
    _clear(): void;
    _makeAllVisible(item: IComboBoxItem): void;
    _scrollToItem(indexOfItem: number): void;
    _announceValueStateText(): void;
    /**
     * Enables IME composition handling.
     * Dynamically loads the InputComposition feature and sets up event listeners.
     * @private
     */
    _enableComposition(): void;
    get _headerTitleText(): string;
    get _iconAccessibleNameText(): string;
    get _popupLabel(): string;
    get _dialogOkButtonText(): string;
    get _dialogCancelButtonText(): string;
    get inner(): HTMLInputElement;
    _getPicker(): ResponsivePopover;
    _getPickerInput(): HTMLInputElement;
    get openOnMobile(): boolean;
    get hasValueState(): boolean;
    get hasValueStateText(): boolean;
    get ariaValueStateHiddenText(): string;
    get valueStateDefaultText(): string | undefined;
    get valueStateTextMappings(): ValueStateAnnouncement;
    get valueStateTypeMappings(): ValueStateTypeAnnouncement;
    get shouldOpenValueStateMessagePopover(): boolean;
    get shouldDisplayDefaultValueStateMessage(): boolean;
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageIcon(): string;
    get linksInAriaValueStateHiddenText(): HTMLElement[];
    get valueStateLinksShortcutsTextAcc(): string;
    get ariaDescribedByText(): string;
    get _valueStateLinksShortcutsTextAccId(): "" | "hiddenText-value-state-link-shortcut";
    get valueStateTextId(): "" | "value-state-description";
    get _isPhone(): boolean;
    get itemTabIndex(): undefined;
    get ariaLabelText(): string | undefined;
    get clearIconAccessibleName(): string;
    get responsivePopoverId(): string;
    get styles(): {
        suggestionPopoverHeader: {
            display: string;
            width: string;
            "max-width": string;
        };
        suggestionsPopover: {
            "min-width": string;
            "max-width": string;
        };
        popoverValueStateMessage: {};
    };
    get classes(): {
        popover: {
            "ui5-suggestions-popover": boolean;
            "ui5-popover-with-value-state-header-phone": boolean;
            "ui5-popover-with-value-state-header": boolean;
        };
        popoverValueState: {
            "ui5-valuestatemessage-header": boolean;
            "ui5-valuestatemessage-root": boolean;
            "ui5-valuestatemessage--success": boolean;
            "ui5-valuestatemessage--error": boolean;
            "ui5-valuestatemessage--warning": boolean;
            "ui5-valuestatemessage--information": boolean;
        };
    };
}
export default ComboBox;
export type { ComboBoxSelectionChangeEventDetail, IComboBoxItem, };
