import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import AvatarSize from "./types/AvatarSize.js";
export default function AvatarGroupTemplate() {
    return (_jsx("div", { class: "ui5-avatar-group-root", children: _jsxs("div", { class: "ui5-avatar-group-items", role: this._role, tabindex: this._groupTabIndex, "aria-label": this._ariaLabelText, "aria-haspopup": this._containerAriaHasPopup, onClick: this._onClick, onKeyUp: this._onkeyup, onKeyDown: this._onkeydown, onFocusIn: this._onfocusin, children: [_jsx("slot", { onClick: this.onAvatarClick, "onui5-click": this.onAvatarUI5Click }), this._customOverflowButton ?
                    // @ts-expect-error
                    _jsx("slot", { onClick: this.onOverflowButtonClick, name: "overflowButton" })
                    :
                        _jsx(Button, { onClick: this.onOverflowButtonClick, accessibilityAttributes: this._overflowButtonAccAttributes, accessibleName: this._overflowButtonAriaLabelText, hidden: this._overflowBtnHidden, nonInteractive: this._isGroup, class: {
                                "ui5-avatar-group-overflow-btn": true,
                                "ui5-avatar-group-overflow-btn-xs": this.firstAvatarSize === AvatarSize.XS,
                                "ui5-avatar-group-overflow-btn-s": this.firstAvatarSize === AvatarSize.S,
                                "ui5-avatar-group-overflow-btn-m": this.firstAvatarSize === AvatarSize.M,
                                "ui5-avatar-group-overflow-btn-l": this.firstAvatarSize === AvatarSize.L,
                                "ui5-avatar-group-overflow-btn-xl": this.firstAvatarSize === AvatarSize.XL,
                            }, children: this._overflowButtonText })] }) }));
}
//# sourceMappingURL=AvatarGroupTemplate.js.map