var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Tab_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { TAB_ARIA_DESIGN_POSITIVE, TAB_ARIA_DESIGN_NEGATIVE, TAB_ARIA_DESIGN_CRITICAL, TAB_ARIA_DESIGN_NEUTRAL, TABCONTAINER_END_OVERFLOW, TAB_SPLIT_ROLE_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import SemanticColor from "./types/SemanticColor.js";
import ListItemType from "./types/ListItemType.js";
import TabContainer from "./TabContainer.js";
// Templates
import TabTemplate from "./TabTemplate.js";
import TabInStripTemplate from "./TabInStripTemplate.js";
import TabInOverflowTemplate from "./TabInOverflowTemplate.js";
// Styles
import css from "./generated/themes/Tab.css.js";
import stripCss from "./generated/themes/TabInStrip.css.js";
import draggableElementStyles from "./generated/themes/DraggableElement.css.js";
import overflowCss from "./generated/themes/TabInOverflow.css.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
const DESIGN_DESCRIPTIONS = {
    [SemanticColor.Positive]: TAB_ARIA_DESIGN_POSITIVE,
    [SemanticColor.Negative]: TAB_ARIA_DESIGN_NEGATIVE,
    [SemanticColor.Neutral]: TAB_ARIA_DESIGN_NEUTRAL,
    [SemanticColor.Critical]: TAB_ARIA_DESIGN_CRITICAL,
};
/**
 * @class
 * The `ui5-tab` represents a selectable item inside a `ui5-tabcontainer`.
 * It defines both the item in the tab strip (top part of the `ui5-tabcontainer`) and the
 * content that is presented to the user once the tab is selected.
 * @abstract
 * @constructor
 * @extends UI5Element
 * @implements {ITab}
 * @public
 */
let Tab = Tab_1 = class Tab extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Disabled tabs can't be selected.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines the component's design color.
         *
         * The design is applied to:
         *
         * - the component icon
         * - the `text` when the component overflows
         * - the tab selection line
         *
         * Available designs are: `"Default"`, `"Neutral"`, `"Positive"`, `"Critical"` and `"Negative"`.
         *
         * **Note:** The design depends on the current theme.
         * @default "Default"
         * @public
         */
        this.design = "Default";
        /**
         * Specifies if the component is selected.
         * @default false
         * @public
         */
        this.selected = false;
        /**
         * Defines if the tab is movable.
         *
         * @default false
         * @public
         * @since 2.0.0
         */
        this.movable = false;
        this._isTopLevelTab = false;
    }
    set forcedTabIndex(val) {
        this.getDomRefInStrip().setAttribute("tabindex", val);
    }
    get forcedTabIndex() {
        return this.getDomRefInStrip().getAttribute("tabindex");
    }
    get displayText() {
        let text = this.text;
        if (this._isInline && this.additionalText) {
            text += ` (${this.additionalText})`;
        }
        return text;
    }
    get isSeparator() {
        return false;
    }
    get stripPresentation() {
        return executeTemplate(Tab_1.stripTemplate, this);
    }
    get overflowPresentation() {
        return executeTemplate(Tab_1.overflowTemplate, this);
    }
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
    get requiresExpandButton() {
        return this.items.length > 0 && this._isTopLevelTab && this.hasOwnContent;
    }
    get isSingleClickArea() {
        return this.items.length > 0 && this._isTopLevelTab && !this.hasOwnContent;
    }
    get isTwoClickArea() {
        return this.items.length > 0 && this._isTopLevelTab && this.hasOwnContent;
    }
    get isOnSelectedTabPath() {
        return this._selectedTabReference === this || this.tabs.some(subTab => subTab.isOnSelectedTabPath);
    }
    get _effectiveSlotName() {
        return this.isOnSelectedTabPath ? this._individualSlot : `disabled-${this._individualSlot}`;
    }
    get _defaultSlotName() {
        return this._selectedTabReference === this ? "" : "disabled-slot";
    }
    get hasOwnContent() {
        return willShowContent(this.content);
    }
    get expandBtnAccessibilityAttributes() {
        return {
            hasPopup: "menu",
        };
    }
    receiveStripInfo({ getElementInStrip, posinset, setsize, isInline, isTopLevelTab, mixedMode, }) {
        this._getElementInStrip = getElementInStrip;
        this._forcedPosinset = posinset;
        this._forcedSetsize = setsize;
        this._forcedMixedMode = mixedMode;
        this._isInline = isInline;
        this._isTopLevelTab = !!isTopLevelTab;
    }
    receiveOverflowInfo({ getElementInOverflow, style }) {
        this._getElementInOverflow = getElementInOverflow;
        this._forcedStyleInOverflow = style;
    }
    /**
     * Returns the DOM reference of the tab that is placed in the header.
     *
     * **Note:** Tabs, placed in the `items` slot of other tabs are not shown in the header. Calling this method on such tabs will return `undefined`.
     *
     * **Note:** If you need a DOM ref to the tab content please use the `getDomRef` method.
     * @public
     * @since 1.0.0-rc.16
     */
    getDomRefInStrip() {
        return this._getElementInStrip?.();
    }
    getFocusDomRef() {
        let focusedDomRef = this._getElementInOverflow?.();
        if (!focusedDomRef) {
            focusedDomRef = this._getElementInStrip?.();
        }
        return focusedDomRef;
    }
    async focus(focusOptions) {
        await renderFinished();
        return super.focus(focusOptions);
    }
    get isMixedModeTab() {
        return !this.icon && this._forcedMixedMode;
    }
    get isTextOnlyTab() {
        return !this.icon && !this._forcedMixedMode;
    }
    get isIconTab() {
        return !!this.icon;
    }
    get effectiveDisabled() {
        return this.disabled || undefined;
    }
    get effectiveSelected() {
        const subItemSelected = this.tabs.some(elem => elem.effectiveSelected);
        return this.selected || this._selectedTabReference === this || subItemSelected;
    }
    get effectiveHidden() {
        return !this.effectiveSelected;
    }
    get tabs() {
        return this.items.filter((tab) => !tab.isSeparator);
    }
    get ariaLabelledBy() {
        const labels = [];
        if (this.text) {
            labels.push(`${this._id}-text`);
        }
        if (this.additionalText) {
            labels.push(`${this._id}-additionalText`);
        }
        if (this.icon) {
            labels.push(`${this._id}-icon`);
        }
        if (this._designDescription) {
            labels.push(`${this._id}-designDescription`);
        }
        return labels.join(" ");
    }
    get stripClasses() {
        const classes = ["ui5-tab-strip-item"];
        if (this.effectiveSelected) {
            classes.push("ui5-tab-strip-item--selected");
        }
        if (this.disabled) {
            classes.push("ui5-tab-strip-item--disabled");
        }
        if (this._isInline) {
            classes.push("ui5-tab-strip-item--inline");
        }
        if (this.additionalText) {
            classes.push("ui5-tab-strip-item--withAdditionalText");
        }
        if (!this.icon && !this._forcedMixedMode) {
            classes.push("ui5-tab-strip-item--textOnly");
        }
        if (this.icon) {
            classes.push("ui5-tab-strip-item--withIcon");
        }
        if (!this.icon && this._forcedMixedMode) {
            classes.push("ui5-tab-strip-item--mixedMode");
        }
        if (this.design !== SemanticColor.Default) {
            classes.push(`ui5-tab-strip-item--${this.design.toLowerCase()}`);
        }
        if (this.isSingleClickArea) {
            classes.push(`ui5-tab-strip-item--singleClickArea`);
        }
        if (this.isTwoClickArea) {
            classes.push(`ui5-tab-strip-item--twoClickArea`);
        }
        return {
            itemClasses: classes.join(" "),
            additionalTextClasses: this.additionalTextClasses,
        };
    }
    get additionalTextClasses() {
        const classes = [];
        if (this.additionalText) {
            classes.push("ui5-tab-strip-itemAdditionalText");
        }
        if (this.icon && !this.additionalText) {
            classes.push("ui5-tab-strip-itemAdditionalText-hidden");
        }
        return classes.join(" ");
    }
    get expandButtonTitle() {
        return Tab_1.i18nBundle.getText(TABCONTAINER_END_OVERFLOW);
    }
    get _roleDescription() {
        return this.items.length > 0 ? Tab_1.i18nBundle.getText(TAB_SPLIT_ROLE_DESCRIPTION) : undefined;
    }
    get _ariaHasPopup() {
        return this.isSingleClickArea ? "menu" : undefined;
    }
    get semanticIconName() {
        switch (this.design) {
            case SemanticColor.Positive:
                return "sys-enter-2";
            case SemanticColor.Negative:
                return "error";
            case SemanticColor.Critical:
                return "alert";
            default:
                return null;
        }
    }
    get _designDescription() {
        if (this.design === SemanticColor.Default) {
            return null;
        }
        return Tab_1.i18nBundle.getText(DESIGN_DESCRIPTIONS[this.design]);
    }
    get semanticIconClasses() {
        const classes = ["ui5-tab-semantic-icon"];
        if (this.design !== SemanticColor.Default && this.design !== SemanticColor.Neutral) {
            classes.push(`ui5-tab-semantic-icon--${this.design.toLowerCase()}`);
        }
        return classes.join(" ");
    }
    get overflowClasses() {
        const classes = ["ui5-tab-overflow-item"];
        if (this.design !== SemanticColor.Default && this.design !== SemanticColor.Neutral) {
            classes.push(`ui5-tab-overflow-item--${this.design.toLowerCase()}`);
        }
        if (this.effectiveDisabled) {
            classes.push("ui5-tab-overflow-item--disabled");
        }
        if (this.selected) {
            classes.push("ui5-tab-overflow-item--selectedSubTab");
        }
        return classes.join(" ");
    }
    get overflowState() {
        return (this.disabled || this.isSingleClickArea) ? ListItemType.Inactive : ListItemType.Active;
    }
    static get stripTemplate() {
        return TabInStripTemplate;
    }
    static get overflowTemplate() {
        return TabInOverflowTemplate;
    }
    _ondragstart(e) {
        if (e.target instanceof HTMLElement) {
            DragRegistry.setDraggedElement(this);
            e.target.setAttribute("data-moving", "");
        }
    }
    _ondragend(e) {
        if (e.target instanceof HTMLElement) {
            DragRegistry.clearDraggedElement();
            e.target.removeAttribute("data-moving");
        }
    }
    captureRef(ref) {
        if (ref) {
            ref.realTabReference = this;
        }
    }
    captureButtonRef(ref) {
        if (ref) {
            ref.tab = this;
        }
    }
};
__decorate([
    property()
], Tab.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], Tab.prototype, "disabled", void 0);
__decorate([
    property()
], Tab.prototype, "additionalText", void 0);
__decorate([
    property()
], Tab.prototype, "icon", void 0);
__decorate([
    property()
], Tab.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], Tab.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], Tab.prototype, "movable", void 0);
__decorate([
    property({ type: Boolean })
], Tab.prototype, "_isTopLevelTab", void 0);
__decorate([
    property({ type: Object })
], Tab.prototype, "_selectedTabReference", void 0);
__decorate([
    slot({
        type: Node,
        "default": true,
        invalidateOnChildChange: {
            properties: true,
            slots: false,
        },
    })
], Tab.prototype, "content", void 0);
__decorate([
    slot({
        type: HTMLElement,
        individualSlots: true,
        invalidateOnChildChange: {
            properties: true,
            slots: false,
        },
    })
], Tab.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Tab, "i18nBundle", void 0);
Tab = Tab_1 = __decorate([
    customElement({
        tag: "ui5-tab",
        languageAware: true,
        renderer: jsxRenderer,
        template: TabTemplate,
        styles: css,
    })
], Tab);
Tab.define();
TabContainer.registerTabStyles(stripCss);
TabContainer.registerTabStyles(draggableElementStyles);
TabContainer.registerTabStyles(overflowCss);
export default Tab;
//# sourceMappingURL=Tab.js.map