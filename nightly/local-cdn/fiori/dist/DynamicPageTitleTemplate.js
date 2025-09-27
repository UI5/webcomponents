import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import slimArrowDownIcon from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
export default function DynamicPageTitleTemplate() {
    return (_jsxs("div", { class: "ui5-dynamic-page-title-root", children: [_jsx("span", { class: "ui5-dynamic-page-title-focus-area", "data-sap-focus-ref": true, tabIndex: this._tabIndex, onKeyDown: this._onkeydown, onClick: this.onTitleClick, role: this._role, "aria-expanded": this.forAriaExpanded, "aria-labelledby": this._ariaLabelledBy, "aria-describedby": this._ariaDescribedBy }), this.hasSnappedTitleOnMobile ?
                _jsxs("div", { id: `${this._id}-heading`, class: "ui5-dynamic-page--snapped-title-on-mobile", children: [_jsx("slot", { name: "snappedTitleOnMobile" }), _jsx(Icon, { name: slimArrowDownIcon, mode: "Decorative" })] })
                : _jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-dynamic-page-title--top-area", children: [_jsx("slot", { name: "breadcrumbs" }), this.mobileNavigationActions &&
                                    _jsx("slot", { name: "navigationBar" })] }), _jsxs("div", { class: "ui5-dynamic-page-title--wrapper", "onui5-_min-content-width-change": this.onMinContentWidthChange, children: [_jsx("div", { id: `${this._id}-heading`, class: "ui5-dynamic-page-title--heading", children: _jsx("slot", { name: this.headingSlotName }) }), this.hasContent &&
                                    _jsx("div", { class: "ui5-dynamic-page-title--content", style: {
                                            "min-width": this.minContentWidth ? `${this.minContentWidth || 0}px` : undefined,
                                        }, children: _jsx("slot", {}) }), _jsxs("div", { class: "ui5-dynamic-page-title--actions", style: {
                                        "min-width": this.minActionsWidth ? `${this.minActionsWidth || 0}px` : undefined,
                                    }, children: [_jsx("slot", { name: "actionsBar" }), !this.mobileNavigationActions && _jsxs(_Fragment, { children: [this._needsSeparator &&
                                                    _jsx("div", { class: "ui5-dynamic-page-title--actions-separator" }), _jsx("slot", { name: "navigationBar" })] })] })] }), _jsx("div", { class: "ui5-dynamic-page-title--subheading", children: _jsx("slot", { name: this.subheadingSlotName }) })] }), _jsx("span", { id: `${this._id}-toggle-description`, class: "ui5-hidden-text", children: this._ariaDescribedbyText })] }));
}
//# sourceMappingURL=DynamicPageTitleTemplate.js.map