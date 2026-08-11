import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";

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
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-date-high-zoom-inputs",
	renderer: jsxRenderer,
	styles: DateHighZoomInputsCss,
	template: DateHighZoomInputsTemplate,
})
@event("change")
class DateHighZoomInputs extends UI5Element {
	eventDetails!: {
		change: DateHighZoomInputsChangeEventDetail;
	};

	/**
	 * Selected start date
	 * @private
	 */
	@property({ type: Object, noAttribute: true })
	dateValue: Date | null = null;

	/**
	 * Selected end date (Range mode only)
	 * @private
	 */
	@property({ type: Object, noAttribute: true })
	secondDateValue: Date | null = null;

	/**
	 * Minimum selectable date
	 * @private
	 */
	@property({ type: Object, noAttribute: true })
	minDate: Date | null = null;

	/**
	 * Maximum selectable date
	 * @private
	 */
	@property({ type: Object, noAttribute: true })
	maxDate: Date | null = null;

	/**
	 * Single or Range mode
	 * @private
	 */
	@property()
	mode: `${DateHighZoomInputsMode}` = DateHighZoomInputsMode.Single;

	// --- Start date field states ---

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

	// --- End date field states (Range mode) ---

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

	// --- Year picker dialog state ---

	/** Whether the year-picker dialog is open for the start date year field */
	@property({ type: Boolean, noAttribute: true })
	_yearPickerOpen = false;

	/** Whether the year-picker dialog is open for the end date year field (Range mode) */
	@property({ type: Boolean, noAttribute: true })
	_endYearPickerOpen = false;

	/** Primary calendar type forwarded from the parent picker */
	@property({ noAttribute: true })
	primaryCalendarType?: `${CalendarType}`;

	// Plain instance vars — no @property to avoid re-render resetting the input
	_yearPickerTimestamp = 0;
	_endYearPickerTimestamp = 0;
	_pendingYear: number | null = null;
	_endPendingYear: number | null = null;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

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

	// ---- Month options ----

	get _monthOptions() {
		const months = [];
		for (let i = 0; i < 12; i++) {
			const d = new Date(2000, i, 1);
			months.push({
				value: i,
				text: d.toLocaleString("default", { month: "long" }),
			});
		}
		return months;
	}

	// ---- Day options (computed from current year + month) ----

	_getDaysInMonth(year: number, month: number) {
		const y = isNaN(year) ? 2000 : year;
		return new Date(y, month + 1, 0).getDate();
	}

	get _dayOptions() {
		const count = this._getDaysInMonth(parseInt(this._yearValue), this._monthValue);
		return Array.from({ length: count }, (_, i) => i + 1);
	}

	get _endDayOptions() {
		const count = this._getDaysInMonth(parseInt(this._endYearValue), this._endMonthValue);
		return Array.from({ length: count }, (_, i) => i + 1);
	}

	// ---- Public API ----

	syncStartDate() {
		if (!this.dateValue) { return; }
		const year = this.dateValue.getFullYear();
		this._yearValue = String(year);
		this._yearPickerTimestamp = Date.UTC(year, 0, 1, 12, 0, 0) / 1000;
		this._monthValue = this.dateValue.getMonth();
		this._dayValue = this.dateValue.getDate();
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
		return {
			year: parseInt(this._yearValue),
			month: this._monthValue,
			day: this._dayValue,
		};
	}

	getSelectedSecondDate(): { year: number; month: number; day: number } | null {
		if (!this._isRange) { return null; }
		return {
			year: parseInt(this._endYearValue),
			month: this._endMonthValue,
			day: this._endDayValue,
		};
	}

	getDateObject(): Date | null {
		const { year, month, day } = this.getSelectedDate();
		if (isNaN(year) || isNaN(month) || isNaN(day)) { return null; }
		const d = new Date(year, month, day);
		d.setFullYear(year); // guard for years 0-99
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

	_doValidate(bEndDate: boolean): boolean {
		const yearStr = bEndDate ? this._endYearValue : this._yearValue;
		const month = bEndDate ? this._endMonthValue : this._monthValue;
		const day = bEndDate ? this._endDayValue : this._dayValue;

		const year = parseInt(yearStr);

		const minY = this.minDate ? this.minDate.getFullYear() : 1;
		const maxY = this.maxDate ? this.maxDate.getFullYear() : 9999;

		// 1. Validate year
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

		// 2. Validate month bounds when min/max apply to the same year
		if (this.minDate && year === minY) {
			const minM = this.minDate.getMonth();
			if (month < minM) {
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
		}
		if (this.maxDate && year === maxY) {
			const maxM = this.maxDate.getMonth();
			if (month > maxM) {
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
		}

		if (bEndDate) {
			this._endMonthValueState = ValueState.None;
			this._endMonthValueStateMessage = "";
		} else {
			this._monthValueState = ValueState.None;
			this._monthValueStateMessage = "";
		}

		// 3. Validate day bounds when min/max apply to same year+month
		const daysInMonth = this._getDaysInMonth(year, month);
		let minD = 1;
		let maxD = daysInMonth;
		if (this.minDate && year === minY && month === this.minDate.getMonth()) {
			minD = this.minDate.getDate();
		}
		if (this.maxDate && year === maxY && month === this.maxDate.getMonth()) {
			maxD = this.maxDate.getDate();
		}

		if (day < minD || day > maxD) {
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
		const val = input.value;
		// Only update the picker timestamp (plain var, no re-render) so the
		// dialog navigates to the typed year when opened. Do NOT update
		// _yearValue here — that would trigger a re-render which resets the input.
		const y = parseInt(val);
		if (!isNaN(y) && y > 0 && y < 10000) {
			if (isEnd) {
				this._endYearPickerTimestamp = Date.UTC(y, 0, 1, 12, 0, 0) / 1000;
			} else {
				this._yearPickerTimestamp = Date.UTC(y, 0, 1, 12, 0, 0) / 1000;
			}
		}
	}

	_onYearChange(e: CustomEvent, isEnd: boolean) {
		// Fires on blur / Enter — commit the value, recompute day count, validate
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
		const d = new Date(ts * 1000);
		const year = d.getUTCFullYear();
		const newTs = Date.UTC(year, 0, 1, 12, 0, 0) / 1000;
		// Store as pending — confirm immediately (no separate OK needed in year picker)
		if (isEnd) {
			this._endPendingYear = year;
			this._endYearPickerTimestamp = newTs;
		} else {
			this._pendingYear = year;
			this._yearPickerTimestamp = newTs;
		}
		// Auto-confirm on selection
		this._confirmYearPicker(isEnd);
	}

	_confirmYearPicker(isEnd: boolean) {
		const year = isEnd ? this._endPendingYear : this._pendingYear;
		if (year === null) {
			// No new selection — just close
			this._closeYearPicker(isEnd);
			return;
		}
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
