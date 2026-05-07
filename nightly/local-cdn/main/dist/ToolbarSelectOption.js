var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toolbar-select-option` component defines the content of an option in the `ui5-toolbar-select`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.17.0
 */
let ToolbarSelectOption = class ToolbarSelectOption extends UI5Element {
    /**
     * Defines the selected state of the component.
     * @default false
     * @public
     */
    set selected(value) {
        if (value) {
            this.setAttribute("selected", "");
            this._clearSiblingsAndSync();
        }
        else {
            this.removeAttribute("selected");
        }
    }
    get selected() {
        return this.hasAttribute("selected");
    }
    _clearSiblingsAndSync() {
        const parent = this.parentElement;
        if (parent) {
            parent.options?.forEach(option => {
                if (option !== this) {
                    option.removeAttribute("selected");
                }
            });
            if (parent.select) {
                parent.select.value = this.textContent || "";
            }
        }
    }
};
__decorate([
    property({ type: Boolean })
], ToolbarSelectOption.prototype, "selected", null);
__decorate([
    slot({ type: Node, "default": true, invalidateOnChildChange: true })
], ToolbarSelectOption.prototype, "text", void 0);
ToolbarSelectOption = __decorate([
    customElement("ui5-toolbar-select-option")
], ToolbarSelectOption);
ToolbarSelectOption.define();
export default ToolbarSelectOption;
//# sourceMappingURL=ToolbarSelectOption.js.map