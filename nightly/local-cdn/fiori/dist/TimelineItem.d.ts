import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITimelineItem } from "./Timeline.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type TimelineLayout from "./types/TimelineLayout.js";
type TimelineItemRole = "listitem" | "treeitem";
/**
 * @class
 *
 * ### Overview
 *
 * An entry posted on the timeline.
 * @constructor
 * @extends UI5Element
 * @implements { ITimelineItem }
 * @public
 */
declare class TimelineItem extends UI5Element implements ITimelineItem {
    eventDetails: {
        "name-click": void;
    };
    /**
     * Defines the icon to be displayed as graphical element within the `ui5-timeline-item`.
     * SAP-icons font provides numerous options.
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines the name of the item, displayed before the `title-text`.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Defines if the `name` is clickable.
     * @default false
     * @public
     */
    nameClickable: boolean;
    /**
     * Defines the title text of the component.
     * @default undefined
     * @public
     */
    titleText?: string;
    /**
     * Defines the subtitle text of the component.
     * @default undefined
     * @public
     */
    subtitleText?: string;
    /**
     * Defines the state of the icon displayed in the `ui5-timeline-item`.
     * @default "None"
     * @public
     * @since 2.7.0
     */
    state: `${ValueState}`;
    /**
     * Defines the content of the `ui5-timeline-item`.
     * @public
     */
    content: DefaultSlot<Node>;
    /**
     * @private
     */
    firstItemInTimeline: boolean;
    /**
     * @private
     */
    isNextItemGroup: boolean;
    forcedTabIndex: string;
    /**
     * Defines the items orientation.
     * @default "Vertical"
     * @private
     */
    layout: `${TimelineLayout}`;
    /**
     * Defines the indicator line width.
     * @private
     */
    forcedLineWidth?: string;
    /**
     * @private
     */
    hideBubble: boolean;
    /**
     * Marks the last `<ui5-timeline-item>`
     * @private
     */
    lastItem: boolean;
    /**
     * @private
     */
    hidden: boolean;
    /**
     * @private
     */
    effectiveRole: `${TimelineItemRole}`;
    /**
     * Defines the position of the item in a group.
     * @private
     */
    positionInGroup?: number;
    static i18nBundleFiori: I18nBundle;
    constructor();
    onNamePress(): void;
    /**
     * Focus the internal link.
     */
    focusLink(): void;
    static typeTextMappings(): Record<string, I18nText>;
    get timelineItemStateText(): string | undefined;
    get isGroupItem(): boolean;
    get _getAccessibleLabel(): string;
}
export default TimelineItem;
