var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import DropIndicatorTemplate from "./DropIndicatorTemplate.js";
// Styles
import DropIndicatorCss from "./generated/themes/DropIndicator.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DropIndicator.js";`
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
let DropIndicator = class DropIndicator extends UI5Element {
    get _positionProperty() {
        if (this.orientation === Orientation.Vertical) {
            return "left";
        }
        return "top";
    }
    constructor() {
        super();
        /**
         * Element where the drop indicator will be shown.
         *
         * @public
         * @default null
         */
        this.targetReference = null;
        /**
         * Owner of the indicator and the target.
         * @public
         * @default null
         */
        this.ownerReference = null;
        /**
         * Placement of the indicator relative to the target.
         *
         * @default "Before"
         * @public
         */
        this.placement = "Before";
        /**
         * Orientation of the indicator.
         *
         * @default "Vertical"
         * @public
         */
        this.orientation = "Vertical";
    }
    onAfterRendering() {
        if (!this.targetReference || !this.ownerReference) {
            Object.assign(this.style, {
                display: "none",
            });
            return;
        }
        const { left, width, right, top, bottom, height, } = this.targetReference.getBoundingClientRect();
        const { top: containerTop, height: containerHeight, } = this.ownerReference.getBoundingClientRect();
        const style = {
            display: "",
            [this._positionProperty]: "",
            width: "",
            height: "",
        };
        let position = 0;
        let isLast = false;
        let isFirst = false;
        if (this.orientation === Orientation.Vertical) {
            switch (this.placement) {
                case MovePlacement.Before:
                    position = left;
                    break;
                case MovePlacement.On:
                    style.width = `${width}px`;
                    position = left;
                    break;
                case MovePlacement.After:
                    position = right;
                    break;
            }
            style.height = `${height}px`;
        }
        if (this.orientation === Orientation.Horizontal) {
            switch (this.placement) {
                case MovePlacement.Before:
                    position = top;
                    break;
                case MovePlacement.On:
                    style.height = `${height}px`;
                    position = top;
                    break;
                case MovePlacement.After:
                    position = bottom;
                    break;
            }
            style.width = `${width}px`;
            position -= containerTop;
            if (position <= 0) {
                isFirst = true;
            }
            if (position >= containerHeight) {
                isLast = true;
            }
        }
        style[this._positionProperty] = `${position}px`;
        this.toggleAttribute("first", isFirst);
        this.toggleAttribute("last", isLast);
        Object.assign(this.style, style);
    }
};
__decorate([
    property({ type: Object })
], DropIndicator.prototype, "targetReference", void 0);
__decorate([
    property({ type: Object })
], DropIndicator.prototype, "ownerReference", void 0);
__decorate([
    property()
], DropIndicator.prototype, "placement", void 0);
__decorate([
    property()
], DropIndicator.prototype, "orientation", void 0);
DropIndicator = __decorate([
    customElement({
        tag: "ui5-drop-indicator",
        renderer: jsxRenderer,
        styles: DropIndicatorCss,
        template: DropIndicatorTemplate,
    })
], DropIndicator);
DropIndicator.define();
export default DropIndicator;
//# sourceMappingURL=DropIndicator.js.map