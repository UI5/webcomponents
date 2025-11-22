import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import InputTemplate from "./InputTemplate.js";
import Tokenizer from "./Tokenizer.js";
import valueHelp from "@ui5/webcomponents-icons/dist/value-help.js";
export default function MultiInputTemplate() {
    return [
        InputTemplate.call(this, { preContent, postContent }),
    ];
}
function preContent() {
    return (_jsxs(_Fragment, { children: [_jsx("span", { id: "hiddenText-nMore", class: "ui5-hidden-text", children: this._tokensCountText }), this.showValueHelpIcon &&
                _jsx("span", { id: "hiddenText-value-help", class: "ui5-hidden-text", children: this._valueHelpText }), _jsx(Tokenizer, { class: "ui5-multi-input-tokenizer", opener: this.morePopoverOpener, popoverMinWidth: this._inputWidth, hidePopoverArrow: true, expanded: this.tokenizerExpanded, onKeyDown: this._onTokenizerKeydown, onTokenDelete: this.tokenDelete, onFocusOut: this._tokenizerFocusOut, onShowMoreItemsPress: this._showMoreItemsPress, children: this.tokens.map(token => _jsx("slot", { name: token._individualSlot })) })] }));
}
function postContent() {
    return (_jsx(_Fragment, { children: this.showValueHelpIcon &&
            _jsx(Icon, { class: "inputIcon", name: valueHelp, accessibleName: this.valueHelpLabel, onMouseUp: this.valueHelpMouseUp, onMouseDown: this.valueHelpMouseDown, onClick: this.valueHelpPress }) }));
}
//# sourceMappingURL=MultiInputTemplate.js.map