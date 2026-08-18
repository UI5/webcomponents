import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
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

	// Track last synced dateValue to avoid overwriting user edits on every re-render
	_syncedDateValue: Date | null = null;
	_syncedSecondDateValue: Date | null = null;

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

	get _monthOptions() {
		// Map UI5 calendar type names to Intl calendar IDs
		const calTypeMap: Record<string, string> = {
			Islamic: "islamic-umalqura",
			Buddhist: "buddhist",
			Japanese: "japanese",
			Persian: "persian",
			Gregorian: "gregory",
		};
		const calType = this.primaryCalendarType || "Gregorian";
		const intlCal = calTypeMap[calType] || "gregory";
		const locale = navigator.language || "en";

		return Array.from({ length: 12 }, (_, i) => {
			// Use a fixed reference year to get month names
			const refDate = new Date(2000, i, 1);
			const text = new Intl.DateTimeFormat(locale, {
				month: "long",
				calendar: intlCal,
			} as Intl.DateTimeFormatOptions).format(refDate);
			return { value: i, text };
		});
	}

	_getDaysInMonth(year: number, month: number) {
		const y = isNaN(year) ? 2000 : year;
		return new Date(y, month + 1, 0).getDate();
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
		const year = this.dateValue.getFullYear();
		const month = this.dateValue.getMonth();
		const day = this.dateValue.getDate();
		// Store Gregorian source of truth
		this._gregYear = year;
		this._gregMonth = month;
		this._gregDay = day;
		this._yearPickerTimestamp = Date.UTC(year, 0, 1, 12, 0, 0) / 1000;
		// Show in current calendar type
		this._applyCalendarTypeToDisplay(false);
	}

	/**
	 * Converts Gregorian source (this._gregYear/Month/Day) to display values
	 * in the current primaryCalendarType using Intl.DateTimeFormat.
	 */
	_applyCalendarTypeToDisplay(isEnd: boolean) {
		const calTypeMap: Record<string, string> = {
			Islamic: "islamic-umalqura",
			Buddhist: "buddhist",
			Japanese: "japanese",
			Persian: "persian",
			Gregorian: "gregory",
		};
		const calType = this.primaryCalendarType || "Gregorian";
		const intlCal = calTypeMap[calType] || "gregory";
		const isGregorian = intlCal === "gregory";

		const srcYear = isEnd ? 0 : this._gregYear; // end date not yet supported
		const srcMonth = isEnd ? 0 : this._gregMonth;
		const srcDay = isEnd ? 1 : this._gregDay;

		if (isGregorian) {
			this._yearValue = String(srcYear);
			this._monthValue = srcMonth;
			this._dayValue = srcDay;
			return;
		}

		const refDate = new Date(srcYear, srcMonth, srcDay);
		refDate.setFullYear(srcYear);
		const locale = navigator.language || "en";
		const fmt = new Intl.DateTimeFormat(locale, {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			calendar: intlCal,
		} as Intl.DateTimeFormatOptions);

		const parts = fmt.formatToParts(refDate);
		const get = (type: string) => {
			const part = parts.find(p => p.type === type);
			return part ? parseInt(part.value) : NaN;
		};

		const newYear = get("year");
		const newMonth = get("month") - 1; // Intl months are 1-based
		const newDay = get("day");

		if (!isNaN(newYear)) {
			// Force ui5-input to pick up the new value by clearing first
			this._yearValue = "";
			requestAnimationFrame(() => { this._yearValue = String(newYear); });
		}
		if (!isNaN(newMonth)) { this._monthValue = newMonth; }
		if (!isNaN(newDay)) { this._dayValue = newDay; }
	}

	/**
	 * Re-derive display fields from Gregorian source when calendar type changes.
	 * Does NOT modify the Gregorian source.
	 */
	convertToCalendarType() {
		this._applyCalendarTypeToDisplay(false);
	}

	syncEndDate(date: Date | null) {
		this.secondDateValue = date;
		if (!date) { return; }
		const year = date.getFullYear();
		this._endYearValue = String(year);
		this._endYearPickerTimestamp = Date.UTC(year, 0, 1, 12, 0, 0) / 1000;
		this._endMonthValue = date.getMonth();
		this._endDayValue = date.getDate();
	}

	getSelectedDate(): { year: number; month: number; day: number } {
		return { year: parseInt(this._yearValue), month: this._monthValue, day: this._dayValue };
	}

	getSelectedSecondDate(): { year: number; month: number; day: number } | null {
		if (!this._isRange) { return null; }
		return { year: parseInt(this._endYearValue), month: this._endMonthValue, day: this._endDayValue };
	}

	getDateObject(): Date | null {
		const { year, month, day } = this.getSelectedDate();
		if (isNaN(year) || isNaN(month) || isNaN(day)) { return null; }
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
		if (isNaN(y) || isNaN(m) || isNaN(d)) { return null; }
		return { getFullYear: () => y, getMonth: () => m, getDate: () => d };
	}

	_doValidate(bEndDate: boolean): boolean {
		const yearStr = bEndDate ? this._endYearValue : this._yearValue;
		const month = bEndDate ? this._endMonthValue : this._monthValue;
		const day = bEndDate ? this._endDayValue : this._dayValue;
		const year = parseInt(yearStr);

		const minD = this._parseISO(this.minDate);
		const maxD = this._parseISO(this.maxDate);
		const minY = minD ? minD.getFullYear() : 1;
		const maxY = maxD ? maxD.getFullYear() : 9999;

		// 1. Year
		if (isNaN(year) || year < minY || year > maxY) {
			const msg = DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_YEAR_OUT_OF_RANGE, String(minY), String(maxY));
			if (bEndDate) {
				this._endYearValueState = ValueState.Negative;
				this._endYearValueStateMessage = msg;
				this._endMonthValueState = ValueState.None;
				this._endMonthValueStateMessage = "";
				this._endDayValueState = ValueState.None;
				this._endDayValueStateMessage = "";
			} else {
				this._yearValueState = ValueState.Negative;
				this._yearValueStateMessage = msg;
				this._monthValueState = ValueState.None;
				this._monthValueStateMessage = "";
				this._dayValueState = ValueState.None;
				this._dayValueStateMessage = "";
			}
			return false;
		}

		if (bEndDate) {
			this._endYearValueState = ValueState.None;
			this._endYearValueStateMessage = "";
		} else {
			this._yearValueState = ValueState.None;
			this._yearValueStateMessage = "";
		}

		// 2. Month
		if (minD && year === minY && month < minD.getMonth()) {
			const msg = DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_MONTH_OUT_OF_RANGE);
			if (bEndDate) {
				this._endMonthValueState = ValueState.Negative;
				this._endMonthValueStateMessage = msg;
				this._endDayValueState = ValueState.None;
				this._endDayValueStateMessage = "";
			} else {
				this._monthValueState = ValueState.Negative;
				this._monthValueStateMessage = msg;
				this._dayValueState = ValueState.None;
				this._dayValueStateMessage = "";
			}
			return false;
		}
		if (maxD && year === maxY && month > maxD.getMonth()) {
			const msg = DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_MONTH_OUT_OF_RANGE);
			if (bEndDate) {
				this._endMonthValueState = ValueState.Negative;
				this._endMonthValueStateMessage = msg;
				this._endDayValueState = ValueState.None;
				this._endDayValueStateMessage = "";
			} else {
				this._monthValueState = ValueState.Negative;
				this._monthValueStateMessage = msg;
				this._dayValueState = ValueState.None;
				this._dayValueStateMessage = "";
			}
			return false;
		}

		if (bEndDate) {
			this._endMonthValueState = ValueState.None;
			this._endMonthValueStateMessage = "";
		} else {
			this._monthValueState = ValueState.None;
			this._monthValueStateMessage = "";
		}

		// 3. Day
		const daysInMonth = this._getDaysInMonth(year, month);
		let minDay = 1;
		let maxDay = daysInMonth;
		if (minD && year === minY && month === minD.getMonth()) { minDay = minD.getDate(); }
		if (maxD && year === maxY && month === maxD.getMonth()) { maxDay = maxD.getDate(); }

		if (day < minDay || day > maxDay) {
			const msg = DateHighZoomInputs.i18nBundle.getText(DATEPICKER_HZ_DAY_OUT_OF_RANGE);
			if (bEndDate) {
				this._endDayValueState = ValueState.Negative;
				this._endDayValueStateMessage = msg;
			} else {
				this._dayValueState = ValueState.Negative;
				this._dayValueStateMessage = msg;
			}
			return false;
		}

		if (bEndDate) {
			this._endDayValueState = ValueState.None;
			this._endDayValueStateMessage = "";
		} else {
			this._dayValueState = ValueState.None;
			this._dayValueStateMessage = "";
		}

		return true;
	}

	// ---- Event handlers ----

	_onYearInput(e: CustomEvent, isEnd: boolean) {
		const input = e.target as HTMLElement & { value: string };
		const y = parseInt(input.value);
		if (!isNaN(y) && y > 0 && y < 10000) {
			if (isEnd) {
				this._endYearPickerTimestamp = Date.UTC(y, 0, 1, 12, 0, 0) / 1000;
			} else {
				this._yearPickerTimestamp = Date.UTC(y, 0, 1, 12, 0, 0) / 1000;
			}
		}
	}

	_onYearChange(e: CustomEvent, isEnd: boolean) {
		const input = e.target as HTMLElement & { value: string };
		const val = input.value;
		if (isEnd) {
			this._endYearValue = val;
		} else {
			this._yearValue = val;
			if (this._dayValue > this._getDaysInMonth(parseInt(val), this._monthValue)) {
				this._dayValue = 1;
			}
		}
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
		this.fireDecoratorEvent("change", { field: DateHighZoomInputsField.Day, isEndDate: isEnd });
	}

	// ---- Year picker dialog ----

	_openYearPicker(isEnd: boolean) {
		let ts = isEnd ? this._endYearPickerTimestamp : this._yearPickerTimestamp;
		if (!ts) {
			const yearStr = isEnd ? this._endYearValue : this._yearValue;
			const year = parseInt(yearStr);
			const safeYear = isNaN(year) || year <= 0 ? new Date().getFullYear() : year;
			ts = Date.UTC(safeYear, 0, 1, 12, 0, 0) / 1000;
		}
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
		const year = new Date(ts * 1000).getUTCFullYear();
		if (isEnd) {
			this._endPendingYear = year;
			this._endYearPickerTimestamp = Date.UTC(year, 0, 1, 12, 0, 0) / 1000;
		} else {
			this._pendingYear = year;
			this._yearPickerTimestamp = Date.UTC(year, 0, 1, 12, 0, 0) / 1000;
		}
		this._confirmYearPicker(isEnd);
	}

	_confirmYearPicker(isEnd: boolean) {
		const year = isEnd ? this._endPendingYear : this._pendingYear;
		if (year === null) {
			this._closeYearPicker(isEnd);
			return;
		}

		const minD = this._parseISO(this.minDate);
		const maxD = this._parseISO(this.maxDate);
		const minY = minD ? minD.getFullYear() : 1;
		const maxY = maxD ? maxD.getFullYear() : 9999;
		const isValid = year >= minY && year <= maxY;

		const newTs = Date.UTC(year, 0, 1, 12, 0, 0) / 1000;
		if (isEnd) {
			this._endYearValue = String(year);
			this._endYearPickerTimestamp = newTs;
			this._endPendingYear = null;
			this._endYearPickerOpen = false;
			if (this._endDayValue > this._getDaysInMonth(year, this._endMonthValue)) {
				this._endDayValue = 1;
			}
		} else {
			this._yearValue = String(year);
			this._yearPickerTimestamp = newTs;
			this._pendingYear = null;
			this._yearPickerOpen = false;
			if (this._dayValue > this._getDaysInMonth(year, this._monthValue)) {
				this._dayValue = 1;
			}
		}

		if (!isValid) {
			this._doValidate(isEnd);
		} else {
			if (isEnd) {
				this._endYearValueState = ValueState.None;
				this._endYearValueStateMessage = "";
			} else {
				this._yearValueState = ValueState.None;
				this._yearValueStateMessage = "";
			}
		}
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
