import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ListItemGroupBase from "./ListItemGroupBase.js";
import type Option from "./Option.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option-group` component is used to group options within a `ui5-select`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/OptionGroup.js";`
 * @constructor
 * @extends ListItemGroupBase
 * @public
 * @since 2.26.0
 */
declare class OptionGroup extends ListItemGroupBase {
    eventDetails: ListItemGroupBase["eventDetails"];
    static i18nBundle: I18nBundle;
    /**
     * Defines the options of the group.
     *
     * **Note:** Use the `ui5-option` component to define the desired options.
     * @public
     */
    items: DefaultSlot<Option>;
    get isOptionGroup(): boolean;
    get _groupHeaderRoleDescription(): string;
}
export declare const isInstanceOfOptionGroup: (object: any) => object is OptionGroup;
export default OptionGroup;
