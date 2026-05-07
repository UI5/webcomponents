import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import {
	isLeft,
	isRight,
	isUp,
	isDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import ToolbarItemTemplate from "./ToolbarItemTemplate.js";
import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";
import ToolbarItemBase from "./ToolbarItemBase.js";
import RadioButtonGroup from "./RadioButtonGroup.js";
import type RadioButton from "./RadioButton.js";
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
	handlesOwnKeyboardNavigation = true;
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
		const hostTarget = this._resolveNavigationHost(target);

		if (hostTarget.tagName === "UI5-RADIO-BUTTON") {
			const radio = hostTarget as HTMLElement & {
				disabled?: boolean;
				readonly?: boolean;
				checked?: boolean;
				name?: string;
				click: () => void;
			};

			if (!radio.disabled && !radio.readonly && !radio.checked) {
				if (radio.name) {
					RadioButtonGroup.selectItem(radio as unknown as RadioButton, radio.name);
					return;
				}

				radio.click();
				return;
			}
		}

		hostTarget.focus();
	}

	_resolveNavigationHost(target: HTMLElement): HTMLElement {
		if (target.tagName.startsWith("UI5-")) {
			return target;
		}

		const root = target.getRootNode();
		if (root instanceof ShadowRoot && root.host instanceof HTMLElement) {
			return root.host;
		}

		return target;
	}

	_matchesNavigationTarget(target: HTMLElement, candidate: HTMLElement): boolean {
		if (target === candidate || target.contains(candidate) || !!target.shadowRoot?.contains(candidate)) {
			return true;
		}

		const host = this._resolveNavigationHost(candidate);
		return target === host || target.contains(host) || !!target.shadowRoot?.contains(host);
	}

	_getEventOriginIndex(e: KeyboardEvent, targets: HTMLElement[]): number {
		return e.composedPath()
			.filter((node): node is HTMLElement => node instanceof HTMLElement)
			.reduce((foundIdx, node) => {
				if (foundIdx !== -1) {
					return foundIdx;
				}

				return targets.findIndex(target => this._matchesNavigationTarget(target, node));
			}, -1);
	}

	_isRadioGroupTargets(targets: HTMLElement[]) {
		return targets.length > 1 && targets.every(target => this._resolveNavigationHost(target).tagName === "UI5-RADIO-BUTTON");
	}

	_restoreRadioBoundarySelection(targets: HTMLElement[], isForward: boolean) {
		const edgeTarget = isForward ? targets[targets.length - 1] : targets[0];
		this._handleNavigationTarget(edgeTarget);
	}

	handleNavigationEntry(forward: boolean) {
		const target = this.getFocusDomRefForNavigation(forward);
		if (!target) {
			return;
		}

		this._handleNavigationTarget(target);
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

	shouldHandleOwnKeyboardNavigation(e: KeyboardEvent): boolean {
		const targets = this._getNavigationTargets();
		if (targets.length <= 1) {
			if (!e.defaultPrevented) {
				return false;
			}

			const active = getActiveElement() as HTMLElement | null;
			const origin = e.composedPath().find((node): node is HTMLElement => node instanceof HTMLElement);
			const singleTarget = targets[0];

			if (!active || !origin) {
				return true;
			}

			const activeInsideTarget = this._matchesNavigationTarget(singleTarget, active);
			const originInsideTarget = this._matchesNavigationTarget(singleTarget, origin);

			if (activeInsideTarget && originInsideTarget) {
				const activeHost = this._resolveNavigationHost(active);
				const originHost = this._resolveNavigationHost(origin);

				// Single-child control kept focus on the same focusable part => boundary reached,
				// let the toolbar continue navigation to the next/previous item.
				if (activeHost === originHost) {
					return false;
				}
			}

			return true;
		}

		const active = getActiveElement() as HTMLElement | null;
		if (!active) {
			return false;
		}

		const currentIndex = targets.findIndex(target => this._matchesNavigationTarget(target, active));

		if (currentIndex === -1) {
			return false;
		}

		const isRTL = this.effectiveDir === "rtl";
		const isForward = isDown(e) || (!isRTL && isRight(e)) || (isRTL && isLeft(e));
		const isBackward = isUp(e) || (!isRTL && isLeft(e)) || (isRTL && isRight(e));

		if (!isForward && !isBackward) {
			return false;
		}

		const isRadioGroup = this._isRadioGroupTargets(targets);
		const nextIndex = isForward ? currentIndex + 1 : currentIndex - 1;

		if (isRadioGroup && e.defaultPrevented) {
			const originIndex = this._getEventOriginIndex(e, targets);
			const wrappedForward = originIndex === targets.length - 1 && currentIndex === 0;
			const wrappedBackward = originIndex === 0 && currentIndex === targets.length - 1;
			const isForwardBoundary = isForward && wrappedForward;
			const isBackwardBoundary = isBackward && wrappedBackward;
			const unknownOriginBoundary = originIndex === -1 && (nextIndex < 0 || nextIndex >= targets.length);

			if (isForwardBoundary || isBackwardBoundary || unknownOriginBoundary) {
				this._restoreRadioBoundarySelection(targets, isForward);
				return false;
			}

			// RadioButton already handled in-group navigation for this arrow.
			return true;
		}

		if (nextIndex < 0 || nextIndex >= targets.length) {
			return false;
		}

		e.preventDefault();
		this._handleNavigationTarget(targets[nextIndex]);
		return true;
	}
}

export type {
	IToolbarItemContent,
};
ToolbarItem.define();

export default ToolbarItem;
