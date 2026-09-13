var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import ListItemStandard from "./ListItemStandard.js";
import SuggestionListItemTemplate from "./SuggestionListItemTemplate.js";
/**
 * @class
 * The `ui5-li-suggestion-item` represents the suggestion item in the `ui5-input`
 * suggestion popover.
 * @constructor
 * @extends ListItemStandard
 * @csspart title - Used to style the title of the suggestion list item
 * @csspart description - Used to style the description of the suggestion list item
 * @csspart info - Used to style the info of the suggestion list item
 */
let SuggestionListItem = class SuggestionListItem extends ListItemStandard {
    onBeforeRendering() {
        super.onBeforeRendering();
        this.hasTitle = !!this.titleText.length;
    }
    get effectiveTitle() {
        return this.titleText.filter(node => node.nodeType !== Node.COMMENT_NODE).map(el => el.textContent).join("");
    }
    get hasDescription() {
        return this.richDescription.length > 0 || this.description;
    }
    get groupItem() {
        return false;
    }
};
__decorate([
    slot()
], SuggestionListItem.prototype, "richDescription", void 0);
__decorate([
    slot({ type: Node, "default": true })
], SuggestionListItem.prototype, "titleText", void 0);
SuggestionListItem = __decorate([
    customElement({
        renderer: jsxRenderer,
        tag: "ui5-li-suggestion-item",
        template: SuggestionListItemTemplate,
    })
], SuggestionListItem);
SuggestionListItem.define();
export default SuggestionListItem;
//# sourceMappingURL=SuggestionListItem.js.map