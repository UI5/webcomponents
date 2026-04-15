import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";

import type DateTimePicker from "./DateTimePicker.js";
import Button from "./Button.js";
import Calendar from "./Calendar.js";
import CalendarDate from "./CalendarDate.js";
import SegmentedButton from "./SegmentedButton.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";

export default function DateTimePickerTemplate(this: DateTimePicker) {
	return [
		DatePickerInputTemplate.call(this),
		DatePickerPopoverTemplate.call(this, { content, footer, initialFocus: this.initialFocusId }),
	];
}

function content(this: DateTimePicker) {
	return (
		<>
			{ this._phoneView &&
				<div class="ui5-dt-picker-header">
					<SegmentedButton class="ui5-dt-picker-toggle-button" onSelectionChange={this._dateTimeSwitchChange}>
						<SegmentedButtonItem data-ui5-key="Date" selected={this.showDateView}>{this.btnDateLabel}</SegmentedButtonItem>
						<SegmentedButtonItem data-ui5-key="Time" selected={this.showTimeView}>{this.btnTimeLabel}</SegmentedButtonItem>
					</SegmentedButton>
				</div>
			}

			<div class={{
				"ui5-dt-picker-content": true,
				"ui5-dt-picker-content--phone": this._phoneView,
			}}>
				<Calendar
					class={{
						"ui5-dt-cal": true,
						"ui5-dt-cal--hidden": this._phoneView && this.showTimeView,
						"ui5-dt-time--hidden": this._phoneView && this.showDateView,
					}}
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
				>
					{this._calendarSelectedDates.map(date =>
						<CalendarDate value={date} />
					)}
				</Calendar>

				{ !this._phoneView && <span class="ui5-dt-picker-separator"></span> }

				{ this.showTimeView &&
					<TimeSelectionClocks
						id={`${this._id}-time-sel`}
						class={{
							"ui5-dt-time": true,
							"ui5-dt-cal--hidden": this._phoneView && this.showTimeView,
							"ui5-dt-time--hidden": this._phoneView && this.showDateView,
						}}
						formatPattern={this._formatPattern}
						value={this._timeSelectionValue}
						onChange={this.onTimeSelectionChange}
						_calendarType={this._primaryCalendarType}
					/>
				}
			</div>
		</>
	);
}

function footer(this: DateTimePicker) {
	return (
		<div
			slot="footer"
			class={{
				"ui5-dt-picker-footer": true,
				"ui5-dt-picker-footer-time-hidden": (this._phoneView && this.showTimeView) || (this._phoneView && this.showDateView)
			}}>
			<Button
				id="ok"
				class="ui5-dt-picker-action"
				design="Emphasized"
				disabled={this._submitDisabled}
				onClick={this._submitClick}
			>
				{this.btnOKLabel}
			</Button>

			<Button
				id="cancel"
				class="ui5-dt-picker-action"
				design="Transparent"
				onClick={this._cancelClick}
			>
				{this.btnCancelLabel}
			</Button>
		</div>
	);
}
