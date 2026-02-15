import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-textarea-toolbar` component provides a specialized toolbar for AI TextArea functionality.
 * It manages different states of the AI assistant and provides version navigation capabilities.
 *
 * ### Structure
 * The `ui5-ai-textarea-toolbar` consists of the following elements:
 * - AI Generate Button: Triggers AI text generation or stops ongoing generation
 * - Version Navigation: Allows navigation between multiple AI-generated results
 * - Action Label: Displays the current AI action being performed
 *
 * ### ES6 Module Import
 *
 * `import "@sap-webcomponents/ai/dist/WritingAssistant.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.16.0
 * @private
 */
declare class WritingAssistant extends UI5Element {
    eventDetails: {
        "version-change": {
            backwards: boolean;
        };
        "button-click": {
            clickTarget: HTMLElement;
        };
        "stop-generation": object;
    };
    /**
     * Defines whether the Writing Assistant is currently loading.
     *
     * When `true`, indicates that an AI action is in progress.
     *
     * @default false
     */
    loading: boolean;
    /**
     * Defines the prompt description of the Writing Assistant.
     *
     * This text is displayed in the toolbar to indicate the current or last
     * performed AI action (e.g., "Generated text", "Simplified text").
     *
     * @default ""
     * @public
     */
    promptDescription: string;
    /**
     * Indicates the index of the currently displayed result version.
     *
     * The index is **0-based** (i.e. `0` represents the first result).
     * This property is synchronized with the parent AI TextArea component.
     *
     * @default 0
     * @public
     * @since 2.16.0
     */
    currentVersion: number;
    /**
     * Indicates the total number of result versions available.
     *
     * This property determines whether version navigation controls are displayed.
     * When totalVersions > 0, previous/next buttons become available.
     *
     * @default 0
     * @public
     */
    totalVersions: number;
    focused: boolean;
    static i18nBundleAi: I18nBundle;
    static onDefine(): Promise<void>;
    /**
     * Handles the version change event from the versioning component.
     */
    handleVersionChange(e: CustomEvent<{
        backwards: boolean;
    }>): void;
    /**
     * Handles the click event for the AI generate button.
     * Toggles between generate and stop states based on current button state.
     *
     * @public
     */
    handleButtonClick(e: Event): void;
    get _ariaLabel(): string;
    get _previousButtonAccessibleName(): string;
    get _nextButtonAccessibleName(): string;
    get _toolbarAccessibleName(): string;
    get _buttonAccessibleName(): string;
    get _buttonTooltip(): string;
    get _stopTooltip(): string;
}
export default WritingAssistant;
