import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type ListItemBase from "./ListItemBase.js";
import type { ListItemBaseClickEventDetail } from "./ListItemBase.js";
import type ListItemGroupHeader from "./ListItemGroupHeader.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ListItemGroupBase` is the abstract base for grouping components. It provides the minimal
 * "group" contract shared by `ui5-li-group` and `ui5-option-group`: a header text, the default
 * items slot, and the plumbing the internal `ui5-list` relies on to flatten grouped items.
 *
 * Concrete group components extend this class and add only the public API that is relevant to them.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 * @since 2.26.0
 */
declare class ListItemGroupBase extends UI5Element {
    eventDetails: {
        "click"?: ListItemBaseClickEventDetail;
    };
    /**
     * Defines the header text of the group.
     * @public
     * @default undefined
     */
    headerText?: string;
    /**
     * Defines the items of the group.
     * @public
     */
    items: DefaultSlot<ListItemBase>;
    get groupHeaderItem(): ListItemGroupHeader;
    get isListItemGroup(): boolean;
}
export default ListItemGroupBase;
export declare const isInstanceOfListItemGroup: (object: any) => object is ListItemGroupBase;
