import type DynamicDateRange from "../DynamicDateRange.js";
import Calendar from "../Calendar.js";
import CalendarDate from "../CalendarDate.js";
import SegmentedButton from "../SegmentedButton.js";
import SegmentedButtonItem from "../SegmentedButtonItem.js";
import TimeSelectionClocks from "../TimeSelectionClocks.js";
import type FromDateTimeOption from "./FromDateTime.js";

export default function FromDateTime(this: DynamicDateRange) {
	const currentOption = this._currentOption as FromDateTimeOption;
	const currentValue = this.value?.values ? this.value.values[0] as Date : undefined;
	return (
		<div class="ui5-dynamic-date-range-option-datetime-container">
			<div class="ui5-dt-picker-header">
				<SegmentedButton class="ui5-dt-picker-toggle-button" onSelectionChange={this.handleSelectionChange}>
					<SegmentedButtonItem data-ui5-key="Date" selected={currentOption.showDateView}>{currentOption.btnDateLabel}</SegmentedButtonItem>
					<SegmentedButtonItem data-ui5-key="Time" selected={currentOption.showTimeView}>{currentOption.btnTimeLabel}</SegmentedButtonItem>
				</SegmentedButton>
			</div>

			<div class={{
				"ui5-dt-picker-content": true,
			}}>
				{!!currentOption.showDateView &&
					<Calendar
						class={{
							"ui5-dt-cal": true,
							"ui5-dt-cal--hidden": currentOption.showTimeView,
							"ui5-dt-time--hidden": currentOption.showDateView,
						}}
						onSelectionChange={this.handleSelectionChange}
					>
						<CalendarDate
							value={currentOption.getDateValue(currentValue)}
						></CalendarDate>
					</Calendar>
				}

				{!!currentOption.showTimeView &&
					<TimeSelectionClocks
						class={{
							"ui5-dt-time": true,
							"ui5-dt-cal--hidden": currentOption.showTimeView,
							"ui5-dt-time--hidden": currentOption.showDateView,
						}}
						value={currentOption.getTimeValue(currentValue)}
						onChange={this.handleSelectionChange}
					/>
				}
			</div>
		</div>
	);
}
