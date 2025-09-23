import DynamicDateRange from "../DynamicDateRange.js";
import DateTimePicker from "../DateTimePicker.js";
import Label from "../Label.js";
import {
	DYNAMIC_DATE_TIME_RANGE_TEXT_TO_LABEL,
	DYNAMIC_DATE_TIME_RANGE_TEXT_FROM_LABEL,
} from "../generated/i18n/i18n-defaults.js";

export default function DateTimeRangeTemplate(this: DynamicDateRange) {
	const currentOperator = "DATETIMERANGE";

	const getStartDate = () => {
		if (this.value?.operator === currentOperator && this.value.values && this.value.values.length === 2) {
			return this.getOption(this.value.operator)?.format(this.value)?.split("-")[0].trim();
		}
		return undefined;
	};

	const getEndDate = () => {
		if (this.value?.operator === currentOperator && this.value.values && this.value.values.length === 2) {
			return this.getOption(this.value.operator)?.format(this.value)?.split("-")[1].trim();
		}
		return undefined;
	};

	const handleSelectionChange = (e: CustomEvent) => {
		const dateTimePicker = e.target as DateTimePicker;
		const dateValue = dateTimePicker.dateValue;
		const pickerId = dateTimePicker.id;

		// Validate the date value before proceeding
		if (!dateValue || !e.detail?.value || Number.isNaN(dateValue.getTime())) {
			this.currentValue = {
				operator: currentOperator,
				values: []
			};
			return;
		}

		// Get current values if from same operator, otherwise start fresh
		const existingValues = (this.currentValue?.operator === currentOperator && this.currentValue.values)
			? [...(this.currentValue.values as Date[])]
			: [];

		let updatedValues: Date[];

		if (pickerId === "to-picker") {
			updatedValues = [existingValues[0], dateValue];
		} else {
			updatedValues = [dateValue, existingValues[1]];
		}

		if (updatedValues[0] && updatedValues[1] && updatedValues[0].getTime() > updatedValues[1].getTime()) {
			updatedValues.reverse();
		}

		this.currentValue = {
			operator: currentOperator,
			values: updatedValues,
		};
	};
	return (
		<div class="ui5-last-next-container ui5-last-next-container-padded">
			<Label class="ui5-ddr-label">{DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_TIME_RANGE_TEXT_FROM_LABEL)}</Label>
			<DateTimePicker
				id="from-picker"
				onChange={handleSelectionChange}
				value={getStartDate()}>
			</DateTimePicker>
			<Label class="ui5-ddr-label">{DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_TIME_RANGE_TEXT_TO_LABEL)}</Label>
			<DateTimePicker
				id="to-picker"
				onChange={handleSelectionChange}
				value={getEndDate()}>
			</DateTimePicker>
		</div>
	);
}
