import type DynamicDateRange from "../DynamicDateRange.js";
import Label from "../Label.js";
import StepInput from "../StepInput.js";

export default function TodayFromToTemplate(this: DynamicDateRange) {
	const currentValues = this.currentValue?.values;

	const xValue = currentValues ? currentValues[0] as number : 0;
	const yValue = currentValues ? currentValues[1] as number : 0;

	const handleNumberChange = (e: CustomEvent) => {
		const target = e.target as StepInput;
		const input = target.id;
		const newValue = Number(target.value);

		// Get current values, defaulting to existing values or 0
		let newXValue = xValue;
		let newYValue = yValue;

		// Update the appropriate value based on which input changed
		if (input === "x-input") {
			newXValue = newValue;
		} else if (input === "y-input") {
			newYValue = newValue;
		}

		// Update currentValue with both values
		this.currentValue = {
			operator: "TODAYFROMTO",
			values: [newXValue, newYValue],
		};
	};
	return (
		<div class=".ui5-last-next-container ui5-last-next-container-padded">
			<div class="ui5-ddr-input-container ui5-ddr-input-container-right-aligned">
				<Label class="ui5-ddr-label">Before Today:</Label>
				<StepInput
					id="x-input"
					value={xValue}
					min={0}
					max={9999}
					onChange={handleNumberChange}
				/>
				<Label class="ui5-ddr-label">After Today:</Label>
				<StepInput
					id="y-input"
					value={yValue}
					min={0}
					max={9999}
					onChange={handleNumberChange}
				/>
			</div>
		</div>
	);
}
