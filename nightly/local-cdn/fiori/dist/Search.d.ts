import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";
import type List from "@ui5/webcomponents/dist/List.js";
import SearchField from "./SearchField.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SearchItem from "./SearchItem.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type IllustratedMessage from "./IllustratedMessage.js";
import type SearchItemGroup from "./SearchItemGroup.js";
import type SearchMessageArea from "./SearchMessageArea.js";
import type { InputEventDetail } from "@ui5/webcomponents/dist/Input.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import type { PopupBeforeCloseEventDetail } from "@ui5/webcomponents/dist/Popup.js";
import type Select from "@ui5/webcomponents/dist/Select.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
interface ISearchSuggestionItem extends UI5Element {
    selected: boolean;
    text: string;
    items?: ISearchSuggestionItem[];
}
type SearchEventDetails = {
    item?: ISearchSuggestionItem;
};
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search` is an input with suggestions, used for user search.
 *
 * The `ui5-search` consists of several elements parts:
 * - Scope - displays a select in the beggining of the component, used for filtering results by their scope.
 * - Input field - for user input value
 * - Clear button - gives the possibility for deleting the entered value
 * - Search button - a primary button for performing search, when the user has entered a search term
 * - Suggestions - a list with available search suggestions
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/Search.js";`
 *
 * @constructor
 * @extends SearchField
 * @public
 * @since 2.9.0
 * @experimental
 */
declare class Search extends SearchField {
    eventDetails: SearchField["eventDetails"] & {
        search: SearchEventDetails;
        "popup-action-press": void;
        "open": void;
        "close": void;
    };
    /**
     * Indicates whether a loading indicator should be shown in the popup.
     * @default false
     * @public
     */
    loading: boolean;
    /**
     * Defines whether the value will be autcompleted to match an item.
     * @default false
     * @public
     */
    noTypeahead: boolean;
    /**
     * Defines the Search suggestion items.
     *
     * @public
     */
    items: DefaultSlot<SearchItem | SearchItemGroup>;
    /**
     * Defines the popup footer action button.
     *
     * @public
     */
    action: Slot<Button>;
    /**
     * Defines the illustrated message to be shown in the popup.
     *
     * @public
     */
    illustration: Slot<IllustratedMessage>;
    /**
     * Defines the illustrated message to be shown in the popup.
     *
     * @public
     */
    messageArea: Slot<SearchMessageArea>;
    /**
     * Indicates whether the items picker is open.
     * @public
     */
    open: boolean;
    /**
     * Defines the inner stored value of the component.
     *
     * **Note:** The property is updated upon typing.
     * @default ""
     * @private
     */
    _innerValue?: string;
    /**
     * Determines whether the item selection should be performed on mobile devices.
     * Similar to _performTextSelection on desktop
     * @private
     */
    _performItemSelectionOnMobile?: boolean;
    /**
     * Based on the key pressed, determines if the autocomplete should be performed.
     * @private
     */
    _shouldAutocomplete?: boolean;
    /**
     * Determines whether a text selection should be performed.
     * @private
     */
    _performTextSelection?: boolean;
    /**
     * Holds the typed value from the user.
     * @private
     */
    _typedInValue: string;
    /**
     * Holds the typed value before opening the picker.
     * @private
     */
    _valueBeforeOpen: string;
    /**
     * Holds the currently proposed item which will be selected if the user presses Enter.
     * @private
     */
    _proposedItem?: ISearchSuggestionItem;
    /**
     * This property is used during rendering to indicate that the user has started typing in the input
     * @private
     */
    _isTyping: boolean;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    _handleMobileInput(e: CustomEvent<InputEventDetail>): void;
    _shouldPerformSelectionOnMobile(inputType: string): boolean;
    _handleTypeAhead(item: ISearchSuggestionItem): void;
    _startsWithMatchingItems(str: string): Array<ISearchSuggestionItem>;
    _isGroupItem(item: HTMLElement): item is SearchItemGroup;
    _isShowMoreItem(item: ISearchSuggestionItem): boolean;
    _deselectItems(): void;
    _selectMatchingItem(item: ISearchSuggestionItem): void;
    _handleDown(e: KeyboardEvent): void;
    _handleArrowDown(): void;
    _handleInnerClick(): void;
    _handleSearchIconPress(): void;
    _handleEnter(): void;
    _onMobileInputKeydown(e: KeyboardEvent): void;
    _handleSearchEvent(): void;
    _handleEscape(): void;
    _handleInput(e: InputEvent): void;
    _handleClear(): void;
    _popoupHasAnyContent(): boolean;
    _onFooterButtonKeyDown(e: KeyboardEvent): void;
    _onItemKeydown(e: KeyboardEvent): void;
    _onItemClick(e: CustomEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onFocusOutSearch(e: FocusEvent): void;
    _handleBeforeClose(e: CustomEvent<PopupBeforeCloseEventDetail>): void;
    _handleCancel(): void;
    _handleClose(): void;
    _handleBeforeOpen(): void;
    _handleOpen(): void;
    _handleActionKeydown(e: KeyboardEvent): void;
    _onFooterButtonClick(): void;
    _getFirstMatchingItem(current: string): ISearchSuggestionItem | undefined;
    _getPicker(): Popover;
    _getItemsList(): List;
    _getFooterButton(): Button;
    get _flattenItems(): Array<ISearchSuggestionItem>;
    get nativeInput(): HTMLInputElement | null | undefined;
    get mobileInput(): Input | null;
    get cancelButtonText(): string;
    get suggestionsText(): string;
    get scopeSelect(): Select | null;
}
export default Search;
