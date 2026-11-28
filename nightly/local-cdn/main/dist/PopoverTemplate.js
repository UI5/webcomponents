import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import resizeCorner from "@ui5/webcomponents-icons/dist/resize-corner.js";
import PopupTemplate from "./PopupTemplate.js";
import Title from "./Title.js";
export default function PopoverTemplate() {
    return PopupTemplate.call(this, {
        beforeContent,
        afterContent,
    });
}
function beforeContent() {
    return (_jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-popover-arrow", style: this.styles.arrow }), this._displayHeader &&
                _jsx("header", { class: "ui5-popup-header-root", id: "ui5-popup-header", part: "header", children: this.header.length ?
                        _jsx("slot", { name: "header" })
                        :
                            _jsx(Title, { level: "H1", class: "ui5-popup-header-text", children: this.headerText }) })] }));
}
function afterContent() {
    return (_jsxs(_Fragment, { children: [this._displayFooter && !!this.footer.length &&
                _jsx("footer", { class: "ui5-popup-footer-root", part: "footer", children: _jsx("slot", { name: "footer" }) }), this._showResizeHandle &&
                _jsx("div", { class: "ui5-popover-resize-handle", onMouseDown: this._onResizeMouseDown, title: this._resizeHandleTooltip, children: _jsx(Icon, { name: resizeCorner }) }), this._showResizeHandle &&
                _jsxs(_Fragment, { children: [_jsx("span", { id: `${this._id}-keyboardResizeHandle`, class: "ui5-popover-keyboard-resize-handle ui5-hidden-text", tabIndex: 0, role: "img", "aria-label": this._resizeHandleAriaLabel, "aria-roledescription": this._resizeHandleAriaRoleDescription, "aria-describedby": this._resizeHandleAriaDescribedBy, onKeyDown: this._onResizeKeyDown }), this._resizeHandleAriaDescribedByText &&
                            _jsx("span", { id: `${this._id}-resizeDescr`, "aria-hidden": "true", class: "ui5-hidden-text", children: this._resizeHandleAriaDescribedByText })] })] }));
}
//# sourceMappingURL=PopoverTemplate.js.map