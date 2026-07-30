/* eslint-disable spaced-comment */
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
// @ts-expect-error
import encodeXML from "@ui5/webcomponents-base/dist/sap/base/security/encodeXML.js";

import {
	isPhone,
	isAndroid,
} from "@ui5/webcomponents-base/dist/Device.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
	isUp,
	isDown,
	isSpace,
	isBackSpace,
	isDelete,
	isEnter,
	isEscape,
	isTabNext,
	isPageUp,
	isPageDown,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { attachListeners } from "@ui5/webcomponents-base/dist/util/valueStateNavigation.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import type SuggestionItem from "./SuggestionItem.js";
import type { SuggestionComponent } from "./features/InputSuggestions.js";
import type InputSuggestions from "./features/InputSuggestions.js";

import InputField, { INPUT_ACTIONS } from "./InputField.js";
import type { InputAccInfo, InputEventDetail } from "./InputField.js";

// Templates
import InputTemplate from "./InputTemplate.js";
import * as Filters from "./Filters.js";

import {
	INPUT_SUGGESTIONS,
	INPUT_SUGGESTIONS_TITLE,
	INPUT_SUGGESTIONS_ONE_HIT,
	INPUT_SUGGESTIONS_MORE_HITS,
	INPUT_SUGGESTIONS_NO_HIT,
	INPUT_AVALIABLE_VALUES,
	INPUT_SUGGESTIONS_OK_BUTTON,
	INPUT_SUGGESTIONS_CANCEL_BUTTON,
	INPUT_SUGGESTIONS_EXPANDED,
	INPUT_SUGGESTIONS_COLLAPSED,
} from "./generated/i18n/i18n-defaults.js";

import { submitForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { getEffectiveAriaDescriptionText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";

// Styles
import inputStyles from "./generated/themes/Input.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";
import type { ListItemClickEventDetail, ListSelectionChangeEventDetail } from "./List.js";
import type { ListItemBaseClickEventDetail } from "./ListItemBase.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type { ToolbarArrowNavState } from "./IToolbarArrowNavProvider.js";
import InputSuggestionsFilter from "./types/InputSuggestionsFilter.js";

/**
 * Interface for components that represent a suggestion item, usable in `ui5-input`
 * @public
 */
interface IInputSuggestionItem extends UI5Element {
	focused: boolean;
	additionalText?: string;
	items?: IInputSuggestionItem[];
	eventDetails: { click?: ListItemBaseClickEventDetail };
}

interface IInputSuggestionItemSelectable extends IInputSuggestionItem {
	text?: string;
	selected: boolean;
}

// Suggestion-specific events
enum INPUT_EVENTS {
	CHANGE = "change",
	INPUT = "input",
	SELECTION_CHANGE = "selection-change",
}

type InputSelectionChangeEventDetail = {
	item: IInputSuggestionItem | null;
}

type InputSuggestionScrollEventDetail = {
	scrollTop: number;
	scrollContainer: HTMLElement;
}

/**
 * @class
 * ### Overview
 *
 * The `ui5-input` component allows the user to enter and edit text or numeric values in one line.
 *
 * Additionally, you can provide `suggestionItems`
 * that are displayed in a popover right under the input. Keep in mind that `ui5-input` with type `Number` does not support suggestions.
 *
 * The text field can be editable or read-only (`readonly` property),
 * and it can be enabled or disabled (`disabled` property).
 * To visualize semantic states, such as "Negative" or "Critical", the `valueState` property is provided.
 * When the user makes changes to the text, the change event is fired,
 * which enables you to react on any text change.
 *
 * ### Keyboard Handling
 * The `ui5-input` provides the following keyboard shortcuts:
 *
 * - [Escape] - Closes the suggestion list, if open. If closed or not enabled, cancels changes and reverts to the value which the Input field had when it got the focus.
 * - [Enter] or [Return] - If suggestion list is open takes over the current matching item and closes it. If value state or group header is focused, does nothing.
 * - [Down] - Focuses the next matching item in the suggestion list. Selection-change event is fired.
 * - [Up] - Focuses the previous matching item in the suggestion list. Selection-change event is fired.
 * - [Home] - If focus is in the text input, moves caret before the first character. If focus is in the list, highlights the first item and updates the input accordingly.
 * - [End] - If focus is in the text input, moves caret after the last character. If focus is in the list, highlights the last item and updates the input accordingly.
 * - [Page Up] - If focus is in the list, moves highlight up by page size (10 items by default). If focus is in the input, does nothing.
 * - [Page Down] - If focus is in the list, moves highlight down by page size (10 items by default). If focus is in the input, does nothing.
 * - [Ctrl]+[Alt]+[F8] or [Command]+[Option]+[F8] - Focuses the first link in the value state message, if available. Pressing [Tab] moves the focus to the next link in the value state message, or closes the value state message if there are no more links.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Input.js";`
 *
 * @constructor
 * @extends InputField
 * @public
 * @csspart root - Used to style the root DOM element of the Input component
 * @csspart input - Used to style the native input element
 * @csspart clear-icon - Used to style the clear icon, which can be pressed to clear user input text
 */
@customElement({
	tag: "ui5-input",
	template: InputTemplate,
	styles: [
		InputField.styles,
		inputStyles,
		SuggestionsCss,
	],
})

/**
 * Fired when the user navigates to a suggestion item via the ARROW keys,
 * as a preview, before the final selection.
 * @param {HTMLElement} item The previewed suggestion item.
 * @public
 * @since 2.0.0
 */
@event("selection-change", {
	bubbles: true,
})

/**
 * Fires when a suggestion item is autocompleted in the input.
 *
 * @private
 */
@event("type-ahead", {
	bubbles: true,
})

/**
 * Fired when the user scrolls the suggestion popover.
 * @param {Integer} scrollTop The current scroll position.
 * @param {HTMLElement} scrollContainer The scroll container.
 * @protected
 * @since 1.0.0-rc.8
 */
@event("suggestion-scroll", {
	bubbles: true,
})

/**
 * Fired when the suggestions picker is open.
 * @public
 * @since 2.0.0
 */
@event("open", {
	bubbles: true,
})

/**
 * Fired when the suggestions picker is closed.
 * @public
 * @since 2.0.0
 */
@event("close")

class Input extends InputField implements SuggestionComponent {
	eventDetails!: InputField["eventDetails"] & {
		"selection-change": InputSelectionChangeEventDetail,
		"type-ahead": void,
		"suggestion-scroll": InputSuggestionScrollEventDetail,
		"open": void,
		"close": void,
	}

	// ======================= Suggestion-specific properties =======================

	/**
	 * Defines if characters within the suggestions are to be highlighted
	 * in case the input value matches parts of the suggestions text.
	 *
	 * **Note:** takes effect when `showSuggestions` is set to `true`
	 * @default false
	 * @private
	 * @since 1.0.0-rc.8
	 */
	@property({ type: Boolean })
	highlight = false;

	/**
	 * Defines whether the value will be autcompleted to match an item
	 * @default false
	 * @public
	 * @since 1.4.0
	 */
	@property({ type: Boolean })
	noTypeahead = false;

	/**
	 * Defines whether the component should show suggestions, if such are present.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSuggestions = false;

	/**
	 * Defines whether the suggestions picker is open.
	 * The picker will not open if the `showSuggestions` property is set to `false`, the input is disabled or the input is readonly.
	 * The picker will close automatically and `close` event will be fired if the input is not in the viewport.
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the filter type of the component.
	 * @default "None"
	 * @public
	 * @since 2.19.0
	 */
	@property()
	filter: `${InputSuggestionsFilter}` = InputSuggestionsFilter.None;

	@property({ type: Number })
	_listWidth?: number;

	/**
	 * @private
	 */
	@property({ type: Object })
	Suggestions?: InputSuggestions;

	/**
	 * Defines the suggestion items.
	 *
	 * **Note:** The suggestions would be displayed only if the `showSuggestions`
	 * property is set to `true`.
	 *
	 * **Note:** The `<ui5-suggestion-item>`, `<ui5-suggestion-item-group>` and `ui5-suggestion-item-custom` are recommended to be used as suggestion items.
	 *
	 * **Note:** Input with type `Number` does not support suggestions.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	suggestionItems!: DefaultSlot<IInputSuggestionItem>;

	// ======================= Suggestion-specific instance variables =======================

	hasSuggestionItemSelected: boolean;
	valueBeforeItemSelection: string;
	valueBeforeSelectionStart: string;
	typedInValue: string;
	_shouldAutocomplete?: boolean;
	_isKeyNavigation?: boolean;
	_indexOfSelectedItem: number;
	_selectedText?: string;
	_changeToBeFired?: boolean;
	_matchedSuggestionItem?: IInputSuggestionItemSelectable;
	_performTextSelection?: boolean;
	_isLatestValueFromSuggestions: boolean;
	_isChangeTriggeredBySuggestion: boolean;

	static SuggestionsClass?: typeof InputSuggestions;

	get _effectiveShowSuggestions() {
		return !!(this.showSuggestions && this.Suggestions);
	}

	constructor() {
		super();
		// Indicates if there is selected suggestionItem.
		this.hasSuggestionItemSelected = false;

		// Represents the value before user moves selection from suggestion item to another
		// and its value is updated after each move.
		// Note: Used to register and fire "input" event upon [Space] or [Enter].
		// Note: The property "value" is updated upon selection move and can`t be used.
		this.valueBeforeItemSelection = "";

		// Represents the value before user moves selection between the suggestion items
		// and its value remains the same when the user navigates up or down the list.
		// Note: Used to cancel selection upon [Escape].
		this.valueBeforeSelectionStart = "";

		// The typed in value.
		this.typedInValue = "";

		// Indicates whether the value of the input is comming from a suggestion item
		this._isLatestValueFromSuggestions = false;

		this._isChangeTriggeredBySuggestion = false;

		this._indexOfSelectedItem = -1;
	}

	// ======================= Suggestion-related methods =======================

	_highlightSuggestionItem(item: SuggestionItem) {
		item.markupText = this.typedInValue ? this.Suggestions?.hightlightInput((item.text || ""), this.typedInValue) : encodeXML(item.text || "");
	}

	_isGroupItem(item: IInputSuggestionItem) {
		return item.hasAttribute("ui5-suggestion-item-group");
	}

	// ======================= Lifecycle overrides =======================

	onBeforeRendering() {
		super.onBeforeRendering();

		if (this.showSuggestions) {
			this.enableSuggestions();

			this._flattenItems.forEach(item => {
				if (item.hasAttribute("ui5-suggestion-item")) {
					this._highlightSuggestionItem(item as SuggestionItem);
				} else if (this._isGroupItem(item)) {
					item.items?.forEach(nestedItem => {
						this._highlightSuggestionItem(nestedItem as SuggestionItem);
					});
				}
			});
		}

		const hasItems = !!this._flattenItems.length;
		const hasValue = !!this.value;
		const isFocused = this.shadowRoot!.querySelector("input") === getActiveElement();
		const preventOpenPicker = this.disabled || this.readonly;
		const shouldOpenSuggestions = !preventOpenPicker && !this._isPhone && hasItems && (this.open || (hasValue && isFocused && this.isTyping));

		if (preventOpenPicker) {
			this.open = false;
		} else if (!this._isPhone) {
			this.open = hasItems && (this.open || (hasValue && isFocused && this.isTyping));
		}

		// Override value state popover logic when suggestions are open
		if (this.shouldDisplayOnlyValueStateMessage && !shouldOpenSuggestions) {
			this.openValueStatePopover();
		} else {
			this.closeValueStatePopover();
		}

		const value = this.value;
		const innerInput = this.getInputDOMRefSync();

		if (!innerInput || !value) {
			return;
		}

		if (this.filter !== InputSuggestionsFilter.None) {
			this._filterItems(this.typedInValue);
		}

		const autoCompletedChars = innerInput.selectionEnd! - innerInput.selectionStart!;

		// Typehead causes issues on Android devices, so we disable it for now
		// If there is already a selection the autocomplete has already been performed
		if (this._shouldAutocomplete && !isAndroid() && !autoCompletedChars && !this._isKeyNavigation) {
			const item = this._getFirstMatchingItem(value);
			if (item) {
				if (!this._isComposing) {
					this._handleTypeAhead(item);
				}
				this._selectMatchingItem(item);
			} else {
				this._matchedSuggestionItem = undefined;
			}
		}
	}

	onAfterRendering() {
		super.onAfterRendering();

		if (this.showSuggestions && this.Suggestions?._getPicker()) {
			this._listWidth = this.Suggestions._getListWidth();

			// disabled ItemNavigation from the list since we are not using it
			this.Suggestions._getList()._itemNavigation._getItems = () => [];
		}

		if (this._performTextSelection) {
			if (this.typedInValue.length && this.value.length) {
				this._adjustSelectionRange();
			}

			this.fireDecoratorEvent("type-ahead");
		}

		this._performTextSelection = false;
	}

	_adjustSelectionRange() {
		const innerInput = this.getInputDOMRefSync()!;
		const visibleItems = this.Suggestions?._getItems().filter(item => !item.hidden) as IInputSuggestionItemSelectable[];
		const currentItem = visibleItems?.find(item => { return item.selected || item.focused; });
		const groupItems = this._flattenItems.filter(item => this._isGroupItem(item));

		if (currentItem && !groupItems.includes(currentItem)) {
			const doesItemStartWithTypedValue = currentItem?.text?.toLowerCase().startsWith(this.typedInValue.toLowerCase());
			if (doesItemStartWithTypedValue) {
				innerInput.setSelectionRange(this.typedInValue.length, this.value.length);
			} else {
				innerInput.setSelectionRange(0, this.value.length);
			}
		} else {
			// No current item selected (e.g., during typing) - use default typeahead selection
			innerInput.setSelectionRange(this.typedInValue.length, this.value.length);
		}
	}

	_onkeydown(e: KeyboardEvent) {
		this._isKeyNavigation = true;
		this._shouldAutocomplete = !this.noTypeahead && !(isBackSpace(e) || isDelete(e) || isEscape(e));

		if (isEnter(e)) {
			const isValueUnchanged = this.previousValue === this.getInputDOMRefSync()!.value;

			this._enterKeyDown = true;
			if (isValueUnchanged) {
				this.fireDecoratorEvent("_request-submit");
				submitForm(this);
				return;
			}

			// if a group item is focused, this is false
			const suggestionItemPressed = !!(this.Suggestions?.onEnter(e));
			const innerInput = this.getInputDOMRefSync()!;

			let matchingItem = this._matchedSuggestionItem;
			if (!matchingItem) {
				matchingItem = this._selectableItems.find(item => {
					return item.text?.toLowerCase() === this.value.toLowerCase();
				});
			}

			if (matchingItem) {
				const itemText = matchingItem.text || "";

				innerInput.setSelectionRange(itemText.length, itemText.length);
				if (!suggestionItemPressed) {
					this.fireSelectionChange(matchingItem, true);
					this.acceptSuggestion(matchingItem, true);
					this.open = false;
				}
			}

			if (this._isPhone && !this._flattenItems.length && !this.isTypeNumber) {
				innerInput.setSelectionRange(this.value.length, this.value.length);
			}

			if (!suggestionItemPressed) {
				this.lastConfirmedValue = this.value;
			} else {
				this.focused = true;
			}
			return;
		}

		if (isUp(e)) {
			this._handleUp(e);
			return;
		}

		if (isDown(e)) {
			this._handleDown(e);
			return;
		}

		if (isSpace(e)) {
			this._handleSpace(e);
			return;
		}

		if (isEscape(e)) {
			return this._handleEscape();
		}

		if (isTabNext(e)) {
			this._handleTab();
			return;
		}

		if (isPageUp(e)) {
			this._handlePageUp(e);
			return;
		}

		if (isPageDown(e)) {
			this._handlePageDown(e);
			return;
		}

		if (isHome(e)) {
			this._handleHome(e);
			return;
		}

		if (isEnd(e)) {
			this._handleEnd(e);
			return;
		}

		if (this.showSuggestions) {
			this._clearPopoverFocusAndSelection();
		}

		this._isKeyNavigation = false;

		super._onkeydown(e);
	}

	_handleEscape() {
		const hasSuggestions = this.showSuggestions && !!this.Suggestions;
		const isOpen = hasSuggestions && this.open;
		const innerInput = this.getInputDOMRefSync()!;
		const isAutoCompleted = innerInput.selectionEnd! - innerInput.selectionStart! > 0;

		this.isTyping = false;
		this._matchedSuggestionItem = undefined;

		if (this.value !== this.previousValue && this.value !== this.lastConfirmedValue && !this.open) {
			this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue;
			this.fireDecoratorEvent(INPUT_EVENTS.INPUT, { inputType: "" });
			return;
		}

		if (!isOpen) {
			this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue;
			return;
		}

		if (isOpen && this.Suggestions?._isItemOnTarget()) {
			// Restore the value.
			this.value = this.typedInValue || this.valueBeforeSelectionStart;
			this.focused = true;
			return;
		}

		if (isAutoCompleted) {
			this.value = this.typedInValue;
		}

		this.focused = true;
	}

	_shouldSkipFocusOut(toBeFocused: HTMLElement): boolean {
		return !!(this.Suggestions?._getPicker()?.contains(toBeFocused));
	}

	_click() {
		if (isPhone() && !this.readonly && this.Suggestions) {
			this.blur();
			this.open = true;
		}
	}

	_input(e: CustomEvent<InputEventDetail> | InputEvent, eventType: string) {
		super._input(e, eventType);

		this.hasSuggestionItemSelected = false;

		if (this.Suggestions) {
			this.Suggestions.updateSelectedItemPosition(-1);
		}

		if (this.filter && this.value === "") {
			this.open = false;
		}
	}

	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);
		this.valueBeforeSelectionStart = this.value;
	}

	_onfocusout(e: FocusEvent) {
		const toBeFocused = e.relatedTarget as HTMLElement;

		if (this._shouldSkipFocusOut(toBeFocused) || this.contains(toBeFocused) || this.getSlottedNodes("valueStateMessage").some(el => el.contains(toBeFocused))) {
			return;
		}

		this.focused = false;
		this._isChangeTriggeredBySuggestion = false;
		if (this.showClearIcon && !this._effectiveShowClearIcon) {
			this._clearIconClicked = false;
			this._handleChange();
		}

		this.open = false;
		this._clearPopoverFocusAndSelection();

		if (!this._clearIconClicked) {
			this.previousValue = "";
		}

		this.lastConfirmedValue = "";
		this.isTyping = false;

		if ((this.value !== this.previousValue) && this.showClearIcon) {
			this._clearIconClicked = false;
		}
	}

	_clear() {
		super._clear();
		this.typedInValue = "";

		if (!this._isPhone) {
			this.fireResetSelectionChange();
		}
	}

	_addLinksEventListeners() {
		const links = this.linksInAriaValueStateHiddenText;

		links.forEach((link, index) => {
			this._linksListenersArray.push((e: KeyboardEvent) => {
				attachListeners(e, links, index, {
					closeValueState: () => {
						if (this.Suggestions?.isOpened()) {
							this.Suggestions?.close();
						}
						if (this.valueStateOpen) {
							this.closeValueStatePopover();
						}
					},
					focusInput: () => {
						this._handleLinkNavigation = false;
						this.getInputDOMRef()!.focus();
					},
					navigateToItem: () => {
						if (this._handleLinkNavigation) {
							this._handleLinkNavigation = false;
							if (this.Suggestions?.isOpened()) {
								this.innerFocusIn();
								(this.getInputDOMRef())!.focus();
								this.Suggestions.onDown(e, this.currentItemIndex);
							}
						} else {
							this._handleDown(e as unknown as KeyboardEvent);
						}
					},
					isPopoverOpen: () => { return (this.Suggestions && this.Suggestions?.isOpened()) || false; },
				});
			});
			link.addEventListener("keydown", this._linksListenersArray[index]);
		});
	}

	// ======================= Suggestion navigation handlers =======================

	get currentItemIndex() {
		const allItems = this.Suggestions?._getItems() as IInputSuggestionItemSelectable[];
		const visibleItems = allItems.filter(item => !item.hidden);
		const currentItem = visibleItems.find(item => { return item.selected || item.focused; });
		const indexOfCurrentItem = currentItem ? visibleItems.indexOf(currentItem) : -1;
		return indexOfCurrentItem;
	}

	_handleUp(e: KeyboardEvent) {
		if (this.Suggestions?.isOpened()) {
			this.Suggestions.onUp(e, this.currentItemIndex);
		}
	}

	_handleDown(e: KeyboardEvent) {
		if (this.Suggestions?.isOpened()) {
			this.Suggestions.onDown(e, this.currentItemIndex);
		}
	}

	_handleSpace(e: KeyboardEvent) {
		if (this.Suggestions) {
			this.Suggestions.onSpace(e);
		}
	}

	_handleTab() {
		if (this.Suggestions && (this.previousValue !== this.value)) {
			this.Suggestions.onTab();
		}
	}

	_handlePageUp(e: KeyboardEvent) {
		if (this._isSuggestionsFocused) {
			this.Suggestions?.onPageUp(e);
		} else {
			e.preventDefault();
		}
	}

	_handlePageDown(e: KeyboardEvent) {
		if (this._isSuggestionsFocused) {
			this.Suggestions?.onPageDown(e);
		} else {
			e.preventDefault();
		}
	}

	_handleHome(e: KeyboardEvent) {
		if (this._isSuggestionsFocused) {
			this.Suggestions?.onHome(e);
		}
	}

	_handleEnd(e: KeyboardEvent) {
		if (this._isSuggestionsFocused) {
			this.Suggestions?.onEnd(e);
		}
	}

	_clearPopoverFocusAndSelection() {
		if (!this.showSuggestions || !this.Suggestions) {
			return;
		}

		this.hasSuggestionItemSelected = false;

		this.Suggestions?._deselectItems();
		this.Suggestions?._clearItemFocus();
	}

	_handleChange() {
		if (this._clearIconClicked) {
			this._clearIconClicked = false;
			return;
		}

		const fireChange = () => {
			if (!this._isChangeTriggeredBySuggestion) {
				this.fireDecoratorEvent(INPUT_EVENTS.CHANGE, { inputType: "" });
			}
			this.previousValue = this.value;
			this.typedInValue = this.value;
			this._isChangeTriggeredBySuggestion = false;
		};

		if (this.previousValue !== this.getInputDOMRefSync()!.value) {
			// if picker is open there might be a selected item, wait next tick to get the value applied
			if (this.Suggestions?._getPicker()?.open && this._flattenItems.some(item => item.hasAttribute("ui5-suggestion-item") && (item as SuggestionItem).selected)) {
				this._changeToBeFired = true;
			} else {
				fireChange();

				if (this._enterKeyDown) {
					this.fireDecoratorEvent("_request-submit");
					submitForm(this);
				}
			}
		}
	}

	_scroll(e: UI5CustomEvent<ResponsivePopover, "scroll">) {
		this.fireDecoratorEvent("suggestion-scroll", {
			scrollTop: e.detail.scrollTop,
			scrollContainer: e.detail.targetRef,
		});
	}

	_startsWithMatchingItems(str: string): Array<IInputSuggestionItemSelectable> {
		return Filters.StartsWith(str, this._selectableItems, "text");
	}

	_getFirstMatchingItem(current: string): IInputSuggestionItemSelectable | undefined {
		if (!this._flattenItems.length) {
			return;
		}

		const matchingItems = this._startsWithMatchingItems(current).filter(item => !this._isGroupItem(item));

		if (matchingItems.length) {
			return matchingItems[0];
		}
	}

	_handleSelectionChange(e: CustomEvent<ListSelectionChangeEventDetail>) {
		this.Suggestions?.onItemPress(e);
	}

	_selectMatchingItem(item: IInputSuggestionItemSelectable) {
		item.selected = true;
		this._matchedSuggestionItem = item;
	}

	_filterItems(value: string) {
		let matchingItems: Array<IInputSuggestionItem> = [];
		const groupItems = this._flattenItems.filter(item => this._isGroupItem(item));

		this._resetItemVisibility();

		if (groupItems.length) {
			matchingItems = this._filterGroups(this.filter, groupItems);
		} else {
			matchingItems = (Filters[this.filter])(value, this._selectableItems, "text");
		}
		this._selectableItems.forEach(item => {
			item.hidden = !matchingItems.includes(item);
		});

		if (matchingItems.length === 0) {
			this.open = false;
		}
	}

	_filterGroups(filterType: `${InputSuggestionsFilter}`, groupItems: IInputSuggestionItem[]) {
		const filteredGroupItems: IInputSuggestionItem[] = [];
		groupItems.forEach(groupItem => {
			const currentGroupItems = (Filters[filterType])(this.typedInValue, groupItem.items ?? [], "text");
			filteredGroupItems.push(...currentGroupItems);
			if (currentGroupItems.length === 0) {
				groupItem.hidden = true;
			} else {
				groupItem.hidden = false;
			}
		});
		return filteredGroupItems;
	}

	_resetItemVisibility() {
		this._flattenItems.forEach(item => {
			if (this._isGroupItem(item)) {
				item.items?.forEach(i => {
					i.hidden = false;
				});
				return;
			}
			item.hidden = false;
		});
	}

	_handleTypeAhead(item: IInputSuggestionItemSelectable) {
		const suggestionText = item.text ? item.text : "";
		const typedValue = this.typedInValue;

		// Preserve the user's typed input case during typing
		if (suggestionText.toLowerCase().startsWith(typedValue.toLowerCase())) {
			this.value = typedValue + suggestionText.substring(typedValue.length);
		}

		this._performTextSelection = true;
		this._shouldAutocomplete = false;
	}

	_closePicker() {
		this.open = false;
	}

	_confirmMobileValue() {
		this._closePicker();
		this._handleChange();
	}

	_cancelMobileValue() {
		this.value = this.previousValue;
		this._closePicker();
	}

	_afterOpenPicker() {
		// Set initial focus to the native input
		if (isPhone()) {
			this.previousValue = this.value;
			(this.getInputDOMRef())!.focus();
			this._composition?.addEventListeners();
		}

		this._handlePickerAfterOpen();
	}

	_afterClosePicker() {
		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
			this.focused = false;
		}

		if (this._changeToBeFired && !this._isChangeTriggeredBySuggestion) {
			this.previousValue = this.value;
			this.fireDecoratorEvent(INPUT_EVENTS.CHANGE, { inputType: "" });
		} else {
			this._isChangeTriggeredBySuggestion = false;
		}
		this._changeToBeFired = false;

		this.open = false;
		this.isTyping = false;

		if (this.hasSuggestionItemSelected) {
			this.focus();
		}

		const invisibleText = this.shadowRoot!.querySelector(`#selectionText`);
		if (invisibleText) {
			invisibleText.textContent = "";
		}

		this._handlePickerAfterClose();
	}

	_handlePickerAfterOpen() {
		this.fireDecoratorEvent("open");
	}

	_handlePickerAfterClose() {
		this.Suggestions?._onClose();
		this.fireDecoratorEvent("close");
	}

	enableSuggestions() {
		if (this.Suggestions) {
			return;
		}

		const setup = (Suggestions: typeof InputSuggestions) => {
			Suggestions.i18nBundle = InputField.i18nBundle;
			this.Suggestions = new Suggestions(this, "suggestionItems", true, false);
		};

		// If the feature is preloaded (the user manually imported InputSuggestions.js), it is already available on the constructor
		if (Input.SuggestionsClass) {
			setup(Input.SuggestionsClass);
			// If feature is not preloaded, load it dynamically
		} else {
			import("./features/InputSuggestions.js").then(SuggestionsModule => {
				setup(SuggestionsModule.default);
			});
		}
	}

	acceptSuggestion(item: IInputSuggestionItemSelectable, keyboardUsed: boolean) {
		if (this._isGroupItem(item)) {
			return;
		}

		let originalItem = item;
		if (this._matchedSuggestionItem) {
			const matchedText = this._matchedSuggestionItem.text?.toLowerCase() || "";
			const itemText = item.text?.toLowerCase() || "";
			// Only use matched item if keyboard navigation or if it's the same item (case-insensitive)
			if (keyboardUsed || matchedText === itemText) {
				originalItem = this._matchedSuggestionItem;
			}
		}

		const itemText = originalItem.text || "";
		const fireChange = keyboardUsed
			? this.valueBeforeItemSelection !== itemText : this.previousValue !== itemText;

		this.hasSuggestionItemSelected = true;
		this.value = itemText;

		if (fireChange && (this.previousValue !== itemText)) {
			this.valueBeforeItemSelection = itemText;
			this.lastConfirmedValue = itemText;

			this._performTextSelection = true;

			this.fireDecoratorEvent(INPUT_EVENTS.CHANGE);

			this._isChangeTriggeredBySuggestion = true;
			// value might change in the change event handler
			this.typedInValue = this.value;
			this.previousValue = this.value;
		}

		this.valueBeforeSelectionStart = "";
		this._matchedSuggestionItem = undefined;

		this.isTyping = false;
		this.open = false;
	}

	/**
	 * Updates the input value on item select.
	 * @param item The item that is on select
	 */
	updateValueOnSelect(item: IInputSuggestionItem) {
		const itemValue = this._isGroupItem(item) ? this.valueBeforeSelectionStart : (item as IInputSuggestionItemSelectable).text;

		this.value = itemValue || "";
		this._performTextSelection = true;

		// Update the matched item when navigating with arrows to preserve correct case on Enter
		if (!this._isGroupItem(item)) {
			this._matchedSuggestionItem = item as IInputSuggestionItemSelectable;
		}
	}

	fireEventByAction(action: INPUT_ACTIONS, e: InputEvent) {
		const valueBeforeInput = this.value;
		const inputRef = this.getInputDOMRefSync();

		if (this.disabled || this.readonly) {
			return;
		}

		const inputValue = this.getInputValue();
		const isUserInput = action === INPUT_ACTIONS.ACTION_ENTER;

		this.value = inputValue;
		this.typedInValue = inputValue;
		this.valueBeforeSelectionStart = inputValue;
		const valueAfterInput = this.value;

		if (isUserInput) { // input
			const inputType = e.inputType || "";
			const prevented = !this.fireDecoratorEvent(INPUT_EVENTS.INPUT, { inputType });

			if (prevented) {
				// if the value is not changed after preventing the input event, revert the value
				if (valueAfterInput === this.value) {
					this.value = valueBeforeInput;
				}

				inputRef && (inputRef.value = this.value);
			}

			this.fireResetSelectionChange();
		}
	}

	getInputValue() {
		const domRef = this.getDomRef();

		if (domRef) {
			return (this.getInputDOMRef())!.value;
		}
		return "";
	}

	getInputDOMRef(): HTMLInputElement | null {
		if (isPhone() && this.Suggestions) {
			const picker = this.Suggestions._getPicker();
			if (picker) {
				const phoneInput = picker.querySelector<Input>(".ui5-input-inner-phone");
				return phoneInput?.shadowRoot?.querySelector<HTMLInputElement>("input") || null;
			}
		}

		return this.nativeInput;
	}

	getInputDOMRefSync(): HTMLInputElement | null {
		if (isPhone() && this.Suggestions) {
			const picker = this.Suggestions._getPicker();
			if (picker) {
				return picker.querySelector(".ui5-input-inner-phone")?.shadowRoot?.querySelector<HTMLInputElement>("input") || null;
			}
		}

		return this.nativeInput;
	}

	/**
	 * Returns a reference to the native input element
	 * @protected
	 */
	get nativeInput() {
		const domRef = this.getDomRef();

		return domRef ? domRef.querySelector<HTMLInputElement>(`input`) : null;
	}

	get nativeInputWidth() {
		return this.nativeInput ? this.nativeInput.offsetWidth : 0;
	}

	/**
	 * Returns if the suggestions popover is scrollable.
	 * The method returns `Promise` that resolves to true,
	 * if the popup is scrollable and false otherwise.
	 */
	isSuggestionsScrollable() {
		if (!this.Suggestions) {
			return Promise.resolve(false);
		}

		return this.Suggestions?._isScrollable();
	}

	onItemMouseDown(e: MouseEvent) {
		e.preventDefault();
	}

	onItemSelected(suggestionItem: IInputSuggestionItemSelectable, keyboardUsed: boolean) {
		const shouldFireSelectionChange = !keyboardUsed && !suggestionItem?.focused && this.valueBeforeItemSelection !== suggestionItem.text;

		if (shouldFireSelectionChange) {
			this.fireSelectionChange(suggestionItem, true);
		}
		this.acceptSuggestion(suggestionItem, keyboardUsed);
	}

	_handleSuggestionItemPress(e: CustomEvent<ListItemClickEventDetail>) {
		this.Suggestions?.onItemPress(e);
	}

	onItemSelect(item: IInputSuggestionItem) {
		this.valueBeforeItemSelection = this.value;
		this.updateValueOnSelect(item);
		this.announceSelectedItem();

		this.fireSelectionChange(item, true);
	}

	get _flattenItems(): Array<IInputSuggestionItem> {
		return this.getSlottedNodes<IInputSuggestionItem>("suggestionItems").flatMap(item => {
			return this._isGroupItem(item) ? [item, ...item.items!] : [item];
		});
	}

	get _selectableItems(): Array<IInputSuggestionItemSelectable> {
		return this._flattenItems.filter(item => !this._isGroupItem(item)) as Array<IInputSuggestionItemSelectable>;
	}

	announceSelectedItem() {
		const invisibleText = this.shadowRoot!.querySelector(`#selectionText`)!;

		if (invisibleText) {
			invisibleText.textContent = this.itemSelectionAnnounce;
		}
	}

	fireSelectionChange(item: IInputSuggestionItem | null, isValueFromSuggestions: boolean) {
		if (this.Suggestions) {
			this.fireDecoratorEvent(INPUT_EVENTS.SELECTION_CHANGE, { item });
			this._isLatestValueFromSuggestions = isValueFromSuggestions;
		}
	}

	fireResetSelectionChange() {
		if (this._isLatestValueFromSuggestions) {
			this.fireSelectionChange(null, false);
			this.valueBeforeItemSelection = this.value;
		}
	}

	// ======================= Suggestion-specific getters =======================

	get _headerTitleText() {
		return this._associatedLabelsTexts || InputField.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get _suggestionsOkButtonText() {
		return InputField.i18nBundle.getText(INPUT_SUGGESTIONS_OK_BUTTON);
	}

	get _suggestionsCancelButtonText() {
		return InputField.i18nBundle.getText(INPUT_SUGGESTIONS_CANCEL_BUTTON);
	}

	get _popupLabel() {
		return InputField.i18nBundle.getText(INPUT_AVALIABLE_VALUES);
	}

	get suggestionsTextId() {
		return this.showSuggestions ? `suggestionsText` : "";
	}

	get ariaDescribedByIds() {
		return [
			this.suggestionsTextId,
			this.valueStateTextId,
			this._valueStateLinksShortcutsTextAccId,
			this._inputAccInfo.ariaDescribedBy,
			this._accInfoAriaDescriptionId,
			this.ariaDescriptionTextId,
		].filter(Boolean).join(" ");
	}

	get accInfo() {
		const ariaHasPopupDefault = this.showSuggestions ? "dialog" : undefined;
		const ariaAutoCompleteDefault = this.showSuggestions ? "list" as const : undefined;

		return {
			"ariaRoledescription": this._inputAccInfo && (this._inputAccInfo.ariaRoledescription || undefined),
			"ariaDescribedBy": this.ariaDescribedByIds || undefined,
			"ariaInvalid": this.valueState === ValueState.Negative ? true : undefined,
			"ariaHasPopup": this._inputAccInfo.ariaHasPopup ? this._inputAccInfo.ariaHasPopup : ariaHasPopupDefault,
			"ariaAutoComplete": this._inputAccInfo.ariaAutoComplete ? this._inputAccInfo.ariaAutoComplete : ariaAutoCompleteDefault,
			"role": this._inputAccInfo && this._inputAccInfo.role,
			"ariaControls": this._inputAccInfo && this._inputAccInfo.ariaControls,
			"ariaExpanded": this._inputAccInfo && this._inputAccInfo.ariaExpanded,
			"ariaDescription": this._accInfoAriaDescription,
			"accessibleDescription": this.ariaDescriptionText,
			"ariaLabel": (this._inputAccInfo && this._inputAccInfo.ariaLabel) || this._accessibleLabelsRefTexts || this.accessibleName || this._associatedLabelsTexts || undefined,
		};
	}

	get itemSelectionAnnounce() {
		return this.Suggestions ? this.Suggestions.itemSelectionAnnounce : "";
	}

	get classes(): ClassMap {
		return {
			popover: {
				"ui5-suggestions-popover": this.showSuggestions,
				"ui5-popover-with-value-state-header-phone": this._isPhone && this.showSuggestions && this.hasValueStateMessage,
				"ui5-popover-with-value-state-header": !this._isPhone && this.showSuggestions && this.hasValueStateMessage,
			},
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		const remSizeInPx = parseInt(getComputedStyle(document.documentElement).fontSize);

		const stylesObject = {
			suggestionPopoverHeader: {
				"display": this._listWidth === 0 ? "none" : "inline-block",
				"width": this._listWidth ? `${this._listWidth}px` : "",
				"max-width": "inherit",
			},
			suggestionsPopover: {
				"min-width": this._inputWidth ? `${this._inputWidth}px` : "",
				"max-width": this._inputWidth && (this._inputWidth / remSizeInPx) > 40 ? `${this._inputWidth}px` : "40rem",
			},
			innerInput: {
				"padding": "",
			},
		};

		return stylesObject;
	}

	get suggestionSeparators() {
		return "None" as const;
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.hasValueStateMessage && !this.readonly && !this.open && this.focused;
	}

	get hasValueStateMessage() {
		return this.hasValueState && this.valueState !== ValueState.Positive
			&& (!this._inputIconFocused // Handles the cases when valueStateMessage is forwarded (from datepicker e.g.)
				|| !!(this._isPhone && this.Suggestions)); // Handles Input with suggestions on mobile
	}

	get suggestionsText() {
		return InputField.i18nBundle.getText(INPUT_SUGGESTIONS);
	}

	get availableSuggestionsCount() {
		if (this.showSuggestions && (this.value || this.Suggestions?.isOpened())) {
			const nonGroupItems = this._selectableItems;
			const isOpened = this.Suggestions?.isOpened();
			const stateText = isOpened ? InputField.i18nBundle.getText(INPUT_SUGGESTIONS_EXPANDED) : InputField.i18nBundle.getText(INPUT_SUGGESTIONS_COLLAPSED);

			switch (nonGroupItems.length) {
			case 0:
				return `${InputField.i18nBundle.getText(INPUT_SUGGESTIONS_NO_HIT)} ${stateText}`;

			case 1:
				return `${InputField.i18nBundle.getText(INPUT_SUGGESTIONS_ONE_HIT)} ${stateText}`;

			default:
				return `${InputField.i18nBundle.getText(INPUT_SUGGESTIONS_MORE_HITS, nonGroupItems.length)} ${stateText}`;
			}
		}

		return this.showSuggestions ? InputField.i18nBundle.getText(INPUT_SUGGESTIONS_COLLAPSED) : undefined;
	}

	get _isSuggestionsFocused() {
		return !this.focused && this.Suggestions?.isOpened();
	}
}

Input.define();

export default Input;
export type {
	IInputSuggestionItem,
	IInputSuggestionItemSelectable,
	InputSuggestionScrollEventDetail,
	InputSelectionChangeEventDetail,
	InputAccInfo,
	InputEventDetail,
};
