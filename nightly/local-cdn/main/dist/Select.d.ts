import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import SelectTextSeparator from "./types/SelectTextSeparator.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { Timeout, AriaRole } from "@ui5/webcomponents-base/dist/types.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type { ListItemClickEventDetail } from "./List.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Popover from "./Popover.js";
import type ListItemBase from "./ListItemBase.js";
/**
 * Interface for components that may be slotted inside `ui5-select` as options
 * @public
 */
interface IOption extends ListItemBase {
    tooltip?: string;
    icon?: string;
    value?: string;
    additionalText?: string;
    focused: boolean;
    effectiveDisplayText: string;
}
type SelectChangeEventDetail = {
    selectedOption: IOption;
};
type SelectLiveChangeEventDetail = {
    selectedOption: IOption;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-select` component is used to create a drop-down list.
 *
 * ### Usage
 *
 * There are two main usages of the `ui5-select>`.
 *
 * - With Option (`ui5-option`) web component:
 *
 * The available options of the Select are defined by using the Option component.
 * The Option comes with predefined design and layout, including `icon`, `text` and `additional-text`.
 *
 * - With OptionCustom (`ui5-option-custom`) web component.
 *
 * Options with custom content are defined by using the OptionCustom component.
 * The OptionCustom component comes with no predefined layout and it expects consumers to define it.
 *
 * ### Selection
 *
 * The options can be selected via user interaction (click or with the use of the Space and Enter keys)
 * and programmatically - the Select component supports two distinct selection APIs, though mixing them is not supported:
 * - The "value" property of the Select component
 * - The "selected" property on individual options
 *
 * **Note:** If the "value" property is set but does not match any option,
 * no option will be selected and the Select component will be displayed as empty.
 *
 * **Note:** when both "value" and "selected" are both used (although discouraged),
 * the "value" property will take precedence.
 *
 * ### Keyboard Handling
 *
 * The `ui5-select` provides advanced keyboard handling.
 *
 * - [F4] / [Alt] + [Up] / [Alt] + [Down] / [Space] or [Enter] - Opens/closes the drop-down.
 * - [Up] or [Down] - If the drop-down is closed - changes selection to the next or the previous option. If the drop-down is opened - moves focus to the next or the previous option.
 * - [Space], [Enter] - If the drop-down is opened - selects the focused option.
 * - [Escape] - Closes the drop-down without changing the selection.
 * - [Home] - Navigates to first option
 * - [End] - Navigates to the last option
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Select";`
 *
 * `import "@ui5/webcomponents/dist/Option";`
 * `import "@ui5/webcomponents/dist/OptionCustom";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart popover - Used to style the popover element
 * @since 0.8.0
 */
declare class Select extends UI5Element implements IFormInputElement {
    eventDetails: {
        "change": SelectChangeEventDetail;
        "live-change": SelectLiveChangeEventDetail;
        "open": void;
        "close": void;
        "selected-item-changed": void;
        "input": void;
    };
    static i18nBundle: I18nBundle;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the icon, displayed as graphical element within the component.
     * When set, the component will display the icon only - the selected option's text,
     * the Select's "label" slot (if present) and the dropdown arrow won't be displayed.
     *
     * The SAP-icons font provides numerous options.
     *
     * Example:
     * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     *
     * **Note:** When using this property with a valid icon, Select will be rendered as icon only button and the label and the default arrow down won't be visible.
     * @default undefined
     * @private
     */
    icon?: string;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component is required.
     * @since 1.0.0-rc.9
     * @default false
     * @public
     */
    required: boolean;
    /**
     * Defines whether the component is read-only.
     *
     * **Note:** A read-only component is not editable,
     * but still provides visual feedback upon user interaction.
     * @default false
     * @since 1.21.0
     * @public
     */
    readonly: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @since 1.0.0-rc.9
     * @public
     * @default undefined
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the select.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.14.0
     */
    accessibleDescription?: string;
    /**
     * Receives id(or many ids) of the elements that describe the select.
     * @default undefined
     * @public
     * @since 2.14.0
     */
    accessibleDescriptionRef?: string;
    /**
     * Defines the tooltip of the select.
     * @default undefined
     * @public
     * @since 2.8.0
     */
    tooltip?: string;
    /**
     * Defines the separator type for the two columns layout when Select is in read-only mode.
     *
     * @default "Dash"
     * @public
     * @since 2.16.0
     */
    textSeparator: `${SelectTextSeparator}`;
    /**
     * Constantly updated value of texts collected from the associated description texts
     * @private
     */
    _associatedDescriptionRefTexts?: string;
    /**
     * @private
     */
    _iconPressed: boolean;
    /**
     * @private
     */
    opened: boolean;
    /**
     * @private
     */
    _listWidth: number;
    /**
     * @private
     */
    focused: boolean;
    _selectedIndexBeforeOpen: number;
    _escapePressed: boolean;
    _lastSelectedOption: IOption | null;
    _typedChars: string;
    _typingTimeoutID?: Timeout | number;
    responsivePopover: ResponsivePopover;
    valueStatePopover?: Popover;
    _valueStorage: string | undefined;
    /**
     * Defines the component options.
     *
     * **Note:** Only one selected option is allowed.
     * If more than one option is defined as selected, the last one would be considered as the selected one.
     *
     * **Note:** Use the `ui5-option` component to define the desired options.
     * @public
     */
    options: DefaultSlot<IOption>;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the component is in `Information`, `Critical` or `Negative` value state.
     *
     * **Note:** If the component has `suggestionItems`,
     * the `valueStateMessage` would be displayed as part of the same popover, if used on desktop, or dialog - on phone.
     * @public
    */
    valueStateMessage: Slot<HTMLElement>;
    /**
     * Defines the HTML element that will be displayed in the component input part,
     * representing the selected option.
     *
     * **Note:** If not specified and `ui5-option-custom` is used,
     * either the option's `display-text` or its textContent will be displayed.
     *
     * **Note:** If not specified and `ui5-option` is used,
     * the option's textContent will be displayed.
     * @public
     * @since 1.17.0
    */
    label: Slot<HTMLElement>;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): string | null;
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    /**
     * Selects an option, based on the Select's "value" property,
     * or the options' "selected" property.
     */
    _applySelection(): void;
    /**
     * Selects an option by given value.
     */
    _applySelectionByValue(value: string): void;
    /**
     * Selects the first option if no option is selected,
     * or selects the last option if multiple options are selected.
     */
    _applyAutoSelection(): void;
    /**
     * Sets value by given option.
     */
    _setValueByOption(option: IOption): void;
    _applyFocus(): void;
    _onfocusin(): void;
    _onfocusout(): void;
    get _isPickerOpen(): boolean;
    _respPopover(): ResponsivePopover;
    /**
     * Defines the value of the component:
     *
     * - when get - returns the value of the component or the value/text content of the selected option.
     * - when set - selects the option with matching `value` property or text content.
     *
     * **Note:** Use either the Select's value or the Options' selected property.
     * Mixed usage could result in unexpected behavior.
     *
     * **Note:** If the given value does not match any existing option,
     * no option will be selected and the Select component will be displayed as empty.
     * @public
     * @default ""
     * @since 1.20.0
     * @formProperty
     * @formEvents change liveChange
     */
    set value(newValue: string);
    get value(): string;
    get _selectedIndex(): number;
    /**
     * Currently selected `ui5-option` element.
     * @public
     * @default undefined
     */
    get selectedOption(): IOption | undefined;
    /**
     * Helper function to build display text with separator when additional text exists
     * @param mainText - The main text content
     * @param additionalText - The additional text (optional)
     * @returns The combined text with separator if additionalText exists, otherwise just mainText
     * @private
     */
    _buildDisplayText(mainText: string, additionalText?: string): string;
    get text(): string;
    get _effectiveTooltip(): string | undefined;
    get _separatorSymbol(): string;
    _toggleRespPopover(): void;
    _onkeydown(e: KeyboardEvent): void;
    _handleKeyboardNavigation(e: KeyboardEvent): void;
    _selectTypedItem(text: string): void;
    _searchNextItemByText(text: string): IOption | undefined;
    _handleHomeKey(e: KeyboardEvent): void;
    _handleEndKey(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _getItemIndex(item: IOption): number;
    _select(index: number): void;
    /**
     * The user clicked on an item from the list
     * @private
     */
    _handleItemPress(e: CustomEvent<ListItemClickEventDetail>): void;
    _itemMousedown(e: MouseEvent): void;
    _onclick(): void;
    /**
     * The user selected an item with Enter or Space
     * @private
     */
    _handleSelectionChange(index?: number): void;
    _scrollSelectedItem(): void;
    _handleArrowNavigation(e: KeyboardEvent): void;
    _changeSelectedItem(oldIndex: number, newIndex: number): void;
    _getNextOptionIndex(): number;
    _getPreviousOptionIndex(): number;
    _beforeOpen(): void;
    _afterOpen(): void;
    _applyFocusToSelectedItem(): void;
    _afterClose(): void;
    get hasCustomLabel(): boolean;
    _fireChangeEvent(selectedOption: IOption): void;
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
    get valueStateText(): string;
    get valueStateDefaultText(): string;
    get valueStateTypeText(): string;
    get hasValueState(): boolean;
    get valueStateTextId(): string | undefined;
    get responsivePopoverId(): string;
    get isDisabled(): true | undefined;
    get _headerTitleText(): string;
    get _currentlySelectedOption(): IOption;
    get _effectiveTabIndex(): 0 | -1;
    /**
    * This method is relevant for sap_horizon theme only
    */
    get _valueStateMessageInputIcon(): string;
    get iconsCount(): number;
    get classes(): {
        popoverValueState: {
            "ui5-valuestatemessage-root": boolean;
            "ui5-valuestatemessage-header": boolean;
            "ui5-valuestatemessage--success": boolean;
            "ui5-valuestatemessage--error": boolean;
            "ui5-valuestatemessage--warning": boolean;
            "ui5-valuestatemessage--information": boolean;
        };
        popover: {
            "ui5-select-popover-valuestate": boolean;
        };
    };
    get styles(): {
        popoverHeader: {
            display: string;
        };
        responsivePopoverHeader: {
            display: string;
            width: string;
            "max-width": string;
        };
        responsivePopover: {
            "min-width": string;
        };
    };
    get ariaLabelText(): string | undefined;
    get shouldDisplayDefaultValueStateMessage(): boolean;
    get hasValueStateText(): boolean;
    get shouldOpenValueStateMessagePopover(): boolean;
    get _ariaRoleDescription(): string;
    get _isPhone(): boolean;
    itemSelectionAnnounce(): void;
    openValueStatePopover(): void;
    closeValueStatePopover(): void;
    toggleValueStatePopover(open: boolean): void;
    get selectedOptionIcon(): string | undefined;
    get ariaDescriptionText(): string | undefined;
    get ariaDescriptionTextId(): "" | "accessibleDescription";
    get ariaDescribedByIds(): string | undefined;
    get accessibilityInfo(): {
        role: AriaRole;
        type: string;
        description: string;
        label: string | undefined;
        readonly: boolean;
        required: boolean;
        disabled: boolean;
    };
    _updateAssociatedLabelsTexts(): void;
    _getPopover(): Popover | null;
}
export default Select;
export type { IOption, SelectChangeEventDetail, SelectLiveChangeEventDetail, };
