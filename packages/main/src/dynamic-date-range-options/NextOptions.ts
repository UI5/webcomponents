import LastNextTemplate from "./LastNextTemplate.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import {
	handleSelectionChangeLastNext, isValidStringLastNext, parseLastNext, formatLastNextValue,
} from "./LastNextUtils.js";
import { toDatesLastNext } from "./toDates.js";
import DynamicDateRange from "../DynamicDateRange.js";
import {
	DYNAMIC_DATE_RANGE_NEXT_DAYS_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_WEEKS_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_MONTHS_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_QUARTERS_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_YEARS_TEXT,
	DYNAMIC_DATE_RANGE_DAYS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_WEEKS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_MONTHS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_QUARTERS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_YEARS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_COMBINED_TEXT,
	DYNAMIC_DATE_RANGE_INCLUDED_TEXT,
} from "../generated/i18n/i18n-defaults.js";

/**
 * @class
 * @constructor
 * @public
 * @since 2.14.0
 */
class NextOptions implements IDynamicDateRangeOption {
	template: JsxTemplate = LastNextTemplate;
	_operator: string;
	i18nKey: I18nText;
	options?: Array<string> = [];

	constructor(operators?: Array<string>) {
		this.options = operators;
		this._operator = this.options?.[0] || "NEXTDAYS";
		this.i18nKey = this._getI18nKeyForOperator(this._operator);
	}

	_getI18nKeyForOperator(operator: string): I18nText {
		switch (operator) {
		case "NEXTDAYS":
			return DYNAMIC_DATE_RANGE_NEXT_DAYS_TEXT;
		case "NEXTWEEKS":
			return DYNAMIC_DATE_RANGE_NEXT_WEEKS_TEXT;
		case "NEXTMONTHS":
			return DYNAMIC_DATE_RANGE_NEXT_MONTHS_TEXT;
		case "NEXTQUARTERS":
			return DYNAMIC_DATE_RANGE_NEXT_QUARTERS_TEXT;
		case "NEXTYEARS":
			return DYNAMIC_DATE_RANGE_NEXT_YEARS_TEXT;
		default:
			return DYNAMIC_DATE_RANGE_NEXT_DAYS_TEXT;
		}
	}

	parse(value: string): DynamicDateRangeValue | undefined {
		const matchingOption = this.availableOptions.find(optionInfo => {
			const tempOption = { operator: optionInfo.operator, text: optionInfo.text };
			return isValidStringLastNext(value, tempOption as IDynamicDateRangeOption);
		});

		if (matchingOption) {
			const tempOption = { operator: matchingOption.operator, text: matchingOption.text };
			return parseLastNext(value, tempOption as IDynamicDateRangeOption);
		}

		return undefined;
	}

	format(value: DynamicDateRangeValue): string {
		return formatLastNextValue(value, this);
	}

	toDates(value: DynamicDateRangeValue): Array<Date> {
		return toDatesLastNext(value, { operator: value.operator } as IDynamicDateRangeOption);
	}

	isValidString(value: string): boolean {
		return this.availableOptions.some(optionInfo => {
			const tempOption = { operator: optionInfo.operator, text: optionInfo.text };
			return isValidStringLastNext(value, tempOption as IDynamicDateRangeOption);
		});
	}

	handleSelectionChange(e: CustomEvent): DynamicDateRangeValue | undefined {
		return handleSelectionChangeLastNext(e, this);
	}

	get text(): string {
		if (this.options?.length && this.options.length > 1) {
			const units = this.availableOptions
				.filter(info => this.options?.includes(info.operator))
				.map(info => info.unitText);
			const unitsText = units.join(` / `);
			return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_NEXT_COMBINED_TEXT, unitsText);
		}

		const baseText = DynamicDateRange.i18nBundle.getText(this.i18nKey);
		const includedText = DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_INCLUDED_TEXT);
		return `${baseText} ${includedText}`;
	}

	get icon(): string {
		return "";
	}

	// Simple getter that provides all available Next options based on current component options
	get availableOptions() {
		const allOptions = [
			{ operator: "NEXTDAYS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_DAYS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_DAYS_UNIT_TEXT },
			{ operator: "NEXTWEEKS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_WEEKS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_WEEKS_UNIT_TEXT },
			{ operator: "NEXTMONTHS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_MONTHS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_MONTHS_UNIT_TEXT },
			{ operator: "NEXTQUARTERS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_QUARTERS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_QUARTERS_UNIT_TEXT },
			{ operator: "NEXTYEARS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_YEARS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_YEARS_UNIT_TEXT },
		];

		return allOptions.map(info => ({
			operator: info.operator,
			unitText: DynamicDateRange.i18nBundle.getText(info.unitI18nKey),
			text: DynamicDateRange.i18nBundle.getText(info.i18nKey),
		}));
	}

	get operator(): string {
		return this._operator;
	}

	set operator(value: string) {
		if (this.options?.includes(value)) {
			this._operator = value;
		}
	}
}

DynamicDateRange.register("NEXTDAYS", NextOptions);
DynamicDateRange.register("NEXTWEEKS", NextOptions);
DynamicDateRange.register("NEXTMONTHS", NextOptions);
DynamicDateRange.register("NEXTQUARTERS", NextOptions);
DynamicDateRange.register("NEXTYEARS", NextOptions);

export default NextOptions;
