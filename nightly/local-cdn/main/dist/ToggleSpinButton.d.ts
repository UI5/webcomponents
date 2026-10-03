import type { AriaRole } from "@ui5/webcomponents-base";
import ToggleButton from "./ToggleButton.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-toggle-spin-button` is explicitly used in the new design of `ui5-time-picker`.
 * It extends `ui5-toggle-button` with some specific accessibility-related properties in order to
 * have spin button look and feel from accessibility point of view. This component should not be used separately.
 * @constructor
 * @extends ToggleButton
 * @since 1.15.0
 * @private
 */
declare class ToggleSpinButton extends ToggleButton {
    /**
     * Defines the ARIA valuemin of the component.
     * @default -1
     */
    valueMin: number;
    /**
     * Defines the ARIA valuemax of the component.
     * @default -1
     */
    valueMax: number;
    /**
     * Defines the ARIA valuenow of the component.
     * @default -1
     */
    valueNow: number;
    /**
     * Defines the ARIA valuetext of the component.
     * @default undefined
     */
    valueText?: string;
    /**
     * Override of the handler in order to prevent button toggle functionality
     */
    _onclick(): void;
    /**
     * Override
     */
    get effectiveAccRole(): AriaRole;
}
export default ToggleSpinButton;
