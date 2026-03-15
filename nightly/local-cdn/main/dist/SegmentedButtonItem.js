var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SegmentedButtonItem_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { getEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/config/Tooltips.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts, getEffectiveAriaDescriptionText, } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";
import SegmentedButtonItemTemplate from "./SegmentedButtonItemTemplate.js";
import segmentedButtonItemCss from "./generated/themes/SegmentedButtonItem.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * Users can use the `ui5-segmented-button-item` as part of a `ui5-segmented-button`.
 *
 * Clicking or tapping on a `ui5-segmented-button-item` changes its state to `selected`.
 * The item returns to its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any
 * `ui5-segmented-button-item`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButtonItem.js";`
 * @constructor
 * @extends UI5Element
 * @implements { ISegmentedButtonItem }
 * @implements { IButton }
 * @public
 */
let SegmentedButtonItem = SegmentedButtonItem_1 = class SegmentedButtonItem extends UI5Element {
    get ariaDescription() {
        return SegmentedButtonItem_1.i18nBundle.getText(SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION);
    }
    constructor() {
        super();
        /**
         * Defines whether the component is disabled.
         * A disabled component can't be selected or
         * focused, and it is not in the tab chain.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Determines whether the component is displayed as selected.
         * @default false
         * @public
         */
        this.selected = false;
        /**
         * Defines if the button has icon and no text.
         * @private
         */
        this.iconOnly = false;
        /**
         * Indicates if the element is focusable
         * @private
         */
        this.nonInteractive = false;
        /**
         * Defines the index of the item inside of the SegmentedButton.
         * @default 0
         * @private
         */
        this.posInSet = 0;
        /**
         * Defines how many items are inside of the SegmentedButton.
         * @default 0
         * @private
         */
        this.sizeOfSet = 0;
        /**
         * @private
         */
        this.hidden = false;
    }
    _onclick(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.selected = !this.selected;
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    onBeforeRendering() {
        this.iconOnly = !willShowContent(this.text);
    }
    _onkeyup(e) {
        if (isSpaceShift(e)) {
            e.preventDefault();
        }
    }
    get tabIndexValue() {
        if (this.disabled) {
            return;
        }
        const tabindex = this.getAttribute("tabindex");
        if (tabindex) {
            return tabindex;
        }
        return this.forcedTabIndex;
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this) || undefined;
    }
    get ariaDescriptionText() {
        return getEffectiveAriaDescriptionText(this) || undefined;
    }
    get showIconTooltip() {
        return getEnableDefaultTooltips() && this.iconOnly && !this.tooltip;
    }
    get slotTextContent() {
        return this.text
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent?.trim() || "")
            .filter(Boolean)
            .join(" ");
    }
};
__decorate([
    property({ type: Boolean })
], SegmentedButtonItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], SegmentedButtonItem.prototype, "selected", void 0);
__decorate([
    property()
], SegmentedButtonItem.prototype, "tooltip", void 0);
__decorate([
    property()
], SegmentedButtonItem.prototype, "accessibleName", void 0);
__decorate([
    property()
], SegmentedButtonItem.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], SegmentedButtonItem.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], SegmentedButtonItem.prototype, "accessibleDescriptionRef", void 0);
__decorate([
    property()
], SegmentedButtonItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], SegmentedButtonItem.prototype, "iconOnly", void 0);
__decorate([
    property({ type: Boolean })
], SegmentedButtonItem.prototype, "nonInteractive", void 0);
__decorate([
    property({ noAttribute: true })
], SegmentedButtonItem.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Number })
], SegmentedButtonItem.prototype, "posInSet", void 0);
__decorate([
    property({ type: Number })
], SegmentedButtonItem.prototype, "sizeOfSet", void 0);
__decorate([
    property({ type: Boolean })
], SegmentedButtonItem.prototype, "hidden", void 0);
__decorate([
    slot({ type: Node, "default": true })
], SegmentedButtonItem.prototype, "text", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], SegmentedButtonItem, "i18nBundle", void 0);
SegmentedButtonItem = SegmentedButtonItem_1 = __decorate([
    customElement({
        tag: "ui5-segmented-button-item",
        renderer: jsxRenderer,
        template: SegmentedButtonItemTemplate,
        styles: segmentedButtonItemCss,
    })
], SegmentedButtonItem);
SegmentedButtonItem.define();
export default SegmentedButtonItem;
//# sourceMappingURL=SegmentedButtonItem.js.map