import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { AccessibilityAttributes, AriaRole, AriaHasPopup } from "@ui5/webcomponents-base";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import Highlight from "./types/Highlight.js";
import ListItemType from "./types/ListItemType.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import ListItemBase from "./ListItemBase.js";
import type { IButton } from "./Button.js";
import type ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
interface IAccessibleListItem {
    accessibleName?: string;
    accessibleNameRef?: string;
}
type SelectionRequestEventDetail = {
    item: ListItemBase;
    selectionComponentPressed: boolean;
    selected?: boolean;
    key?: string;
};
type AccInfo = {
    role?: AriaRole | undefined;
    ariaExpanded?: boolean;
    ariaLevel?: number;
    ariaLabel: string;
    ariaLabelRadioButton: string;
    ariaSelectedText?: string;
    ariaHaspopup?: `${AriaHasPopup}`;
    posinset?: number;
    setsize?: number;
    ariaSelected?: boolean;
    ariaChecked?: boolean;
    listItemAriaLabel?: string;
    ariaOwns?: string;
    tooltip?: string;
    ariaKeyShortcuts?: string;
    ariaDescribedBy?: string;
};
type ListItemAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "ariaSetsize" | "ariaPosinset">;
/**
 * @class
 * A class to serve as a base
 * for the `ListItemStandard` and `ListItemCustom` classes.
 * @constructor
 * @abstract
 * @extends ListItemBase
 * @public
 */
declare abstract class ListItem extends ListItemBase {
    eventDetails: ListItemBase["eventDetails"] & {
        "detail-click": {
            item: ListItem;
            selected: boolean;
        };
        "selection-requested": SelectionRequestEventDetail;
    };
    /**
     * Defines the visual indication and behavior of the list items.
     * Available options are `Active` (by default), `Inactive`, `Detail` and `Navigation`.
     *
     * **Note:** When set to `Active` or `Navigation`, the item will provide visual response upon press and hover,
     * while with type `Inactive` and `Detail` - will not.
     * @default "Active"
     * @public
    */
    type: `${ListItemType}`;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     * The following fields are supported:
     *
     * - **ariaSetsize**: Defines the number of items in the current set  when not all items in the set are present in the DOM.
     * **Note:** The value is an integer reflecting the number of items in the complete set. If the size of the entire set is unknown, set `-1`.
     *
     * 	- **ariaPosinset**: Defines an element's number or position in the current set when not all items are present in the DOM.
     * 	**Note:** The value is an integer greater than or equal to 1, and less than or equal to the size of the set when that size is known.
     *
     * @default {}
     * @public
     * @since 1.15.0
     */
    accessibilityAttributes: ListItemAccessibilityAttributes;
    /**
     * The navigated state of the list item.
     * If set to `true`, a navigation indicator is displayed at the end of the list item.
     * @default false
     * @public
     * @since 1.10.0
     */
    navigated: boolean;
    /**
     * Defines the text of the tooltip that would be displayed for the list item.
     * @default undefined
     * @public
     * @since 1.23.0
     */
    tooltip?: string;
    /**
     * Indicates if the list item is active, e.g pressed down with the mouse or the keyboard keys.
     * @private
    */
    active: boolean;
    /**
     * Defines the highlight state of the list items.
     * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
     * @default "None"
     * @public
     * @since 1.24
     */
    highlight: `${Highlight}`;
    /**
     * Defines the selected state of the component.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Used to define the role of the list item.
     *
     * **Note:** If not set, the role is automatically inherited from the parent `ui5-list` based on its `accessible-role` property
     * (e.g. `Menu` -> `MenuItem`, `Tree` -> `TreeItem`, `ListBox` -> `Option`).
     * An explicitly set `accessible-role` on the list item takes precedence over the inherited role.
     * @default undefined
     * @public
     * @since 2.23.0
     */
    accessibleRole?: `${ListItemAccessibleRole}`;
    _forcedAccessibleRole?: string;
    _inheritedAccessibleRole?: string;
    _selectionMode: `${ListSelectionMode}`;
    /**
     * Indicates whether the list item is in edit mode.
     * When active, Tab cycles through internal focusable elements
     * instead of navigating to the next list item.
     * Toggled by F2; also set by the parent List on F7.
     * @private
     */
    _editMode: boolean;
    /**
     * Defines the current media query size.
     * @default "S"
     * @private
     */
    mediaRange: string;
    /**
     * Defines the delete button, displayed in "Delete" mode.
     * **Note:** While the slot allows custom buttons, to match
     * design guidelines, please use the `ui5-button` component.
     * **Note:** When the slot is not present, a built-in delete button will be displayed.
     * @since 1.9.0
     * @public
    */
    deleteButton: Slot<IButton>;
    deactivateByKey: (e: KeyboardEvent) => void;
    deactivate: () => void;
    accessibleName?: string;
    indeterminate?: boolean;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onmousedown(): void;
    _onmouseup(): void;
    _ontouchend(): void;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(e: FocusEvent): void;
    _ondragstart(e: DragEvent): void;
    _ondragend(e: DragEvent): void;
    /**
     * Called when selection components in Single (ui5-radio-button)
     * and Multi (ui5-checkbox) selection modes are used.
     */
    onMultiSelectionComponentPress(e: CustomEvent): void;
    onSingleSelectionComponentPress(e: CustomEvent): void;
    activate(): void;
    onDelete(): void;
    onDetailClick(): void;
    fireItemPress(e: Event): void;
    get isInactive(): boolean;
    get placeSelectionElementBefore(): boolean;
    get placeSelectionElementAfter(): boolean;
    get modeSingleSelect(): boolean;
    get modeMultiple(): boolean;
    get modeDelete(): boolean;
    get typeDetail(): boolean;
    get typeNavigation(): boolean;
    get typeActive(): boolean;
    get _ariaSelected(): boolean | undefined;
    get listItemAccessibleRole(): import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").JSXInternal.AriaRole;
    get ariaSelectedText(): string | undefined;
    get deleteText(): string;
    get hasDeleteButtonSlot(): boolean;
    get _accessibleNameRef(): string;
    get ariaLabelledByText(): string;
    get _ariaDescribedByIds(): string;
    get _accInfo(): AccInfo;
    get _hasHighlightColor(): boolean;
    get hasConfigurableMode(): boolean;
    get _listItem(): HTMLLIElement | null;
    _handleF2(): void;
    _handleTabNext(e: KeyboardEvent): void;
    _handleTabPrevious(e: KeyboardEvent): void;
    _getFocusableElements(): HTMLElement[];
    _indexOfActiveElement(focusables: HTMLElement[]): number;
    _getFocusedElementIndex(): number;
    _hasFocusableElements(): boolean;
    _isFocusOnInternalElement(): boolean;
    _focusInternalElement(targetIndex: number): number | undefined;
}
export default ListItem;
export type { IAccessibleListItem, SelectionRequestEventDetail, ListItemAccessibilityAttributes, };
