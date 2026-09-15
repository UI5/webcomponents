import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import BreadcrumbsPopoverTemplate from "./BreadcrumbsPopoverTemplate.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import Icon from "./Icon.js";
import Link from "./Link.js";
import Label from "./Label.js";
export default function BreadcrumbsTemplate() {
    return (_jsxs(_Fragment, { children: [_jsx("nav", { class: "ui5-breadcrumbs-root", "aria-label": this._accessibleNameText, children: _jsxs("ol", { onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: [_jsx("li", { class: "ui5-breadcrumbs-dropdown-arrow-link-wrapper", hidden: this._isOverflowEmpty, children: _jsx(Link, { wrappingType: "None", accessibleRole: "Button", accessibleName: this._dropdownArrowAccessibleNameText, accessibilityAttributes: this.linkAccessibilityAttributes, onClick: this._openRespPopover, children: _jsx(Icon, { name: slimArrowDown, title: this._dropdownArrowAccessibleNameText }) }) }), this._linksData.map(linkData => _jsxs("li", { id: `${linkData._id}-link-wrapper`, class: "ui5-breadcrumbs-link-wrapper", children: [_jsx(Link, { id: `${linkData._id}-link`, href: linkData.href, target: linkData.target, design: linkData._linkDesign, accessibleName: linkData._accessibleNameText, accessibilityAttributes: linkData.accessibilityAttributes, "data-ui5-stable": linkData.stableDomRef, wrappingType: "None", onClick: this._onLinkPress, children: linkData.innerText }), linkData._needsSeparator &&
                                    _jsx("span", { class: "ui5-breadcrumbs-separator", "aria-hidden": "true" })] })), !this._endsWithCurrentLinkItem && this._endsWithCurrentLocation &&
                            _jsx("li", { class: "ui5-breadcrumbs-current-location", onClick: this._onLabelPress, children: _jsx("span", { id: `${this._id}-labelWrapper`, "aria-current": "page", "aria-label": this._currentLocationAccName, children: _jsx(Label, { wrappingType: "None", children: this._currentLocationText }) }) })] }) }), BreadcrumbsPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=BreadcrumbsTemplate.js.map