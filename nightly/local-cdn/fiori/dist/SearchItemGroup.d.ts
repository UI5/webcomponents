import ListItemGroup from "@ui5/webcomponents/dist/ListItemGroup.js";
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
declare class SearchItemGroup extends ListItemGroup {
    get isGroupItem(): boolean;
    getGroupHeaderWrapping(): WrappingType;
}
export default SearchItemGroup;
