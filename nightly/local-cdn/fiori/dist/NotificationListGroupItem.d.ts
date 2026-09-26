import type NotificationListGrowingMode from "@ui5/webcomponents/dist/types/NotificationListGrowingMode.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
import type NotificationListItem from "./NotificationListItem.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type NotificationListGroupItemToggleEventDetail = {
    item: NotificationListGroupItem;
};
/**
 * @class
 *
 * ### Overview
 * The `ui5-li-notification-group` is a special type of list item,
 * that unlike others can group items within self, usually `ui5-li-notification` items.
 *
 * The component consists of:
 *
 * - `Toggle` button to expand and collapse the group
 * - `TitleText` to entitle the group
 * - Items of the group
 *
 * ### Usage
 * The component should be used inside a `ui5-notification-list`.
 *
 * ### Keyboard Handling
 * The `ui5-li-notification-group` provides advanced keyboard handling.
 * This component provides fast navigation when the header is focused using the following keyboard shortcuts:
 *
 * - [Space] - toggles expand / collapse of the group
 * - [Plus] - expands the group
 * - [Minus] - collapses the group
 * - [Right] - expands the group
 * - [Left] - collapses the group
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";`
 * @constructor
 * @extends NotificationListItemBase
 * @since 1.0.0-rc.8
 * @public
 */
declare class NotificationListGroupItem extends NotificationListItemBase {
    eventDetails: NotificationListItemBase["eventDetails"] & {
        toggle: NotificationListGroupItemToggleEventDetail;
        "load-more": void;
    };
    /**
     * Defines if the group is collapsed or expanded.
     * @default false
     * @public
     */
    collapsed: boolean;
    /**
     * Defines whether the component will have growing capability by pressing a `More` button.
     * When button is pressed `load-more` event will be fired.
     * @default "None"
     * @public
     * @since 2.2.0
     */
    growing: `${NotificationListGrowingMode}`;
    /**
     * Defines the items of the `ui5-li-notification-group`,
     * usually `ui5-li-notification` items.
     * @public
     */
    items: DefaultSlot<NotificationListItem>;
    onBeforeRendering(): void;
    /**
     * Clears child items loading state to show a single loading over the entire group,
     * instead of multiple BusyIndicator instances
     */
    clearChildBusyIndicator(): void;
    get toggleIconAccessibleName(): string;
    get accInvisibleText(): string;
    get expandText(): string;
    get groupText(): string;
    get ariaLabelledBy(): string;
    get _expanded(): boolean;
    get _pressable(): boolean;
    get groupCollapsedIcon(): "navigation-right-arrow" | "navigation-down-arrow";
    toggleCollapsed(): void;
    /**
     * Event handlers
     *
     */
    _onHeaderToggleClick(): void;
    _onLoadMore(): void;
    getGrowingButton(): HTMLElement;
    _onkeydown(e: KeyboardEvent): Promise<void>;
    getHeaderDomRef(): HTMLElement;
}
export default NotificationListGroupItem;
export type { NotificationListGroupItemToggleEventDetail, };
