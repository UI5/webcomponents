var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItemBase from "./ListItemBase.js";
import ComboBoxItemTemplate from "./ComboBoxItemTemplate.js";
import ComboboxItemCss from "./generated/themes/ComboBoxItem.css.js";
/**
 * @class
 * The `ui5-cb-item` represents the item for a `ui5-combobox`.
 * @constructor
 * @extends ListItemBase
 * @implements {IComboBoxItem}
 * @public
 */
let ComboBoxItem = class ComboBoxItem extends ListItemBase {
    constructor() {
        super(...arguments);
        /**
         * Indicates whether the item is filtered
         * @private
         */
        this._isVisible = false;
        /**
         * Indicates whether the item is focssed
         * @protected
         */
        this.focused = false;
        /**
         * Indicates whether the item is selected
         * @protected
         */
        this.selected = false;
        /**
         * Defines the markup text that will be displayed as suggestion.
         * Used for highlighting the matching parts of the text.
         *
         * @since 2.4.0
         * @private
         */
        this.markupText = "";
    }
};
__decorate([
    property()
], ComboBoxItem.prototype, "text", void 0);
__decorate([
    property()
], ComboBoxItem.prototype, "additionalText", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], ComboBoxItem.prototype, "_isVisible", void 0);
__decorate([
    property({ type: Boolean })
], ComboBoxItem.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean })
], ComboBoxItem.prototype, "selected", void 0);
__decorate([
    property()
], ComboBoxItem.prototype, "markupText", void 0);
ComboBoxItem = __decorate([
    customElement({
        tag: "ui5-cb-item",
        template: ComboBoxItemTemplate,
        styles: [ListItemBase.styles, ComboboxItemCss],
    })
], ComboBoxItem);
ComboBoxItem.define();
export default ComboBoxItem;
//# sourceMappingURL=ComboBoxItem.js.map