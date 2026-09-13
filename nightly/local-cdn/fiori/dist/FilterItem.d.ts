import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type FilterItemOption from "./FilterItemOption.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-filter-item` component defines the filtering criteria for data in `ui5-view-settings-dialog`.
 * It represents a single filter category that contains multiple filter options that users can select.
 *
 * ### Usage
 *
 * The `ui5-filter-item` is used within the `ui5-view-settings-dialog` to provide filtering options.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FilterItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
declare class FilterItem extends UI5Element {
    /**
     * Defines the text of the filter item.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the additional text of the filter item.
     * This text is typically used to show the number of selected filter options within this category.
     * @default undefined
     * @public
     */
    additionalText?: string;
    /**
     * Defines the filter options available for this filter category.
     * @public
     */
    values: Slot<FilterItemOption>;
}
export default FilterItem;
