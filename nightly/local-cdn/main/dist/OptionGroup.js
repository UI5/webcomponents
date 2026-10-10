var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OptionGroup_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import ListItemGroupBase from "./ListItemGroupBase.js";
import OptionGroupTemplate from "./OptionGroupTemplate.js";
import { LIST_ITEM_GROUP_HEADER } from "./generated/i18n/i18n-defaults.js";
import OptionGroupCss from "./generated/themes/OptionGroup.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option-group` component is used to group options within a `ui5-select`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/OptionGroup.js";`
 * @constructor
 * @extends ListItemGroupBase
 * @public
 * @since 2.26.0
 */
let OptionGroup = OptionGroup_1 = class OptionGroup extends ListItemGroupBase {
    get isOptionGroup() {
        return true;
    }
    get _groupHeaderRoleDescription() {
        return OptionGroup_1.i18nBundle.getText(LIST_ITEM_GROUP_HEADER);
    }
};
__decorate([
    slot({
        "default": true,
        invalidateOnChildChange: true,
        individualSlots: true,
        type: HTMLElement,
    })
], OptionGroup.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], OptionGroup, "i18nBundle", void 0);
OptionGroup = OptionGroup_1 = __decorate([
    customElement({
        tag: "ui5-option-group",
        languageAware: true,
        template: OptionGroupTemplate,
        styles: [OptionGroupCss],
    })
], OptionGroup);
OptionGroup.define();
export const isInstanceOfOptionGroup = createInstanceChecker("isOptionGroup");
export default OptionGroup;
//# sourceMappingURL=OptionGroup.js.map