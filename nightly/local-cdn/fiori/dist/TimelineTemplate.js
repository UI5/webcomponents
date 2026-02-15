import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
export default function TimelineTemplate() {
    const listRole = this.hasGroupItems ? "tree" : "list";
    return (_jsx("div", { class: "ui5-timeline-root", role: "region", "aria-label": this.ariaLabel, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, children: _jsx(BusyIndicator, { id: `${this._id}-busyIndicator`, delay: this.loadingDelay, active: this.showBusyIndicatorOverlay, class: "ui5-timeline-busy-indicator", children: _jsx("div", { class: "ui5-timeline-scroll-container", children: _jsxs("div", { class: "ui5-timeline-list", role: listRole, "aria-live": "polite", "aria-label": this.ariaLabel, children: [this.items.map(item => _jsx("div", { class: "ui5-timeline-list-item", children: _jsx("slot", { name: item._individualSlot }) })), this.growsWithButton && moreRow.call(this), this.growsOnScroll && endRow.call(this)] }) }) }) }));
}
function moreRow() {
    return (_jsxs("li", { class: "ui5-timeline-list-item ui5-timeline-list-growing", children: [_jsx("div", { class: "ui5-tli-icon-outer", children: _jsx(Button, { icon: this.growingButtonIcon, id: "ui5-timeline-growing-btn", class: {
                        "ui5-timeline-growing-row-inner": true,
                        "ui5-timeline-growing-row-inner--active": this._loadMoreActive
                    }, tabindex: 0, onClick: this._onLoadMoreClick, onKeyDown: this._onLoadMoreKeydown, onKeyUp: this._onLoadMoreKeyup, tooltip: this.growingButtonText, accessibleName: this.growingButtonText }) }), this.loading &&
                _jsx(BusyIndicator, { delay: this.loadingDelay, class: "ui5-timeline-growing-button-busy-indicator", active: true })] }));
}
function endRow() {
    return (_jsx("div", { tabindex: -1, "aria-hidden": "true", class: "ui5-timeline-end-marker", children: _jsx("span", { tabindex: -1, "aria-hidden": "true", class: "ui5-timeline-end-marker" }) }));
}
//# sourceMappingURL=TimelineTemplate.js.map