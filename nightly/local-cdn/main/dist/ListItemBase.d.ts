import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
type ListItemBasePressEventDetail = {
    item: ListItemBase;
    selected?: boolean;
    key?: string;
};
/**
 * @class
 * A class to serve as a foundation
 * for the `ListItem` and `ListItemGroupHeader` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
declare class ListItemBase extends UI5Element implements ITabbable {
    eventDetails: {
        "request-tabindex-change": FocusEvent;
        "_press": ListItemBasePressEventDetail;
        "_focused": FocusEvent;
        "forward-after": void;
        "forward-before": void;
    };
    /**
     * Defines the selected state of the component.
     * @default false
     * @private
     */
    selected: boolean;
    /**
     * Defines whether the item is movable.
     * @default false
     * @private
     * @since 2.0.0
     */
    movable: boolean;
    /**
    * Defines if the list item should display its bottom border.
    * @private
    */
    hasBorder: boolean;
    forcedTabIndex?: string;
    /**
    * Defines whether `ui5-li` is in disabled state.
    *
    * **Note:** A disabled `ui5-li` is noninteractive.
    * @default false
    * @protected
    * @since 1.0.0-rc.12
    */
    disabled: boolean;
    /**
     * Indicates if the element is on focus
     * @private
     */
    focused: boolean;
    /**
     * Indicates if the list item is actionable, e.g has hover and pressed effects.
     * @private
     */
    actionable: boolean;
    onEnterDOM(): void;
    onBeforeRendering(): void;
    _onfocusin(e: FocusEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onclick(e: MouseEvent): void;
    /**
     * Override from subcomponent, if needed
     */
    _isSpace(e: KeyboardEvent): boolean;
    /**
     * Override from subcomponent, if needed
     */
    _isEnter(e: KeyboardEvent): boolean;
    fireItemPress(e: Event): void;
    _handleTabNext(e: KeyboardEvent): void;
    _handleTabPrevious(e: KeyboardEvent): void;
    /**
     * Determines if th current list item either has no tabbable content or
     * [Tab] is performed onto the last tabbale content item.
     */
    shouldForwardTabAfter(): boolean;
    /**
     * Determines if the current list item is target of [SHIFT+TAB].
     */
    shouldForwardTabBefore(target: HTMLElement): boolean;
    get classes(): ClassMap;
    get _ariaDisabled(): true | undefined;
    get _focusable(): boolean;
    get _pressable(): boolean;
    get hasConfigurableMode(): boolean;
    get _effectiveTabIndex(): number | undefined;
    get isListItemBase(): boolean;
}
export default ListItemBase;
export type { ListItemBasePressEventDetail, };
