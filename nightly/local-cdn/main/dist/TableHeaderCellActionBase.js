var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, eventStrict } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableHeaderCellActionBaseTemplate from "./TableHeaderCellActionBaseTemplate.js";
import TableHeaderCellActionBaseStyles from "./generated/themes/TableHeaderCellActionBase.css.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
/**
 * Fired when a header cell action is clicked.
 *
 * @param {HTMLElement} targetRef The reference to the element that triggered the event
 * @public
 * @since 2.8.0
 */
let TableHeaderCellActionBase = class TableHeaderCellActionBase extends UI5Element {
    onBeforeRendering() {
        this.toggleAttribute("_popin", !this.parentElement);
    }
    _onClick(e) {
        // Retrieve the real action (if parent is header cell this instance is fine, otherwise retrieve it from the header cell)
        const action = this.parentElement?.hasAttribute("ui5-table-header-cell") ? this : this.getRootNode().host._headerCell.action[0];
        action.fireDecoratorEvent("click", { targetRef: e.target });
        e.stopPropagation();
    }
    get accessibilityInfo() {
        return {
            description: getActiveElement()?.hasAttribute("ui5-table-cell-base") ? this._tooltip : "",
        };
    }
    get _tooltip() {
        return this.getRenderInfo().tooltip;
    }
    get _icon() {
        return this.getRenderInfo().icon;
    }
};
TableHeaderCellActionBase = __decorate([
    eventStrict("click", {
        bubbles: false,
    })
    /**
     * @class
     * The `TableHeaderCellActionBase` class serves as a foundation for table header cell actions.
     * @constructor
     * @abstract
     * @extends UI5Element
     * @since 2.8.0
     * @public
     */
    ,
    customElement({
        renderer: jsxRenderer,
        styles: TableHeaderCellActionBaseStyles,
        template: TableHeaderCellActionBaseTemplate,
    })
], TableHeaderCellActionBase);
export default TableHeaderCellActionBase;
//# sourceMappingURL=TableHeaderCellActionBase.js.map