var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import ListItemBase from "./ListItemBase.js";
import ComboBoxItemCustomTemplate from "./ComboBoxItemCustomTemplate.js";
import styles from "./generated/themes/ComboBoxItemCustom.css.js";
/**
 * @class
 * The `ui5-cb-item-custom` is a combobox item component
 * that allows placing custom content inside a combobox item.
 * The `text` property is used for filtering and auto-complete.
 * For highlighting functionality, see `@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js`.
 *
 * @constructor
 * @extends ListItemBase
 * @implements {IComboBoxItem}
 * @public
 * @since 2.24.0
 */
let ComboBoxItemCustom = class ComboBoxItemCustom extends ListItemBase {
    constructor() {
        super(...arguments);
        /**
         * Indicates whether the item is filtered.
         * @private
         */
        this._isVisible = false;
        /**
         * Indicates whether the item is focused.
         * @protected
         */
        this.focused = false;
    }
    get _effectiveTabIndex() {
        return -1;
    }
};
__decorate([
    property()
], ComboBoxItemCustom.prototype, "text", void 0);
__decorate([
    property()
], ComboBoxItemCustom.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], ComboBoxItemCustom.prototype, "_isVisible", void 0);
__decorate([
    property({ type: Boolean })
], ComboBoxItemCustom.prototype, "focused", void 0);
__decorate([
    slot({ type: Node, "default": true, invalidateOnChildChange: true })
], ComboBoxItemCustom.prototype, "content", void 0);
ComboBoxItemCustom = __decorate([
    customElement({
        tag: "ui5-cb-item-custom",
        template: ComboBoxItemCustomTemplate,
        styles: [
            ListItemBase.styles,
            styles,
        ],
    })
    /**
     * Fired when the component is activated either with a mouse/tap or by using the Enter or Space key.
     *
     * **Note:** The event will not be fired if the `disabled` property is set to `true`.
     *
     * @since 2.24.0
     * @public
     * @param {Event} originalEvent The original event from the user interaction.
     */
    ,
    event("click", {
        bubbles: true,
    })
], ComboBoxItemCustom);
ComboBoxItemCustom.define();
export default ComboBoxItemCustom;
//# sourceMappingURL=ComboBoxItemCustom.js.map