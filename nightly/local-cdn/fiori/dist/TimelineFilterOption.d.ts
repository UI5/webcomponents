import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-timeline-filter-option` component defines individual filter values within a `ui5-timeline-header-bar`.
 * It represents a single selectable option that users can choose to filter timeline items.
 *
 * ### Usage
 *
 * The `ui5-timeline-filter-option` is used as a child component within `ui5-timeline-header-bar`.
 * Each option represents a specific value that can be used for filtering.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/TimelineFilterOption.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.22.0
 * @public
 */
declare class TimelineFilterOption extends UI5Element {
    /**
     * Defines the text of the filter option.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines if the filter option is selected.
     * @default false
     * @public
     */
    selected: boolean;
}
export default TimelineFilterOption;
