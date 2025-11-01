import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
/**
 * @class
 *
 * ### Overview
 * Represents a single navigation action within `ui5-side-navigation-item`.
 * The `ui5-side-navigation-sub-item` is intended to be used inside a `ui5-side-navigation-item` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";`
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @public
 * @abstract
 * @since 1.0.0-rc.8
 */
declare class SideNavigationSubItem extends SideNavigationSelectableItemBase {
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onfocusin(e: FocusEvent): void;
    _onclick(e: MouseEvent): void;
    get classesArray(): string[];
}
export default SideNavigationSubItem;
