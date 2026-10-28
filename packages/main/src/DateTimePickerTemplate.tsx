import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";

import type DateTimePicker from "./DateTimePicker.js";
import Bar from "./Bar.js";
import Button from "./Button.js";
import Calendar from "./Calendar.js";
import CalendarDate from "./CalendarDate.js";
import SegmentedButton from "./SegmentedButton.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";
import TimeSelectionInputs from "./TimeSelectionInputs.js";
import keyboardAndMouse from "@ui5/webcomponents-icons/dist/keyboard-and-mouse.js";
import timeEntryRequest from "@ui5/webcomponents-icons/dist/time-entry-request.js";

export default function DateTimePickerTemplate(this: DateTimePicker) {
	return [
		DatePickerInputTemplate.call(this),
		DatePickerPopoverTemplate.call(this, { header, content, footer, initialFocus: this.initialFocusId }),
	];
}

function header(this: DateTimePicker) {
	return (
		<Bar slot="header" design="Header">
			<span class="ui5-dt-header-title" slot="startContent">{this._headerTitleText}</span>
			<SegmentedButton class="ui5-dt-picker-toggle-button" onSelectionChange={this._dateTimeSwitchChange}>
				<SegmentedButtonItem data-ui5-key="Date" selected={this.showDateView}>{this.btnDateLabel}</SegmentedButtonItem>
				<SegmentedButtonItem data-ui5-key="Time" selected={this.showTimeView}>{this.btnTimeLabel}</SegmentedButtonItem>
			</SegmentedButton>
			{ this.showTimeView &&
				<Button
					slot="endContent"
					design="Transparent"
					icon={this._useTimeInputsMode ? timeEntryRequest : keyboardAndMouse}
					tooltip={this._dtpTimeToggleLabel}
					onClick={this._toggleDtpTimeMode}
				/>
			}
		</Bar>
	);
}

function content(this: DateTimePicker) {
	return (
		<>
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
					(this._useTimeInputsMode
						? <TimeSelectionInputs
							id={`${this._id}-time-sel`}
							class={{
								"ui5-dt-time": true,
								"ui5-dt-time--hidden": this._phoneView && this.showDateView,
								"ui5-dt-mode-inputs": true,
							}}
							value={this._timeSelectionValue}
							formatPattern={this._formatPattern}
							_showLabels={true}
							onChange={this.onTimeSelectionChange}
						/>
						: <TimeSelectionClocks
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
					)
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
