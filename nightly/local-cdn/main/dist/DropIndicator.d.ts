import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DropIndicator.js";`
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
declare class DropIndicator extends UI5Element {
    /**
     * Element where the drop indicator will be shown.
     *
     * @public
     * @default null
     */
    targetReference: HTMLElement | null;
    /**
     * Owner of the indicator and the target.
     * @public
     * @default null
     */
    ownerReference: HTMLElement | null;
    /**
     * Placement of the indicator relative to the target.
     *
     * @default "Before"
     * @public
     */
    placement: `${MovePlacement}`;
    /**
     * Orientation of the indicator.
     *
     * @default "Vertical"
     * @public
     */
    orientation: `${Orientation}`;
    get _positionProperty(): "top" | "left";
    constructor();
    onAfterRendering(): void;
}
export default DropIndicator;
