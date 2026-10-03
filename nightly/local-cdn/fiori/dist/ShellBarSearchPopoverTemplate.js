import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import SearchPopoverTemplate from "./SearchPopoverTemplate.js";
import SearchFieldTemplate from "./SearchFieldTemplate.js";
export default function ShellBarSearchPopoverTemplate() {
    return (SearchPopoverTemplate.call(this, ShellBarSearchDialogHeader));
}
function ShellBarSearchDialogHeader() {
    return (_jsx(_Fragment, { children: _jsxs("header", { slot: "header", class: "ui5-search-popup-searching-header", children: [_jsx("div", { class: "ui5-shellbar-search-field-wrapper", children: SearchFieldTemplate.call(this, { forceExpanded: true }) }), _jsx(Button, { design: ButtonDesign.Transparent, onClick: this._handleCancel, children: this.cancelButtonText })] }) }));
}
//# sourceMappingURL=ShellBarSearchPopoverTemplate.js.map