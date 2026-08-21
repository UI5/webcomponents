import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import SearchItemTemplate from "./SearchItemTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import {
	SEARCH_ITEM_DELETE_BUTTON_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import {
	isSpace,
	isEnter,
	isF2,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
// @ts-expect-error
import encodeXML from "@ui5/webcomponents-base/dist/sap/base/security/encodeXML.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search-item` is a list item, used for displaying search suggestions
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SearchItem.js";`
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @since 2.9.0
 * @experimental
 */
@customElement({
	tag: "ui5-search-item",
	languageAware: true,
	renderer: jsxRenderer,
	template: SearchItemTemplate,
	styles: [
		ListItemBase.styles,
		SearchItemCss,
	],
})

/**
 * Fired when delete button is pressed.
 *
 * @public
 */
@event("delete")

class SearchItem extends ListItemBase {
	eventDetails!: ListItemBase["eventDetails"] & {
		"delete": void,
	};
	/**
	 * Defines the heading text of the search item.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the description that appears right under the item text, if available.
	 * @default undefined
	 * @public
	 * @since 2.12.0
	 */
	@property()
	description?: string;

	/**
	 * Defines the icon name of the search item.
	 * **Note:** If provided, the image slot will be ignored.
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether the search item is selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines whether the search item is deletable.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	deletable = false;

	/**
	 * Defines the scope of the search item
	 * @default undefined
	 * @public
	 */
	@property()
	scopeName?: string;

	@property()
	highlightText = "";

	/**
	 * **Note:** While the slot allows the option of setting a custom avatar, to comply with the
	 * design guidelines, use the `ui5-avatar` with size - XS.
	 *
	 * @public
	 * @since 2.12.0
	 */
	@slot()
	image!: Slot<HTMLElement>;

	/**
	 * Defines the actionable elements.
	 * This slot allows placing additional interactive elements (such as buttons, icons, or tags)
	 * next to the delete button, providing flexible customization for various user actions.
	 *
	 * **Note:** While the slot is flexible, for consistency with design guidelines,
	 * it's recommended to use `ui5-button` with `Transparent` design or `ui5-icon` elements.
	 *
	 * @public
	 * @since 2.16.0
	 */
	@slot()
	actions!: Slot<HTMLElement>;

	_markupText = "";

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);

		this.selected = true;
	}

	_onfocusout() {
		this.selected = false;
	}

	async _onkeydown(e: KeyboardEvent) {
		// Handle manual tab navigation between action items
		if (isTabNext(e) || isTabPrevious(e)) {
			const handled = this._handleTabNavigation(e);
			if (handled) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}
		}

		// Call super for other key handling
		super._onkeydown(e);

		// Handle space/enter when focus is within action items
		if (this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			if (isSpace(e) || isEnter(e)) {
				e.preventDefault();
				return;
			}
		}

		// Handle F2 for focus navigation
		if (isF2(e)) {
			e.stopImmediatePropagation();
			const activeElement = getActiveElement();
			const focusDomRef = this.getFocusDomRef();

			if (!focusDomRef) {
				return;
			}

			if (activeElement === focusDomRef) {
				const firstFocusable = await getFirstFocusableElement(focusDomRef);
				firstFocusable?.focus();
			} else {
				focusDomRef.focus();
			}
		}
	}

	/**
	 * Handles manual tab navigation between action items and delete button with focus looping
	 */
	_handleTabNavigation(e: KeyboardEvent): boolean {
		const focusDomRef = this.getFocusDomRef();
		if (!focusDomRef) {
			return false;
		}

		const tabbableElements = getTabbableElements(focusDomRef);
		if (tabbableElements.length === 0) {
			return false;
		}

		const activeElement = getActiveElement() as HTMLElement;
		const currentIndex = tabbableElements.indexOf(activeElement);

		if (currentIndex === -1) {
			return false;
		}

		let nextElement: HTMLElement | null = null;

		if (isTabNext(e)) {
			if (currentIndex < tabbableElements.length - 1) {
				nextElement = tabbableElements[currentIndex + 1];
			} else {
				// Loop to first element when at the last element
				nextElement = tabbableElements[0];
			}
		} else if (isTabPrevious(e)) {
			if (currentIndex > 0) {
				nextElement = tabbableElements[currentIndex - 1];
			} else {
				// Loop to last element when at the first element
				nextElement = tabbableElements[tabbableElements.length - 1];
			}
		}

		if (nextElement) {
			nextElement.focus();
			return true;
		}

		return false;
	}

	_onDeleteButtonClick() {
		this.fireDecoratorEvent("delete");
	}

	_onDeleteButtonKeyDown(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.fireDecoratorEvent("delete");
		}
	}

	onBeforeRendering(): void {
		super.onBeforeRendering();

		// bold the matched text
		this._markupText = this.highlightText ? generateHighlightedMarkup((this.text || ""), this.highlightText) : encodeXML(this.text || "");
	}

	get _deleteButtonTooltip() {
		return SearchItem.i18nBundle.getText(SEARCH_ITEM_DELETE_BUTTON_TOOLTIP);
	}

	get hasActions() {
		return !!this.actions.length;
	}
}

SearchItem.define();

export default SearchItem;
