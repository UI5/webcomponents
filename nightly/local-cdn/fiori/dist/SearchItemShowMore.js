var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SearchItemShowMore_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import SearchItemShowMoreTemplate from "./SearchItemShowMoreTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import SearchItemShowMoreCss from "./generated/themes/SearchItemShowMore.css.js";
import { SEARCH_ITEM_SHOW_MORE_COUNT, SEARCH_ITEM_SHOW_MORE_NO_COUNT } from "./generated/i18n/i18n-defaults.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
/**
 * @class
 * ### Overview
 *
 * A `ui5-search-item-show-more` is a special type of ui5-li that acts as a button to progressively reveal additional (overflow) items within a group.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SearchItemShowMore.js";`
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @since 2.14.0
 * @experimental
 */
let SearchItemShowMore = SearchItemShowMore_1 = class SearchItemShowMore extends ListItemBase {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the show more item is selected.
         * @default false
         * @public
         */
        this.selected = false;
    }
    get showMoreTextCount() {
        if (this.itemsToShowCount) {
            return SearchItemShowMore_1.i18nBundle.getText(SEARCH_ITEM_SHOW_MORE_COUNT, this.itemsToShowCount);
        }
        return SearchItemShowMore_1.i18nBundle.getText(SEARCH_ITEM_SHOW_MORE_NO_COUNT);
    }
    _onfocusin(e) {
        super._onfocusin(e);
        this.selected = true;
    }
    _onfocusout() {
        this.selected = false;
    }
    _onclick(e, fromKeyboard = false) {
        e.stopImmediatePropagation();
        this.fireDecoratorEvent("click", { fromKeyboard });
    }
    _onkeydown(e) {
        if (isEnter(e)) {
            this._onclick(e, true);
            e.preventDefault();
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._onclick(e, true);
            e.preventDefault();
        }
    }
};
__decorate([
    property()
], SearchItemShowMore.prototype, "itemsToShowCount", void 0);
__decorate([
    property({ type: Boolean })
], SearchItemShowMore.prototype, "selected", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], SearchItemShowMore, "i18nBundle", void 0);
SearchItemShowMore = SearchItemShowMore_1 = __decorate([
    customElement({
        tag: "ui5-search-item-show-more",
        languageAware: true,
        renderer: jsxRenderer,
        template: SearchItemShowMoreTemplate,
        styles: [
            ListItemBase.styles,
            SearchItemCss,
            SearchItemShowMoreCss,
        ],
    })
    /**
     * Fired when the component is activated, either with a mouse/tap
     * or by pressing the Enter or Space keys.
     *
     * @public
     * @param {boolean} fromKeyboard Indicates whether the event was fired
     * due to keyboard interaction (Enter or Space) rather than mouse/tap.
     */
    ,
    event("click", {
        bubbles: true,
        cancelable: true,
    })
], SearchItemShowMore);
SearchItemShowMore.define();
export default SearchItemShowMore;
//# sourceMappingURL=SearchItemShowMore.js.map