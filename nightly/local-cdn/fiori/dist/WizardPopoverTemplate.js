import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
export default function WizardPopoverTemplate() {
    return (_jsxs(ResponsivePopover, { horizontalAlign: "Center", placement: "Bottom", "aria-label": this.actionSheetStepsText, class: {
            "ui5-wizard-responsive-popover": true,
            "ui5-wizard-popover": !isPhone(),
            "ui5-wizard-dialog": isPhone(),
        }, contentOnlyOnDesktop: true, preventFocusRestore: true, _hideHeader: true, children: [_jsx("ul", { class: "ui5-wizard-responsive-popover-list", children: this._groupedTabs.map(tab => _jsx("li", { children: _jsx(Button, { icon: tab.icon, disabled: tab.disabled, design: "Transparent", "data-ui5-header-tab-ref-id": tab.accInfo.ariaPosinset, onClick: this._onOverflowStepButtonClick, children: tab.titleText }) })) }), _jsx("div", { slot: "footer", class: "ui5-responsive-popover-footer", children: _jsx(Button, { design: "Transparent", onClick: this._closeRespPopover, children: this._dialogCancelButtonText }) })] }));
}
//# sourceMappingURL=WizardPopoverTemplate.js.map