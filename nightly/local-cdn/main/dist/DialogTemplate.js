import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import resizeCorner from "@ui5/webcomponents-icons/dist/resize-corner.js";
import PopupTemplate from "./PopupTemplate.js";
import Title from "./Title.js";
import Icon from "./Icon.js";
export default function DialogTemplate() {
    return PopupTemplate.call(this, {
        beforeContent,
        afterContent,
    });
}
function beforeContent() {
    return (_jsx(_Fragment, { children: !!this._displayHeader &&
            _jsx("header", { children: _jsxs("div", { class: "ui5-popup-header-root", id: "ui5-popup-header", role: "group", "aria-describedby": this.effectiveAriaDescribedBy, "aria-roledescription": this.ariaRoleDescriptionHeaderText, tabIndex: this._headerTabIndex, onKeyDown: this._onDragOrResizeKeyDown, onMouseDown: this._onDragMouseDown, part: "header", children: [this.hasValueState &&
                            _jsx(Icon, { class: "ui5-dialog-value-state-icon", name: this._dialogStateIcon }), this.header.length ?
                            _jsx("slot", { name: "header" })
                            :
                                _jsx(Title, { level: "H1", id: "ui5-popup-header-text", class: "ui5-popup-header-text", children: this.headerText }), this.resizable ?
                            this.draggable ?
                                _jsx("span", { id: `${this._id}-descr`, "aria-hidden": "true", class: "ui5-hidden-text", children: this.ariaDescribedByHeaderTextDraggableAndResizable })
                                :
                                    _jsx("span", { id: `${this._id}-descr`, "aria-hidden": "true", class: "ui5-hidden-text", children: this.ariaDescribedByHeaderTextResizable })
                            :
                                this.draggable &&
                                    _jsx("span", { id: `${this._id}-descr`, "aria-hidden": "true", class: "ui5-hidden-text", children: this.ariaDescribedByHeaderTextDraggable })] }) }) }));
}
function afterContent() {
    return (_jsxs(_Fragment, { children: [!!this.footer.length &&
                _jsx("footer", { class: "ui5-popup-footer-root", part: "footer", children: _jsx("slot", { name: "footer" }) }), this._showResizeHandle &&
                _jsx("div", { class: "ui5-popup-resize-handle", onMouseDown: this._onResizeMouseDown, children: _jsx(Icon, { name: resizeCorner }) })] }));
}
//# sourceMappingURL=DialogTemplate.js.map