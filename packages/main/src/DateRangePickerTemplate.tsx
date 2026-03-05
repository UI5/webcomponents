import Calendar from "./Calendar.js";
import CalendarDateRange from "./CalendarDateRange.js";
import type DateRangePicker from "./DateRangePicker.js";

import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";
import Button from "./Button.js";

export default function DateRangePickerTemplate(this: DateRangePicker) {
	return [
		DatePickerInputTemplate.call(this),
		DatePickerPopoverTemplate.call(this, { content, initialFocus: this.initialFocusId, footer: this._isPhone ? footer : undefined }),
	];
}

function content(this: DateRangePicker) {
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
			monthsToShow={2}
			stretch={this.stretch}
		>
			<CalendarDateRange startValue={this.startValue} endValue={this.endValue} />
		</Calendar>
	);
}

function footer(this: DateRangePicker) {
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
	)
};