import Calendar from "./Calendar.js";
import CalendarDateRange from "./CalendarDateRange.js";
import type DateRangePicker from "./DateRangePicker.js";

import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";

export default function DateRangePickerTemplate(this: DateRangePicker) {
	return [
		DatePickerInputTemplate.call(this),
		DatePickerPopoverTemplate.call(this, { content, initialFocus: this.initialFocusId }),
	];
}

function content(this: DateRangePicker) {
	return (
		<Calendar
			class={{
					"ui5-dt-cal--mobile": this._phoneView,
			}}
			id={`${this._id}-calendar`}
			primaryCalendarType={this._primaryCalendarType}
			secondaryCalendarType={this.secondaryCalendarType}
			formatPattern={this._formatPattern}
			selectionMode={CalendarSelectionMode.Range}//{this._calendarSelectionMode}
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
