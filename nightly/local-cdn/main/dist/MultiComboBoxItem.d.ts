import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ComboBoxItem from "./ComboBoxItem.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";
import type { SelectionRequestEventDetail } from "./ListItem.js";
import type { AriaRole } from "@ui5/webcomponents-base";
/**
 * @class
 * The `ui5-mcb-item` represents the item for a `ui5-multi-combobox`.
 * @constructor
 * @extends ComboBoxItem
 * @implements {IMultiComboBoxItem}
 * @public
 */
declare class MultiComboBoxItem extends ComboBoxItem implements IMultiComboBoxItem {
    eventDetails: ComboBoxItem["eventDetails"] & {
        "selection-requested": SelectionRequestEventDetail;
    };
    /**
     * Defines the selected state of the component.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines whether the item is filtered
     * @private
     */
    _isVisible: boolean;
    _readonly: boolean;
    static i18nBundle: I18nBundle;
    get isMultiComboBoxItem(): boolean;
    _onclick(e: MouseEvent): boolean | undefined;
    get _accessibleName(): string;
    get checkBoxAccInfo(): {
        role: AriaRole;
    };
}
export default MultiComboBoxItem;
export declare const isInstanceOfMultiComboBoxItem: (object: any) => object is MultiComboBoxItem;
