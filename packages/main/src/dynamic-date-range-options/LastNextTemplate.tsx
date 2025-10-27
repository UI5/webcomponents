import DynamicDateRange from "../DynamicDateRange.js";
import StepInput from "../StepInput.js";
import Select from "../Select.js";
import type { SelectChangeEventDetail } from "../Select.js";
import Option from "../Option.js";
import Label from "../Label.js";
import type LastOptions from "./LastOptions.js";
import type NextOptions from "./NextOptions.js";
import {
	DYNAMIC_DATE_RANGE_VALUE_LABEL_TEXT,
	DYNAMIC_DATE_RANGE_UNIT_OF_TIME_LABEL_TEXT,
} from "../generated/i18n/i18n-defaults.js";

export default function LastNextTemplate(this: DynamicDateRange) {
	const currentOption = this._currentOption as LastOptions | NextOptions;

	const availableOptionInfos = currentOption.availableOptions;

	const filteredOptions = availableOptionInfos.filter(info =>
		currentOption.options?.includes(info.operator) || currentOption.operator === info.operator
	);

	const isGrouped = filteredOptions.length > 1;

	const currentNumber = this.currentValue?.values ? typeof this.currentValue.values[0] === "number" ? this.currentValue.values[0] : 1 : 1;
	const currentOperator = this.currentValue?.operator || filteredOptions[0]?.operator || "";

	// Input handlers
	const handleNumberChange = (e: CustomEvent) => {
		const newValue = Number((e.target as StepInput).value);
		this.currentValue = {
			operator: currentOperator,
			values: [newValue],
		};
	};

	const handleUnitChange = (e: CustomEvent<SelectChangeEventDetail>) => {
		const newOperator = String(e.detail.selectedOption.value);
		this.currentValue = {
			operator: newOperator,
			values: [currentNumber],
		};
	};

	return (
		<div class="ui5-last-next-container ui5-last-next-container-padded">
			<div class="ui5-ddr-input-container ui5-ddr-input-container-right-aligned">
				<Label class="ui5-ddr-label">{DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_VALUE_LABEL_TEXT)}</Label>
				<StepInput
					value={currentNumber}
					min={1}
					max={isGrouped ? 9999 : 999}
					onChange={handleNumberChange}
				/>

				{isGrouped && (
					<>
						<Label class="ui5-ddr-label">{DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_UNIT_OF_TIME_LABEL_TEXT)}</Label>
						<Select value={currentOperator} onChange={handleUnitChange}>
							{filteredOptions.map(option => (
								<Option value={option.operator} key={option.operator}>
									{option.unitText}
								</Option>
							))}
						</Select>
					</>
				)}
			</div>
		</div>
	);
}
