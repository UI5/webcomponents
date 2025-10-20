import FromDateTimeTemplate from "./FromDateTimeTemplate.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import {
	DATETIME_PICKER_DATE_BUTTON,
	DATETIME_PICKER_TIME_BUTTON,
	DYNAMIC_DATE_RANGE_TO_INPUT_TEXT,
	DYNAMIC_DATE_RANGE_TO_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import { dateTimeOptionToDates } from "./toDates.js";
import DynamicDateRange from "../DynamicDateRange.js";

/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */

class ToDateTime implements IDynamicDateRangeOption {
	template: JsxTemplate;
	private _showTimeView: boolean;
	private _currentDateValue: Date;

	constructor() {
		this.template = FromDateTimeTemplate;
		this._showTimeView = false;
		this._currentDateValue = UI5Date.getInstance();
	}

	parse(value: string): DynamicDateRangeValue {
		const dateText = value.replace(this.toText, "").trim();
		const date = this.getFormat().parse(dateText) as Date;
		const returnValue = { operator: "", values: [] } as DynamicDateRangeValue;

		returnValue.operator = this.operator;
		returnValue.values = [date];

		return returnValue;
	}

	format(value: DynamicDateRangeValue): string {
		const valuesArray = value?.values as Array<Date>;

		if (!valuesArray || valuesArray.length === 0) {
			return "";
		}

		const formattedValue = this.getFormat().format(valuesArray[0]);

		return `${this.toText} ${formattedValue}`;
	}

	toDates(value: DynamicDateRangeValue): Array<Date> {
		return dateTimeOptionToDates(value);
	}

	resetState?: (() => void) | undefined = () => {
		this._showTimeView = false;
	}

	get text(): string {
		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_TO_TEXT);
	}

	get operator() {
		return "TODATETIME";
	}

	get icon() {
		return "appointment-2";
	}

	get showDateView() {
		return !this._showTimeView;
	}

	get showTimeView() {
		return this._showTimeView;
	}

	get btnDateLabel() {
		return DynamicDateRange.i18nBundle.getText(DATETIME_PICKER_DATE_BUTTON);
	}

	get btnTimeLabel() {
		return DynamicDateRange.i18nBundle.getText(DATETIME_PICKER_TIME_BUTTON);
	}

	get toText() {
		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_TO_INPUT_TEXT);
	}

	getDateValue(date: Date | undefined) : string {
		if (date) {
			return this.getDateFormat().format(date);
		}

		return this._currentDateValue ? this.getDateFormat().format(this._currentDateValue) : "";
	}

	getTimeValue(date: Date | undefined) : string	 {
		if (date) {
			return this.getFormat().format(date);
		}

		return this._currentDateValue ? this.getFormat().format(this._currentDateValue) : "";
	}

	_dateTimeSwitchChange() {
		this._showTimeView = !this._showTimeView;
	}

	isValidString(value: string): boolean {
		const dateText = value.replace(this.toText, "").trim();
		const date = this.getFormat().parse(dateText) as Date;

		if (!date || Number.isNaN(date.getTime())) {
			return false;
		}

		return true;
	}

	getFormat(): DateFormat {
		return DateFormat.getDateTimeInstance({
			strictParsing: true,
		});
	}

	getDateFormat(): DateFormat {
		return DateFormat.getDateInstance({
			strictParsing: true,
		});
	}

	getTimeFormat(): DateFormat {
		return DateFormat.getTimeInstance({
			strictParsing: true,
		});
	}

	handleSelectionChange(e: CustomEvent, value: DynamicDateRangeValue | undefined): DynamicDateRangeValue | undefined {
		const currentValue = value || { operator: "", values: [] } as DynamicDateRangeValue;
		const target = e.target as HTMLElement;
		currentValue.values = this._currentDateValue ? [this._currentDateValue] : [];
		currentValue.operator = this.operator;

		if (target.hasAttribute("ui5-segmented-button")) {
			this._dateTimeSwitchChange();
			return currentValue;
		}

		if (target.hasAttribute("ui5-calendar")) {
			if (e.detail.selectedDates[0]) {
				const tempDate = UI5Date.getInstance(e.detail.selectedDates[0] * 1000);
				this._currentDateValue.setFullYear(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
				currentValue.values = [this._currentDateValue];
			}
		}

		if (target.hasAttribute("ui5-time-selection-clocks")) {
			const tempValue = e.detail.value as string;
			const tempDate = this.getFormat().parse(tempValue) as Date;
			if (!this._currentDateValue && value?.values?.length) {
				this._currentDateValue = value?.values[0] as Date;
			}

			if (tempDate) {
				this._currentDateValue.setHours(tempDate.getHours(), tempDate.getMinutes(), tempDate.getSeconds());
				currentValue.values = [this._currentDateValue];
			}
		}

		this._showTimeView = true;

		return currentValue;
	}
}

DynamicDateRange.register("TODATETIME", ToDateTime);

export default ToDateTime;
