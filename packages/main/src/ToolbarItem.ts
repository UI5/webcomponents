import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarItemTemplate from "./ToolbarItemTemplate.js";
import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";
import ToolbarItemBase from "./ToolbarItemBase.js";
import type { DefaultSlot } from "@ui5/webcomponents-base";

/**
 * Interface for the slotted item in `ui5-toolbar-item`.
 *
 * It could be any HTMLElement or UI5 Web Component with option to specify custom overflow closing events and overflow behavior.
 *
 * @public
 * @since 2.20.0
 */
interface IToolbarItemContent extends HTMLElement {
	overflowCloseEvents?: string[];
	hasOverflow?: boolean;
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
class ToolbarItem extends ToolbarItemBase {
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
	item!: DefaultSlot<IToolbarItemContent>;

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
		const item = this.item[0];

		const closeEvents = this.closeOverflowSet[this.itemTagName as keyof typeof this.closeOverflowSet] || [];
		if (!item) {
			return [...closeEvents];
		}
		const overflowCloseEvents = item.overflowCloseEvents ? item.overflowCloseEvents : [];

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
		const ctor = this.getSlottedNodes<IToolbarItemContent>("item")[0]?.constructor as typeof ToolbarItem;
		return ctor?.getMetadata ? ctor.getMetadata().getPureTag() : this.getSlottedNodes<IToolbarItemContent>("item")[0]?.tagName;
	}

	get hasOverflow(): boolean {
		return this.item[0]?.hasOverflow ?? false;
	}

	getFocusDomRef(): HTMLElement | undefined {
		const child = this.item[0];
		if (child && typeof (child as HTMLElement & { getFocusDomRef?: () => HTMLElement }).getFocusDomRef === "function") {
			return (child as HTMLElement & { getFocusDomRef: () => HTMLElement }).getFocusDomRef() || child;
		}
		return child || super.getFocusDomRef();
	}
}

export type {
	IToolbarItemContent,
};
ToolbarItem.define();

export default ToolbarItem;
