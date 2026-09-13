import { jsx as _jsx, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Icon from "./Icon.js";
import IconDesign from "./types/IconDesign.js";
export default function TableRowActionBaseTemplate() {
    return (_jsx(_Fragment, { children: this.invisible ?
            _jsx("div", {})
            :
                this._isInteractive ?
                    _jsx(Button, { icon: this._icon, tooltip: this._text, onClick: this._onActionClick, design: ButtonDesign.Transparent })
                    :
                        _jsx(Icon, { name: this._icon, accessibleName: this._text, showTooltip: true, design: IconDesign.NonInteractive }) }));
}
//# sourceMappingURL=TableRowActionBaseTemplate.js.map