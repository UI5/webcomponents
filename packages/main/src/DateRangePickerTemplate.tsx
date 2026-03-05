import Calendar from "./Calendar.js";
import CalendarDateRange from "./CalendarDateRange.js";
import type DateRangePicker from "./DateRangePicker.js";

import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";
import Button from "./Button.js";

export default function DateRangePickerTemplate(this: DateRangePicker) {
	return [
		DatePickerInputTemplate.call(this),
		DatePickerPopoverTemplate.call(this, { content, initialFocus: this.initialFocusId, footer: this._isPhone ? footer : undefined, header: this._isPhone ? header : undefined	 }),
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

function header(this: DateRangePicker) {
	return (
		<div slot="header" class="ui5-responsive-popover-header ui5-daterange-calendar-mobile-header">
			<div class="row">
				<span>{this._headerTitleText}</span>
			</div>
		</div>
	);
}

function footer(this: DateRangePicker) {
	return (
		<div slot="footer" class="ui5-responsive-popover-footer ui5-daterange-calendar-mobile-footer">
			<div class="row">
				<Button
					design="Emphasized"
					class="ui5-responsive-popover-footer-btn"
				>{this._okButtonText}
				</Button>
				<Button
					design="Transparent"
					onClick={this._togglePicker}
					class="ui5-responsive-popover-footer-btn"
				>{this._cancelButtonText}
				</Button>
			</div>
		</div>
	)
};