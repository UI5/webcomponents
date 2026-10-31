import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type List from "../List.js";
import type { ListItemClickEventDetail, ListSelectionChangeEventDetail } from "../List.js";
import type ResponsivePopover from "../ResponsivePopover.js";
import "../SuggestionItem.js";
import "../SuggestionItemGroup.js";
import type SuggestionItem from "../SuggestionItem.js";
import InputSuggestionsTemplate from "./InputSuggestionsTemplate.js";
import type { IInputSuggestionItem, IInputSuggestionItemSelectable } from "../Input.js";
interface SuggestionComponent extends UI5Element {
    focused: boolean;
    hasSuggestionItemSelected: boolean;
    value: string;
    typedInValue: string;
    hasValueStateMessage: boolean;
    suggestionItems: Array<IInputSuggestionItem>;
    open: boolean;
    onItemSelected: (pressedItem: IInputSuggestionItemSelectable, keyboardUsed: boolean) => void;
    onItemSelect: (item: IInputSuggestionItem) => void;
}
type SuggestionsAccInfo = {
    isGroup: boolean;
    currentPos?: number;
    listSize?: number;
    itemText: string;
    additionalText?: string;
};
/**
 * A class to manage the `Input` suggestion items.
 * @class
 * @private
 */
declare class Suggestions {
    component: SuggestionComponent;
    slotName: string;
    handleFocus: boolean;
    highlight: boolean;
    selectedItemIndex: number;
    accInfo?: SuggestionsAccInfo;
    _scrollContainer?: HTMLElement;
    _handledPress?: boolean;
    attachedAfterOpened?: boolean;
    attachedAfterClose?: boolean;
    static i18nBundle: I18nBundle;
    static SCROLL_STEP: number;
    get template(): typeof InputSuggestionsTemplate;
    constructor(component: SuggestionComponent, slotName: string, highlight: boolean, handleFocus: boolean);
    onUp(e: KeyboardEvent, indexOfItem: number): boolean;
    onDown(e: KeyboardEvent, indexOfItem: number): boolean;
    onSpace(e: KeyboardEvent): boolean;
    onEnter(e: KeyboardEvent): boolean;
    onPageUp(e: KeyboardEvent): boolean;
    onPageDown(e: KeyboardEvent): boolean;
    onHome(e: KeyboardEvent): boolean;
    onEnd(e: KeyboardEvent): boolean;
    onTab(): boolean;
    toggle(bToggle: boolean, options: {
        preventFocusRestore: boolean;
    }): void;
    get _selectedItem(): SuggestionItem | null;
    _isScrollable(): boolean;
    close(preventFocusRestore?: boolean): void;
    updateSelectedItemPosition(pos: number): void;
    onItemSelected(selectedItem: IInputSuggestionItemSelectable | null, keyboardUsed: boolean): void;
    onItemSelect(item: IInputSuggestionItem): void;
    onItemPress(e: CustomEvent<ListItemClickEventDetail | ListSelectionChangeEventDetail>): void;
    _onClose(): void;
    _isItemOnTarget(): boolean;
    get _isGroupItem(): boolean;
    isOpened(): boolean;
    _handleItemNavigation(forward: boolean, index: number): void;
    _selectNextItem(): void;
    _selectPreviousItem(): void;
    get visibleItems(): IInputSuggestionItem[];
    _moveItemSelection(previousIdx: number, nextIdx: number): void;
    _deselectItems(): void;
    _clearItemFocus(): void;
    _isItemIntoView(item: IInputSuggestionItem): boolean;
    _scrollItemIntoView(item: IInputSuggestionItem): void;
    _getScrollContainer(): HTMLElement;
    /**
     * Returns the items in 1D array.
     *
     */
    _getItems(): Array<IInputSuggestionItem>;
    _getNonGroupItems(): Array<IInputSuggestionItemSelectable>;
    _getComponent(): SuggestionComponent;
    _getList(): List;
    _getListWidth(): number;
    _getPicker(): ResponsivePopover;
    get itemSelectionAnnounce(): string;
    hightlightInput(text: string, input: string): string;
    get _hasValueState(): boolean;
    _clearSelectedSuggestionAndaccInfo(): void;
}
export default Suggestions;
export type { SuggestionComponent, };
