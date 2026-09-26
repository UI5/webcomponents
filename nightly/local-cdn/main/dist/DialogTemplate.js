import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import resizeCorner from "@ui5/webcomponents-icons/dist/resize-corner.js";
import PopupTemplate from "./PopupTemplate.js";
import Title from "./Title.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
export default function DialogTemplate() {
    return PopupTemplate.call(this, {
        beforeContent,
        afterContent,
    });
}
function beforeContent() {
    return (_jsx(_Fragment, { children: !!this._displayHeader &&
            _jsxs("div", { class: "ui5-popup-header-root", id: "ui5-popup-header", role: "region", "aria-label": this._headerAriaLabel, onMouseDown: this._onDragMouseDown, onDblClick: this._showFullscreenButton ? this._onHeaderDblClick : undefined, part: "header", children: [this.hasValueState &&
                        _jsx(Icon, { class: "ui5-dialog-value-state-icon", name: this._dialogStateIcon }), this.header.length ?
                        _jsx("slot", { name: "header" })
                        :
                            _jsx(Title, { level: "H1", id: "ui5-popup-header-text", class: "ui5-popup-header-text", children: this.headerText }), this._showFullscreenButton &&
                        _jsx(Button, { class: "ui5-dialog-fullscreen-btn", icon: this._fullscreenButtonIcon, design: "Transparent", tooltip: this._fullscreenButtonTooltip, accessibleName: this._fullscreenButtonTooltip, accessibilityAttributes: this._fullscreenButtonAccessibilityAttributes, onClick: this._toggleFullscreen })] }) }));
}
function afterContent() {
    return (_jsxs(_Fragment, { children: [!!this.footer.length &&
                _jsx("div", { class: "ui5-popup-footer-root", role: "region", "aria-label": this._footerAriaLabel, part: "footer", children: _jsx("slot", { name: "footer" }) }), this._showResizeHandle &&
                _jsx("div", { class: "ui5-popup-resize-handle", onMouseDown: this._onResizeMouseDown, title: this._resizeHandleTooltip, children: _jsx(Icon, { name: resizeCorner }) }), this._movable &&
                _jsxs(_Fragment, { children: [_jsx("span", { id: `${this._id}-dragResizeHandler`, class: "ui5-popup-drag-resize-handler ui5-hidden-text", tabIndex: this._dragResizeHandleTabIndex, role: "img", "aria-roledescription": this._dragResizeHandleAriaRoleDescription, "aria-label": this._dragResizeHandleAriaLabel, "aria-describedby": this._dragResizeHandleAriaDescribedBy, onKeyDown: this._onDragOrResizeKeyDown }), this.ariaDescribedByHandlerText &&
                            _jsx("span", { id: `${this._id}-descr`, "aria-hidden": "true", class: "ui5-hidden-text", children: this.ariaDescribedByHandlerText }), this.dialogAriaDescribedByText &&
                            _jsx("span", { id: `${this._id}-dialog-descr`, "aria-hidden": "true", class: "ui5-hidden-text", children: this.dialogAriaDescribedByText })] })] }));
}
//# sourceMappingURL=DialogTemplate.js.map