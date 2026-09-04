import Calendar from "./Calendar.js";
import CalendarDateRange from "./CalendarDateRange.js";
import type DateRangePicker from "./DateRangePicker.js";
import type CalendarDateLocale from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";

import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";
import DateHighZoomInputs from "./DateHighZoomInputs.js";
import Button from "./Button.js";

export default function DateRangePickerTemplate(this: DateRangePicker) {
	return [
		DatePickerInputTemplate.call(this),
		DatePickerPopoverTemplate.call(this, { content, initialFocus: this.initialFocusId, footer: this._isPhone || this._highZoom ? footer : undefined }),
	];
}

function content(this: DateRangePicker) {
	if (this._highZoom) {
		const toISO = (cd: CalendarDateLocale) => cd.toUTCJSDate().toISOString().slice(0, 10);
		const minISO = this.minDate ? toISO(this._minDate) : "";
		const maxISO = this.maxDate ? toISO(this._maxDate) : "";
		const startDate = this._startDateTimestamp ? this.startDateValue : null;
		const endDate = this._endDateTimestamp ? this.endDateValue : null;
		return (
			<DateHighZoomInputs
				id={`${this._id}-hz-inputs`}
				primaryCalendarType={this._hzEffectiveCalType}
				mode="Range"
				dateValue={startDate}
				secondDateValue={endDate}
				minDate={minISO}
				maxDate={maxISO}
				onChange={this._onHzInputsChange}
			/>
		);
	}

	return (
		<Calendar
			id={`${this._id}-calendar`}
			primaryCalendarType={this._primaryCalendarType}
			secondaryCalendarType={this.secondaryCalendarType}
			formatPattern={this._formatPattern}
			selectionMode={this._calendarSelectionMode}
			minDate={this.minDate}
			maxDate={this.maxDate}
			calendarWeekNumbering={this.calendarWeekNumbering}
			onSelectionChange={this.onSelectedDatesChange}
			onShowMonthView={this.onHeaderShowMonthPress}
			onShowYearView={this.onHeaderShowYearPress}
			hideWeekNumbers={this.hideWeekNumbers}
			_currentPicker={this._calendarCurrentPicker}
			_pickersMode={this._calendarPickersMode}
			_showTwoMonths={this.showTwoMonths}
		>
			<CalendarDateRange startValue={this.startValue} endValue={this.endValue} />
		</Calendar>
	);
}

function footer(this: DateRangePicker) {
	if (this._highZoom) {
		return (
			<div slot="footer" class="ui5-dt-picker-footer">
				<Button
					id="ok"
					class="ui5-dt-picker-action"
					design="Emphasized"
					disabled={!this._hzOkEnabled}
					onClick={this._onHzOk}
				>
					{this._okButtonText}
				</Button>
				<Button
					id="cancel"
					class="ui5-dt-picker-action"
					design="Transparent"
					onClick={this._onHzCancel}
				>
					{this._cancelButtonText}
				</Button>
			</div>
		);
	}

	return (
		<div
			slot="footer"
			class="ui5-dt-picker-footer">
			<Button
				id="ok"
				class="ui5-dt-picker-action"
				design="Emphasized"
				disabled={this._submitDisabled}
				onClick={this._submitClick}
			>
				{this._okButtonText}
			</Button>
			<Button
				id="cancel"
				class="ui5-dt-picker-action"
				design="Transparent"
				onClick={this._cancelClick}
			>
				{this._cancelButtonText}
			</Button>
		</div>
	);
}
