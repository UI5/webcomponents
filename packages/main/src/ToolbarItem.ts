import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { instanceOfUI5Element } from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	isLeft,
	isRight,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import ToolbarItemTemplate from "./ToolbarItemTemplate.js";
import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";
import ToolbarItemBase from "./ToolbarItemBase.js";
import type { ToolbarArrowNavState } from "./IToolbarArrowNavProvider.js";
import { isToolbarArrowNavProvider } from "./IToolbarArrowNavProvider.js";
import type { DefaultSlot } from "@ui5/webcomponents-base";

/**
 * Interface for the slotted item in `ui5-toolbar-item`.
 *
 * It could be any HTMLElement or UI5 Web Component with option to specify custom overflow closing events and overflow behavior.
 * Components that also implement `IToolbarArrowNavProvider` can report their internal navigation boundary
 * state to the toolbar for caret-aware arrow-key handling.
 *
 * @public
 * @since 2.20.0
 */
interface IToolbarItemContent extends HTMLElement {
	overflowCloseEvents?: string[];
	hasOverflow?: boolean;
}

interface IItemNavigationOwner extends HTMLElement {
	_itemNavigation?: {
		_getCurrentItem: () => HTMLElement | undefined;
	};
	_getFocusableItems?: () => Array<{ getFocusDomRef?: () => HTMLElement }>;
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
	_onMultiChildKeydownRef = this._onMultiChildKeydown.bind(this);

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
		if (this.item.length > 1) {
			this.addEventListener("keydown", this._onMultiChildKeydownRef, true);
		} else {
			this.removeEventListener("keydown", this._onMultiChildKeydownRef, true);
		}
	}

	onExitDOM(): void {
		this.detachCloseOverflowHandlers();
		this.removeEventListener("keydown", this._onMultiChildKeydownRef, true);
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

	get isInteractive(): boolean {
		return this._getNavigationTargets().some(target => this._isFocusable(target));
	}

	_isFocusable(el: HTMLElement): boolean {
		const target = this._resolveFocusableTarget(el);
		// A disabled control reports tabIndex 0 but isn't focusable.
		if ("disabled" in target && !!(target as { disabled?: boolean }).disabled) {
			return false;
		}
		// A bare <a> with no href reports tabIndex 0 but isn't focusable, UNLESS it
		// opts in via an explicit tabindex attribute (e.g. ui5-link rendered as a
		// button - <a role="button" tabindex="0"> with no href, used by the
		// Breadcrumbs overflow arrow).
		if (target.matches("a:not([href]):not([tabindex])")) {
			return false;
		}
		// tabIndex >= 0 covers focusable-by-default elements and explicit tabindex;
		// static content (div, span, ui5-text's focus ref) reports -1.
		return target.tabIndex >= 0;
	}

	_resolveFocusableTarget(el: HTMLElement): HTMLElement {
		// Drill through UI5 hosts that delegate focus (date-picker ->
		// datetime-input -> native input); each host reports tabIndex -1.
		let current: HTMLElement = el;
		const seen = new Set<HTMLElement>();
		while (instanceOfUI5Element(current) && !seen.has(current)) {
			seen.add(current);
			const next = current.getFocusDomRef();
			if (!next || next === current) {
				break;
			}
			current = next;
		}
		return current;
	}

	get hasOverflow(): boolean {
		return this.item[0]?.hasOverflow ?? false;
	}

	getFocusDomRef(): HTMLElement | undefined {
		const child = this.item[0];
		if (child) {
			return this._resolveChildFocusTarget(child);
		}

		return super.getFocusDomRef();
	}

	/**
	 * Resolves the element that should receive focus for a slotted child:
	 * the child's own focus DOM ref when it is a UI5 component, otherwise the
	 * first tabbable descendant, falling back to the child itself.
	 */
	_resolveChildFocusTarget(child: HTMLElement): HTMLElement {
		const withFocusRef = child as HTMLElement & { getFocusDomRef?: () => HTMLElement };
		if (typeof withFocusRef.getFocusDomRef === "function") {
			return withFocusRef.getFocusDomRef() || child;
		}

		return this._getFirstTabbableDescendant(child) || child;
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
			.map(child => this._resolveChildFocusTarget(child));
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

	_onMultiChildKeydown(e: KeyboardEvent) {
		const isForward = this.effectiveDir === "rtl" ? isLeft(e) : isRight(e);
		const isBackward = this.effectiveDir === "rtl" ? isRight(e) : isLeft(e);
		const isHomeKey = isHome(e);
		const isEndKey = isEnd(e);
		if (!isForward && !isBackward && !isHomeKey && !isEndKey) {
			return;
		}

		const { items, currentIndex } = this._getCurrentNavigationState();
		if (currentIndex === -1) {
			return;
		}

		// Home/End jump to the first/last child within the group.
		let nextIndex: number;
		if (isHomeKey) {
			nextIndex = 0;
		} else if (isEndKey) {
			nextIndex = items.length - 1;
		} else {
			nextIndex = isForward ? currentIndex + 1 : currentIndex - 1;
		}

		if (nextIndex === currentIndex || nextIndex < 0 || nextIndex >= items.length) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();
		this._handleNavigationTarget(items[nextIndex]);
	}

	getArrowNavState(): ToolbarArrowNavState | undefined {
		const child = this.item[0] as IToolbarItemContent | undefined;
		if (!child) {
			return undefined;
		}

		// Priority 1: ItemNavigation-based components (e.g. Breadcrumbs, SegmentedButton)
		const itemNavOwner = child as IItemNavigationOwner;
		if (typeof itemNavOwner._itemNavigation?._getCurrentItem === "function"
			&& typeof itemNavOwner._getFocusableItems === "function") {
			const items = itemNavOwner._getFocusableItems();
			const current = itemNavOwner._itemNavigation._getCurrentItem();
			const currentIndex = current
				? items.findIndex(item => (item.getFocusDomRef ? item.getFocusDomRef() : item) === current)
				: -1;
			if (currentIndex !== -1) {
				return {
					atLeftEnd: currentIndex === 0,
					atRightEnd: currentIndex === items.length - 1,
				};
			}
		}

		// Priority 2: IToolbarArrowNavProvider interface (e.g. Input)
		if (isToolbarArrowNavProvider(child)) {
			return child.getArrowNavState();
		}

		// Priority 3: proprietary multi-child fallback (e.g. bare checkbox group)
		if (this.item.length <= 1) {
			return undefined;
		}

		const { items, currentIndex } = this._getCurrentNavigationState();
		if (currentIndex === -1) {
			return undefined;
		}

		return {
			atLeftEnd: currentIndex === 0,
			atRightEnd: currentIndex === items.length - 1,
		};
	}

	focusForToolbarNavigation(isForward: boolean) {
		const target = this.getFocusDomRefForNavigation(isForward);
		target?.focus();
	}
}

export type {
	IToolbarItemContent,
};
ToolbarItem.define();

export default ToolbarItem;
