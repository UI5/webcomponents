var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TabSeparator_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import TabContainer from "./TabContainer.js";
// Templates
import TabSeparatorInStripTemplate from "./TabSeparatorInStripTemplate.js";
import TabSeparatorInOverflowTemplate from "./TabSeparatorInOverflowTemplate.js";
// Styles
import stripCss from "./generated/themes/TabSeparatorInStrip.css.js";
import overflowCss from "./generated/themes/TabSeparatorInOverflow.css.js";
/**
 * @class
 * The `ui5-tab-separator` represents a vertical line to separate tabs inside a `ui5-tabcontainer`.
 * @constructor
 * @extends UI5Element
 * @implements {ITab}
 * @abstract
 * @public
 */
let TabSeparator = TabSeparator_1 = class TabSeparator extends UI5Element {
    static get stripTemplate() {
        return TabSeparatorInStripTemplate;
    }
    static get overflowTemplate() {
        return TabSeparatorInOverflowTemplate;
    }
    get isSeparator() {
        return true;
    }
    receiveStripInfo({ getElementInStrip }) {
        this._getElementInStrip = getElementInStrip;
    }
    receiveOverflowInfo({ style }) {
        this._forcedStyleInOverflow = style;
    }
    /**
     * Returns the DOM reference of the separator that is placed in the header.
     *
     * **Note:** Separators, placed in the `items` slot of other tabs are not shown in the header. Calling this method on such separators will return `undefined`.
     * @public
     */
    getDomRefInStrip() {
        return this._getElementInStrip?.();
    }
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
    get stripPresentation() {
        return executeTemplate(TabSeparator_1.stripTemplate, this);
    }
    get overflowPresentation() {
        return executeTemplate(TabSeparator_1.overflowTemplate, this);
    }
    captureRef(ref) {
        if (ref) {
            ref.realTabReference = this;
        }
    }
};
TabSeparator = TabSeparator_1 = __decorate([
    customElement({
        tag: "ui5-tab-separator",
        renderer: jsxRenderer,
    })
], TabSeparator);
TabSeparator.define();
TabContainer.registerTabStyles(stripCss);
TabContainer.registerTabStyles(overflowCss);
export default TabSeparator;
//# sourceMappingURL=TabSeparator.js.map