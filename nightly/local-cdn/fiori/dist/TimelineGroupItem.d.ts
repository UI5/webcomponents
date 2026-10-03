import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type TimelineLayout from "./types/TimelineLayout.js";
import type { ITimelineItem } from "./Timeline.js";
/**
 * @class
 *
 * ### Overview
 *
 * An entry posted on the timeline.
 * It is intented to represent a group of `<ui5-timeline-item>`s.
 *
 * **Note**: Please do not use empty groups in order to preserve the intended design.
 *
 * @constructor
 * @extends UI5Element
 * @implements {ITimelineItem}
 * @public
 * @since 2.1.0
 */
declare class TimelineGroupItem extends UI5Element implements ITimelineItem {
    eventDetails: {
        "toggle": void;
    };
    /**
     * Defines the text of the button that expands and collapses the group.
     * @default undefined
     * @public
     */
    groupName?: string;
    /**
     * Determines if the group is collapsed or expanded.
     * @default false
     * @public
     */
    collapsed: boolean;
    /**
     * Determines the content of the `ui5-timeline-group-item`.
     * @public
     */
    items: DefaultSlot<ITimelineItem>;
    /**
     * Defines the items orientation.
     * @default "Vertical"
     * @private
     */
    layout: `${TimelineLayout}`;
    /**
     * Applies to the last item in the group.
     * @private
     */
    lastItem: boolean;
    /**
     * Determines if the item afterwards is a group item.
     * Intended for styling purposes.
     * @private
     */
    isNextItemGroup: boolean;
    hidden: boolean;
    /**
     * @private
     */
    firstItemInTimeline: boolean;
    forcedTabIndex: string;
    onBeforeRendering(): void;
    _setGroupItemProps(): void;
    onGroupItemClick(): void;
    get isGroupItem(): boolean;
    get _groupName(): string | undefined;
}
export default TimelineGroupItem;
