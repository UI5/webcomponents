var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import ListItemGroup from "./ListItemGroup.js";
import ListBoxItemGroupTemplate from "./ListBoxItemGroupTemplate.js";
/**
 * @class
 * The `ui5-suggestion-item-group` is type of suggestion item,
 * that can be used to split the `ui5-input` suggestions into groups.
 * @constructor
 * @extends ListItemGroup
 * @public
 * @since 2.0.0
 */
let SuggestionItemGroup = class SuggestionItemGroup extends ListItemGroup {
};
__decorate([
    slot({
        "default": true,
        invalidateOnChildChange: true,
        type: HTMLElement,
    })
], SuggestionItemGroup.prototype, "items", void 0);
SuggestionItemGroup = __decorate([
    customElement({
        tag: "ui5-suggestion-item-group",
        template: ListBoxItemGroupTemplate,
    })
], SuggestionItemGroup);
SuggestionItemGroup.define();
export default SuggestionItemGroup;
//# sourceMappingURL=SuggestionItemGroup.js.map