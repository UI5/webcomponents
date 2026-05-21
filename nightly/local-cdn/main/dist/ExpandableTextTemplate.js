import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Text from "./Text.js";
import Link from "./Link.js";
import Button from "./Button.js";
import ResponsivePopover from "./ResponsivePopover.js";
export default function ExpandableTextTemplate() {
    return (_jsxs("div", { children: [_jsx(Text, { class: "ui5-exp-text-text", emptyIndicatorMode: this.emptyIndicatorMode, children: this._displayedText }), this._maxCharactersExceeded && _jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-exp-text-ellipsis", children: this._ellipsisText }), _jsx(Link, { id: "toggle", class: "ui5-exp-text-toggle", accessibleRole: "Button", accessibleName: this._accessibleNameForToggle, accessibilityAttributes: this._accessibilityAttributesForToggle, onClick: this._handleToggleClick, children: this._textForToggle }), this._usePopover &&
                        _jsxs(ResponsivePopover, { open: this._expanded, opener: "toggle", accessibleNameRef: "popover-text", contentOnlyOnDesktop: true, _hideHeader: true, class: "ui5-exp-text-popover", onClose: this._handlePopoverClose, children: [_jsx(Text, { id: "popover-text", children: this.text }), _jsx("div", { slot: "footer", class: "ui5-exp-text-footer", children: _jsx(Button, { design: "Transparent", onClick: this._handleCloseButtonClick, children: this._closeButtonText }) })] })] })] }));
}
//# sourceMappingURL=ExpandableTextTemplate.js.map