var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ColorPaletteItem_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ColorPaletteItemTemplate from "./ColorPaletteItemTemplate.js";
import { COLORPALETTE_COLOR_LABEL, } from "./generated/i18n/i18n-defaults.js";
// Styles
import ColorPaletteItemCss from "./generated/themes/ColorPaletteItem.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-color-palette-item` component represents a color in the the `ui5-color-palette`.
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.12
 * @implements { IColorPaletteItem }
 * @public
 */
let ColorPaletteItem = ColorPaletteItem_1 = class ColorPaletteItem extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the colour of the component.
         *
         * **Note:** The value should be a valid CSS color.
         * @default ""
         * @public
         */
        this.value = "";
        /**
         * Defines if the component is selected.
         *
         * **Note:** Only one item must be selected per <code>ui5-color-palette</code>.
         * If more than one item is defined as selected, the last one would be considered as the selected one.
         *
         * @public
         * @default false
         * @since 2.0.0
         */
        this.selected = false;
        /**
         * Defines the tab-index of the element, helper information for the ItemNavigation.
         * @private
         */
        this.forcedTabIndex = "-1";
        /**
         * Defines if the ColorPalette is on phone mode.
         * @private
         */
        this.onPhone = false;
        /**
         * @private
         * @since 1.0.0-rc.15
         */
        this._disabled = false;
    }
    onBeforeRendering() {
        this._disabled = !this.value;
        this.onPhone = isPhone();
        // since height is dynamically determined by padding-block-start
        const itemHeight = this.offsetHeight + 4; // adding 4px for the offsets on top and bottom
        this.style.setProperty("--_ui5_color_palette_item_height", `${itemHeight}px`);
        this.style.setProperty("--_ui5-color-palette-item-background-color", `${this.value}`);
    }
    get colorLabel() {
        return ColorPaletteItem_1.i18nBundle.getText(COLORPALETTE_COLOR_LABEL);
    }
    get classes() {
        // Remove after deleting the hbs template, it's added in the jsx template
        return {
            root: {
                "ui5-cp-item": true,
            },
        };
    }
};
__decorate([
    property()
], ColorPaletteItem.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], ColorPaletteItem.prototype, "selected", void 0);
__decorate([
    property({ noAttribute: true })
], ColorPaletteItem.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Number })
], ColorPaletteItem.prototype, "index", void 0);
__decorate([
    property({ type: Boolean })
], ColorPaletteItem.prototype, "onPhone", void 0);
__decorate([
    property({ type: Boolean })
], ColorPaletteItem.prototype, "_disabled", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], ColorPaletteItem, "i18nBundle", void 0);
ColorPaletteItem = ColorPaletteItem_1 = __decorate([
    customElement({
        tag: "ui5-color-palette-item",
        renderer: jsxRenderer,
        styles: ColorPaletteItemCss,
        template: ColorPaletteItemTemplate,
        shadowRootOptions: { delegatesFocus: true },
    })
], ColorPaletteItem);
ColorPaletteItem.define();
export default ColorPaletteItem;
//# sourceMappingURL=ColorPaletteItem.js.map