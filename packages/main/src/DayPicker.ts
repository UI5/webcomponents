import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import type LocaleData from "@ui5/webcomponents-localization/dist/LocaleData.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	isSpace,
	isSpaceShift,
	isEnter,
	isEnterShift,
	isUp,
	isDown,
	isLeft,
	isRight,
	isHome,
	isEnd,
	isHomeCtrl,
	isEndCtrl,
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageUpAlt,
	isPageUpShiftCtrl,
	isPageDownShift,
	isPageDownAlt,
	isPageDownShiftCtrl,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import CalendarUtils from "@ui5/webcomponents-localization/dist/CalendarUtils.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import CalendarPart from "./CalendarPart.js";
import type {
	ICalendarPicker,
	SpecialCalendarDateT,
} from "./Calendar.js";

import {
	DAY_PICKER_WEEK_NUMBER_TEXT,
	DAY_PICKER_NON_WORKING_DAY,
	DAY_PICKER_TODAY,
	LIST_ITEM_SELECTED,
	DAY_PICKER_SELECTED_RANGE_START,
	DAY_PICKER_SELECTED_RANGE_END,
	DAY_PICKER_SELECTED_RANGE_BETWEEN,
} from "./generated/i18n/i18n-defaults.js";

// Template
import DayPickerTemplate from "./DayPickerTemplate.js";

// Styles
import dayPickerCSS from "./generated/themes/DayPicker.css.js";

const isBetween = (x: number, num1: number, num2: number) => x > Math.min(num1, num2) && x < Math.max(num1, num2);
const DAYS_IN_WEEK = 7;

type DayName = {
	name: string,
	classes: string,
	ultraShortName?: string,
}

type Day = {
	timestamp: string,
	day: number,
	focusRef: boolean,
	_tabIndex: number,
	selected: boolean,
	_isSecondaryCalendarType: boolean,
	classes: string,
	tooltip?: string,
	ariaLabel: string,
	ariaSelected: boolean,
	ariaDisabled: boolean | undefined,
	disabled: boolean,
	secondDay?: number,
	weekNum?: number,
	isHidden?: boolean,
	type?: string,
	parts: string,
}

type WeekNumber = {
	weekNum: number,
	isHidden: boolean,
}

type Week = Array<Day | WeekNumber>;

type DayPickerChangeEventDetail = {
	dates: Array<number>,
	timestamp?: number,
}

type DayPickerNavigateEventDetail = {
	timestamp: number,
}

/**
 * @class
 *
 * Represents the days inside a single month view of the `ui5-calendar` component.
 * @constructor
 * @extends CalendarPart
 * @private
 */
@customElement({
	tag: "ui5-daypicker",
	styles: dayPickerCSS,
	template: DayPickerTemplate,
})
/**
 * Fired when the selected date(s) change
 */
@event("change", {
	bubbles: true,
})
/**
 * Fired when the timestamp changes (user navigates with the keyboard) or clicks with the mouse
 */
@event("navigate", {
	bubbles: true,
})
class DayPicker extends CalendarPart implements ICalendarPicker {
	eventDetails!: CalendarPart["eventDetails"] & {
		"change": DayPickerChangeEventDetail,
		"navigate": DayPickerNavigateEventDetail,
	};

	/**
	 * An array of UTC timestamps representing the selected date or dates depending on the capabilities of the picker component.
	 * @default []
	 */
	@property({ type: Array })
	selectedDates: Array<number> = [];

	/**
	 * Defines the type of selection used in the day picker component.
	 * Accepted property values are:
	 *
	 * - `CalendarSelectionMode.Single` - enables a single date selection.(default value)
	 * - `CalendarSelectionMode.Range` - enables selection of a date range.
	 * - `CalendarSelectionMode.Multiple` - enables selection of multiple dates.
	 * @default "Single"
	 */
	@property()
	selectionMode: `${CalendarSelectionMode}` = "Single";

	/**
	 * Defines the visibility of the week numbers column.
	 *
	 * **Note:** For calendars other than Gregorian,
	 * the week numbers are not displayed regardless of what is set.
	 * @default false
	 * @since 1.0.0-rc.8
	 */
	@property({ type: Boolean })
	hideWeekNumbers = false;

	/**
	 * @private
	 */
	@property({ type: Array })
	_weeks: Array<Week> = [];

	@property({ type: Array })
	_dayNames: Array<DayName> = [];

	/**
	 * When set, the component will skip all work in onBeforeRendering and will not automatically set the focus on itself
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_hidden = false;

	/**
	 * When selectionMode="Range" and the first day in the range is selected, this is the currently hovered (when using mouse) or focused (when using keyboard) day by the user
	 * @private
	 */
	 @property({ type: Number })
	_secondTimestamp?: number;

	/**
	 * Array of special calendar dates (if such are passed) from the calendar.
	 * @private
	 */
	@property({ type: Array })
	specialCalendarDates: Array<SpecialCalendarDateT> = [];

	@query("[data-sap-focus-ref]")
	_focusableDay!: HTMLElement;

	_autoFocus?: boolean;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onBeforeRendering() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		this._buildWeeks(localeData);
		this._buildDayNames(localeData);
	}

	/**
	 * Builds the "_weeks" object that represents the month.
	 * @param localeData
	 * @private
	 */
	_buildWeeks(localeData: LocaleData) {
		if (this._hidden) {
			return; // Optimization to not do any work unless the current picker
		}

		this._weeks = [];

		const firstDayOfWeek = this._getFirstDayOfWeek();
		const specialCalendarDates = this._specialCalendarDates;
		const monthsNames = localeData.getMonths("wide", this._primaryCalendarType) as Array<string>;
		const secondaryMonthsNames = this.hasSecondaryCalendarType ? localeData.getMonths("wide", this.secondaryCalendarType) as Array<string> : [];
		const nonWorkingDayLabel = DayPicker.i18nBundle.getText(DAY_PICKER_NON_WORKING_DAY);
		const todayLabel = DayPicker.i18nBundle.getText(DAY_PICKER_TODAY);
		const tempDate = this._getFirstDay(); // date that will be changed by 1 day 42 times
		const todayDate = CalendarDate.fromLocalJSDate(UI5Date.getInstance(), this._primaryCalendarType); // current day date - calculate once
		const calendarDate = this._calendarDate; // store the _calendarDate value as this getter is expensive and degrades IE11 perf
		const minDate = this._minDate; // store the _minDate (expensive getter)
		const maxDate = this._maxDate; // store the _maxDate (expensive getter)

		const tempSecondDate = this.hasSecondaryCalendarType ? this._getSecondaryDay(tempDate) : undefined;

		let week: Week = [];
		for (let i = 0; i < DAYS_IN_WEEK * 6; i++) { // always show 6 weeks total, 42 days to avoid jumping
			const timestamp = tempDate.valueOf() / 1000; // no need to round because CalendarDate does it

			let dayOfTheWeek = tempDate.getDay() - firstDayOfWeek;
			if (dayOfTheWeek < 0) {
				dayOfTheWeek += DAYS_IN_WEEK;
			}

			const specialCalendarDate = specialCalendarDates.find(specialDate => specialDate.specialDateTimestamp === timestamp);
			const specialDayType = specialCalendarDate ? specialCalendarDate.type : "";
			const specialDayTooltip = specialCalendarDate ? specialCalendarDate.tooltip : "";
			const unnamedCalendarTypeLabel = specialDayTooltip && !this._isDefaultCalendarLegendType(specialDayType) ? specialDayTooltip : "";

			const isFocused = tempDate.getMonth() === calendarDate.getMonth() && tempDate.getDate() === calendarDate.getDate();
			const isSelected = this._isDaySelected(timestamp);
			const isSelectedBetween = this._isDayInsideSelectionRange(timestamp);
			const isOtherMonth = tempDate.getMonth() !== calendarDate.getMonth();
			const isWeekend = this._isWeekend(tempDate);
			const isDisabled = tempDate.valueOf() < minDate.valueOf() || tempDate.valueOf() > maxDate.valueOf();
			const isToday = tempDate.isSame(todayDate);
			const isFirstDayOfWeek = tempDate.getDay() === firstDayOfWeek;

			const nonWorkingAriaLabel = (isWeekend || specialDayType === "NonWorking") && specialDayType !== "Working"
				? `${nonWorkingDayLabel} `
				: "";
			const todayAriaLabel = isToday ? `${todayLabel} ` : "";

			const tempSecondDateNumber = tempSecondDate ? tempSecondDate.getDate() : "";
			const tempSecondYearNumber = tempSecondDate ? tempSecondDate.getYear() : "";
			const secondaryMonthsNamesString = secondaryMonthsNames.length > 0 ? secondaryMonthsNames[tempSecondDate!.getMonth()] : "";

			const tooltip = `${todayAriaLabel}${nonWorkingAriaLabel}${unnamedCalendarTypeLabel}`.trim();

			let ariaLabel = this.hasSecondaryCalendarType
				? `${monthsNames[tempDate.getMonth()]} ${tempDate.getDate()}, ${tempDate.getYear()}; ${secondaryMonthsNamesString} ${tempSecondDateNumber}, ${tempSecondYearNumber} ${tooltip}`.trim()
				: `${monthsNames[tempDate.getMonth()]} ${tempDate.getDate()}, ${tempDate.getYear()} ${tooltip}`.trim();

			if (this.selectionMode === CalendarSelectionMode.Range) {
				if (isSelected && this._isRangeEndDate(timestamp)) {
					ariaLabel = DayPicker.i18nBundle.getText(DAY_PICKER_SELECTED_RANGE_END, ariaLabel);
				} else if (isSelected && this._isRangeStartDate(timestamp)) {
					ariaLabel = DayPicker.i18nBundle.getText(DAY_PICKER_SELECTED_RANGE_START, ariaLabel);
				} else if (isSelectedBetween) {
					ariaLabel = DayPicker.i18nBundle.getText(DAY_PICKER_SELECTED_RANGE_BETWEEN, ariaLabel);
				}
			}

			const day: Day = {
				timestamp: timestamp.toString(),
				focusRef: isFocused,
				_tabIndex: isFocused ? 0 : -1,
				selected: isSelected || isSelectedBetween,
				day: tempDate.getDate(),
				secondDay: this.hasSecondaryCalendarType ? (tempSecondDate as CalendarDate).getDate() : undefined,
				_isSecondaryCalendarType: this.hasSecondaryCalendarType,
				classes: `ui5-dp-item ui5-dp-wday${dayOfTheWeek}`,
				tooltip,
				ariaLabel,
				ariaSelected: isSelected || isSelectedBetween,
				ariaDisabled: isDisabled || isOtherMonth,
				disabled: isDisabled,
				type: specialDayType,
				parts: "day-cell",
			};

			if (isFirstDayOfWeek) {
				day.classes += " ui5-dp-firstday";
			}

			if (isSelected) {
				day.classes += " ui5-dp-item--selected";
				day.parts += " day-cell-selected";
			}

			if (isSelectedBetween) {
				day.classes += " ui5-dp-item--selected-between";
				day.parts += " day-cell-selected-between";
			}

			if (isToday) {
				day.classes += " ui5-dp-item--now";
			}

			if (isOtherMonth) {
				day.classes += " ui5-dp-item--othermonth";
			}

			if ((isWeekend || specialDayType === "NonWorking") && specialDayType !== "Working") {
				day.classes += " ui5-dp-item--weekend";
			}

			if (isDisabled) {
				day.classes += " ui5-dp-item--disabled";
			}

			if (this.hasSecondaryCalendarType) {
				day.classes += " ui5-dp-item--withsecondtype";
			}

			week.push(day);

			if (dayOfTheWeek === DAYS_IN_WEEK - 1) { // 0-indexed so 6 is the last day of the week
				const weekNumber = this._calculateWeekNumber(tempDate.toLocalJSDate());

				week.unshift({
					weekNum: weekNumber,
					isHidden: this.shouldHideWeekNumbers,
				});
			}

			if (week.length === DAYS_IN_WEEK + 1) { // 7 entries for each day + 1 for the week numbers
				this._weeks.push(week);
				week = [];
			}

			tempDate.setDate(tempDate.getDate() + 1);
			if (this.hasSecondaryCalendarType && tempSecondDate) {
				tempSecondDate.setDate(tempSecondDate.getDate() + 1);
			}
		}
	}

	_calculateWeekNumber(date: Date): number {
		const oDateFormat = DateFormat.getDateInstance({ pattern: "w", calendarType: this.primaryCalendarType, calendarWeekNumbering: this.calendarWeekNumbering });
		const weekNumber = oDateFormat.format(date);

		return Number(weekNumber);
	}

	/**
	 * Builds the dayNames object (header of the month).
	 * @param localeData
	 * @private
	 */
	_buildDayNames(localeData: LocaleData) {
		if (this._hidden) {
			return; // Optimization to not do any work unless the current picker
		}

		let dayOfTheWeek;

		const aDayNamesWide = localeData.getDays("wide", this._primaryCalendarType) as Array<string>;
		let aDayNamesAbbreviated = localeData.getDays("abbreviated", this._primaryCalendarType) as Array<string>;
		let dayName;

		if (this.namesTooLong(aDayNamesAbbreviated)) {
			aDayNamesAbbreviated = localeData.getDays("narrow", this._primaryCalendarType) as Array<string>;
		}

		this._dayNames = [];
		this._dayNames.push({
			classes: "ui5-dp-dayname",
			name: DayPicker.i18nBundle.getText(DAY_PICKER_WEEK_NUMBER_TEXT),
		});
		for (let i = 0; i < DAYS_IN_WEEK; i++) {
			dayOfTheWeek = i + this._getFirstDayOfWeek();
			if (dayOfTheWeek > DAYS_IN_WEEK - 1) { // 0-indexed so index of 6 is the maximum allowed
				dayOfTheWeek -= DAYS_IN_WEEK;
			}
			dayName = {
				name: aDayNamesWide[dayOfTheWeek],
				ultraShortName: aDayNamesAbbreviated[dayOfTheWeek],
				classes: "ui5-dp-dayname",
			};
			this._dayNames.push(dayName);
		}
		this._dayNames[1].classes += " ui5-dp-firstday";
		if (this.shouldHideWeekNumbers) {
			this._dayNames.shift();
		}
	}

	/**
	 * Tells if any of the days is more than 4 characters(too long to render).
	 * @param dayNames
	 * @private
	 */
	namesTooLong(dayNames: Array<string>): boolean {
		return dayNames.some(dayName => dayName.length > 4);
	}

	onAfterRendering() {
		if (this._autoFocus && !this._hidden) {
			this.focus();
		}
	}

	_focusCorrectDay() {
		if (this._shouldFocusDay) {
			this._focusableDay.focus();
		}
	}

	get _shouldFocusDay() {
		return document.activeElement !== this._focusableDay && this._specialCalendarDates.length === 0;
	}

	_onfocusin() {
		this._autoFocus = true;
		this._focusCorrectDay();
	}

	_onfocusout() {
		this._autoFocus = false;
	}

	/**
	 * Tells if the day is selected (dark blue).
	 * @param timestamp
	 * @private
	 */
	_isDaySelected(timestamp: number): boolean {
		if (this.selectionMode === CalendarSelectionMode.Single) {
			return timestamp === this.selectedDates[0];
		}

		if (this.selectionMode === CalendarSelectionMode.Multiple) {
			return this.selectedDates.includes(timestamp);
		}

		return timestamp === this.selectedDates[0] || timestamp === this.selectedDates[this.selectedDates.length - 1];
	}

	_isRangeEndDate(timestamp: number): boolean {
		return this.selectionMode === CalendarSelectionMode.Range && timestamp === this.selectedDates[1];
	}

	_isRangeStartDate(timestamp: number): boolean {
		return this.selectionMode === CalendarSelectionMode.Range && timestamp === this.selectedDates[0];
	}

	/**
	 * Tells if the day is inside a selection range (light blue).
	 * @param timestamp
	 * @private
	 */
	_isDayInsideSelectionRange(timestamp: number): boolean {
		// No selection at all (or not in range selection mode)
		if (this.selectionMode !== CalendarSelectionMode.Range || !this.selectedDates.length) {
			return false;
		}

		// Only one date selected - the user is hovering with the mouse or navigating with the keyboard to select the second one
		if (this.selectedDates.length === 1 && this._secondTimestamp) {
			return isBetween(timestamp, this.selectedDates[0], this._secondTimestamp);
		}

		// Two dates selected - stable range
		return isBetween(timestamp, this.selectedDates[0], this.selectedDates[this.selectedDates.length - 1]);
	}

	/**
	 * Selects/deselects a day.
	 * @param e
	 * @param isShift true if the user did Click+Shift or Enter+Shift (but not Space+Shift)
	 * @private
	 */
	_selectDate(e: Event, isShift: boolean) {
		let target = e.target as HTMLElement;

		if (!target.hasAttribute("data-sap-timestamp")) {
			target = target.parentNode as HTMLElement;
		}

		if (!this._isDayPressed(target)) {
			return;
		}

		const timestamp = this._getTimestampFromDom(target);

		this._safelySetTimestamp(timestamp);
		this._updateSecondTimestamp();
		this._updateSelectedDates(timestamp, isShift);

		this.fireDecoratorEvent("change", {
			timestamp: this.timestamp,
			dates: this.selectedDates,
		});
	}

	_updateSelectedDates(timestamp: number, isShift: boolean) {
		if (this.selectionMode === CalendarSelectionMode.Multiple) {
			if (this.selectedDates.length > 0 && isShift) {
				this._multipleSelection(timestamp);
			} else {
				this._toggleTimestampInSelection(timestamp);
			}
			return;
		}

		announce(DayPicker.i18nBundle.getText(LIST_ITEM_SELECTED), InvisibleMessageMode.Assertive);
		if (this.selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
			this.selectedDates = [this.selectedDates[0], timestamp];
			return;
		}

		this.selectedDates = [timestamp];
	}

	/**
	 * Selects/deselects the whole row (week).
	 * @private
	 */
	_selectWeek() {
		this._weeks.forEach((week: Week) => {
			const _week = week as Array<Day>;
			const dayInThisWeek = _week.findIndex((item: Day) => {
				const date = CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000);
				return date.getMonth() === this._calendarDate.getMonth() && date.getDate() === this._calendarDate.getDate();
			}) !== -1;
			if (dayInThisWeek) { // The current day is in this week
				const notAllDaysOfThisWeekSelected = _week.some(item => item.timestamp && !this.selectedDates.includes(parseInt(item.timestamp)));
				if (notAllDaysOfThisWeekSelected) { // even if one day is not selected, select the whole week
					_week.filter(item => item.timestamp).forEach(item => {
						this._addTimestampToSelection(parseInt(item.timestamp));
					});
				} else { // only if all days of this week are selected, deselect them
					_week.filter(item => item.timestamp).forEach(item => {
						this._removeTimestampFromSelection(parseInt(item.timestamp));
					});
				}
			}
		});

		this.fireDecoratorEvent("change", {
			timestamp: this.timestamp,
			dates: this.selectedDates,
		});
	}

	_toggleTimestampInSelection(timestamp: number) {
		if (this.selectedDates.includes(timestamp)) {
			this._removeTimestampFromSelection(timestamp);
		} else {
			this._addTimestampToSelection(timestamp);
			announce(DayPicker.i18nBundle.getText(LIST_ITEM_SELECTED), InvisibleMessageMode.Assertive);
		}
	}

	_addTimestampToSelection(timestamp: number) {
		if (!this.selectedDates.includes(timestamp)) {
			this.selectedDates = [...this.selectedDates, timestamp];
		}
	}

	_removeTimestampFromSelection(timestamp: number) {
		this.selectedDates = this.selectedDates.filter(value => value !== timestamp);
	}

	/**
	 * Called when at least one day is selected and the user presses "Shift".
	 * @param timestamp
	 * @private
	 */
	_multipleSelection(timestamp: number) {
		const min = Math.min(...this.selectedDates);
		const max = Math.max(...this.selectedDates);
		let start;
		let end;
		let toggle = false;

		if (timestamp < min) {
			start = timestamp;
			end = min;
		} else if (timestamp >= min && timestamp <= max) { // inside the current range - toggle all between the selected and focused
			const distanceToMin = Math.abs(timestamp - min);
			const distanceToMax = Math.abs(timestamp - max);

			if (distanceToMin < distanceToMax) {
				start = timestamp;
				end = max;
			} else {
				start = min;
				end = timestamp;
			}
			toggle = true;
		} else {
			start = max;
			end = timestamp;
		}

		const startDate = CalendarDate.fromTimestamp(start * 1000);
		const endDate = CalendarDate.fromTimestamp(end * 1000);

		while (startDate.valueOf() <= endDate.valueOf()) {
			this[toggle ? "_toggleTimestampInSelection" : "_addTimestampToSelection"](startDate.valueOf() / 1000);
			startDate.setDate(startDate.getDate() + 1);
		}
	}

	/**
	 * Set the hovered day as the "_secondTimestamp".
	 * @param e
	 * @private
	 */
	_onmouseover(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const hoveredItem = target.closest(".ui5-dp-item") as HTMLElement;
		if (hoveredItem && this.selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
			this._secondTimestamp = this._getTimestampFromDom(hoveredItem);
		}
	}

	_onkeydown(e: KeyboardEvent) {
		let preventDefault = true;

		if (isEnter(e) || isEnterShift(e)) {
			this._selectDate(e, isEnterShift(e));
		} else if (isSpace(e) || isSpaceShift(e)) {
			e.preventDefault();
		} else if (isLeft(e)) {
			this._modifyTimestampBy(-1, "day", false);
		} else if (isRight(e)) {
			this._modifyTimestampBy(1, "day", false);
		} else if (isUp(e)) {
			this._modifyTimestampBy(-7, "day", false);
		} else if (isDown(e)) {
			this._modifyTimestampBy(7, "day", false);
		} else if (isPageUp(e)) {
			this._modifyTimestampBy(-1, "month");
		} else if (isPageDown(e)) {
			this._modifyTimestampBy(1, "month");
		} else if (isPageUpShift(e) || isPageUpAlt(e)) {
			this._modifyTimestampBy(-1, "year");
		} else if (isPageDownShift(e) || isPageDownAlt(e)) {
			this._modifyTimestampBy(1, "year");
		} else if (isPageUpShiftCtrl(e)) {
			this._modifyTimestampBy(-10, "year");
		} else if (isPageDownShiftCtrl(e)) {
			this._modifyTimestampBy(10, "year");
		} else if (isHome(e) || isEnd(e)) {
			this._onHomeOrEnd(isHome(e));
		} else if (isHomeCtrl(e)) {
			const tempDate = new CalendarDate(this._calendarDate, this._primaryCalendarType);
			tempDate.setDate(1); // Set the first day of the month
			this._setTimestamp(tempDate.valueOf() / 1000);
		} else if (isEndCtrl(e)) {
			const tempDate = new CalendarDate(this._calendarDate, this._primaryCalendarType);
			tempDate.setMonth(tempDate.getMonth() + 1);
			tempDate.setDate(0); // Set the last day of the month (0th day of next month)
			this._setTimestamp(tempDate.valueOf() / 1000);
		} else {
			preventDefault = false;
		}

		if (preventDefault) {
			e.preventDefault();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		// Even if Space+Shift was pressed, ignore the shift unless in Multiple selection
		if (isSpace(e) || (isSpaceShift(e) && this.selectionMode !== CalendarSelectionMode.Multiple)) {
			this._selectDate(e, false);
		} else if (isSpaceShift(e)) {
			this._selectWeek();
		}
	}

	/**
	 * Click is the same as "Enter".
	 * **Note:** "Click+Shift" has the same effect as "Enter+Shift".
	 * @param e
	 * @private
	 */
	_onclick(e: MouseEvent) {
		this._selectDate(e, e.shiftKey);
	}

	/**
	 * Called upon "Home" or "End" - moves the focus to the first or last item in the row.
	 * @param homePressed
	 * @private
	 */
	_onHomeOrEnd(homePressed: boolean) {
		this._weeks.forEach(week => {
			const _week = week as Array<Day>;
			const dayInThisWeek = _week.findIndex(item => {
				const date = CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000);
				return date.getMonth() === this._calendarDate.getMonth() && date.getDate() === this._calendarDate.getDate();
			}) !== -1;
			if (dayInThisWeek) { // The current day is in this week
				const index = homePressed ? 1 : 7; // select the first (if Home) or last (if End) day of the week
				this._setTimestamp(parseInt(_week[index].timestamp));
			}
		});
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_hasPreviousPage(): boolean {
		return !(this._calendarDate.getMonth() === this._minDate.getMonth() && this._calendarDate.getYear() === this._minDate.getYear());
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_hasNextPage(): boolean {
		return !(this._calendarDate.getMonth() === this._maxDate.getMonth() && this._calendarDate.getYear() === this._maxDate.getYear());
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_showPreviousPage() {
		this._modifyTimestampBy(-1, "month", false);
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_showNextPage() {
		this._modifyTimestampBy(1, "month", false);
	}

	/**
	 * Modifies the timestamp by a certain amount of days/months/years.
	 * @param amount
	 * @param unit
	 * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
	 * @private
	 */
	_modifyTimestampBy(amount: number, unit: string, preserveDate?: boolean) {
		// Modify the current timestamp
		this._safelyModifyTimestampBy(amount, unit, preserveDate);
		this._updateSecondTimestamp();

		// Notify the calendar to update its timestamp
		this.fireDecoratorEvent("navigate", { timestamp: this.timestamp! });
	}

	/**
	 * Sets the timestamp to an absolute value.
	 * @param value
	 * @private
	 */
	_setTimestamp(value: number) {
		this._safelySetTimestamp(value);
		this._updateSecondTimestamp();
		this.fireDecoratorEvent("navigate", { timestamp: this.timestamp! });
	}

	/**
	 * During range selection, when the user is navigating with the keyboard,
	 * the currently focused day is considered the "second day".
	 * @private
	 */
	_updateSecondTimestamp() {
		if (this.selectionMode === CalendarSelectionMode.Range && (this.selectedDates.length === 1 || this.selectedDates.length === 2)) {
			this._secondTimestamp = this.timestamp;
		}
	}

	get _specialCalendarDates() {
		return this.specialCalendarDates;
	}

	get shouldHideWeekNumbers() {
		if (this._primaryCalendarType !== CalendarType.Gregorian) {
			return true;
		}

		return this.hideWeekNumbers;
	}

	_isWeekend(oDate: CalendarDate): boolean {
		const localeData = getCachedLocaleDataInstance(getLocale());

		const iWeekDay = oDate.getDay(),
			iWeekendStart = localeData.getWeekendStart(),
			iWeekendEnd = localeData.getWeekendEnd();

		return (iWeekDay >= iWeekendStart && iWeekDay <= iWeekendEnd)
			|| (iWeekendEnd < iWeekendStart && (iWeekDay >= iWeekendStart || iWeekDay <= iWeekendEnd));
	}

	_isDayPressed(target: HTMLElement): boolean {
		const targetParent = target.parentNode as HTMLElement;
		return (target.className.indexOf("ui5-dp-item") > -1) || (targetParent && targetParent.classList && targetParent.classList.contains("ui5-dp-item"));
	}

	_isDefaultCalendarLegendType(type: string): boolean {
		return ["NonWorking", "Working", "Today", "Selected", "None"].includes(type);
	}

	_getSecondaryDay(tempDate: CalendarDate): CalendarDate {
		return new CalendarDate(tempDate, this.secondaryCalendarType);
	}

	_getFirstDay(): CalendarDate {
		let daysFromPreviousMonth;

		const firstDayOfWeek = this._getFirstDayOfWeek();

		// determine weekday of first day in month
		const firstDay = new CalendarDate(this._calendarDate, this._primaryCalendarType);
		firstDay.setDate(1);

		daysFromPreviousMonth = firstDay.getDay() - firstDayOfWeek;

		if (daysFromPreviousMonth < 0) {
			daysFromPreviousMonth = 7 + daysFromPreviousMonth;
		}

		if (daysFromPreviousMonth > 0) {
			firstDay.setDate(1 - daysFromPreviousMonth);
		}

		return firstDay;
	}

	_getFirstDayOfWeek(): number {
		const localeData = getCachedLocaleDataInstance(getLocale());
		let firstDayOfWeek;
		const configurationFirstDayOfWeek = getFirstDayOfWeek();

		if (configurationFirstDayOfWeek !== undefined) {
			firstDayOfWeek = configurationFirstDayOfWeek;
		} else {
			firstDayOfWeek = localeData.getFirstDayOfWeek();
		}

		const result = CalendarUtils.getWeekConfigurationValues(this.calendarWeekNumbering);

		if (result?.firstDayOfWeek !== undefined && this.calendarWeekNumbering !== "Default") {
			return result.firstDayOfWeek;
		}

		return firstDayOfWeek;
	}

	get styles() {
		return {
			wrapper: {
				display: this._hidden ? "none" : "flex",
				"justify-content": "center",
			},
			main: {
				width: "100%",
			},
		};
	}

	get ariaRoledescription() {
		return this.hasSecondaryCalendarType
			? `${this._primaryCalendarType} calendar with secondary ${this.secondaryCalendarType as string} calendar`
			: `${this._primaryCalendarType} calendar`;
	}
}

DayPicker.define();

export default DayPicker;
export type {
	DayPickerNavigateEventDetail,
	DayPickerChangeEventDetail,
};
