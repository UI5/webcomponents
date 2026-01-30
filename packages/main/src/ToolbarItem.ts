import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarItemTemplate from "./ToolbarItemTemplate.js";
import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";
import type ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

type IEventOptions = {
	preventClosing: boolean;
}

type ToolbarItemEventDetail = {
	targetRef: HTMLElement;
}

interface IOverflowToolbarItem extends HTMLElement {
	overflowCloseEvents?: string[] | undefined;
	hasOverflow?: boolean | undefined;
}
/**
 * Fired when the overflow popover is closed.
 * @public
 * @since 1.17.0
 */
@event("close-overflow", {
	bubbles: true,
	cancelable: true,
})

@customElement({
	tag: "ui5-toolbar-item",
	languageAware: true,
	renderer: jsxRenderer,
	template: ToolbarItemTemplate,
	styles: ToolbarItemCss,
})

/**
 * @class
 *
 * Represents an abstract class for items, used in the `ui5-toolbar`.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
class ToolbarItem extends UI5Element {
	// strictEvents: needed for parent class
	eventDetails!: {
		click: ToolbarItemEventDetail,
		"close-overflow": void;
	}
	/**
	 * Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
	 * the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
	 * @public
	 * @default "Default"
	 */
	@property()
	overflowPriority: `${ToolbarItemOverflowBehavior}` = "Default";

	/**
	 * Defines if the toolbar overflow popup should close upon intereaction with the item.
	 * It will close by default.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	preventOverflowClosing = false;

	/**
	 * Defines if the toolbar item is overflowed.
	 * @default false
	 * @protected
	 * @since 2.11.0
	 */

	@property({ type: Boolean })
	isOverflowed: boolean = false;

	_isRendering = true;
	_maxWidth = 0;
	fireCloseOverflowRef = this.fireCloseOverflow.bind(this);

	closeOverflowSet = {
		"ui5-button": ["click"],
		"ui5-select": ["change"],
		"ui5-combobox": ["change"],
		"ui5-multi-combobox": ["selection-change"],
		"ui5-date-picker": ["change"],
		"ui5-switch": ["change"],
	}

	predefinedWrapperSet = {
		"ui5-button": "ToolbarButton",
		"ui5-select": "ToolbarSelect",
	}

	onBeforeRendering(): void {
		this.checkForWrapper();
		this.attachCloseOverflowHandlers();
	}

	onAfterRendering(): void {
		this._isRendering = false;
	}

	onExitDOM(): void {
		this.detachCloseOverflowHandlers();
	}

	/**
	 * Wrapped component slot.
	 * @public
	 * @since 2.19.0
	 */

	@slot({
		"default": true, type: HTMLElement, invalidateOnChildChange: true,
	})
	item!: IOverflowToolbarItem[];

	// Method called by ui5-toolbar to inform about the existing toolbar wrapper
	checkForWrapper() {
		const tagName = this.itemTagName as keyof typeof this.predefinedWrapperSet;
		const ctor = this.constructor as typeof UI5Element;
		const wrapperName = ctor?.getMetadata ? ctor.getMetadata().getPureTag() : this.tagName;
		if (wrapperName === "ui5-toolbar-item"
			&& this.predefinedWrapperSet[tagName]) {
			// eslint-disable-next-line no-console
			console.warn(`This UI5 web component has its predefined toolbar wrapper called ${this.predefinedWrapperSet[tagName]}.`);
		}
	}

	// We want to close the overflow popover, when closing event is being executed
	getClosingEvents(): string[] {
		const item = Array.isArray(this.item) ? this.item[0] : this.item;

		const closeEvents = this.closeOverflowSet[this.itemTagName as keyof typeof this.closeOverflowSet] || [];
		if (!item) {
			return [...closeEvents];
		}
		const overflowCloseEvents = Array.isArray(item.overflowCloseEvents) ? item.overflowCloseEvents : [];

		return [...closeEvents, ...overflowCloseEvents];
	}

	attachCloseOverflowHandlers() {
		const closingEvents = this.getClosingEvents();
		closingEvents.forEach(clEvent => {
			if (!this.preventOverflowClosing) {
				this.addEventListener(clEvent, this.fireCloseOverflowRef);
			}
		});
	}

	detachCloseOverflowHandlers() {
		const closingEvents = this.getClosingEvents();
		closingEvents.forEach(clEvent => {
			this.removeEventListener(clEvent, this.fireCloseOverflowRef);
		});
	}

	fireCloseOverflow() {
		this.fireDecoratorEvent("close-overflow");
	}
	/**
	* Defines if the width of the item should be ignored in calculating the whole width of the toolbar
	* @protected
	*/
	get ignoreSpace(): boolean {
		return false;
	}

	/**
	 * Returns if the item is flexible. An item that is returning true for this property will make
	 * the toolbar expand to fill the 100% width of its container.
	 * @protected
	 */
	get hasFlexibleWidth(): boolean {
		return false;
	}

	/**
	 * Returns if the item is interactive.
	 * This value is used to determinate if the toolbar should have its accessibility role and attributes set.
	 * At least two interactive items are needed for the toolbar to have the role="toolbar" attribute set.
	 * @protected
	 */
	get isInteractive(): boolean {
		return true;
	}

	get itemTagName() {
		const ctor = this.getSlottedNodes<IOverflowToolbarItem>("item")[0]?.constructor as typeof UI5Element;
		return ctor?.getMetadata ? ctor.getMetadata().getPureTag() : this.getSlottedNodes<IOverflowToolbarItem>("item")[0]?.tagName;
	}

	get hasOverflow(): boolean {
		return this.item[0]?.hasOverflow ?? false;
	}

	/**
	 * Returns if the item is separator.
	 * @protected
	 */
	get isSeparator() {
		return false;
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	get classes() {
		return {
			root: {
				"ui5-tb-popover-item": this.isOverflowed,
				"ui5-tb-item": true,
			},
		};
	}
}

export type {
	IEventOptions,
	ToolbarItemEventDetail,
	IOverflowToolbarItem,
};
ToolbarItem.define();

export default ToolbarItem;
