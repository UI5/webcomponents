var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TimelineItem_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TimelineItemTemplate from "./TimelineItemTemplate.js";
import { TIMELINE_ITEM_INFORMATION_STATE_TEXT, TIMELINE_ITEM_POSITIVE_STATE_TEXT, TIMELINE_ITEM_NEGATIVE_STATE_TEXT, TIMELINE_ITEM_CRITICAL_STATE_TEXT, } from "./generated/i18n/i18n-defaults.js";
import TimelineItemCss from "./generated/themes/TimelineItem.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * An entry posted on the timeline.
 * @constructor
 * @extends UI5Element
 * @implements { ITimelineItem }
 * @public
 */
let TimelineItem = TimelineItem_1 = class TimelineItem extends UI5Element {
    constructor() {
        super();
        /**
         * Defines if the `name` is clickable.
         * @default false
         * @public
         */
        this.nameClickable = false;
        /**
         * Defines the state of the icon displayed in the `ui5-timeline-item`.
         * @default "None"
         * @public
         * @since 2.7.0
         */
        this.state = "None";
        /**
         * @private
         */
        this.firstItemInTimeline = false;
        /**
         * @private
         */
        this.isNextItemGroup = false;
        this.forcedTabIndex = "-1";
        /**
         * Defines the items orientation.
         * @default "Vertical"
         * @private
         */
        this.layout = "Vertical";
        /**
         * @private
         */
        this.hideBubble = false;
        /**
         * Marks the last `<ui5-timeline-item>`
         * @private
         */
        this.lastItem = false;
        /**
         * @private
         */
        this.hidden = false;
        /**
         * @private
         */
        this.effectiveRole = "listitem";
    }
    onNamePress() {
        this.fireDecoratorEvent("name-click");
    }
    /**
     * Focus the internal link.
     */
    focusLink() {
        this.shadowRoot.querySelector("[ui5-link]")?.focus();
    }
    static typeTextMappings() {
        return {
            "Information": TIMELINE_ITEM_INFORMATION_STATE_TEXT,
            "Positive": TIMELINE_ITEM_POSITIVE_STATE_TEXT,
            "Negative": TIMELINE_ITEM_NEGATIVE_STATE_TEXT,
            "Critical": TIMELINE_ITEM_CRITICAL_STATE_TEXT,
        };
    }
    get timelineItemStateText() {
        return this.state !== "None" ? TimelineItem_1.i18nBundleFiori.getText(TimelineItem_1.typeTextMappings()[this.state]) : undefined;
    }
    get isGroupItem() {
        return false;
    }
    get _getAccessibleLabel() {
        const parts = [];
        if (this.name) {
            parts.push(this.name);
        }
        if (this.titleText) {
            parts.push(this.titleText);
        }
        if (this.subtitleText) {
            parts.push(this.subtitleText);
        }
        if (this.timelineItemStateText) {
            parts.push(this.timelineItemStateText);
        }
        return parts.join(", ");
    }
};
__decorate([
    property()
], TimelineItem.prototype, "icon", void 0);
__decorate([
    property()
], TimelineItem.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "nameClickable", void 0);
__decorate([
    property()
], TimelineItem.prototype, "titleText", void 0);
__decorate([
    property()
], TimelineItem.prototype, "subtitleText", void 0);
__decorate([
    property()
], TimelineItem.prototype, "state", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], TimelineItem.prototype, "content", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "firstItemInTimeline", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "isNextItemGroup", void 0);
__decorate([
    property({ noAttribute: true })
], TimelineItem.prototype, "forcedTabIndex", void 0);
__decorate([
    property()
], TimelineItem.prototype, "layout", void 0);
__decorate([
    property({ noAttribute: true })
], TimelineItem.prototype, "forcedLineWidth", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "hideBubble", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "lastItem", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "hidden", void 0);
__decorate([
    property({ noAttribute: true })
], TimelineItem.prototype, "effectiveRole", void 0);
__decorate([
    property({ type: Number })
], TimelineItem.prototype, "positionInGroup", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], TimelineItem, "i18nBundleFiori", void 0);
TimelineItem = TimelineItem_1 = __decorate([
    customElement({
        tag: "ui5-timeline-item",
        renderer: jsxRenderer,
        styles: TimelineItemCss,
        template: TimelineItemTemplate,
    })
    /**
     * Fired when the item name is pressed either with a
     * click/tap or by using the Enter or Space key.
     *
     * **Note:** The event will not be fired if the `name-clickable`
     * attribute is not set.
     * @public
     */
    ,
    event("name-click", {
        bubbles: true,
    })
], TimelineItem);
TimelineItem.define();
export default TimelineItem;
//# sourceMappingURL=TimelineItem.js.map