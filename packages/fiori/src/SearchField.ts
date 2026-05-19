import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import SearchFieldTemplate from "./SearchFieldTemplate.js";
import SearchFieldCss from "./generated/themes/SearchField.css.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IOption, SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";

import {
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import {
	SEARCH_FIELD_SCOPE_SELECT_LABEL,
	SEARCH_FIELD_CLEAR_ICON,
	SEARCH_FIELD_SEARCH_ICON,
	SEARCH_FIELD_LABEL,
} from "./generated/i18n/i18n-defaults.js";

/**
 * Interface for components that may be slotted inside a `ui5-search`
 * @public
 */
interface ISearchScope extends UI5Element {
	text?: string,
	value?: string,
	stableDomRef: string,
}

type SearchFieldScopeSelectionChangeDetails = {
	scope: ISearchScope | undefined;
}

/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search-field` is an input field, used for user search.
 *
 * The `ui5-search-field` consists of several elements parts:
 * - Scope - displays a select in the beggining of the component, used for filtering results by their scope.
 * - Input field - for user input value
 * - Clear button - gives the possibility for deleting the entered value
 * - Search button - a primary button for performing search, when the user has entered a search term
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SearchField.js";`
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-search-field",
	languageAware: true,
	renderer: jsxRenderer,
	template: SearchFieldTemplate,
	styles: [
		SearchFieldCss,
	],
})

/**
 * Fired when typing in input or clear icon is pressed.
 *
 * @public
 */
@event("input", {
	bubbles: true,
})

/**
 * Fired when the scope has changed.
 * @public
 * @param {HTMLElement} scope The newly selected scope
 */
@event("scope-change", {
	bubbles: true,
})

/**
 * Fired when the user has triggered search with Enter key or Search Button press.
 * @public
 */
@event("search", {
	bubbles: true,
	cancelable: true,
})

class SearchField extends UI5Element {
	eventDetails!: {
		search: object,
		input: void,
		"scope-change": SearchFieldScopeSelectionChangeDetails,
	}

	/**
	 * Indicates whether a loading indicator should be shown in the input field.
	 * @default false
	 * @since 2.19.0
	 * @public
	 */
	@property({ type: Boolean })
	fieldLoading = false

	/**
	 * Defines whether the clear icon of the search will be shown.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showClearIcon = false;

	/**
	 * Defines whether the component is collapsed.
	 *
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	collapsed = false;

	/**
	 * Defines the value of the component.
	 *
	 * **Note:** The property is updated upon typing.
	 * @default ""
	 * @public
	 */
	@property()
	value = "";

	/**
	 * Defines a short hint intended to aid the user with data entry when the
	 * component has no value.
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @public
	 * @default undefined
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the accessible ARIA description of the field.
	 * @public
	 * @default undefined
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Defines the value of the component:
	 *
	 * Applications are responsible for setting the correct scope value.
	 *
	 * **Note:** If the given value does not match any existing scopes,
	 * no scope will be selected and the SearchField scope component will be displayed as empty.
	 * @public
	 * @default ""
	 * @since 2.18.0
	 */
	@property()
	scopeValue?: string;

	/**
	 * Defines the component scope options.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true, invalidateOnChildChange: true })
	scopes!: Slot<ISearchScope>;

	/**
	 * Defines the filter button slot, used to display an additional filtering button.
	 * This slot is intended for passing a `ui5-button` with a filter icon to provide extended filtering options.
	 *
	 * **Note:** Scope button and Filter button are mutually exclusive.
	 * @public
	 * @since 2.11.0
	 */
	@slot()
	filterButton!: Slot<Button>;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focusedInnerInput = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_effectiveShowClearIcon = false;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	onBeforeRendering() {
		this._effectiveShowClearIcon = (this.showClearIcon && !!this.value);
	}

	_onkeydown(e:KeyboardEvent) {
		if (isEnter(e)) {
			return this._handleEnter();
		}
	}

	_onfocusin() {
		this.focusedInnerInput = true;
	}

	_onfocusout() {
		this.focusedInnerInput = false;
	}

	_onFocusOutSearch(e: FocusEvent) {} // eslint-disable-line

	_handleEnter() {
		if (this.value.length) {
			this._handleSearchEvent();
		}
	}

	_handleInnerClick() {} // eslint-disable-line

	_handleSearchIconPress() {
		this._handleSearchEvent();

		setTimeout(() => {
			this.focus();
		}, 0);
	}

	_handleSearchEvent() {
		this.fireDecoratorEvent("search");
	}

	_handleInput(e: InputEvent) {
		this.value = (e.target as HTMLInputElement).value;

		this.fireDecoratorEvent("input");
	}

	_handleClear() {
		this.value = "";
		this.fireDecoratorEvent("input");

		this.focus();
	}

	_handleScopeChange(e: CustomEvent<SelectChangeEventDetail>) {
		const item = e.detail.selectedOption as IOption & { scopeOption: ISearchScope };

		// Set the scopeValue property if the selected scope has a value defined
		if (item.value) {
			this.scopeValue = item.value;
		}

		this.fireDecoratorEvent("scope-change", {
			scope: item.scopeOption,
		});
	}

	get _isSearchIcon() {
		return this.value.length && this.focusedInnerInput;
	}

	get _searchButtonAccessibilityAttributes() {
		return {
			expanded: !this.collapsed,
		};
	}

	get _translations() {
		return {
			scope: SearchField.i18nBundle.getText(SEARCH_FIELD_SCOPE_SELECT_LABEL),
			searchIcon: SearchField.i18nBundle.getText(SEARCH_FIELD_SEARCH_ICON),
			clearIcon: SearchField.i18nBundle.getText(SEARCH_FIELD_CLEAR_ICON),
			searchFieldAriaLabel: SearchField.i18nBundle.getText(SEARCH_FIELD_LABEL),
		};
	}

	get _effectiveIconTooltip() {
		return this._translations.searchIcon;
	}

	captureRef(ref: HTMLElement & { scopeOption?: UI5Element} | null) {
		if (ref) {
			ref.scopeOption = this;
		}
	}
}

SearchField.define();

export default SearchField;

export type { ISearchScope, SearchFieldScopeSelectionChangeDetails };
