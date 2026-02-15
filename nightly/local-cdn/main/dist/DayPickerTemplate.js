import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function DayPickerTemplate() {
    return (_jsx("div", { class: {
            "ui5-dp-root": true,
            "ui5-dp-twocalendartypes": this.hasSecondaryCalendarType,
        }, style: {
            "justify-content": "center",
            display: this._hidden ? "none" : "flex",
        }, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onMouseOver: this._onmouseover, children: _jsxs("div", { id: `${this._id}-content`, class: "ui5-dp-content", role: "grid", "aria-roledescription": this.ariaRoledescription, children: [_jsx("div", { role: "row", class: "ui5-dp-days-names-container", children: this._dayNames.map(day => _jsx("div", { role: "columnheader", "aria-label": day.ultraShortName ? day.name : undefined, class: day.classes, children: day.ultraShortName ? day.ultraShortName : _jsx("span", { "aria-hidden": "true", class: "ui5-hidden-text", children: day.name }) })) }), this._weeks.map(week => {
                    return week.length > 0 ?
                        _jsx("div", { class: "ui5-dp-weeks-row", role: "row", children: week.map(day => {
                                return "timestamp" in day ?
                                    _jsxs("div", { "data-ui5-special-day": day.type ? day.type : undefined, tabindex: day._tabIndex, "data-sap-focus-ref": day.focusRef ? "true" : undefined, "data-sap-timestamp": day.timestamp, role: "gridcell", title: day.tooltip, "aria-selected": day.ariaSelected, "aria-label": day.ariaLabel, "aria-disabled": day.ariaDisabled, class: day.classes, part: day.parts, children: [_jsx("span", { class: "ui5-dp-daytext", "data-sap-timestamp": day.timestamp, children: day.day }), day._isSecondaryCalendarType &&
                                                _jsx("span", { class: "ui5-dp-daytext ui5-dp-daysectext", children: day.secondDay }), day.type &&
                                                _jsx("div", { class: `ui5-dp-specialday ${day.type}` })] })
                                    :
                                        !day.isHidden && (_jsx("div", { className: "ui5-dp-weekname-container", role: "rowheader", "aria-label": `Calendar Week ${day.weekNum}`, children: _jsx("span", { className: "ui5-dp-weekname", children: day.weekNum }) }));
                            }) })
                        :
                            _jsx("div", { class: "ui5-dp-empty-week" });
                })] }) }));
}
//# sourceMappingURL=DayPickerTemplate.js.map