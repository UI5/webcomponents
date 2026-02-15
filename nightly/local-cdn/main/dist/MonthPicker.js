var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MonthPicker_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import convertMonthNumbersToMonthNames from "@ui5/webcomponents-localization/dist/dates/convertMonthNumbersToMonthNames.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import { isEnter, isSpace, isDown, isUp, isLeft, isRight, isHome, isEnd, isHomeCtrl, isEndCtrl, isPageUp, isPageDown, } from "@ui5/webcomponents-base/dist/Keys.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { MONTH_PICKER_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
import CalendarPart from "./CalendarPart.js";
// Template
import MonthPickerTemplate from "./MonthPickerTemplate.js";
// Styles
import monthPickerStyles from "./generated/themes/MonthPicker.css.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
const isBetween = (x, num1, num2) => x > Math.min(num1, num2) && x < Math.max(num1, num2);
const PAGE_SIZE = 12; // total months on a single page
/**
 * Month picker component.
 * @class
 *
 * Displays months which can be selected.
 * @constructor
 * @extends CalendarPart
 * @private
 */
let MonthPicker = MonthPicker_1 = class MonthPicker extends CalendarPart {
    constructor() {
        super(...arguments);
        /**
         * An array of UTC timestamps representing the selected date
         * or dates depending on the capabilities of the picker component.
         * @default []
         */
        this.selectedDates = [];
        /**
         * Defines the type of selection used in the month picker component.
         * Accepted property values are:
         *
         * - `CalendarSelectionMode.Single` - enables election of a single month.
         * - `CalendarSelectionMode.Range` - enables selection of a month range.
         *
         * Note that 'CalendarSelectionMode.Multiple` is not supported for Month Picker!
         * @default "Single"
         * @since 2.2.0
         */
        this.selectionMode = "Single";
        this._monthsInterval = [];
        this._hidden = false;
    }
    get roleDescription() {
        return MonthPicker_1.i18nBundle.getText(MONTH_PICKER_DESCRIPTION);
    }
    onBeforeRendering() {
        this._buildMonths();
    }
    get rowSize() {
        return (this.secondaryCalendarType === CalendarType.Islamic && this.primaryCalendarType !== CalendarType.Islamic)
            || (this.secondaryCalendarType === CalendarType.Persian && this.primaryCalendarType !== CalendarType.Persian) ? 2 : 3;
    }
    _buildMonths() {
        if (this._hidden) {
            return;
        }
        const localeData = getCachedLocaleDataInstance(getLocale());
        const monthsNames = localeData.getMonthsStandAlone("wide", this._primaryCalendarType);
        const months = [];
        const calendarDate = this._calendarDate; // store the value of the expensive getter
        const minDate = this._minDate; // store the value of the expensive getter
        const maxDate = this._maxDate; // store the value of the expensive getter
        let timestamp;
        /* eslint-disable no-loop-func */
        for (let i = 0; i < 12; i++) {
            const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
            tempDate.setMonth(i);
            // If the current date of the current month is larger than this month, set the date to the last day of the previous month.
            // This is needed because the date object will automatically switch to the next month if larger date is set.
            if (tempDate.getMonth() !== i) {
                tempDate.setMonth(tempDate.getMonth() - 1);
                tempDate.setDate(this._calendarDate.getDate() - tempDate.getDate());
            }
            timestamp = tempDate.valueOf() / 1000;
            const isSelected = this.selectedDates.some(itemTimestamp => {
                const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
                return date.getYear() === tempDate.getYear() && date.getMonth() === tempDate.getMonth();
            });
            const isFocused = tempDate.getMonth() === calendarDate.getMonth();
            const isDisabled = this._isOutOfSelectableRange(tempDate, minDate, maxDate);
            const isSelectedBetween = this._isMonthInsideSelectionRange(timestamp);
            const month = {
                timestamp: timestamp.toString(),
                focusRef: isFocused,
                _tabIndex: isFocused ? 0 : -1,
                selected: isSelected || isSelectedBetween,
                ariaSelected: isSelected || isSelectedBetween,
                name: monthsNames[i],
                nameInSecType: this.hasSecondaryCalendarType && this._getDisplayedSecondaryMonthText(timestamp).text,
                disabled: isDisabled,
                ariaDisabled: isDisabled,
                classes: "ui5-mp-item",
                parts: "month-cell",
            };
            if (isSelected) {
                month.classes += " ui5-mp-item--selected";
                month.parts += " month-cell-selected";
            }
            if (isSelectedBetween) {
                month.classes += " ui5-mp-item--selected-between";
                month.parts += " month-cell-selected-between";
            }
            if (isDisabled) {
                month.classes += " ui5-mp-item--disabled";
            }
            const quarterIndex = Math.floor(i / this.rowSize);
            if (months[quarterIndex]) {
                months[quarterIndex].push(month);
            }
            else {
                months[quarterIndex] = [month];
            }
        }
        this._monthsInterval = months;
    }
    _getDisplayedSecondaryMonthText(timestamp) {
        const monthsName = transformDateToSecondaryType(this._primaryCalendarType, this.secondaryCalendarType, timestamp);
        return convertMonthNumbersToMonthNames(monthsName.firstDate.getMonth(), monthsName.lastDate.getMonth(), this.secondaryCalendarType);
    }
    /**
      * Returns true if month timestamp is inside the selection range.
      * @private
      */
    _isMonthInsideSelectionRange(timestamp) {
        if (this.selectionMode !== CalendarSelectionMode.Range || !this.selectedDates.length) {
            return false;
        }
        // Only one date selected - second is hovered or focused
        if (this.selectedDates.length === 1 && this._secondTimestamp) {
            return isBetween(timestamp, this.selectedDates[0], this._secondTimestamp);
        }
        return isBetween(timestamp, this.selectedDates[0], this.selectedDates[1]);
    }
    _onkeydown(e) {
        let preventDefault = true;
        if (isEnter(e)) {
            this._selectMonth(e);
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
            this._modifyTimestampBy(-this.rowSize);
        }
        else if (isDown(e)) {
            this._modifyTimestampBy(this.rowSize);
        }
        else if (isPageUp(e)) {
            this._modifyTimestampBy(-PAGE_SIZE);
        }
        else if (isPageDown(e)) {
            this._modifyTimestampBy(PAGE_SIZE);
        }
        else if (isHome(e) || isEnd(e)) {
            this._onHomeOrEnd(isHome(e));
        }
        else if (isHomeCtrl(e)) {
            this._setTimestamp(parseInt(this._monthsInterval[0][0].timestamp)); // first month of first row
        }
        else if (isEndCtrl(e)) {
            this._setTimestamp(parseInt(this._monthsInterval[PAGE_SIZE / this.rowSize - 1][this.rowSize - 1].timestamp)); // last month of last row
        }
        else {
            preventDefault = false;
        }
        if (preventDefault) {
            e.preventDefault();
        }
    }
    _onHomeOrEnd(homePressed) {
        this._monthsInterval.forEach(row => {
            const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getMonth() === this._calendarDate.getMonth());
            if (indexInRow !== -1) { // The current month is on this row
                const index = homePressed ? 0 : this.rowSize - 1; // select the first (if Home) or last (if End) month on the row
                this._setTimestamp(parseInt(row[index].timestamp));
            }
        });
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
     * In range selection, the currently focused or hovered month is considered the "second day".
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
    _onmouseover(e) {
        const target = e.target;
        const hoveredItem = target.closest(".ui5-mp-item");
        if (hoveredItem && this.selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
            this._secondTimestamp = this._getTimestampFromDom(hoveredItem);
        }
    }
    /**
     * Sets the focus reference to the month that was clicked with mousedown.
     * @param e
     * @private
     */
    _onmousedown(e) {
        const target = e.target;
        const clickedItem = target.closest(".ui5-mp-item");
        if (clickedItem) {
            const timestamp = this._getTimestampFromDom(clickedItem);
            this._setTimestamp(timestamp);
        }
    }
    /**
     * Modifies timestamp by a given amount of months and,
     * if necessary, loads the prev/next page.
     * @param amount
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @private
     */
    _modifyTimestampBy(amount, preserveDate) {
        // Modify the current timestamp
        this._safelyModifyTimestampBy(amount, "month", preserveDate);
        this._updateSecondTimestamp();
        // Notify the calendar to update its timestamp
        this.fireDecoratorEvent("navigate", { timestamp: this.timestamp });
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._selectMonth(e);
        }
    }
    /**
     * Selects a month, when user made selection with mouse or using Space/Enter.
     * @param e
     * @private
     */
    _selectMonth(e) {
        e.preventDefault();
        const target = e.target;
        if (!target.classList.contains("ui5-mp-item")) {
            return;
        }
        const timestamp = this._getTimestampFromDom(target);
        this._safelySetTimestamp(timestamp);
        this._updateSecondTimestamp();
        this._updateSelectedDates(timestamp);
        this.fireDecoratorEvent("change", {
            timestamp: this.timestamp,
            dates: this.selectedDates,
        });
    }
    _updateSelectedDates(timestamp) {
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
    _hasPreviousPage() {
        return this._calendarDate.getYear() !== this._minDate.getYear();
    }
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasNextPage() {
        return this._calendarDate.getYear() !== this._maxDate.getYear();
    }
    /**
     * Called by Calendar.js.
     *
     * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage() {
        this._modifyTimestampBy(-PAGE_SIZE, true);
    }
    /**
     * Called by Calendar.js
     * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage() {
        this._modifyTimestampBy(PAGE_SIZE, true);
    }
    _isOutOfSelectableRange(date, minDate, maxDate) {
        const month = date.getMonth();
        const year = date.getYear();
        const minYear = minDate.getYear();
        const minMonth = minDate.getMonth();
        const maxYear = maxDate.getYear();
        const maxMonth = maxDate.getMonth();
        return year < minYear || (year === minYear && month < minMonth) || year > maxYear || (year === maxYear && month > maxMonth);
    }
};
__decorate([
    property({ type: Array })
], MonthPicker.prototype, "selectedDates", void 0);
__decorate([
    property()
], MonthPicker.prototype, "selectionMode", void 0);
__decorate([
    property({ type: Array })
], MonthPicker.prototype, "_monthsInterval", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MonthPicker.prototype, "_hidden", void 0);
__decorate([
    property({ type: Number })
], MonthPicker.prototype, "_secondTimestamp", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], MonthPicker, "i18nBundle", void 0);
MonthPicker = MonthPicker_1 = __decorate([
    customElement({
        tag: "ui5-monthpicker",
        template: MonthPickerTemplate,
        styles: monthPickerStyles,
    })
    /**
     * Fired when the user selects a month via "Space", "Enter" or click.
     */
    ,
    event("change", {
        bubbles: true,
    })
    /**
     * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
     * @since 1.0.0-rc.9
     */
    ,
    event("navigate", {
        bubbles: true,
    })
], MonthPicker);
MonthPicker.define();
export default MonthPicker;
//# sourceMappingURL=MonthPicker.js.map