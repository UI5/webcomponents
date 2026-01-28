import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";
import type List from "@ui5/webcomponents/dist/List.js";
import {
	isUp,
	isDown,
	isEnter,
	isBackSpace,
	isDelete,
	isEscape,
	isTabNext,
	isPageUp,
	isPageDown,
	isHome,
	isEnd,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";

import SearchTemplate from "./SearchTemplate.js";
import SearchCss from "./generated/themes/Search.css.js";
import SearchField from "./SearchField.js";
import { StartsWith } from "@ui5/webcomponents/dist/Filters.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SearchItem from "./SearchItem.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type IllustratedMessage from "./IllustratedMessage.js";
import type SearchItemGroup from "./SearchItemGroup.js";
import type SearchMessageArea from "./SearchMessageArea.js";
import { SEARCH_CANCEL_BUTTON, SEARCH_SUGGESTIONS } from "./generated/i18n/i18n-defaults.js";
import { i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import type { InputEventDetail } from "@ui5/webcomponents/dist/Input.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import type { PopupBeforeCloseEventDetail } from "@ui5/webcomponents/dist/Popup.js";
import type Select from "@ui5/webcomponents/dist/Select.js";

interface ISearchSuggestionItem extends UI5Element {
	selected: boolean;
	text: string;
	items?: ISearchSuggestionItem[];
}

type SearchEventDetails = {
	item?: ISearchSuggestionItem;
}

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
@customElement({
	tag: "ui5-search",
	languageAware: true,
	renderer: jsxRenderer,
	template: SearchTemplate,
	styles: [
		SearchField.styles,
		SearchCss,
	],
})

/**
 * Fired when the popup is opened.
 *
 * @public
 */
@event("open")

/**
 * Fired when the popup is closed.
 *
 * @public
 */
@event("close")

class Search extends SearchField {
	eventDetails!: SearchField["eventDetails"] & {
		search: SearchEventDetails,
		"popup-action-press": void,
		"open": void,
		"close": void,
	};

	/**
	 * Indicates whether a loading indicator should be shown in the popup.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines whether the value will be autcompleted to match an item.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	noTypeahead = false;

	/**
	 * Defines the Search suggestion items.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		invalidateOnChildChange: true,
	})
	items!: Array<SearchItem | SearchItemGroup>;

	/**
	 * Defines the popup footer action button.
	 *
	 * @public
	 */
	@slot()
	action!: Array<Button>;

	/**
	 * Defines the illustrated message to be shown in the popup.
	 *
	 * @public
	 */
	@slot()
	illustration!: Array<IllustratedMessage>;

	/**
	 * Defines the illustrated message to be shown in the popup.
	 *
	 * @public
	 */
	@slot()
	messageArea!: Array<SearchMessageArea>;

	/**
	 * Indicates whether the items picker is open.
	 * @public
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the inner stored value of the component.
	 *
	 * **Note:** The property is updated upon typing.
	 * @default ""
	 * @private
	 */
	@property({ noAttribute: true })
	_innerValue?: string;

	/**
	 * Determines whether the item selection should be performed on mobile devices.
	 * Similar to _performTextSelection on desktop
	 * @private
	 */
	@property({ type: Boolean })
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

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	constructor() {
		super();

		// The typed in value.
		this._typedInValue = "";
		this._valueBeforeOpen = this.getAttribute("value") || "";
		this._isTyping = false;
	}

	onBeforeRendering() {
		super.onBeforeRendering();

		if (this.collapsed && !isPhone()) {
			this.open = false;
			return;
		}

		const innerInput = this.nativeInput;
		const autoCompletedChars = innerInput && (innerInput.selectionEnd! - innerInput.selectionStart!);

		this.open = this.open || (this._popoupHasAnyContent() && this._isTyping && innerInput!.value.length > 0);

		// If there is already a selection the autocomplete has already been performed
		if (this._shouldAutocomplete && !autoCompletedChars) {
			const item = this._getFirstMatchingItem(this.value);
			this._proposedItem = item;

			if (item) {
				this._handleTypeAhead(item);
				this._selectMatchingItem(item);
			} else {
				this._deselectItems();
			}
		}

		if (isPhone() && this.open) {
			const item = this._getFirstMatchingItem(this.value);
			this._proposedItem = item;

			if (item && this._performItemSelectionOnMobile) {
				this._selectMatchingItem(item);
			}
		}

		this._flattenItems.forEach(item => {
			(item as SearchItem).highlightText = this._typedInValue;
		});
	}

	onAfterRendering(): void {
		const innerInput = this.nativeInput;

		if (this._performTextSelection && innerInput && innerInput.value !== this._innerValue) {
			innerInput.value = this._innerValue || "";
		}

		if (this._performTextSelection && this._typedInValue.length && this.value.length) {
			innerInput?.setSelectionRange(this._typedInValue.length, this.value.length);
		}

		this._performTextSelection = false;

		if (!this.collapsed) {
			this.style.setProperty("--search_width", `${this.getBoundingClientRect().width}px`);
		}
	}

	_handleMobileInput(e: CustomEvent<InputEventDetail>) {
		this.value = (e.target as Input).value;
		this._performItemSelectionOnMobile = this._shouldPerformSelectionOnMobile(e.detail.inputType);

		this.fireDecoratorEvent("input");
	}

	_shouldPerformSelectionOnMobile(inputType: string): boolean {
		const allowedEventTypes = [
			"deleteWordBackward",
			"deleteWordForward",
			"deleteSoftLineBackward",
			"deleteSoftLineForward",
			"deleteEntireSoftLine",
			"deleteHardLineBackward",
			"deleteHardLineForward",
			"deleteByDrag",
			"deleteByCut",
			"deleteContent",
			"deleteContentBackward",
			"deleteContentForward",
			"historyUndo",
		];

		return !this.noTypeahead && !allowedEventTypes.includes(inputType || "");
	}

	_handleTypeAhead(item: ISearchSuggestionItem) {
		const originalValue = item.text || "";

		this._typedInValue = this.value;
		this._innerValue = originalValue;
		this._performTextSelection = true;
		this.value = originalValue;
	}

	_startsWithMatchingItems(str: string): Array<ISearchSuggestionItem> {
		return StartsWith(str, this._flattenItems.filter(item => !this._isGroupItem(item) && !this._isShowMoreItem(item)), "text");
	}

	_isGroupItem(item: HTMLElement): item is SearchItemGroup {
		return item.hasAttribute("ui5-search-item-group");
	}

	_isShowMoreItem(item: ISearchSuggestionItem) {
		return item.hasAttribute("ui5-search-item-show-more");
	}

	_deselectItems() {
		this._flattenItems.forEach(item => {
			item.selected = false;
		});
	}

	_selectMatchingItem(item: ISearchSuggestionItem) {
		this._deselectItems();
		item.selected = true;
	}

	_handleDown(e: KeyboardEvent) {
		if (this.open) {
			e.preventDefault();
			this._handleArrowDown();
		}
	}

	_handleArrowDown() {
		const focusableItems = this._getItemsList().listItems;
		const firstListItem = focusableItems.at(0);

		if (this.open) {
			this._deselectItems();
			this.value = this._typedInValue || this.value;
			this._innerValue = this.value;

			firstListItem?.focus();
		}
	}

	_handleInnerClick() {
		if (isPhone()) {
			this.open = true;
		}
	}

	_handleSearchIconPress() {
		if (isPhone()) {
			this.open = true;
		} else {
			super._handleSearchIconPress();
		}
	}

	_handleEnter() {
		const prevented = !this.fireDecoratorEvent("search", { item: this._proposedItem });

		if (prevented) {
			return;
		}

		const innerInput = this.nativeInput!;

		innerInput.setSelectionRange(this.value.length, this.value.length);
		this.open = false;
		this._isTyping = false;
	}

	_onMobileInputKeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this.value = this.mobileInput?.value || this.value;
			this._handleEnter();

			this.blur();
		}
	}

	_handleSearchEvent() {
		this.fireDecoratorEvent("search", { item: this._proposedItem });
	}

	_handleEscape() {
		this.value = this._typedInValue || this.value;
		this._innerValue = this.value;
		this._isTyping = false;
	}

	_handleInput(e: InputEvent) {
		super._handleInput(e);
		this._typedInValue = this.value;
		this._proposedItem = undefined;

		if (isPhone()) {
			return;
		}

		this._isTyping = true;
		this.open = this.value.length > 0 && this._popoupHasAnyContent();
	}

	_handleClear(): void {
		super._handleClear();

		this._typedInValue = "";
		this._innerValue = "";
		this._shouldAutocomplete = false;
		this.open = false;
	}

	_popoupHasAnyContent() {
		return this.items.length > 0 || this.illustration.length > 0 || this.messageArea.length > 0 || this.loading || this.action.length > 0;
	}

	_onFooterButtonKeyDown(e: KeyboardEvent) {
		if (isUp(e)) {
			this._flattenItems[this._flattenItems.length - 1].focus();
		}
		if (isTabPrevious(e)) {
			this._getItemsList().focus();
		}
	}

	_onItemKeydown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		// if focus is on the group header (in group's shadow dom) the target is the group itself,
		// if so using getFocusDomRef ensures the actual focused element is used
		const focusedItem = this._isGroupItem(target) ? target?.getFocusDomRef() : target;
		const focusableItems = this._getItemsList().listItems;
		const isFirstItem = focusableItems.at(0) === focusedItem;
		const isLastItem = focusableItems.at(-1) === focusedItem;
		const isArrowUp = isUp(e);
		const isArrowDown = isDown(e);
		const isTab = isTabNext(e);

		e.preventDefault();

		if (isFirstItem && isArrowUp) {
			this.nativeInput?.focus();
			this._shouldAutocomplete = true;
		}

		if ((isLastItem && isArrowDown) || isTab) {
			this._getFooterButton()?.focus();
		}
	}

	_onItemClick(e: CustomEvent) {
		const item = e.detail.item as ISearchSuggestionItem;
		const prevented = !this.fireDecoratorEvent("search", { item });

		if (prevented) {
			if (isPhone()) {
				this.open = false;
			}

			return;
		}

		this.value = item.text;
		this._innerValue = this.value;
		this._typedInValue = this.value;
		this._shouldAutocomplete = false;
		this._performTextSelection = true;
		this.open = false;
		this._isTyping = false;
		this.focus();
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		if (this.loading) {
			return;
		}

		this._shouldAutocomplete = !this.noTypeahead
			&& !(isBackSpace(e) || isDelete(e) || isEscape(e) || isUp(e) || isDown(e) || isTabNext(e) || isEnter(e) || isPageUp(e) || isPageDown(e) || isHome(e) || isEnd(e) || isEscape(e));

		if (isDown(e)) {
			this._handleDown(e);
		}

		if (isEscape(e)) {
			this._handleEscape();
		}

		// deselect item on backspace or delete
		if (isBackSpace(e) || isDelete(e)) {
			this._deselectItems();
		}
	}

	_onFocusOutSearch(e:FocusEvent) {
		const target = e.relatedTarget as HTMLElement;

		if (this._getPicker().contains(target) || this.contains(target)) {
			return;
		}

		this.open = false;
		this._isTyping = false;
	}

	_handleBeforeClose(e: CustomEvent<PopupBeforeCloseEventDetail>) {
		if (e.detail.escPressed) {
			this.focus();
		}
	}

	_handleCancel() {
		this._handleClose();
		this.value = this._valueBeforeOpen;
		this.fireDecoratorEvent("input");
	}

	_handleClose() {
		this.open = false;
		this._isTyping = false;
		this.fireDecoratorEvent("close");
	}

	_handleBeforeOpen() {
		this._valueBeforeOpen = this.value;

		if (isPhone() && this.mobileInput) {
			this.mobileInput.value = this.value;
		}
	}

	_handleOpen() {
		this.fireDecoratorEvent("open");
	}

	_handleActionKeydown(e: KeyboardEvent) {
		if (isUp(e)) {
			this._flattenItems[this._flattenItems.length - 1].focus();
		}
	}

	_onFooterButtonClick() {
		this.fireDecoratorEvent("popup-action-press");
	}

	_getFirstMatchingItem(current: string): ISearchSuggestionItem | undefined {
		if (!this._flattenItems.length || !current) {
			return;
		}

		const startsWithMatches = this._startsWithMatchingItems(current);

		if (!startsWithMatches.length) {
			return undefined;
		}

		return startsWithMatches[0];
	}

	_getPicker() {
		return this.shadowRoot!.querySelector<Popover>("[ui5-responsive-popover]")!;
	}

	_getItemsList(): List {
		return this._getPicker().querySelector(".ui5-search-list") as List;
	}

	_getFooterButton(): Button {
		return this.action[0];
	}

	get _flattenItems(): Array<ISearchSuggestionItem> {
		return this.getSlottedNodes<ISearchSuggestionItem>("items").flatMap(item => {
			return this._isGroupItem(item) ? [item, ...item.items] : [item];
		});
	}

	get nativeInput() {
		const domRef = this.getDomRef();

		return domRef?.querySelector<HTMLInputElement>(`input`);
	}

	get mobileInput() {
		const domRef = this.shadowRoot;

		return domRef ? domRef.querySelector<Input>(`[ui5-input]`) : null;
	}

	get cancelButtonText() {
		return Search.i18nBundle.getText(SEARCH_CANCEL_BUTTON);
	}

	get suggestionsText() {
		return Search.i18nBundle.getText(SEARCH_SUGGESTIONS);
	}

	get scopeSelect() {
		const domRef = this.shadowRoot;

		return domRef ? domRef.querySelector<Select>(`[ui5-select]`) : null;
	}
}

Search.define();

export default Search;
