import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "../Button.js";
import Dialog from "../Dialog.js";
import ColorPicker from "../ColorPicker.js";
export default function ColorPaletteMoreColorsTemplate() {
    return (_jsxs(Dialog, { open: this.dialogOpen, headerText: this.colorPaletteDialogTitle, onClose: this._closeDialog, children: [_jsx("div", { class: "ui5-cp-dialog-content", children: _jsx(ColorPicker, { value: this.colorPickerValue, onChange: this.onColorPickerChange }) }), _jsxs("div", { slot: "footer", class: "ui5-cp-dialog-footer", children: [_jsx(Button, { design: "Emphasized", onClick: this._chooseCustomColor, children: this.colorPaletteDialogOKButton }), _jsx(Button, { design: "Transparent", onClick: this._closeDialog, children: this.colorPaletteCancelButton })] })] }));
}
//# sourceMappingURL=ColorPaletteMoreColorsTemplate.js.map