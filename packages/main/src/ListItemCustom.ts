import { isTabNext, isTabPrevious, isF2 } from "@ui5/webcomponents-base/dist/Keys.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ClassMap, AccessibilityInfo } from "@ui5/webcomponents-base/dist/types.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ListItem from "./ListItem.js";
import ListItemCustomTemplate from "./ListItemCustomTemplate.js";
import {
	ACCESSIBILITY_STATE_REQUIRED,
	ACCESSIBILITY_STATE_DISABLED,
	ACCESSIBILITY_STATE_READONLY,
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

	/**
	 * @public
	 */
	@slot({ type: Node, "default": true })
	content!: Array<Node>;

	async _onkeydown(e: KeyboardEvent) {
		const isTab = isTabNext(e) || isTabPrevious(e);
		const isFocused = this.matches(":focus");

		if (!isTab && !isFocused && !isF2(e)) {
			return;
		}

		await super._onkeydown(e);
	}

	_onkeyup(e: KeyboardEvent) {
		const isTab = isTabNext(e) || isTabPrevious(e);
		const isFocused = this.matches(":focus");

		if (!isTab && !isFocused && !isF2(e)) {
			return;
		}

		super._onkeyup(e);
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
		this._updateInvisibleTextContent();
	}

	_onfocusout(e: FocusEvent) {
		super._onfocusout(e);
		this._clearInvisibleTextContent();
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

		// Process slotted content elements
		this.content.forEach(child => {
			this._processNodeForAccessibility(child, accessibilityTexts);
		});

		// Process delete button in delete mode
		const deleteButtonNodes = this._getDeleteButtonNodes();
		deleteButtonNodes.forEach(button => {
			this._processNodeForAccessibility(button, accessibilityTexts);
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

	/**
	 * Processes a node and adds its accessible text to the given array
	 * @param {Node | null} node The node to process
	 * @param {string[]} textArray The array to add the text to
	 * @private
	 */
	private _processNodeForAccessibility(node: Node | null, textArray: string[]): void {
		if (!node) {
			return;
		}

		const text = this._getElementAccessibleText(node);
		if (text) {
			textArray.push(text);
		}
	}

	/**
	 * Extract accessible text from a node and its children recursively.
	 * UI5 elements provide accessibilityInfo with description and children.
	 * For elements without accessibilityInfo, we fall back to extracting text content.
	 *
	 * @param {Node | null} nodeArg The node to extract text from
	 * @returns {string} The extracted text
	 * @private
	 */
	private _getElementAccessibleText(nodeArg: Node | null): string {
		if (!nodeArg) {
			return "";
		}

		// Handle text nodes directly
		if (nodeArg.nodeType === Node.TEXT_NODE) {
			return nodeArg.textContent?.trim() || "";
		}

		// Only proceed with Element-specific operations for Element nodes
		if (nodeArg.nodeType !== Node.ELEMENT_NODE) {
			return "";
		}

		const element = nodeArg as Element;

		// First, check for accessibilityInfo - expected for all UI5 elements
		const accessibilityInfo = (element as any).accessibilityInfo as AccessibilityInfo | undefined;
		if (accessibilityInfo) {
			return this._processAccessibilityInfo(accessibilityInfo);
		}

		// Fallback: If no accessibilityInfo is available, extract text content
		// This applies to standard HTML elements or UI5 elements missing accessibilityInfo

		// 1. Get direct text nodes
		const textNodeContent = Array.from(element.childNodes || [])
			.filter(node => node.nodeType === Node.TEXT_NODE)
			.map(node => node.textContent?.trim())
			.filter(Boolean)
			.join(" ");

		// 2. Process shadow DOM if available (for web components)
		let shadowContent = "";
		if ((element as HTMLElement).shadowRoot) {
			shadowContent = Array.from((element as HTMLElement).shadowRoot!.childNodes)
				.map(childNode => this._getElementAccessibleText(childNode))
				.filter(Boolean)
				.join(" ");
		}

		// 3. Process child elements recursively
		const childContent = Array.from(element.children || [])
			.map(child => this._getElementAccessibleText(child))
			.filter(Boolean)
			.join(" ");

		// Combine all text sources
		return [textNodeContent, shadowContent, childContent].filter(Boolean).join(" ");
	}

	/**
	 * Process accessibility info from UI5 elements
	 * @param {AccessibilityInfo} accessibilityInfo The accessibility info object
	 * @returns {string} Processed accessibility text
	 * @private
	 */
	private _processAccessibilityInfo(accessibilityInfo: AccessibilityInfo): string {
		// Extract primary information from accessibilityInfo
		const {
			type, description, required, disabled, readonly, children,
		} = accessibilityInfo;

		const textParts: string[] = [];

		// Add type and description first
		if (type) {
			textParts.push(type);
		}

		if (description) {
			textParts.push(description);
		}

		// Process accessibility children after description if provided
		let childrenText = "";
		if (children && children.length > 0) {
			childrenText = children
				.map(child => this._getElementAccessibleText(child))
				.filter(Boolean)
				.join(" ");

			// Add children text after description
			if (childrenText) {
				textParts.push(childrenText);
			}
		}

		// Add accessibility states
		const states: string[] = [];
		if (required) {
			states.push(ListItemCustom.i18nBundle.getText(ACCESSIBILITY_STATE_REQUIRED));
		}
		if (disabled) {
			states.push(ListItemCustom.i18nBundle.getText(ACCESSIBILITY_STATE_DISABLED));
		}
		if (readonly) {
			states.push(ListItemCustom.i18nBundle.getText(ACCESSIBILITY_STATE_READONLY));
		}

		// Build text with states
		let mainText = textParts.join(" ");
		if (states.length > 0) {
			mainText = [mainText, states.join(" ")].filter(Boolean).join(" ");
		}

		return mainText;
	}

	get classes(): ClassMap {
		const result = super.classes;

		result.main["ui5-custom-li-root"] = true;

		return result;
	}
}

ListItemCustom.define();

export default ListItemCustom;
