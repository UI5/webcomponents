import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import SplitButton from "@ui5/webcomponents/dist/SplitButton.js";
export default function ButtonTemplate() {
    return (_jsxs(_Fragment, { children: [_jsx(SplitButton, { class: "ui5-ai-button-inner", design: this.design, icon: this._stateIcon, disabled: this.disabled, _endIcon: this._stateEndIcon, _hideArrowButton: this._hideArrowButton, onClick: this._onClick, onArrowClick: this._onArrowClick, accessibilityAttributes: this._computedAccessibilityAttributes, children: this._hasText && (_jsx("div", { class: "ui5-ai-button-text", children: this._stateText })) }), _jsx(SplitButton, { class: "ui5-ai-button-hidden", design: this.design })] }));
}
//# sourceMappingURL=ButtonTemplate.js.map