var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Icon_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getIconData, getIconDataSync } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import IconTemplate from "./IconTemplate.js";
import IconMode from "./types/IconMode.js";
import { ICON_ARIA_TYPE_IMAGE, ICON_ARIA_TYPE_INTERACTIVE } from "./generated/i18n/i18n-defaults.js";
// Styles
import iconCss from "./generated/themes/Icon.css.js";
const ICON_NOT_FOUND = "ICON_NOT_FOUND";
/**
 * @class
 * ### Overview
 *
 * The `ui5-icon` component represents an SVG icon.
 * There are two main scenarios how the `ui5-icon` component is used:
 * as a purely decorative element,
 * or as an interactive element that can be focused and clicked.
 *
 * ### Usage
 *
 * 1. **Get familiar with the icons collections.**
 *
 * Before displaying an icon, you need to explore the icons collections to find and import the desired icon.
 *
 * Currently there are 3 icons collection, available as 3 npm packages:
 *
 * - [@ui5/webcomponents-icons](https://www.npmjs.com/package/@ui5/webcomponents-icons) represents the "SAP-icons" collection and includes the following
 * [icons](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons).
 * - [@ui5/webcomponents-icons-tnt](https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt) represents the "tnt" collection and includes the following
 * [icons](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT).
 * - [@ui5/webcomponents-icons-business-suite](https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite) represents the "business-suite" collection and includes the following
 * [icons](https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols).
 *
 * 2. **After exploring the icons collections, add one or more of the packages as dependencies to your project.**
 *
 * `npm i @ui5/webcomponents-icons`
 * `npm i @ui5/webcomponents-icons-tnt`
 * `npm i @ui5/webcomponents-icons-business-suite`
 *
 * 3. **Then, import the desired icon**.
 *
 * `import "@ui5/\{package_name\}/dist/\{icon_name\}.js";`
 *
 * **For Example**:
 *
 * For the standard "SAP-icons" icon collection, import an icon from the `@ui5/webcomponents-icons` package:
 *
 * `import "@ui5/webcomponents-icons/dist/employee.js";`
 *
 * For the "tnt" (SAP Fiori Tools) icon collection, import an icon from the `@ui5/webcomponents-icons-tnt` package:
 *
 * `import "@ui5/webcomponents-icons-tnt/dist/antenna.js";`
 *
 * For the "business-suite" (SAP Business Suite) icon collection, import an icon from the `@ui5/webcomponents-icons-business-suite` package:
 *
 * `import "@ui5/webcomponents-icons-business-suite/dist/ab-testing.js";`
 *
 * 4. **Display the icon using the `ui5-icon` web component.**
 * Set the icon collection ("SAP-icons", "tnt" or "business-suite" - "SAP-icons" is the default icon collection and can be skipped)
 * and the icon name to the `name` property.
 *
 * `<ui5-icon name="employee"></ui5-icon>`
 * `<ui5-icon name="tnt/antenna"></ui5-icon>`
 * `<ui5-icon name="business-suite/ab-testing"></ui5-icon>`
 *
 * ### Keyboard Handling
 *
 * - [Space] / [Enter] or [Return] - Fires the `click` event if the `mode` property is set to `Interactive`.
 * - [Shift] - If [Space] / [Enter] or [Return] is pressed, pressing [Shift] releases the ui5-icon without triggering the click event.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Icon.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-icon`.
 * @constructor
 * @extends UI5Element
 * @implements {IIcon}
 * @public
 */
let Icon = Icon_1 = class Icon extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the component semantic design.
         * @default "Default"
         * @public
         * @since 1.9.2
         */
        this.design = "Default";
        /**
         * Defines whether the component should have a tooltip.
         *
         * **Note:** The tooltip text should be provided via the `accessible-name` property.
         * @default false
         * @public
         */
        this.showTooltip = false;
        /**
         * Defines the mode of the component.
         * @default "Decorative"
         * @public
         * @since 2.0.0
         */
        this.mode = "Decorative";
        /**
         * @private
         */
        this.pathData = [];
        /**
        * @private
        */
        this.invalid = false;
    }
    _onkeydown(e) {
        if (this.mode !== IconMode.Interactive) {
            return;
        }
        if (isEnter(e)) {
            this.fireDecoratorEvent("click");
        }
        if (isSpace(e)) {
            e.preventDefault(); // prevent scrolling
        }
    }
    _onkeyup(e) {
        if (this.mode === IconMode.Interactive && isSpace(e)) {
            this.fireDecoratorEvent("click");
        }
    }
    /**
    * Enforce "ltr" direction, based on the icons collection metadata.
    */
    get _dir() {
        return this.ltr ? "ltr" : undefined;
    }
    get effectiveAriaHidden() {
        return this.mode === IconMode.Decorative ? "true" : undefined;
    }
    get _tabIndex() {
        return this.mode === IconMode.Interactive ? 0 : undefined;
    }
    get effectiveAccessibleRole() {
        switch (this.mode) {
            case IconMode.Interactive:
                return "button";
            case IconMode.Decorative:
                return "presentation";
            default:
                return "img";
        }
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    async onBeforeRendering() {
        const name = this.name;
        if (!name) {
            return;
        }
        let iconData = getIconDataSync(name);
        if (!iconData) {
            iconData = await getIconData(name);
        }
        if (!iconData) {
            this.invalid = true;
            /* eslint-disable-next-line */
            return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
        }
        if (iconData === ICON_NOT_FOUND) {
            this.invalid = true;
            /* eslint-disable-next-line */
            return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`);
        }
        this.viewBox = iconData.viewBox || "0 0 512 512";
        if ("customTemplate" in iconData && iconData.customTemplate) {
            this.customTemplate = executeTemplate(iconData.customTemplate, this);
        }
        if ("customTemplateAsString" in iconData) {
            this.customTemplateAsString = iconData.customTemplateAsString;
        }
        // in case a new valid name is set, show the icon
        this.invalid = false;
        if ("pathData" in iconData && iconData.pathData) {
            this.pathData = Array.isArray(iconData.pathData) ? iconData.pathData : [iconData.pathData];
        }
        this.accData = iconData.accData;
        this.ltr = iconData.ltr;
        this.packageName = iconData.packageName;
        if (this.accessibleName) {
            this.effectiveAccessibleName = this.accessibleName;
        }
        else if (this.accData) {
            if (this.packageName) {
                const i18nBundle = await getI18nBundle(this.packageName);
                this.effectiveAccessibleName = i18nBundle.getText(this.accData) || undefined;
            }
            else {
                this.effectiveAccessibleName = this.accData?.defaultText || undefined;
            }
        }
        else {
            this.effectiveAccessibleName = undefined;
        }
    }
    get hasIconTooltip() {
        return this.showTooltip && this.effectiveAccessibleName;
    }
    _getAriaTypeDescription() {
        switch (this.mode) {
            case IconMode.Interactive:
                return Icon_1.i18nBundle.getText(ICON_ARIA_TYPE_INTERACTIVE);
            case IconMode.Image:
                return Icon_1.i18nBundle.getText(ICON_ARIA_TYPE_IMAGE);
            default:
                return "";
        }
    }
    get accessibilityInfo() {
        if (this.mode === IconMode.Decorative) {
            return {};
        }
        return {
            role: this.effectiveAccessibleRole,
            type: this._getAriaTypeDescription(),
            description: this.effectiveAccessibleName,
        };
    }
};
__decorate([
    property()
], Icon.prototype, "design", void 0);
__decorate([
    property()
], Icon.prototype, "name", void 0);
__decorate([
    property()
], Icon.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Boolean })
], Icon.prototype, "showTooltip", void 0);
__decorate([
    property()
], Icon.prototype, "mode", void 0);
__decorate([
    property({ type: Array })
], Icon.prototype, "pathData", void 0);
__decorate([
    property({ type: Object, noAttribute: true })
], Icon.prototype, "accData", void 0);
__decorate([
    property({ type: Boolean })
], Icon.prototype, "invalid", void 0);
__decorate([
    property({ noAttribute: true })
], Icon.prototype, "effectiveAccessibleName", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Icon, "i18nBundle", void 0);
Icon = Icon_1 = __decorate([
    customElement({
        tag: "ui5-icon",
        languageAware: true,
        themeAware: true,
        renderer: jsxRender,
        template: IconTemplate,
        styles: iconCss,
    })
    /**
     * Fired on mouseup, `SPACE` and `ENTER`.
     * - on mouse click, the icon fires native `click` event
     * - on `SPACE` and `ENTER`, the icon fires custom `click` event
     * @public
     * @since 2.11.0
     */
    ,
    event("click", {
        bubbles: true,
    })
], Icon);
Icon.define();
export default Icon;
//# sourceMappingURL=Icon.js.map