import BaseInput from "@ui5/webcomponents/dist/Input.js";
import type Menu from "@ui5/webcomponents/dist/Menu.js";
import type { MenuItemClickEventDetail } from "@ui5/webcomponents/dist/Menu.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type InputVersionChangeEventDetail = {
    backwards: boolean;
};
type InputItemClickEventDetail = MenuItemClickEventDetail;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-input` component extends the standard `ui5-input` with **AI Writing Assistant** capabilities.
 *
 * ### Structure
 *
 * The `ui5-ai-input` consists of the following main parts:
 *
 * - **Input Field** – Inherits all standard Input behaviors.
 * - **AI Action Button** – Appears when focused or loading, providing access to AI-related actions or stopping generation.
 *
 * The component automatically determines which elements to render based on its internal state:
 * - The AI Button is only shown when there are available `actions`.
 * - The version navigation appears only when `totalVersions > 1`.
 *
 * ### Keyboard Support
 *
 * - **Shift + F4** — Opens the AI menu.
 * - **Ctrl + Shift + Z / Y** — Navigates backward/forward between AI-generated versions.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/Input.js";`
 *
 * @constructor
 * @extends BaseInput
 * @since 2.16.0
 * @experimental The **@ui5/webcomponents-ai** package is under active development and considered experimental. Component APIs are subject to change.
 * Furthermore, the package supports **Horizon** themes only.
 * @public
 */
declare class Input extends BaseInput {
    eventDetails: BaseInput["eventDetails"] & {
        "version-change": InputVersionChangeEventDetail;
        "stop-generation": void;
        "button-click": void;
        "item-click": InputItemClickEventDetail;
    };
    /**
     * Indicates the index of the currently displayed version.
     *
     * @default 0
     * @public
     */
    currentVersion: number;
    /**
     * Indicates the total number of result versions available.
     *
     * When not set or set to 0, the versioning will be hidden.
     *
     * @default 0
     * @public
     */
    totalVersions: number;
    /**
     * Defines whether the AI Writing Assistant is currently loading.
     *
     * When `true`, indicates that an AI action is in progress.
     *
     * @default false
     * @public
     */
    loading: boolean;
    /**
     * Indicates if the menu is open.
     * @default 0
     * @private
     */
    _isMenuOpen: boolean;
    /**
     * Defines the items of the menu for the component.
     * @public
     */
    actions: Slot<HTMLElement>;
    _previousCurrentStep: number;
    _previousTotalSteps: number;
    isFocused: boolean;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(e: FocusEvent): void;
    /**
     * Manages the focus when the navigation buttons become disabled/enabled.
     * Automatically moves the focus to the available button when the user reaches the boundaries.
     * @private
     */
    _manageVersionButtonsFocus(): void;
    /**
     * Handles the click event for the AI generate Button.
     * Fires the appropriate event based on the AI Button state.
     * @private
     */
    _handleAIButtonClick(e: Event): void;
    /**
     * Handles the escape event for the AI generate Button.
     * @private
     */
    _handleAIButtonKeydown: (e: KeyboardEvent) => void;
    /**
     * Handles the version change event from the versioning component.
     *
     * @param {CustomEvent} e - The version change event
     */
    _handleVersionChange(e: CustomEvent<{
        backwards: boolean;
    }>): void;
    /**
     * Handles the click event for the "Previous Version" button.
     * Updates the current version index and syncs content.
     * @private
     */
    _handlePreviousButtonClick(): void;
    /**
     * Handles the click event for the "Next Version" button.
     * Updates the current version index and syncs content.
     * @private
     */
    _handleNextButtonClick(): void;
    _onMenuIconClick(e: CustomEvent<InputItemClickEventDetail>): void;
    /**
     * Handles keydown events for keyboard shortcuts.
     * @private
     */
    _onkeydown(e: KeyboardEvent): void;
    /**
     * Handles visibility of the Writing Assistant Button.
     * If there are no items, the Writing Assistant Button would not be rendered.
     */
    get hasActions(): boolean;
    get ariaLabel(): string;
    get stopGeneratingTooltip(): string;
    get nextButtonAccessibleName(): string;
    get previousButtonAccessibleName(): string;
    get menu(): Menu;
}
export type { InputVersionChangeEventDetail, InputItemClickEventDetail, };
export default Input;
