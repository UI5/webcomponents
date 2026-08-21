import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type TimelineLayout from "./types/TimelineLayout.js";
import type { ITimelineItem } from "./Timeline.js";
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
@customElement({
	tag: "ui5-timeline-group-item",
	renderer: jsxRenderer,
	styles: TimelineGroupItemCss,
	template: TimelineGroupItemTemplate,
})
/**
 * Fired when the group item is expanded or collapsed.
 * @public
 */
@event("toggle", {
	bubbles: true,
})
class TimelineGroupItem extends UI5Element implements ITimelineItem {
	eventDetails!: {
		"toggle": void
	}
	/**
	 * Defines the text of the button that expands and collapses the group.
	 * @default undefined
	 * @public
	 */
	@property()
	groupName?: string;

	/**
	 * Determines if the group is collapsed or expanded.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	collapsed = false;

	/**
	 * Determines the content of the `ui5-timeline-group-item`.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: DefaultSlot<ITimelineItem>;

	/**
	 * Defines the items orientation.
	 * @default "Vertical"
	 * @private
	 */
	@property()
	layout: `${TimelineLayout}` = "Vertical";

	/**
	 * Applies to the last item in the group.
	 * @private
	 */
	@property({ type: Boolean })
	lastItem = false;

	/**
	 * Determines if the item afterwards is a group item.
	 * Intended for styling purposes.
	 * @private
	 */
	@property({ type: Boolean })
	isNextItemGroup = false;

	@property({ type: Boolean })
	hidden = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	firstItemInTimeline = false;

	@property({ noAttribute: true })
	forcedTabIndex = "-1";

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
			} else if (this.lastItem) {
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
			} else if (item.icon && items[i + 1] && !items[i + 1].icon) {
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
}

TimelineGroupItem.define();

export default TimelineGroupItem;
