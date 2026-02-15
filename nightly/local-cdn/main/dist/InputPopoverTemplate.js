import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import Popover from "./Popover.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
export default function InputPopoverTemplate(hooks) {
    const suggestionsList = hooks?.suggestionsList;
    const mobileHeader = hooks?.mobileHeader;
    return (_jsxs(_Fragment, { children: [this._effectiveShowSuggestions && this.Suggestions?.template.call(this, {
                suggestionsList,
                mobileHeader,
                valueStateMessage,
                valueStateMessageInputIcon
            }), this.hasValueStateMessage && (_jsx(Popover, { preventInitialFocus: true, preventFocusRestore: true, hideArrow: true, class: "ui5-valuestatemessage-popover", placement: "Bottom", tabindex: -1, horizontalAlign: PopoverHorizontalAlign.Start, opener: this, open: this.valueStateOpen, onClose: this._handleValueStatePopoverAfterClose, children: _jsxs("div", { slot: "header", class: this.classes.popoverValueState, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: valueStateMessageInputIcon.call(this) }), this.valueStateOpen && valueStateMessage.call(this)] }) }))] }));
}
function valueStateMessage() {
    return (_jsx(_Fragment, { children: this.shouldDisplayDefaultValueStateMessage ? this.valueStateText : _jsx("slot", { name: "valueStateMessage" }) }));
}
function valueStateMessageInputIcon() {
    const iconPerValueState = {
        Negative: error,
        Critical: alert,
        Positive: sysEnter2,
        Information: information,
    };
    return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
}
//# sourceMappingURL=InputPopoverTemplate.js.map