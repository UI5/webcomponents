import { jsxs as _jsxs, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import slimArowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
export default function CalendarHeaderTemplate(options) {
    const headerText = options?.headerText;
    const isFirst = options?.isFirst ?? true;
    const isLast = options?.isLast ?? true;
    const isMultiple = options?.isMultiple ?? false;
    const monthText = headerText?.monthText ?? this._headerMonthButtonText;
    const yearText = headerText?.yearText ?? this._headerYearButtonText;
    const secondMonthText = headerText?.secondMonthText ?? this.secondMonthButtonText;
    const secondYearText = headerText?.secondYearText ?? this._headerYearButtonTextSecType;
    return (_jsxs("div", { class: isMultiple ? "ui5-calheader ui5-calheader-multiple" : "ui5-calheader-root", children: [renderPrevButton.call(this, isFirst, isMultiple), renderMiddleButtons.call(this, {
                monthText: monthText || "",
                yearText: yearText || "",
                secondMonthText: secondMonthText || "",
                secondYearText: secondYearText || "",
            }), renderNextButton.call(this, isFirst, isLast, isMultiple)] }));
}
function renderPrevButton(isFirst, isMultiple) {
    if (!isFirst && isMultiple) {
        return _jsx("div", { class: "ui5-calheader-spacer" });
    }
    return (_jsx("div", { "data-ui5-cal-header-btn-prev": true, class: {
            "ui5-calheader-arrowbtn": true,
            "ui5-calheader-arrowbtn-disabled": this._previousButtonDisabled,
        }, part: "calendar-header-arrow-button", role: "button", onMouseDown: this.onPrevButtonClick, onKeyDown: this.onPrevButtonKeyDown, onKeyUp: this.onPrevButtonKeyUp, tabindex: this._previousButtonDisabled ? -1 : 0, title: this.accInfo.tooltipPrevButton, "aria-label": this.accInfo.ariaLabelPrevButton, "aria-description": this.accInfo.ariaLabelPrevButton, "aria-keyshortcuts": this.accInfo.keyShortcutPrevButton, children: _jsx(Icon, { class: "ui5-calheader-arrowicon", name: slimArowLeft }) }));
}
function renderMiddleButtons(headerText) {
    return (_jsxs("div", { class: "ui5-calheader-midcontainer", children: [_jsxs("div", { "data-ui5-cal-header-btn-month": true, class: "ui5-calheader-arrowbtn ui5-calheader-middlebtn", part: "calendar-header-middle-button", hidden: this._isHeaderMonthButtonHidden, tabindex: 0, role: "button", "aria-label": this.accInfo.ariaLabelMonthButton, "aria-description": this.accInfo.ariaLabelMonthButton, title: this.accInfo.tooltipMonthButton, "aria-keyshortcuts": this.accInfo.keyShortcutMonthButton, onClick: this.onHeaderMonthButtonPress, onKeyDown: this.onMonthButtonKeyDown, onKeyUp: this.onMonthButtonKeyUp, children: [_jsx("span", { children: headerText.monthText }), this.hasSecondaryCalendarType && headerText.secondMonthText &&
                        _jsx("span", { class: "ui5-calheader-btn-sectext", children: headerText.secondMonthText })] }), _jsxs("div", { "data-ui5-cal-header-btn-year": true, class: "ui5-calheader-arrowbtn ui5-calheader-middlebtn", part: "calendar-header-middle-button", hidden: this._isHeaderYearButtonHidden, tabindex: 0, role: "button", "aria-label": this.accInfo.ariaLabelYearButton, "aria-description": this.accInfo.ariaLabelYearButton, onClick: this.onHeaderYearButtonPress, onKeyDown: this.onYearButtonKeyDown, onKeyUp: this.onYearButtonKeyUp, title: this.accInfo.tooltipYearButton, "aria-keyshortcuts": this.accInfo.keyShortcutYearButton, children: [_jsx("span", { children: headerText.yearText }), this.hasSecondaryCalendarType && headerText.secondYearText &&
                        _jsx("span", { class: "ui5-calheader-btn-sectext", children: headerText.secondYearText })] }), _jsxs("div", { "data-ui5-cal-header-btn-year-range": true, class: "ui5-calheader-arrowbtn ui5-calheader-middlebtn", part: "calendar-header-middle-button", hidden: this._isHeaderYearRangeButtonHidden, tabindex: 0, role: "button", "aria-label": this.accInfo.ariaLabelYearRangeButton, "aria-description": this.accInfo.ariaLabelYearRangeButton, title: this.accInfo.tooltipYearRangeButton, "aria-keyshortcuts": this.accInfo.keyShortcutYearRangeButton, onClick: this.onHeaderYearRangeButtonPress, onKeyDown: this.onYearRangeButtonKeyDown, onKeyUp: this.onYearRangeButtonKeyUp, children: [_jsx("span", { children: this._headerYearRangeButtonText }), this.hasSecondaryCalendarType &&
                        _jsx("span", { class: "ui5-calheader-btn-sectext", children: this._headerYearRangeButtonTextSecType })] })] }));
}
function renderNextButton(isFirst, isLast, isMultiple) {
    // In portrait or compact mode, show next button only on first calendar
    // In landscape mode, show next button only on last calendar
    const isVertical = this._portraitView || this._isCompactMode;
    const shouldShowNextButton = !isMultiple || (isVertical ? isFirst : isLast);
    const shouldShowSpacer = isMultiple && (isVertical ? isLast : !isLast);
    if (shouldShowNextButton) {
        return (_jsx("div", { "data-ui5-cal-header-btn-next": true, class: {
                "ui5-calheader-arrowbtn": true,
                "ui5-calheader-arrowbtn-disabled": this._nextButtonDisabled,
            }, part: "calendar-header-arrow-button", role: "button", onMouseDown: this.onNextButtonClick, onKeyDown: this.onNextButtonKeyDown, onKeyUp: this.onNextButtonKeyUp, tabindex: this._nextButtonDisabled ? -1 : 0, title: this.accInfo.tooltipNextButton, "aria-label": this.accInfo.ariaLabelNextButton, "aria-description": this.accInfo.ariaLabelNextButton, "aria-keyshortcuts": this.accInfo.keyShortcutNextButton, children: _jsx(Icon, { class: "ui5-calheader-arrowicon", name: slimArowRight }) }));
    }
    if (shouldShowSpacer) {
        return _jsx("div", { class: "ui5-calheader-spacer" });
    }
    return null;
}
//# sourceMappingURL=CalendarHeaderTemplate.js.map