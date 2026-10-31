import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import PopoverTemplate from "./PopoverTemplate.js";
import Dialog from "./Dialog.js";
import Title from "./Title.js";
import Button from "./Button.js";
export default function ResponsivePopoverTemplate() {
    if (!this._isPhone) {
        return PopoverTemplate.call(this);
    }
    return (_jsxs(Dialog, { "root-element": true, accessibleName: this.accessibleName, accessibleNameRef: this.accessibleNameRef, accessibleDescription: this.accessibleDescription, accessibleDescriptionRef: this.accessibleDescriptionRef, accessibleRole: this.accessibleRole, stretch: true, preventInitialFocus: this.preventInitialFocus, preventFocusRestore: this.preventFocusRestore, initialFocus: this.initialFocus, onBeforeOpen: this._beforeDialogOpen, onOpen: this._afterDialogOpen, onBeforeClose: this._beforeDialogClose, onClose: this._afterDialogClose, exportparts: "content, header, footer", open: this.open, children: [!this._hideHeader && _jsx(_Fragment, { children: this.header.length ?
                    _jsx("slot", { slot: "header", name: "header" })
                    :
                        _jsxs("div", { class: this.classes.header, slot: "header", children: [this.headerText &&
                                    _jsx(Title, { level: "H1", wrappingType: "None", class: "ui5-popup-header-text ui5-responsive-popover-header-text", children: this.headerText }), !this._hideCloseButton &&
                                    _jsx(Button, { icon: decline, design: "Transparent", accessibleName: this._closeDialogAriaLabel, onClick: this._dialogCloseButtonClick })] }) }), _jsx("slot", {}), _jsx("slot", { slot: "footer", name: "footer" })] }));
}
//# sourceMappingURL=ResponsivePopoverTemplate.js.map