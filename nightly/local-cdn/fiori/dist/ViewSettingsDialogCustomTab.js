var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ViewSettingsDialogCustomTabTemplate from "./ViewSettingsDialogCustomTabTemplate.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-view-settings-dialog-custom-tab` component allows defining custom tabs for the `ui5-view-settings-dialog`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/ViewSettingsDialogCustomTab.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.22.0
 * @public
 * @abstract
 * @slot {Node[]} default - Defines the custom tab content.
 */
let ViewSettingsDialogCustomTab = class ViewSettingsDialogCustomTab extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the title of the custom tab.
         *
         * **Note:** It is displayed in the dialog header when this tab is selected.
         * @default ""
         * @public
         */
        this.title = "";
        /**
         * Defines the tooltip of the custom tab button.
         *
         * **Note:** It is shown on the segmented button item.
         * @default ""
         * @public
         */
        this.tooltip = "";
        /**
         * Defines the icon of the custom tab.
         *
         * **Note:** If not provided, the tab should not be rendered.
         * @default ""
         * @public
         */
        this.icon = "";
    }
};
__decorate([
    property({ type: String })
], ViewSettingsDialogCustomTab.prototype, "title", void 0);
__decorate([
    property({ type: String })
], ViewSettingsDialogCustomTab.prototype, "tooltip", void 0);
__decorate([
    property({ type: String })
], ViewSettingsDialogCustomTab.prototype, "icon", void 0);
__decorate([
    slot({ type: Node, "default": true })
], ViewSettingsDialogCustomTab.prototype, "content", void 0);
ViewSettingsDialogCustomTab = __decorate([
    customElement({
        tag: "ui5-view-settings-dialog-custom-tab",
        renderer: jsxRenderer,
        template: ViewSettingsDialogCustomTabTemplate,
    })
], ViewSettingsDialogCustomTab);
ViewSettingsDialogCustomTab.define();
export default ViewSettingsDialogCustomTab;
//# sourceMappingURL=ViewSettingsDialogCustomTab.js.map