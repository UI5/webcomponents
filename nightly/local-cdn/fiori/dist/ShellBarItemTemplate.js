import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
export default function ShellBarItemTemplate() {
    if (this.inOverflow) {
        return (_jsx(ListItemStandard, { icon: this.icon ? `sap-icon://${this.icon}` : "", type: "Active", "data-count": this.count, "data-ui5-stable": this.stableDomRef, accessibilityAttributes: this.accessibilityAttributes, children: this.text }));
    }
    return (_jsx(Button, { class: "ui5-shellbar-action-button", icon: this.icon, design: "Transparent", accessibleName: this.text, "data-ui5-stable": this.stableDomRef, accessibilityAttributes: this.accessibilityAttributes, onClick: this.fireClickEvent, children: this.count && (_jsx(ButtonBadge, { slot: "badge", design: "OverlayText", text: this.count })) }));
}
//# sourceMappingURL=ShellBarItemTemplate.js.map