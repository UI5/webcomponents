import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
export default function FileUploaderPopoverTemplate() {
    return (_jsx(Popover, { preventInitialFocus: true, preventFocusRestore: true, hideArrow: true, placement: "Bottom", horizontalAlign: "Start", class: "ui5-valuestatemessage-popover", children: _jsxs("div", { slot: "header", class: {
                "ui5-valuestatemessage-root": true,
                "ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
                "ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
                "ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
                "ui5-valuestatemessage--information": this.valueState === ValueState.Information,
            }, style: { width: `${this._formWidth}px` }, children: [this._valueStateMessageInputIcon &&
                    _jsx(Icon, { class: "ui5-input-value-state-message-icon", name: this._valueStateMessageInputIcon }), valueStateMessage.call(this)] }) }));
}
function valueStateMessage() {
    return (_jsx(_Fragment, { children: this.shouldDisplayDefaultValueStateMessage ? this.valueStateText : _jsx("slot", { name: "valueStateMessage" }) }));
}
//# sourceMappingURL=FileUploaderPopoverTemplate.js.map