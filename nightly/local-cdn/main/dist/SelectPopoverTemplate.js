import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import List from "./List.js";
import Button from "./Button.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import Title from "./Title.js";
export default function SelectPopoverTemplate() {
    return (_jsxs(_Fragment, { children: [this.options.length > 0 &&
                _jsxs(ResponsivePopover, { id: this.responsivePopoverId, class: {
                        "ui5-select-popover": true,
                        ...this.classes.popover
                    }, part: "popover", style: this.styles.responsivePopover, placement: "Bottom", horizontalAlign: "Start", hideArrow: true, preventInitialFocus: true, onOpen: this._afterOpen, onBeforeOpen: this._beforeOpen, onClose: this._afterClose, onKeyDown: this._onkeydown, accessibleName: this._isPhone ? this._headerTitleText : undefined, children: [this._isPhone &&
                            _jsxs("div", { slot: "header", class: "ui5-responsive-popover-header", children: [_jsxs("div", { class: "row", children: [_jsx(Title, { children: this._headerTitleText }), _jsx(Button, { class: "ui5-responsive-popover-close-btn", icon: decline, design: "Transparent", onClick: this._toggleRespPopover })] }), this.hasValueStateText &&
                                        _jsx("div", { class: {
                                                "row": true,
                                                "ui5-select-value-state-dialog-header": true,
                                                ...this.classes.popoverValueState
                                            }, children: this._isPickerOpen && valueStateMessage.call(this) })] }), !this._isPhone && this.hasValueStateText &&
                            _jsxs("div", { class: this.classes.popoverValueState, style: this.styles.responsivePopoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: this._valueStateMessageInputIcon }), this._isPickerOpen && valueStateMessage.call(this)] }), _jsx(List, { separators: "None", onMouseDown: this._itemMousedown, onItemClick: this._handleItemPress, accessibleRole: "ListBox", children: _jsx("slot", {}) })] }), this.shouldOpenValueStateMessagePopover &&
                _jsx(Popover, { part: "popover", class: "ui5-valuestatemessage-popover", preventInitialFocus: true, preventFocusRestore: true, hideArrow: true, placement: "Bottom", horizontalAlign: "Start", children: _jsxs("div", { class: this.classes.popoverValueState, style: this.styles.popoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: this._valueStateMessageInputIcon }), valueStateMessage.call(this)] }) })] }));
}
function valueStateMessage() {
    return (_jsx(_Fragment, { children: this.shouldDisplayDefaultValueStateMessage
            ? this.valueStateText
            : _jsx("slot", { onClick: this._applyFocus, name: "valueStateMessage" }) }));
}
//# sourceMappingURL=SelectPopoverTemplate.js.map