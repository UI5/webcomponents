import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
import type List from "../List.js";
import type { ListItemClickEventDetail, ListSelectionChangeEventDetail } from "../List.js";
import type ResponsivePopover from "../ResponsivePopover.js";
import "../SuggestionItem.js";
import "../SuggestionItemGroup.js";
import type SuggestionItem from "../SuggestionItem.js";
import type ListItemGroupHeader from "../ListItemGroupHeader.js";
import InputSuggestionsTemplate from "./InputSuggestionsTemplate.js";
import Input from "../Input.js";

import {
	LIST_ITEM_POSITION,
	LIST_ITEM_GROUP_HEADER,
} from "../generated/i18n/i18n-defaults.js";
import type ListItemBase from "../ListItemBase.js";
import type SuggestionItemGroup from "../SuggestionItemGroup.js";
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
}

/**
 * A class to manage the `Input` suggestion items.
 * @class
 * @private
 */
class Suggestions {
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
	static SCROLL_STEP = 60;

	get template() {
		return InputSuggestionsTemplate;
	}

	constructor(component: SuggestionComponent, slotName: string, highlight: boolean, handleFocus: boolean) {
		// The component, that the suggestion would plug into.
		this.component = component;

		// Defines the items` slot name.
		this.slotName = slotName;

		// Defines, if the focus will be moved via the arrow keys.
		this.handleFocus = handleFocus;

		// Defines, if the suggestions should highlight.
		this.highlight = highlight;

		// An integer value to store the currently selected item position,
		// that changes due to user interaction.
		this.selectedItemIndex = -1;
	}

	onUp(e: KeyboardEvent, indexOfItem: number) {
		e.preventDefault();
		const index = !this.isOpened && this._hasValueState && indexOfItem === -1 ? 0 : indexOfItem;
		this._handleItemNavigation(false /* forward */, index);
		return true;
	}

	onDown(e: KeyboardEvent, indexOfItem: number) {
		e.preventDefault();
		const index = !this.isOpened && this._hasValueState && indexOfItem === -1 ? 0 : indexOfItem;
		this._handleItemNavigation(true /* forward */, index);
		return true;
	}

	onSpace(e: KeyboardEvent) {
		if (this._isItemOnTarget()) {
			e.preventDefault();
			this.onItemSelected(this._selectedItem, true /* keyboardUsed */);
			return true;
		}
		return false;
	}

	onEnter(e: KeyboardEvent) {
		if (this._isGroupItem) {
			e.preventDefault();
			return false;
		}

		if (this._isItemOnTarget()) {
			this.onItemSelected(this._selectedItem, true /* keyboardUsed */);
			return true;
		}

		return false;
	}

	onPageUp(e: KeyboardEvent) {
		e.preventDefault();

		const isItemIndexValid = this.selectedItemIndex - 10 > -1;

		this._moveItemSelection(this.selectedItemIndex,
			isItemIndexValid ? this.selectedItemIndex -= 10 : this.selectedItemIndex = 0);
		return true;
	}

	onPageDown(e: KeyboardEvent) {
		e.preventDefault();

		const items = this.visibleItems;

		if (!items) {
			return true;
		}

		const lastItemIndex = items.length - 1;
		const isItemIndexValid = this.selectedItemIndex + 10 <= lastItemIndex;

		this._moveItemSelection(this.selectedItemIndex,
			isItemIndexValid ? this.selectedItemIndex += 10 : this.selectedItemIndex = lastItemIndex);
		return true;
	}

	onHome(e: KeyboardEvent) {
		e.preventDefault();

		this._moveItemSelection(this.selectedItemIndex, this.selectedItemIndex = 0);
		return true;
	}

	onEnd(e: KeyboardEvent) {
		e.preventDefault();

		const lastItemIndex = this._getItems().length - 1;

		if (!lastItemIndex) {
			return true;
		}

		this._moveItemSelection(this.selectedItemIndex, this.selectedItemIndex = lastItemIndex);
		return true;
	}

	onTab() {
		if (this._isItemOnTarget()) {
			this.onItemSelected(this._selectedItem, true);
			return true;
		}
		return false;
	}

	toggle(bToggle: boolean, options: { preventFocusRestore: boolean }) {
		const toggle = bToggle !== undefined ? bToggle : !this.isOpened();

		if (toggle) {
			this._getComponent().open = true;
		} else {
			this.close(options.preventFocusRestore);
		}
	}

	get _selectedItem() {
		return this._getNonGroupItems().find(item => item.selected) as SuggestionItem | null;
	}

	_isScrollable() {
		const sc = this._getScrollContainer();
		return sc.offsetHeight < sc.scrollHeight;
	}

	close(preventFocusRestore = false) {
		const selectedItem = this._getItems() && this._getItems()[this.selectedItemIndex];

		this._getComponent().open = false;
		const picker = this._getPicker();
		picker.preventFocusRestore = preventFocusRestore;
		picker.open = false;

		if (selectedItem && selectedItem.focused) {
			selectedItem.focused = false;
		}
	}

	updateSelectedItemPosition(pos: number) {
		this.selectedItemIndex = pos;
	}

	onItemSelected(selectedItem: IInputSuggestionItemSelectable | null, keyboardUsed: boolean) {
		const item = selectedItem;
		const nonGroupItems = this._getNonGroupItems();

		if (!item) {
			return;
		}

		this.accInfo = {
			isGroup: item.hasAttribute("ui5-suggestion-item-group"),
			currentPos: nonGroupItems.indexOf(item) + 1,
			listSize: nonGroupItems.length,
			itemText: item.text || "",
			additionalText: item.additionalText,
		};

		this._getComponent().onItemSelected(item, keyboardUsed);
		this._getComponent().open = false;
	}

	onItemSelect(item: IInputSuggestionItem) {
		this._getComponent().onItemSelect(item);
	}

	/* Private methods */
	// Note: Split into two separate handlers
	onItemPress(e: CustomEvent<ListItemClickEventDetail | ListSelectionChangeEventDetail>) {
		let pressedItem: ListItemBase; // SuggestionListItem
		const isPressEvent = e.type === "ui5-item-click";

		// Only use the press e if the item is already selected, in all other cases we are listening for 'ui5-selection-change' from the list
		// Also we have to check if the selection-change is fired by the list's 'item-click' event handling, to avoid double handling on our side
		if ((isPressEvent && !(e.detail as ListItemClickEventDetail).item.selected) || (this._handledPress && !isPressEvent)) {
			return;
		}

		if (isPressEvent && (e.detail as ListItemClickEventDetail).item.selected) {
			pressedItem = (e.detail as ListItemClickEventDetail).item;
			this._handledPress = true;
		} else {
			pressedItem = (e.detail as ListSelectionChangeEventDetail).selectedItems[0];
		}

		this.onItemSelected(pressedItem as SuggestionItem, false /* keyboardUsed */);
	}

	_onClose() {
		this._handledPress = false;
	}

	_isItemOnTarget() {
		return this.isOpened() && this.selectedItemIndex !== null && this.selectedItemIndex !== -1 && !this._isGroupItem;
	}

	get _isGroupItem() {
		const items = this._getItems();

		if (!items || !items[this.selectedItemIndex]) {
			return false;
		}

		return items[this.selectedItemIndex].hasAttribute("ui5-suggestion-item-group");
	}

	isOpened() {
		return !!(this._getPicker()?.open);
	}

	_handleItemNavigation(forward: boolean, index: number) {
		this.selectedItemIndex = index;

		if (!this._getItems().length) {
			return;
		}
		if (forward) {
			this._selectNextItem();
		} else {
			this._selectPreviousItem();
		}
	}

	_selectNextItem() {
		const itemsCount = this._getItems().length;

		const previousSelectedIdx = this.selectedItemIndex;

		if (previousSelectedIdx !== -1 && previousSelectedIdx + 1 > itemsCount - 1) {
			return;
		}

		this._moveItemSelection(previousSelectedIdx, ++this.selectedItemIndex);
	}

	_selectPreviousItem() {
		const items = this.visibleItems;
		const previousSelectedIdx = this.selectedItemIndex;

		if (previousSelectedIdx === -1 || previousSelectedIdx === null) {
			return;
		}

		if (previousSelectedIdx - 1 < 0) {
			if (items[previousSelectedIdx].hasAttribute("ui5-suggestion-item") || items[previousSelectedIdx].hasAttribute("ui5-suggestion-item-custom")) {
				(items[previousSelectedIdx] as SuggestionItem).selected = false;
			}

			items[previousSelectedIdx].focused = false;

			this.component.focused = true;
			this.component.hasSuggestionItemSelected = false;
			this.selectedItemIndex -= 1;
			return;
		}

		this._moveItemSelection(previousSelectedIdx, --this.selectedItemIndex);
	}

	get visibleItems() {
		return this._getItems().filter(item => !item.hidden);
	}

	_moveItemSelection(previousIdx: number, nextIdx: number) {
		const items = this.visibleItems;
		const currentItem = items[nextIdx];
		const previousItem = items[previousIdx];
		const nonGroupItems = this._getNonGroupItems();
		const isGroupItem = currentItem?.hasAttribute("ui5-suggestion-item-group");

		if (!currentItem) {
			return;
		}

		this.component.focused = false;

		const selectedItem = this.visibleItems[this.selectedItemIndex];

		this.accInfo = {
			isGroup: isGroupItem,
			currentPos: items.indexOf(currentItem) + 1,
			itemText: (isGroupItem ? (selectedItem as SuggestionItemGroup).headerText : (selectedItem as IInputSuggestionItemSelectable).text) || "",
		};

		if (currentItem.hasAttribute("ui5-suggestion-item") || currentItem.hasAttribute("ui5-suggestion-item-custom")) {
			this.accInfo.additionalText = (currentItem as IInputSuggestionItemSelectable).additionalText || "";
			this.accInfo.currentPos = nonGroupItems.indexOf(currentItem as IInputSuggestionItemSelectable) + 1;
			this.accInfo.listSize = nonGroupItems.length;
		}

		if (previousItem) {
			previousItem.focused = false;
		}
		if (previousItem?.hasAttribute("ui5-suggestion-item") || previousItem?.hasAttribute("ui5-suggestion-item-custom")) {
			(previousItem as IInputSuggestionItemSelectable).selected = false;
		}

		if (currentItem) {
			currentItem.focused = true;

			if (!isGroupItem) {
				(currentItem as IInputSuggestionItemSelectable).selected = true;
			}

			if (this.handleFocus) {
				currentItem.focus();
			}
		}

		this.component.hasSuggestionItemSelected = true;
		this.onItemSelect(currentItem);

		if (!this._isItemIntoView(currentItem)) {
			const itemRef = this._isGroupItem ? (currentItem.shadowRoot!.querySelector("[ui5-li-group-header]") as ListItemGroupHeader) : currentItem;
			this._scrollItemIntoView(itemRef);
		}
	}

	_deselectItems() {
		const items = this._getItems();
		items.forEach(item => {
			if (item.hasAttribute("ui5-suggestion-item")) {
				(item as SuggestionItem).selected = false;
			}

			item.focused = false;
		});
	}

	_clearItemFocus() {
		const focusedItem = this._getItems().find(item => item.focused);

		if (focusedItem) {
			focusedItem.focused = false;
		}
	}

	_isItemIntoView(item: IInputSuggestionItem) {
		const rectItem = item.getDomRef()!.getBoundingClientRect();
		const rectInput = this._getComponent().getDomRef()!.getBoundingClientRect();
		const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
		let headerHeight = 0;

		if (this._hasValueState) {
			const valueStateHeader = this._getPicker().querySelector("[slot=header]")!;
			headerHeight = valueStateHeader.getBoundingClientRect().height;
		}

		return (rectItem.top + Suggestions.SCROLL_STEP <= windowHeight) && (rectItem.top >= rectInput.top + headerHeight);
	}

	_scrollItemIntoView(item: IInputSuggestionItem) {
		item.scrollIntoView({
			behavior: "auto",
			block: "nearest",
			inline: "nearest",
		});
	}

	_getScrollContainer() {
		if (!this._scrollContainer) {
			this._scrollContainer = this._getPicker().shadowRoot!.querySelector(".ui5-popup-content")!;
		}

		return this._scrollContainer;
	}

	/**
	 * Returns the items in 1D array.
	 *
	 */
	_getItems(): Array<IInputSuggestionItem> {
		const suggestionComponent = this._getComponent();

		return suggestionComponent.getSlottedNodes<IInputSuggestionItem>("suggestionItems").flatMap(item => {
			return item.hasAttribute("ui5-suggestion-item-group") ? [item, ...item.items!] : [item];
		});
	}

	_getNonGroupItems(): Array<IInputSuggestionItemSelectable> {
		return this._getItems().filter(item => !item.hasAttribute("ui5-suggestion-item-group")) as Array<IInputSuggestionItemSelectable>;
	}

	_getComponent(): SuggestionComponent {
		return this.component;
	}

	_getList() {
		return this._getPicker().querySelector<List>("[ui5-list]")!;
	}

	_getListWidth() {
		return this._getList()?.offsetWidth;
	}

	_getPicker() {
		return this._getComponent().shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	get itemSelectionAnnounce() {
		if (!this.accInfo) {
			return "";
		}

		if (this.accInfo.isGroup) {
			return `${Suggestions.i18nBundle.getText(LIST_ITEM_GROUP_HEADER)} ${this.accInfo.itemText}`;
		}

		const itemPositionText = Suggestions.i18nBundle.getText(LIST_ITEM_POSITION, this.accInfo.currentPos || 0, this.accInfo.listSize || 0);

		return `${this.accInfo.additionalText} ${itemPositionText}`.trim();
	}

	hightlightInput(text: string, input: string) {
		return generateHighlightedMarkup(text, input);
	}

	get _hasValueState() {
		return this.component.hasValueStateMessage;
	}

	_clearSelectedSuggestionAndaccInfo() {
		this.accInfo = undefined;
		this.selectedItemIndex = 0;
	}
}

Input.SuggestionsClass = Suggestions;

export default Suggestions;

export type {
	SuggestionComponent,
};
