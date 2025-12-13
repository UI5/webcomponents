import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import Icon from "./Icon.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
export default function PanelTemplate() {
    return (_jsx(_Fragment, { children: _jsxs("div", { class: "ui5-panel-root", role: this.accRole, "aria-label": this.effectiveAccessibleName, "aria-labelledby": this.fixedPanelAriaLabelledbyReference, children: [this.hasHeaderOrHeaderText &&
                    // header: either header or h1 with header text
                    _jsx("div", { class: {
                            "ui5-panel-heading-wrapper": true,
                            "ui5-panel-heading-wrapper-sticky": this.stickyHeader,
                        }, role: this.headingWrapperRole, "aria-level": this.headingWrapperAriaLevel, children: _jsxs("div", { onClick: this._headerClick, onKeyDown: this._headerKeyDown, onKeyUp: this._headerKeyUp, class: "ui5-panel-header", tabindex: this.headerTabIndex, role: this.accInfo.role, "aria-expanded": this.accInfo.ariaExpanded, "aria-controls": this.accInfo.ariaControls, "aria-labelledby": this.accInfo.ariaLabelledby, part: "header", children: [!this.fixed &&
                                    _jsx("div", { class: "ui5-panel-header-button-root", children: this._hasHeader ?
                                            _jsx(Button, { design: "Transparent", class: "ui5-panel-header-button ui5-panel-header-button-with-icon", onClick: this._toggleButtonClick, accessibilityAttributes: this.accInfo.button.accessibilityAttributes, tooltip: this.accInfo.button.title, accessibleName: this.accInfo.button.ariaLabelButton, children: _jsx("div", { class: "ui5-panel-header-icon-wrapper", children: _jsx(Icon, { class: {
                                                            "ui5-panel-header-icon": true,
                                                            "ui5-panel-header-button-animated": !this.shouldNotAnimate,
                                                        }, name: slimArrowRight }) }) })
                                            : // else
                                                _jsx(Icon, { class: {
                                                        "ui5-panel-header-button": true,
                                                        "ui5-panel-header-icon": true,
                                                        "ui5-panel-header-button-animated": !this.shouldNotAnimate,
                                                    }, name: slimArrowRight, showTooltip: true, accessibleName: this.toggleButtonTitle }) }), this._hasHeader ?
                                    _jsx("slot", { name: "header" })
                                    : // else
                                        _jsx("div", { id: `${this._id}-header-title`, class: "ui5-panel-header-title", children: this.headerText })] }) }), _jsx("div", { class: "ui5-panel-content", id: `${this._id}-content`, tabindex: -1, style: {
                        display: this._contentExpanded ? "block" : "none",
                    }, part: "content", children: _jsx("slot", {}) })] }) }));
}
//# sourceMappingURL=PanelTemplate.js.map