var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import MultiComboBoxItemGroupTemplate from "./MultiComboBoxItemGroupTemplate.js";
import ComboBoxItemGroup from "./ComboBoxItemGroup.js";
/**
 * @class
 * The `ui5-mcb-item-group` is type of suggestion item,
 * that can be used to split the `ui5-multi-combobox` suggestions into groups.
 * @constructor
 * @extends ComboBoxItemGroup
 * @public
 * @implements {IMultiComboBoxItem}
 * @since 2.0.0
 */
let MultiComboBoxItemGroup = class MultiComboBoxItemGroup extends ComboBoxItemGroup {
    /**
     * Used to avoid tag name checks
     * @protected
     */
    get isGroupItem() {
        return true;
    }
    get selected() {
        return false;
    }
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
    getFocusDomRef() {
        return this.shadowRoot.querySelector("[ui5-li-group-header]");
    }
};
__decorate([
    slot({
        "default": true,
        invalidateOnChildChange: true,
        individualSlots: true,
        type: HTMLElement,
    })
], MultiComboBoxItemGroup.prototype, "items", void 0);
MultiComboBoxItemGroup = __decorate([
    customElement({
        tag: "ui5-mcb-item-group",
        template: MultiComboBoxItemGroupTemplate,
    })
], MultiComboBoxItemGroup);
MultiComboBoxItemGroup.define();
export default MultiComboBoxItemGroup;
export const isInstanceOfMultiComboBoxItemGroup = createInstanceChecker("isGroupItem");
//# sourceMappingURL=MultiComboBoxItemGroup.js.map