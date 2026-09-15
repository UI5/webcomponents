var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamicPageHeaderActions_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/pushpin-off.js";
import "@ui5/webcomponents-icons/dist/pushpin-on.js";
// Template
import DynamicPageHeaderActionsTemplate from "./DynamicPageHeaderActionsTemplate.js";
// Styles
import DynamicPageHeaderActionsCss from "./generated/themes/DynamicPageHeaderActions.css.js";
// Texts
import { DYNAMIC_PAGE_ARIA_LABEL_EXPAND_HEADER, DYNAMIC_PAGE_ARIA_LABEL_SNAP_HEADER, DYNAMIC_PAGE_ARIA_LABEL_PIN_HEADER, DYNAMIC_PAGE_ARIA_LABEL_UNPIN_HEADER, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `DynamicPageHeaderActions` component is part of the `DynamicPage`
 * family and is holding the action buttons behind the `DynamicPageTitle` and the `DynamicPageHeader`.
 *
 * The "pin" action is used to attach the header to a certain state (expanded/collapsed).
 * The expand/collapse action is used to switch between the two states of `DynamicPageHeader`.
 *
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
let DynamicPageHeaderActions = DynamicPageHeaderActions_1 = class DynamicPageHeaderActions extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the header is pinned.
         *
         * @protected
         * @default false
         */
        this.pinned = false;
        /**
         * Defines whether the pin button is hidden.
         *
         * @protected
         * @default false
         */
        this.hidePinButton = false;
        /**
         * Defines whether the header is snapped.
         *
         * @protected
         * @default false
         */
        this.snapped = false;
        /**
         * Contains attributes to be added to HTML to gain accessibility.
         *
         * @protected
         * @default {}
         */
        this.accessibilityAttributes = {};
    }
    get arrowButtonIcon() {
        return this.snapped ? "slim-arrow-down" : "slim-arrow-up";
    }
    get pinButtonIcon() {
        if (isLegacyThemeFamily()) {
            return "pushpin-off";
        }
        return this.pinned ? "pushpin-on" : "pushpin-off";
    }
    get expandButton() {
        return this.shadowRoot.querySelector(".ui5-dynamic-page-header-action-expand");
    }
    get pinButton() {
        return this.shadowRoot.querySelector(".ui5-dynamic-page-header-action-pin");
    }
    get pinLabel() {
        return this.pinned
            ? DynamicPageHeaderActions_1.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_UNPIN_HEADER)
            : DynamicPageHeaderActions_1.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_PIN_HEADER);
    }
    get expandLabel() {
        return this.snapped
            ? DynamicPageHeaderActions_1.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_EXPAND_HEADER)
            : DynamicPageHeaderActions_1.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_SNAP_HEADER);
    }
    focusExpandButton() {
        this.expandButton?.focus();
    }
    focusPinButton() {
        this.pinButton?.focus();
    }
    onExpandClick() {
        this.fireDecoratorEvent("expand-button-click");
    }
    onPinClick() {
        this.fireDecoratorEvent("pin-button-click");
    }
    onExpandHoverIn() {
        this.fireDecoratorEvent("expand-button-hover-in");
    }
    onExpandHoverOut() {
        this.fireDecoratorEvent("expand-button-hover-out");
    }
    get showPinButton() {
        return !this.hidePinButton && !this.snapped;
    }
};
__decorate([
    property({ type: Boolean })
], DynamicPageHeaderActions.prototype, "pinned", void 0);
__decorate([
    property({ type: Boolean })
], DynamicPageHeaderActions.prototype, "hidePinButton", void 0);
__decorate([
    property({ type: Boolean })
], DynamicPageHeaderActions.prototype, "snapped", void 0);
__decorate([
    property({ type: Object })
], DynamicPageHeaderActions.prototype, "accessibilityAttributes", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], DynamicPageHeaderActions, "i18nBundle", void 0);
DynamicPageHeaderActions = DynamicPageHeaderActions_1 = __decorate([
    customElement({
        tag: "ui5-dynamic-page-header-actions",
        renderer: jsxRenderer,
        styles: DynamicPageHeaderActionsCss,
        template: DynamicPageHeaderActionsTemplate,
    })
    /**
     * Event that is being fired by clicking on the expand button.
     *
     * @protected
     */
    ,
    event("expand-button-click", {
        bubbles: true,
    })
    /**
     * Event that is being fired by clicking on the pin button.
     *
     * @protected
     */
    ,
    event("pin-button-click", {
        bubbles: true,
    })
    /**
     * Event that is being fired by hovering in the expand button.
     *
     * @protected
     */
    ,
    event("expand-button-hover-in", {
        bubbles: true,
    })
    /**
     * Event that is being fired by hovering out the expand button.
     *
     * @protected
     */
    ,
    event("expand-button-hover-out", {
        bubbles: true,
    })
], DynamicPageHeaderActions);
DynamicPageHeaderActions.define();
export default DynamicPageHeaderActions;
//# sourceMappingURL=DynamicPageHeaderActions.js.map