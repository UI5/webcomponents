var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ListItemGroup from "@ui5/webcomponents/dist/ListItemGroup.js";
import SearchItemGroupCss from "./generated/themes/SearchItemGroup.css.js";
import ListBoxItemGroupTemplate from "@ui5/webcomponents/dist/ListBoxItemGroupTemplate.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";
/**
 * @class
 * The `ui5-search-item-group` is type of suggestion item,
 * that can be used to split the `ui5-search-item` suggestions into groups.
 * @constructor
 * @extends ListItemGroup
 * @public
 * @since 2.9.0
 * @experimental
 */
let SearchItemGroup = class SearchItemGroup extends ListItemGroup {
    get isGroupItem() {
        return true;
    }
    getGroupHeaderWrapping() {
        return WrappingType.Normal;
    }
};
SearchItemGroup = __decorate([
    customElement({
        tag: "ui5-search-item-group",
        styles: [
            ListItemGroup.styles,
            SearchItemGroupCss,
        ],
        template: ListBoxItemGroupTemplate,
    })
], SearchItemGroup);
SearchItemGroup.define();
export default SearchItemGroup;
//# sourceMappingURL=SearchItemGroup.js.map