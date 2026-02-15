var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ToolbarItem from "@ui5/webcomponents/dist/ToolbarItem.js";
import ToolbarLabelTemplate from "./ToolbarLabelTemplate.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-ai-toolbar-label` represents a text label,
 * used in the `ui5-toolbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-ai/dist/ToolbarLabel.js";`
 * @constructor
 * @extends ToolbarItem
 * @private
 * @since 1.0.0-rc.1
 */
let ToolbarLabel = class ToolbarLabel extends ToolbarItem {
    constructor() {
        super(...arguments);
        /**
         * Defines the text of the label.
         * @default ""
         * @public
         */
        this.text = "";
    }
    /**
     * @override
     * ToolbarLabel is not interactive.
     */
    get isInteractive() {
        return false;
    }
    /**
     * @override
     */
    get classes() {
        return {
            root: {
                ...super.classes.root,
                "ui5-ai-tb-label": true,
            },
        };
    }
};
__decorate([
    property()
], ToolbarLabel.prototype, "text", void 0);
ToolbarLabel = __decorate([
    customElement({
        tag: "ui5-ai-toolbar-label",
        template: ToolbarLabelTemplate,
        renderer: jsxRenderer,
    })
], ToolbarLabel);
ToolbarLabel.define();
export default ToolbarLabel;
//# sourceMappingURL=ToolbarLabel.js.map