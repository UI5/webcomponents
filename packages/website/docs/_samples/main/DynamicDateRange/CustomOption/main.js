import "@ui5/webcomponents/dist/Assets-fetch.js";
import "@ui5/webcomponents/dist/DynamicDateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";
import "@ui5/webcomponents/dist/StepInput.js";
import "@ui5/webcomponents/dist/Label.js";
import DynamicDateRange from "@ui5/webcomponents/dist/DynamicDateRange.js";
import StepInput from "@ui5/webcomponents/dist/StepInput.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import { jsx, jsxs } from "@ui5/webcomponents-base/jsx-runtime";

/**
 * Custom option: Today +/- Days
 *
 * This option allows the user to define a date range relative to today
 * by specifying how many days to add (future) and subtract (past).
 * For example, +3 / -2 would produce a range from 2 days ago to 3 days from now.
 */
class TodayPlusMinusDays {
	get text() {
		return "Today +/- Days";
	}

	get operator() {
		return "TODAYPLUSMINUSDAYS";
	}

	get icon() {
		return "date-time";
	}

	parse(value) {
		const match = value.match(/Today\s*\+(\d+)\s*\/\s*-(\d+)\s*Days/i);
		if (match) {
			return {
				operator: this.operator,
				values: [Number.parseInt(match[1]), Number.parseInt(match[2])],
			};
		}
		return undefined;
	}

	format(value) {
		// When called with no values (initial selection)
		if (!value?.values || value.values.length === 0) {
			return "Today +1 / -1 Days";
		}

		// When called with Date objects (from currentValueText via toDates)
		if (value.values[0] instanceof Date) {
			const startDate = value.values[0];
			const endDate = value.values[1] || value.values[0];
			return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
		}

		// Normal case: values are numbers from StepInput
		const plusDays = value.values[0] ?? 0;
		const minusDays = value.values[1] ?? 0;
		return `Today +${plusDays} / -${minusDays} Days`;
	}

	toDates(value) {
		const plusDays = value?.values?.[0] ?? 0;
		const minusDays = value?.values?.[1] ?? 0;

		const startDate = new Date();
		startDate.setDate(startDate.getDate() - minusDays);
		startDate.setHours(0, 0, 0, 0);

		const endDate = new Date();
		endDate.setDate(endDate.getDate() + plusDays);
		endDate.setHours(23, 59, 59, 999);

		return [startDate, endDate];
	}

	isValidString(value) {
		return /^Today\s*\+\d+\s*\/\s*-\d+\s*Days$/i.test(value);
	}

	handleSelectionChange(e, currentValue) {
		const target = e.target;
		const plusDays = currentValue?.values?.[0] ?? 1;
		const minusDays = currentValue?.values?.[1] ?? 1;

		if (target.getAttribute("data-field") === "plus") {
			return {
				operator: this.operator,
				values: [Number(target.value), minusDays],
			};
		}

		if (target.getAttribute("data-field") === "minus") {
			return {
				operator: this.operator,
				values: [plusDays, Number(target.value)],
			};
		}

		return currentValue;
	}

	template() {
		const currentValue = this.currentValue;
		const plusDays = currentValue?.values?.[0] ?? 1;
		const minusDays = currentValue?.values?.[1] ?? 1;

		return jsxs("div", {
			class: "ui5-last-next-container ui5-last-next-container-padded",
			children: [
				jsxs("div", {
					class: "ui5-ddr-input-container ui5-ddr-input-container-right-aligned",
					children: [
						jsx(Label, { class: "ui5-ddr-label", children: "Days After Today" }),
						jsx(StepInput, {
							value: plusDays,
							min: 0,
							max: 999,
							"data-field": "plus",
							onChange: this.handleSelectionChange,
						}),
						jsx(Label, { class: "ui5-ddr-label", children: "Days Before Today" }),
						jsx(StepInput, {
							value: minusDays,
							min: 0,
							max: 999,
							"data-field": "minus",
							onChange: this.handleSelectionChange,
						}),
					],
				}),
			],
		});
	}
}

DynamicDateRange.register("TODAYPLUSMINUSDAYS", TodayPlusMinusDays);

const dynamicDateRange = document.getElementById("dynamicDateRange");
const selectedValueInput = document.getElementById("selectedValue");
const convertedDatesInput = document.getElementById("convertedDates");

dynamicDateRange.addEventListener("ui5-change", (e) => {
	const selectedValue = e.target.value;

	selectedValueInput.value = JSON.stringify(selectedValue);

	const dates = dynamicDateRange.toDates(selectedValue);
	convertedDatesInput.value = dates.map(date => date.toLocaleString()).join(" - ");
});
