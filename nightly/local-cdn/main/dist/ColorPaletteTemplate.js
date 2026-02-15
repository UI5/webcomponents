import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Button from "./Button.js";
import ColorPaletteItem from "./ColorPaletteItem.js";
export default function ColorPaletteTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: {
                    "ui5-cp-root": true,
                    "ui5-cp-root-phone": isPhone(),
                }, onClick: this._onclick, onKeyUp: this._onkeyup, onKeyDown: this._onkeydown, onMouseDown: this._onmousedown, children: [this.showDefaultColor &&
                        _jsxs("div", { class: "ui5-cp-default-color-button-wrapper", children: [_jsx(Button, { class: "ui5-cp-default-color-button", design: "Transparent", onClick: this._onDefaultColorClick, onKeyUp: this._onDefaultColorKeyUp, onKeyDown: this._onDefaultColorKeyDown, children: this.colorPaletteDefaultColorText }), _jsx("div", { class: "ui5-cp-separator" })] }), _jsx("div", { class: "ui5-cp-item-container", role: "group", "aria-label": this.colorContainerLabel, onKeyDown: this._onColorContainerKeyDown, children: this.displayedColors.map(color => _jsx("slot", { name: color._individualSlot })) }), this.showMoreColors &&
                        _jsxs("div", { class: "ui5-cp-more-colors-wrapper", children: [_jsx("div", { class: "ui5-cp-separator" }), _jsx(Button, { design: "Transparent", class: "ui5-cp-more-colors", onClick: this._openMoreColorsDialog, onKeyDown: this._onMoreColorsKeyDown, children: this.colorPaletteMoreColorsText })] }), this.showRecentColors &&
                        _jsxs("div", { class: "ui5-cp-recent-colors-wrapper", children: [_jsx("div", { class: "ui5-cp-separator" }), _jsx("div", { class: "ui5-cp-recent-colors-container", onKeyDown: this._onRecentColorsContainerKeyDown, children: this.recentColors.map(color => _jsx(ColorPaletteItem, { value: color })) })] })] }), this.showMoreColors && this.showMoreColorsTemplate?.call(this)] }));
}
//# sourceMappingURL=ColorPaletteTemplate.js.map