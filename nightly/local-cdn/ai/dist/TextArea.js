var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AITextArea_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TextArea from "@ui5/webcomponents/dist/TextArea.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { WRITING_ASSISTANT_LABEL, } from "./generated/i18n/i18n-defaults.js";
// Styles
import AITextAreaCss from "./generated/themes/AITextArea.css.js";
import textareaStyles from "@ui5/webcomponents/dist/generated/themes/TextArea.css.js";
import valueStateMessageStyles from "@ui5/webcomponents/dist/generated/themes/ValueStateMessage.css.js";
// Templates
import TextAreaTemplate from "./TextAreaTemplate.js";
import WritingAssistant from "./WritingAssistant.js";
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
let AITextArea = AITextArea_1 = class AITextArea extends TextArea {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the `ui5-ai-textarea` is currently in a loading(processing) state.
         *
         * @default false
         * @public
         */
        this.loading = false;
        /**
         * Defines the action text of the AI Writing Assistant.
         *
         * @default ""
         * @public
         */
        this.actionText = "";
        /**
         * Indicates the index of the currently displayed result version.
         *
         * The index is **1-based** (i.e. `1` represents the first result).
         *
         * @default 1
         * @public
         */
        this.currentVersionIndex = 1;
        /**
         * Indicates the total number of result versions available.
         *
         * @default 1
         * @public
         */
        this.totalVersions = 1;
        /**
         * Handles the generate click event from the AI toolbar.
         * Opens the AI menu and sets the opener element.
         *
         * @private
         */
        this._handleAIButtonClick = (e) => {
            const menuNodes = this.getSlottedNodes("menu");
            if (menuNodes.length === 0) {
                return;
            }
            if (!e.detail?.clickTarget) {
                return;
            }
            const menu = menuNodes[0];
            if (menu && typeof menu.open !== "undefined") {
                menu.opener = e.detail.clickTarget;
                menu.open = true;
            }
        };
        /**
         * Handles the stop generation event from the AI toolbar.
         * Fires the stop-generation event to notify listeners.
         *
         * @private
         */
        this.handleStopGeneration = () => {
            this.fireDecoratorEvent("stop-generation");
        };
    }
    static async onDefine() {
        AITextArea_1.i18nBundle = await getI18nBundle("@ui5/webcomponents-ai");
    }
    /**
     * Handles the click event for the "Previous Version" button.
     * Updates the current version index and syncs content.
     */
    _handlePreviousVersionClick() {
        this.fireDecoratorEvent("version-change", { backwards: true });
    }
    /**
     * Handles the click event for the "Next Version" button.
     * Updates the current version index and syncs content.
     */
    _handleNextVersionClick() {
        this.fireDecoratorEvent("version-change", { backwards: false });
    }
    /**
     * Handles the version change event from the writing assistant.
     */
    _handleVersionChange(e) {
        if (e.detail.backwards) {
            this._handlePreviousVersionClick();
        }
        else {
            this._handleNextVersionClick();
        }
    }
    /**
     * Handles keydown events for keyboard shortcuts.
     * @private
     */
    _handleKeydown(keyboardEvent) {
        const isCtrlOrCmd = keyboardEvent.ctrlKey || keyboardEvent.metaKey;
        const isShift = keyboardEvent.shiftKey;
        if (isShift && keyboardEvent.key.toLowerCase() === "f4") {
            const toolbar = this.shadowRoot?.querySelector("[ui5-ai-writing-assistant]");
            const aiButton = toolbar?.shadowRoot?.querySelector("#ai-menu-btn");
            if (aiButton) {
                aiButton.focus();
            }
            return;
        }
        if (this.totalVersions > 1) {
            if (isCtrlOrCmd && isShift && keyboardEvent.key.toLowerCase() === "z") {
                keyboardEvent.preventDefault();
                this._handlePreviousVersionClick();
                return;
            }
            if (isCtrlOrCmd && isShift && keyboardEvent.key.toLowerCase() === "y") {
                keyboardEvent.preventDefault();
                this._handleNextVersionClick();
            }
        }
    }
    /**
     * Overrides the parent's onAfterRendering to add keydown handler.
     * @private
     */
    onAfterRendering() {
        super.onAfterRendering();
        // Add keydown event listener to the textarea
        const textarea = this.shadowRoot?.querySelector("textarea");
        if (textarea && !this._keydownHandler) {
            this._keydownHandler = this._handleKeydown.bind(this);
            textarea.addEventListener("keydown", this._keydownHandler);
        }
    }
    get _ariaLabel() {
        return this.accessibleName || AITextArea_1.i18nBundle.getText(WRITING_ASSISTANT_LABEL);
    }
};
__decorate([
    property({ type: Boolean })
], AITextArea.prototype, "loading", void 0);
__decorate([
    property()
], AITextArea.prototype, "actionText", void 0);
__decorate([
    property({ type: Number })
], AITextArea.prototype, "currentVersionIndex", void 0);
__decorate([
    property({ type: Number })
], AITextArea.prototype, "totalVersions", void 0);
__decorate([
    slot({ type: HTMLElement })
], AITextArea.prototype, "menu", void 0);
AITextArea = AITextArea_1 = __decorate([
    customElement({
        tag: "ui5-ai-textarea",
        languageAware: true,
        renderer: jsxRenderer,
        template: TextAreaTemplate,
        styles: [
            textareaStyles,
            valueStateMessageStyles,
            AITextAreaCss,
        ],
        dependencies: [
            WritingAssistant,
            BusyIndicator,
        ],
    })
    /**
     * Fired when the user clicks on version navigation buttons.
     *
     * @public
     */
    ,
    event("version-change")
    /**
     * Fired when the user requests to stop AI text generation.
     *
     * @public
     */
    ,
    event("stop-generation")
], AITextArea);
AITextArea.define();
export default AITextArea;
//# sourceMappingURL=TextArea.js.map