var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import ListItemBase from "./ListItemBase.js";
// Template
import SuggestionItemCustomTemplate from "./SuggestionItemCustomTemplate.js";
// styles
import styles from "./generated/themes/SuggestionItemCustom.css.js";
/**
 * @class
 * The `ui5-suggestion-item-custom` is type of suggestion item,
 * that can be used to place suggestion items with custom content in the input.
 * The text property is considered only for autocomplete.
 * In case the user needs highlighting functionality, check "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js"
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @implements { IInputSuggestionItemSelectable }
 * @since 2.0.0
 */
let SuggestionItemCustom = class SuggestionItemCustom extends ListItemBase {
    get _effectiveTabIndex() {
        return -1;
    }
};
__decorate([
    property()
], SuggestionItemCustom.prototype, "text", void 0);
__decorate([
    slot({ type: Node, "default": true, invalidateOnChildChange: true })
], SuggestionItemCustom.prototype, "content", void 0);
SuggestionItemCustom = __decorate([
    customElement({
        tag: "ui5-suggestion-item-custom",
        template: SuggestionItemCustomTemplate,
        styles: [
            ListItemBase.styles,
            styles,
        ],
    })
], SuggestionItemCustom);
SuggestionItemCustom.define();
export default SuggestionItemCustom;
//# sourceMappingURL=SuggestionItemCustom.js.map