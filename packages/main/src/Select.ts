import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isSpace,
	isUp,
	isDown,
	isEnter,
	isEscape,
	isHome,
	isEnd,
	isShow,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import List from "./List.js";
import type { ListItemClickEventDetail } from "./List.js";
import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_TYPE_SUCCESS,
	VALUE_STATE_TYPE_INFORMATION,
	VALUE_STATE_TYPE_ERROR,
	VALUE_STATE_TYPE_WARNING,
	INPUT_SUGGESTIONS_TITLE,
	LIST_ITEM_POSITION,
	SELECT_ROLE_DESCRIPTION,
	FORM_SELECTABLE_REQUIRED,
} from "./generated/i18n/i18n-defaults.js";
import Label from "./Label.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
import type ListItemBase from "./ListItemBase.js";

// Templates
import SelectTemplate from "./generated/templates/SelectTemplate.lit.js";

// Styles
import selectCss from "./generated/themes/Select.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SelectPopoverCss from "./generated/themes/SelectPopover.css.js";

/**
 * Interface for components that may be slotted inside `ui5-select` as options
 * @public
 */
interface IOption extends ListItemBase {
	tooltip?: string,
	icon?: string,
	value?: string,
	additionalText?: string,
	focused: boolean,
	effectiveDisplayText: string,
}

type SelectChangeEventDetail = {
	selectedOption: IOption,
}
type SelectLiveChangeEventDetail = {
	selectedOption: IOption,
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-select` component is used to create a drop-down list.
 *
 * ### Usage
 *
 * There are two main usages of the `ui5-select>`.
 *
 * 1. With Option (`ui5-option`) web component:
 *
 * The available options of the Select are defined by using the Option component.
 * The Option comes with predefined design and layout, including `icon`, `text` and `additional-text`.
 *
 * 2. With OptionCustom (`ui5-option-custom`) web component.
 *
 * Options with custom content are defined by using the OptionCustom component
 * The OptionCustom component comes with no predefined layout and it expects consumers to define it.
 *
 * ### Keyboard Handling
 * The `ui5-select` provides advanced keyboard handling.
 *
 * - [F4] / [Alt] + [Up] / [Alt] + [Down] / [Space] or [Enter] - Opens/closes the drop-down.
 * - [Up] or [Down] - If the drop-down is closed - changes selection to the next or the previous option. If the drop-down is opened - moves focus to the next or the previous option.
 * - [Space], [Enter] - If the drop-down is opened - selects the focused option.
 * - [Escape] - Closes the drop-down without changing the selection.
 * - [Home] - Navigates to first option
 * - [End] - Navigates to the last option
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Select";`
 *
 * `import "@ui5/webcomponents/dist/Option";`
 * `import "@ui5/webcomponents/dist/OptionCustom";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart popover - Used to style the popover element
 * @since 0.8.0
 */
@customElement({
	tag: "ui5-select",
	languageAware: true,
	formAssociated: true,
	renderer: litRender,
	template: SelectTemplate,
	styles: [
		selectCss,
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
		SelectPopoverCss,
	],
	dependencies: [
		Label,
		ResponsivePopover,
		Popover,
		List,
		Icon,
		Button,
	],
})
/**
 * Fired when the selected option changes.
 * @param {IOption} selectedOption the selected option.
 * @public
 */
@event<SelectChangeEventDetail>("change", {
	detail: {
		/**
		* @public
		*/
		selectedOption: { type: HTMLElement },
	},
	bubbles: true,
	cancelable: true,
})
/**
 * Fired when the user navigates through the options, but the selection is not finalized,
 * or when pressing the ESC key to revert the current selection.
 * @param {IOption} selectedOption the selected option.
 * @public
 * @since 1.17.0
 */
@event<SelectLiveChangeEventDetail>("live-change", {
	detail: {
		/**
		* @public
		*/
		selectedOption: { type: HTMLElement },
	},
	bubbles: true,
})
/**
 * Fired after the component's dropdown menu opens.
 * @public
 */
@event("open", {
	bubbles: true,
})

/**
 * Fired after the component's dropdown menu closes.
 * @public
 */
@event("close")

/**
 * Fired to make Angular two way data binding work properly.
 * @private
 */
@event("selected-item-changed", {
	bubbles: true,
})

/**
 * Fired to make Vue.js two way data binding work properly.
 * @private
 */
@event("input", {
	bubbles: true,
})

class Select extends UI5Element implements IFormInputElement {
	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	/**
	 * Defines whether the component is required.
	 * @since 1.0.0-rc.9
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @since 1.21.0
	 * @public
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @since 1.0.0-rc.9
	 * @public
	 * @default undefined
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the select.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_iconPressed = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	opened = false;

	/**
	 * @private
	 */
	@property({ type: Number, noAttribute: true })
	_listWidth = 0;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	_selectedIndexBeforeOpen = -1;
	_escapePressed = false;
	_lastSelectedOption: IOption | null = null;;
	_typedChars = "";
	_typingTimeoutID?: Timeout | number;
	responsivePopover!: ResponsivePopover;
	valueStatePopover?: Popover;

	/**
	 * Defines the component options.
	 *
	 * **Note:** Only one selected option is allowed.
	 * If more than one option is defined as selected, the last one would be considered as the selected one.
	 *
	 * **Note:** Use the `ui5-option` component to define the desired options.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	options!: Array<IOption>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the component is in `Information`, `Critical` or `Negative` value state.
	 *
	 * **Note:** If the component has `suggestionItems`,
	 * the `valueStateMessage` would be displayed as part of the same popover, if used on desktop, or dialog - on phone.
	 * @public
	*/
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	/**
	 * Defines the HTML element that will be displayed in the component input part,
	 * representing the selected option.
	 *
	 * **Note:** If not specified and `ui5-option-custom` is used,
	 * either the option's `display-text` or its textContent will be displayed.
	 *
	 * **Note:** If not specified and `ui5-option` is used,
	 * the option's textContent will be displayed.
	 * @public
	 * @since 1.17.0
	*/
	@slot()
	label!: Array<HTMLElement>;

	get formValidityMessage() {
		return Select.i18nBundle.getText(FORM_SELECTABLE_REQUIRED);
	}

	get formValidity(): ValidityStateFlags {
		const selectedOption = this.selectedOption;

		return { valueMissing: this.required && (selectedOption && selectedOption.getAttribute("value") === "") };
	}

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	get formFormattedValue() {
		const selectedOption = this.selectedOption;

		if (selectedOption) {
			return selectedOption.hasAttribute("value") ? selectedOption.value! : selectedOption.textContent;
		}

		return "";
	}

	onBeforeRendering() {
		this._ensureSingleSelection();

		this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
	}

	onAfterRendering() {
		this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover);

		if (this._isPickerOpen) {
			if (!this._listWidth) {
				this._listWidth = this.responsivePopover.offsetWidth;
			}
		}
	}

	_ensureSingleSelection() {
		// if no item is selected => select the first one
		// if multiple items are selected => select the last selected one
		let selectedIndex = this.options.findLastIndex(option => option.selected);
		selectedIndex = selectedIndex === -1 ? 0 : selectedIndex;
		for (let i = 0; i < this.options.length; i++) {
			this.options[i].selected = selectedIndex === i;
			if (selectedIndex === i) {
				break;
			}
		}
	}

	_onfocusin() {
		this.focused = true;
	}

	_onfocusout() {
		this.focused = false;
	}

	get _isPickerOpen() {
		return !!this.responsivePopover && this.responsivePopover.open;
	}

	_respPopover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	/**
	 * Defines the value of the component:
	 *
	 * - when get - returns the value of the component, e.g. the `value` property of the selected option or its text content.
	 *
	 * - when set - selects the option with matching `value` property or text content.
	 *
	 * **Note:** If the given value does not match any existing option,
	 * the first option will get selected.
	 * @public
	 * @default ""
	 * @since 1.20.0
	 * @formProperty
	 * @formEvents change liveChange
	 */
	@property({ noAttribute: true })
	set value(newValue: string) {
		const options = Array.from(this.children) as Array<IOption>;

		options.forEach(option => {
			option.selected = !!((option.getAttribute("value") || option.textContent) === newValue);
		});
	}

	get value(): string {
		return this.selectedOption?.value || this.selectedOption?.textContent || "";
	}

	get _selectedIndex() {
		return this.options.findIndex(option => option.selected);
	}

	/**
	 * Currently selected `ui5-option` element.
	 * @public
	 * @default undefined
	 */
	get selectedOption(): IOption | undefined {
		return this.options.find(option => option.selected);
	}

	get text() {
		return this.selectedOption?.effectiveDisplayText;
	}

	_toggleRespPopover() {
		if (this.disabled || this.readonly) {
			return;
		}

		this._iconPressed = true;

		this.responsivePopover = this._respPopover();
		if (this._isPickerOpen) {
			this.responsivePopover.open = false;
		} else {
			this.responsivePopover.opener = this;
			this.responsivePopover.open = true;
		}
	}

	_onkeydown(e: KeyboardEvent) {
		const isTab = (isTabNext(e) || isTabPrevious(e));

		if (isTab && this._isPickerOpen) {
			this.responsivePopover.open = false;
		} else if (isShow(e)) {
			e.preventDefault();
			this._toggleRespPopover();
		} else if (isSpace(e)) {
			e.preventDefault();
		} else if (isEscape(e) && this._isPickerOpen) {
			this._escapePressed = true;
		} else if (isHome(e)) {
			this._handleHomeKey(e);
		} else if (isEnd(e)) {
			this._handleEndKey(e);
		} else if (isEnter(e)) {
			this._handleSelectionChange();
		} else if (isUp(e) || isDown(e)) {
			this._handleArrowNavigation(e);
		}
	}

	_handleKeyboardNavigation(e: KeyboardEvent) {
		if (isEnter(e) || this.readonly) {
			return;
		}

		const typedCharacter = e.key.toLowerCase();

		this._typedChars += typedCharacter;

		// We check if we have more than one characters and they are all duplicate, we set the
		// text to be the last input character (typedCharacter). If not, we set the text to be
		// the whole input string.

		const text = (/^(.)\1+$/i).test(this._typedChars) ? typedCharacter : this._typedChars;

		clearTimeout(this._typingTimeoutID);

		this._typingTimeoutID = setTimeout(() => {
			this._typedChars = "";
			this._typingTimeoutID = -1;
		}, 1000);

		this._selectTypedItem(text);
	}

	_selectTypedItem(text: string) {
		const currentIndex = this._selectedIndex;
		const itemToSelect = this._searchNextItemByText(text);

		if (itemToSelect) {
			const nextIndex = this.options.indexOf(itemToSelect);

			this._changeSelectedItem(this._selectedIndex, nextIndex);

			if (currentIndex !== this._selectedIndex) {
				this.itemSelectionAnnounce();
				this._scrollSelectedItem();
			}
		}
	}

	_searchNextItemByText(text: string) {
		let orderedOptions = this.options.slice(0);
		const optionsAfterSelected = orderedOptions.splice(this._selectedIndex + 1, orderedOptions.length - this._selectedIndex);
		const optionsBeforeSelected = orderedOptions.splice(0, orderedOptions.length - 1);

		orderedOptions = optionsAfterSelected.concat(optionsBeforeSelected);

		return orderedOptions.find(option => option.effectiveDisplayText.toLowerCase().startsWith(text));
	}

	_handleHomeKey(e: KeyboardEvent) {
		e.preventDefault();

		if (this.readonly) {
			return;
		}

		this._changeSelectedItem(this._selectedIndex, 0);
	}

	_handleEndKey(e: KeyboardEvent) {
		e.preventDefault();

		if (this.readonly) {
			return;
		}

		const lastIndex = this.options.length - 1;
		this._changeSelectedItem(this._selectedIndex, lastIndex);
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			if (this._isPickerOpen) {
				this._handleSelectionChange();
			} else {
				this._toggleRespPopover();
			}
		}
	}

	_getItemIndex(item: IOption) {
		return this.options.indexOf(item);
	}

	_select(index: number) {
		const selectedIndex = this._selectedIndex;
		if (index < 0 || index >= this.options.length || this.options.length === 0) {
			return;
		}
		if (this.options[selectedIndex]) {
			this.options[selectedIndex].selected = false;
		}

		if (selectedIndex !== index) {
			this.fireDecoratorEvent<SelectLiveChangeEventDetail>("live-change", { selectedOption: this.options[index] });
		}

		this.options[index].selected = true;
	}

	/**
	 * The user clicked on an item from the list
	 * @private
	 */
	_handleItemPress(e: CustomEvent<ListItemClickEventDetail>) {
		const listItem = e.detail.item;
		const selectedItemIndex = this._getItemIndex(listItem as IOption);

		this._handleSelectionChange(selectedItemIndex);
	}

	_itemMousedown(e: MouseEvent) {
		// prevent actual focus of items
		e.preventDefault();
	}

	_onclick() {
		this.getFocusDomRef()!.focus();
		this._toggleRespPopover();
	}

	/**
	 * The user selected an item with Enter or Space
	 * @private
	 */
	_handleSelectionChange(index = this._selectedIndex) {
		this._typedChars = "";

		this._select(index);

		this._toggleRespPopover();
	}

	_scrollSelectedItem() {
		if (this._isPickerOpen) {
			const itemRef = this._currentlySelectedOption?.getDomRef();
			if (itemRef) {
				itemRef.scrollIntoView({
					behavior: "auto",
					block: "nearest",
					inline: "nearest",
				});
			}
		}
	}

	_handleArrowNavigation(e: KeyboardEvent) {
		e.preventDefault();

		if (this.readonly) {
			return;
		}

		let nextIndex = -1;
		const currentIndex = this._selectedIndex;
		const isDownKey = isDown(e);

		if (isDownKey) {
			nextIndex = this._getNextOptionIndex();
		} else {
			nextIndex = this._getPreviousOptionIndex();
		}

		this._changeSelectedItem(this._selectedIndex, nextIndex);

		if (currentIndex !== this._selectedIndex) {
			// Announce new item even if picker is opened.
			// The aria-activedescendents attribute can't be used,
			// because listitem elements are in different shadow dom
			this.itemSelectionAnnounce();
			this._scrollSelectedItem();
		}
	}

	_changeSelectedItem(oldIndex: number, newIndex: number) {
		const options: Array<IOption> = this.options;

		const previousOption = options[oldIndex];
		const nextOption = options[newIndex];

		if (previousOption === nextOption) {
			return;
		}

		previousOption.selected = false;
		previousOption.focused = false;

		nextOption.selected = true;
		nextOption.focused = true;

		this.fireDecoratorEvent<SelectLiveChangeEventDetail>("live-change", { selectedOption: nextOption });

		if (!this._isPickerOpen) {
			// arrow pressed on closed picker - do selection change
			this._fireChangeEvent(nextOption);
		}
	}

	_getNextOptionIndex() {
		return this._selectedIndex === (this.options.length - 1) ? this._selectedIndex : (this._selectedIndex + 1);
	}

	_getPreviousOptionIndex() {
		return this._selectedIndex === 0 ? this._selectedIndex : (this._selectedIndex - 1);
	}

	_beforeOpen() {
		this._selectedIndexBeforeOpen = this._selectedIndex;
		this._lastSelectedOption = this.options[this._selectedIndex];
	}

	_afterOpen() {
		this.opened = true;
		this.fireDecoratorEvent<CustomEvent>("open");
		this.itemSelectionAnnounce();
		this._scrollSelectedItem();
		this._applyFocusToSelectedItem();
	}

	_applyFocusToSelectedItem() {
		this.options.forEach(option => {
			option.focused = option.selected;
		});
	}

	_afterClose() {
		this.opened = false;
		this._iconPressed = false;
		this._listWidth = 0;

		if (this._escapePressed) {
			this._select(this._selectedIndexBeforeOpen);
			this._escapePressed = false;
		} else if (this._lastSelectedOption !== this.options[this._selectedIndex]) {
			this._fireChangeEvent(this.options[this._selectedIndex]);
			this._lastSelectedOption = this.options[this._selectedIndex];
		}
		this.fireDecoratorEvent<CustomEvent>("close");
	}

	get hasCustomLabel() {
		return !!this.label.length;
	}

	_fireChangeEvent(selectedOption: IOption) {
		const changePrevented = !this.fireDecoratorEvent<SelectChangeEventDetail>("change", { selectedOption });

		//  Angular two way data binding
		this.fireDecoratorEvent("selected-item-changed");

		// Fire input event for Vue.js two-way binding
		this.fireDecoratorEvent("input");

		if (changePrevented) {
			this._select(this._selectedIndexBeforeOpen);
		}
	}

	get valueStateTextMappings() {
		return {
			[ValueState.Positive]: Select.i18nBundle.getText(VALUE_STATE_SUCCESS),
			[ValueState.Information]: Select.i18nBundle.getText(VALUE_STATE_INFORMATION),
			[ValueState.Negative]: Select.i18nBundle.getText(VALUE_STATE_ERROR),
			[ValueState.Critical]: Select.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get valueStateTypeMappings() {
		return {
			[ValueState.Positive]: Select.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
			[ValueState.Information]: Select.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
			[ValueState.Negative]: Select.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
			[ValueState.Critical]: Select.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
		};
	}

	get valueStateText() {
		let valueStateText;

		if (this.shouldDisplayDefaultValueStateMessage) {
			valueStateText = this.valueStateDefaultText;
		} else {
			valueStateText = this.valueStateMessage.map(el => el.textContent).join(" ");
		}

		return `${this.valueStateTypeText} ${valueStateText}`;
	}

	get valueStateDefaultText() {
		return this.valueState !== ValueState.None ? this.valueStateTextMappings[this.valueState] : "";
	}

	get valueStateTypeText() {
		return this.valueState !== ValueState.None ? this.valueStateTypeMappings[this.valueState] : "";
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : undefined;
	}

	get isDisabled() {
		return this.disabled || undefined;
	}

	get _headerTitleText() {
		return Select.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get _currentlySelectedOption() {
		return this.options[this._selectedIndex];
	}

	get _effectiveTabIndex() {
		return this.disabled
		|| (this.responsivePopover // Handles focus on Tab/Shift + Tab when the popover is opened
		&& this.responsivePopover.open) ? "-1" : "0";
	}

	 /**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageInputIcon() {
		const iconPerValueState = {
			Negative: "error",
			Critical: "alert",
			Positive: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}

	get iconsCount(): number {
		return this.selectedOptionIcon ? 2 : 1;
	}

	get classes() {
		return {
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
			popover: {
				"ui5-select-popover-valuestate": this.hasValueState,
			},
		};
	}

	get styles() {
		return {
			popoverHeader: {
				"max-width": `${this.offsetWidth}px`,
			},
			responsivePopoverHeader: {
				"display": this.options.length && this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this.options.length ? this._listWidth : this.offsetWidth}px`,
			},
			responsivePopover: {
				"min-width": `${this.offsetWidth}px`,
			},
		};
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateText;
	}

	get hasValueStateText() {
		return this.hasValueState && this.valueState !== ValueState.Positive;
	}

	get shouldOpenValueStateMessagePopover() {
		return this.focused && this.hasValueStateText && !this._iconPressed
			&& !this._isPickerOpen && !this._isPhone;
	}

	get _ariaRoleDescription() {
		return Select.i18nBundle.getText(SELECT_ROLE_DESCRIPTION);
	}

	get _isPhone() {
		return isPhone();
	}

	itemSelectionAnnounce() {
		let text;
		const optionsCount = this.options.length;
		const itemPositionText = Select.i18nBundle.getText(LIST_ITEM_POSITION, this._selectedIndex + 1, optionsCount);

		if (this.focused && this._currentlySelectedOption) {
			text = `${this._currentlySelectedOption.textContent as string} ${this._isPickerOpen ? itemPositionText : ""}`;

			announce(text, InvisibleMessageMode.Polite);
		}
	}

	openValueStatePopover() {
		this.valueStatePopover = this._getPopover() as Popover;
		if (this.valueStatePopover) {
			this.valueStatePopover.opener = this;
			this.valueStatePopover.open = true;
		}
	}

	closeValueStatePopover() {
		this.valueStatePopover && (this.valueStatePopover.open = false);
	}

	toggleValueStatePopover(open: boolean) {
		if (open) {
			this.openValueStatePopover();
		} else {
			this.closeValueStatePopover();
		}
	}

	get selectedOptionIcon() {
		return this.selectedOption && this.selectedOption.icon;
	}

	_getPopover() {
		return this.shadowRoot!.querySelector<Popover>("[ui5-popover]");
	}
}

Select.define();

export default Select;
export type {
	IOption,
	SelectChangeEventDetail,
	SelectLiveChangeEventDetail,
};
