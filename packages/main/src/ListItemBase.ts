import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import {
	isEnter,
	isSpace,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

// Styles
import styles from "./generated/themes/ListItemBase.css.js";
import draggableElementStyles from "./generated/themes/DraggableElement.css.js";

type ListItemBasePressEventDetail = {
	item: ListItemBase,
	selected?: boolean,
	key?: string,
}

/**
 * @class
 * A class to serve as a foundation
 * for the `ListItem` and `ListItemGroupHeader` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
@customElement({
	renderer: jsxRenderer,
	styles: [styles, draggableElementStyles],
})
@event("request-tabindex-change", {
	bubbles: true,
})
@event("_press", {
	bubbles: true,
})
@event("_focused", {
	bubbles: true,
})
@event("forward-after", {
	bubbles: true,
	cancelable: true,
})
@event("forward-before", {
	bubbles: true,
})
class ListItemBase extends UI5Element implements ITabbable {
	eventDetails!: {
		"request-tabindex-change": FocusEvent,
		"_press": ListItemBasePressEventDetail,
		"_focused": FocusEvent,
		"forward-after": void,
		"forward-before": void,
	}
	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines whether the item is movable.
	 * @default false
	 * @private
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	movable = false;

	/**
	* Defines if the list item should display its bottom border.
	* @private
	*/
	@property({ type: Boolean })
	hasBorder = false;

	@property()
	forcedTabIndex?: string;

	/**
	* Defines whether `ui5-li` is in disabled state.
	*
	* **Note:** A disabled `ui5-li` is noninteractive.
	* @default false
	* @protected
	* @since 1.0.0-rc.12
	*/
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Indicates if the element is on focus
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * Indicates if the list item is actionable, e.g has hover and pressed effects.
	 * @private
	 */
	@property({ type: Boolean })
	actionable = false;

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	onBeforeRendering(): void {
		this.actionable = true;
	}

	_onfocusin(e: FocusEvent) {
		this.fireDecoratorEvent("request-tabindex-change", e);
		if (e.target !== this.getFocusDomRef()) {
			return;
		}

		this.fireDecoratorEvent("_focused", e);
	}

	_onkeydown(e: KeyboardEvent) {
		if (isTabNext(e)) {
			return this._handleTabNext(e);
		}

		if (isTabPrevious(e)) {
			return this._handleTabPrevious(e);
		}

		if (this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}

		if (this._isSpace(e)) {
			e.preventDefault();
		}

		if (this._isEnter(e)) {
			this.fireItemPress(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}
		if (this._isSpace(e)) {
			this.fireItemPress(e);
		}
	}

	_onclick(e: MouseEvent) {
		if (this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}
		this.fireItemPress(e);
	}

	/**
	 * Override from subcomponent, if needed
	 */
	_isSpace(e: KeyboardEvent) {
		return isSpace(e);
	}

	/**
	 * Override from subcomponent, if needed
	 */
	_isEnter(e: KeyboardEvent) {
		return isEnter(e);
	}

	fireItemPress(e: Event) {
		if (this.disabled || !this._pressable) {
			return;
		}
		if (isEnter(e as KeyboardEvent)) {
			e.preventDefault();
		}
		this.fireDecoratorEvent("_press", { item: this, selected: this.selected, key: (e as KeyboardEvent).key });
	}

	_handleTabNext(e: KeyboardEvent) {
		if (this.shouldForwardTabAfter()) {
			if (!this.fireDecoratorEvent("forward-after")) {
				e.preventDefault();
			}
		}
	}

	_handleTabPrevious(e: KeyboardEvent) {
		const target = e.target as HTMLElement;

		if (this.shouldForwardTabBefore(target)) {
			this.fireDecoratorEvent("forward-before");
		}
	}

	/**
	 * Determines if th current list item either has no tabbable content or
	 * [Tab] is performed onto the last tabbale content item.
	 */
	shouldForwardTabAfter() {
		const aContent = getTabbableElements(this.getFocusDomRef()!);

		return aContent.length === 0 || (aContent[aContent.length - 1] === getActiveElement());
	}

	/**
	 * Determines if the current list item is target of [SHIFT+TAB].
	 */
	shouldForwardTabBefore(target: HTMLElement) {
		return this.getFocusDomRef() === target;
	}

	get classes(): ClassMap {
		return {
			main: {
				"ui5-li-root": true,
				"ui5-li--focusable": this._focusable,
			},
		};
	}

	get _ariaDisabled() {
		return this.disabled ? true : undefined;
	}

	get _focusable() {
		return !this.disabled;
	}

	get _pressable() {
		return true;
	}

	get hasConfigurableMode() {
		return false;
	}

	get _effectiveTabIndex() {
		if (!this._focusable) {
			return -1;
		}
		if (this.selected) {
			return 0;
		}
		return this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined;
	}

	get isListItemBase() {
		return true;
	}
}

export default ListItemBase;

export type {
	ListItemBasePressEventDetail,
};
