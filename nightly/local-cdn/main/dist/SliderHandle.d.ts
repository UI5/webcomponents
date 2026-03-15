import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { SliderScaleOrientation } from "./SliderScale.js";
/**
 * @class
 * The <code>ui5-slider-handle</code> component represents the handle of the <code>ui5-slider</code> component.
 *
 * @constructor
 * @extends UI5Element
 * @since 2.19.0
 * @private
 */
declare class SliderHandle extends UI5Element {
    /**
     * Defines the value of the slider handle.
     * <br><br>
     * <b>Note:</b> The value should be between the <code>min</code> and <code>max</code> properties of the parent <code>ui5-slider</code>.
     * @since 2.19.0
     * @public
     */
    value: number;
    /**
     * Defines the minimum value of the slider handle.
     * <br><br>
     * <b>Note:</b> The value should be less than the <code>max</code> property of the parent <code>ui5-slider</code>.
     * @since 2.19.0
     * @public
     */
    min: number;
    /**
     * Defines the maximum value of the slider handle.
     * <br><br>
     * <b>Note:</b> The value should be greater than the <code>min</code> property of the parent <code>ui5-slider</code>.
     * @since 2.19.0
     * @public
     */
    max: number;
    /**
     * Defines whether the slider handle is disabled.
     * <br><br>
     * <b>Note:</b> A disabled slider handle cannot be interacted with.
     * @since 2.19.0
     * @public
     */
    disabled: boolean;
    /**
     * Defines whether the slider handle is active.
     * <br><br>
     * <b>Note:</b> An active slider handle is currently being interacted with.
     * @since 2.19.0
     * @public
     */
    active: boolean;
    /**
     * Defines the orientation of the slider handle.
     *
     * @private
     */
    orientation: `${SliderScaleOrientation}`;
    getFocusDomRef(): HTMLElement | undefined;
}
export default SliderHandle;
