var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SideNavigationSearchField_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isEnter, isEscape } from "@ui5/webcomponents-base/dist/Keys.js";
import { registerUI5Element, deregisterUI5Element, getEffectiveAriaLabelText, getEffectiveAriaDescriptionText, getAllAccessibleNameRefTexts, getAllAccessibleDescriptionRefTexts, } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import SideNavigationSearchFieldTemplate from "./SideNavigationSearchFieldTemplate.js";
import SideNavigationSearchFieldCss from "./generated/themes/SideNavigationSearchField.css.js";
import { SEARCH_FIELD_SEARCH_ICON, SIDE_NAVIGATION_SEARCH_FIELD_LABEL, SIDE_NAVIGATION_SEARCH_FIELD_PLACEHOLDER, SIDE_NAVIGATION_SEARCH_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-side-navigation-search-field` is a search field,
 * used to filter the items of a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSearchField.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.28.0
 * @public
 */
let SideNavigationSearchField = SideNavigationSearchField_1 = class SideNavigationSearchField extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the clear icon of the search will be hidden.
         *
         * **Note:** When not set, the clear icon is displayed while the component has a value.
         * @default false
         * @public
         */
        this.hideClearIcon = false;
        /**
         * Defines the value of the component.
         *
         * **Note:** The property is updated upon typing.
         * @default ""
         * @public
         */
        this.value = "";
    }
    onEnterDOM() {
        registerUI5Element(this, this._updateAssociatedTexts.bind(this));
    }
    onExitDOM() {
        deregisterUI5Element(this);
    }
    _updateAssociatedTexts() {
        this._accessibleLabelsRefTexts = getAllAccessibleNameRefTexts(this);
        this._associatedDescriptionRefTexts = getAllAccessibleDescriptionRefTexts(this);
    }
    _onkeydown(e) {
        if (isEnter(e)) {
            this._handleEnter();
        }
        else if (isEscape(e)) {
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
    _handleInput(e) {
        this.value = e.target.value;
        this.fireDecoratorEvent("input");
    }
    _handleClear() {
        this.value = "";
        this.fireDecoratorEvent("input");
        this.focus();
    }
    get _translations() {
        return {
            searchIcon: SideNavigationSearchField_1.i18nBundle.getText(SEARCH_FIELD_SEARCH_ICON),
            searchFieldAriaLabel: SideNavigationSearchField_1.i18nBundle.getText(SIDE_NAVIGATION_SEARCH_FIELD_LABEL),
            searchFieldAriaDescription: SideNavigationSearchField_1.i18nBundle.getText(SIDE_NAVIGATION_SEARCH_DESCRIPTION),
        };
    }
    get _inputAccInfo() {
        return {
            ariaLabel: this._ariaLabelText,
            ariaDescription: this._ariaDescriptionText,
        };
    }
    get _effectivePlaceholder() {
        return this.placeholder || SideNavigationSearchField_1.i18nBundle.getText(SIDE_NAVIGATION_SEARCH_FIELD_PLACEHOLDER);
    }
    get _ariaLabelText() {
        return this._accessibleLabelsRefTexts || getEffectiveAriaLabelText(this) || this._translations.searchFieldAriaLabel;
    }
    get _ariaDescriptionText() {
        return this._associatedDescriptionRefTexts || getEffectiveAriaDescriptionText(this) || this._translations.searchFieldAriaDescription;
    }
};
__decorate([
    property({ type: Boolean })
], SideNavigationSearchField.prototype, "hideClearIcon", void 0);
__decorate([
    property()
], SideNavigationSearchField.prototype, "value", void 0);
__decorate([
    property()
], SideNavigationSearchField.prototype, "placeholder", void 0);
__decorate([
    property()
], SideNavigationSearchField.prototype, "accessibleName", void 0);
__decorate([
    property()
], SideNavigationSearchField.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], SideNavigationSearchField.prototype, "accessibleDescriptionRef", void 0);
__decorate([
    property({ noAttribute: true })
], SideNavigationSearchField.prototype, "_accessibleLabelsRefTexts", void 0);
__decorate([
    property({ noAttribute: true })
], SideNavigationSearchField.prototype, "_associatedDescriptionRefTexts", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], SideNavigationSearchField, "i18nBundle", void 0);
SideNavigationSearchField = SideNavigationSearchField_1 = __decorate([
    customElement({
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
    ,
    event("input", {
        bubbles: true,
    })
    /**
     * Fired when the user has triggered search with Enter key or Search Button press.
     * @public
     */
    ,
    event("search", {
        bubbles: true,
        cancelable: true,
    })
], SideNavigationSearchField);
SideNavigationSearchField.define();
export default SideNavigationSearchField;
//# sourceMappingURL=SideNavigationSearchField.js.map