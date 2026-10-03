import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
/**
 * @class
 *
 * ### Overview
 *
 * Each `ui5-calendar-legend-item` represents a legend item, displaying a color with a label.
 * The color is determined by the `type` property and the label by the `text` property.
 * If a `ui5-special-date` is used within the `ui5-calendar` and a type is set, clicking on a `ui5-calendar-legend-item`
 * with the same type will emphasize the respective date(s) in the calendar.
 *
 * ### Usage
 * The `ui5-calendar-legend-item` is intended to be used within the `ui5-calendar-legend` component.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CalendarLegendItem.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.23.0
 * @public
 */
declare class CalendarLegendItem extends UI5Element implements ITabbable {
    /**
     * Defines the text content of the Calendar Legend Item.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the type of the Calendar Legend Item.
     * @default "None"
     * @public
     */
    type: `${CalendarLegendItemType}`;
    /**
     * Tab index of the component.
     * @private
     */
    forcedTabIndex: string;
    static i18nBundle: I18nBundle;
    get effectiveText(): string;
}
export default CalendarLegendItem;
