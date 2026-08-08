var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItemBase from "./ListItemBase.js";
// Template
import OptionTemplate from "./OptionTemplate.js";
// Styles
import optionBaseCss from "./generated/themes/OptionBase.css.js";
import listItemIconCss from "./generated/themes/ListItemIcon.css.js";
import listItemAdditionalTextCss from "./generated/themes/ListItemAdditionalText.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option` component defines the content of an option in the `ui5-select`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Option.js";`
 * @constructor
 * @extends ListItemBase
 * @implements {IOption}
 * @public
 */
let Option = class Option extends ListItemBase {
    get displayIconBegin() {
        return !!this.icon;
    }
    get effectiveDisplayText() {
        return this.textContent || "";
    }
};
__decorate([
    slot({ type: Node, "default": true, invalidateOnChildChange: true })
], Option.prototype, "text", void 0);
__decorate([
    property()
], Option.prototype, "value", void 0);
__decorate([
    property()
], Option.prototype, "icon", void 0);
__decorate([
    property()
], Option.prototype, "additionalText", void 0);
__decorate([
    property()
], Option.prototype, "tooltip", void 0);
__decorate([
    property({ type: Boolean })
], Option.prototype, "selected", void 0);
Option = __decorate([
    customElement({
        tag: "ui5-option",
        template: OptionTemplate,
        styles: [
            ListItemBase.styles,
            listItemAdditionalTextCss,
            listItemIconCss,
            optionBaseCss,
        ],
    })
], Option);
Option.define();
export default Option;
//# sourceMappingURL=Option.js.map