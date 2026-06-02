import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import ToolbarItemTemplate from "./ToolbarItemTemplate.js";
import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";
import ToolbarItemBase from "./ToolbarItemBase.js";
import type { ToolbarMovementInfo } from "./ToolbarItemBase.js";
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
	getToolbarMovementInfo?: () => ToolbarMovementInfo | undefined;
}

interface IItemNavigationOwner extends HTMLElement {
	_itemNavigation?: {
		_getCurrentItem: () => unknown;
	};
	_getFocusableItems?: () => Array<unknown>;
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
	_lastFocusedNavigationTarget?: HTMLElement;
	fireCloseOverflowRef = this.fireCloseOverflow.bind(this);

	get handlesOwnKeyboardNavigation(): boolean {
		const child = this.item[0] as IToolbarItemContent | undefined;
		if (!child) {
			return false;
		}

		return this._supportsItemNavigationMovementInfo(child)
			|| typeof child.getToolbarMovementInfo === "function"
			|| this._hasOwnToolbarMovementInfo();
	}

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

		if (child) {
			return this._getFirstTabbableDescendant(child) || child;
		}

		return super.getFocusDomRef();
	}

	_getFirstTabbableDescendant(root: HTMLElement): HTMLElement | null {
		return root.querySelector<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])");
	}

	getFocusDomRefForNavigation(forward: boolean): HTMLElement | undefined {
		const targets = this._getNavigationTargets();
		if (!targets.length) {
			return this.getFocusDomRef();
		}

		return forward ? targets[0] : targets[targets.length - 1];
	}

	_handleNavigationTarget(target: HTMLElement) {
		this._lastFocusedNavigationTarget = target;
		const hostTarget = this._resolveNavigationHost(target);

		if (this._isRadioButtonHost(hostTarget)) {
			const radio = hostTarget as HTMLElement & {
				disabled?: boolean;
				readonly?: boolean;
				checked?: boolean;
				click: () => void;
			};

			hostTarget.focus();

			if (!radio.disabled && !radio.readonly && !radio.checked) {
				radio.click();
			}

			return;
		}

		hostTarget.focus();
	}

	_resolveNavigationHost(target: HTMLElement): HTMLElement {
		if (this._isUI5Host(target)) {
			return target;
		}

		const root = target.getRootNode();
		if (root instanceof ShadowRoot && root.host instanceof HTMLElement) {
			return root.host;
		}

		return target;
	}

	_isUI5Host(target: HTMLElement): boolean {
		const ctor = target.constructor as { getMetadata?: () => unknown };
		return typeof ctor.getMetadata === "function";
	}

	_isRadioButtonHost(target: HTMLElement): boolean {
		return target.hasAttribute("ui5-radio-button");
	}

	_matchesNavigationTarget(target: HTMLElement, candidate: HTMLElement): boolean {
		if (target === candidate || target.contains(candidate) || !!target.shadowRoot?.contains(candidate)) {
			return true;
		}

		const host = this._resolveNavigationHost(candidate);
		return target === host || target.contains(host) || !!target.shadowRoot?.contains(host);
	}

	_getNavigationTargets(): HTMLElement[] {
		return this.item
			.filter(child => !("disabled" in child && !!(child as { disabled?: boolean }).disabled))
			.map(child => {
				if (typeof (child as HTMLElement & { getFocusDomRef?: () => HTMLElement }).getFocusDomRef === "function") {
					return (child as HTMLElement & { getFocusDomRef: () => HTMLElement }).getFocusDomRef() || child;
				}

				return this._getFirstTabbableDescendant(child) || child;
			});
	}

	_getCurrentNavigationState() {
		const items = this._getNavigationTargets();
		const active = getActiveElement() as HTMLElement | null;
		const current = active
			? items.find(item => this._matchesNavigationTarget(item, active))
			: undefined;
		const currentIndex = current ? items.indexOf(current) : -1;

		return {
			items,
			current,
			currentIndex,
		};
	}

	_supportsItemNavigationMovementInfo(child: IToolbarItemContent): boolean {
		const itemNavigationOwner = child as IItemNavigationOwner;
		return typeof itemNavigationOwner._itemNavigation?._getCurrentItem === "function"
			&& typeof itemNavigationOwner._getFocusableItems === "function";
	}

	_getItemNavigationMovementInfo(child: IToolbarItemContent): ToolbarMovementInfo | undefined {
		if (!this._supportsItemNavigationMovementInfo(child)) {
			return undefined;
		}

		const itemNavigationOwner = child as IItemNavigationOwner;
		const items = itemNavigationOwner._getFocusableItems!();
		const current = itemNavigationOwner._itemNavigation!._getCurrentItem();
		const currentIndex = current ? items.indexOf(current) : -1;

		if (currentIndex === -1) {
			return undefined;
		}

		return {
			currentIndex,
			itemCount: items.length,
		};
	}

	_hasOwnToolbarMovementInfo(): boolean {
		return this._getNavigationTargets().length > 1;
	}

	_getOwnToolbarMovementInfo(): ToolbarMovementInfo | undefined {
		const { items, currentIndex } = this._getCurrentNavigationState();
		if (items.length <= 1) {
			return undefined;
		}

		if (currentIndex === -1) {
			return undefined;
		}

		return {
			currentIndex,
			itemCount: items.length,
		};
	}

	_isUsingOwnFallbackMovementInfo(): boolean {
		const child = this.item[0] as IToolbarItemContent | undefined;
		if (!child) {
			return false;
		}

		return !this._supportsItemNavigationMovementInfo(child)
			&& typeof child.getToolbarMovementInfo !== "function"
			&& this._hasOwnToolbarMovementInfo();
	}

	moveWithinToolbarItem(isForward: boolean): boolean {
		if (!this._isUsingOwnFallbackMovementInfo()) {
			return false;
		}

		const { items, currentIndex } = this._getCurrentNavigationState();

		if (currentIndex === -1) {
			return false;
		}

		const nextIndex = isForward ? currentIndex + 1 : currentIndex - 1;
		if (nextIndex < 0 || nextIndex >= items.length) {
			return false;
		}

		this._handleNavigationTarget(items[nextIndex]);
		return true;
	}

	getToolbarMovementInfo(): ToolbarMovementInfo | undefined {
		const child = this.item[0] as IToolbarItemContent | undefined;
		if (!child) {
			return undefined;
		}

		const itemNavigationInfo = this._getItemNavigationMovementInfo(child);
		if (itemNavigationInfo) {
			return itemNavigationInfo;
		}

		if (typeof child.getToolbarMovementInfo === "function") {
			return child.getToolbarMovementInfo();
		}

		return this._getOwnToolbarMovementInfo();
	}

	setToolbarForcedTabIndex(tabIndex: string) {
		this.forcedTabIndex = tabIndex;

		const { items, current } = this._getCurrentNavigationState();
		if (!items.length) {
			super.setToolbarForcedTabIndex(tabIndex);
			return;
		}

		if (current) {
			this._lastFocusedNavigationTarget = current;
		}

		const fallbackTarget = items[0];
		const focusTarget = this._lastFocusedNavigationTarget && items.includes(this._lastFocusedNavigationTarget)
			? this._lastFocusedNavigationTarget
			: fallbackTarget;

		items.forEach(target => {
			target.tabIndex = tabIndex === "0" && target === focusTarget ? 0 : -1;
		});
	}

	focusForToolbarNavigation(isForward: boolean) {
		const target = this.getFocusDomRefForNavigation(isForward);
		if (target) {
			this._lastFocusedNavigationTarget = target;
			target.focus();
		}
	}
}

export type {
	IToolbarItemContent,
};
ToolbarItem.define();

export default ToolbarItem;
