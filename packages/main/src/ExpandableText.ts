import UI5Element, { customElement, property, i18n, jsxRenderer, Device } from "@ui5/webcomponents-base";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type { LinkAccessibilityAttributes } from "./Link.js";
import ExpandableTextOverflowMode from "./types/ExpandableTextOverflowMode.js";
import type Button from "./Button.js";
import type TextEmptyIndicatorMode from "./types/TextEmptyIndicatorMode.js";
import {
	EXPANDABLE_TEXT_SHOW_LESS,
	EXPANDABLE_TEXT_SHOW_MORE,
	EXPANDABLE_TEXT_CLOSE,
	EXPANDABLE_TEXT_SHOW_LESS_POPOVER_ARIA_LABEL,
	EXPANDABLE_TEXT_SHOW_MORE_POPOVER_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Template
import ExpandableTextTemplate from "./ExpandableTextTemplate.js";

// Styles
import ExpandableTextCss from "./generated/themes/ExpandableText.css.js";

const { isPhone } = Device;

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-expandable-text` component allows displaying a large body of text in a small space. It provides an "expand/collapse" functionality, which shows/hides potentially truncated text.
 *
 * ### Usage
 *
 * #### When to use:
 * - To accommodate long texts in limited space, for example in list items, table cell texts, or forms
 *
 * #### When not to use:
 * - The content is critical for the user. In this case use short descriptions that can fit in
 * - Strive to provide short and meaningful texts to avoid excessive number of "Show More" links on the page
 *
 * ### Responsive Behavior
 *
 * On phones, if the component is configured to display the full text in a popover, the popover will appear in full screen.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ExpandableText";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.6.0
 */
@customElement({
	tag: "ui5-expandable-text",
	renderer: jsxRenderer,
	styles: ExpandableTextCss,
	template: ExpandableTextTemplate,
})
class ExpandableText extends UI5Element {
	/**
	 * Text of the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Maximum number of characters to be displayed initially. If the text length exceeds this limit, the text will be truncated with an ellipsis, and the "More" link will be displayed.
	 * @default 100
	 * @public
	 */
	@property({ type: Number })
	maxCharacters = 100;

	/**
	 * Determines how the full text will be displayed.
	 * @default "InPlace"
	 * @public
	 */
	@property()
	overflowMode: `${ExpandableTextOverflowMode}` = "InPlace"

	/**
	 * Specifies if an empty indicator should be displayed when there is no text.
	 * @default "Off"
	 * @public
	 */
	@property()
	emptyIndicatorMode: `${TextEmptyIndicatorMode}` = "Off";

	@property({ type: Boolean })
	_expanded = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	getFocusDomRef(): HTMLElement | undefined {
		if (this._usePopover) {
			return this.shadowRoot?.querySelector("[ui5-responsive-popover]") as HTMLElement;
		}

		return this.shadowRoot?.querySelector("[ui5-link]") as HTMLElement;
	}

	get _displayedText() {
		if (this._expanded && !this._usePopover) {
			return this.text;
		}

		return this.text?.substring(0, this.maxCharacters);
	}

	get _maxCharactersExceeded() {
		return (this.text?.length || 0) > this.maxCharacters;
	}

	get _usePopover() {
		return this.overflowMode === ExpandableTextOverflowMode.Popover;
	}

	get _ellipsisText() {
		if (this._expanded && !this._usePopover) {
			return " ";
		}

		return "... ";
	}

	get _textForToggle() {
		return this._expanded ? ExpandableText.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_LESS) : ExpandableText.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_MORE);
	}

	get _closeButtonText() {
		return ExpandableText.i18nBundle.getText(EXPANDABLE_TEXT_CLOSE);
	}

	get _accessibilityAttributesForToggle(): LinkAccessibilityAttributes {
		if (this._usePopover) {
			return {
				expanded: this._expanded,
				hasPopup: "dialog",
			};
		}

		return {
			expanded: this._expanded,
		};
	}

	get _accessibleNameForToggle() {
		if (this._usePopover) {
			return this._expanded ? ExpandableText.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_LESS_POPOVER_ARIA_LABEL) : ExpandableText.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_MORE_POPOVER_ARIA_LABEL);
		}

		return undefined;
	}

	_handlePopoverClose() {
		if (!isPhone()) {
			this._expanded = false;
		}
	}

	_handleToggleClick() {
		this._expanded = !this._expanded;
	}

	_handleCloseButtonClick(e: UI5CustomEvent<Button, "click">) {
		this._expanded = false;
		e.stopPropagation();
	}
}

ExpandableText.define();

export default ExpandableText;
