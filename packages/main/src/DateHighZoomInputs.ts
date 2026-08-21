import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

import {
	DATEPICKER_HZ_YEAR_LABEL,
	DATEPICKER_HZ_MONTH_LABEL,
	DATEPICKER_HZ_DAY_LABEL,
	DATEPICKER_HZ_FROM_LABEL,
	DATEPICKER_HZ_TO_LABEL,
	DATEPICKER_HZ_YEAR_OUT_OF_RANGE,
	DATEPICKER_HZ_MONTH_OUT_OF_RANGE,
	DATEPICKER_HZ_DAY_OUT_OF_RANGE,
	CALENDAR_FOOTER_OK_BUTTON,
	CALENDAR_FOOTER_CANCEL_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

import DateHighZoomInputsTemplate from "./DateHighZoomInputsTemplate.js";
import DateHighZoomInputsCss from "./generated/themes/DateHighZoomInputs.css.js";
import { DateHighZoomInputsMode, DateHighZoomInputsField } from "./types/DateHighZoomInputsTypes.js";
import type { YearPickerChangeEventDetail } from "./YearPicker.js";

type DateHighZoomInputsChangeEventDetail = {
	field: `${DateHighZoomInputsField}`;
	isEndDate: boolean;
};

/**
 * @class
 * Internal component used by date pickers at high zoom (≤320px viewport).
 * Renders Year/Month/Day selects instead of a calendar grid.
 * State is held here; logic (min/max, formatting) stays in the parent picker.
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-date-high-zoom-inputs",
	languageAware: true,
	renderer: jsxRenderer,
	styles: DateHighZoomInputsCss,
	template: DateHighZoomInputsTemplate,
})
@event("change")
class DateHighZoomInputs extends UI5Element {
	eventDetails!: {
		change: DateHighZoomInputsChangeEventDetail;
	};

	// ---- Props from parent picker ----

	/** Current selected start date — parent sets this, component syncs display fields */
	@property({ type: Object, noAttribute: true })
	dateValue: Date | null = null;

	/** Current selected end date (Range mode only) */
	@property({ type: Object, noAttribute: true })
	secondDateValue: Date | null = null;

	/** Minimum selectable date as ISO string (yyyy-MM-dd) — already parsed by parent */
	@property({ noAttribute: true })
	minDate = "";

	/** Maximum selectable date as ISO string (yyyy-MM-dd) — already parsed by parent */
	@property({ noAttribute: true })
	maxDate = "";

	/** Primary calendar type forwarded from parent */
	@property({ noAttribute: true })
	primaryCalendarType?: `${CalendarType}`;

	/** Single or Range mode */
	@property()
	mode: `${DateHighZoomInputsMode}` = DateHighZoomInputsMode.Single;

	// ---- Start date display state ----

	@property({ noAttribute: true })
	_yearValue = "";

	@property({ type: Number, noAttribute: true })
	_monthValue = 0;

	@property({ type: Number, noAttribute: true })
	_dayValue = 1;

	@property({ noAttribute: true })
	_yearValueState: `${ValueState}` = ValueState.None;

	@property({ noAttribute: true })
	_yearValueStateMessage = "";

	@property({ noAttribute: true })
	_monthValueState: `${ValueState}` = ValueState.None;

	@property({ noAttribute: true })
	_monthValueStateMessage = "";

	@property({ noAttribute: true })
	_dayValueState: `${ValueState}` = ValueState.None;

	@property({ noAttribute: true })
	_dayValueStateMessage = "";

	// ---- End date display state (Range mode) ----

	@property({ noAttribute: true })
	_endYearValue = "";

	@property({ type: Number, noAttribute: true })
	_endMonthValue = 0;

	@property({ type: Number, noAttribute: true })
	_endDayValue = 1;

	@property({ noAttribute: true })
	_endYearValueState: `${ValueState}` = ValueState.None;

	@property({ noAttribute: true })
	_endYearValueStateMessage = "";

	@property({ noAttribute: true })
	_endMonthValueState: `${ValueState}` = ValueState.None;

	@property({ noAttribute: true })
	_endMonthValueStateMessage = "";

	@property({ noAttribute: true })
	_endDayValueState: `${ValueState}` = ValueState.None;

	@property({ noAttribute: true })
	_endDayValueStateMessage = "";

	// ---- Year picker dialog state ----

	@property({ type: Boolean, noAttribute: true })
	_yearPickerOpen = false;

	@property({ type: Boolean, noAttribute: true })
	_endYearPickerOpen = false;

	// Plain instance vars — not @property to avoid re-render resetting the input
	_yearPickerTimestamp = 0;
	_endYearPickerTimestamp = 0;
	_pendingYear: number | null = null;
	_endPendingYear: number | null = null;

	// Gregorian source of truth — used to convert display values on calendar type toggle
	_gregYear = 0;
	_gregMonth = 0;
	_gregDay = 1;
	_gregEndYear = 0;
	_gregEndMonth = 0;
	_gregEndDay = 1;
	_hasEndValue = false;

	// Track last synced dateValue to avoid overwriting user edits on every re-render
	_syncedDateValue: Date | null = null;
	_syncedSecondDateValue: Date | null = null;
	_syncedCalType?: `${CalendarType}`;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	// ---- Lifecycle ----

	onBeforeRendering() {
		if (this.dateValue !== this._syncedDateValue) {
			this._syncedDateValue = this.dateValue;
			this.syncStartDate();
		}
		if (this._isRange && this.secondDateValue !== this._syncedSecondDateValue) {
			this._syncedSecondDateValue = this.secondDateValue;
			this.syncEndDate(this.secondDateValue);
		}
		// When the calendar type changes (e.g. parent toggled primary/secondary), re-derive
		// the display values from the unchanged Gregorian source of truth.
		if (this.primaryCalendarType !== this._syncedCalType) {
			this._syncedCalType = this.primaryCalendarType;
			this.convertToCalendarType();
		}
	}

	// ---- Labels ----

	get _yearLabel() { return DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_YEAR_LABEL); }
	get _monthLabel() { return DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_MONTH_LABEL); }
	get _dayLabel() { return DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_DAY_LABEL); }
	get _fromLabel() { return DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_FROM_LABEL); }
	get _toLabel() { return DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_TO_LABEL); }
	get _okLabel() { return DateHighZoomInputs.i18nBundle.getText(CALENDAR_FOOTER_OK_BUTTON); }
	get _cancelLabel() { return DateHighZoomInputs.i18nBundle.getText(CALENDAR_FOOTER_CANCEL_BUTTON); }

	get _isRange() {
		return this.mode === DateHighZoomInputsMode.Range;
	}

	// ---- Month / Day options ----

	get _calType(): `${CalendarType}` {
		return this.primaryCalendarType || "Gregorian";
	}

	get _monthOptions() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		const monthsNames = localeData.getMonthsStandAlone("wide", this._calType);
		return monthsNames.map((text, i) => ({ value: i, text }));
	}

	/**
	 * Number of days in the given month of the given year, in the current calendar type.
	 * Uses CalendarDate so non-Gregorian calendars (e.g. Islamic 29/30-day months) are correct.
	 */
	_getDaysInMonth(year: number, month: number) {
		if (Number.isNaN(year)) {
			// Fallback to the current year expressed in the active calendar type, so the
			// day count matches the (possibly non-Gregorian) year the caller is working in.
			year = CalendarDate.fromLocalJSDate(new Date(), this._calType).getYear();
		}
		// Day 0 of the next month is the last day of this month, in the target calendar.
		const lastDay = new CalendarDate(year, month, 1, this._calType);
		lastDay.setMonth(month + 1, 0);
		return lastDay.getDate();
	}

	get _dayOptions() {
		return Array.from({ length: this._getDaysInMonth(parseInt(this._yearValue), this._monthValue) }, (_, i) => i + 1);
	}

	get _endDayOptions() {
		return Array.from({ length: this._getDaysInMonth(parseInt(this._endYearValue), this._endMonthValue) }, (_, i) => i + 1);
	}

	// ---- Public API ----

	syncStartDate() {
		if (!this.dateValue) { return; }
		// Store Gregorian source of truth
		this._gregYear = this.dateValue.getFullYear();
		this._gregMonth = this.dateValue.getMonth();
		this._gregDay = this.dateValue.getDate();
		// Show in current calendar type
		this._applyCalendarTypeToDisplay(false);
	}

	/**
	 * Converts the Gregorian source (this._gregYear/Month/Day, or the end equivalents)
	 * to display values in the current primaryCalendarType, using UI5 CalendarDate so
	 * non-Gregorian calendars (Islamic, Buddhist, …) are handled correctly.
	 */
	_applyCalendarTypeToDisplay(isEnd: boolean) {
		const srcYear = isEnd ? this._gregEndYear : this._gregYear;
		const srcMonth = isEnd ? this._gregEndMonth : this._gregMonth;
		const srcDay = isEnd ? this._gregEndDay : this._gregDay;

		// Build the Gregorian source date with setFullYear so years 1-99 are not
		// remapped to 1901-1999 by the Date constructor.
		const srcDate = new Date(2000, 0, 1);
		srcDate.setFullYear(srcYear, srcMonth, srcDay);

		// Gregorian source → target calendar type
		const calDate = CalendarDate.fromLocalJSDate(srcDate, this._calType);
		const dispYear = calDate.getYear();
		const dispMonth = calDate.getMonth();
		const dispDay = calDate.getDate();
		const pickerTs = this._yearToTimestamp(srcYear);

		if (isEnd) {
			this._endYearValue = String(dispYear);
			this._endMonthValue = dispMonth;
			this._endDayValue = dispDay;
			this._endYearPickerTimestamp = pickerTs;
		} else {
			this._yearValue = String(dispYear);
			this._monthValue = dispMonth;
			this._dayValue = dispDay;
			this._yearPickerTimestamp = pickerTs;
		}
	}

	/**
	 * Re-derive display fields from the Gregorian source when the calendar type changes.
	 * Does NOT modify the Gregorian source.
	 */
	convertToCalendarType() {
		this._applyCalendarTypeToDisplay(false);
		if (this._isRange && this._hasEndValue) {
			this._applyCalendarTypeToDisplay(true);
		}
	}

	syncEndDate(date: Date | null) {
		if (!date) { this._hasEndValue = false; return; }
		this._hasEndValue = true;
		// Store Gregorian source of truth for the end date
		this._gregEndYear = date.getFullYear();
		this._gregEndMonth = date.getMonth();
		this._gregEndDay = date.getDate();
		this._applyCalendarTypeToDisplay(true);
	}

	/**
	 * Converts the current display values (in this._calType) back to a Gregorian
	 * {year, month, day}. Returns null if the display values are not a valid date.
	 */
	_displayToGregorian(isEnd: boolean): { year: number; month: number; day: number } | null {
		const yearStr = isEnd ? this._endYearValue : this._yearValue;
		const month = isEnd ? this._endMonthValue : this._monthValue;
		const day = isEnd ? this._endDayValue : this._dayValue;
		const year = parseInt(yearStr);
		if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) { return null; }
		const jsDate = new CalendarDate(year, month, day, this._calType).toLocalJSDate();
		return { year: jsDate.getFullYear(), month: jsDate.getMonth(), day: jsDate.getDate() };
	}

	getSelectedDate(): { year: number; month: number; day: number } {
		const greg = this._displayToGregorian(false);
		return greg || { year: NaN, month: NaN, day: NaN };
	}

	getSelectedSecondDate(): { year: number; month: number; day: number } | null {
		if (!this._isRange) { return null; }
		return this._displayToGregorian(true);
	}

	getDateObject(): Date | null {
		const { year, month, day } = this.getSelectedDate();
		if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) { return null; }
		const d = new Date(year, month, day);
		d.setFullYear(year);
		return d;
	}

	validate(): boolean {
		return this._doValidate(false);
	}

	validateEndDate(): boolean {
		if (!this._isRange) { return true; }
		return this._doValidate(true);
	}

	resetValueState() {
		this._yearValueState = ValueState.None;
		this._yearValueStateMessage = "";
		this._monthValueState = ValueState.None;
		this._monthValueStateMessage = "";
		this._dayValueState = ValueState.None;
		this._dayValueStateMessage = "";

		if (this._isRange) {
			this._endYearValueState = ValueState.None;
			this._endYearValueStateMessage = "";
			this._endMonthValueState = ValueState.None;
			this._endMonthValueStateMessage = "";
			this._endDayValueState = ValueState.None;
			this._endDayValueStateMessage = "";
		}
	}

	// ---- Internal validation ----

	_parseISO(iso: string): { getFullYear(): number; getMonth(): number; getDate(): number } | null {
		if (!iso) { return null; }
		const parts = iso.split("-");
		if (parts.length < 3) { return null; }
		const y = parseInt(parts[0]);
		const m = parseInt(parts[1]) - 1; // 0-based
		const d = parseInt(parts[2]);
		if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) { return null; }
		return { getFullYear: () => y, getMonth: () => m, getDate: () => d };
	}

	_doValidate(bEndDate: boolean): boolean {
		// Flag one field as invalid (or clear all when field is null).
		const applyState = (field: "year" | "month" | "day" | null, msg: string) => {
			if (bEndDate) {
				this._endYearValueState = field === "year" ? ValueState.Negative : ValueState.None;
				this._endYearValueStateMessage = field === "year" ? msg : "";
				this._endMonthValueState = field === "month" ? ValueState.Negative : ValueState.None;
				this._endMonthValueStateMessage = field === "month" ? msg : "";
				this._endDayValueState = field === "day" ? ValueState.Negative : ValueState.None;
				this._endDayValueStateMessage = field === "day" ? msg : "";
			} else {
				this._yearValueState = field === "year" ? ValueState.Negative : ValueState.None;
				this._yearValueStateMessage = field === "year" ? msg : "";
				this._monthValueState = field === "month" ? ValueState.Negative : ValueState.None;
				this._monthValueStateMessage = field === "month" ? msg : "";
				this._dayValueState = field === "day" ? ValueState.Negative : ValueState.None;
				this._dayValueStateMessage = field === "day" ? msg : "";
			}
		};

		const yearStr = bEndDate ? this._endYearValue : this._yearValue;
		const displayYear = parseInt(yearStr);

		const minD = this._parseISO(this.minDate);
		const maxD = this._parseISO(this.maxDate);
		const minY = minD ? minD.getFullYear() : 1;
		const maxY = maxD ? maxD.getFullYear() : 9999;
		const yearMsg = DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_YEAR_OUT_OF_RANGE, String(minY), String(maxY));
		const monthMsg = DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_MONTH_OUT_OF_RANGE);
		const dayMsg = DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_DAY_OUT_OF_RANGE);

		// Convert current display values to a Gregorian date for range comparison.
		const greg = this._displayToGregorian(bEndDate);
		if (Number.isNaN(displayYear) || !greg) {
			applyState("year", yearMsg);
			return false;
		}

		// 1. Year bound (compare in Gregorian)
		if (greg.year < minY || greg.year > maxY) {
			applyState("year", yearMsg);
			return false;
		}

		const selected = new CalendarDate(greg.year, greg.month, greg.day);

		// 2. Full-date lower bound
		if (minD) {
			const minDate = new CalendarDate(minD.getFullYear(), minD.getMonth(), minD.getDate());
			if (selected.isBefore(minDate)) {
				applyState(greg.month < minD.getMonth() ? "month" : "day", greg.month < minD.getMonth() ? monthMsg : dayMsg);
				return false;
			}
		}

		// 3. Full-date upper bound
		if (maxD) {
			const maxDate = new CalendarDate(maxD.getFullYear(), maxD.getMonth(), maxD.getDate());
			if (selected.isAfter(maxDate)) {
				applyState(greg.month > maxD.getMonth() ? "month" : "day", greg.month > maxD.getMonth() ? monthMsg : dayMsg);
				return false;
			}
		}

		// All good — clear all states.
		applyState(null, "");
		return true;
	}

	// ---- Event handlers ----

	/**
	 * After a user edits year/month/day, re-derive the Gregorian source of truth from
	 * the current display values so calendar-type toggles don't revert the edit.
	 */
	_syncGregorianFromDisplay(isEnd: boolean) {
		const greg = this._displayToGregorian(isEnd);
		if (!greg) { return; }
		if (isEnd) {
			this._gregEndYear = greg.year;
			this._gregEndMonth = greg.month;
			this._gregEndDay = greg.day;
			this._hasEndValue = true;
		} else {
			this._gregYear = greg.year;
			this._gregMonth = greg.month;
			this._gregDay = greg.day;
		}
	}

	/** Builds a picker timestamp (seconds) for Jan 1 of the given year, safe for years < 100. */
	_yearToTimestamp(year: number): number {
		const d = new Date(2000, 0, 1, 12, 0, 0);
		d.setFullYear(year, 0, 1);
		return d.getTime() / 1000;
	}

	_onYearInput(e: CustomEvent, isEnd: boolean) {
		const input = e.target as HTMLElement & { value: string };
		const y = parseInt(input.value);
		if (!Number.isNaN(y) && y > 0 && y < 10000) {
			if (isEnd) {
				this._endYearPickerTimestamp = this._yearToTimestamp(y);
			} else {
				this._yearPickerTimestamp = this._yearToTimestamp(y);
			}
		}
	}

	_onYearChange(e: CustomEvent, isEnd: boolean) {
		const input = e.target as HTMLElement & { value: string };
		const val = input.value;
		if (isEnd) {
			this._endYearValue = val;
			if (this._endDayValue > this._getDaysInMonth(parseInt(val), this._endMonthValue)) {
				this._endDayValue = 1;
			}
		} else {
			this._yearValue = val;
			if (this._dayValue > this._getDaysInMonth(parseInt(val), this._monthValue)) {
				this._dayValue = 1;
			}
		}
		this._syncGregorianFromDisplay(isEnd);
		this._doValidate(isEnd);
		this.fireDecoratorEvent("change", { field: DateHighZoomInputsField.Year, isEndDate: isEnd });
	}

	_onMonthChange(e: CustomEvent, isEnd: boolean) {
		const select = e.target as HTMLElement & { value: string };
		const val = parseInt(select.value);
		if (isEnd) {
			this._endMonthValue = val;
			if (this._endDayValue > this._getDaysInMonth(parseInt(this._endYearValue), val)) {
				this._endDayValue = 1;
			}
		} else {
			this._monthValue = val;
			if (this._dayValue > this._getDaysInMonth(parseInt(this._yearValue), val)) {
				this._dayValue = 1;
			}
		}
		this._syncGregorianFromDisplay(isEnd);
		this._doValidate(isEnd);
		this.fireDecoratorEvent("change", { field: DateHighZoomInputsField.Month, isEndDate: isEnd });
	}

	_onDayChange(e: CustomEvent, isEnd: boolean) {
		const select = e.target as HTMLElement & { value: string };
		const val = parseInt(select.value);
		if (isEnd) {
			this._endDayValue = val;
		} else {
			this._dayValue = val;
		}
		this._syncGregorianFromDisplay(isEnd);
		this._doValidate(isEnd);
		this.fireDecoratorEvent("change", { field: DateHighZoomInputsField.Day, isEndDate: isEnd });
	}

	// ---- Year picker dialog ----

	/**
	 * The timestamp (seconds) the year picker should open on: the stored picker timestamp,
	 * or one derived from the current year field (falling back to the current year).
	 */
	_yearPickerSelectedTimestamp(isEnd: boolean): number {
		const ts = isEnd ? this._endYearPickerTimestamp : this._yearPickerTimestamp;
		if (ts) { return ts; }
		const yearStr = isEnd ? this._endYearValue : this._yearValue;
		const year = parseInt(yearStr);
		const safeYear = Number.isNaN(year) || year <= 0 ? new Date().getFullYear() : year;
		return this._yearToTimestamp(safeYear);
	}

	_openYearPicker(isEnd: boolean) {
		const ts = this._yearPickerSelectedTimestamp(isEnd);
		if (isEnd) {
			this._endYearPickerTimestamp = ts;
			this._endYearPickerOpen = true;
		} else {
			this._yearPickerTimestamp = ts;
			this._yearPickerOpen = true;
		}
	}

	_closeYearPicker(isEnd: boolean) {
		if (isEnd) {
			this._endYearPickerOpen = false;
		} else {
			this._yearPickerOpen = false;
		}
	}

	_onYearPickerSelectionChange(e: CustomEvent<YearPickerChangeEventDetail>, isEnd: boolean) {
		const ts = e.detail.timestamp;
		if (ts === undefined) { return; }
		// The YearPicker runs in this._calType, so derive the display year from the timestamp
		// in that calendar type (not Gregorian).
		const displayYear = CalendarDate.fromTimestamp(ts * 1000, this._calType).getYear();
		if (isEnd) {
			this._endPendingYear = displayYear;
			this._endYearPickerTimestamp = ts;
		} else {
			this._pendingYear = displayYear;
			this._yearPickerTimestamp = ts;
		}
		this._confirmYearPicker(isEnd);
	}

	_confirmYearPicker(isEnd: boolean) {
		const displayYear = isEnd ? this._endPendingYear : this._pendingYear;
		if (displayYear === null) {
			this._closeYearPicker(isEnd);
			return;
		}

		if (isEnd) {
			this._endYearValue = String(displayYear);
			this._endPendingYear = null;
			this._endYearPickerOpen = false;
			if (this._endDayValue > this._getDaysInMonth(displayYear, this._endMonthValue)) {
				this._endDayValue = 1;
			}
		} else {
			this._yearValue = String(displayYear);
			this._pendingYear = null;
			this._yearPickerOpen = false;
			if (this._dayValue > this._getDaysInMonth(displayYear, this._monthValue)) {
				this._dayValue = 1;
			}
		}

		// Update Gregorian source of truth and the picker timestamp from the display values.
		this._syncGregorianFromDisplay(isEnd);
		const greg = isEnd
			? { year: this._gregEndYear }
			: { year: this._gregYear };
		const pickerTs = this._yearToTimestamp(greg.year);
		if (isEnd) {
			this._endYearPickerTimestamp = pickerTs;
		} else {
			this._yearPickerTimestamp = pickerTs;
		}

		// Re-validate so out-of-range years are flagged (and in-range ones cleared).
		this._doValidate(isEnd);
		this.fireDecoratorEvent("change", { field: DateHighZoomInputsField.Year, isEndDate: isEnd });
	}

	_cancelYearPicker(isEnd: boolean) {
		if (isEnd) {
			this._endPendingYear = null;
		} else {
			this._pendingYear = null;
		}
		this._closeYearPicker(isEnd);
	}
}

DateHighZoomInputs.define();

export default DateHighZoomInputs;
export type { DateHighZoomInputsChangeEventDetail };
