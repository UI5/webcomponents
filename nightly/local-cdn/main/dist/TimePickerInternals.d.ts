import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import type SegmentedButton from "./SegmentedButton.js";
type TimePickerComponentIndexMap = {
    hours: number;
    minutes: number;
    seconds: number;
};
type TimeSelectionPeriodProperties = {
    label: string;
    selected: boolean;
};
type TimeSelectionChangeEventDetail = {
    value: string | undefined;
    valid: boolean;
};
type TimePickerEntityAttributes = {
    min: number;
    max: number;
    step: number;
};
type TimePickerEntityProperties = {
    label: string;
    entity?: string;
    itemMin?: number;
    itemMax?: number;
    value: number;
    stringValue?: string;
    textValue?: string;
    displayStep?: number;
    lastItemReplacement?: number;
    hideFractions?: boolean;
    prependZero: boolean;
    active?: boolean;
    skipAnimation?: boolean;
    focused?: boolean;
    hasSeparator?: boolean;
    attributes?: TimePickerEntityAttributes;
};
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-time-picker-internals` is helper component that contains shared methods used in `ui5-time-selection-clocks`
 * and `<ui5-time-selection-inputs>` components and should not be used separately.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.15.0
 * @private
 */
declare class TimePickerInternals extends UI5Element {
    eventDetails: {
        change: TimeSelectionChangeEventDetail;
    };
    /**
     * Defines a formatted time value.
     * @default undefined
     * @public
     */
    value?: string;
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
     * The index of the active Clock/TogleSpinButton.
     * @default 0
     * @private
     */
    _activeIndex: number;
    /**
     * Contains calendar type.
     * @private
     */
    _calendarType?: `${CalendarType}`;
    /**
     * Contains currently available Time Picker components depending on time format.
     * @private
     */
    _entities: Array<TimePickerEntityProperties>;
    /**
     * Contains component-to-index map.
     * @private
     */
    _componentMap: TimePickerComponentIndexMap;
    /**
     * Contains currently available Button components depending on time format.
     * @private
     */
    _periods: Array<TimeSelectionPeriodProperties>;
    /**
     * Id of the cooldown interval
     * @private
     */
    _typeCooldownId?: ReturnType<typeof setTimeout>;
    /**
     * Exact match number buffer
     * @private
     */
    _exactMatch?: number;
    /**
     * Buffer for entered by keyboard numbers
     * @private
     */
    _keyboardBuffer: string;
    static i18nBundle: I18nBundle;
    get _hoursConfiguration(): import("./timepicker-utils/TimeSlider.js").HoursConfiguration;
    get _zeroPaddedHours(): boolean;
    get _neededComponents(): boolean[];
    get _hasHoursComponent(): boolean;
    get _hasMinutesComponent(): boolean;
    get _hasSecondsComponent(): boolean;
    get _hasPeriodsComponent(): boolean;
    get dateValue(): Date | import("sap/ui/core/date/UI5Date").default;
    get validDateValue(): Date | import("sap/ui/core/date/UI5Date").default;
    get periodsArray(): string[];
    get _hours(): string;
    get _minutes(): string;
    get _seconds(): string;
    get _period(): string | undefined;
    get _formatPattern(): string;
    get _isPattern(): boolean;
    get hoursLabel(): string;
    get minutesLabel(): string;
    get secondsLabel(): string;
    get clockDialAriaLabel(): string;
    setValue(date: Date): void;
    isValid(value: string): true | Date | Date[] | import("sap/ui/core/date/UI5Date").default | import("sap/ui/core/date/UI5Date").default[];
    normalizeValue(value: string): string;
    getFormat(): DateFormat;
    formatValue(date: Date): string;
    _componentKey(name: string): keyof TimePickerComponentIndexMap;
    _indexFromName(name: string): number;
    /**
     * Returns name of the clock or button from the id of the event target.
     * @returns name of the clock/button
     */
    _getNameFromId(id: string): string | undefined;
    /**
     * Returns index of the clock or button from the id of the event target.
     * @returns index of the clock/button
     */
    _getIndexFromId(id: string): number;
    /**
     * Changes hours value.
     * @param hours new hours value
     */
    _hoursChange(hours: number): void;
    /**
     * Changes minutes value.
     * @param minutes new minutes value
     */
    _minutesChange(minutes: number): void;
    /**
     * Changes seconds value.
     * @param seconds new seconds value
     */
    _secondsChange(seconds: number): void;
    _buttonAmPm(): SegmentedButton | null | undefined;
    _createPeriodComponent(): void;
    _periodChange(evt: MouseEvent): void;
    _calculatePeriodChange(period: string): void;
    /**
     * Shifts hours value with +/- 12 depending on hour value and day period.
     * @param hours current hours
     * @returns shifted hours
     */
    _shiftHours(hours: number): number;
    /**
     * Clears the currently existing cooldown period and starts new one if requested.
     * @param startNewCooldown whether to start new cooldown period after clearing previous one
     */
    _resetCooldown(startNewCooldown: boolean): void;
    /**
     * Starts new cooldown period.
     */
    _startCooldown(): void;
    /**
     * Sets the exact match value. Override if necessary.
     */
    _setExactMatch(): void;
}
export default TimePickerInternals;
export type { TimePickerComponentIndexMap, TimeSelectionChangeEventDetail, };
