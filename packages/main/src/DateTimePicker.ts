import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import "@ui5/webcomponents-icons/dist/date-time.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { SegmentedButtonSelectionChangeEventDetail } from "./SegmentedButton.js";
import type { CalendarSelectionChangeEventDetail } from "./Calendar.js";
import DatePicker from "./DatePicker.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type {
	DatePickerChangeEventDetail as DateTimePickerChangeEventDetail,
	DatePickerInputEventDetail as DateTimePickerInputEventDetail,
} from "./DatePicker.js";
import type { TimeSelectionChangeEventDetail } from "./TimePickerInternals.js";

// i18n texts
import {
	TIMEPICKER_SUBMIT_BUTTON,
	TIMEPICKER_CANCEL_BUTTON,
	DATETIME_DESCRIPTION,
	DATETIME_PICKER_DATE_BUTTON,
	DATETIME_PICKER_TIME_BUTTON,
	DATETIMEPICKER_POPOVER_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";

// Template
import DateTimePickerTemplate from "./DateTimePickerTemplate.js";

// Styles
import DateTimePickerCss from "./generated/themes/DateTimePicker.css.js";
import DateTimePickerPopoverCss from "./generated/themes/DateTimePickerPopover.css.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import type TimeSelectionClocks from "./TimeSelectionClocks.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";

const PHONE_MODE_BREAKPOINT = 640; // px

type PreviewValues = {
	timeSelectionValue?: string,
	calendarTimestamp?: number,
	calendarValue?: string,
}

/**
 * @class
 *
 * ### Overview
 * The `DateTimePicker` component alows users to select both date (day, month and year) and time (hours, minutes and seconds)
 * and for the purpose it consists of input field and Date/Time picker.
 *
 * ### Usage
 *
 * Use the `DateTimePicker` if you need a combined date and time input component.
 * Don't use it if you want to use either date, or time value.
 * In this case, use the `DatePicker` or the `TimePicker` components instead.
 *
 * The user can set date/time by:
 *
 * - using the calendar and the time selectors
 * - typing in the input field
 *
 * Programmatically, to set date/time for the `DateTimePicker`, use the `value` property
 *
 * ### Formatting
 *
 * The value entered by typing into the input field must fit to the used date/time format.
 *
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see [UTS #35: Unicode Locale Data Markup Language](https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 *
 * **Example:** the following format `dd/MM/yyyy, hh:mm:ss aa`
 * corresponds the `13/04/2020, 03:16:16 AM` value.
 *
 * The small 'h' defines "12" hours format and the "aa" symbols - "AM/PM" time periods.
 *
 * **Example:** the following format `dd/MM/yyyy, HH:mm:ss`
 * corresponds the `13/04/2020, 15:16:16` value.
 *
 * The capital 'H' indicates "24" hours format.
 *
 * **Note:** If the `formatPattern` does NOT include time,
 * the `DateTimePicker` will fallback to the default time format according to the locale.
 *
 * **Note:** If no placeholder is set to the `DateTimePicker`,
 * the current `formatPattern` is displayed as a placeholder.
 * If another placeholder is needed, it must be set or in case no placeholder is needed - it can be set to an empty string.
 *
 * **Note:** If the user input does NOT match the `formatPattern`,
 * the `DateTimePicker` makes an attempt to parse it based on the
 * locale settings.
 *
 * ### Responsive behavior
 *
 * The `DateTimePicker` is responsive and fully adapts to all devices.
 * For larger screens, such as tablet or desktop, it is displayed as a popover, while
 * on phone devices, it is displayed full screen.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DateTimePicker.js";`
 * @constructor
 * @extends DatePicker
 * @since 1.0.0-rc.7
 * @public
 */
@customElement({
	tag: "ui5-datetime-picker",
	template: DateTimePickerTemplate,
	styles: [
		DatePicker.styles,
		DateTimePickerCss,
		DateTimePickerPopoverCss,
	],
})
class DateTimePicker extends DatePicker implements IFormInputElement {
	/**
	 * Defines the visibility of the time view in `phoneMode`.
	 * For more information, see the `phoneMode` property.
	 *
	 * **Note:** The date view would be displayed by default.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_showTimeView = false

	/**
	 * Defines if the `DateTimePicker` should be displayed in phone mode.
	 * The phone mode turns on when the component is used on small screens or phone devices.
	 * In phone mode the user can see either the calendar view, or the time view
	 * and can switch between the views via toggle buttons.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_phoneMode = false;

	/**
	 * Selected, but not yet confirmed date/time
	 * @private
	 */
	@property({ type: Object })
	_previewValues: PreviewValues = {};

	@query("[ui5-time-selection-clocks]")
	_clocks!: TimeSelectionClocks;

	_handleResizeBound: ResizeObserverCallback;

	constructor() {
		super();
		this._handleResizeBound = this._handleResize.bind(this);
	}

	/**
	 * @override
	 */
	onResponsivePopoverAfterClose() {
		super.onResponsivePopoverAfterClose();
		this._showTimeView = false;
		this._previewValues = {};
	}

	/**
	 * LIFECYCLE METHODS
	 */

	onEnterDOM() {
		ResizeHandler.register(document.body, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(document.body, this._handleResizeBound);
	}

	/**
	 * @override
	 * @private
	 */
	_togglePicker() {
		super._togglePicker();

		if (this.open) {
			this._previewValues = {
				...this._previewValues,
				timeSelectionValue: this.value || this.getValueFormat().format(UI5Date.getInstance()),
			};
		}
	}

	get _formatPattern() {
		const hasHours = !!(this.formatPattern || "").match(/H/i);
		const fallback = !this.formatPattern || !hasHours;

		const localeData = getCachedLocaleDataInstance(getLocale());
		return fallback ? localeData.getCombinedDateTimePattern("medium", "medium", this._primaryCalendarType) : (this.formatPattern || "");
	}

	get _calendarTimestamp() {
		return this._previewValues.calendarTimestamp ? this._previewValues.calendarTimestamp : super._calendarTimestamp;
	}

	get _calendarSelectedDates() {
		return this._previewValues.calendarValue ? [this._previewValues.calendarValue] : super._calendarSelectedDates;
	}

	get _timeSelectionValue() {
		return this._previewValues.timeSelectionValue ? this._previewValues.timeSelectionValue : this.value;
	}

	get openIconName() {
		return "date-time";
	}

	get btnOKLabel() {
		return DateTimePicker.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
	}

	get btnCancelLabel() {
		return DateTimePicker.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
	}

	get btnDateLabel() {
		return DateTimePicker.i18nBundle.getText(DATETIME_PICKER_DATE_BUTTON);
	}

	get btnTimeLabel() {
		return DateTimePicker.i18nBundle.getText(DATETIME_PICKER_TIME_BUTTON);
	}

	get showFooter() {
		return true;
	}

	get showDateView() {
		return this._phoneView ? !this._showTimeView : true;
	}

	get showTimeView() {
		return this._phoneView ? this._showTimeView : true;
	}

	get _phoneView() {
		return isPhone() || this._phoneMode;
	}

	/**
	 * @override
	 */
	get roleDescription() {
		return DateTimePicker.i18nBundle.getText(DATETIME_DESCRIPTION);
	}

	/**
	 * @override
	 */
	get pickerAccessibleName() {
		return DateTimePicker.i18nBundle.getText(DATETIMEPICKER_POPOVER_ACCESSIBLE_NAME, this.ariaLabelText);
	}

	/**
	 * Defines whether the dialog on mobile should have header
	 * @private
	 */
	get _shouldHideHeader() {
		return true;
	}

	/**
	 * EVENT HANDLERS
	 */

	/**
	 * @override
	 */
	async onSelectedDatesChange(e: CustomEvent<CalendarSelectionChangeEventDetail>) {
		e.preventDefault();
		// @ts-ignore Needed for FF
		const dateTimePickerContent = e.path ? e.path[1] : e.composedPath()[1];
		this._previewValues = {
			...this._previewValues,
			calendarTimestamp: e.detail.timestamp,
			calendarValue: e.detail.selectedValues[0],
			timeSelectionValue: dateTimePickerContent.lastChild.value,
		};
		this._showTimeView = true;

		if (this.showDateView) {
			return;
		}

		await renderFinished();
		this._clocks.focus();
	}

	onTimeSelectionChange(e: CustomEvent<TimeSelectionChangeEventDetail>) {
		this._previewValues = {
			...this._previewValues,
			timeSelectionValue: e.detail.value,
		};
	}

	/**
	 * Handles document resize to switch between `phoneMode` and normal appearance.
	 */
	_handleResize() {
		const documentWidth = document.body.offsetWidth;
		const toPhoneMode = documentWidth <= PHONE_MODE_BREAKPOINT;
		const modeChange = (toPhoneMode && !this._phoneMode) || (!toPhoneMode && this._phoneMode); // XOR not allowed by lint

		if (modeChange) {
			this._phoneMode = toPhoneMode;
		}
	}

	get _submitDisabled() {
		return !this._calendarSelectedDates || !this._calendarSelectedDates.length;
	}

	/**
	 * Handles clicking on the `submit` button, within the picker`s footer.
	 */
	_submitClick() {
		const selectedDate = this.getSelectedDateTime();

		const value = this.getValueFormat().format(selectedDate);
		if (this.value !== value) {
			this._updateValueAndFireEvents(value, true, ["change", "value-changed"]);
		}

		this._togglePicker();
	}

	/**
	 * Handles clicking on the `cancel` button, within the picker`s footer,
	 * that would disregard the user selection.
	 */
	_cancelClick() {
		this._togglePicker();
	}

	/**
	 * Handles the date/time switch available in `phoneMode` to switch
	 * between the date and time views.
	 * @param e
	 */
	_dateTimeSwitchChange(e: CustomEvent<SegmentedButtonSelectionChangeEventDetail>) { // Note: fix when SegmentedButton is implemented in TS
		const selectedItem = e.detail.selectedItems[0];
		this._showTimeView = selectedItem.getAttribute("data-ui5-key") === "Time";
	}

	/**
	 * @override
	 */
	_modifyDateValue(amount: number, unit: string, preserveDate: boolean) {
		if (!this.dateValue) {
			return;
		}

		const modifiedDate = modifyDateBy(CalendarDate.fromLocalJSDate(this.dateValue), amount, unit, preserveDate, this._minDate, this._maxDate);
		const modifiedLocalDate = modifiedDate.toLocalJSDate();
		modifiedLocalDate.setHours(this.dateValue.getHours());
		modifiedLocalDate.setMinutes(this.dateValue.getMinutes());
		modifiedLocalDate.setSeconds(this.dateValue.getSeconds());

		const newValue = this.formatValue(modifiedLocalDate);
		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
	}

	/**
	 * Checks if the provided value is valid and within valid range.
	 * @override
	 * @param value
	 */
	_checkValueValidity(value: string): boolean {
		if (value === "") {
			return true;
		}
		return this.isValidValue(value);
	}

	getSelectedDateTime() {
		const selectedDate = this.getValueFormat().parse(this._calendarSelectedDates[0]) as Date;
		const selectedTime = this.getValueFormat().parse(this._timeSelectionValue) as Date;
		if (selectedTime) {
			selectedDate.setHours(selectedTime.getHours());
			selectedDate.setMinutes(selectedTime.getMinutes());
			selectedDate.setSeconds(selectedTime.getSeconds());
		}

		return selectedDate;
	}

	getFormat() {
		return this._isPattern
			? DateFormat.getDateTimeInstance({
				strictParsing: true,
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			})
			: DateFormat.getDateTimeInstance({
				strictParsing: true,
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
	}

	getDisplayFormat() {
		return this._isDisplayFormatPattern
			? DateFormat.getDateTimeInstance({
				strictParsing: true,
				pattern: this._displayFormat,
				calendarType: this._primaryCalendarType,
			})
			: DateFormat.getDateTimeInstance({
				strictParsing: true,
				style: this._displayFormat,
				calendarType: this._primaryCalendarType,
			});
	}

	getValueFormat() {
		if (!this._valueFormat) {
			return this.getISOFormat();
		}

		return this._isValueFormatPattern
			? DateFormat.getDateTimeInstance({
				strictParsing: true,
				pattern: this._valueFormat,
				calendarType: this._primaryCalendarType,
			})
			: DateFormat.getDateTimeInstance({
				strictParsing: true,
				style: this._valueFormat,
				calendarType: this._primaryCalendarType,
			});
	}

	getISOFormat() {
		if (!this._isoFormatInstance) {
			this._isoFormatInstance = DateFormat.getDateTimeInstance({
				strictParsing: true,
				pattern: "YYYY-MM-dd hh:mm:ss",
				calendarType: this._primaryCalendarType,
			});
		}
		return this._isoFormatInstance;
	}

	/**
	 * @override
	 */
	get _calendarPickersMode() {
		return CalendarPickersMode.DAY_MONTH_YEAR;
	}
}

DateTimePicker.define();

export default DateTimePicker;
export type {
	DateTimePickerChangeEventDetail,
	DateTimePickerInputEventDetail,
};
