var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SideNavigationSubItem_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import SideNavigationSubItemTemplate from "./SideNavigationSubItemTemplate.js";
import { SIDE_NAVIGATION_LIST_ITEM_TAG_TEXT } from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents/dist/Tag.js";
// Styles
import SideNavigationSubItemCss from "./generated/themes/SideNavigationSubItem.css.js";
/**
 * @class
 *
 * ### Overview
 * Represents a single navigation action within `ui5-side-navigation-item`.
 * The `ui5-side-navigation-sub-item` is intended to be used inside a `ui5-side-navigation-item` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";`
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @public
 * @abstract
 * @since 1.0.0
 */
let SideNavigationSubItem = SideNavigationSubItem_1 = class SideNavigationSubItem extends SideNavigationSelectableItemBase {
    get hasTag() {
        return !!this.tag.length;
    }
    onBeforeRendering() {
        this._syncTagWrapping();
    }
    get _tagText() {
        return this.tag[0]?.textContent?.trim() ?? "";
    }
    get _tagDescriptionText() {
        return this.hasTag ? SideNavigationSubItem_1.i18nBundle.getText(SIDE_NAVIGATION_LIST_ITEM_TAG_TEXT, this._tagText) : undefined;
    }
    get _textId() {
        return `${this._id}-text`;
    }
    get _describedBy() {
        return this.hasTag ? this._tagId : undefined;
    }
    _onkeydown(e) {
        super._onkeydown(e);
    }
    _onkeyup(e) {
        super._onkeyup(e);
    }
    _onfocusin(e) {
        super._onfocusin(e);
    }
    _onclick(e) {
        super._onclick(e);
    }
    get classesArray() {
        const classes = super.classesArray;
        if (this.icon) {
            classes.push("ui5-sn-item-has-icon");
        }
        if (this.effectiveDisabled) {
            classes.push("ui5-sn-item-disabled");
        }
        return classes;
    }
};
__decorate([
    slot({ type: HTMLElement })
], SideNavigationSubItem.prototype, "tag", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], SideNavigationSubItem, "i18nBundle", void 0);
SideNavigationSubItem = SideNavigationSubItem_1 = __decorate([
    customElement({
        tag: "ui5-side-navigation-sub-item",
        renderer: jsxRender,
        template: SideNavigationSubItemTemplate,
        styles: SideNavigationSubItemCss,
    })
], SideNavigationSubItem);
SideNavigationSubItem.define();
export default SideNavigationSubItem;
//# sourceMappingURL=SideNavigationSubItem.js.map