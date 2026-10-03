import NavigationMode from "../types/NavigationMode.js";
import ItemNavigationBehavior from "../types/ItemNavigationBehavior.js";
import type UI5Element from "../UI5Element.js";
interface ITabbable {
    id: string;
    forcedTabIndex?: string;
}
type ItemNavigationOptions = {
    currentIndex?: number;
    navigationMode?: NavigationMode;
    rowSize?: number;
    skipItemsSize?: number;
    behavior?: ItemNavigationBehavior;
    getItemsCallback: () => Array<ITabbable>;
    affectedPropertiesNames?: Array<string>;
};
/**
 * The ItemNavigation class manages the calculations to determine the correct "tabindex" for a group of related items inside a root component.
 * Important: ItemNavigation only does the calculations and does not change "tabindex" directly, this is a responsibility of the developer.
 *
 * The keys that trigger ItemNavigation are:
 *  - Up/down
 *  - Left/right
 *  - Home/End
 *
 * Usage:
 * 1) Use the "getItemsCallback" constructor property to pass a callback to ItemNavigation, which, whenever called, will return the list of items to navigate among.
 *
 * Each item passed to ItemNavigation via "getItemsCallback" must be:
 *  - A) either a UI5Element with a "forcedTabIndex" property
 *  - B) or an Object with "id" and "forcedTabIndex" properties which represents a part of the root component's shadow DOM.
 *    The "id" must be a valid ID within the shadow root of the component ItemNavigation operates on.
 *    This object must not be a DOM object because, as said, ItemNavigation will not set "tabindex" on it. It must be a representation of a DOM object only
 *    and the developer has the responsibility to update the "tabindex" in the component's DOM.
 *  - C) a combination of the above
 *
 * Whenever the user navigates with the keyboard, ItemNavigation will modify the "forcedTabIndex" properties of the items.
 * It is the items' responsibilities to re-render themselves and apply the correct value of "tabindex" (i.e. to map the "forcedTabIndex" ItemNavigation set to them to the "tabindex" property).
 * If the items of the ItemNavigation are UI5Elements themselves, this can happen naturally since they will be invalidated by their "forcedTabIndex" property.
 * If the items are Objects with "id" and "forcedTabIndex" however, it is the developer's responsibility to apply these and the easiest way is to have the root component invalidated by ItemNavigation.
 * To do so, set the "affectedPropertiesNames" constructor property to point to one or more of the root component's properties that need refreshing when "forcedTabIndex" is changed deeply.
 *
 * 2) Call the "setCurrentItem" method of ItemNavigation whenever you want to change the current item.
 * This is most commonly required if the user for example clicks on an item and thus selects it directly.
 * Pass as the only argument to "setCurrentItem" the item that becomes current (must be one of the items, returned by "getItemsCallback").
 *
 * @class
 * @public
 */
declare class ItemNavigation {
    rootWebComponent: UI5Element;
    _getItems: () => Array<ITabbable>;
    _currentIndex: number;
    _rowSize: number;
    _behavior: ItemNavigationBehavior;
    _navigationMode: NavigationMode;
    _affectedPropertiesNames: Array<string>;
    _skipItemsSize: number | null;
    _initBound: () => void;
    /**
     *
     * @param rootWebComponent the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
     * @param {ItemNavigationOptions} options Object with configuration options:
     *  - currentIndex: the index of the item that will be initially selected (from which navigation will begin)
     *  - navigationMode (Auto|Horizontal|Vertical): whether the items are displayed horizontally (Horizontal), vertically (Vertical) or as a matrix (Auto) meaning the user can navigate in both directions (up/down and left/right)
     *  - rowSize: tells how many items per row there are when the items are not rendered as a flat list but rather as a matrix. Relevant for navigationMode=Auto
     * 	- skipItemsSize: tells how many items upon PAGE_UP and PAGE_DOWN should be skipped to applying the focus on the next item
     *  - behavior (Static|Cycling): tells what to do when trying to navigate beyond the first and last items
     *    Static means that nothing happens if the user tries to navigate beyond the first/last item.
     *    Cycling means that when the user navigates beyond the last item they go to the first and vice versa.
     *  - getItemsCallback: function that, when called, returns an array with all items the user can navigate among
     *  - affectedPropertiesNames: a list of metadata properties on the root component which, upon user navigation, will be reassigned by address thus causing the root component to invalidate
     */
    constructor(rootWebComponent: UI5Element, options: ItemNavigationOptions);
    /**
     * Call this method to set a new "current" (selected) item in the item navigation
     * Note: the item passed to this function must be one of the items, returned by the getItemsCallback function
     *
     * @public
     * @param current the new selected item
     */
    setCurrentItem(current: ITabbable): void;
    /**
     * Call this method to dynamically change the row size
     *
     * @public
     * @param newRowSize
     */
    setRowSize(newRowSize: number): void;
    _init(): void;
    _onkeydown(event: KeyboardEvent): void;
    _handleUp(): void;
    _handleDown(): void;
    _handleLeft(): void;
    _handleRight(): void;
    _handleHome(): void;
    _handleEnd(): void;
    _handlePageUp(): void;
    _handlePageDown(): void;
    /**
     * Handles PAGE_UP in a flat list-like structure, both vertically and horizontally.
     */
    _handlePageUpFlat(): void;
    /**
     * Handles PAGE_DOWN in a flat list-like structure, both vertically and horizontally.
     */
    _handlePageDownFlat(): void;
    _applyTabIndex(): void;
    _focusCurrentItem(): void;
    _canNavigate(): boolean | undefined;
    _getCurrentItem(): HTMLElement | undefined;
}
export default ItemNavigation;
export { ITabbable, };
