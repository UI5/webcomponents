import type Calendar from "./Calendar.js";
import DayPicker from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import YearRangePicker from "./YearRangePicker.js";
import CalendarHeaderTemplate from "./CalendarHeaderTemplate.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";

export default function CalendarTemplate(this: Calendar) {
	const showMultipleMonths = this._monthsToShow > 1 && !this._isDayPickerHidden;
	const shouldRenderSeparateHeaders = this._isDefaultHeaderModeInMultipleMonths && !this._portraitView && !this._isCompactMode;
	const shouldRenderInlineHeaders = this._isDefaultHeaderModeInMultipleMonths && (this._portraitView || this._isCompactMode);

	return (
		<>
			<div
				class={{
					"ui5-cal-root": true,
					"ui5-dt-cal--mobile": this._phoneView,
					"ui5-dt-cal--portrait": this._portraitView,
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
								<div class="ui5-calheader ui5-calheader-multiple ui5-calheader-default-multiple" exportparts="calendar-header-arrow-button, calendar-header-middle-button">
									{ CalendarHeaderTemplate.call(this) }
								</div>
							)}

							<div class="ui5-cal-daypicker-overlay"></div>

							{/* Render headers in separate loop when in horizontal layout (cozy mode, not portrait, not compact) */}
							{shouldRenderSeparateHeaders && (
								<div class="ui5-cal-multiple-months-header-wrapper">
									{renderMonthHeaders.call(this)}
								</div>
							)}

							{/* Render day pickers (with inline headers in vertical layout) */}
							<div class="ui5-cal-multiple-months-wrapper">
								{renderMonthPickers.call(this, shouldRenderInlineHeaders)}
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
							{renderMonthPicker.call(this)}
							{renderYearPicker.call(this)}
							{renderYearRangePicker.call(this)}
						</>
					)}
				</div>

				{showMultipleMonths && (
					<div class={{
						"ui5-cal-overlay-container": true,
						"ui5-cal-overlay-hidden": this._isMonthPickerHidden && this._isYearPickerHidden && this._isYearRangePickerHidden,
					}}>
						{renderMonthPicker.call(this)}
						{renderYearPicker.call(this)}
						{renderYearRangePicker.call(this)}
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

/**
 * Renders month headers in a separate loop (horizontal layout)
 */
function renderMonthHeaders(this: Calendar) {
	return Array.from({ length: this._monthsToShow }, (_, index) => {
		const monthTimestamp = this._getMonthTimestamp(index);
		const isFirst = index === 0;
		const isLast = index === this._monthsToShow - 1;

		return (
			<div key={`calendar-month-header-${index}`} class="ui5-cal-month-header-container">
				{CalendarHeaderTemplate.call(this, {
					headerText: this._getHeaderTextForMonth(monthTimestamp),
					isFirst,
					isLast,
					isMultiple: true,
				})}
			</div>
		);
	});
}

/**
 * Renders month pickers (with optional inline headers for vertical layout)
 */
function renderMonthPickers(this: Calendar, shouldRenderInlineHeaders: boolean) {
	return Array.from({ length: this._monthsToShow }, (_, index) => {
		const monthTimestamp = this._getMonthTimestamp(index);
		const isFirst = index === 0;
		const isLast = index === this._monthsToShow - 1;

		return (
			<div key={`calendar-month-picker-${index}`} class="ui5-cal-month-container">
				{/* Render header inline when in vertical layout (portrait OR compact) */}
				{shouldRenderInlineHeaders &&
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
						inert={this._inert}
					/>
				</div>
			</div>
		);
	});
}

function renderMonthPicker(this: Calendar) {
	return (
		<MonthPicker
			id={`${this._id}-MP`}
			hidden={this._isMonthPickerHidden}
			formatPattern={this._formatPattern}
			selectedDates={this._selectedDatesTimestamps}
			_hidden={this._isMonthPickerHidden}
			primaryCalendarType={this._primaryCalendarType}
			secondaryCalendarType={this._secondaryCalendarType}
			selectionMode={this.selectionMode}
			minDate={this.minDate}
			maxDate={this.maxDate}
			timestamp={this._timestamp}
			onChange={this.onSelectedMonthChange}
			onNavigate={this.onNavigate}
			exportparts="month-cell, month-cell-selected, month-cell-selected-between, month-picker-root"
		/>
	);
}

function renderYearPicker(this: Calendar) {
	return (
		<YearPicker
			id={`${this._id}-YP`}
			hidden={this._isYearPickerHidden}
			formatPattern={this._formatPattern}
			selectedDates={this._selectedDatesTimestamps}
			_hidden={this._isYearPickerHidden}
			primaryCalendarType={this._primaryCalendarType}
			secondaryCalendarType={this._secondaryCalendarType}
			selectionMode={this.selectionMode}
			minDate={this.minDate}
			maxDate={this.maxDate}
			timestamp={this._timestamp}
			_currentYearRange = {this._currentYearRange}
			onChange={this.onSelectedYearChange}
			onNavigate={this.onNavigate}
			exportparts="year-cell, year-cell-selected, year-cell-selected-between, year-picker-root"
		/>
	);
}

function renderYearRangePicker(this: Calendar) {
	return (
		<YearRangePicker
			id={`${this._id}-YRP`}
			hidden={this._isYearRangePickerHidden}
			formatPattern={this._formatPattern}
			selectedDates={this._selectedDatesTimestamps}
			_showRangeSelection={this.selectionMode === CalendarSelectionMode.Range}
			_hidden={this._isYearRangePickerHidden}
			primaryCalendarType={this._primaryCalendarType}
			secondaryCalendarType={this._secondaryCalendarType}
			minDate={this.minDate}
			maxDate={this.maxDate}
			timestamp={this._timestamp}
			_currentYearRange = {this._currentYearRange}
			onChange={this.onSelectedYearRangeChange}
			onNavigate={this.onNavigate}
			exportparts="year-range-cell, year-range-cell-selected, year-range-cell-selected-between, year-range-picker-root"
		/>
	);
}
