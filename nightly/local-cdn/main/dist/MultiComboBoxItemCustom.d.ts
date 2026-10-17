import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "./ListItemBase.js";
import type { ListItemBasePressEventDetail } from "./ListItemBase.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";
import type { SelectionRequestEventDetail } from "./ListItem.js";
import type { AriaRole } from "@ui5/webcomponents-base";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type MultiComboBoxItemCustomClickEventDetail = {
    item?: MultiComboBoxItemCustom;
    originalEvent: Event;
};
/**
 * @class
 * The `ui5-mcb-item-custom` is a multi-combobox item component
 * that allows placing custom content inside a multi-combobox item.
 * The `text` property is used for filtering and token display.
 * For highlighting functionality, see `@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js`.
 *
 * @constructor
 * @extends ListItemBase
 * @implements {IMultiComboBoxItem}
 * @public
 * @since 2.24.0
 */
declare class MultiComboBoxItemCustom extends ListItemBase implements IMultiComboBoxItem {
    eventDetails: {
        "click": MultiComboBoxItemCustomClickEventDetail;
        "selection-requested": SelectionRequestEventDetail;
        "request-tabindex-change": FocusEvent;
        "_press": ListItemBasePressEventDetail;
        "_focused": FocusEvent;
        "forward-after": void;
        "forward-before": void;
    };
    /**
     * Defines the text of the component.
     * Used for filtering and token display.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the value of the component.
     * Used for programmatic selection via selectedValues property.
     * @default undefined
     * @public
     */
    value?: string;
    /**
     * Indicates whether the item is filtered.
     * @private
     */
    _isVisible: boolean;
    /**
     * Indicates whether the item is focused.
     * @protected
     */
    focused: boolean;
    /**
     * @private
     */
    _readonly: boolean;
    /**
     * Defines the content of the component.
     * @public
     */
    content: DefaultSlot<Node>;
    static i18nBundle: I18nBundle;
    get isMultiComboBoxItem(): boolean;
    get _effectiveTabIndex(): number;
    _onclick(e: MouseEvent): boolean | undefined;
    get _accessibleName(): string;
    get checkBoxAccInfo(): {
        role: AriaRole;
    };
}
export default MultiComboBoxItemCustom;
export declare const isInstanceOfMultiComboBoxItemCustom: (object: any) => object is MultiComboBoxItemCustom;
export type { MultiComboBoxItemCustomClickEventDetail };
