import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import {
	isEnter,
	isSpace,
	isDown,
	isUp,
	isLeft,
	isRight,
	isHome,
	isEnd,
	isHomeCtrl,
	isEndCtrl,
	isPageUp,
	isPageDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarPart from "./CalendarPart.js";
import type { CalendarYearRangeT, ICalendarPicker } from "./Calendar.js";
import {
	YEAR_PICKER_DESCRIPTION,
	CALENDAR_HEADER_YEAR_RANGE_NEXT_BUTTON_TITLE,
	CALENDAR_HEADER_YEAR_RANGE_PREVIOUS_BUTTON_TITLE,
	CALENDAR_HEADER_YEAR_RANGE_BUTTON,
	CALENDAR_HEADER_YEAR_RANGE_BUTTON_SHORTCUT,
	CALENDAR_HEADER_MONTH_NEXT_BUTTON_SHORTCUT,
	CALENDAR_HEADER_MONTH_PREVIOUS_BUTTON_SHORTCUT,
} from "./generated/i18n/i18n-defaults.js";
import type { CalendarHeaderHost } from "./CalendarHeaderTemplate.js";

// Template
import YearPickerTemplate from "./YearPickerTemplate.js";

// Styles
import yearPickerStyles from "./generated/themes/YearPicker.css.js";
import calendarHeaderStyles from "./generated/themes/CalendarHeader.css.js";
import calendarStyles from "./generated/themes/Calendar.css.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";

const isBetween = (x: number, num1: number, num2: number) => x > Math.min(num1, num2) && x < Math.max(num1, num2);

type Year = {
	timestamp: string;
	_tabIndex: number;
	focusRef: boolean;
	selected: boolean;
	ariaSelected: boolean;
	year: string;
	yearInSecType: string | undefined;
	disabled: boolean;
	ariaDisabled: boolean | undefined;
	classes: string;
	parts: string;
}

type YearInterval = Array<Array<Year>>;

type YearPickerChangeEventDetail = {
	dates: Array<number>,
	timestamp: number,
}

type YearPickerNavigateEventDetail = {
	timestamp: number,
}

/**
 * @class
 *
 * Displays years which can be selected.
 * @constructor
 * @extends CalendarPart
 * @private
 */
@customElement({
	tag: "ui5-yearpicker",
	styles: [yearPickerStyles, calendarHeaderStyles, calendarStyles],
	template: YearPickerTemplate,
})
/**
 * Fired when the user selects a year via "Space", "Enter" or click.
 */
@event("change", {
	bubbles: true,
})
/**
 * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
 * @since 1.0.0-rc.9
 */
@event("navigate", {
	bubbles: true,
})
class YearPicker extends CalendarPart implements ICalendarPicker, CalendarHeaderHost {
	eventDetails!: CalendarPart["eventDetails"] & {
		"change": YearPickerChangeEventDetail,
		"navigate": YearPickerNavigateEventDetail,
	}

	/**
	 * An array of UTC timestamps representing the selected date
	 * or dates depending on the capabilities of the picker component.
	 * @default []
	 */
	@property({ type: Array, noAttribute: true })
	selectedDates: Array<number> = [];

	/**
	 * Defines the type of selection used in the year picker component.
	 * Accepted property values are:
	 *
	 * - `CalendarSelectionMode.Single` - enables election of a single year.
	 * - `CalendarSelectionMode.Range` - enables selection of a year range.
	 *
	 * Note that 'CalendarSelectionMode.Multiple` is not supported for Year Picker!
	 * @default "Single"
	 * @since 2.2.0
	 */
	@property()
	selectionMode: `${CalendarSelectionMode}` = "Single";

	@property({ type: Array, noAttribute: true })
	_yearsInterval: YearInterval = [];

	@property({ type: Boolean, noAttribute: true })
	_hidden = false;

	/**
	 * When selectionMode="Range" and the first year in the range is selected, this is the currently hovered or focused year.
	 *
	 * @private
	 */
	@property({ type: Number })
	_secondTimestamp?: number;

	@property({ noAttribute: true })
	_currentYearRange?: CalendarYearRangeT;

	/**
	 * When true, YearPicker renders its own navigation header (for standalone use outside Calendar).
	 */
	@property({ type: Boolean, noAttribute: true })
	_showHeader = false;

	_firstYear?: number;

	/**
	 * Override the number of years per row. 0 means auto (default: 4, or 2 with secondary calendar).
	 * @private
	 */
	@property({ type: Number, noAttribute: true })
	_rowSize = 0;

	/**
	 * Override the total number of years shown per page. 0 means auto (default: 20, or 8 with secondary calendar).
	 * @private
	 */
	@property({ type: Number, noAttribute: true })
	_pageSize = 0;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	// CalendarHeaderHost implementation

	get _previousButtonDisabled() {
		return !this._hasPreviousPage();
	}

	get _nextButtonDisabled() {
		return !this._hasNextPage();
	}

	get _portraitView() {
		return false;
	}

	get _isHeaderMonthButtonHidden() {
		return true;
	}

	get _isHeaderYearButtonHidden() {
		return true;
	}

	get _isHeaderYearRangeButtonHidden() {
		// In standalone (high-zoom) mode there is no Calendar parent to handle the
		// year-range button press, so hide it to avoid a dead, focusable control.
		return this._showHeader;
	}

	get _headerYearRangeButtonText() {
		if (!this._yearsInterval.length) {
			return "";
		}
		const firstRow = this._yearsInterval[0];
		const lastRow = this._yearsInterval[this._yearsInterval.length - 1];
		const firstYear = firstRow[0].year;
		const lastYear = lastRow[lastRow.length - 1].year;
		return `${firstYear} – ${lastYear}`;
	}

	get accInfo() {
		const rangeText = this._headerYearRangeButtonText;
		const [rangeStartText, rangeEndText] = rangeText.split(" – ");
		const yearRangeLabel = YearPicker.i18nBundle.getText(CALENDAR_HEADER_YEAR_RANGE_BUTTON, rangeStartText, rangeEndText);
		const yearRangeShortcut = YearPicker.i18nBundle.getText(CALENDAR_HEADER_YEAR_RANGE_BUTTON_SHORTCUT);
		const nextBtnLabel = YearPicker.i18nBundle.getText(CALENDAR_HEADER_YEAR_RANGE_NEXT_BUTTON_TITLE);
		const prevBtnLabel = YearPicker.i18nBundle.getText(CALENDAR_HEADER_YEAR_RANGE_PREVIOUS_BUTTON_TITLE);
		const nextBtnShortcut = YearPicker.i18nBundle.getText(CALENDAR_HEADER_MONTH_NEXT_BUTTON_SHORTCUT);
		const prevBtnShortcut = YearPicker.i18nBundle.getText(CALENDAR_HEADER_MONTH_PREVIOUS_BUTTON_SHORTCUT);

		return {
			ariaLabelYearRangeButton: yearRangeLabel,
			ariaLabelNextButton: nextBtnLabel,
			ariaLabelPrevButton: prevBtnLabel,
			keyShortcutYearRangeButton: yearRangeShortcut,
			keyShortcutNextButton: nextBtnShortcut,
			keyShortcutPrevButton: prevBtnShortcut,
			tooltipYearRangeButton: `${yearRangeLabel} (${yearRangeShortcut})`,
			tooltipNextButton: `${nextBtnLabel} (${nextBtnShortcut})`,
			tooltipPrevButton: `${prevBtnLabel} (${prevBtnShortcut})`,
		};
	}

	onPrevButtonClick() {
		this._showPreviousPage();
	}

	onPrevButtonKeyDown(e: KeyboardEvent) {
		if (isEnter(e) || isSpace(e)) {
			this._showPreviousPage();
		}
	}

	onPrevButtonKeyUp() { /* noop */ }

	onNextButtonClick() {
		this._showNextPage();
	}

	onNextButtonKeyDown(e: KeyboardEvent) {
		if (isEnter(e) || isSpace(e)) {
			this._showNextPage();
		}
	}

	onNextButtonKeyUp() { /* noop */ }

	get roleDescription() {
		return YearPicker.i18nBundle.getText(YEAR_PICKER_DESCRIPTION);
	}

	onBeforeRendering() {
		if (this._hidden) {
			return;
		}

		this._firstYear = this._currentYearRange?.startYear ? this._currentYearRange?.startYear : this._calendarDate.getYear();
		this._buildYears();
	}

	_getPageSize() {
		if (this._pageSize > 0) { return this._pageSize; }
		return this.hasSecondaryCalendarType ? 8 : 20;
	}

	_getRowSize() {
		if (this._rowSize > 0) { return this._rowSize; }
		return this.hasSecondaryCalendarType ? 2 : 4;
	}

	_buildYears() {
		const pageSize = this._getPageSize();
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType });
		const oYearFormatInSecType = DateFormat.getDateInstance({ format: "y", calendarType: this.secondaryCalendarType });

		const calendarDate = this._calendarDate; // store the value of the expensive getter
		const minDate = this._minDate; // store the value of the expensive getter
		const maxDate = this._maxDate; // store the value of the expensive getter
		const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
		let tempDateInSecType;
		let textInSecType;
		tempDate.setYear(this._firstYear!);

		const intervals: YearInterval = [];
		let timestamp;

		/* eslint-disable no-loop-func */
		for (let i = 0; i < pageSize; i++) {
			timestamp = tempDate.valueOf() / 1000;

			const isSelected = this.selectedDates.some(itemTimestamp => {
				const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
				return date.getYear() === tempDate.getYear();
			});
			const isFocused = tempDate.getYear() === calendarDate.getYear();
			const isDisabled = tempDate.getYear() < minDate.getYear() || tempDate.getYear() > maxDate.getYear();
			const isSelectedBetween = this._isYearInsideSelectionRange(timestamp);

			if (this.hasSecondaryCalendarType) {
				tempDateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this.secondaryCalendarType, timestamp, true);
				textInSecType = tempDateInSecType.firstDate.getYear() === tempDateInSecType.lastDate.getYear()
					? `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate())}`
					: `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate())} - ${oYearFormatInSecType.format(tempDateInSecType.lastDate.toLocalJSDate())}`;
			}

			const year: Year = {
				timestamp: timestamp.toString(),
				_tabIndex: isFocused ? 0 : -1,
				focusRef: isFocused,
				selected: isSelected || isSelectedBetween,
				ariaSelected: isSelected || isSelectedBetween,
				year: oYearFormat.format(tempDate.toLocalJSDate()),
				yearInSecType: textInSecType,
				disabled: isDisabled,
				ariaDisabled: isDisabled,
				classes: "ui5-yp-item",
				parts: "year-cell",
			};

			if (isSelected) {
				year.classes += " ui5-yp-item--selected";
				year.parts += " year-cell-selected";
			}

			if (isSelectedBetween) {
				year.classes += " ui5-yp-item--selected-between";
				year.parts += " year-cell-selected-between";
			}

			if (isDisabled) {
				year.classes += " ui5-yp-item--disabled";
			}

			if (this.hasSecondaryCalendarType) {
				year.classes += " ui5-yp-item-secondary-type";
			}
			const intervalIndex = Math.floor(i / this._getRowSize());

			if (intervals[intervalIndex]) {
				intervals[intervalIndex].push(year);
			} else {
				intervals[intervalIndex] = [year];
			}

			tempDate.setYear(tempDate.getYear() + 1);
		}

		this._yearsInterval = intervals;
	}

	/**
	  * Returns true if year timestamp is inside the selection range.
	  * @private
	  */
	_isYearInsideSelectionRange(timestamp: number): boolean {
		if (this.selectionMode !== CalendarSelectionMode.Range || !this.selectedDates.length) {
			return false;
		}

		// Only one date selected - second is hovered or focused
		if (this.selectedDates.length === 1 && this._secondTimestamp) {
			return isBetween(timestamp, this.selectedDates[0], this._secondTimestamp);
		}

		return isBetween(timestamp, this.selectedDates[0], this.selectedDates[1]);
	}

	_onkeydown(e: KeyboardEvent) {
		let preventDefault = true;
		const pageSize = this._getPageSize();
		const rowSize = this._getRowSize();

		if (isEnter(e)) {
			this._selectYear(e);
		} else if (isSpace(e)) {
			e.preventDefault();
		} else if (isLeft(e)) {
			this._modifyTimestampBy(-1);
		} else if (isRight(e)) {
			this._modifyTimestampBy(1);
		} else if (isUp(e)) {
			this._modifyTimestampBy(-rowSize);
		} else if (isDown(e)) {
			this._modifyTimestampBy(rowSize);
		} else if (isPageUp(e)) {
			this._modifyTimestampBy(-pageSize);
		} else if (isPageDown(e)) {
			this._modifyTimestampBy(pageSize);
		} else if (isHome(e) || isEnd(e)) {
			this._onHomeOrEnd(isHome(e));
		} else if (isHomeCtrl(e)) {
			this._setTimestamp(parseInt(this._yearsInterval[0][0].timestamp)); // first year of first row
		} else if (isEndCtrl(e)) {
			this._setTimestamp(parseInt(this._yearsInterval[pageSize / rowSize - 1][rowSize - 1].timestamp)); // last year of last row
		} else {
			preventDefault = false;
		}

		if (preventDefault) {
			e.preventDefault();
		}
	}

	_onHomeOrEnd(homePressed: boolean) {
		this._yearsInterval.forEach(row => {
			const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getYear() === this._calendarDate.getYear());
			if (indexInRow !== -1) { // The current year is on this row
				const index = homePressed ? 0 : this._getRowSize() - 1; // select the first (if Home) or last (if End) year on the row
				this._setTimestamp(parseInt(row[index].timestamp));
			}
		});
	}

	/**
	 * In range selection, the currently focused or hovered year is considered the "second day".
	 * @private
	 */
	_updateSecondTimestamp() {
		if (this.selectionMode === CalendarSelectionMode.Range && (this.selectedDates.length === 1 || this.selectedDates.length === 2)) {
			this._secondTimestamp = this.timestamp;
		}
	}

	/**
	 * Set the hovered day as the "_secondTimestamp".
	 *
	 * @param e
	 * @private
	 */
	_onmouseover(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const hoveredItem = target.closest(".ui5-yp-item") as HTMLElement;
		if (hoveredItem && this.selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
			this._secondTimestamp = this._getTimestampFromDom(hoveredItem);
		}
	}

	/**
	 * Sets the timestamp to an absolute value.
	 * @param value
	 * @private
	 */
	_setTimestamp(value: number) {
		this._safelySetTimestamp(value);
		this.fireDecoratorEvent("navigate", { timestamp: this.timestamp! });
	}

	/**
	 * Modifies timestamp by a given amount of years and, if necessary, loads the prev/next page.
	 * @param amount
	 * @private
	 */
	_modifyTimestampBy(amount: number) {
		// Modify the current timestamp
		this._safelyModifyTimestampBy(amount, "year");
		this._updateSecondTimestamp();

		// Notify the calendar to update its timestamp
		this.fireDecoratorEvent("navigate", { timestamp: this.timestamp! });
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._selectYear(e);
		}
	}

	/**
	 * User clicked with the mouser or pressed Enter/Space
	 * @param e
	 * @private
	 */
	_selectYear(e: Event) {
		e.preventDefault();
		const target = e.target as HTMLElement;

		if (target.className.indexOf("ui5-yp-item") === -1) {
			return;
		}

		const timestamp = this._getTimestampFromDom(target);
		this._safelySetTimestamp(timestamp);
		this._updateSecondTimestamp();
		this._updateSelectedDates(timestamp);

		this.fireDecoratorEvent("change", {
			timestamp: this.timestamp!,
			dates: this.selectedDates,
		});
	}

	_updateSelectedDates(timestamp: number) {
		if (this.selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
			this.selectedDates = [this.selectedDates[0], timestamp];
			return;
		}

		this.selectedDates = [timestamp];
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_hasPreviousPage(): boolean {
		return this._firstYear! > this._minDate.getYear();
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_hasNextPage(): boolean {
		return this._firstYear! + this._getPageSize() - 1 < this._maxDate.getYear();
	}

	/**
	 * Called by the Calendar component.
	 * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
	 * @protected
	 */
	_showPreviousPage() {
		const pageSize = this._getPageSize();
		this._modifyTimestampBy(-pageSize);
	}

	/**
	 * Called by the Calendar component.
	 * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
	 * @protected
	 */
	_showNextPage() {
		this._modifyTimestampBy(this._getPageSize());
	}
}

YearPicker.define();

export default YearPicker;
export type {
	YearPickerChangeEventDetail,
	YearPickerNavigateEventDetail,
};
