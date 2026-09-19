import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";
export default function TableHeaderCellActionBaseTemplate() {
    return (_jsx(Button, { icon: this._icon, tooltip: this._tooltip, onClick: this._onClick, design: ButtonDesign.Transparent }));
}
//# sourceMappingURL=TableHeaderCellActionBaseTemplate.js.map