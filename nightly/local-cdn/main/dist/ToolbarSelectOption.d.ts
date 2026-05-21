import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toolbar-select-option` component defines the content of an option in the `ui5-toolbar-select`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.17.0
 */
declare class ToolbarSelectOption extends UI5Element {
    /**
     * Defines the selected state of the component.
     * @default false
     * @public
     */
    set selected(value: boolean);
    get selected(): boolean;
    _clearSiblingsAndSync(): void;
    /**
     * Defines the text of the component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    text: DefaultSlot<Node>;
}
export default ToolbarSelectOption;
