import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isEnter, isEscape } from "@ui5/webcomponents-base/dist/Keys.js";
import {
	registerUI5Element,
	deregisterUI5Element,
	getEffectiveAriaLabelText,
	getEffectiveAriaDescriptionText,
	getAllAccessibleNameRefTexts,
	getAllAccessibleDescriptionRefTexts,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import SideNavigationSearchFieldTemplate from "./SideNavigationSearchFieldTemplate.js";
import SideNavigationSearchFieldCss from "./generated/themes/SideNavigationSearchField.css.js";
import {
	SEARCH_FIELD_CLEAR_ICON,
	SEARCH_FIELD_SEARCH_ICON,
	SIDE_NAVIGATION_SEARCH_FIELD_LABEL,
	SIDE_NAVIGATION_SEARCH_FIELD_PLACEHOLDER,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-side-navigation-search-field` is a search field, used to filter the items of a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSearchField.js";`
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-side-navigation-search-field",
	languageAware: true,
	renderer: jsxRenderer,
	template: SideNavigationSearchFieldTemplate,
	styles: [
		SideNavigationSearchFieldCss,
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
 * Fired when the user has triggered search with Enter key or Search Button press.
 * @public
 */
@event("search", {
	bubbles: true,
	cancelable: true,
})

class SideNavigationSearchField extends UI5Element {
	eventDetails!: {
		search: object,
		input: void,
	}

	/**
	 * Defines whether the clear icon of the search will be hidden.
	 *
	 * **Note:** When not set, the clear icon is displayed while the component has a value.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideClearIcon = false;

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
	 * Receives id (or many ids) of the elements that label the component.
	 * @public
	 * @default undefined
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Receives id (or many ids) of the elements that describe the component.
	 * @public
	 * @default undefined
	 */
	@property()
	accessibleDescriptionRef?: string;

	/**
	 * Receives id (or many ids) of the elements that the component controls.
	 * @public
	 * @default undefined
	 */
	@property()
	ariaControls?: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_effectiveShowClearIcon = false;

	/**
	 * Constantly updated value of the texts collected from the accessibleNameRef elements.
	 * @private
	 */
	@property({ noAttribute: true })
	_accessibleLabelsRefTexts?: string;

	/**
	 * Constantly updated value of the texts collected from the accessibleDescriptionRef elements.
	 * @private
	 */
	@property({ noAttribute: true })
	_associatedDescriptionRefTexts?: string;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	onEnterDOM() {
		registerUI5Element(this, this._updateAssociatedTexts.bind(this));
	}

	onExitDOM() {
		deregisterUI5Element(this);
	}

	onBeforeRendering() {
		this._effectiveShowClearIcon = (!this.hideClearIcon && !!this.value);
	}

	_updateAssociatedTexts() {
		this._accessibleLabelsRefTexts = getAllAccessibleNameRefTexts(this);
		this._associatedDescriptionRefTexts = getAllAccessibleDescriptionRefTexts(this);
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this._handleEnter();
		} else if (isEscape(e)) {
			this._handleClear();
		}
	}

	_handleEnter() {
		if (this.value.length) {
			this._handleSearchEvent();
		}
	}

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

	get _translations() {
		return {
			searchIcon: SideNavigationSearchField.i18nBundle.getText(SEARCH_FIELD_SEARCH_ICON),
			clearIcon: SideNavigationSearchField.i18nBundle.getText(SEARCH_FIELD_CLEAR_ICON),
			searchFieldAriaLabel: SideNavigationSearchField.i18nBundle.getText(SIDE_NAVIGATION_SEARCH_FIELD_LABEL),
		};
	}

	get _effectivePlaceholder(): string | undefined {
		return this.placeholder || SideNavigationSearchField.i18nBundle.getText(SIDE_NAVIGATION_SEARCH_FIELD_PLACEHOLDER);
	}

	get _ariaLabelText(): string | undefined {
		return this._accessibleLabelsRefTexts || getEffectiveAriaLabelText(this) || this._translations.searchFieldAriaLabel;
	}

	get _ariaDescriptionText(): string | undefined {
		return this._associatedDescriptionRefTexts || getEffectiveAriaDescriptionText(this);
	}
}

SideNavigationSearchField.define();

export default SideNavigationSearchField;
