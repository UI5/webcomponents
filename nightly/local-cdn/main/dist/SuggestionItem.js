var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import ListItemBase from "./ListItemBase.js";
import SuggestionItemTemplate from "./SuggestionItemTemplate.js";
import styles from "./generated/themes/SuggestionItem.css.js";
/**
 * @class
 * The `ui5-suggestion-item` represents the suggestion item of the `ui5-input`.
 * @constructor
 * @extends ListItemBase
 * @abstract
 * @implements { IInputSuggestionItemSelectable }
 * @public
 */
let SuggestionItem = class SuggestionItem extends ListItemBase {
    constructor() {
        super(...arguments);
        /**
         * Defines the markup text that will be displayed as suggestion.
         * Used for highlighting the matching parts of the text.
         *
         * @since 2.0.0
         * @private
         */
        this.markupText = "";
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    get _effectiveTabIndex() {
        return -1;
    }
};
__decorate([
    property()
], SuggestionItem.prototype, "text", void 0);
__decorate([
    property()
], SuggestionItem.prototype, "additionalText", void 0);
__decorate([
    property()
], SuggestionItem.prototype, "markupText", void 0);
SuggestionItem = __decorate([
    customElement({
        tag: "ui5-suggestion-item",
        template: SuggestionItemTemplate,
        styles: [ListItemBase.styles, styles],
    })
], SuggestionItem);
SuggestionItem.define();
export default SuggestionItem;
//# sourceMappingURL=SuggestionItem.js.map