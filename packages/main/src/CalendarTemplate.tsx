import type Calendar from "./Calendar.js";
import DayPicker from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import YearRangePicker from "./YearRangePicker.js";
import CalendarHeaderTemplate from "./CalendarHeaderTemplate.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import Icon from "./Icon.js";
import slimArrowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Dialog from "./Dialog.js";

export default function CalendarTemplate(this: Calendar) {
	const showMultipleMonths = this.monthsToShow > 1 && !this._isDayPickerHidden;
	
	return (
		<>
			<div
				class="ui5-cal-root"
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
							{Array.from({ length: this.monthsToShow }, (_, index) => {
								const monthTimestamp = this._getMonthTimestamp(index);
								const isFirst = index === 0;
								const isLast = index === this.monthsToShow - 1;
								const headerText = this._getHeaderTextForMonth(monthTimestamp);
								
								return (
									<div key={`calendar-month-${index}`} class="ui5-cal-month-container">
										<div class="ui5-calheader ui5-calheader-multiple">
											{isFirst && (
												<div
													data-ui5-cal-header-btn-prev
													class={{
														"ui5-calheader-arrowbtn": true,
														"ui5-calheader-arrowbtn-disabled": this._previousButtonDisabled,
													}}
													role="button"
													onMouseDown={this.onPrevButtonClick}
													tabindex={this._previousButtonDisabled ? -1 : 0}
													title={this.accInfo.tooltipPrevButton}
													aria-label={this.accInfo.ariaLabelPrevButton}
												>
													<Icon class="ui5-calheader-arrowicon" name={slimArrowLeft}/>
												</div>
											)}
											{!isFirst && <div class="ui5-calheader-spacer"></div>}
											<div class="ui5-calheader-midcontainer">
												<div
													data-ui5-cal-header-btn-month
													class="ui5-calheader-arrowbtn ui5-calheader-middlebtn"
													tabindex={0}
													role="button"
													onClick={this.onHeaderMonthButtonPress}
													onKeyDown={this.onMonthButtonKeyDown}
													onKeyUp={this.onMonthButtonKeyUp}
												>
													<span>{headerText.monthText}</span>
													{this.hasSecondaryCalendarType && headerText.secondMonthText &&
														<span class="ui5-calheader-btn-sectext">{headerText.secondMonthText}</span>
													}
												</div>

												<div
													data-ui5-cal-header-btn-year
													class="ui5-calheader-arrowbtn ui5-calheader-middlebtn"
													tabindex={0}
													role="button"
													onClick={this.onHeaderYearButtonPress}
													onKeyDown={this.onYearButtonKeyDown}
													onKeyUp={this.onYearButtonKeyUp}
												>
													<span>{headerText.yearText}</span>
													{this.hasSecondaryCalendarType && headerText.secondYearText &&
														<span class="ui5-calheader-btn-sectext">{headerText.secondYearText}</span>
													}
												</div>
											</div>
											{isLast && (
												<div
													data-ui5-cal-header-btn-next
													class={{
														"ui5-calheader-arrowbtn": true,
														"ui5-calheader-arrowbtn-disabled": this._nextButtonDisabled,
													}}
													role="button"
													onMouseDown={this.onNextButtonClick}
													tabindex={this._nextButtonDisabled ? -1 : 0}
													title={this.accInfo.tooltipNextButton}
													aria-label={this.accInfo.ariaLabelNextButton}
												>
													<Icon class="ui5-calheader-arrowicon" name={slimArrowRight}/>
												</div>
											)}
											{!isLast && <div class="ui5-calheader-spacer"></div>}
										</div>
										<div class="ui5-cal-daypicker-wrapper">
											<DayPicker
												id={`${this._id}-daypicker-${index}`}
												//hidden={this._isDayPickerHidden}
												formatPattern={this._formatPattern}
												selectedDates={this._selectedDatesTimestamps}
												specialCalendarDates={this._specialCalendarDates}
												disabledDates={this._disabledDates}
												//_hidden={this._isDayPickerHidden}
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
											<div class="ui5-cal-daypicker-overlay"></div>
										</div>
									</div>
								);
							})}
						</>
					) : (
						<><DayPicker
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
					/></>
					)}
				</div>

				{/* {showMultipleMonths && (
					<div class={{
						"ui5-cal-overlay-container": true,
						//"ui5-cal-overlay-hidden": this._isMonthPickerHidden && this._isYearPickerHidden && this._isYearRangePickerHidden,
					}}>
						<MonthPicker
							id={`${this._id}-MP`}
							formatPattern={this._formatPattern}
							selectedDates={this._selectedDatesTimestamps}
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
					</div>
				)} */}
			</div>

			<div
				onui5-calendar-legend-selection-change={this._onCalendarLegendSelectionChange}
				onui5-calendar-legend-focus-out={this._onLegendFocusOut}
			>
				<slot name="calendarLegend"></slot>
			</div>
		</>);
}
