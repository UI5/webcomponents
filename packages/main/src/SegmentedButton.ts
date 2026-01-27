import UI5Element, { type DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import {
	getEffectiveAriaLabelText,
	getAssociatedLabelForTexts,
	getEffectiveAriaDescriptionText,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import {
	isSpace,
	isEnter,
	isShift,
	isEscape,
	isSpaceShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { SEGMENTEDBUTTON_ARIA_DESCRIPTION, SEGMENTEDBUTTON_ARIA_DESCRIBEDBY } from "./generated/i18n/i18n-defaults.js";
import "./SegmentedButtonItem.js";
import type SegmentedButtonItem from "./SegmentedButtonItem.js";
import SegmentedButtonSelectionMode from "./types/SegmentedButtonSelectionMode.js";

// Template
import SegmentedButtonTemplate from "./SegmentedButtonTemplate.js";

// Styles
import SegmentedButtonCss from "./generated/themes/SegmentedButton.css.js";

/**
 * Interface for components that may be slotted inside `ui5-segmented-button` as items
 * @public
 */
interface ISegmentedButtonItem extends UI5Element, ITabbable {
	disabled: boolean,
	selected: boolean,
}

type SegmentedButtonSelectionChangeEventDetail = {
	selectedItems: Array<ISegmentedButtonItem>,
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-segmented-button` shows a group of items. When the user clicks or taps
 * one of the items, it stays in a pressed state. It automatically resizes the items
 * to fit proportionally within the component. When no width is set, the component uses the available width.
 *
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButton.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @public
 */
@customElement({
	tag: "ui5-segmented-button",
	languageAware: true,
	renderer: jsxRenderer,
	template: SegmentedButtonTemplate,
	styles: SegmentedButtonCss,
})
/**
 * Fired when the selected item changes.
 * @param {Array<ISegmentedButtonItem>} selectedItems an array of selected items. Since: 1.14.0
 * @public
 */
@event("selection-change", {
	bubbles: true,
})

class SegmentedButton extends UI5Element {
	eventDetails!: {
		"selection-change": SegmentedButtonSelectionChangeEventDetail,
	}
	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.3
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the IDs of the HTML Elements that label the component.
	 * @default undefined
	 * @public
	 * @since 2.15.0
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the accessible description of the component.
	 * @default undefined
	 * @public
	 * @since 2.15.0
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Defines the IDs of the HTML Elements that describe the component.
	 * @default undefined
	 * @public
	 * @since 2.15.0
	 */
	@property()
	accessibleDescriptionRef?: string;

	/**
	 * Defines the component selection mode.
	 * @default "Single"
	 * @public
	 * @since 1.14.0
	 */
	@property()
	selectionMode: `${SegmentedButtonSelectionMode}` = "Single";

	/**
	 * Determines whether the segmented button items should be sized to fit their content.
	 *
	 * If set to `true`, each item will be sized to fit its content, with any extra space distributed after the last item.
	 * If set to `false` (the default), all items will be equally sized to fill the available space.
	 *
	 * @default false
	 * @public
	 * @since 2.16.0
	*/
	@property({ type: Boolean })
	itemsFitContent: boolean = false;
	/**
	 * Defines the items of `ui5-segmented-button`.
	 *
	 * **Note:** Multiple items are allowed.
	 *
	 * **Note:** Use the `ui5-segmented-button-item` for the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: DefaultSlot<Array<ISegmentedButtonItem>>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_itemNavigation: ItemNavigation;

	hasPreviouslyFocusedItem: boolean;

	_selectedItem?: ISegmentedButtonItem;

	_cancelAction: boolean;
	_isSpacePressed: boolean;

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this.navigatableItems,
		});
		this.hasPreviouslyFocusedItem = false;
		this._cancelAction = false;
		this._isSpacePressed = false;
	}

	onBeforeRendering() {
		const items = this.getSlottedNodes<SegmentedButtonItem>("items");
		const visibleItems = items.filter(item => !item.hidden);
		let index = 1;

		items.forEach(item => {
			item.posInSet = item.hidden ? undefined : index++;
			item.sizeOfSet = item.hidden ? undefined : visibleItems.length;
		});

		this.normalizeSelection();

		if (!this.itemsFitContent) {
			this.style.setProperty(getScopedVarName("--_ui5_segmented_btn_items_count"), `${visibleItems.length}`);
		}
	}

	normalizeSelection() {
		if (!this.items.length) {
			return;
		}

		switch (this.selectionMode) {
		case SegmentedButtonSelectionMode.Single: {
			const selectedItems = this.selectedItems;
			const selectedItemIndex = this._selectedItem ? selectedItems.indexOf(this._selectedItem) : -1;
			if (this._selectedItem && selectedItems.length > 1) {
				selectedItems.splice(selectedItemIndex, 1);
			}
			const selectedItem = selectedItems.pop() || this.items[0];
			this._applySingleSelection(selectedItem);
			break;
		}
		default:
		}
	}

	getFocusDomRef(): HTMLElement | undefined {
		return this._itemNavigation._getCurrentItem();
	}

	_selectItem(e: MouseEvent | KeyboardEvent) {
		const target = e.target as SegmentedButtonItem;
		const isTargetSegmentedButtonItem = target.hasAttribute("ui5-segmented-button-item");

		if (target.disabled || target === this.getDomRef() || !isTargetSegmentedButtonItem) {
			return;
		}

		switch (this.selectionMode) {
		case SegmentedButtonSelectionMode.Multiple:
			if (e instanceof KeyboardEvent) {
				target.selected = !target.selected;
			}
			break;
		default:
			this._applySingleSelection(target);
		}

		this.fireDecoratorEvent("selection-change", {
			selectedItems: this.selectedItems,
		});

		this._itemNavigation.setCurrentItem(target);

		return this;
	}

	_applySingleSelection(item: ISegmentedButtonItem) {
		this.items.forEach(currentItem => {
			currentItem.selected = false;
		});
		item.selected = true;
		this._selectedItem = item;
	}

	_onclick(e: MouseEvent) {
		this._selectItem(e);
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this._selectItem(e); // Enter key behavior remains unaffected
		} else if (isSpace(e)) {
			e.preventDefault(); // Prevent scrolling
			this._isSpacePressed = true;
		} else if (isShift(e) || isEscape(e)) {
			this._cancelAction = true; // Set the flag to cancel the action
		}
	}

	_onkeyup(e: KeyboardEvent) {
		const isSpaceKey = isSpace(e);
		const isCancelKey = isShift(e) || isEscape(e);

		if (isSpaceKey || isSpaceShift(e)) {
			if (this._cancelAction) {
				this._cancelAction = false;
				this._isSpacePressed = false;
				e.preventDefault();
				return;
			}

			this._isSpacePressed = false;
		} else if (isCancelKey && !this._isSpacePressed) {
			this._cancelAction = false;
		}

		if (isSpaceKey) {
			this._selectItem(e);
		}
	}

	_onmousedown(e: MouseEvent) {
		const eventTarget = e.target as SegmentedButtonItem;
		const isTargetSegmentedButtonItem = eventTarget.hasAttribute("ui5-segmented-button-item");

		if (isTargetSegmentedButtonItem) {
			this._itemNavigation.setCurrentItem(eventTarget);
			this.hasPreviouslyFocusedItem = true;
		}
	}

	_onfocusin(e: FocusEvent) {
		// If the component was previously focused,
		// update the ItemNavigation to sync the button's tabindex values
		if (this.hasPreviouslyFocusedItem) {
			this._itemNavigation.setCurrentItem(e.target as SegmentedButtonItem);
			return;
		}

		// If the component is focused for the first time
		// focus the selected item if such is present
		if (this.selectedItems.length) {
			this._itemNavigation.setCurrentItem(this.selectedItems[0]);
			this.selectedItems[0].focus();
			this.hasPreviouslyFocusedItem = true;
		}
	}

	/**
	 * Returns an array of the currently selected items.
	 * @since 1.14.0
	 * @public
	 * @default []
	 */
	get selectedItems(): Array<ISegmentedButtonItem> {
		return this.items.filter(item => item.selected);
	}

	get navigatableItems() {
		return this.getSlottedNodes<SegmentedButtonItem>("items").filter(item => {
			return !item.disabled;
		});
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this) || undefined;
	}

	get ariaDescriptionText() {
		return `${(getEffectiveAriaDescriptionText(this) || "")} ${SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIBEDBY)}`.trim();
	}

	get ariaRoleDescription() {
		return SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIPTION);
	}
}

SegmentedButton.define();

export default SegmentedButton;
export type {
	SegmentedButtonSelectionChangeEventDetail,
	ISegmentedButtonItem,
};
