import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isPhone, isAndroid, isMac } from "@ui5/webcomponents-base/dist/Device.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { submitForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import {
	isBackSpace,
	isDelete,
	isShow,
	isUp,
	isDown,
	isEnter,
	isEscape,
	isTabNext,
	isTabPrevious,
	isPageUp,
	isPageDown,
	isHome,
	isEnd,
	isCtrlAltF8,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { attachListeners } from "@ui5/webcomponents-base/dist/util/valueStateNavigation.js";
import arraysAreEqual from "@ui5/webcomponents-base/dist/util/arraysAreEqual.js";

import type { IIcon } from "./Icon.js";
import * as Filters from "./Filters.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_TYPE_SUCCESS,
	VALUE_STATE_TYPE_INFORMATION,
	VALUE_STATE_TYPE_ERROR,
	VALUE_STATE_TYPE_WARNING,
	VALUE_STATE_LINK,
	VALUE_STATE_LINKS,
	VALUE_STATE_LINK_MAC,
	VALUE_STATE_LINKS_MAC,
	INPUT_SUGGESTIONS_TITLE,
	COMBOBOX_AVAILABLE_OPTIONS,
	COMBOBOX_DIALOG_OK_BUTTON,
	COMBOBOX_DIALOG_CANCEL_BUTTON,
	SELECT_OPTIONS,
	LIST_ITEM_POSITION,
	LIST_ITEM_GROUP_HEADER,
	INPUT_CLEAR_ICON_ACC_NAME,
	FORM_TEXTFIELD_REQUIRED,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import ComboBoxTemplate from "./ComboBoxTemplate.js";

// Styles
import ComboBoxCss from "./generated/themes/ComboBox.css.js";
import ComboBoxPopoverCss from "./generated/themes/ComboBoxPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

import "./ComboBoxItem.js";
import type ComboBoxItem from "./ComboBoxItem.js";
import type Popover from "./Popover.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type List from "./List.js";
import type { ListItemClickEventDetail } from "./List.js";
// eslint-disable-next-line
import "./ComboBoxItemGroup.js";
// eslint-disable-next-line
import { isInstanceOfComboBoxItemGroup } from "./ComboBoxItemGroup.js";
import type ComboBoxFilter from "./types/ComboBoxFilter.js";
import type Input from "./Input.js";
import type { InputEventDetail } from "./Input.js";
import type InputComposition from "./features/InputComposition.js";

const SKIP_ITEMS_SIZE = 10;

/**
 * Interface for components that may be slotted inside a `ui5-combobox`
 * @public
 */
interface IComboBoxItem extends UI5Element {
	text?: string,
	headerText?: string,
	focused: boolean,
	isGroupItem?: boolean,
	selected?: boolean,
	additionalText?: string,
	_isVisible?: boolean,
	items?: Array<IComboBoxItem>
}

type ValueStateAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;
type ValueStateTypeAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;

enum ValueStateIconMapping {
	Negative = "error",
	Critical = "alert",
	Positive = "sys-enter-2",
	Information = "information",
}

type ComboBoxSelectionChangeEventDetail = {
	item: ComboBoxItem | null,
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-combobox` component represents a drop-down menu with a list of the available options and a text input field to narrow down the options.
 *
 * It is commonly used to enable users to select an option from a predefined list.
 *
 * ### Structure
 * The `ui5-combobox` consists of the following elements:
 *
 * -  Input field - displays the selected option or a custom user entry. Users can type to narrow down the list or enter their own value.
 * -  Drop-down arrow - expands\collapses the option list.
 * -  Option list - the list of available options.
 *
 * ### Keyboard Handling
 *
 * The `ui5-combobox` provides advanced keyboard handling.
 *
 * - [F4], [Alt]+[Up], or [Alt]+[Down] - Toggles the picker.
 * - [Escape] - Closes the picker, if open. If closed, cancels changes and reverts the typed in value.
 * - [Enter] or [Return] - If picker is open, takes over the currently selected item and closes it.
 * - [Down] - Selects the next matching item in the picker.
 * - [Up] - Selects the previous matching item in the picker.
 * - [Page Down] - Moves selection down by page size (10 items by default).
 * - [Page Up] - Moves selection up by page size (10 items by default).
 * - [Home] - If focus is in the ComboBox, moves cursor at the beginning of text. If focus is in the picker, selects the first item.
 * - [End] - If focus is in the ComboBox, moves cursor at the end of text. If focus is in the picker, selects the last item.
 * - [Ctrl]+[Alt]+[F8] or [Command]+[Option]+[F8] - Focuses the first link in the value state message, if available. Pressing [Tab] moves the focus to the next link in the value state message, or closes the value state message if there are no more links.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ComboBox.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.6
 */
@customElement({
	tag: "ui5-combobox",
	languageAware: true,
	formAssociated: true,
	renderer: jsxRenderer,
	styles: [
		ComboBoxCss,
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
		ComboBoxPopoverCss,
		SuggestionsCss,
	],
	template: ComboBoxTemplate,
})
/**
 * Fired when the input operation has finished by pressing Enter, focusout or an item is selected.
 * @public
 */
@event("change", {
	bubbles: true,
})

/**
 * Fired when the dropdown is opened.
 * @since 2.9.0
 * @public
 */
@event("open", {
	bubbles: true,
})

/**
 * Fired when the dropdown is closed.
 * @since 2.9.0
 * @public
 */
@event("close")

/**
 * Fired when typing in input or clear icon is pressed.
 *
 * **Note:** filterValue property is updated, input is changed.
 * @public
 */
@event("input", {
	bubbles: true,
})
/**
 * Fired when selection is changed by user interaction
 * @param {IComboBoxItem} item item to be selected.
 * @public
 */
@event("selection-change", {
	bubbles: true,
})

class ComboBox extends UI5Element implements IFormInputElement {
	eventDetails!: {
		"change": void,
		"input": void,
		"open": void,
		"close": void,
		"selection-change": ComboBoxSelectionChangeEventDetail,
	}
	/**
	 * Defines the value of the component.
	 * @default ""
	 * @formEvents change input
	 * @formProperty
	 * @public
	 */
	@property()
	value = "";

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default undefined
	 * @public
	 * @since 2.0.0
	 */
	@property()
	name?: string;

	/**
	 * Defines whether the value will be autocompleted to match an item
	 * @default false
	 * @public
	 * @since 1.19.0
	 */
	@property({ type: Boolean })
	noTypeahead = false;

	/**
	 * Defines the "live" value of the component.
	 *
	 * **Note:** If we have an item e.g. "Bulgaria", "B" is typed, "ulgaria" is typed ahead, value will be "Bulgaria", filterValue will be "B".
	 *
	 * **Note:** Initially the filter value is synced with value.
	 * @default ""
	 * @private
	 */
	@property()
	filterValue = ""

	/**
	 * Defines a short hint intended to aid the user with data entry when the
	 * component has no value.
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Indicates whether a loading indicator should be shown in the picker.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the filter type of the component.
	 * @default "StartsWithPerTerm"
	 * @public
	 */
	@property()
	filter: `${ComboBoxFilter}` = "StartsWithPerTerm";

	/**
	 * Defines whether the clear icon of the combobox will be shown.
	 * @default false
	 * @public
	 * @since 1.20.1
	 */
	@property({ type: Boolean })
	showClearIcon = false;

	/**
	 * Indicates whether the input is focused
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleNameRef?: string;

	@property({ type: Boolean, noAttribute: true })
	_iconPressed = false;

	@property({ type: Array })
	_filteredItems: Array<IComboBoxItem> = [];

	@property({ type: Number, noAttribute: true })
	_listWidth?: number;

	@property({ type: Boolean, noAttribute: true })
	_effectiveShowClearIcon = false

	/**
	 * Indicates whether the value state message popover is open.
	 * @private
	 * @since 2.0.0
	 */
	@property({ type: Boolean, noAttribute: true })
	valueStateOpen = false;

	/**
	 * Indicates whether the items picker is open.
	 * @public
	 * @since 2.9.0
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Indicates whether link navigation is being handled.
	 * @default false
	 * @since 2.11.0
	 * @private
	 */
	@property({ type: Boolean })
	_handleLinkNavigation: boolean = false;

	/**
	 * @private
	 */
	@property({ type: Array })
	_linksListenersArray: Array<(args: any) => void> = [];

	/**
	 * Indicates whether IME composition is currently active
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isComposing = false;

	/**
	 * Defines the component items.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: true,
	})
	items!: Array<IComboBoxItem>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * The value state message slot should contain only one root element.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the `ui5-combobox` is in `Information`, `Critical` or `Negative` value state.
	 * @since 1.0.0-rc.9
	 * @public
	 */
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	/**
	 * Defines the icon to be displayed in the input field.
	 * @public
	 * @since 1.0.0-rc.9
	 */
	@slot()
	icon!: Array<IIcon>;

	_initialRendering = true;
	_itemFocused = false;
	// used only for Safari fix (check onAfterRendering)
	_autocomplete = false;
	_isKeyNavigation = false;
	_selectionPerformed = false;
	_lastValue: string;
	_selectedItemText = "";
	_userTypedValue = "";
	_valueStateLinks: Array<HTMLElement> = [];
	_composition?: InputComposition;
	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;
	static composition: typeof InputComposition;

	get formValidityMessage() {
		return ComboBox.i18nBundle.getText(FORM_TEXTFIELD_REQUIRED);
	}

	get formValidity(): ValidityStateFlags {
		return { valueMissing: this.required && !this.value };
	}

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	get formFormattedValue() {
		return this.value;
	}

	constructor() {
		super();

		// when an initial value is set it should be considered as a _lastValue
		this._lastValue = this.getAttribute("value") || "";
	}

	onBeforeRendering() {
		this._effectiveShowClearIcon = (this.showClearIcon && !!this.value && !this.readonly && !this.disabled);

		if (this._initialRendering || this.filter === "None") {
			this._filteredItems = this.items;
		}

		if (this.open && !this._isKeyNavigation) {
			const items = this._filterItems(this.filterValue);
			this._filteredItems = (items.length && items) || [];
		}

		const hasNoVisibleItems = !this._filteredItems.length || !this._filteredItems.some(i => i._isVisible);

		// If there is no filtered items matching the value, show all items when the arrow is pressed
		if (((hasNoVisibleItems && !isPhone()) && this.value)) {
			this.items.forEach(this._makeAllVisible.bind(this));
			this._filteredItems = this.items;
		}

		if (this.shouldOpenValueStateMessagePopover) {
			this.valueStateOpen = true;
		} else {
			this.valueStateOpen = false;
		}

		this._selectMatchingItem();
		this._initialRendering = false;

		this.style.setProperty("--_ui5-input-icons-count", `${this.iconsCount}`);
	}

	get iconsCount() {
		const slottedIconsCount = this.icon?.length || 0;
		const clearIconCount = Number(this._effectiveShowClearIcon) ?? 0;
		const arrowDownIconsCount = this.readonly ? 0 : 1;

		return slottedIconsCount + clearIconCount + arrowDownIconsCount;
	}

	onAfterRendering() {
		if (this.inner && this.value !== this.inner.value) {
			this.value = this.inner.value;
		}

		this.storeResponsivePopoverWidth();

		if (!arraysAreEqual(this._valueStateLinks, this.linksInAriaValueStateHiddenText)) {
			this._removeLinksEventListeners();
			this._addLinksEventListeners();
			this._valueStateLinks = this.linksInAriaValueStateHiddenText;
		}
	}

	onEnterDOM() {
		this._enableComposition();
	}

	onExitDOM() {
		this._removeLinksEventListeners();
		this._composition?.removeEventListeners();
	}

	_focusin(e: FocusEvent) {
		this.focused = true;
		this._autocomplete = false;

		if (!e.relatedTarget || (e.relatedTarget !== this.shadowRoot!.querySelector(".ui5-input-clear-icon"))) {
			this._lastValue = this.value;
		}

		!isPhone() && (e.target as HTMLInputElement).setSelectionRange(0, this.value.length);
	}

	_focusout(e: FocusEvent) {
		const toBeFocused = e.relatedTarget as HTMLElement;
		const clearIconWrapper = this.shadowRoot!.querySelector(".ui5-input-clear-icon-wrapper");
		const focusedOutToClearIcon = clearIconWrapper === toBeFocused || clearIconWrapper?.contains(toBeFocused);

		if (this._effectiveShowClearIcon && focusedOutToClearIcon) {
			return;
		}

		this._fireChangeEvent();

		const focusedOutToItemsPicker = this.open && this._getPicker().contains(toBeFocused);
		const focusedOutToValueState = this.valueStateOpen && this.contains(toBeFocused);

		if (focusedOutToItemsPicker || focusedOutToValueState || this._handleLinkNavigation) {
			e.stopImmediatePropagation();
			return;
		}

		if (!(this.getDomRef()!.contains(toBeFocused)) && (this._getPicker() !== e.relatedTarget)) {
			this.focused = false;
		}
	}

	_beforeOpenPopover() {
		if (isPhone()) {
			this._getPickerInput().value = this.value;
		}
	}

	_afterOpenPopover() {
		this._iconPressed = true;
		this.inner.focus();
		this.fireDecoratorEvent("open");

		const allItems = this._getItems();
		const currentItem = allItems.find(item => {
			return item.selected || item.focused;
		});

		if (currentItem) {
			this._scrollToItem(allItems.indexOf(currentItem));
		}
	}

	_afterClosePopover() {
		this._iconPressed = false;
		this._filteredItems = this.items;
		this.filterValue = "";
		this._selectedItemText = "";

		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
		}

		if (this._selectionPerformed) {
			this._lastValue = this.value;
			this._selectionPerformed = false;
		}

		this.open = false;
		this.fireDecoratorEvent("close");
	}

	_toggleRespPopover() {
		if (this.open) {
			this._closeRespPopover();
		} else {
			this._openRespPopover();
		}
	}

	storeResponsivePopoverWidth() {
		if (this.open && !this._listWidth) {
			this._listWidth = this._getPicker().offsetWidth;
		}
	}

	_handleValueStatePopoverFocusout() {
		if (!this._handleLinkNavigation) {
			this.focused = false;
		}
	}

	_handleValueStatePopoverAfterClose() {
		this.valueStateOpen = false;
	}

	_getValueStatePopover() {
		return this.shadowRoot!.querySelector<Popover>(".ui5-valuestatemessage-popover")!;
	}

	_getItemsList(): List {
		return this._getPicker().querySelector(".ui5-combobox-items-list") as List;
	}

	_resetFilter() {
		this._userTypedValue = "";
		this.inner.setSelectionRange(0, this.value.length);
		this._filteredItems = this._filterItems("");
		this._selectMatchingItem();
	}

	_resetItemVisibility() {
		this.items.forEach(item => {
			if (isInstanceOfComboBoxItemGroup(item)) {
				item.items?.forEach(i => {
					i._isVisible = false;
				});
				return;
			}

			item._isVisible = false;
		});
	}

	_arrowClick() {
		this.inner.focus();
		this._resetFilter();

		if (isPhone() && this.value && !this._lastValue) {
			this._lastValue = this.value;
		}

		this._toggleRespPopover();
	}

	_handleMobileKeydown(e: KeyboardEvent) {
		if (isEscape(e)) {
			this.value = this._lastValue || "";
			this.filterValue = this._lastValue || "";
			this._closeRespPopover();
		}
	}

	_handleMobileInput(e: CustomEvent<InputEventDetail>) {
		const { target } = e;
		this.filterValue = (target as Input).value;
		this.value = (target as Input).value;
		this.fireDecoratorEvent("input");
	}

	_input(e: InputEvent) {
		const { value } = e.target as HTMLInputElement;
		const shouldAutocomplete = this.shouldAutocomplete(e);

		if (e.target === this.inner) {
			// stop the native event, as the semantic "input" would be fired.
			e.stopImmediatePropagation();
			this.focused = true;
		}

		this._filteredItems = this._filterItems(value);

		this.value = value;
		this.filterValue = value;

		this._clearFocus();

		// autocomplete
		if (shouldAutocomplete && !this._isComposing && !isAndroid()) {
			this._handleTypeAhead(value, value);
		}

		this.fireDecoratorEvent("input");

		if (isPhone()) {
			return;
		}

		if (!this._filteredItems.length || value === "") {
			this._closeRespPopover();
		} else {
			this._openRespPopover();
		}
	}

	shouldAutocomplete(e: InputEvent): boolean {
		const eventType = e.inputType;
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

		return !this.noTypeahead && !allowedEventTypes.includes(eventType);
	}

	_startsWithMatchingItems(str: string): Array<IComboBoxItem> {
		const allItems:Array<IComboBoxItem> = this._getItems().filter(item => !isInstanceOfComboBoxItemGroup(item));
		return Filters.StartsWith(str, allItems, "text");
	}

	_clearFocus() {
		const allItems = this._getItems();

		allItems.map(item => {
			item.focused = false;

			return item;
		});
	}

	// Get groups and items as a flat array for filtering
	_getItems() {
		const allItems: Array<IComboBoxItem> = [];

		this._filteredItems.forEach(item => {
			if (isInstanceOfComboBoxItemGroup(item)) {
				const visibleItems = this.open ? item.items.filter(i => i._isVisible) : item.items;
				const groupedItems = [item, ...visibleItems];
				allItems.push(...groupedItems);
				return;
			}

			allItems.push(item);
		});

		return allItems;
	}

	handleNavKeyPress(e: KeyboardEvent) {
		const allItems = this._getItems();

		if (this.focused && (isHome(e) || isEnd(e)) && this.value) {
			return;
		}

		const isOpen = this.open;
		const currentItem = allItems.find(item => {
			return item.selected || item.focused;
		});

		const indexOfItem = currentItem ? allItems.indexOf(currentItem) : -1;
		e.preventDefault();

		if (this.focused && isOpen && (isUp(e) || isPageUp(e) || isPageDown(e))) {
			return;
		}

		if (allItems.length - 1 === indexOfItem && isDown(e)) {
			return;
		}

		this._isKeyNavigation = true;

		if (
			e.key === "ArrowDown"
			|| e.key === "ArrowUp"
			|| e.key === "PageUp"
			|| e.key === "PageDown"
			|| e.key === "Home"
			|| e.key === "End"
		) {
			this[`_handle${e.key}`](e, indexOfItem);
		}
	}

	_handleItemNavigation(e: KeyboardEvent, indexOfItem: number, isForward: boolean) {
		const allItems = this._getItems();

		const currentItem: IComboBoxItem = allItems[indexOfItem];
		const isGroupItem = currentItem && currentItem.isGroupItem;
		const nextItem = isForward ? allItems[indexOfItem + 1] : allItems[indexOfItem - 1];

		if ((!this.open) && ((isGroupItem && !nextItem) || (!isGroupItem && !currentItem))) {
			return;
		}

		this._clearFocus();

		if (this.open) {
			this._itemFocused = true;
			this.value = isGroupItem ? "" : currentItem.text!;
			this.focused = false;

			currentItem.focused = true;
		} else {
			this.focused = true;
			this.value = isGroupItem ? nextItem.text! : currentItem.text!;
			currentItem.focused = false;
		}

		this._announceSelectedItem(indexOfItem);
		this._scrollToItem(indexOfItem);

		if (isGroupItem && this.open) {
			return;
		}
		// autocomplete
		this._handleTypeAhead(this.value, this.open ? this._userTypedValue : "");

		this.fireDecoratorEvent("input");
	}

	_handleTypeAhead(value: string, filterValue: string) {
		const item = this._getFirstMatchingItem(value);

		if (!item) {
			return;
		}

		this._applyAtomicValueAndSelection(item, filterValue);
	}

	_handleArrowDown(e: KeyboardEvent, indexOfItem: number) {
		const isOpen = this.open;

		if (this.focused && indexOfItem === -1 && isOpen) {
			this.focused = false;
		}

		this._handleItemNavigation(e, ++indexOfItem, true /* isForward */);
	}

	_handleArrowUp(e: KeyboardEvent, indexOfItem: number) {
		const isOpen = this.open;

		if (indexOfItem === 0) {
			this._clearFocus();
			this._itemFocused = false;
			this.focused = true;

			if (this.hasValueStateText && isOpen) {
				this._filteredItems[0].selected = false;
				this.value = this._userTypedValue;
			}

			return;
		}

		this._handleItemNavigation(e, --indexOfItem, false /* isForward */);
	}

	_handlePageUp(e: KeyboardEvent, indexOfItem: number) {
		const allItems = this._getItems();
		const isProposedIndexValid = indexOfItem - SKIP_ITEMS_SIZE > -1;
		indexOfItem = isProposedIndexValid ? indexOfItem - SKIP_ITEMS_SIZE : 0;
		const shouldMoveForward = isInstanceOfComboBoxItemGroup(allItems[indexOfItem]) && !this.open;

		this._handleItemNavigation(e, indexOfItem, shouldMoveForward);
	}

	_handlePageDown(e: KeyboardEvent, indexOfItem: number) {
		const allItems = this._getItems();
		const itemsLength = allItems.length;
		const isProposedIndexValid = indexOfItem + SKIP_ITEMS_SIZE < itemsLength;

		indexOfItem = isProposedIndexValid ? indexOfItem + SKIP_ITEMS_SIZE : itemsLength - 1;
		const shouldMoveForward = isInstanceOfComboBoxItemGroup(allItems[indexOfItem]) && !this.open;

		this._handleItemNavigation(e, indexOfItem, shouldMoveForward);
	}

	_handleHome(e: KeyboardEvent) {
		const shouldMoveForward = isInstanceOfComboBoxItemGroup(this._filteredItems[0]) && !this.open;

		this._handleItemNavigation(e, 0, shouldMoveForward);
	}

	_handleEnd(e: KeyboardEvent) {
		this._handleItemNavigation(e, this._getItems().length - 1, true /* isForward */);
	}

	_keyup() {
		this._userTypedValue = this.value.substring(0, this.inner.selectionStart || 0);
	}

	_keydown(e: KeyboardEvent) {
		const isNavKey = isDown(e) || isUp(e) || isPageUp(e) || isPageDown(e) || isHome(e) || isEnd(e);
		const allItems: Array<IComboBoxItem> = this._getItems();

		this._autocomplete = !(isBackSpace(e) || isDelete(e));
		this._isKeyNavigation = false;

		if (isNavKey && !this.readonly && this._filteredItems.length) {
			this.handleNavKeyPress(e);
		}

		if (isEnter(e)) {
			let focusedItem: IComboBoxItem | undefined;

			this._filteredItems.forEach(item => {
				if (isInstanceOfComboBoxItemGroup(item) && !focusedItem) {
					focusedItem = item.items.find(groupItem => groupItem.focused);
				}

				if (item.focused) {
					focusedItem = item;
				}
			});

			this._fireChangeEvent();

			if (this.open && !focusedItem?.isGroupItem) {
				this._closeRespPopover();
				this.focused = true;
				this.inner.setSelectionRange(this.value.length, this.value.length);
			} else if (this._internals.form) {
				submitForm(this);
			}
		}

		if (isEscape(e)) {
			this.focused = true;
			const shouldResetValueAndStopPropagation = !this.open && this.value !== this._lastValue;
			if (shouldResetValueAndStopPropagation) {
				this.value = this._lastValue;
				// stop propagation to prevent closing the popup when using the combobox inside it
				e.stopPropagation();
			}
		}

		if ((isTabNext(e) || isTabPrevious(e)) && this.open) {
			this._closeRespPopover();
		}

		if (isShow(e) && !this.readonly && !this.disabled) {
			e.preventDefault();

			this._resetFilter();
			this._toggleRespPopover();

			const selectedItem = allItems.find(item => {
				return item.selected;
			});

			if (selectedItem && this.open) {
				this._itemFocused = true;
				selectedItem.focused = true;
				this.focused = false;
			} else if (this.open && this._filteredItems.length && !this.value.length) {
				// If no item is selected, select the first non-group item on "Show" (F4, Alt+Up/Down)
				const firstNonGroupItem = this._getItems().findIndex(item => item._isVisible && !item.isGroupItem);
				this._handleItemNavigation(e, firstNonGroupItem, true /* isForward */);
			} else {
				this.focused = true;
			}
		}

		if (isCtrlAltF8(e)) {
			return this._handleCtrlALtF8();
		}
	}

	_addLinksEventListeners() {
		const links = this.linksInAriaValueStateHiddenText;

		links.forEach((link, index) => {
			this._linksListenersArray.push((e: KeyboardEvent) => {
				attachListeners(e, links, index, {
					closeValueState: () => {
						if (this.open) {
							this._closeRespPopover();
						}
						if (this.valueStateOpen) {
							this.valueStateOpen = false;
						}
					},
					navigateToItem: () => {
						this._handleLinkNavigation = false;
						if (this.open) {
							this.inner.focus();
							this.handleNavKeyPress(e);
						}
					},
					focusInput: () => {
						this._handleLinkNavigation = false;
						this.inner.focus();
					},
					isPopoverOpen: () => this.open,
				});
			});

			link.addEventListener("keydown", this._linksListenersArray[index]);
		});
	}

	_removeLinksEventListeners() {
		const links = this.linksInAriaValueStateHiddenText;

		links.forEach((link, index) => {
			link.removeEventListener("keydown", this._linksListenersArray[index]);
		});

		this._linksListenersArray = [];
		this._handleLinkNavigation = false;
	}

	_handleCtrlALtF8() {
		const links = this.linksInAriaValueStateHiddenText;

		if (links.length > 0) {
			this._clearFocus();
			links[0].focus();
		}

		this._handleLinkNavigation = true;
	}

	_handlePopoverKeydown(e: KeyboardEvent) {
		if (isTabNext(e)) {
			this._closeRespPopover();
		}
	}

	_handlePopoverFocusout() {
		this.focused = false;
	}

	_click() {
		if (isPhone() && !this.readonly) {
			this._openRespPopover();
		}
	}

	_closeRespPopover(e?: Event | null) {
		if ((e && (e.target as HTMLElement).classList.contains("ui5-responsive-popover-close-btn"))) {
			if (this._selectedItemText) {
				this.value = this._selectedItemText;
				this.filterValue = this._selectedItemText;
			} else {
				this.value = this._lastValue || "";
				this.filterValue = this._lastValue || "";
			}
		}

		if (isPhone()) {
			this._fireChangeEvent();
		}

		this._clearFocus();
		this.open = false;
		this.valueStateOpen = false;
	}

	_openRespPopover() {
		this.open = true;
	}

	_filterItems(str: string) {
		let filteredItem:IComboBoxItem;
		let filteredGroupItems: Array<IComboBoxItem> = [];
		const filteredItems: Array<IComboBoxItem> = [];
		const filteredItemGroups: Array<IComboBoxItem> = [];

		this._resetItemVisibility();
		this.items.forEach(item => {
			if (isInstanceOfComboBoxItemGroup(item)) {
				filteredGroupItems = (Filters[this.filter] || Filters.StartsWithPerTerm)(str, item.items, "text");
				filteredGroupItems.forEach(i => {
					i._isVisible = true;
				});

				if (filteredGroupItems.length) {
					filteredItemGroups.push(item);
				}

				return;
			}

			[filteredItem] = (Filters[this.filter] || Filters.StartsWithPerTerm)(str, [item], "text");

			if (filteredItem) {
				filteredItem._isVisible = true;
				filteredItems.push(filteredItem);
			}
		});

		return [...filteredItemGroups, ...filteredItems];
	}

	_getFirstMatchingItem(current: string): IComboBoxItem | void {
		const allItems = this._getItems();
		const currentlyFocusedItem = allItems.find(item => item.focused === true);

		if (currentlyFocusedItem?.isGroupItem) {
			this.value = this.filterValue;
			return;
		}

		const matchingItems: Array<IComboBoxItem> = this._startsWithMatchingItems(current);

		if (matchingItems.length) {
			const exactMatch = matchingItems.find(item => item.text === current);
			return exactMatch ?? matchingItems[0];
		}
	}

	_applyAtomicValueAndSelection(item: IComboBoxItem, filterValue: string) {
		const value = (item && item.text) || "";

		this.inner.value = value;
		this.inner.setSelectionRange(filterValue.length, value.length);
		this.value = value;
	}

	_selectMatchingItem() {
		const currentlyFocusedItem = this.items.find(item => item.focused);
		const shouldSelectionBeCleared = currentlyFocusedItem && currentlyFocusedItem.isGroupItem;
		let itemToBeSelected: IComboBoxItem | undefined;
		let previouslySelectedItem: IComboBoxItem | undefined;

		// Find previously selected item
		this._filteredItems.forEach(item => {
			if (!isInstanceOfComboBoxItemGroup(item)) {
				if (item.selected) {
					previouslySelectedItem = item;
				}
			} else {
				const selectedGroupItem = item.items?.find(i => i.selected);
				if (selectedGroupItem) {
					previouslySelectedItem = selectedGroupItem;
				}
			}
		});

		this._filteredItems.forEach(item => {
			if (!shouldSelectionBeCleared && !itemToBeSelected) {
				itemToBeSelected = ((!item.isGroupItem && (item.text === this.value)) ? item : item?.items?.find(i => i.text === this.value));
			}
		});

		this._filteredItems = this._filteredItems.map(item => {
			if (!isInstanceOfComboBoxItemGroup(item)) {
				item.selected = item === itemToBeSelected;
				return item;
			}

			item.items?.forEach(groupItem => {
				groupItem.selected = itemToBeSelected === groupItem;
			});

			return item;
		});

		const noUserInteraction = !this.focused && !this._isKeyNavigation && !this._selectionPerformed && !this._iconPressed;
		// Skip firing "selection-change" event if this is initial rendering or if there has been no user interaction yet
		if (this._initialRendering || noUserInteraction) {
			return;
		}

		// Fire selection-change event only when selection actually changes
		if (previouslySelectedItem !== itemToBeSelected) {
			if (itemToBeSelected) {
				// New item selected
				this.fireDecoratorEvent("selection-change", {
					item: itemToBeSelected as ComboBoxItem,
				});
			} else if (previouslySelectedItem) {
				// Selection cleared - fire event with 'null'
				this.fireDecoratorEvent("selection-change", {
					item: null,
				});
			}
		}
	}

	_fireChangeEvent() {
		if (this.value !== this._lastValue) {
			this.fireDecoratorEvent("change");
			this._lastValue = this.value;
		}
	}

	_inputChange(e: Event) {
		e.preventDefault();
	}

	_itemMousedown(e: MouseEvent) {
		e.preventDefault();
	}

	_selectItem(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as ComboBoxItem;

		this._selectedItemText = item.text || "";
		this._selectionPerformed = true;

		const sameItemSelected = this.value === this._selectedItemText;
		const sameSelectionPerformed = this.value.toLowerCase() === this.filterValue.toLowerCase();

		if (sameItemSelected && sameSelectionPerformed) {
			this._fireChangeEvent(); // Click on an already typed, but not memoized value shouold also trigger the change event
			return this._closeRespPopover();
		}

		this.value = this._selectedItemText;

		if (!item.selected) {
			this.fireDecoratorEvent("selection-change", {
				item,
			});
		}

		this._fireChangeEvent();
		this._closeRespPopover();

		// reset selection
		this.inner.setSelectionRange(this.value.length, this.value.length);
	}

	_onItemFocus() {
		this._itemFocused = true;
	}

	_announceSelectedItem(indexOfItem: number) {
		const allItems = this._getItems();
		const currentItem = allItems[indexOfItem];
		const nonGroupItems = allItems.filter(item => !item.isGroupItem);
		const currentItemAdditionalText = currentItem?.additionalText || "";
		const isGroupItem = currentItem?.isGroupItem;
		const itemPositionText = ComboBox.i18nBundle.getText(LIST_ITEM_POSITION, nonGroupItems.indexOf(currentItem) + 1, nonGroupItems.length);
		const groupHeaderText = ComboBox.i18nBundle.getText(LIST_ITEM_GROUP_HEADER);

		if (isGroupItem) {
			announce(`${groupHeaderText} ${currentItem.headerText}`, InvisibleMessageMode.Polite);
		} else {
			announce(`${currentItemAdditionalText} ${this.open ? itemPositionText : ""}`.trim(), InvisibleMessageMode.Polite);
		}
	}

	_clear() {
		const selectedItem = this.items.find(item => item.selected);

		if (selectedItem?.text === this.value) {
			this.fireDecoratorEvent("change");
		}

		this.value = "";
		this.fireDecoratorEvent("input");

		if (this._isPhone) {
			this._lastValue = "";
			this.fireDecoratorEvent("change");
		} else {
			this.focus();
		}
	}

	_makeAllVisible(item: IComboBoxItem) {
		if (isInstanceOfComboBoxItemGroup(item)) {
			item.items.forEach(groupItem => {
				groupItem._isVisible = true;
			});
			return;
		}

		item._isVisible = true;
	}

	_scrollToItem(indexOfItem: number) {
		const picker = this._getPicker();
		const list = this._getItemsList();
		const listItem = list?.listItems[indexOfItem];

		if (listItem) {
			const pickerRect = picker.getBoundingClientRect();
			const listItemRect = listItem.getBoundingClientRect();
			const isListItemInVisibleArea = listItemRect.top >= pickerRect.top && listItemRect.bottom <= pickerRect.bottom;

			if (!isListItemInVisibleArea) {
				listItem.scrollIntoView({
					behavior: "auto",
					block: "nearest",
					inline: "nearest",
				});
			}
		}
	}

	_announceValueStateText() {
		const valueStateText = this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : this.valueStateMessage.map(el => el.textContent).join(" ");

		if (valueStateText) {
			announce(valueStateText, InvisibleMessageMode.Polite);
		}
	}
	/**
	 * Enables IME composition handling.
	 * Dynamically loads the InputComposition feature and sets up event listeners.
	 * @private
	 */
	_enableComposition() {
		if (this._composition) {
			return;
		}

		const setup = (InputCompositionClass: typeof InputComposition) => {
			this._composition = new InputCompositionClass({
				getInputEl: () => this.inner,
				updateCompositionState: (isComposing: boolean) => {
					this._isComposing = isComposing;
				},
			});
			this._composition.addEventListeners();
		};

		if (ComboBox.composition) {
			setup(ComboBox.composition);
		} else {
			import("./features/InputComposition.js").then(CompositionModule => {
				ComboBox.composition = CompositionModule.default;
				setup(CompositionModule.default);
			});
		}
	}

	get _headerTitleText() {
		return ComboBox.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get _iconAccessibleNameText() {
		return ComboBox.i18nBundle.getText(SELECT_OPTIONS);
	}

	get _popupLabel() {
		return ComboBox.i18nBundle.getText(COMBOBOX_AVAILABLE_OPTIONS);
	}

	get _dialogOkButtonText() {
		return ComboBox.i18nBundle.getText(COMBOBOX_DIALOG_OK_BUTTON);
	}

	get _dialogCancelButtonText() {
		return ComboBox.i18nBundle.getText(COMBOBOX_DIALOG_CANCEL_BUTTON);
	}

	get inner(): HTMLInputElement {
		return (isPhone() && this.open)
			? this._getPickerInput().shadowRoot!.querySelector("input")!
			: this.shadowRoot!.querySelector<HTMLInputElement>("[inner-input]")!;
	}

	_getPicker() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	_getPickerInput() {
		return this._getPicker().querySelector<HTMLInputElement>("[ui5-input]")!;
	}

	get openOnMobile() {
		return this._isPhone && this.open;
	}

	get hasValueState(): boolean {
		return this.valueState !== ValueState.None;
	}

	get hasValueStateText(): boolean {
		return this.hasValueState && this.valueState !== ValueState.Positive;
	}

	get ariaValueStateHiddenText(): string {
		if (!this.hasValueState) {
			return "";
		}

		let text = "";

		if (this.valueState !== ValueState.None) {
			text = this.valueStateTypeMappings[this.valueState];
		}

		if (this.shouldDisplayDefaultValueStateMessage) {
			return `${text} ${this.valueStateDefaultText || ""}`;
		}

		return `${text}`.concat(" ", this.valueStateMessage.map(el => el.textContent).join(" "));
	}

	get valueStateDefaultText(): string | undefined {
		if (this.valueState === ValueState.None) {
			return;
		}

		return this.valueStateTextMappings[this.valueState];
	}

	get valueStateTextMappings(): ValueStateAnnouncement {
		return {
			[ValueState.Positive]: ComboBox.i18nBundle.getText(VALUE_STATE_SUCCESS),
			[ValueState.Negative]: ComboBox.i18nBundle.getText(VALUE_STATE_ERROR),
			[ValueState.Critical]: ComboBox.i18nBundle.getText(VALUE_STATE_WARNING),
			[ValueState.Information]: ComboBox.i18nBundle.getText(VALUE_STATE_INFORMATION),
		};
	}

	get valueStateTypeMappings(): ValueStateTypeAnnouncement {
		return {
			[ValueState.Positive]: ComboBox.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
			[ValueState.Information]: ComboBox.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
			[ValueState.Negative]: ComboBox.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
			[ValueState.Critical]: ComboBox.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
		};
	}

	get shouldOpenValueStateMessagePopover(): boolean {
		return this.focused && !this.readonly && this.hasValueStateText && !this._iconPressed
			&& !this.open && !this._isPhone;
	}

	get shouldDisplayDefaultValueStateMessage(): boolean {
		return !this.valueStateMessage.length && this.hasValueStateText;
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageIcon(): string {
		return this.valueState !== ValueState.None ? ValueStateIconMapping[this.valueState] : "";
	}

	get linksInAriaValueStateHiddenText() {
		const links: Array<HTMLElement> = [];
		if (this.valueStateMessage) {
			this.valueStateMessage.forEach(element => {
				if (element.children.length)	{
					element.querySelectorAll("ui5-link").forEach(link => {
						links.push(link as HTMLElement);
					});
				}
			});
		}
		return links;
	}

	get valueStateLinksShortcutsTextAcc() {
		const links = this.linksInAriaValueStateHiddenText;
		if (!links.length) {
			return "";
		}

		if (isMac()) {
			return links.length === 1
				? ComboBox.i18nBundle.getText(VALUE_STATE_LINK_MAC)
				: ComboBox.i18nBundle.getText(VALUE_STATE_LINKS_MAC);
		}

		return links.length === 1
			? ComboBox.i18nBundle.getText(VALUE_STATE_LINK)
			: ComboBox.i18nBundle.getText(VALUE_STATE_LINKS);
	}

	get ariaDescribedByText() {
		return `${this.valueStateTextId} ${this._valueStateLinksShortcutsTextAccId}`.trim();
	}

	get _valueStateLinksShortcutsTextAccId() {
		return this.linksInAriaValueStateHiddenText.length > 0 ? `hiddenText-value-state-link-shortcut` : "";
	}

	get valueStateTextId() {
		return this.hasValueState ? `value-state-description` : "";
	}

	get _isPhone(): boolean {
		return isPhone();
	}

	get itemTabIndex() {
		return undefined;
	}

	get ariaLabelText(): string | undefined {
		return getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this);
	}

	get clearIconAccessibleName() {
		return ComboBox.i18nBundle.getText(INPUT_CLEAR_ICON_ACC_NAME);
	}

	get responsivePopoverId() {
		return `${this._id}-popover`;
	}

	get styles() {
		const remSizeInPx = parseInt(getComputedStyle(document.documentElement).fontSize);
		return {
			suggestionPopoverHeader: {
				"display": this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this._listWidth || ""}px`,
				"max-width": "inherit",
			},
			suggestionsPopover: {
				"min-width": `${this.offsetWidth || 0}px`,
				"max-width": (this.offsetWidth / remSizeInPx) > 40 ? `${this.offsetWidth}px` : "40rem",
			},
			popoverValueStateMessage: {},
		};
	}

	get classes() {
		return {
			popover: {
				"ui5-suggestions-popover": true,
				"ui5-popover-with-value-state-header-phone": this._isPhone && this.hasValueStateText,
				"ui5-popover-with-value-state-header": !this._isPhone && this.hasValueStateText,
			},
			popoverValueState: {
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}
}

ComboBox.define();

export default ComboBox;

export type {
	ComboBoxSelectionChangeEventDetail,
	IComboBoxItem,
};
