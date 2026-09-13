var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ListItemGroupBase` is the abstract base for grouping components. It provides the minimal
 * "group" contract shared by `ui5-li-group` and `ui5-option-group`: a header text, the default
 * items slot, and the plumbing the internal `ui5-list` relies on to flatten grouped items.
 *
 * Concrete group components extend this class and add only the public API that is relevant to them.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 * @since 2.26.0
 */
let ListItemGroupBase = class ListItemGroupBase extends UI5Element {
    get groupHeaderItem() {
        return this.shadowRoot.querySelector("[ui5-li-group-header]");
    }
    get isListItemGroup() {
        return true;
    }
};
__decorate([
    property()
], ListItemGroupBase.prototype, "headerText", void 0);
__decorate([
    slot({
        "default": true,
        invalidateOnChildChange: true,
        type: HTMLElement,
    })
], ListItemGroupBase.prototype, "items", void 0);
ListItemGroupBase = __decorate([
    customElement({
        renderer: jsxRenderer,
    })
], ListItemGroupBase);
export default ListItemGroupBase;
export const isInstanceOfListItemGroup = createInstanceChecker("isListItemGroup");
//# sourceMappingURL=ListItemGroupBase.js.map