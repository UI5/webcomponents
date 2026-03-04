import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";
import ToolbarItemTemplate from "./ToolbarItemTemplate.js";
import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";
import ToolbarItemBase from "./ToolbarItemBase.js";
import type { IToolbarItem } from "./ToolbarItemBase.js";
import type { DefaultSlot } from "@ui5/webcomponents-base";

interface IOverflowToolbarItem extends HTMLElement {
	overflowCloseEvents?: string[] | undefined;
	hasOverflow?: boolean | undefined;
}

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-item` is a wrapper component used to integrate UI5 Web Components into the `ui5-toolbar`.
 * It renders within the toolbar's shadow DOM and manages the lifecycle
 * and overflow behavior of its child component.
 *
 * ### Structure
 * The toolbar item wraps a single UI5 Web Component (such as CheckBox, Title, etc.) and handles:
 * - Overflow management (determining if the item should be displayed in the main toolbar or overflow popover)
 * - Automatic popover closing on interaction
 * - CSS custom state exposure for styling based on overflow state
 *
 * ### Usage
 * The `ui5-toolbar-item` is typically used implicitly when adding components to a toolbar,
 * but specialized wrappers like `ui5-toolbar-button` provide
 * component-specific functionality and should be preferred when available.
 *
 * @constructor
 * @extends ToolbarItemBase
 * @public
 * @since 2.20.0
 */
@customElement({
	tag: "ui5-toolbar-item",
	languageAware: true,
	renderer: jsxRenderer,
	template: ToolbarItemTemplate,
	styles: ToolbarItemCss,
})
/**
 * Fired when the overflow popover is closed.
 * @public
 * @since 2.20.0
 */
@event("close-overflow", {
	bubbles: true,
	cancelable: true,
})
class ToolbarItem extends ToolbarItemBase implements IToolbarItem {
	eventDetails!: {
		"close-overflow": void;
	}

	/**
	* Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
	* the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
	* @private
	* @default "Default"
	*/
	@property()
	overflowPriority: `${ToolbarItemOverflowBehavior}` = "Default";

	/**
	 * Defines if the toolbar overflow popup should close upon interaction with the item.
	 * It will close by default.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	preventOverflowClosing = false;

	_maxWidth = 0;
	_wrapperChecked = false;
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

	onExitDOM(): void {
		this.detachCloseOverflowHandlers();
	}

	/**
	 * Wrapped component slot.
	 * @public
	 * @since 2.20.0
	 */

	@slot({
		"default": true, type: HTMLElement, invalidateOnChildChange: true,
	})
	item!: DefaultSlot<HTMLElement>;

	// Method called by ui5-toolbar to inform about the existing toolbar wrapper
	checkForWrapper() {
		if (this._wrapperChecked) {
			return;
		}
		this._wrapperChecked = true;

		const tagName = this.itemTagName as keyof typeof this.predefinedWrapperSet;
		const ctor = this.constructor as typeof ToolbarItem;
		const wrapperName = ctor?.getMetadata ? ctor.getMetadata().getPureTag() : this.tagName;
		if (wrapperName === "ui5-toolbar-item"
			&& this.predefinedWrapperSet[tagName]) {
			// eslint-disable-next-line no-console
			console.warn(`This UI5 web component has its predefined toolbar wrapper called ${this.predefinedWrapperSet[tagName]}.`);
		}
	}

	// We want to close the overflow popover, when closing event is being executed
	getClosingEvents(): string[] {
		const item = (Array.isArray(this.item) ? this.item[0] : this.item) as IOverflowToolbarItem;

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

	get itemTagName() {
		const ctor = this.getSlottedNodes<IOverflowToolbarItem>("item")[0]?.constructor as typeof ToolbarItem;
		return ctor?.getMetadata ? ctor.getMetadata().getPureTag() : this.getSlottedNodes<IOverflowToolbarItem>("item")[0]?.tagName;
	}

	get hasOverflow(): boolean {
		return (this.item[0] as IOverflowToolbarItem)?.hasOverflow ?? false;
	}
}

export type {
	IOverflowToolbarItem,
};
ToolbarItem.define();

export default ToolbarItem;
