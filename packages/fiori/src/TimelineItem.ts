import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type Link from "@ui5/webcomponents/dist/Link.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITimelineItem } from "./Timeline.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import TimelineItemTemplate from "./TimelineItemTemplate.js";
// Styles
import type TimelineLayout from "./types/TimelineLayout.js";

import {
	TIMELINE_ITEM_INFORMATION_STATE_TEXT,
	TIMELINE_ITEM_POSITIVE_STATE_TEXT,
	TIMELINE_ITEM_NEGATIVE_STATE_TEXT,
	TIMELINE_ITEM_CRITICAL_STATE_TEXT,
} from "./generated/i18n/i18n-defaults.js";

import TimelineItemCss from "./generated/themes/TimelineItem.css.js";

type TimelineItemRole = "listitem" | "treeitem";

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
@customElement({
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
@event("name-click", {
	bubbles: true,
})
class TimelineItem extends UI5Element implements ITimelineItem {
	eventDetails!: {
		"name-click": void
	}
	/**
	 * Defines the icon to be displayed as graphical element within the `ui5-timeline-item`.
	 * SAP-icons font provides numerous options.
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines the name of the item, displayed before the `title-text`.
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Defines if the `name` is clickable.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	nameClickable = false;

	/**
	 * Defines the title text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	titleText?: string;

	/**
	 * Defines the subtitle text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	subtitleText?: string;

	/**
	 * Defines the state of the icon displayed in the `ui5-timeline-item`.
	 * @default "None"
	 * @public
	 * @since 2.7.0
	 */
	@property()
	state: `${ValueState}` = "None";

	/**
	 * Defines the content of the `ui5-timeline-item`.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: DefaultSlot<Node[]>;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	firstItemInTimeline = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	isNextItemGroup = false;

	@property({ noAttribute: true })
	forcedTabIndex = "-1";

	/**
	 * Defines the items orientation.
	 * @default "Vertical"
	 * @private
	 */
	@property()
	layout: `${TimelineLayout}` = "Vertical";

	/**
	 * Defines the indicator line width.
	 * @private
	 */
	@property({ noAttribute: true })
	forcedLineWidth?: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	hideBubble = false;

	/**
	 * Marks the last `<ui5-timeline-item>`
	 * @private
	 */
	@property({ type: Boolean })
	lastItem = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	hidden = false;

	/**
	 * @private
	 */
	@property({ noAttribute: true })
	effectiveRole: `${TimelineItemRole}` = "listitem";

	/**
	 * Defines the position of the item in a group.
	 * @private
	 */
	@property({ type: Number })
	positionInGroup?: number;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundleFiori: I18nBundle;

	constructor() {
		super();
	}

	onNamePress() {
		this.fireDecoratorEvent("name-click");
	}

	/**
	 * Focus the internal link.
	 */
	focusLink() {
		this.shadowRoot!.querySelector<Link>("[ui5-link]")?.focus();
	}

	static typeTextMappings(): Record<string, I18nText> {
		return {
			"Information": TIMELINE_ITEM_INFORMATION_STATE_TEXT,
			"Positive": TIMELINE_ITEM_POSITIVE_STATE_TEXT,
			"Negative": TIMELINE_ITEM_NEGATIVE_STATE_TEXT,
			"Critical": TIMELINE_ITEM_CRITICAL_STATE_TEXT,
		};
	}

	get timelineItemStateText() {
		return this.state !== "None" ? TimelineItem.i18nBundleFiori.getText(TimelineItem.typeTextMappings()[this.state]) : undefined;
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
}

TimelineItem.define();

export default TimelineItem;
