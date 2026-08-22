var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import ListItemGroup from "./ListItemGroup.js";
import ComboBoxItemGroupTemplate from "./ComboBoxItemGroupTemplate.js";
/**
 * @class
 * The `ui5-cb-group-item` is type of suggestion item,
 * that can be used to split the `ui5-combobox` suggestions into groups.
 * @constructor
 * @extends ListItemGroup
 * @abstract
 * @public
 * @implements {IComboBoxItem}
 * @since 1.0.0-rc.15
 */
let ComboBoxItemGroup = class ComboBoxItemGroup extends ListItemGroup {
    get isGroupItem() {
        return true;
    }
    get _isVisible() {
        return this.items.some(item => item._isVisible);
    }
};
__decorate([
    slot({
        "default": true,
        invalidateOnChildChange: true,
        individualSlots: true,
        type: HTMLElement,
    })
], ComboBoxItemGroup.prototype, "items", void 0);
ComboBoxItemGroup = __decorate([
    customElement({
        tag: "ui5-cb-item-group",
        template: ComboBoxItemGroupTemplate,
    })
], ComboBoxItemGroup);
ComboBoxItemGroup.define();
export const isInstanceOfComboBoxItemGroup = createInstanceChecker("isGroupItem");
export default ComboBoxItemGroup;
//# sourceMappingURL=ComboBoxItemGroup.js.map