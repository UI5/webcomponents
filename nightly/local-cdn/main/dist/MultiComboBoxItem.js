var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MultiComboBoxItem_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { property, eventStrict as event, } from "@ui5/webcomponents-base/dist/decorators.js";
import ComboBoxItem from "./ComboBoxItem.js";
import CheckBox from "./CheckBox.js";
import { ARIA_LABEL_LIST_ITEM_CHECKBOX, } from "./generated/i18n/i18n-defaults.js";
import styles from "./generated/themes/MultiComboBoxItem.css.js";
import MultiComboBoxItemTemplate from "./MultiComboBoxItemTemplate.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
/**
 * @class
 * The `ui5-mcb-item` represents the item for a `ui5-multi-combobox`.
 * @constructor
 * @extends ComboBoxItem
 * @implements {IMultiComboBoxItem}
 * @public
 */
let MultiComboBoxItem = MultiComboBoxItem_1 = class MultiComboBoxItem extends ComboBoxItem {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the item is filtered
         * @private
         */
        this._isVisible = false;
        this._readonly = false;
    }
    get isMultiComboBoxItem() {
        return true;
    }
    _onclick(e) {
        if (e.target?.hasAttribute("ui5-checkbox")) {
            return this.fireDecoratorEvent("selection-requested", { item: this, selected: e.target.checked, selectionComponentPressed: true });
        }
        super._onclick(e);
    }
    get _accessibleName() {
        return MultiComboBoxItem_1.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX);
    }
    get checkBoxAccInfo() {
        return {
            role: "presentation",
        };
    }
};
__decorate([
    property({ type: Boolean })
], MultiComboBoxItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBoxItem.prototype, "_isVisible", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBoxItem.prototype, "_readonly", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], MultiComboBoxItem, "i18nBundle", void 0);
MultiComboBoxItem = MultiComboBoxItem_1 = __decorate([
    customElement({
        tag: "ui5-mcb-item",
        template: MultiComboBoxItemTemplate,
        styles: [ComboBoxItem.styles, styles],
        dependencies: [...ComboBoxItem.dependencies, CheckBox],
    }),
    event("selection-requested", {
        bubbles: true,
    })
], MultiComboBoxItem);
MultiComboBoxItem.define();
export default MultiComboBoxItem;
export const isInstanceOfMultiComboBoxItem = createInstanceChecker("isMultiComboBoxItem");
//# sourceMappingURL=MultiComboBoxItem.js.map