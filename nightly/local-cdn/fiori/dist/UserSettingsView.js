var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, slotStrict as slot } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UserSettingsViewTemplate from "./UserSettingsViewTemplate.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-view` represents a view displayed in the `ui5-user-settings-item`.
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.8.0
 */
let UserSettingsView = class UserSettingsView extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the view is selected. There can be just one selected view at a time.
         *
         * @default false
         * @public
         */
        this.selected = false;
        /**
         * Indicates whether the view is secondary. It is relevant only if the view is used in `pages` slot of `ui5-user-settings-item`
         * and controls the visibility of the back button.
         * @default false
         * @public
         */
        this.secondary = false;
    }
};
__decorate([
    property()
], UserSettingsView.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsView.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsView.prototype, "secondary", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
    })
], UserSettingsView.prototype, "content", void 0);
UserSettingsView = __decorate([
    customElement({
        tag: "ui5-user-settings-view",
        renderer: jsxRenderer,
        template: UserSettingsViewTemplate,
        styles: [UserSettingViewCss],
    })
], UserSettingsView);
UserSettingsView.define();
export default UserSettingsView;
//# sourceMappingURL=UserSettingsView.js.map