import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type Select from "./Select.js";
import ToolbarItem from "./ToolbarItem.js";
import type { ToolbarItemEventDetail } from "./ToolbarItem.js";
import type ToolbarSelectOption from "./ToolbarSelectOption.js";
import type { SelectChangeEventDetail } from "./Select.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type ToolbarSelectChangeEventDetail = ToolbarItemEventDetail & SelectChangeEventDetail;
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-select` component is used to create a toolbar drop-down list.
 * The items inside the `ui5-toolbar-select` define the available options by using the `ui5-toolbar-select-option` component.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ToolbarSelect.js";`
 *
 * `import "@ui5/webcomponents/dist/ToolbarSelectOption.js";` (comes with `ui5-toolbar-select`)
 * @constructor
 * @abstract
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
declare class ToolbarSelect extends ToolbarItem {
    eventDetails: ToolbarItem["eventDetails"] & {
        change: ToolbarSelectChangeEventDetail;
        open: ToolbarItemEventDetail;
        close: ToolbarItemEventDetail;
    };
    /**
     * Defines the width of the select.
     *
     * **Note:** all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
     * @default undefined
     * @public
     */
    width?: string;
    /**
     * Defines the component options.
     *
     * **Note:** Only one selected option is allowed.
     * If more than one option is defined as selected, the last one would be considered as the selected one.
     *
     * **Note:** Use the `ui5-toolbar-select-option` component to define the desired options.
     * @public
     */
    options: DefaultSlot<ToolbarSelectOption>;
    /**
     * Defines the HTML element that will be displayed in the component input part,
     * representing the selected option.
     * @public
     * @since 2.15.0
    */
    label: Slot<HTMLElement>;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @public
     * @default undefined
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the select.
     * @default undefined
     * @public
     */
    accessibleNameRef?: string;
    /**
     * Defines the value of the component:
     *
     * @public
     * @default ""
     * @since 2.15.0
     */
    set value(newValue: string);
    get value(): string | undefined;
    get select(): Select | null;
    _value: string;
    onClick(e: Event): void;
    onOpen(e: Event): void;
    onClose(e: Event): void;
    onChange(e: CustomEvent<SelectChangeEventDetail>): void;
    _syncOptions(selectedOption: HTMLElement): void;
    get styles(): {
        width: string | undefined;
    };
    get hasCustomLabel(): boolean;
}
export default ToolbarSelect;
export type { ToolbarSelectChangeEventDetail, };
