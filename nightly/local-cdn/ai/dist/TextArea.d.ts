import TextArea from "@ui5/webcomponents/dist/TextArea.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-textarea` component extends the standard TextArea with AI Writing Assistant capabilities.
 * It provides AI-powered text generation, editing suggestions, and version management functionality.
 *
 * ### Structure
 * The `ui5-ai-textarea` consists of the following elements:
 * - TextArea: The main text input area with all standard textarea functionality
 * - AI Toolbar: Specialized toolbar with AI generation controls
 * - Version Navigation: Controls for navigating between AI-generated versions
 * - Menu Integration: Support for AI action menu
 *
 * Single vs multiple result display is determined internally based on totalVersions count.
 *
 * ### ES6 Module Import
 *
 * `import "@sap-webcomponents/ai/dist/TextArea.js";`
 *
 * @constructor
 * @extends TextArea
 * @since 2.16.0
 * @public
 * @slot {HTMLElement} menu Defines a slot for `ui5-menu` integration. This slot allows you to pass a `ui5-menu` instance that will be associated with the assistant.
 */
declare class AITextArea extends TextArea {
    eventDetails: TextArea["eventDetails"] & {
        "version-change": {
            backwards: boolean;
        };
        "stop-generation": object;
    };
    private _keydownHandler?;
    /**
     * Defines whether the `ui5-ai-textarea` is currently in a loading(processing) state.
     *
     * @default false
     * @public
     */
    loading: boolean;
    /**
     * Defines the action text of the AI Writing Assistant.
     *
     * @default ""
     * @public
     */
    actionText: string;
    /**
     * Indicates the index of the currently displayed result version.
     *
     * The index is **1-based** (i.e. `1` represents the first result).
     *
     * @default 1
     * @public
     */
    currentVersionIndex: number;
    /**
     * Indicates the total number of result versions available.
     *
     * @default 1
     * @public
     */
    totalVersions: number;
    menu: Array<HTMLElement>;
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
export default AITextArea;
