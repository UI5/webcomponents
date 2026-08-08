import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
export default function BarcodeScannerDialogTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs(Dialog, { stretch: true, class: "ui5-barcode-scanner-dialog-root", open: this._open, onClose: this._closeDialog, children: [_jsx("slot", { name: "header" }), _jsxs("div", { class: "ui5-barcode-scanner-dialog-video-wrapper", children: [_jsx("video", { autoplay: true, playsinline: true, muted: true, class: "ui5-barcode-scanner-dialog-video" }), _jsx("canvas", { class: "ui5-barcode-scanner-dialog-overlay" })] }), _jsx("slot", { name: "footer", class: "ui5-barcode-scanner-dialog-footer", children: _jsx(Button, { design: "Transparent", onClick: this._closeDialog, children: this._cancelButtonText }) })] }), _jsx(BusyIndicator, { class: "ui5-barcode-scanner-dialog-busy", active: this.loading, size: "L", text: this._busyIndicatorText })] }));
}
//# sourceMappingURL=BarcodeScannerDialogTemplate.js.map