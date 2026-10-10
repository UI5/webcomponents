import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IMenuItem } from "./Menu.js";
import type { ListItemBaseClickEventDetail } from "./ListItemBase.js";
/**
 * @class
 * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
 * @constructor
 * @extends UI5Element
 * @implements {IMenuItem}
 * @public
 * @since 2.0.0
 */
declare class MenuSeparator extends UI5Element implements IMenuItem {
    eventDetails: {
        click?: ListItemBaseClickEventDetail;
    };
    get isSeparator(): boolean;
}
export default MenuSeparator;
export declare const isInstanceOfMenuSeparator: (object: any) => object is MenuSeparator;
