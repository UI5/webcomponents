import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import IconMode from "./types/IconMode.js";
import type Popover from "./Popover.js";
import type DateTimeInput from "./DateTimeInput.js";
import type { InputAccInfo } from "./Input.js";
import type TimeSelectionClocks from "./TimeSelectionClocks.js";
import type { TimeSelectionChangeEventDetail } from "./TimePickerInternals.js";
type ValueStateAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;
type TimePickerChangeInputEventDetail = {
    value: string;
    valid: boolean;
};
type TimePickerChangeEventDetail = TimePickerChangeInputEventDetail;
type TimePickerInputEventDetail = TimePickerChangeInputEventDetail;
/**
 * @class
 *
 * ### Overview
 * The `ui5-time-picker` component provides an input field with assigned clocks which are opened on user action.
 * The `ui5-time-picker` allows users to select a localized time using touch, mouse, or keyboard input.
 * It consists of two parts: the time input field and the clocks.
 *
 * ### Usage
 * The user can enter a time by:
 *
 * - Using the clocks that are displayed in a popup
 * - Typing it in directly in the input field
 *
 * When the user makes an entry and chooses the enter key, the clocks show the corresponding time (hours, minutes and seconds separately).
 * When the user directly triggers the clocks display, the actual time is displayed.
 * For the `ui5-time-picker`
 *
 * ### Formatting
 *
 * If a time is entered by typing it into
 * the input field, it must fit to the used time format.
 *
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see [UTS #35: Unicode Locale Data Markup Language](https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 *
 * For example, if the `format-pattern` is "HH:mm:ss",
 * a valid value string is "11:42:35" and the same is displayed in the input.
 *
 * ### Keyboard handling
 * [F4], [Alt]+[Up], [Alt]+[Down] Open/Close picker dialog and move focus to it.
 *
 * When closed:
 *
 * - [Page Up] - Increments hours by 1. If 12 am is reached, increment hours to 1 pm and vice versa.
 * - [Page Down] - Decrements the corresponding field by 1. If 1 pm is reached, decrement hours to 12 am and vice versa.
 * - [Shift]+[Page Up] - Increments minutes by 1.
 * - [Shift]+[Page Down] - Decrements minutes by 1.
 * - [Shift]+[Ctrl]+[Page Up] - Increments seconds by 1.
 * - [Shift]+[Ctrl]+[Page Down] - Decrements seconds by 1.
 * -
 *
 * When opened:
 *
 * - [Page Up] - Increments hours by 1. If 12 am is reached, increment hours to 1 pm and vice versa.
 * - [Page Down] - Decrements the corresponding field by 1. If 1 pm is reached, decrement hours to 12 am and vice versa.
 * - [Shift]+[Page Up] - Increments minutes by 1.
 * - [Shift]+[Page Down] - Decrements minutes by 1.
 * - [Shift]+[Ctrl]+[Page Up] - Increments seconds by 1.
 * - [Shift]+[Ctrl]+[Page Down] - Decrements seconds by 1.
 * - [A] or [P] - Selects AM or PM respectively.
 * - [0]-[9] - Allows direct time selecting (hours/minutes/seconds).
 * - [:] - Allows switching between hours/minutes/seconds clocks. If the last clock is displayed and [:] is pressed, the first clock is beind displayed.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TimePicker.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.6
 * @csspart input - Used to style the input element. This part is forwarded to the underlying ui5-input element.
 */
declare class TimePicker extends UI5Element implements IFormInputElement {
    eventDetails: {
        change: TimePickerChangeEventDetail;
        "value-changed": TimePickerChangeEventDetail;
        input: TimePickerInputEventDetail;
        open: void;
        close: void;
    };
    /**
     * Defines a formatted time value.
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
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines the disabled state of the comonent.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the readonly state of the comonent.
     * @default false
     * @public
     */
    readonly: boolean;
    /**
     * Defines a short hint, intended to aid the user with data entry when the
     * component has no value.
     *
     * **Note:** When no placeholder is set, the format pattern is displayed as a placeholder.
     * Passing an empty string as the value of this property will make the component appear empty - without placeholder or format pattern.
     * @default undefined
     * @public
     */
    placeholder?: string;
    /**
     * Determines the format, displayed in the input field.
     *
     * Example:
     * HH:mm:ss -> 11:42:35
     * hh:mm:ss a -> 2:23:15 PM
     * mm:ss -> 12:04 (only minutes and seconds)
     * @default undefined
     * @public
     */
    formatPattern?: string;
    /**
     * Defines the open or closed state of the popover.
     * @public
     * @default false
     * @since 2.0.0
     */
    open: boolean;
    /**
     * Defines whether the component is required.
     * @since 2.1.0
     * @default false
     * @public
     */
    required: boolean;
    /**
     * Defines the aria-label attribute for the component.
     * @default undefined
     * @public
     * @since 2.1.0
     */
    accessibleName?: string;
    /**
     * Receives id (or many ids) of the elements that label the component.
     * @default undefined
     * @public
     * @since 2.1.0
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
     * Receives id(or many ids) of the elements that describe the input.
     * @default undefined
     * @public
     * @since 2.14.0
     */
    accessibleDescriptionRef?: string;
    _isInputsPopoverOpen: boolean;
    /**
     * Defines the value state message that will be displayed as pop up under the `ui5-time-picker`.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the `ui5-time-picker` is in `Information`, `Critical` or `Negative` value state.
     * @since 1.0.0-rc.8
     * @public
     */
    valueStateMessage: Slot<HTMLElement>;
    _timeSelectionClocks?: TimeSelectionClocks;
    _inputsPopover: Popover;
    _dateTimeInput: DateTimeInput;
    tempValue?: string;
    static i18nBundle: I18nBundle;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): FormData | string | null;
    onBeforeRendering(): void;
    get roleDescription(): string;
    get pickerAccessibleName(): string;
    get accInfo(): InputAccInfo;
    get ariaLabelText(): string;
    /**
     * Currently selected time represented as JavaScript Date instance
     * @public
     * @default null
     */
    get dateValue(): Date | null;
    get _lastAvailableTime(): string;
    /**
     * @protected
     */
    get _placeholder(): string;
    /**
     * @protected
     */
    get _formatPattern(): string | undefined;
    get _displayFormat(): string;
    get _effectiveValue(): string;
    get _timeSelectionValue(): string | undefined;
    get _isPhone(): boolean;
    get _isMobileDevice(): boolean;
    get shouldDisplayValueStateMessageInResponsivePopover(): boolean;
    /**
     * Defines whether the value help icon is hidden
     * @private
     */
    get _iconMode(): IconMode.Decorative | IconMode.Interactive;
    onTimeSelectionChange(e: CustomEvent<TimeSelectionChangeEventDetail>): void;
    get openIconTitle(): string;
    _togglePicker(): void;
    submitPickers(): void;
    onResponsivePopoverAfterClose(): void;
    onResponsivePopoverBeforeOpen(): void;
    onResponsivePopoverAfterOpen(): void;
    /**
     * Opens the Inputs popover.
     * @private
     * @returns Resolves when the Inputs popover is open
     */
    openInputsPopover(): void;
    /**
     * Closes the Inputs popover
     * @private
     * @returns Resolves when the Inputs popover is closed
     */
    closeInputsPopover(): void;
    toggleInputsPopover(): void;
    /**
     * Checks if the inputs popover is open
     * @private
     */
    isInputsPopoverOpen(): boolean;
    submitInputsPopover(): void;
    onInputsPopoverAfterOpen(): void;
    onInputsPopoverAfterClose(): void;
    _handleInputClick(e: MouseEvent): void;
    _updateValueAndFireEvents(value: string, normalizeValue: boolean, eventsNames: Array<"input" | "change" | "value-changed">): void;
    _updateValueState(): void;
    _handleInputChange(e: CustomEvent): void;
    _onInputRequestSubmit(): void;
    _handleInputLiveChange(e: CustomEvent): void;
    _canOpenPicker(): boolean;
    _canOpenInputsPopover(): boolean;
    _getInputField(): HTMLInputElement | import("./Input.js").default | null;
    _onkeydown(e: KeyboardEvent): void;
    get _isPattern(): boolean;
    getFormat(): import("sap/ui/core/format/DateFormat").default;
    /**
     * Formats a Java Script date object into a string representing a locale date and time
     * according to the `formatPattern` property of the TimePicker instance
     * @param date A Java Script date object to be formatted as string
     * @public
     * @returns formatted value
     */
    formatValue(date: Date): string;
    /**
     * Checks if a value is valid against the current `formatPattern` value.
     *
     * **Note:** an empty string is considered as valid value.
     * @param value The value to be tested against the current date format
     * @public
     */
    isValid(value: string | undefined): boolean;
    normalizeValue(value: string): string;
    _modifyValueBy(amount: number, unit: string): void;
    /**
     * The listener for this event can't be passive as it calls preventDefault()
     * @param e Wheel Event
     * @private
     */
    _handleWheel(e: WheelEvent): void;
    /**
     * Hides mobile device keyboard by temporary setting the input to readonly state.
     */
    _hideMobileKeyboard(): void;
    _onfocusin(e: FocusEvent): void;
    get valueStateDefaultText(): string | undefined;
    get valueStateTextMappings(): ValueStateAnnouncement;
    get shouldDisplayDefaultValueStateMessage(): boolean;
    get submitButtonLabel(): string;
    get cancelButtonLabel(): string;
    get hasValueStateText(): boolean;
    get hasValueState(): boolean;
    get shouldDisplayValueStateMessageOnDesktop(): boolean;
    get _headerTitleText(): string;
    get showHeader(): boolean;
    /**
     * Defines whether the dialog on mobile should have header
     * @private
     */
    get _shouldHideHeader(): boolean;
    /**
     * @protected
     */
    get openIconName(): string;
}
export default TimePicker;
export type { TimeSelectionChangeEventDetail, TimePickerChangeEventDetail, TimePickerInputEventDetail, };
