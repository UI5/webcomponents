import type Calendar from "./Calendar.js";
import DayPicker from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import YearRangePicker from "./YearRangePicker.js";
import CalendarHeaderTemplate from "./CalendarHeaderTemplate.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";

export default function CalendarTemplate(this: Calendar) {
	const showMultipleMonths = this._monthsToShow > 1 && !this._isDayPickerHidden;

	return (
		<>
			<div
				class={{
					"ui5-cal-root": true,
					"ui5-dt-cal--mobile": this._phoneView,
					"ui5-dt-cal--portrait": this._portraitMode,
					"ui5-dt-cal--multiple": showMultipleMonths,
				}}
				onKeyDown={this._onkeydown}
			>
				{!showMultipleMonths && (
					<div class="ui5-calheader" exportparts="calendar-header-arrow-button, calendar-header-middle-button">
						{ CalendarHeaderTemplate.call(this) }
					</div>
				)}
				<div id={`${this._id}-content`} class={{
					"ui5-cal-content": true,
					"ui5-cal-content-multiple": showMultipleMonths,
				}}>
					{showMultipleMonths ? (
						<>
							{/* When pickers are active, show standard calendar header */}
							{this._shouldShowOnePickerHeaderButtonInMultipleMonths && (
								<div class="ui5-calheader ui5-calheader-multiple ui5-calheader-default-multiple test" exportparts="calendar-header-arrow-button, calendar-header-middle-button">
									{ CalendarHeaderTemplate.call(this) }
								</div>
							)}

							<div class="ui5-cal-daypicker-overlay"></div>

							<div class="ui5-cal-multiple-months-wrapper">
								{Array.from({ length: this._monthsToShow }, (_, index) => {
									const monthTimestamp = this._getMonthTimestamp(index);
									const isFirst = index === 0;
									const isLast = index === this._monthsToShow - 1;

									return (
										<div key={`calendar-month-${index}`} class="ui5-cal-month-container">
											{/* Show per-calendar headers only in default mode (day picker) */}
											{this._isDefaultHeaderModeInMultipleMonths && 
												CalendarHeaderTemplate.call(this, {
													headerText: this._getHeaderTextForMonth(monthTimestamp),
													isFirst,
													isLast,
													isMultiple: true,
												})
											}
											<div class="ui5-cal-daypicker-wrapper">
												<DayPicker
													id={`${this._id}-daypicker-${index}`}
													hidden={this._isDayPickerHidden}
													formatPattern={this._formatPattern}
													selectedDates={this._selectedDatesTimestamps}
													specialCalendarDates={this._specialCalendarDates}
													disabledDates={this._disabledDates}
													_hidden={this._isDayPickerHidden}
													primaryCalendarType={this._primaryCalendarType}
													secondaryCalendarType={this._secondaryCalendarType}
													selectionMode={this.selectionMode}
													minDate={this.minDate}
													maxDate={this.maxDate}
													calendarWeekNumbering={this.calendarWeekNumbering}
													timestamp={monthTimestamp}
													hideWeekNumbers={this.hideWeekNumbers}
													onChange={this.onSelectedDatesChange}
													onNavigate={this.onNavigate}
													exportparts="day-cell, day-cell-selected, day-cell-selected-between"
												/>
											</div>
										</div>
									);
								})}
							</div>
						</>
					) : (
						<>
							<DayPicker
								id={`${this._id}-daypicker`}
								hidden={this._isDayPickerHidden}
								formatPattern={this._formatPattern}
								selectedDates={this._selectedDatesTimestamps}
								specialCalendarDates={this._specialCalendarDates}
								disabledDates={this._disabledDates}
								_hidden={this._isDayPickerHidden}
								primaryCalendarType={this._primaryCalendarType}
								secondaryCalendarType={this._secondaryCalendarType}
								selectionMode={this.selectionMode}
								minDate={this.minDate}
								maxDate={this.maxDate}
								calendarWeekNumbering={this.calendarWeekNumbering}
								timestamp={this._timestamp}
								hideWeekNumbers={this.hideWeekNumbers}
								onChange={this.onSelectedDatesChange}
								onNavigate={this.onNavigate}
								exportparts="day-cell, day-cell-selected, day-cell-selected-between"
							/>
							{renderMonthPicker(this)}
							{renderYearPicker(this)}
							{renderYearRangePicker(this)}
						</>
					)}
				</div>

				{showMultipleMonths && (
					<div class={{
						"ui5-cal-overlay-container": true,
						"ui5-cal-overlay-hidden": this._isMonthPickerHidden && this._isYearPickerHidden && this._isYearRangePickerHidden,
					}}>
						{renderMonthPicker(this)}
						{renderYearPicker(this)}
						{renderYearRangePicker(this)}
					</div>
				)}
			</div>

			<div
				onui5-calendar-legend-selection-change={this._onCalendarLegendSelectionChange}
				onui5-calendar-legend-focus-out={this._onLegendFocusOut}
			>
				<slot name="calendarLegend"></slot>
			</div>
		</>);
}

function renderMonthPicker(calendar: Calendar) {
	return (
		<MonthPicker
			id={`${calendar._id}-MP`}
			hidden={calendar._isMonthPickerHidden}
			formatPattern={calendar._formatPattern}
			selectedDates={calendar._selectedDatesTimestamps}
			_hidden={calendar._isMonthPickerHidden}
			primaryCalendarType={calendar._primaryCalendarType}
			secondaryCalendarType={calendar._secondaryCalendarType}
			selectionMode={calendar.selectionMode}
			minDate={calendar.minDate}
			maxDate={calendar.maxDate}
			timestamp={calendar._timestamp}
			onChange={calendar.onSelectedMonthChange}
			onNavigate={calendar.onNavigate}
			exportparts="month-cell, month-cell-selected, month-cell-selected-between, month-picker-root"
		/>
	);
}

function renderYearPicker(calendar: Calendar) {
	return (
		<YearPicker
			id={`${calendar._id}-YP`}
			hidden={calendar._isYearPickerHidden}
			formatPattern={calendar._formatPattern}
			selectedDates={calendar._selectedDatesTimestamps}
			_hidden={calendar._isYearPickerHidden}
			primaryCalendarType={calendar._primaryCalendarType}
			secondaryCalendarType={calendar._secondaryCalendarType}
			selectionMode={calendar.selectionMode}
			minDate={calendar.minDate}
			maxDate={calendar.maxDate}
			timestamp={calendar._timestamp}
			_currentYearRange = {calendar._currentYearRange}
			onChange={calendar.onSelectedYearChange}
			onNavigate={calendar.onNavigate}
			exportparts="year-cell, year-cell-selected, year-cell-selected-between, year-picker-root"
		/>
	);
}

function renderYearRangePicker(calendar: Calendar) {
	return (
		<YearRangePicker
			id={`${calendar._id}-YRP`}
			hidden={calendar._isYearRangePickerHidden}
			formatPattern={calendar._formatPattern}
			selectedDates={calendar._selectedDatesTimestamps}
			_showRangeSelection={calendar.selectionMode === CalendarSelectionMode.Range}
			_hidden={calendar._isYearRangePickerHidden}
			primaryCalendarType={calendar._primaryCalendarType}
			secondaryCalendarType={calendar._secondaryCalendarType}
			minDate={calendar.minDate}
			maxDate={calendar.maxDate}
			timestamp={calendar._timestamp}
			_currentYearRange = {calendar._currentYearRange}
			onChange={calendar.onSelectedYearRangeChange}
			onNavigate={calendar.onNavigate}
			exportparts="year-range-cell, year-range-cell-selected, year-range-cell-selected-between, year-range-picker-root"
		/>
	);
}
