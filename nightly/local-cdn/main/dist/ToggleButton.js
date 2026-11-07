var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import Button from "./Button.js";
import ToggleButtonTemplate from "./ToggleButtonTemplate.js";
// Styles
import toggleBtnCss from "./generated/themes/ToggleButton.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toggle-button` component is an enhanced `ui5-button`
 * that can be toggled between pressed and normal states.
 * Users can use the `ui5-toggle-button` as a switch to turn a setting on or off.
 * It can also be used to represent an independent choice similar to a check box.
 *
 * Clicking or tapping on a `ui5-toggle-button` changes its state to `pressed`. The button returns to
 * its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any `ui5-toggle-button`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ToggleButton.js";`
 * @constructor
 * @extends Button
 * @public
 */
let ToggleButton = class ToggleButton extends Button {
    constructor() {
        super(...arguments);
        /**
         * Determines whether the component is displayed as pressed.
         * @default false
         * @public
         */
        this.pressed = false;
    }
    _onclick(e) {
        e.stopImmediatePropagation();
        if (this.nonInteractive) {
            return;
        }
        const { altKey, ctrlKey, metaKey, shiftKey, } = e;
        const oldValue = this.pressed;
        this.pressed = !oldValue;
        const prevented = !this.fireDecoratorEvent("click", {
            originalEvent: e,
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
        });
        if (prevented) {
            e.preventDefault();
            // value should be restored if click is prevented
            this.pressed = oldValue;
            return;
        }
        if (isSafari()) {
            this.getDomRef().focus();
        }
    }
};
__decorate([
    property({ type: Boolean })
], ToggleButton.prototype, "pressed", void 0);
ToggleButton = __decorate([
    customElement({
        tag: "ui5-toggle-button",
        template: ToggleButtonTemplate,
        styles: [Button.styles, toggleBtnCss],
    })
], ToggleButton);
ToggleButton.define();
export default ToggleButton;
//# sourceMappingURL=ToggleButton.js.map