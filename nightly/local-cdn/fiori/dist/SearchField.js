var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SearchField_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import SearchFieldTemplate from "./SearchFieldTemplate.js";
import SearchFieldCss from "./generated/themes/SearchField.css.js";
import { isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { SEARCH_FIELD_SCOPE_SELECT_LABEL, SEARCH_FIELD_CLEAR_ICON, SEARCH_FIELD_SEARCH_ICON, SEARCH_FIELD_LABEL, } from "./generated/i18n/i18n-defaults.js";
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
let SearchField = SearchField_1 = class SearchField extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Indicates whether a loading indicator should be shown in the input field.
         * @default false
         * @since 2.19.0
         * @public
         */
        this.fieldLoading = false;
        /**
         * Defines whether the clear icon of the search will be shown.
         * @default false
         * @public
         */
        this.showClearIcon = false;
        /**
         * Defines whether the component is collapsed.
         *
         * @default false
         * @private
         */
        this.collapsed = false;
        /**
         * Defines the value of the component.
         *
         * **Note:** The property is updated upon typing.
         * @default ""
         * @public
         */
        this.value = "";
        /**
         * @private
         */
        this.focusedInnerInput = false;
        /**
         * @private
         */
        this._effectiveShowClearIcon = false;
    }
    onBeforeRendering() {
        this._effectiveShowClearIcon = (this.showClearIcon && !!this.value);
    }
    _onkeydown(e) {
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
    _onFocusOutSearch(e) { } // eslint-disable-line
    _handleEnter() {
        if (this.value.length) {
            this._handleSearchEvent();
        }
    }
    _handleInnerClick() { } // eslint-disable-line
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
    _handleScopeChange(e) {
        const item = e.detail.selectedOption;
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
            scope: SearchField_1.i18nBundle.getText(SEARCH_FIELD_SCOPE_SELECT_LABEL),
            searchIcon: SearchField_1.i18nBundle.getText(SEARCH_FIELD_SEARCH_ICON),
            clearIcon: SearchField_1.i18nBundle.getText(SEARCH_FIELD_CLEAR_ICON),
            searchFieldAriaLabel: SearchField_1.i18nBundle.getText(SEARCH_FIELD_LABEL),
        };
    }
    get _effectiveIconTooltip() {
        return this._translations.searchIcon;
    }
    captureRef(ref) {
        if (ref) {
            ref.scopeOption = this;
        }
    }
};
__decorate([
    property({ type: Boolean })
], SearchField.prototype, "fieldLoading", void 0);
__decorate([
    property({ type: Boolean })
], SearchField.prototype, "showClearIcon", void 0);
__decorate([
    property({ type: Boolean })
], SearchField.prototype, "collapsed", void 0);
__decorate([
    property()
], SearchField.prototype, "value", void 0);
__decorate([
    property()
], SearchField.prototype, "placeholder", void 0);
__decorate([
    property()
], SearchField.prototype, "accessibleName", void 0);
__decorate([
    property()
], SearchField.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], SearchField.prototype, "scopeValue", void 0);
__decorate([
    slot({ type: HTMLElement, individualSlots: true, invalidateOnChildChange: true })
], SearchField.prototype, "scopes", void 0);
__decorate([
    slot()
], SearchField.prototype, "filterButton", void 0);
__decorate([
    property({ type: Boolean })
], SearchField.prototype, "focusedInnerInput", void 0);
__decorate([
    property({ type: Boolean })
], SearchField.prototype, "_effectiveShowClearIcon", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], SearchField, "i18nBundle", void 0);
SearchField = SearchField_1 = __decorate([
    customElement({
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
    ,
    event("input", {
        bubbles: true,
    })
    /**
     * Fired when the scope has changed.
     * @public
     * @param {HTMLElement} scope The newly selected scope
     */
    ,
    event("scope-change", {
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
], SearchField);
SearchField.define();
export default SearchField;
//# sourceMappingURL=SearchField.js.map