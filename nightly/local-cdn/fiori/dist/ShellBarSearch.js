var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ShellBarSearch_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import Search from "./Search.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ShellBarSearchTemplate from "./ShellBarSearchTemplate.js";
import ShellBarSearchCss from "./generated/themes/ShellBarSearch.css.js";
import { SEARCH_FIELD_SEARCH_ICON, SHELLBAR_SEARCH_EXPANDED, SHELLBAR_SEARCH_COLLAPSED, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 * Search field for the ShellBar component.
 * @constructor
 * @extends Search
 * @public
 * @since 2.10.0
 * @experimental
 */
let ShellBarSearch = ShellBarSearch_1 = class ShellBarSearch extends Search {
    constructor() {
        super(...arguments);
        /**
         * Indicates whether the suggestions popover should be opened on focus.
         * @default false
         * @public
         */
        this.autoOpen = false;
    }
    _handleSearchIconPress() {
        super._handleSearchIconPress();
        if (this.collapsed) {
            this.collapsed = false;
        }
        else if (!this.value) {
            this.collapsed = true;
        }
    }
    _onFocusOutSearch(e) {
        if (isPhone()) {
            return;
        }
        super._onFocusOutSearch(e);
    }
    _handleInput(e) {
        super._handleInput(e);
        if (isPhone()) {
            this._performItemSelectionOnMobile = this._shouldPerformSelectionOnMobile(e.inputType);
        }
    }
    get _effectiveIconTooltip() {
        if (this.collapsed) {
            return ShellBarSearch_1.i18nBundle.getText(SHELLBAR_SEARCH_COLLAPSED);
        }
        if (this.value) {
            return ShellBarSearch_1.i18nBundle.getText(SEARCH_FIELD_SEARCH_ICON);
        }
        return ShellBarSearch_1.i18nBundle.getText(SHELLBAR_SEARCH_EXPANDED);
    }
    get nativeInput() {
        const domRef = this.shadowRoot;
        return isPhone() ? domRef?.querySelector(`[ui5-responsive-popover] input`) : super.nativeInput;
    }
    _onfocusin() {
        super._onfocusin();
        if (this.autoOpen) {
            this.open = true;
            this.fireDecoratorEvent("open");
        }
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        if (isPhone()) {
            this.collapsed = true;
        }
    }
};
__decorate([
    property({ type: Boolean })
], ShellBarSearch.prototype, "autoOpen", void 0);
ShellBarSearch = ShellBarSearch_1 = __decorate([
    customElement({
        tag: "ui5-shellbar-search",
        template: ShellBarSearchTemplate,
        styles: [
            Search.styles,
            ShellBarSearchCss,
        ],
    })
], ShellBarSearch);
ShellBarSearch.define();
export default ShellBarSearch;
//# sourceMappingURL=ShellBarSearch.js.map