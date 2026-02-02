import Calendar from "./Calendar.js";
import CalendarDateRange from "./CalendarDateRange.js";
import type DateRangePicker from "./DateRangePicker.js";

import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";

export default function DateRangePickerTemplate(this: DateRangePicker) {
	return [
		DatePickerInputTemplate.call(this),
		DatePickerPopoverTemplate.call(this, { content, initialFocus: this.initialFocusId }),
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
		>
			<CalendarDateRange startValue={this.startValue} endValue={this.endValue} />
		</Calendar>
	);
}
