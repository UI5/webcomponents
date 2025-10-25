import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type { LinkAccessibilityAttributes } from "./Link.js";
import ExpandableTextOverflowMode from "./types/ExpandableTextOverflowMode.js";
import type Button from "./Button.js";
import type TextEmptyIndicatorMode from "./types/TextEmptyIndicatorMode.js";
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
declare class ExpandableText extends UI5Element {
    /**
     * Text of the component.
     *
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Maximum number of characters to be displayed initially. If the text length exceeds this limit, the text will be truncated with an ellipsis, and the "More" link will be displayed.
     * @default 100
     * @public
     */
    maxCharacters: number;
    /**
     * Determines how the full text will be displayed.
     * @default "InPlace"
     * @public
     */
    overflowMode: `${ExpandableTextOverflowMode}`;
    /**
     * Specifies if an empty indicator should be displayed when there is no text.
     * @default "Off"
     * @public
     */
    emptyIndicatorMode: `${TextEmptyIndicatorMode}`;
    _expanded: boolean;
    static i18nBundle: I18nBundle;
    getFocusDomRef(): HTMLElement | undefined;
    get _displayedText(): string | undefined;
    get _maxCharactersExceeded(): boolean;
    get _usePopover(): boolean;
    get _ellipsisText(): " " | "... ";
    get _textForToggle(): string;
    get _closeButtonText(): string;
    get _accessibilityAttributesForToggle(): LinkAccessibilityAttributes;
    get _accessibleNameForToggle(): string | undefined;
    _handlePopoverClose(): void;
    _handleToggleClick(): void;
    _handleCloseButtonClick(e: UI5CustomEvent<Button, "click">): void;
}
export default ExpandableText;
