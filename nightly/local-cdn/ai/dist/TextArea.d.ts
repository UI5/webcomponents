import { BaseTextArea } from "@ui5/webcomponents/dist/TextArea.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type TextAreaVersionChangeEventDetail = {
    backwards: boolean;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-textarea` component extends the standard TextArea with Writing Assistant capabilities.
 * It provides AI-powered text generation, editing suggestions, and version management functionality.
 *
 * ### Structure
 * The `ui5-ai-textarea` consists of the following elements:
 * - TextArea: The main text input area with all standard textarea functionality
 * - WritingAssistant: Dedicated toolbar containing:
 *   - Versioning: A component with left/right navigation buttons and a label for browsing AI-generated versions
 *   - AI Button: Opens a menu that can be extended with custom AI generation options through slotting
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/TextArea.js";`
 *
 * @constructor
 * @extends BaseTextArea
 * @experimental The **@ui5/webcomponents-ai** package is under development and considered experimental - components' APIs are subject to change.
 * Furthermore, the package supports **Horizon** themes only.
 * @since 2.16.0
 * @public
 * @slot {HTMLElement} menu Defines a slot for `ui5-menu` integration. This slot allows you to pass a `ui5-menu` instance that will be associated with the assistant.
 */
declare class TextArea extends BaseTextArea {
    eventDetails: BaseTextArea["eventDetails"] & {
        "version-change": TextAreaVersionChangeEventDetail;
        "stop-generation": void;
    };
    private _keydownHandler?;
    private _menuFocusinHandler?;
    private _menuFocusoutHandler?;
    /**
     * Defines whether the `ui5-ai-textarea` is currently in a loading(processing) state.
     *
     * @default false
     * @public
     */
    loading: boolean;
    /**
     * Defines the prompt description of the current action.
     *
     * @default ""
     * @public
     */
    promptDescription: string;
    /**
     * Indicates the index of the currently displayed version.
     *
     *
     * @default 0
     * @public
     */
    currentVersion: number;
    /**
     * Indicates the total number of result versions available.
     *
     * Notes:
     * Versioning is hidden if the value is `0`
     *
     * @default 0
     * @public
     */
    totalVersions: number;
    focused: boolean;
    menu: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    /**
     * Handles the click event for the "Previous Version" button.
     * Updates the current version index and syncs content.
     */
    _handlePreviousVersionClick(): void;
    /**
     * Handles the click event for the "Next Version" button.
     * Updates the current version index and syncs content.
     */
    _handleNextVersionClick(): void;
    /**
     * Handles the version change event from the writing assistant.
     */
    _handleVersionChange(e: CustomEvent<{
        backwards: boolean;
    }>): void;
    /**
     * Handles keydown events for keyboard shortcuts.
     * @private
     */
    _handleKeydown(keyboardEvent: KeyboardEvent): void;
    /**
     * Overrides the parent's onAfterRendering to add keydown handler.
     * @private
     */
    onAfterRendering(): void;
    _onfocusin(): void;
    _onfocusout(e: FocusEvent): void;
    /**
     * Handles the generate click event from the AI toolbar.
     * Opens the AI menu and sets the opener element.
     *
     * @private
     */
    _handleAIButtonClick: (e: CustomEvent<{
        clickTarget?: HTMLElement;
    }>) => void;
    get _ariaLabel(): string;
    /**
     * Handles the stop generation event from the AI toolbar.
     * Fires the stop-generation event to notify listeners.
     *
     * @private
     */
    handleStopGeneration: () => void;
}
export type { TextAreaVersionChangeEventDetail };
export default TextArea;
