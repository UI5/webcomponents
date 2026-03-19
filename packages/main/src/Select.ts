import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import connectToComponent from "@ui5/webcomponents-base/dist/connectToComponent.js";
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
import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
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
} from "./generated/i18n/i18n-defaults.js";
import Option from "./Option.js";
import Label from "./Label.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Popover from "./Popover.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";
import Button from "./Button.js";

// Templates
import SelectTemplate from "./generated/templates/SelectTemplate.lit.js";
import SelectPopoverTemplate from "./generated/templates/SelectPopoverTemplate.lit.js";

// Styles
import selectCss from "./generated/themes/Select.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SelectPopoverCss from "./generated/themes/SelectPopover.css.js";
import type FormSupport from "./features/InputElementsFormSupport.js";
import type { IFormElement, NativeFormElement } from "./features/InputElementsFormSupport.js";
import type ListItemBase from "./ListItemBase.js";
import type SelectMenu from "./SelectMenu.js";
import type { SelectMenuOptionClick, SelectMenuChange } from "./SelectMenu.js";

/**
 * Interface for components that may be slotted inside `ui5-select` as options
 * @public
 */
interface IOption extends UI5Element {
	selected: boolean,
	disabled: boolean,
	title: string,
	icon?: string | null,
	value: string,
	additionalText?: string,
	focused?: boolean,
	text?: Array<Node>,
	stableDomRef: string,
	displayText?: string,
	accessibleName?: string,
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
 * 2. With SelectMenu (`ui5-select-menu`) and SelectMenuOption (`ui5-select-menu-option`) web components:
 *
 * The SelectMenu can be used as alternative to define the Select's dropdown
 * and can be used via the `menu` property of the Select to reference SelectMenu by its ID.
 * The component gives the possibility to customize the Select's dropdown
 * by slotting entirely custom options (via the SelectMenuOption component) and adding custom styles.
 *
 * **Note:** SelectMenu is a popover and placing it top-level in the HTML page is recommended,
 * because some page styles (for example transitions) can misplace the SelectMenu.
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
 * `import "@ui5/webcomponents/dist/Option";` (comes with `ui5-select`)
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 */
@customElement({
	tag: "ui5-select",
	languageAware: true,
	renderer: litRender,
	template: SelectTemplate,
	staticAreaTemplate: SelectPopoverTemplate,
	styles: selectCss,
	staticAreaStyles: [
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
		SelectPopoverCss,
	],
	dependencies: [
		Option,
		Label,
		ResponsivePopover,
		Popover,
		List,
		StandardListItem,
		Icon,
		Button,
	],
})
/**
 * Fired when the selected option changes.
 * @allowPreventDefault
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
})
/**
 * Fired after the component's dropdown menu opens.
 * @public
 */
@event("open")
/**
 * Fired after the component's dropdown menu closes.
 * @public
 */
@event("close")
class Select extends UI5Element implements IFormElement {
	static i18nBundle: I18nBundle;

	/**
	 * Defines a reference (ID or DOM element) of component's menu of options
	 * as alternative to define the select's dropdown.
	 *
	 * **Note:** Usage of `ui5-select-menu` is recommended.
	 * @default undefined
	 * @public
	 * @since 1.17.0
	 */
	@property({ validator: DOMReference })
	menu?: HTMLElement | string;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Determines the name with which the component will be submitted in an HTML form.
	 * The value of the component will be the value of the currently selected `ui5-option`.
	 *
	 * **Important:** For the `name` property to have effect, you must add the following import to your project:
	 * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
	 *
	 * **Note:** When set, a native `input` HTML element
	 * will be created inside the `ui5-select` so that it can be submitted as
	 * part of an HTML form. Do not use this property unless you need to submit a form.
	 * @default ""
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	/**
	 * Defines whether the component is required.
	 * @since 1.0.0-rc.9
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	required!: boolean;

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
	readonly!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @since 1.0.0-rc.9
	 * @public
	 * @default ""
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the select.
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleNameRef!: string;

	/**
	 * @private
	 */
	@property({ type: String, noAttribute: true })
	_text?: string | null;

	/**
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_iconPressed!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	opened!: boolean;

	/**
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0, noAttribute: true })
	_listWidth!: number;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * @private
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_selectedIndex!: number;

	_syncedOptions: Array<IOption>;
	_selectedIndexBeforeOpen: number;
	_escapePressed: boolean;
	_lastSelectedOption: IOption | null;
	_typedChars: string;
	_typingTimeoutID?: Timeout | number;
	responsivePopover!: ResponsivePopover;
	selectedItem?: string | null;
	valueStatePopover?: Popover;

	selectMenu?: SelectMenu;

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
	 * The slot is used to render native `input` HTML element within Light DOM to enable form submit,
	 * when `name` property is set.
	 * @private
	 */
	@slot()
	formSupport!: Array<HTMLElement>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the component is in `Information`, `Warning` or `Error` value state.
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
	 * **Note:** If not specified and `ui5-select-menu-option` is used,
	 * either the option's `display-text` or its textContent will be displayed.
	 *
	 * **Note:** If not specified and `ui5-option` is used,
	 * the option's textContent will be displayed.
	 * @public
	 * @since 1.17.0
	*/
	@slot()
	label!: Array<HTMLElement>;

	_onMenuClick: (e: CustomEvent<SelectMenuOptionClick>) => void;
	_onMenuClose: () => void;
	_onMenuOpen: () => void;
	_onMenuBeforeOpen: () => void;
	_onMenuChange: (e: CustomEvent<SelectMenuChange>) => void;
	_attachMenuListeners: (menu: HTMLElement) => void;
	_detachMenuListeners: (menu: HTMLElement) => void;

	constructor() {
		super();

		this._syncedOptions = [];
		this._selectedIndexBeforeOpen = -1;
		this._escapePressed = false;
		this._lastSelectedOption = null;
		this._typedChars = "";

		this._onMenuClick = this.onMenuClick.bind(this);
		this._onMenuClose = this.onMenuClose.bind(this);
		this._onMenuOpen = this.onMenuOpen.bind(this);
		this._onMenuBeforeOpen = this.onMenuBeforeOpen.bind(this);
		this._onMenuChange = this.onMenuChange.bind(this);
		this._attachMenuListeners = this.attachMenuListeners.bind(this);
		this._detachMenuListeners = this.detachMenuListeners.bind(this);

		this._upgradeProperty("value");
	}

	onBeforeRendering() {
		const menu = this._getSelectMenu();

		if (menu) {
			menu.value = this.value;
			// To cause invalidation when the menu is used for another Select that could have the same value as the previous.
			// Otherwise, the menu won't re-render.
			menu.selectId = this.__id;
		} else {
			this._syncSelection();
		}

		this._enableFormSupport();

		this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
	}

	onAfterRendering() {
		this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover);

		if (this._isPickerOpen) {
			if (!this._listWidth) {
				this._listWidth = this.responsivePopover.offsetWidth;
			}
		}

		this._attachRealDomRefs();
	}

	_onfocusin() {
		this.focused = true;
	}

	_onfocusout() {
		this.focused = false;
	}

	get _isPickerOpen() {
		const menu = this._getSelectMenu();

		if (menu) {
			return menu.open;
		}

		return !!this.responsivePopover && this.responsivePopover.opened;
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
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
	set value(newValue: string) {
		const menu = this._getSelectMenu();
		const selectOptions = Array.from(menu ? menu.children : this.children).filter(option => !option.getAttribute("disabled")) as Array<IOption>;

		selectOptions.forEach(option => {
			option.selected = !!((option.getAttribute("value") || option.textContent) === newValue);
		});
	}

	get value(): string {
		return this.selectedOption?.value || this.selectedOption?.textContent || "";
	}

	/**
	 * Currently selected `ui5-option` element.
	 * @public
	 * @default undefined
	 */
	get selectedOption(): IOption | undefined {
		return this.selectOptions.find(option => option.selected);
	}

	onMenuClick(e: CustomEvent<SelectMenuOptionClick>) {
		const optionIndex: number = e.detail.optionIndex;
		this._handleSelectionChange(optionIndex);
	}

	onMenuBeforeOpen() {
		this._beforeOpen();
	}

	onMenuOpen() {
		this._afterOpen();
	}

	onMenuClose() {
		this._afterClose();
	}

	onMenuChange(e: CustomEvent<SelectMenuChange>) {
		this._text = e.detail.text;
		this._selectedIndex = e.detail.selectedIndex;
	}

	_toggleSelectMenu() {
		const menu = this._getSelectMenu();

		if (!menu) {
			return;
		}

		if (menu.open) {
			menu.close();
		} else {
			menu.showAt(this, this.offsetWidth);
		}
	}

	onExitDOM(): void {
		const menu = this._getSelectMenu();
		if (menu) {
			this._detachMenuListeners(menu);
		}
	}

	async _toggleRespPopover() {
		if (this.disabled || this.readonly) {
			return;
		}

		this._iconPressed = true;

		const menu = this._getSelectMenu();
		if (menu) {
			this._toggleSelectMenu();
			return;
		}

		this.responsivePopover = await this._respPopover();
		if (this._isPickerOpen) {
			this.responsivePopover.close();
		} else {
			this.responsivePopover.showAt(this);
		}
	}

	async _attachRealDomRefs() {
		this.responsivePopover = await this._respPopover();

		this.options.forEach(option => {
			option._getRealDomRef = () => this.responsivePopover.querySelector<HTMLElement>(`*[data-ui5-stable=${option.stableDomRef}]`)!;
		});
	}

	_syncSelection() {
		let lastSelectedOptionIndex = -1,
			firstEnabledOptionIndex = -1;
		const options = this._filteredItems;
		const syncOpts = options.map((opt, index) => {
			if (opt.selected) {
				lastSelectedOptionIndex = index;
			}
			if (firstEnabledOptionIndex === -1) {
				firstEnabledOptionIndex = index;
			}

			opt.selected = false;
			opt.focused = false;

			return {
				selected: false,
				focused: false,
				icon: opt.icon,
				value: opt.value,
				textContent: opt.textContent,
				title: opt.title,
				additionalText: opt.additionalText,
				id: opt._id,
				stableDomRef: opt.stableDomRef,
			};
		});

		if (lastSelectedOptionIndex > -1) {
			syncOpts[lastSelectedOptionIndex].selected = true;
			syncOpts[lastSelectedOptionIndex].focused = true;
			options[lastSelectedOptionIndex].selected = true;
			options[lastSelectedOptionIndex].focused = true;
			this._text = syncOpts[lastSelectedOptionIndex].textContent;
			this._selectedIndex = lastSelectedOptionIndex;
		} else {
			this._text = "";
			this._selectedIndex = -1;
			if (syncOpts[firstEnabledOptionIndex]) {
				syncOpts[firstEnabledOptionIndex].selected = true;
				syncOpts[firstEnabledOptionIndex].focused = true;
				options[firstEnabledOptionIndex].selected = true;
				options[firstEnabledOptionIndex].focused = true;
				this._selectedIndex = firstEnabledOptionIndex;
				this._text = options[firstEnabledOptionIndex].textContent;
			}
		}

		this._syncedOptions = syncOpts as Array<IOption>;
	}

	_getSelectMenu(): SelectMenu | undefined {
		return connectToComponent({
			host: this,
			propName: "menu",
			onConnect: this._attachMenuListeners,
			onDisconnect: this._detachMenuListeners,
		}) as SelectMenu;
	}

	attachMenuListeners(menu: HTMLElement) {
		menu.addEventListener("ui5-after-close", this._onMenuClose);
		menu.addEventListener("ui5-after-open", this._onMenuOpen);
		menu.addEventListener("ui5-before-open", this._onMenuBeforeOpen);
		// @ts-ignore
		menu.addEventListener("ui5-option-click", this._onMenuClick);
		// @ts-ignore
		menu.addEventListener("ui5-menu-change", this._onMenuChange);
	}

	detachMenuListeners(menu: HTMLElement) {
		menu.removeEventListener("ui5-after-close", this._onMenuClose);
		menu.removeEventListener("ui5-after-open", this._onMenuOpen);
		menu.removeEventListener("ui5-before-open", this._onMenuBeforeOpen);
		// @ts-ignore
		menu.removeEventListener("ui5-option-click", this._onMenuClick);
		// @ts-ignore
		menu.removeEventListener("ui5-menu-change", this._onMenuChange);
	}

	_enableFormSupport() {
		const formSupport = getFeature<typeof FormSupport>("FormSupport");
		if (formSupport) {
			formSupport.syncNativeHiddenInput(this, (element: IFormElement, nativeInput: NativeFormElement) => {
				const selectElement = (element as Select);
				nativeInput.disabled = !!element.disabled;
				nativeInput.value = selectElement.value;
			});
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	_onkeydown(e: KeyboardEvent) {
		const isTab = (isTabNext(e) || isTabPrevious(e));

		if (isTab && this._isPickerOpen) {
			const menu = this._getSelectMenu();
			if (menu) {
				menu.close(false, false, true /* preventFocusRestore */);
			} else {
				this.responsivePopover.close();
			}
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
			const nextIndex = this.selectOptions.indexOf(itemToSelect);

			this._changeSelectedItem(this._selectedIndex, nextIndex);

			if (currentIndex !== this._selectedIndex) {
				this.itemSelectionAnnounce();
				this._scrollSelectedItem();
			}
		}
	}

	_searchNextItemByText(text: string) {
		let orderedOptions = this.selectOptions.slice(0);
		const optionsAfterSelected = orderedOptions.splice(this._selectedIndex + 1, orderedOptions.length - this._selectedIndex);
		const optionsBeforeSelected = orderedOptions.splice(0, orderedOptions.length - 1);

		orderedOptions = optionsAfterSelected.concat(optionsBeforeSelected);

		return orderedOptions.find(option => (option.displayText || option.textContent || "").toLowerCase().startsWith(text));
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

		const lastIndex = this.selectOptions.length - 1;
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

	_getSelectedItemIndex(item: ListItemBase) {
		return this.selectOptions.findIndex(option => `${option._id}-li` === item.id);
	}

	_select(index: number) {
		this.selectOptions[this._selectedIndex].selected = false;

		if (this._selectedIndex !== index) {
			this.fireEvent<SelectLiveChangeEventDetail>("live-change", { selectedOption: this.selectOptions[index] });
		}

		this._selectedIndex = index;
		this.selectOptions[index].selected = true;
	}

	/**
	 * The user clicked on an item from the list
	 * @private
	 */
	_handleItemPress(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item;
		const selectedItemIndex = this._getSelectedItemIndex(item);

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
		const options: Array<IOption> = this.selectOptions;

		const previousOption = options[oldIndex];
		const nextOption = options[newIndex];

		if (previousOption === nextOption) {
			return;
		}

		previousOption.selected = false;
		previousOption.focused = false;

		nextOption.selected = true;
		nextOption.focused = true;

		this._selectedIndex = newIndex;

		this.fireEvent<SelectLiveChangeEventDetail>("live-change", { selectedOption: nextOption });

		if (!this._isPickerOpen) {
			// arrow pressed on closed picker - do selection change
			this._fireChangeEvent(nextOption);
		}
	}

	_getNextOptionIndex() {
		const menu = this._getSelectMenu();
		if (menu) {
			return this._selectedIndex === (menu.options.length - 1) ? this._selectedIndex : (this._selectedIndex + 1);
		}
		return this._selectedIndex === (this.options.length - 1) ? this._selectedIndex : (this._selectedIndex + 1);
	}

	_getPreviousOptionIndex() {
		return this._selectedIndex === 0 ? this._selectedIndex : (this._selectedIndex - 1);
	}

	_beforeOpen() {
		this._selectedIndexBeforeOpen = this._selectedIndex;
		this._lastSelectedOption = this.selectOptions[this._selectedIndex];
	}

	_afterOpen() {
		this.opened = true;
		this.fireEvent<CustomEvent>("open");
		this.itemSelectionAnnounce();
		this._scrollSelectedItem();
	}

	_afterClose() {
		this.opened = false;
		this._iconPressed = false;
		this._listWidth = 0;

		if (this._escapePressed) {
			this._select(this._selectedIndexBeforeOpen);
			this._escapePressed = false;
		} else if (this._lastSelectedOption !== this.selectOptions[this._selectedIndex]) {
			this._fireChangeEvent(this.selectOptions[this._selectedIndex]);
			this._lastSelectedOption = this.selectOptions[this._selectedIndex];
		}
		this.fireEvent<CustomEvent>("close");
	}

	get selectOptions(): Array<IOption> {
		const menu = this._getSelectMenu();
		if (menu) {
			return Array.from(menu.children) as Array<IOption>;
		}
		return this._filteredItems;
	}

	get hasCustomLabel() {
		return !!this.label.length;
	}

	_fireChangeEvent(selectedOption: IOption) {
		const changePrevented = !this.fireEvent<SelectChangeEventDetail>("change", { selectedOption }, true);

		//  Angular two way data binding
		this.selectedItem = selectedOption.textContent;
		this.fireEvent("selected-item-changed");

		if (changePrevented) {
			this.selectedItem = this._lastSelectedOption!.textContent;
			this._select(this._selectedIndexBeforeOpen);
		}
	}

	get valueStateTextMappings() {
		return {
			[ValueState.Success]: Select.i18nBundle.getText(VALUE_STATE_SUCCESS),
			[ValueState.Information]: Select.i18nBundle.getText(VALUE_STATE_INFORMATION),
			[ValueState.Error]: Select.i18nBundle.getText(VALUE_STATE_ERROR),
			[ValueState.Warning]: Select.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get valueStateTypeMappings() {
		return {
			[ValueState.Success]: Select.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
			[ValueState.Information]: Select.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
			[ValueState.Error]: Select.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
			[ValueState.Warning]: Select.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
		};
	}

	get valueStateText() {
		let valueStateText;

		if (this.shouldDisplayDefaultValueStateMessage) {
			valueStateText = this.valueStateDefaultText;
		} else {
			valueStateText = this.valueStateMessageText.map(el => el.textContent).join(" ");
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
		return this.selectOptions[this._selectedIndex];
	}

	get _effectiveTabIndex() {
		return this.disabled
		|| (this.responsivePopover // Handles focus on Tab/Shift + Tab when the popover is opened
		&& this.responsivePopover.opened) ? "-1" : "0";
	}

	 /**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageInputIcon() {
		const iconPerValueState = {
			Error: "error",
			Warning: "alert",
			Success: "sys-enter-2",
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
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
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
				"display": this._filteredItems.length && this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this._filteredItems.length ? this._listWidth : this.offsetWidth}px`,
			},
			responsivePopover: {
				"min-width": `${this.offsetWidth}px`,
			},
		};
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessageText.length && this.hasValueStateText;
	}

	get hasValueStateText() {
		return this.hasValueState && this.valueState !== ValueState.Success;
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

	get _filteredItems() {
		return this.options.filter(option => !option.disabled);
	}

	itemSelectionAnnounce() {
		let text;
		const optionsCount = this.selectOptions.length;
		const itemPositionText = Select.i18nBundle.getText(LIST_ITEM_POSITION, this._selectedIndex + 1, optionsCount);

		if (this.focused && this._currentlySelectedOption) {
			const optionText = this._currentlySelectedOption.getAttribute("accessible-name") || this._currentlySelectedOption.textContent as string;
			text = `${optionText}${this._isPickerOpen ? `, ${itemPositionText}` : ""}`;

			announce(text, InvisibleMessageMode.Polite);
		}
	}

	async openValueStatePopover() {
		this.valueStatePopover = await this._getPopover() as Popover;
		if (this.valueStatePopover) {
			this.valueStatePopover.showAt(this);
		}
	}

	closeValueStatePopover() {
		this.valueStatePopover && this.valueStatePopover.close();
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

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<Popover>("[ui5-popover]");
	}

	static async onDefine() {
		Select.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Select.define();

export default Select;
export type {
	SelectChangeEventDetail,
	SelectLiveChangeEventDetail,
	IOption,
};
