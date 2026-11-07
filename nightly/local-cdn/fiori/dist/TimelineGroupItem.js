var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TimelineGroupItemTemplate from "./TimelineGroupItemTemplate.js";
// Styles
import TimelineGroupItemCss from "./generated/themes/TimelineGroupItem.css.js";
const SHORT_LINE_WIDTH = "ShortLineWidth";
const LARGE_LINE_WIDTH = "LargeLineWidth";
/**
 * @class
 *
 * ### Overview
 *
 * An entry posted on the timeline.
 * It is intented to represent a group of `<ui5-timeline-item>`s.
 *
 * **Note**: Please do not use empty groups in order to preserve the intended design.
 *
 * @constructor
 * @extends UI5Element
 * @implements {ITimelineItem}
 * @public
 * @since 2.1.0
 */
let TimelineGroupItem = class TimelineGroupItem extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Determines if the group is collapsed or expanded.
         * @default false
         * @public
         */
        this.collapsed = false;
        /**
         * Defines the items orientation.
         * @default "Vertical"
         * @private
         */
        this.layout = "Vertical";
        /**
         * Applies to the last item in the group.
         * @private
         */
        this.lastItem = false;
        /**
         * Determines if the item afterwards is a group item.
         * Intended for styling purposes.
         * @private
         */
        this.isNextItemGroup = false;
        this.hidden = false;
        /**
         * @private
         */
        this.firstItemInTimeline = false;
        this.forcedTabIndex = "-1";
    }
    onBeforeRendering() {
        if (!this.items.length) {
            return;
        }
        this.items.forEach(item => {
            item.effectiveRole = "treeitem";
        });
        this._setGroupItemProps();
    }
    _setGroupItemProps() {
        const items = this.items;
        const itemsLength = items.length;
        if (itemsLength && this.firstItemInTimeline) {
            items[0].firstItemInTimeline = true;
        }
        for (let i = 0; i < itemsLength; i++) {
            items[i].lastItem = false;
            items[i].isNextItemGroup = false;
        }
        if (itemsLength > 0) {
            items[itemsLength - 1].isNextItemGroup = this.isNextItemGroup;
            if (this.collapsed) {
                items[itemsLength - 1].lastItem = false;
            }
            else if (this.lastItem) {
                items[itemsLength - 1].lastItem = true;
            }
        }
        for (let i = 0; i < itemsLength; i++) {
            const item = items[i];
            item.positionInGroup = i + 1;
            item.hidden = !!this.collapsed;
            item.layout = this.layout;
            if (items[i + 1] && !!items[i + 1].icon) {
                item.forcedLineWidth = SHORT_LINE_WIDTH;
            }
            else if (item.icon && items[i + 1] && !items[i + 1].icon) {
                item.forcedLineWidth = LARGE_LINE_WIDTH;
            }
        }
    }
    onGroupItemClick() {
        this.collapsed = !this.collapsed;
        this.fireDecoratorEvent("toggle");
    }
    get isGroupItem() {
        return true;
    }
    get _groupName() {
        return this.groupName;
    }
};
__decorate([
    property()
], TimelineGroupItem.prototype, "groupName", void 0);
__decorate([
    property({ type: Boolean })
], TimelineGroupItem.prototype, "collapsed", void 0);
__decorate([
    slot({ type: HTMLElement, individualSlots: true, "default": true })
], TimelineGroupItem.prototype, "items", void 0);
__decorate([
    property()
], TimelineGroupItem.prototype, "layout", void 0);
__decorate([
    property({ type: Boolean })
], TimelineGroupItem.prototype, "lastItem", void 0);
__decorate([
    property({ type: Boolean })
], TimelineGroupItem.prototype, "isNextItemGroup", void 0);
__decorate([
    property({ type: Boolean })
], TimelineGroupItem.prototype, "hidden", void 0);
__decorate([
    property({ type: Boolean })
], TimelineGroupItem.prototype, "firstItemInTimeline", void 0);
__decorate([
    property({ noAttribute: true })
], TimelineGroupItem.prototype, "forcedTabIndex", void 0);
TimelineGroupItem = __decorate([
    customElement({
        tag: "ui5-timeline-group-item",
        renderer: jsxRenderer,
        styles: TimelineGroupItemCss,
        template: TimelineGroupItemTemplate,
    })
    /**
     * Fired when the group item is expanded or collapsed.
     * @public
     */
    ,
    event("toggle", {
        bubbles: true,
    })
], TimelineGroupItem);
TimelineGroupItem.define();
export default TimelineGroupItem;
//# sourceMappingURL=TimelineGroupItem.js.map