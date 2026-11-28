var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MultiComboBoxItemCustom_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { property, eventStrict as event, } from "@ui5/webcomponents-base/dist/decorators.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import ListItemBase from "./ListItemBase.js";
import { ARIA_LABEL_LIST_ITEM_CHECKBOX, } from "./generated/i18n/i18n-defaults.js";
import styles from "./generated/themes/MultiComboBoxItemCustom.css.js";
import MultiComboBoxItemCustomTemplate from "./MultiComboBoxItemCustomTemplate.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
/**
 * @class
 * The `ui5-mcb-item-custom` is a multi-combobox item component
 * that allows placing custom content inside a multi-combobox item.
 * The `text` property is used for filtering and token display.
 * For highlighting functionality, see `@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js`.
 *
 * @constructor
 * @extends ListItemBase
 * @implements {IMultiComboBoxItem}
 * @public
 * @since 2.24.0
 */
let MultiComboBoxItemCustom = MultiComboBoxItemCustom_1 = class MultiComboBoxItemCustom extends ListItemBase {
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
        /**
         * @private
         */
        this._readonly = false;
    }
    get isMultiComboBoxItem() {
        return true;
    }
    get _effectiveTabIndex() {
        return -1;
    }
    _onclick(e) {
        if (e.target?.hasAttribute("ui5-checkbox")) {
            const checkboxCheckedState = e.target.checked;
            // The checkbox has already toggled itself, so use its current state
            return this.fireDecoratorEvent("selection-requested", { item: this, selected: checkboxCheckedState, selectionComponentPressed: true });
        }
        super._onclick(e);
    }
    get _accessibleName() {
        return MultiComboBoxItemCustom_1.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX);
    }
    get checkBoxAccInfo() {
        return {
            role: "presentation",
        };
    }
};
__decorate([
    property()
], MultiComboBoxItemCustom.prototype, "text", void 0);
__decorate([
    property()
], MultiComboBoxItemCustom.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBoxItemCustom.prototype, "_isVisible", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBoxItemCustom.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBoxItemCustom.prototype, "_readonly", void 0);
__decorate([
    slot({ type: Node, "default": true, invalidateOnChildChange: true })
], MultiComboBoxItemCustom.prototype, "content", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], MultiComboBoxItemCustom, "i18nBundle", void 0);
MultiComboBoxItemCustom = MultiComboBoxItemCustom_1 = __decorate([
    customElement({
        tag: "ui5-mcb-item-custom",
        template: MultiComboBoxItemCustomTemplate,
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
    }),
    event("selection-requested", {
        bubbles: true,
    })
], MultiComboBoxItemCustom);
MultiComboBoxItemCustom.define();
export default MultiComboBoxItemCustom;
export const isInstanceOfMultiComboBoxItemCustom = createInstanceChecker("isMultiComboBoxItem");
//# sourceMappingURL=MultiComboBoxItemCustom.js.map