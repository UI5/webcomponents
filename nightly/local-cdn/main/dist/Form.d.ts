import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AriaRole } from "@ui5/webcomponents-base";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type FormItemSpacing from "./types/FormItemSpacing.js";
import type FormAccessibleMode from "./types/FormAccessibleMode.js";
import type TitleLevel from "./types/TitleLevel.js";
/**
 * Interface for components that can be slotted inside `ui5-form` as items.
 * @public
 * @since 2.0.0
 */
interface IFormItem extends UI5Element {
    itemSpacing: `${FormItemSpacing}`;
    readonly isGroup: boolean;
    colsXl?: number;
    colsL?: number;
    colsM?: number;
    colsS?: number;
    columnSpan?: number;
    headerText?: string;
    headerLevel?: `${TitleLevel}`;
    accessibleMode?: `${FormAccessibleMode}`;
}
type GroupItemsInfo = {
    groupItem: IFormItem;
    items: Array<ItemsInfo>;
    accessibleName: string | undefined;
    accessibleNameInner: string | undefined;
    accessibleNameRef: string | undefined;
    accessibleNameRefInner: string | undefined;
    role: AriaRole | undefined;
};
type ItemsInfo = {
    item: IFormItem;
};
/**
 * @class
 *
 * ### Overview
 *
 * The Form is a layout component that arranges labels and form fields (like input fields) pairs
 * into a specific number of columns.
 *
 * **Note:** The Form web component is a layout component, it isn't a replacement for the native `form` HTML element.
 * The Form web component does not provide any APIs for form submission.
 *
 * ### Structure
 *
 * - **Form** (`ui5-form`) is the top-level container component, responsible for the content layout and responsiveness.
 * - **FormGroup** (`ui5-form-group`) enables the grouping of the Form content.
 * - **FormItem** (`ui5-form-item`) is a pair of label and form fields and can be used directly in a Form, or as part of a FormGroup.
 *
 * The simplest Form (`ui5-form`) consists of a header area on top,
 * displaying a header text (see the `headingText` property) and content below - an arbitrary number of FormItems (ui5-form-item),
 * representing the pairs of label and form fields.
 *
 * And, there is also "grouping" available to assist the implementation of richer UIs.
 * This is enabled by the FormGroup (`ui5-form-group`) component.
 * In this case, the Form is structured into FormGroups and each FormGroup consists of FormItems.
 *
 * ### Responsiveness
 *
 * The Form component reacts and changes its layout on predefined breakpoints.
 * Depending on its size, the Form content (FormGroups and FormItems) gets divided into one or more columns as follows:
 * - **S** (< 600px) – 1 column is recommended (default: 1)
 * - **M** (600px - 1022px) – up to 2 columns are recommended (default: 1)
 * - **L** (1023px - 1439px) - up to 3 columns are recommended (default: 2)
 * - **XL** (> 1439px) – up to 6 columns are recommended (default: 3)
 *
 * To change the layout, use the `layout` property - f.e. layout="S1 M2 L3 XL6".
 *
 * ### Groups
 *
 * To make better use of screen space, there is built-in logic to determine how many columns should a FormGroup occupy.
 *
 * - **Example #1** (perfect match):
 * 4 columns and 4 groups: each group will use 1 column.
 *
 * - **Example #2** (balanced distribution):
 * 4 columns and 2 groups: each group will use 2 columns.
 * 6 columns and 2 groups: each group will use 3 columns.
 *
 * - **Example #3** (unbalanced distribution):
 * 3 columns and 2 groups: the larger one will use 2 columns, the smaller 1 column.
 * 5 columns and 3 groups: two of the groups will use 2 columns each, the smallest 1 column.
 *
 * **Note:** The size of a group element is determined by the number of FormItems assigned to it.
 * In the case of equality, the first in the DOM will use more columns, and the last - fewer columns.
 *
 * - **Example #4** (more groups than columns):
 * 3 columns and 4 groups: each FormGroup uses only 1 column, the last FormGroup will wrap on the second row.
 *
 * ### Groups Column Span
 *
 * To influence the built-in group distribution, described in the previous section,
 * you can use the FormGroup's `columnSpan` property, that defines how many columns the group should expand to.
 *
 * ### Items Column Span
 *
 * FormItem's columnSpan property defines how many columns the form item should expand to inside a form group or the form.
 *
 * ### Items Label Span
 *
 * The placement of the labels depends on the size of the used column.
 * If there is enough space, the labels are next to their associated fields, otherwise  - above the fields.
 * By default, the labels take 4/12 of the FormItem, leaving 8/12 parts to associated fields.
 * You can control what space the labels should take via the `labelSpan` property.
 *
 * **For example:** To always place the labels on top set: `labelSpan="S12 M12 L12 XL12"` property.
 *
 * ### Items Empty Span
 *
 * By default, a form item spans 12 cells, fully divided between its label and field, with no empty space at the end:
 * - **Label:** occupies 4 cells.
 * - **Field:** occupies 8 cells.
 *
 * The `emptySpan` property provides additional layout flexibility by defining empty space at the form item’s end.
 *
 * **For example:** Setting "S0 M0 L3 XL3" (or just "L3 XL3") adjusts the layout as follows:
 * - **Label:** remains 4 cells.
 * - **Field:** is reduced to 5 cells.
 * - **Empty space:** 3 cells are added at the end.
 *
 * Greater values increase the empty space at the end of the form item, reducing the space available for the label and its field.
 * However, setting `emptySpan` to 1 cell is recommended and typically sufficient to achieve a balanced layout.
 *
 * ### Navigation flow
 *
 * The Form component supports two layout options for keyboard navigation:
 *
 * #### Simple form
 *
 * In this "simple form" layout, each `ui5-form-item` acts as a standalone group
 * with one item, so focus moves horizontally across the grid from one `ui5-form-item` to the next.
 * This layout is ideal for simpler forms and supports custom arrangements, e.g.,
 *
 * ```
 * | 1 | 2 |
 * |   3   |
 * | 4 | 5 |
 * ```
 *
 * #### Complex form
 *
 * In this layout, items are grouped into `ui5-form-group` elements, allowing more complex configurations:
 *
 * - **Single-Column Group**: Focus moves vertically down from one item to the next.
 *   ```
 *   | 1 |
 *   | 2 |
 *   | 3 |
 *   ```
 *
 * - **Multi-Column Group**: Focus moves horizontally within each row, advancing to the next row after completing the current one.
 *   ```
 *   | 1 | 4 |
 *   | 2 | 5 |
 *   | 3 | 6 |
 *   ```
 *
 * ### Keyboard Handling
 *
 * - [Tab] - Moves the focus to the next interactive element within the Form/FormGroup (if available) or to the next element in the tab chain outside the Form
 * - [Shift] + [Tab] - Moves the focus to the previous interactive element within the Form/FormGroup (if available) or to the previous element in the tab chain outside the Form
 * - [F6] - Moves the focus to the first interactive element of the next FormGroup (if available) or to the next element in the tab chain outside the Form
 * - [Shift] + [F6] - Moves the focus to the first interactive element of the previous FormGroup (if available) or to the previous element in the tab chain outside the Form
 *
 * ### ES6 Module Import
 *
 * - import @ui5/webcomponents/dist/Form.js";
 * - import @ui5/webcomponents/dist/FormGroup.js";
 * - import @ui5/webcomponents/dist/FormItem.js";
 *
 * @csspart header - Used to style the wrapper of the header.
 * @csspart layout - Used to style the element defining the form column layout.
 * @csspart column - Used to style a single column of the form column layout.
 *
 * @public
 * @since 2.0.0
 * @extends UI5Element
 */
declare class Form extends UI5Element {
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 2.10.0
     */
    accessibleName?: string;
    /**
     * Defines id (or many ids) of the element (or elements) that label the component.
     * @default undefined
     * @public
     * @since 2.16.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessibility mode of the component in "edit" and "display" use-cases.
     *
     * Based on the mode, the component renders different HTML elements and ARIA attributes,
     * which are appropriate for the use-case.
     *
     * **Usage:**
     * - Set this property to "Display", when the form consists of non-editable (e.g. texts) form items.
     * - Set this property to "Edit", when the form consists of editable (e.g. input fields) form items.
     *
     * @default "Display"
     * @since 2.16.0
     * @public
     */
    accessibleMode: `${FormAccessibleMode}`;
    /**
     * Defines the number of columns to distribute the form content by breakpoint.
     *
     * Supported values:
     * - `S` - 1 column by default (1 column is recommended)
     * - `M` - 1 column by default (up to 2 columns are recommended)
     * - `L` - 2 columns by default (up to 3 columns are recommended)
     * - `XL` - 3 columns by default (up to 6 columns  are recommended)
     *
     * @default "S1 M1 L2 XL3"
     * @public
     */
    layout: string;
    /**
     * Defines the width proportion of the labels and fields of a form item by breakpoint.
     *
     * By default, the labels take 4/12 (or 1/3) of the form item in M,L and XL sizes,
     * and 12/12 in S size, e.g in S the label is on top of its associated field.
     *
     * The supported values are between 1 and 12. Greater the number, more space the label will use.
     *
     * **Note:** If "12" is set, the label will be displayed on top of its assosiated field.
     *
     * @default "S12 M4 L4 XL4"
     * @public
     */
    labelSpan: string;
    /**
     * Defines the number of cells that are empty at the end of each form item, configurable by breakpoint.
     *
     * By default, a form item spans 12 cells, fully divided between its label (4 cells) and field (8 cells), with no empty space at the end.
     * The `emptySpan` provides additional layout flexibility by defining empty space at the form item’s end.
     *
     * **Note:**
     * - The maximum allowable empty space is 10 cells. At least 1 cell each must remain for the label and the field.
     * - When `emptySpan` is specified (greater than 0), ensure that the combined value of `emptySpan` and `labelSpan` does not exceed 11. This guarantees a minimum of 1 cell for the field.
     *
     * @default "S0 M0 L0 XL0"
     * @since 2.5.0
     * @public
     */
    emptySpan: string;
    /**
     * Defines the header text of the component.
     *
     * **Note:** The property gets overridden by the `header` slot.
     *
     * @default undefined
     * @public
     */
    headerText?: string;
    /**
     * Defines the compoennt heading level,
     * set by the `headerText`.
     * @default "H2"
     * @since 2.10.0
     * @public
    */
    headerLevel: `${TitleLevel}`;
    /**
     * Defines the vertical spacing between form items.
     *
     * **Note:** If the Form is meant to be switched between "display"("non-edit") and "edit" modes,
     * we recommend using "Large" item spacing in "display"("non-edit") mode, and "Normal" - for "edit" mode,
     * to avoid "jumping" effect, caused by the hight difference between texts in "display"("non-edit") mode and the input fields in "edit" mode.
     *
     * @default "Normal"
     * @public
     */
    itemSpacing: `${FormItemSpacing}`;
    /**
     * Defines the component header area.
     *
     * **Note:** When a `header` is provided, the `headerText` property is ignored.
     * @public
     */
    header: Slot<HTMLElement>;
    /**
     * Defines the component content - FormGroups or FormItems.
     *
     * **Note:** Mixing FormGroups and standalone FormItems (not belonging to a group) is not supported.
     * Either use FormGroups and make sure all FormItems are part of a FormGroup, or use just FormItems without any FormGroups.
     * @public
     */
    items: DefaultSlot<IFormItem>;
    static i18nBundle: I18nBundle;
    /**
     * @private
     */
    columnsS: number;
    labelSpanS: number;
    emptySpanS: number;
    columnsM: number;
    labelSpanM: number;
    emptySpanM: number;
    columnsL: number;
    labelSpanL: number;
    emptySpanL: number;
    columnsXl: number;
    labelSpanXl: number;
    emptySpanXl: number;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    setColumnLayout(): void;
    parseFormItemSpan(): void;
    setFormItemLayout(): void;
    isValidFormItemLayout(labelSpan: number, emptySpan: number): boolean;
    setFastNavGroup(): void;
    setGroupsColSpan(): void;
    getGroupsColSpan(cols: number, groups: number, index: number, group: IFormItem): number;
    setItemsState(): void;
    get hasGroupItems(): boolean;
    get hasHeader(): boolean;
    get hasHeaderText(): boolean;
    get hasCustomHeader(): boolean;
    get effectiveAccessibleName(): string | undefined;
    get effectiveАccessibleNameRef(): string | undefined;
    get effectiveAccessibleRole(): "form" | "region";
    get groupItemsInfo(): Array<GroupItemsInfo>;
    get itemsInfo(): Array<ItemsInfo>;
    getItemsInfo(items?: Array<IFormItem>): Array<ItemsInfo>;
    createAdditionalCSSStyleSheet(): void;
    getAdditionalCSS(step: string, colsNumber: number): string | undefined;
    getCSSStyleSheet(cssText: string): CSSStyleSheet;
}
export default Form;
export type { IFormItem, };
