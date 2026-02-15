import ToolbarItem from "@ui5/webcomponents/dist/ToolbarItem.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
declare enum LastClickedButton {
    None = "",
    Previous = "previous",
    Next = "next"
}
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-versioning` component provides navigation controls for AI-generated content versions.
 * It displays the current version index and total versions, with previous/next navigation buttons.
 * This component extends ToolbarItem to participate in toolbar overflow behavior as a single unit.
 *
 * ### Structure
 * The `ui5-ai-versioning` consists of the following elements:
 * - Previous Button: Navigates to the previous version (disabled when at first version)
 * - Version Counter: Shows current version / total versions (e.g., "2 / 5")
 * - Next Button: Navigates to the nex
 * t version (disabled when at last version)
 *
 * ### Focus Management
 * The component automatically manages focus when users reach version boundaries,
 * moving focus to the available navigation button when one becomes disabled.
 *
 * ### Responsive Behavior
 * When used in a toolbar, the entire versioning component (buttons + label) will overflow
 * together as a single unit when there is insufficient space.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/Versioning.js";`
 *
 * @constructor
 * @extends ToolbarItem
 * @since 2.16.0
 * @private
 */
declare class Versioning extends ToolbarItem {
    eventDetails: ToolbarItem["eventDetails"] & {
        "version-change": {
            backwards: boolean;
        };
    };
    /**
     * Indicates the index of the currently displayed result version.
     *
     * This property represents the current position in the version history.
     * @default 0
     * @public
     */
    currentStep: number;
    /**
     * The total number of available result versions.
     *
     * Note: Versioning is hidden if the value is `0`.
     *
     * @default 0
     * @public
     */
    totalSteps: number;
    _previousCurrentStep: number;
    _previousTotalSteps: number;
    _lastClickedButton: LastClickedButton;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    onAfterRendering(): void;
    /**
     * Manages focus when navigation buttons become disabled/enabled.
     * Automatically moves focus to available button when user reaches boundaries.
     * @private
     */
    _manageFocus(): void;
    handlePreviousVersionClick(): void;
    handleNextVersionClick(): void;
    get _previousButtonAccessibleName(): string;
    get _nextButtonAccessibleName(): string;
    get _previousButtonTooltip(): string;
    get _nextButtonTooltip(): string;
    /**
     * @override
     */
    get classes(): {
        root: {
            "ui5-ai-versioning": boolean;
            "ui5-tb-popover-item": boolean;
            "ui5-tb-item": boolean;
        };
    };
}
export default Versioning;
