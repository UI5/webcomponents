import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import convertMonthNumbersToMonthNames from "@ui5/webcomponents-localization/dist/dates/convertMonthNumbersToMonthNames.js";
import CalendarDateComponent from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isEnter,
	isF4,
	isF4Shift,
	isSpace,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import { getMaxCalendarDate } from "@ui5/webcomponents-localization/dist/dates/ExtremeDates.js";
import CalendarDate from "./CalendarDate.js";
import CalendarDateRange from "./CalendarDateRange.js";
import "./SpecialCalendarDate.js";
import CalendarPart from "./CalendarPart.js";
import type { DayPickerChangeEventDetail } from "./DayPicker.js";
import type { MonthPickerChangeEventDetail } from "./MonthPicker.js";
import type { YearPickerChangeEventDetail } from "./YearPicker.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import type CalendarLegend from "./CalendarLegend.js";
import type { CalendarLegendItemSelectionChangeEventDetail } from "./CalendarLegend.js";
import type SpecialCalendarDate from "./SpecialCalendarDate.js";
import type CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

// Default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

// Template
import CalendarTemplate from "./CalendarTemplate.js";

// Styles
import calendarCSS from "./generated/themes/Calendar.css.js";
import CalendarHeaderCss from "./generated/themes/CalendarHeader.css.js";
import {
	CALENDAR_HEADER_MONTH_BUTTON,
	CALENDAR_HEADER_MONTH_BUTTON_SHORTCUT,
	CALENDAR_HEADER_YEAR_BUTTON,
	CALENDAR_HEADER_YEAR_BUTTON_SHORTCUT,
	CALENDAR_HEADER_YEAR_RANGE_BUTTON,
	CALENDAR_HEADER_YEAR_RANGE_BUTTON_SHORTCUT,
	CALENDAR_HEADER_MONTH_NEXT_BUTTON_TITLE,
	CALENDAR_HEADER_MONTH_NEXT_BUTTON_SHORTCUT,
	CALENDAR_HEADER_MONTH_PREVIOUS_BUTTON_TITLE,
	CALENDAR_HEADER_MONTH_PREVIOUS_BUTTON_SHORTCUT,
	CALENDAR_HEADER_YEAR_NEXT_BUTTON_TITLE,
	CALENDAR_HEADER_YEAR_PREVIOUS_BUTTON_TITLE,
	CALENDAR_HEADER_YEAR_RANGE_NEXT_BUTTON_TITLE,
	CALENDAR_HEADER_YEAR_RANGE_PREVIOUS_BUTTON_TITLE,
} from "./generated/i18n/i18n-defaults.js";
import type { YearRangePickerChangeEventDetail } from "./YearRangePicker.js";

interface ICalendarPicker extends HTMLElement {
	_showPreviousPage: () => void,
	_showNextPage: () => void,
	_hasPreviousPage: () => boolean,
	_hasNextPage: () => boolean,
	_currentYearRange?: CalendarYearRangeT,
}

/**
 * Interface for components that may be slotted inside a `ui5-calendar`.
 *
 * **Note:** Use with `ui5-date` or `ui5-date-range` as calendar date selection types.
 * @public
 */
interface ICalendarSelectedDates extends UI5Element {
	value?: string,
	startValue?: string,
	endValue?: string
}

type CalendarSelectionChangeEventDetail = {
	selectedValues: Array<string>,
	selectedDates: Array<number>,
	timestamp: number | undefined,
}

type SpecialCalendarDateT = {
	specialDateTimestamp: number;
	type: `${CalendarLegendItemType}`;
	tooltip?: string;
};

type CalendarYearRangeT = {
	startYear: number,
	endYear: number,
}

type DisabledDateRangeT = {
	startValue?: string,
	endValue?: string
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-calendar` component allows users to select one or more dates.
 *
 * Currently selected dates are represented with instances of `ui5-date` as
 * children of the `ui5-calendar`. The value property of each `ui5-date` must be a
 * date string, correctly formatted according to the `ui5-calendar`'s `formatPattern` property.
 * Whenever the user changes the date selection, `ui5-calendar` will automatically create/remove instances
 * of `ui5-date` in itself, unless you prevent this behavior by calling `preventDefault()` for the
 * `selection-change` event. This is useful if you want to control the selected dates externally.
 *
 * ### Usage
 *
 * The user can navigate to a particular date by:
 *
 * - Pressing over a month inside the months view
 * - Pressing over an year inside the years view
 *
 * The user can confirm a date selection by pressing over a date inside the days view.
 *
 * ### Keyboard Handling
 * The `ui5-calendar` provides advanced keyboard handling.
 * When a picker is showed and focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - Day picker:
 *
 * - [F4] - Shows month picker
 * - [Shift] + [F4] - Shows year picker
 * - [Page Up] - Navigate to the previous month
 * - [Page Down] - Navigate to the next month
 * - [Shift] + [Page Up] - Navigate to the previous year
 * - [Shift] + [Page Down] - Navigate to the next year
 * - [Ctrl] + [Shift] + [Page Up] - Navigate ten years backwards
 * - [Ctrl] + [Shift] + [Page Down] - Navigate ten years forwards
 * - [Home] - Navigate to the first day of the week
 * - [End] - Navigate to the last day of the week
 * - [Ctrl] + [Home] - Navigate to the first day of the month
 * - [Ctrl] + [End] - Navigate to the last day of the month
 *
 * - Month picker:
 *
 * - [Page Up] - Navigate to the previous year
 * - [Page Down] - Navigate to the next year
 * - [Home] - Navigate to the first month of the current row
 * - [End] - Navigate to the last month of the current row
 * - [Ctrl] + [Home] - Navigate to the first month of the current year
 * - [Ctrl] + [End] - Navigate to the last month of the year
 *
 * - Year picker:
 *
 * - [Page Up] - Navigate to the previous year range
 * - [Page Down] - Navigate the next year range
 * - [Home] - Navigate to the first year of the current row
 * - [End] - Navigate to the last year of the current row
 * - [Ctrl] + [Home] - Navigate to the first year of the current year range
 * - [Ctrl] + [End] - Navigate to the last year of the current year range
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### Calendar types
 * The component supports several calendar types - Gregorian, Buddhist, Islamic, Japanese and Persian.
 * By default the Gregorian Calendar is used. In order to use the Buddhist, Islamic, Japanese or Persian calendar,
 * you need to set the `primaryCalendarType` property and import one or more of the following modules:
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";`
 *
 * Or, you can use the global configuration and set the `calendarType` key:
 *
 * ```html
 * <script data-id="sap-ui-config" type="application/json">
 * 	{
 * 		"calendarType": "Japanese"
 * 	}
 * </script>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Calendar.js";`
 * @constructor
 * @extends CalendarPart
 * @public
 * @csspart day-cell - Used to style the day cells.
 * @csspart day-cell-selected - Used to style the day cells when selected.
 * @csspart day-cell-selected-between - Used to style the day cells in between of selected dates in range.
 * @csspart month-cell - Used to style the month cells.
 * @csspart month-cell-selected - Used to style the month cells when selected.
 * @csspart month-cell-selected-between - Used to style the day cells in between of selected months in range.
 * @csspart month-picker-root - Used to style the month picker root container.
 * @csspart year-cell - Used to style the year cells.
 * @csspart year-cell-selected - Used to style the year cells when selected.
 * @csspart year-cell-selected-between - Used to style the year cells in between of selected years in range.
 * @csspart year-picker-root - Used to style the year picker root container.
 * @csspart year-range-cell - Used to style the year range cells.
 * @csspart year-range-cell-selected - Used to style the year range cells when selected.
 * @csspart year-range-cell-selected-between - Used to style the year range cells in between of selected year ranges.
 * @csspart year-range-picker-root - Used to style the year range picker root container.
 * @csspart calendar-header-middle-button - Used to style the calendar header middle buttons (month/year/year-range buttons).
 * @csspart calendar-header-arrow-button - Used to style the calendar header navigation arrow buttons (previous/next buttons).
 * @since 1.0.0-rc.11
 */
@customElement({
	tag: "ui5-calendar",
	fastNavigation: true,
	template: CalendarTemplate,
	styles: [calendarCSS, CalendarHeaderCss],
})
/**
 * Fired when the selected dates change.
 *
 * **Note:** If you call `preventDefault()` for this event, the component will not
 * create instances of `ui5-date` for the newly selected dates. In that case you should do this manually.
 * @param {Array<string>} selectedValues The selected dates
 * @param {Array<number>} selectedDates The selected dates as UTC timestamps
 * @public
 */
@event("selection-change", {
	bubbles: true,
	cancelable: true,
})

@event("show-month-view", {
	bubbles: true,
})
@event("show-year-view", {
	bubbles: true,
})
@event("show-year-range-view", {
	bubbles: true,
})
class Calendar extends CalendarPart {
	eventDetails!: CalendarPart["eventDetails"] & {
		"selection-change": CalendarSelectionChangeEventDetail,
		"show-month-view": void,
		"show-year-view": void,
		"show-year-range-view": void,
	}
	/**
	 * Defines the type of selection used in the calendar component.
	 * Accepted property values are:
	 *
	 * - `CalendarSelectionMode.Single` - enables a single date selection.(default value)
	 * - `CalendarSelectionMode.Range` - enables selection of a date range.
	 * - `CalendarSelectionMode.Multiple` - enables selection of multiple dates.
	 * @default "Single"
	 * @public
	 */
	@property()
	selectionMode: `${CalendarSelectionMode}` = "Single";

	/**
	 * Defines the visibility of the week numbers column.
	 *
	 * **Note:** For calendars other than Gregorian,
	 * the week numbers are not displayed regardless of what is set.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideWeekNumbers = false;

	/**
	 * Which picker is currently visible to the user: day/month/year/yearRange
	 * @private
	 */
	@property()
	_currentPicker: "day" | "month" | "year" | "yearrange" = "day"

	@property({ type: Boolean })
	_previousButtonDisabled = false;

	@property({ type: Boolean })
	_nextButtonDisabled = false;

	@property()
	_headerMonthButtonText?: string;

	@property()
	_headerYearButtonText?: string;

	@property()
	_headerYearButtonTextSecType?: string;

	@property()
	_headerYearRangeButtonText?: string;

	@property()
	_headerYearRangeButtonTextSecType?: string;

	@property({ noAttribute: true })
	_pickersMode: `${CalendarPickersMode}` = "DAY_MONTH_YEAR";

	_valueIsProcessed = false;

	_rangeStartYear?: number;

	/**
	 * Defines the calendar legend of the component.
	 * @public
	 * @since 1.23.0
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	calendarLegend!: Slot<Array<CalendarLegend>>;

	/**
	 * Defines the selected date or dates (depending on the `selectionMode` property)
	 * for this calendar as instances of `ui5-date` or `ui5-date-range`.
	 * Use `ui5-date` for single or multiple selection, and `ui5-date-range` for range selection.
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	dates!: DefaultSlot<Array<ICalendarSelectedDates>>;

	/**
	 * Defines the special dates, visually emphasized in the calendar.
	 * @public
	 * @since 1.23.0
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	specialDates!: Slot<Array<SpecialCalendarDate>>;

	/**
	 * Defines the disabled date ranges that cannot be selected in the calendar.
	 * Use `ui5-date-range` elements to specify ranges of disabled dates.
	 * Each range can define a start date, an end date, or both.
	 * @public
	 * @since 2.16.0
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	disabledDates!: Slot<Array<CalendarDateRange>>;

	/**
	 * Defines the selected item type of the calendar legend item (if such exists).
	 * @private
	 */
	@property()
	_selectedItemType: `${CalendarLegendItemType}` = "None";

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._valueIsProcessed = false;
	}

	/**
	 * @private
	 */
	get _selectedDatesTimestamps(): Array<number> {
		let selectedDates: Array<number> = [];

		if (this.selectionMode === CalendarSelectionMode.Range) {
			const range = this.dates.find(date => date.hasAttribute("ui5-date-range"));
			const startDate = range && range.startValue && this.getFormat().parse(range.startValue, true) as Date;
			const endDate = range && range.endValue && this.getFormat().parse(range.endValue, true) as Date;

			if (startDate) {
				selectedDates.push(startDate.getTime() / 1000);
			}

			if (endDate) {
				selectedDates.push(endDate.getTime() / 1000);
			}
		} else {
			selectedDates = this.dates
				.filter(dateElement => {
					return dateElement.hasAttribute("ui5-date")
						&& dateElement.value
						&& this._isValidCalendarDate(dateElement.value)
						&& this._getTimeStampFromString(dateElement.value);
				})
				.map(dateElement => Number(this._getTimeStampFromString(dateElement.value!)) / 1000);
		}

		return selectedDates;
	}

	/**
	 * @private
	 */
	_setSelectedDates(selectedDates: Array<number>) {
		const selectedUTCDates = selectedDates.map(timestamp => this.getFormat().format(UI5Date.getInstance(timestamp * 1000), true));

		if (this.selectionMode === CalendarSelectionMode.Range) {
			// Create tags for the selected dates that don't already exist in DOM
			if (selectedUTCDates.length) {
				let dateRange = this.dates.find(dateElement => dateElement.hasAttribute("ui5-date-range") && dateElement.startValue === selectedUTCDates[0]);
				if (!dateRange) {
					dateRange = document.createElement(CalendarDateRange.getMetadata().getTag()) as CalendarDateRange;
					dateRange.startValue = selectedUTCDates[0];
					this.appendChild(dateRange);
				} else {
					dateRange.endValue = selectedUTCDates[1];
				}
				// Remove all elements for dates that are no longer selected
				this.dates
					.filter(dateElement => {
						return dateElement.hasAttribute("ui5-date")
							|| (dateRange && dateElement.startValue !== dateRange.startValue);
					})
					.forEach(dateElement => {
						this.removeChild(dateElement);
					});
			}
		} else {
			const valuesInDOM = this._selectedDatesTimestamps.map(timestamp => this.getFormat().format(UI5Date.getInstance(timestamp * 1000)));

			// Remove all elements for dates that are no longer selected
			this.dates
				.filter(dateElement => {
					return dateElement.hasAttribute("ui5-date-range")
						|| (dateElement.hasAttribute("ui5-date") && !selectedUTCDates.includes(dateElement.value!));
				})
				.forEach(dateElement => {
					this.removeChild(dateElement);
				});

			// Create tags for the selected dates that don't already exist in DOM
			selectedUTCDates
				.filter(value => !valuesInDOM.includes(value))
				.forEach(value => {
					const dateElement = document.createElement(CalendarDate.getMetadata().getTag()) as CalendarDate;
					dateElement.value = value;
					this.appendChild(dateElement);
				});
		}
	}

	_isValidCalendarDate(dateString: string): boolean {
		const date = this.getFormat().parse(dateString);
		return !!date;
	}

	get _disabledDates() {
		const validDisabledDateRanges = this.disabledDates.filter(dateRange => {
			const startValue = dateRange.startValue;
			const endValue = dateRange.endValue;
			return (startValue && this._isValidCalendarDate(startValue)) || (endValue && this._isValidCalendarDate(endValue));
		});

		return validDisabledDateRanges.map(dateRange => ({
			startValue: dateRange.startValue,
			endValue: dateRange.endValue,
		}));
	}

	get _specialCalendarDates() {
		const hasSelectedType = this._specialDates.some(date => date.type === this._selectedItemType);
		const validSpecialDates = this._specialDates.filter(date => {
			const dateType = date.type;
			const dateValue = date.value;
			const isTypeMatch = hasSelectedType
				? (dateType === this._selectedItemType || dateType === "Working" || dateType === "NonWorking")
				: true;
			return isTypeMatch && dateValue && this._isValidCalendarDate(dateValue);
		});

		validSpecialDates.forEach(date => {
			const refLegendItem = this.calendarLegend.length ? this.calendarLegend[0].items.find(item => item.type === date.type) : undefined;
			date._tooltip = refLegendItem?.text || "";
		});

		const uniqueDates = new Set();
		const uniqueSpecialDates: Array<SpecialCalendarDateT> = [];

		validSpecialDates.forEach(date => {
			const dateFromValue = this.getFormat().parse(date.value) as Date | UI5Date;
			const timestamp = dateFromValue.getTime();

			if (!uniqueDates.has(timestamp)) {
				uniqueDates.add(timestamp);
				const specialDateTimestamp = CalendarDateComponent.fromLocalJSDate(dateFromValue).valueOf() / 1000;
				const type = date.type;
				const tooltip = date._tooltip;
				uniqueSpecialDates.push({ specialDateTimestamp, type, tooltip });
			}
		});

		return uniqueSpecialDates;
	}

	_onCalendarLegendSelectionChange(e: CustomEvent<CalendarLegendItemSelectionChangeEventDetail>) {
		const defaultTypes = ["Working", "NonWorking", "Selected", "Today"];
		this._selectedItemType = e.detail.item.type;

		if (defaultTypes.includes(this._selectedItemType)) {
			this._selectedItemType = "None"; // In order to avoid filtering of default types
		}
	}

	/**
	 * Makes sure that _currentPicker is always set to a value, allowed by _pickersMode
	 */
	_normalizeCurrentPicker() {
		if (this._currentPicker === "day" && this._pickersMode !== CalendarPickersMode.DAY_MONTH_YEAR) {
			this.switchToMonthPicker(true);
		}

		if (this._currentPicker === "month" && this._pickersMode === CalendarPickersMode.YEAR) {
			this.switchToYearPicker(true);
		}
	}

	onBeforeRendering() {
		this._normalizeCurrentPicker();

		if (!this._valueIsProcessed) {
			if (this._selectedDatesTimestamps.length) {
				this.timestamp = this._selectedDatesTimestamps[0];
			}

			this._valueIsProcessed = true;
		}
	}

	async onAfterRendering() {
		await renderFinished(); // Await for the current picker to render and then ask if it has previous/next pages
		this._previousButtonDisabled = !this._currentPickerDOM._hasPreviousPage();
		this._nextButtonDisabled = !this._currentPickerDOM._hasNextPage();

		const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this.primaryCalendarType });
		const localeData = getCachedLocaleDataInstance(getLocale());
		this._headerMonthButtonText = localeData.getMonthsStandAlone("wide", this.primaryCalendarType)[this._calendarDate.getMonth()];
		this._headerYearButtonText = String(yearFormat.format(this._localDate, true));

		const currentYearRange = this._currentYearRange;
		const { rangeStartText, rangeEndText } = this._formatYearRangeText(currentYearRange);
		this._headerYearRangeButtonText = `${rangeStartText} - ${rangeEndText}`;

		this._secondaryCalendarType && this._setSecondaryCalendarTypeButtonText();
	}

	onInvalidation(changeInfo: ChangeInfo) {
		if (changeInfo.reason === "childchange") {
			this._valueIsProcessed = false;
		}
	}

	/**
	 * The user clicked the "month" button in the header
	 */
	onHeaderMonthButtonPress() {
		this.switchToMonthPicker();
		this.fireDecoratorEvent("show-month-view");
	}

	async switchToDayPicker(suppressFocus = false) {
		this._currentPicker = "day";
		if (!suppressFocus) {
			await renderFinished();
			this._currentPickerDOM.focus();
		}
	}

	async switchToMonthPicker(suppressFocus = false) {
		this._currentPicker = "month";
		if (!suppressFocus) {
			await renderFinished();
			this._currentPickerDOM.focus();
		}
	}

	/**
	 * The user clicked the "year" button in the header
	 */
	onHeaderYearButtonPress() {
		this.switchToYearPicker();
		this.fireDecoratorEvent("show-year-view");
	}

	async switchToYearPicker(suppressFocus = false) {
		this._currentPicker = "year";
		if (!suppressFocus) {
			await renderFinished();
			this._currentPickerDOM.focus();
		}
	}

	/**
	 * The user clicked the "year range" button in the YearPicker header
	 */
	onHeaderYearRangeButtonPress() {
		this.switchToYearRangePicker();
		this.fireDecoratorEvent("show-year-range-view");
	}

	async switchToYearRangePicker(suppressFocus = false) {
		this._currentPicker = "yearrange";
		if (!suppressFocus) {
			await renderFinished();
			this._currentPickerDOM.focus();
		}
	}

	get _currentPickerDOM() {
		// Calendar's shadowRoot and all the pickers are always present - the "!" is safe to be used.
		return this.shadowRoot!.querySelector(`[ui5-${this._currentPicker}picker]`)! as unknown as ICalendarPicker;
	}

	/**
	 * Returns the focusable element inside the Calendar (the current picker)
	 * @override
	 */
	getFocusDomRef() {
		return this._currentPickerDOM as HTMLElement | undefined;
	}

	/**
	 * The year clicked the "Previous" button in the header
	 */
	onHeaderPreviousPress() {
		this._currentPickerDOM._showPreviousPage();
	}

	/**
	 * The year clicked the "Next" button in the header
	 */
	onHeaderNextPress() {
		this._currentPickerDOM._showNextPage();
	}

	_setSecondaryCalendarTypeButtonText() {
		const yearFormatSecType = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType });
		this._headerYearButtonTextSecType = String(yearFormatSecType.format(this._localDate, true));

		const currentYearRange = this._currentYearRange;
		const { rangeStart, rangeEnd } = this._createYearRangeDates(currentYearRange);

		const rangeStartSecType = transformDateToSecondaryType(this.primaryCalendarType, this._secondaryCalendarType, rangeStart.valueOf() / 1000, true)
			.firstDate;
		const rangeEndSecType = transformDateToSecondaryType(this.primaryCalendarType, this._secondaryCalendarType, rangeEnd.valueOf() / 1000, true)
			.lastDate;

		this._headerYearRangeButtonTextSecType = `${yearFormatSecType.format(rangeStartSecType.toLocalJSDate())} - ${yearFormatSecType.format(rangeEndSecType.toLocalJSDate())}`;
	}

	get secondaryCalendarTypeButtonText() {
		if (!this.hasSecondaryCalendarType) {
			return;
		}

		const localDate = UI5Date.getInstance(this._timestamp * 1000);
		const secondYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType });
		const dateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this._secondaryCalendarType, this._timestamp);
		const secondMonthInfo = convertMonthNumbersToMonthNames(dateInSecType.firstDate.getMonth(), dateInSecType.lastDate.getMonth(), this._secondaryCalendarType);
		const secondYearText = secondYearFormat.format(localDate);

		return {
			yearButtonText: secondYearText,
			monthButtonText: secondMonthInfo.text,
			monthButtonInfo: secondMonthInfo.textInfo,
		};
	}

	/**
	 * The month button is hidden when the month picker or year picker is shown
	 * @private
	 */
	get _isHeaderMonthButtonHidden(): boolean {
		return this._currentPicker !== "day";
	}

	/**
	 * The year range picker button is shown only in the year picker
	 * @private
	 */
	get _isHeaderYearRangeButtonHidden(): boolean {
		return this._currentPicker !== "year";
	}

	/**
	 * The year button is shown only in the day & month pickers
	 * @private
	 */
	get _isHeaderYearButtonHidden(): boolean {
		return !(this._currentPicker === "day" || this._currentPicker === "month");
	}

	get _isDayPickerHidden() {
		return this._currentPicker !== "day";
	}

	get _isMonthPickerHidden() {
		return this._currentPicker !== "month";
	}

	get _isYearPickerHidden() {
		return this._currentPicker !== "year";
	}

	get _isYearRangePickerHidden() {
		return this._currentPicker !== "yearrange";
	}

	get _currentYearRange(): CalendarYearRangeT {
		const rangeSize = this.hasSecondaryCalendarType ? 8 : 20;
		const yearsOffset = this.hasSecondaryCalendarType ? 2 : 9;
		const currentYear = this._calendarDate.getYear();

		// On first load, current year should be the 3rd or 10th year in the range (depending on the calendar type)
		if (!this._rangeStartYear) {
			this._rangeStartYear = currentYear - yearsOffset;
		}

		// If page navigation occured, update the current range start year
		this._rangeStartYear += Math.floor((currentYear - this._rangeStartYear) / rangeSize) * rangeSize;

		// Normalize range start year to be between the min and absolute max year
		const minYear = this._minDate.getYear();
		if (currentYear - rangeSize < minYear) {
			this._rangeStartYear = minYear;
		}

		const absoluteMaxYear = getMaxCalendarDate(this._primaryCalendarType).getYear();
		if (currentYear + rangeSize > absoluteMaxYear) {
			this._rangeStartYear = absoluteMaxYear - rangeSize + 1;
		}

		return {
			startYear: this._rangeStartYear,
			endYear: this._rangeStartYear + rangeSize - 1,
		};
	}

	_fireEventAndUpdateSelectedDates(selectedDates: Array<number>) {
		const datesValues = selectedDates.map(timestamp => {
			const calendarDate = CalendarDateComponent.fromTimestamp(timestamp * 1000, this._primaryCalendarType);
			return this.getFormat().format(calendarDate.toUTCJSDate(), true);
		});

		const defaultPrevented = !this.fireDecoratorEvent("selection-change", { timestamp: this.timestamp, selectedDates: [...selectedDates], selectedValues: datesValues });
		if (!defaultPrevented) {
			this._setSelectedDates(selectedDates);
		}
	}

	onSelectedDatesChange(e: CustomEvent<DayPickerChangeEventDetail>) {
		this.timestamp = e.detail.timestamp;
		this._fireEventAndUpdateSelectedDates(e.detail.dates);
	}

	onSelectedMonthChange(e: CustomEvent<MonthPickerChangeEventDetail>) {
		this.timestamp = e.detail.timestamp;

		if (this._pickersMode === CalendarPickersMode.DAY_MONTH_YEAR) {
			this.switchToDayPicker();
		} else {
			this._fireEventAndUpdateSelectedDates(e.detail.dates);
		}
	}

	onSelectedYearChange(e: CustomEvent<YearPickerChangeEventDetail>) {
		this.timestamp = e.detail.timestamp;

		if (this._pickersMode === CalendarPickersMode.DAY_MONTH_YEAR) {
			this.switchToDayPicker();
		} else if (this._pickersMode === CalendarPickersMode.MONTH_YEAR) {
			this.switchToMonthPicker();
		} else {
			this._fireEventAndUpdateSelectedDates(e.detail.dates);
		}
	}

	onSelectedYearRangeChange(e: CustomEvent<YearRangePickerChangeEventDetail>) {
		this.timestamp = e.detail.timestamp;
		this.switchToYearPicker();
	}

	async onNavigate(e: CustomEvent) {
		this.timestamp = e.detail.timestamp;
		await renderFinished();
		this._currentPickerDOM.focus();
	}

	_onkeydown(e: KeyboardEvent) {
		if (isF4(e) && this._currentPicker !== "month") {
			this.switchToMonthPicker();
			this.fireDecoratorEvent("show-month-view");
		}

		if (!isF4Shift(e)) {
			return;
		}

		if (this._currentPicker !== "year") {
			this.switchToYearPicker();
			this.fireDecoratorEvent("show-year-view");
		} else {
			this.switchToYearRangePicker();
			this.fireDecoratorEvent("show-year-range-view");
		}
	}

	_onLegendFocusOut() {
		this._selectedItemType = "None";
	}

	get _specialDates() {
		return this.getSlottedNodes<SpecialCalendarDate>("specialDates");
	}

	get classes() {
		return {
			prevButton: {
				"ui5-calheader-arrowbtn": true,
				"ui5-calheader-arrowbtn-disabled": this._previousButtonDisabled,
			},
			nextButton: {
				"ui5-calheader-arrowbtn": true,
				"ui5-calheader-arrowbtn-disabled": this._nextButtonDisabled,
			},
		};
	}

	get accInfo() {
		const currentYearRange = this._currentYearRange;
		const { rangeStartText, rangeEndText } = this._formatYearRangeText(currentYearRange);

		const headerMonthButtonText = this.hasSecondaryCalendarType
			? `${this._headerMonthButtonText}, ${this.secondMonthButtonText}` : `${this._headerMonthButtonText}`;

		// Get base labels
		const monthLabel = Calendar.i18nBundle?.getText(CALENDAR_HEADER_MONTH_BUTTON, headerMonthButtonText);
		const yearLabel = Calendar.i18nBundle?.getText(CALENDAR_HEADER_YEAR_BUTTON, this._headerYearButtonText as string);
		const yearRangeLabel = Calendar.i18nBundle?.getText(CALENDAR_HEADER_YEAR_RANGE_BUTTON, rangeStartText, rangeEndText);
		let nextBtnLabel = Calendar.i18nBundle?.getText(CALENDAR_HEADER_MONTH_NEXT_BUTTON_TITLE);
		let prevBtnLabel = Calendar.i18nBundle?.getText(CALENDAR_HEADER_MONTH_PREVIOUS_BUTTON_TITLE);

		if (this._currentPicker === "month") {
			nextBtnLabel = Calendar.i18nBundle?.getText(CALENDAR_HEADER_YEAR_NEXT_BUTTON_TITLE);
			prevBtnLabel = Calendar.i18nBundle?.getText(CALENDAR_HEADER_YEAR_PREVIOUS_BUTTON_TITLE);
		} else if (this._currentPicker === "year" || this._currentPicker === "yearrange") {
			nextBtnLabel = Calendar.i18nBundle?.getText(CALENDAR_HEADER_YEAR_RANGE_NEXT_BUTTON_TITLE);
			prevBtnLabel = Calendar.i18nBundle?.getText(CALENDAR_HEADER_YEAR_RANGE_PREVIOUS_BUTTON_TITLE);
		}

		// Get shortcuts
		const monthShortcut = Calendar.i18nBundle?.getText(CALENDAR_HEADER_MONTH_BUTTON_SHORTCUT);
		const yearShortcut = Calendar.i18nBundle?.getText(CALENDAR_HEADER_YEAR_BUTTON_SHORTCUT);
		const yearRangeShortcut = Calendar.i18nBundle?.getText(CALENDAR_HEADER_YEAR_RANGE_BUTTON_SHORTCUT);
		const nextBtnShortcut = Calendar.i18nBundle?.getText(CALENDAR_HEADER_MONTH_NEXT_BUTTON_SHORTCUT);
		const prevBtnShortcut = Calendar.i18nBundle?.getText(CALENDAR_HEADER_MONTH_PREVIOUS_BUTTON_SHORTCUT);

		return {
			ariaLabelMonthButton: monthLabel,
			ariaLabelYearButton: yearLabel,
			ariaLabelYearRangeButton: yearRangeLabel,
			ariaLabelNextButton: nextBtnLabel,
			ariaLabelPrevButton: prevBtnLabel,

			// Keyboard shortcuts for aria-keyshortcuts
			keyShortcutMonthButton: monthShortcut,
			keyShortcutYearButton: yearShortcut,
			keyShortcutYearRangeButton: yearRangeShortcut,
			keyShortcutNextButton: nextBtnShortcut,
			keyShortcutPrevButton: prevBtnShortcut,

			// Tooltips combining label and shortcut
			tooltipMonthButton: `${monthLabel} (${monthShortcut})`,
			tooltipYearButton: `${yearLabel} (${yearShortcut})`,
			tooltipYearRangeButton: `${yearRangeLabel} (${yearRangeShortcut})`,
			tooltipNextButton: `${nextBtnLabel} (${nextBtnShortcut})`,
			tooltipPrevButton: `${prevBtnLabel} (${prevBtnShortcut})`,
		};
	}

	/**
	 * Helper method to create CalendarDateComponent instances for year range
	 * @private
	 */
	_createYearRangeDates(yearRange: CalendarYearRangeT, calendarType: string = this._primaryCalendarType) {
		const rangeStart = new CalendarDateComponent(this._calendarDate, calendarType);
		const rangeEnd = new CalendarDateComponent(this._calendarDate, calendarType);

		rangeStart.setYear(yearRange.startYear);
		rangeEnd.setYear(yearRange.endYear);

		return { rangeStart, rangeEnd };
	}

	/**
	 * Helper method to format year range text
	 * @private
	 */
	_formatYearRangeText(yearRange: CalendarYearRangeT) {
		const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this.primaryCalendarType });
		const { rangeStart, rangeEnd } = this._createYearRangeDates(yearRange, this.primaryCalendarType);

		const rangeStartText = yearFormat.format(rangeStart.toLocalJSDate());
		const rangeEndText = yearFormat.format(rangeEnd.toLocalJSDate());

		return { rangeStartText, rangeEndText };
	}

	get secondMonthButtonText() {
		const secondMonthButtonText = this.secondaryCalendarTypeButtonText?.monthButtonText as string;

		return secondMonthButtonText;
	}

	onMonthButtonKeyDown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this.switchToMonthPicker();
			this.fireDecoratorEvent("show-month-view");
		}
	}

	onMonthButtonKeyUp(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this.switchToMonthPicker();
			this.fireDecoratorEvent("show-month-view");
		}
	}

	onYearButtonKeyDown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this.switchToYearPicker();
			this.fireDecoratorEvent("show-year-view");
		}
	}

	onYearButtonKeyUp(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.switchToYearPicker();
			this.fireDecoratorEvent("show-year-view");
		}
	}

	onYearRangeButtonKeyDown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this.switchToYearRangePicker();
			this.fireDecoratorEvent("show-year-range-view");
		}
	}

	onYearRangeButtonKeyUp(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.switchToYearRangePicker();
			this.fireDecoratorEvent("show-year-range-view");
		}
	}

	_handleNavigationButtonKeyDown(e: MouseEvent, isDisabled: boolean, action: () => void) {
		if (isDisabled) {
			e.preventDefault();
			return;
		}

		if (e.button !== 0) {
			return;
		}

		action();
		e.preventDefault();
	}

	onPrevButtonClick(e: MouseEvent) {
		this._handleNavigationButtonKeyDown(e, this._previousButtonDisabled, () => this.onHeaderPreviousPress());
	}

	onNextButtonClick(e: MouseEvent) {
		this._handleNavigationButtonKeyDown(e, this._nextButtonDisabled, () => this.onHeaderNextPress());
	}

	/**
	 * Returns an array of UTC timestamps, representing the selected dates.
	 * @protected
	 * @deprecated
	 */
	get selectedDates(): Array<number> {
		return this._selectedDatesTimestamps;
	}

	/**
	 * Creates instances of `ui5-date` or `ui5-date-range` inside this `ui5-calendar` with values, equal to the provided UTC timestamps
	 * @protected
	 * @deprecated
	 * @param selectedDates Array of UTC timestamps
	 */
	set selectedDates(selectedDates: Array<number>) {
		this._setSelectedDates(selectedDates);
	}
}

Calendar.define();

export default Calendar;
export type {
	ICalendarPicker,
	CalendarYearRangeT,
	ICalendarSelectedDates,
	CalendarSelectionChangeEventDetail,
	SpecialCalendarDateT,
	DisabledDateRangeT,
};
