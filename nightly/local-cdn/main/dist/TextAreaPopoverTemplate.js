import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import Popover from "./Popover.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
const IconPerValueState = {
    Negative: error,
    Critical: alert,
    Positive: sysEnter2,
    Information: information,
};
export default function TextAreaPopoverTemplate() {
    return (_jsx(_Fragment, { children: this.displayValueStateMessagePopover &&
            _jsx(Popover, { preventFocusRestore: true, hideArrow: true, preventInitialFocus: true, class: "ui5-valuestatemessage-popover", style: { "max-width": `${this._width}px` }, placement: "Bottom", horizontalAlign: PopoverHorizontalAlign.Start, children: _jsxs("div", { slot: "header", class: {
                        "ui5-valuestatemessage-root": true,
                        ...this.classes.valueStateMsg,
                    }, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: valueStateIcon.call(this) }), valueStateMessage.call(this)] }) }) }));
}
function valueStateMessage() {
    return this.hasCustomValueState ? _jsx("slot", { name: "valueStateMessage" }) : this.valueStateDefaultText;
}
function valueStateIcon() {
    return this.valueState !== ValueState.None ? IconPerValueState[this.valueState] : "";
}
//# sourceMappingURL=TextAreaPopoverTemplate.js.map