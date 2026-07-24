import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Title from "./Title.js";
import Button from "./Button.js";
import ColorPalette from "./ColorPalette.js";
import ResponsivePopover from "./ResponsivePopover.js";
export default function ColorPalettePopoverTemplate() {
    return (_jsxs(ResponsivePopover, { hideArrow: true, contentOnlyOnDesktop: true, placement: this.placement, opener: this.opener, open: this._open, onClose: this.onAfterClose, onOpen: this.onAfterOpen, accessibleName: this._colorPaletteTitle, children: [_jsx("div", { slot: "header", class: "ui5-cp-header", children: _jsx(Title, { level: "H1", wrappingType: "None", children: this._colorPaletteTitle }) }), _jsx("div", { children: _jsx(ColorPalette, { showMoreColors: this.showMoreColors, showRecentColors: this.showRecentColors, showDefaultColor: this.showDefaultColor, defaultColor: this.defaultColor, accessibleName: this.accessibleName, accessibleNameRef: this.accessibleNameRef, popupMode: true, onItemClick: this.onSelectedColor, children: this.colorPaletteColors.map(color => _jsx("slot", { name: color._individualSlot })) }) }), _jsx("div", { slot: "footer", class: "ui5-cp-footer", children: _jsx(Button, { design: "Transparent", onClick: this.closePopover, children: this._cancelButtonLabel }) })] }));
}
//# sourceMappingURL=ColorPalettePopoverTemplate.js.map