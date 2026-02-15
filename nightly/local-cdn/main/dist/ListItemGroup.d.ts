import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import DragAndDropHandler from "./delegate/DragAndDropHandler.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type DropIndicator from "./DropIndicator.js";
import type ListItemBase from "./ListItemBase.js";
import type ListItemGroupHeader from "./ListItemGroupHeader.js";
import WrappingType from "./types/WrappingType.js";
type ListItemGroupMoveEventDetail = {
    source: {
        element: HTMLElement;
    };
    destination: {
        element: HTMLElement;
        placement: `${MovePlacement}`;
    };
};
/**
 * @class
 * ### Overview
 * The `ui5-li-group` is a special list item, used only to create groups of list items.
 *
 * This is the item to use inside a `ui5-list`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ListItemGroup.js";`
 * @csspart header - Used to style the header item of the group
 * @csspart title - Used to style the title of the group header
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
declare class ListItemGroup extends UI5Element {
    eventDetails: {
        "move-over": ListItemGroupMoveEventDetail;
        "move": ListItemGroupMoveEventDetail;
    };
    /**
     * Defines the header text of the <code>ui5-li-group</code>.
     * @public
     * @default undefined
     */
    headerText?: string;
    /**
     * Defines the accessible name of the header.
     * @public
     * @default undefined
     */
    headerAccessibleName?: string;
    /**
     * Defines the items of the <code>ui5-li-group</code>.
     * @public
     */
    items: DefaultSlot<ListItemBase>;
    /**
     * Defines if the text of the component should wrap when it's too long.
     * When set to "Normal", the content (title, description) will be wrapped
     * using the `ui5-expandable-text` component.<br/>
     *
     * The text can wrap up to 100 characters on small screens (size S) and
     * up to 300 characters on larger screens (size M and above). When text exceeds
     * these limits, it truncates with an ellipsis followed by a text expansion trigger.
     *
     * Available options are:
     * - `None` (default) - The text will truncate with an ellipsis.
     * - `Normal` - The text will wrap (without truncation).
     *
     * @default "None"
     * @public
     * @since 2.15.0
     */
    wrappingType: `${WrappingType}`;
    /**
     * Indicates whether the header is focused
     * @private
     */
    focused: boolean;
    /**
    * Defines the header of the component.
    *
    * **Note:** Using this slot, the default header text of group and the value of `headerText` property will be overwritten.
    * @public
    */
    header: Slot<ListItemBase>;
    _dragAndDropHandler: DragAndDropHandler;
    constructor();
    get groupHeaderItem(): ListItemGroupHeader;
    get hasHeader(): boolean;
    get hasFormattedHeader(): boolean;
    get isListItemGroup(): boolean;
    get dropIndicatorDOM(): DropIndicator | null;
    _ondragenter(e: DragEvent): void;
    _ondragleave(e: DragEvent): void;
    _ondragover(e: DragEvent): void;
    _ondrop(e: DragEvent): void;
    _filterPlacements(placements: MovePlacement[], draggedElement: HTMLElement, targetElement: HTMLElement): MovePlacement[];
    getFocusDomRef(): ListItemGroupHeader;
    getGroupHeaderWrapping(): WrappingType;
}
export default ListItemGroup;
export declare const isInstanceOfListItemGroup: (object: any) => object is ListItemGroup;
export type { ListItemGroupMoveEventDetail };
