import type { IComboBoxItem } from "./ComboBox.js";
import ListItemBase from "./ListItemBase.js";
import type { ListItemBasePressEventDetail } from "./ListItemBase.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type ComboBoxItemCustomClickEventDetail = {
    item?: ComboBoxItemCustom;
    originalEvent: Event;
};
/**
 * @class
 * The `ui5-cb-item-custom` is a combobox item component
 * that allows placing custom content inside a combobox item.
 * The `text` property is used for filtering and auto-complete.
 * For highlighting functionality, see `@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js`.
 *
 * @constructor
 * @extends ListItemBase
 * @implements {IComboBoxItem}
 * @public
 * @since 2.24.0
 */
declare class ComboBoxItemCustom extends ListItemBase implements IComboBoxItem {
    eventDetails: {
        "click": ComboBoxItemCustomClickEventDetail;
        "request-tabindex-change": FocusEvent;
        "_press": ListItemBasePressEventDetail;
        "_focused": FocusEvent;
        "forward-after": void;
        "forward-before": void;
    };
    /**
     * Defines the text of the component.
     * Used for filtering, autocomplete, and mobile rendering.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the value of the component.
     * Used for programmatic selection via the `selectedValue` property.
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
     * Defines the content of the component.
     * @public
     */
    content: DefaultSlot<Node>;
    get _effectiveTabIndex(): number;
}
export default ComboBoxItemCustom;
export type { ComboBoxItemCustomClickEventDetail };
