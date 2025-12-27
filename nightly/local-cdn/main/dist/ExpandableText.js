var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExpandableText_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ExpandableTextOverflowMode from "./types/ExpandableTextOverflowMode.js";
import { EXPANDABLE_TEXT_SHOW_LESS, EXPANDABLE_TEXT_SHOW_MORE, EXPANDABLE_TEXT_CLOSE, EXPANDABLE_TEXT_SHOW_LESS_POPOVER_ARIA_LABEL, EXPANDABLE_TEXT_SHOW_MORE_POPOVER_ARIA_LABEL, } from "./generated/i18n/i18n-defaults.js";
// Template
import ExpandableTextTemplate from "./ExpandableTextTemplate.js";
// Styles
import ExpandableTextCss from "./generated/themes/ExpandableText.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-expandable-text` component allows displaying a large body of text in a small space. It provides an "expand/collapse" functionality, which shows/hides potentially truncated text.
 *
 * ### Usage
 *
 * #### When to use:
 * - To accommodate long texts in limited space, for example in list items, table cell texts, or forms
 *
 * #### When not to use:
 * - The content is critical for the user. In this case use short descriptions that can fit in
 * - Strive to provide short and meaningful texts to avoid excessive number of "Show More" links on the page
 *
 * ### Responsive Behavior
 *
 * On phones, if the component is configured to display the full text in a popover, the popover will appear in full screen.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ExpandableText";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.6.0
 */
let ExpandableText = ExpandableText_1 = class ExpandableText extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Maximum number of characters to be displayed initially. If the text length exceeds this limit, the text will be truncated with an ellipsis, and the "More" link will be displayed.
         * @default 100
         * @public
         */
        this.maxCharacters = 100;
        /**
         * Determines how the full text will be displayed.
         * @default "InPlace"
         * @public
         */
        this.overflowMode = "InPlace";
        /**
         * Specifies if an empty indicator should be displayed when there is no text.
         * @default "Off"
         * @public
         */
        this.emptyIndicatorMode = "Off";
        this._expanded = false;
    }
    getFocusDomRef() {
        if (this._usePopover) {
            return this.shadowRoot?.querySelector("[ui5-responsive-popover]");
        }
        return this.shadowRoot?.querySelector("[ui5-link]");
    }
    get _displayedText() {
        if (this._expanded && !this._usePopover) {
            return this.text;
        }
        return this.text?.substring(0, this.maxCharacters);
    }
    get _maxCharactersExceeded() {
        return (this.text?.length || 0) > this.maxCharacters;
    }
    get _usePopover() {
        return this.overflowMode === ExpandableTextOverflowMode.Popover;
    }
    get _ellipsisText() {
        if (this._expanded && !this._usePopover) {
            return " ";
        }
        return "... ";
    }
    get _textForToggle() {
        return this._expanded ? ExpandableText_1.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_LESS) : ExpandableText_1.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_MORE);
    }
    get _closeButtonText() {
        return ExpandableText_1.i18nBundle.getText(EXPANDABLE_TEXT_CLOSE);
    }
    get _accessibilityAttributesForToggle() {
        if (this._usePopover) {
            return {
                expanded: this._expanded,
                hasPopup: "dialog",
            };
        }
        return {
            expanded: this._expanded,
        };
    }
    get _accessibleNameForToggle() {
        if (this._usePopover) {
            return this._expanded ? ExpandableText_1.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_LESS_POPOVER_ARIA_LABEL) : ExpandableText_1.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_MORE_POPOVER_ARIA_LABEL);
        }
        return undefined;
    }
    _handlePopoverClose() {
        if (!isPhone()) {
            this._expanded = false;
        }
    }
    _handleToggleClick() {
        this._expanded = !this._expanded;
    }
    _handleCloseButtonClick(e) {
        this._expanded = false;
        e.stopPropagation();
    }
};
__decorate([
    property()
], ExpandableText.prototype, "text", void 0);
__decorate([
    property({ type: Number })
], ExpandableText.prototype, "maxCharacters", void 0);
__decorate([
    property()
], ExpandableText.prototype, "overflowMode", void 0);
__decorate([
    property()
], ExpandableText.prototype, "emptyIndicatorMode", void 0);
__decorate([
    property({ type: Boolean })
], ExpandableText.prototype, "_expanded", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], ExpandableText, "i18nBundle", void 0);
ExpandableText = ExpandableText_1 = __decorate([
    customElement({
        tag: "ui5-expandable-text",
        renderer: jsxRender,
        styles: ExpandableTextCss,
        template: ExpandableTextTemplate,
    })
], ExpandableText);
ExpandableText.define();
export default ExpandableText;
//# sourceMappingURL=ExpandableText.js.map