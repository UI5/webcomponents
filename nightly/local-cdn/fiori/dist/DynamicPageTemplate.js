import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import DynamicPageHeaderActions from "./DynamicPageHeaderActions.js";
export default function DynamicPageTemplate() {
    return (_jsxs("div", { class: "ui5-dynamic-page-root", children: [_jsxs("div", { class: "ui5-dynamic-page-scroll-container", onScroll: this.snapOnScroll, children: [_jsxs("header", { class: "ui5-dynamic-page-title-header-wrapper", id: `${this._id}-header`, "aria-label": this.headerAriaLabel, "onui5-toggle-title": this.onToggleTitle, children: [_jsx("slot", { name: "titleArea" }), this.headerInTitle &&
                                _jsx("slot", { tabIndex: this.headerTabIndex, "aria-hidden": this.headerAriaHidden, name: "headerArea" }), this.actionsInTitle && headerActions.call(this)] }), this.headerInContent &&
                        _jsx("slot", { tabIndex: this.headerTabIndex, "aria-hidden": this.headerAriaHidden, name: "headerArea" }), !this.actionsInTitle && headerActions.call(this), _jsx("div", { part: "content", class: "ui5-dynamic-page-content", onFocusIn: this.onContentFocusIn, onFocusOut: this.onContentFocusOut, children: _jsxs("div", { class: "ui5-dynamic-page-fit-content", part: "fit-content", children: [_jsx("slot", {}), this.showFooter &&
                                    _jsx("div", { class: "ui5-dynamic-page-spacer" })] }) })] }), _jsx("div", { class: "ui5-dynamic-page-footer", part: "footer", children: _jsx("slot", { name: "footerArea" }) })] }));
}
function headerActions() {
    if (!this.hasSnappedTitleOnMobile && this.hasHeading) {
        return (_jsx(DynamicPageHeaderActions, { snapped: this.headerSnapped, pinned: this.headerPinned, hidePinButton: this.hidePinButton, "onui5-expand-button-click": this.onExpandClick, "onui5-pin-button-click": this.onPinClick, "onui5-expand-button-hover-in": this.onExpandHoverIn, "onui5-expand-button-hover-out": this.onExpandHoverOut }));
    }
}
//# sourceMappingURL=DynamicPageTemplate.js.map