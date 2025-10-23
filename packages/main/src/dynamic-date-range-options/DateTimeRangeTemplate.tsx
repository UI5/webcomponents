import DynamicDateRange from "../DynamicDateRange.js";
import DateTimePicker from "../DateTimePicker.js";
import Label from "../Label.js";
import {
	DYNAMIC_DATE_TIME_RANGE_TEXT_TO_LABEL,
	DYNAMIC_DATE_TIME_RANGE_TEXT_FROM_LABEL,
} from "../generated/i18n/i18n-defaults.js";

export default function DateTimeRangeTemplate(this: DynamicDateRange) {
	const currentOperator = this.currentValue?.operator || "DATETIMERANGE";

	const getDateFromValue = (index = 0) => {
		if (this.value?.operator === currentOperator && this.value.values && this.value.values.length === 2) {
			return this.getOption(this.value.operator)?.format(this.value)?.split("-")[index].trim();
		}
		return undefined;
	};

	const handleSelectionChange = () => {
		const fromPicker = this.shadowRoot?.querySelector("[ui5-datetime-picker]#from-picker") as DateTimePicker;
		const toPicker = this.shadowRoot?.querySelector("[ui5-datetime-picker]#to-picker") as DateTimePicker;

		const fromDateValue = fromPicker.dateValue;
		const toDateValue = toPicker.dateValue;

		// If there are no dates selected, clear the value
		if (!(fromDateValue && toDateValue)) {
			this.currentValue = {
				operator: currentOperator,
				values: []
			};
			return;
		}

		const newValue = [fromDateValue, toDateValue];

		if (newValue[0] && newValue[1] && newValue[0].getTime() > newValue[1].getTime()) {
			newValue.reverse();
		}

		this.currentValue = {
			operator: currentOperator,
			values: newValue,
		};
	};
	return (
		<div class="ui5-last-next-container ui5-last-next-container-padded">
			<Label class="ui5-ddr-label">{DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_TIME_RANGE_TEXT_FROM_LABEL)}</Label>
			<DateTimePicker
				id="from-picker"
				onChange={handleSelectionChange}
				value={getDateFromValue()}>
			</DateTimePicker>
			<Label class="ui5-ddr-label">{DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_TIME_RANGE_TEXT_TO_LABEL)}</Label>
			<DateTimePicker
				id="to-picker"
				onChange={handleSelectionChange}
				value={getDateFromValue(1)}>
			</DateTimePicker>
		</div>
	);
}
