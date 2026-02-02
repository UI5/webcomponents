import {
	isTabNext, isTabPrevious, isF2, isF7, isUp, isDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ListItem from "./ListItem.js";
import ListItemCustomTemplate from "./ListItemCustomTemplate.js";
import { getCustomAnnouncement } from "./CustomAnnouncement.js";
import {
	LISTITEMCUSTOM_TYPE_TEXT,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ListItemCustomCss from "./generated/themes/ListItemCustom.css.js";

/**
 * @class
 *
 * A component to be used as custom list item within the `ui5-list`
 * the same way as the standard `ui5-li`.
 *
 * The component accepts arbitrary HTML content to allow full customization.
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @slot {Node[]} default - Defines the content of the component.
 * @constructor
 * @extends ListItem
 * @public
 */
@customElement({
	tag: "ui5-li-custom",
	template: ListItemCustomTemplate,
	renderer: jsxRenderer,
	styles: [ListItem.styles, ListItemCustomCss],
})
class ListItemCustom extends ListItem {
	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;
	/**
	 * Defines whether the item is movable.
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	movable = false;

	/**
	 * Defines the text alternative of the component.
	 *
	 * **Note**: If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	declare accessibleName?: string;

	_onkeydown(e: KeyboardEvent) {
		const isFocused = this.matches(":focus");
		const shouldHandle = isFocused
			|| isTabNext(e) || isTabPrevious(e)
			|| isF2(e) || isF7(e)
			|| isUp(e) || isDown(e);

		if (shouldHandle) {
			super._onkeydown(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		const isFocused = this.matches(":focus");
		const shouldHandle = isFocused
			|| isTabNext(e) || isTabPrevious(e)
			|| isF2(e) || isF7(e)
			|| isUp(e) || isDown(e);

		if (shouldHandle) {
			super._onkeyup(e);
		}
	}

	get _accessibleNameRef(): string {
		if (this.accessibleName) {
			// accessibleName is set - return labels excluding content
			return `${this._id}-invisibleText`;
		}

		// accessibleName is not set - return _accInfo.listItemAriaLabel including custom content announcements
		return `${this._id}-invisibleTextContent ${this._id}-invisibleText`;
	}

	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);
		// Skip updating invisible text during drag operations
		if (!this._isDragging()) {
			this._updateInvisibleTextContent();
		}
	}

	_onfocusout(e: FocusEvent) {
		super._onfocusout(e);
		// Skip clearing invisible text during drag operations
		if (!this._isDragging()) {
			this._clearInvisibleTextContent();
		}
	}

	/**
	 * Checks if this element is currently being dragged
	 * @returns {boolean} True if this element is being dragged
	 * @private
	 */
	_isDragging(): boolean {
		// Check if this specific element has the data-moving attribute
		return this.hasAttribute("data-moving");
	}

	onAfterRendering() {
		// This will run after the component is rendered
		if (this.shadowRoot && !this.shadowRoot.querySelector(`#${this._id}-invisibleTextContent`)) {
			const span = document.createElement("span");
			span.id = `${this._id}-invisibleTextContent`;
			span.className = "ui5-hidden-text";
			// Empty content as requested
			this.shadowRoot.appendChild(span);
		}
	}

	/**
	 * Returns the invisible text span element used for accessibility announcements
	 * @returns {HTMLElement | null} The HTMLElement representing the invisible text span used for accessibility announcements, or null if the element is not found in the shadow DOM
	 * @private
	 */
	private get _invisibleTextSpan(): HTMLElement | null {
		return this.shadowRoot?.querySelector(`#${this._id}-invisibleTextContent`) as HTMLElement;
	}

	private _updateInvisibleTextContent() {
		const invisibleTextSpan = this._invisibleTextSpan;
		if (!invisibleTextSpan) {
			return;
		}

		// Get accessibility descriptions
		const accessibilityTexts = this._getAccessibilityDescription();

		// Create a new array with the type text at the beginning
		const allTexts = [ListItemCustom.i18nBundle.getText(LISTITEMCUSTOM_TYPE_TEXT), ...accessibilityTexts];

		// Update the span content
		invisibleTextSpan.textContent = allTexts.join(" ");
	}

	private _clearInvisibleTextContent() {
		const invisibleTextSpan = this._invisibleTextSpan;
		if (invisibleTextSpan) {
			invisibleTextSpan.textContent = "";
		}
	}

	/**
	 * Gets accessibility description by processing content nodes and delete buttons
	 * @returns {string[]} Array of accessibility text strings
	 * @private
	 */
	private _getAccessibilityDescription(): string[] {
		const accessibilityTexts: string[] = [];

		// Process slotted content elements (default slot)
		const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])");
		if (defaultSlot) {
			const assignedNodes = (defaultSlot as HTMLSlotElement).assignedNodes({ flatten: true });
			assignedNodes.forEach(child => {
				const text = getCustomAnnouncement(child, { lessDetails: false }, false);
				if (text) {
					accessibilityTexts.push(text);
				}
			});
		}

		// Process delete button in delete mode
		const deleteButtonNodes = this._getDeleteButtonNodes();
		deleteButtonNodes.forEach(button => {
			const text = getCustomAnnouncement(button, { lessDetails: false }, false);
			if (text) {
				accessibilityTexts.push(text);
			}
		});

		return accessibilityTexts;
	}

	/**
	 * Gets delete button nodes to process for accessibility
	 * @returns {Node[]} Array of nodes to process
	 * @private
	 */
	private _getDeleteButtonNodes(): Node[] {
		if (!this.modeDelete) {
			return [];
		}

		if (this.hasDeleteButtonSlot) {
			// Return custom delete buttons from slot
			return this.deleteButton;
		}

		// Return the built-in delete button from the shadow DOM if it exists
		const deleteButton = this.shadowRoot?.querySelector(`#${this._id}-deleteSelectionElement`);
		return deleteButton ? [deleteButton] : [];
	}

	get classes(): ClassMap {
		const result = super.classes;

		result.main["ui5-custom-li-root"] = true;

		return result;
	}
}

ListItemCustom.define();

export default ListItemCustom;
