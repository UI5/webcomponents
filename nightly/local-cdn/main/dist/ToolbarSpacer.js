var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarCss from "./generated/themes/Toolbar.css.js";
import ToolbarItem from "./ToolbarItem.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-spacer` is an element, used for taking needed space for toolbar items to take 100% width.
 * It takes no space in calculating toolbar items width.
 * @constructor
 * @extends ToolbarItem
 * @abstract
 * @since 1.17.0
 * @public
 */
let ToolbarSpacer = class ToolbarSpacer extends ToolbarItem {
    get styles() {
        return this.width ? { width: this.width } : { flex: "auto" };
    }
    get ignoreSpace() {
        return this.width === "" || this.width === undefined || this.width === "auto";
    }
    get hasFlexibleWidth() {
        return this.width === "" || this.width === undefined || this.width === "auto";
    }
    get isInteractive() {
        return false;
    }
};
__decorate([
    property()
], ToolbarSpacer.prototype, "width", void 0);
ToolbarSpacer = __decorate([
    customElement({
        tag: "ui5-toolbar-spacer",
        styles: ToolbarCss,
    })
], ToolbarSpacer);
ToolbarSpacer.define();
export default ToolbarSpacer;
//# sourceMappingURL=ToolbarSpacer.js.map