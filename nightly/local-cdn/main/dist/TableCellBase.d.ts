import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TableCellHorizontalAlign from "./types/TableCellHorizontalAlign.js";
/**
 * @class
 * A class to serve as a foundation for the `TableCell` and `TableHeaderCell` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
declare abstract class TableCellBase extends UI5Element {
    /**
     * Defines the content of the component.
     *
     * @public
     */
    content: DefaultSlot<Node>;
    /**
     * Determines the horizontal alignment of table cells.
     *
     * @default undefined
     * @public
     */
    horizontalAlign?: `${TableCellHorizontalAlign}`;
    _popin: boolean;
    _popinHidden: boolean;
    ariaRole: string;
    static i18nBundle: I18nBundle;
    onEnterDOM(): void;
    getFocusDomRef(): this;
    isTableCellBase(): boolean;
}
export default TableCellBase;
