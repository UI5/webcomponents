var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var YearRangePicker_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import { isEnter, isSpace, isDown, isUp, isLeft, isRight, isHome, isEnd, isHomeCtrl, isEndCtrl, isPageUp, isPageDown, } from "@ui5/webcomponents-base/dist/Keys.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { getMaxCalendarDate } from "@ui5/webcomponents-localization/dist/dates/ExtremeDates.js";
import CalendarPart from "./CalendarPart.js";
import { YEAR_RANGE_PICKER_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";
// Template
import YearRangePickerTemplate from "./YearRangePickerTemplate.js";
// Styles
import yearRangePickerStyles from "./generated/themes/YearRangePicker.css.js";
const isBetweenInclusive = (x, num1, num2) => x >= Math.min(num1, num2) && x <= Math.max(num1, num2);
/**
 * @class
 *
 * Displays year ranges which help navigate through years faster.
 * @constructor
 * @extends CalendarPart
 * @private
 */
let YearRangePicker = YearRangePicker_1 = class YearRangePicker extends CalendarPart {
    constructor() {
        super(...arguments);
        /**
         * An array of UTC timestamps representing the selected date
         * or dates depending on the capabilities of the picker component.
         * @default []
         */
        this.selectedDates = [];
        /**
         * Defines if the YearRangePicker should visualize the selected dates as a range.
         * @default false
         *
         * @private
         */
        this._showRangeSelection = false;
        this._yearRanges = [];
        this._hidden = false;
    }
    get roleDescription() {
        return YearRangePicker_1.i18nBundle.getText(YEAR_RANGE_PICKER_DESCRIPTION);
    }
    onBeforeRendering() {
        if (this._hidden) {
            return;
        }
        this._gridStartYear = this._getGridStartYear();
        this._yearRanges = this._getYearRanges();
    }
    _shouldShowOneColumn() {
        const locale = getLocale();
        const language = locale.getLanguage();
        const longLanguages = ["zh", "ja", "ko", "bg", "mk", "ru"];
        return longLanguages.includes(language) && this.hasSecondaryCalendarType;
    }
    _getPageSize() {
        return this._shouldShowOneColumn() ? 6 : 8;
    }
    _getRowSize() {
        return this._shouldShowOneColumn() ? 1 : 2;
    }
    _getInitialFocusedIndex() {
        return 2;
    }
    _getRangeSize() {
        return this.hasSecondaryCalendarType ? 8 : 20;
    }
    _getYearRangeFormattedText(startDate, endDate, yearFormat) {
        return `${yearFormat.format(startDate.toLocalJSDate())} - ${yearFormat.format(endDate.toLocalJSDate())}`;
    }
    _getGridStartYear() {
        const rangeSize = this._getRangeSize();
        const pageSize = this._getPageSize();
        const pageSizeInYears = rangeSize * pageSize;
        const yearsOffset = rangeSize * this._getInitialFocusedIndex();
        const currentStartYear = this._currentYearRange?.startYear ? this._currentYearRange?.startYear : this._calendarDate.getYear();
        // On first load, current range should be the 3rd item in the grid
        let gridStartYear = this._gridStartYear ? this._gridStartYear : currentStartYear - yearsOffset;
        // If page navigation occured, update the current range start year
        gridStartYear += Math.floor((currentStartYear - gridStartYear) / pageSizeInYears) * pageSizeInYears;
        // Normalize grid start year to be between the min and absolute max year
        const minYear = this._minDate.getYear();
        if (currentStartYear - rangeSize < minYear) {
            gridStartYear = minYear;
        }
        const absoluteMaxYear = getMaxCalendarDate(this._primaryCalendarType).getYear();
        if (currentStartYear + pageSizeInYears > absoluteMaxYear) {
            gridStartYear = absoluteMaxYear - pageSizeInYears + 1;
        }
        return gridStartYear;
    }
    _getYearRanges() {
        const locale = getLocale();
        const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, locale);
        const yearFormatInSecType = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType }, locale);
        const pageSize = this._getPageSize();
        const rowSize = this._getRowSize();
        const rangeSize = this._getRangeSize();
        const calendarDate = this._calendarDate;
        const minYear = this._minDate.getYear();
        const maxYear = this._maxDate.getYear();
        const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
        tempDate.setYear(this._gridStartYear);
        const yearRanges = [];
        for (let i = 0; i < pageSize; i++) {
            const endDate = new CalendarDate(tempDate, this._primaryCalendarType);
            endDate.setYear(endDate.getYear() + rangeSize - 1);
            const timestamp = tempDate.valueOf() / 1000;
            const endTimestamp = endDate.valueOf() / 1000;
            const isFocused = isBetweenInclusive(calendarDate.getYear(), tempDate.getYear(), endDate.getYear());
            const isSelected = this._isYearRangeSelected(timestamp, endTimestamp);
            const isSelectedBetween = this._isInsideSelectionRange(timestamp);
            const yearRangeText = this._getYearRangeFormattedText(tempDate, endDate, yearFormat);
            const secYearRangeText = this.hasSecondaryCalendarType ? this._getYearRangeFormattedText(tempDate, endDate, yearFormatInSecType) : undefined;
            const isDisabled = !(isBetweenInclusive(tempDate.getYear(), minYear, maxYear)
                || isBetweenInclusive(endDate.getYear(), minYear, maxYear));
            const yearRange = this._getYearRange(timestamp, isFocused, isSelected, isSelectedBetween, yearRangeText, secYearRangeText, isDisabled);
            const intervalIndex = Math.floor(i / rowSize);
            if (yearRanges[intervalIndex]) {
                yearRanges[intervalIndex].push(yearRange);
            }
            else {
                yearRanges[intervalIndex] = [yearRange];
            }
            tempDate.setYear(tempDate.getYear() + rangeSize);
        }
        return yearRanges;
    }
    _getYearRange(timestamp, isFocused, isSelected, isSelectedBetween, yearRangeText, secYearRangeText, isDisabled) {
        const yearRange = {
            timestamp: timestamp.toString(),
            _tabIndex: isFocused ? 0 : -1,
            focusRef: isFocused,
            selected: isSelected || isSelectedBetween,
            ariaSelected: isSelected || isSelectedBetween,
            range: yearRangeText,
            rangeInSecType: secYearRangeText,
            disabled: isDisabled,
            ariaDisabled: isDisabled,
            classes: "ui5-yrp-item",
            parts: "year-range-cell",
        };
        if (isSelected) {
            yearRange.classes += " ui5-yrp-item--selected";
            yearRange.parts += " year-range-cell-selected";
        }
        if (isSelectedBetween && !isSelected) {
            yearRange.classes += " ui5-yrp-item--selected-between";
            yearRange.parts += " year-range-cell-selected-between";
        }
        if (isDisabled) {
            yearRange.classes += " ui5-yrp-item--disabled";
        }
        if (this.hasSecondaryCalendarType) {
            yearRange.classes += " ui5-yrp-item-secondary-type";
        }
        if (this._shouldShowOneColumn()) {
            yearRange.classes += " ui5-yrp-item-one-column-view";
        }
        return yearRange;
    }
    _isYearRangeSelected(startYear, endYear) {
        return this.selectedDates.some(itemTimestamp => {
            return isBetweenInclusive(itemTimestamp, startYear, endYear);
        });
    }
    /**
      * Returns true if the timestamp is inside the selection range.
      * @private
      */
    _isInsideSelectionRange(timestamp) {
        if (!this._showRangeSelection || !this.selectedDates.length) {
            return false;
        }
        if (this.selectedDates.length === 1 && this._secondTimestamp) {
            return isBetweenInclusive(timestamp, this.selectedDates[0], this._secondTimestamp);
        }
        return isBetweenInclusive(timestamp, this.selectedDates[0], this.selectedDates[1]);
    }
    _onkeydown(e) {
        let preventDefault = true;
        const pageSize = this._getPageSize();
        const rowSize = this._getRowSize();
        if (isEnter(e)) {
            this._selectYearRange(e);
        }
        else if (isSpace(e)) {
            e.preventDefault();
        }
        else if (isLeft(e)) {
            this._modifyTimestampBy(-1);
        }
        else if (isRight(e)) {
            this._modifyTimestampBy(1);
        }
        else if (isUp(e)) {
            this._modifyTimestampBy(-rowSize);
        }
        else if (isDown(e)) {
            this._modifyTimestampBy(rowSize);
        }
        else if (isPageUp(e)) {
            this._modifyTimestampBy(-pageSize);
        }
        else if (isPageDown(e)) {
            this._modifyTimestampBy(pageSize);
        }
        else if (isHome(e) || isEnd(e)) {
            this._onHomeOrEnd(isHome(e));
        }
        else if (isHomeCtrl(e)) {
            this._setTimestamp(parseInt(this._yearRanges[0][0].timestamp)); // first year range of first row
        }
        else if (isEndCtrl(e)) {
            this._setTimestamp(parseInt(this._yearRanges[pageSize / rowSize - 1][rowSize - 1].timestamp)); // last year range of last row
        }
        else {
            preventDefault = false;
        }
        if (preventDefault) {
            e.preventDefault();
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._selectYearRange(e);
        }
    }
    _onHomeOrEnd(homePressed) {
        this._yearRanges.forEach(row => {
            const indexInRow = row.findIndex(item => {
                const startYear = CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getYear();
                const currentYear = this._calendarDate.getYear();
                return isBetweenInclusive(startYear, currentYear, currentYear + this._getRangeSize() - 1);
            });
            if (indexInRow !== -1) { // The current year is on this row
                const index = homePressed ? 0 : this._getRowSize() - 1; // select the first (if Home) or last (if End) year on the row
                this._setTimestamp(parseInt(row[index].timestamp));
            }
        });
    }
    /**
     * Set the hovered day as the "_secondTimestamp".
     *
     * @param e
     * @private
     */
    _onmouseover(e) {
        const target = e.target;
        const hoveredItem = target.closest(".ui5-yrp-item");
        if (hoveredItem && this._showRangeSelection && this.selectedDates.length === 1) {
            this._secondTimestamp = this._getTimestampFromDom(hoveredItem);
        }
    }
    /**
     * Sets the timestamp to an absolute value.
     * @param value
     * @private
     */
    _setTimestamp(value) {
        this._safelySetTimestamp(value);
        this.fireDecoratorEvent("navigate", { timestamp: this.timestamp });
    }
    /**
     * In range selection, the currently focused or hovered year range is considered the "second timestamp".
     * @private
     */
    _updateSecondTimestamp() {
        if (this._showRangeSelection && (this.selectedDates.length === 1 || this.selectedDates.length === 2)) {
            this._secondTimestamp = this.timestamp;
        }
    }
    /**
     * User selected range with the mouse or pressed Enter/Space.
     * @param e
     * @private
     */
    _selectYearRange(e) {
        e.preventDefault();
        const target = e.target;
        if (target.className.indexOf("ui5-yrp-item") === -1) {
            return;
        }
        let timestamp = this._getTimestampFromDom(target);
        timestamp = this._getYearPickerCenteredTimestamp(timestamp);
        this._safelySetTimestamp(timestamp);
        this.fireDecoratorEvent("change", {
            timestamp: this.timestamp,
        });
    }
    /**
     * Returns the centered timestamp for the year picker.
     * @private
     */
    _getYearPickerCenteredTimestamp(oldTimestamp) {
        const yearsOffset = this.hasSecondaryCalendarType ? 2 : 9;
        const selectedDate = CalendarDate.fromTimestamp(oldTimestamp * 1000, this._primaryCalendarType);
        const startYear = selectedDate.getYear();
        const centeredYear = startYear + yearsOffset;
        selectedDate.setYear(centeredYear);
        return selectedDate.valueOf() / 1000;
    }
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasPreviousPage() {
        return this._gridStartYear > this._minDate.getYear();
    }
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasNextPage() {
        const amountInYears = this._getPageSize() * this._getRangeSize();
        return this._gridStartYear + amountInYears - 1 < this._maxDate.getYear();
    }
    /**
     * Called by the Calendar component.
     * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage() {
        const pageSize = this._getPageSize();
        this._modifyTimestampBy(-pageSize);
        const amountInYears = pageSize * this._getRangeSize();
        this._modifyGridStartBy(-amountInYears);
    }
    /**
     * Called by the Calendar component.
     * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage() {
        const pageSize = this._getPageSize();
        this._modifyTimestampBy(pageSize);
        const amountInYears = pageSize * this._getRangeSize();
        this._modifyGridStartBy(amountInYears);
    }
    /**
     * Modifies timestamp by a given amount of year ranges and, if necessary, loads the prev/next page.
     * @param amount
     * @private
     */
    _modifyTimestampBy(amount) {
        // Modify the current timestamp
        const amountInYears = amount * this._getRangeSize();
        this._safelyModifyTimestampBy(amountInYears, "year");
        // Notify the calendar to update its timestamp
        this.fireDecoratorEvent("navigate", { timestamp: this.timestamp });
    }
    _modifyGridStartBy(years) {
        this._gridStartYear += years;
    }
};
__decorate([
    property({ type: Array })
], YearRangePicker.prototype, "selectedDates", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], YearRangePicker.prototype, "_showRangeSelection", void 0);
__decorate([
    property({ type: Number })
], YearRangePicker.prototype, "_secondTimestamp", void 0);
__decorate([
    property({ type: Array })
], YearRangePicker.prototype, "_yearRanges", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], YearRangePicker.prototype, "_hidden", void 0);
__decorate([
    property({ noAttribute: true })
], YearRangePicker.prototype, "_currentYearRange", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], YearRangePicker, "i18nBundle", void 0);
YearRangePicker = YearRangePicker_1 = __decorate([
    customElement({
        tag: "ui5-yearrangepicker",
        styles: [
            yearRangePickerStyles,
        ],
        template: YearRangePickerTemplate,
    })
    /**
     * Fired when the user selects a year range via "Space", "Enter" or click.
     */
    ,
    event("change", {
        bubbles: true,
    })
    /**
     * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
     */
    ,
    event("navigate", {
        bubbles: true,
    })
], YearRangePicker);
YearRangePicker.define();
export default YearRangePicker;
//# sourceMappingURL=YearRangePicker.js.map