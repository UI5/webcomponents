var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ColorPalettePopover_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import ColorPalettePopoverTemplate from "./ColorPalettePopoverTemplate.js";
// Styles
import ColorPalettePopoverCss from "./generated/themes/ColorPalettePopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import { COLORPALETTE_POPOVER_TITLE, COLOR_PALETTE_DIALOG_CANCEL_BUTTON, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 * Represents a predefined range of colors for easier selection.
 *
 * Overview
 * The ColorPalettePopover provides the users with a slot to predefine colors.
 *
 * You can customize them with the use of the colors property. You can specify a defaultColor and display a "Default color" button for the user to choose directly.
 * You can display a "More colors..." button that opens an additional color picker for the user to choose specific colors that are not present in the predefined range.
 *
 * ### Usage
 *
 * The palette is intended for users, who don't want to check and remember the different values of the colors and spend large amount of time to configure the right color through the color picker.
 *
 * For the `ui5-color-palette-popover`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/ColorPalettePopover.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.16
 */
let ColorPalettePopover = ColorPalettePopover_1 = class ColorPalettePopover extends UI5Element {
    constructor() {
        super();
        /**
         * Defines whether the user can see the last used colors in the bottom of the component
         * @default false
         * @public
         */
        this.showRecentColors = false;
        /**
         * Defines whether the user can choose a custom color from a component.
         *
         * @default false
         * @public
         */
        this.showMoreColors = false;
        /**
         * Defines whether the user can choose the default color from a button.
         * @default false
         * @public
         */
        this.showDefaultColor = false;
        /**
         * Defines the open | closed state of the popover.
         * @public
         * @default false
         * @since 1.21.0
         */
        this.open = false;
        /**
         * Determines on which side the component is placed at.
         * @default "Bottom"
         * @public
         * @since 2.19.0
         */
        this.placement = "Bottom";
    }
    get responsivePopover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    get respPopover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    closePopover() {
        this.open = false;
    }
    onAfterClose() {
        this.closePopover();
        this.fireDecoratorEvent("close");
    }
    onAfterOpen() {
        const colorPalette = this._colorPalette;
        if (colorPalette._currentlySelected) {
            colorPalette._currentlySelected?.focus();
        }
        else if (colorPalette.showRecentColors && colorPalette.recentColorsElements.length) {
            colorPalette.recentColorsElements[0].focus();
        }
        else if (colorPalette.showDefaultColor) {
            colorPalette._defaultColorButton?.focus();
        }
        // since height is dynamically determined by padding-block-start
        colorPalette.allColorsInPalette.forEach((item) => {
            const itemHeight = item.offsetHeight + 4; // adding 4px for the offsets on top and bottom
            item.style.setProperty("--_ui5_color_palette_item_height", `${itemHeight}px`);
        });
    }
    onSelectedColor(e) {
        this.closePopover();
        this.fireDecoratorEvent("item-click", e.detail);
    }
    get _colorPalette() {
        return this.responsivePopover.content[0].querySelector("[ui5-color-palette]");
    }
    /**
     * Returns if the component is opened.
     * @protected
     * @since 1.0.0-rc.16
     */
    isOpen() {
        return this.open;
    }
    get colorPaletteColors() {
        return this.getSlottedNodes("colors");
    }
    get _colorPaletteTitle() {
        return ColorPalettePopover_1.i18nBundle.getText(COLORPALETTE_POPOVER_TITLE);
    }
    get _cancelButtonLabel() {
        return ColorPalettePopover_1.i18nBundle.getText(COLOR_PALETTE_DIALOG_CANCEL_BUTTON);
    }
    get _open() {
        return this.open || undefined;
    }
};
__decorate([
    property({ type: Boolean })
], ColorPalettePopover.prototype, "showRecentColors", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalettePopover.prototype, "showMoreColors", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalettePopover.prototype, "showDefaultColor", void 0);
__decorate([
    property()
], ColorPalettePopover.prototype, "defaultColor", void 0);
__decorate([
    property()
], ColorPalettePopover.prototype, "accessibleName", void 0);
__decorate([
    property()
], ColorPalettePopover.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalettePopover.prototype, "open", void 0);
__decorate([
    property({ converter: DOMReferenceConverter })
], ColorPalettePopover.prototype, "opener", void 0);
__decorate([
    property()
], ColorPalettePopover.prototype, "placement", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, individualSlots: true })
], ColorPalettePopover.prototype, "colors", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], ColorPalettePopover, "i18nBundle", void 0);
ColorPalettePopover = ColorPalettePopover_1 = __decorate([
    customElement({
        tag: "ui5-color-palette-popover",
        renderer: jsxRenderer,
        styles: [ResponsivePopoverCommonCss, ColorPalettePopoverCss],
        template: ColorPalettePopoverTemplate,
    })
    /**
     * Fired when the user selects a color.
     * @public
     * @param {string} color the selected color
     */
    ,
    event("item-click", {
        bubbles: true,
    })
    /**
     * Fired when the `ui5-color-palette-popover` is closed due to user interaction.
     * @since 1.21.0
     * @public
     */
    ,
    event("close", {
        bubbles: true,
    })
], ColorPalettePopover);
ColorPalettePopover.define();
export default ColorPalettePopover;
//# sourceMappingURL=ColorPalettePopover.js.map