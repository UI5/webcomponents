import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ButtonAccessibilityAttributes } from "@ui5/webcomponents/dist/Button.js";
import type Link from "@ui5/webcomponents/dist/Link.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";
import type Menu from "@ui5/webcomponents/dist/Menu.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import NotificationListItemImportance from "./types/NotificationListItemImportance.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import IconDesign from "@ui5/webcomponents/dist/types/IconDesign.js";
type NotificationListItemCloseEventDetail = {
    item: HTMLElement;
};
type NotificationListItemPressEventDetail = {
    item: NotificationListItem;
};
/**
 * @class
 *
 * ### Overview
 * The `ui5-li-notification` is a type of list item, meant to display notifications.
 *
 * The component has a rich set of various properties that allows the user to set `avatar`, `menu`, `titleText`, descriptive `content`
 * and `footnotes` to fully describe a notification.
 *
 * The user can:
 *
 * - display a `Close` button
 * - can control whether the `titleText` and `description` should wrap or truncate
 * and display a `ShowMore` button to switch between less and more information
 * - add actions by using the `ui5-menu` component
 *
 * **Note:** Adding custom actions by using the `ui5-notification-action` component is deprecated as of version 2.0!
 *
 * ### Usage
 * The component should be used inside a `ui5-notification-list`.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete):
 *
 * - [Enter] - select an item (trigger "item-click" event)
 * - [Delete] - close an item (trigger "item-close" event)
 *
 * #### Fast Navigation
 * This component provides a fast navigation using the following keyboard shortcuts:
 *
 * - [Shift] + [Enter] - 'More'/'Less' link will be triggered
 * - [Shift] + [F10] - 'Menu' (Actions) button will be triggered (clicked)
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";`
 *
 * @constructor
 * @extends NotificationListItemBase
 * @since 1.0.0-rc.8
 * @public
 * @csspart title-text - Used to style the titleText of the notification list item
 */
declare class NotificationListItem extends NotificationListItemBase {
    eventDetails: NotificationListItemBase["eventDetails"] & {
        _press: NotificationListItemPressEventDetail;
        close: NotificationListItemCloseEventDetail;
        _close: NotificationListItemCloseEventDetail;
    };
    /**
    * Defines if the `titleText` and `description` should wrap,
    * they truncate by default.
    *
    * **Note:** by default the `titleText` and `description`,
    * and a `ShowMore/Less` button would be displayed.
    * @default "None"
    * @public
    * @since 1.0.0-rc.15
    */
    wrappingType: `${WrappingType}`;
    /**
     * Defines the status indicator of the item.
     * @default "None"
     * @public
     */
    state: `${ValueState}`;
    /**
     * Defines if the `Close` button would be displayed.
     * @default false
     * @public
     */
    showClose: boolean;
    /**
     * Defines the `Important` label of the item.
     * @default "Standard"
     * @public
     */
    importance: `${NotificationListItemImportance}`;
    /**
    * Defines the state of the `titleText` and `description`,
    * if less or more information is displayed.
    * @private
    */
    _showMorePressed: boolean;
    /**
    * Defines the visibility of the `showMore` button.
    * @private
    */
    _showMore: boolean;
    /**
    * Defines the avatar, displayed in the `ui5-li-notification`.
    *
    * **Note:** Consider using the `ui5-avatar` to display icons, initials or images.
    *
    * **Note:** In order to be complaint with the UX guidlines and for best experience,
    * we recommend using avatars with 2rem X 2rem in size (32px X 32px). In case you are using the `ui5-avatar`
    * you can set its `size` property to `XS` to get the required size - `<ui5-avatar size="XS"></ui5-avatar>`.
    * @public
    */
    avatar: Slot<HTMLElement>;
    /**
    * Defines the menu, displayed in the `ui5-li-notification`.
    *
    * **Note:** Use this for implementing actions.
    *
    * **Note:** Should be used instead `u5-notification-action`, which is deprecated as of version 2.0.
    * @public
    */
    menu: Slot<HTMLElement>;
    /**
    * Defines the elements, displayed in the footer of the of the component.
    * @public
    */
    footnotes: Slot<HTMLElement>;
    /**
    * Defines the content of the `ui5-li-notification`,
    * usually a description of the notification.
    *
    * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
    * @public
    */
    description: DefaultSlot<Node>;
    titleTextDOM?: HTMLElement;
    menuButtonDOM?: HTMLElement;
    descriptionDOM?: HTMLElement;
    _titleTextOverflowHeight: number;
    _descOverflowHeight: number;
    _onResizeBound: ResizeObserverCallback;
    _ariaLevel?: number;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    get hasState(): boolean;
    get hasDesc(): boolean;
    get hasImportance(): boolean;
    get hasFootNotes(): boolean;
    get showMoreText(): string;
    get menuBtnAccessibleName(): string;
    get moreLinkAccessibleName(): string;
    get closeBtnAccessibleName(): string;
    get hideShowMore(): true | undefined;
    get titleTextHeight(): number;
    get descriptionHeight(): number;
    get titleTextOverflows(): boolean;
    get descriptionOverflows(): boolean;
    get footerItems(): {
        slotName: any;
        showDivider: boolean;
    }[];
    get ariaLabelledBy(): string;
    get itemClasses(): string;
    get statusIconName(): string;
    get statusIconDesign(): IconDesign | undefined;
    get importanceText(): string;
    get stateText(): string;
    get readText(): string;
    get menuButtonAccessibilityAttributes(): ButtonAccessibilityAttributes;
    get moreLinkAccessibilityAttributes(): {
        expanded: boolean;
    };
    get showMenu(): boolean;
    /**
     * Event handlers
     */
    _onclick(): void;
    _onShowMoreClick(e: UI5CustomEvent<Link, "click">): void;
    _onkeydown(e: KeyboardEvent): Promise<void>;
    _onkeyup(e: KeyboardEvent): void;
    _onBtnCloseClick(): void;
    _onBtnMenuClick(): void;
    _toggleShowMorePressed(): void;
    openMenu(): void;
    getMenu(): Menu;
    /**
     * Private
     */
    fireItemPress(): void;
    onResize(): void;
}
export default NotificationListItem;
export type { NotificationListItemPressEventDetail, NotificationListItemCloseEventDetail, };
