import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { AriaRole } from "@ui5/webcomponents-base";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";

// Template
import FormTemplate from "./FormTemplate.js";

// Styles
import FormCss from "./generated/themes/Form.css.js";

import type FormItemSpacing from "./types/FormItemSpacing.js";
import type FormAccessibleMode from "./types/FormAccessibleMode.js";
import type FormGroup from "./FormGroup.js";
import type TitleLevel from "./types/TitleLevel.js";

import { FORM_ACCESSIBLE_NAME } from "./generated/i18n/i18n-defaults.js";

const additionalStylesMap = new Map<string, string>();

const StepColumn = {
	"S": 1,
	"M": 2,
	"L": 3,
	"XL": 6,
};

const breakpoints = ["S", "M", "L", "Xl"];
const MAX_FORM_ITEM_CELLS = 12;
const DEFAULT_FORM_ITEM_LAYOUT = "4fr 8fr 0fr";
const DEFAULT_FORM_ITEM_LAYOUT_S = "1fr";

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
	groupItem: IFormItem,
	items: Array<ItemsInfo>,
	accessibleName: string | undefined,
	accessibleNameInner: string | undefined,
	accessibleNameRef: string | undefined,
	accessibleNameRefInner: string | undefined,
	role: AriaRole | undefined,
}

type ItemsInfo = {
	item: IFormItem,
}

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
@customElement({
	tag: "ui5-form",
	renderer: jsxRenderer,
	styles: FormCss,
	template: FormTemplate,
})
class Form extends UI5Element {
	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 2.10.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines id (or many ids) of the element (or elements) that label the component.
	 * @default undefined
	 * @public
	 * @since 2.16.0
	 */
	@property()
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
	@property()
	accessibleMode: `${FormAccessibleMode}` = "Display";

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
	@property()
	layout = "S1 M1 L2 XL3"

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
	@property()
	labelSpan = "S12 M4 L4 XL4";

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
	@property()
	emptySpan = "S0 M0 L0 XL0";

	/**
	 * Defines the header text of the component.
	 *
	 * **Note:** The property gets overridden by the `header` slot.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	headerText?: string;

	/**
	 * Defines the compoennt heading level,
	 * set by the `headerText`.
	 * @default "H2"
	 * @since 2.10.0
	 * @public
	*/
	@property()
	headerLevel: `${TitleLevel}` = "H2";

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
	@property()
	itemSpacing: `${FormItemSpacing}` = "Normal";

	/**
	 * Defines the component header area.
	 *
	 * **Note:** When a `header` is provided, the `headerText` property is ignored.
	 * @public
	 */
	@slot()
	header!: Slot<HTMLElement[]>;

	/**
	 * Defines the component content - FormGroups or FormItems.
	 *
	 * **Note:** Mixing FormGroups and standalone FormItems (not belonging to a group) is not supported.
	 * Either use FormGroups and make sure all FormItems are part of a FormGroup, or use just FormItems without any FormGroups.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: true,
	})
	items!: DefaultSlot<IFormItem[]>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	/**
	 * @private
	 */
	@property({ type: Number })
	columnsS = 1;
	@property({ type: Number })
	labelSpanS = 12
	@property({ type: Number })
	emptySpanS = 0

	@property({ type: Number })
	columnsM = 1;
	@property({ type: Number })
	labelSpanM = 4;
	@property({ type: Number })
	emptySpanM = 0

	@property({ type: Number })
	columnsL = 2;
	@property({ type: Number })
	labelSpanL = 4;
	@property({ type: Number })
	emptySpanL = 0

	@property({ type: Number })
	columnsXl = 3;
	@property({ type: Number })
	labelSpanXl = 4;
	@property({ type: Number })
	emptySpanXl = 0;

	onBeforeRendering() {
		// Parse the layout and set it to the FormGroups/FormItems.
		this.setColumnLayout();

		// Parse the labelSpan and emptySpan and set it to the FormGroups/FormItems.
		this.setFormItemLayout();

		// Define how many columns a group should take.
		this.setGroupsColSpan();

		// Set item spacing
		this.setItemsState();
	}

	onAfterRendering() {
		// Create additional CSS for number of columns that are not supported by default.
		this.createAdditionalCSSStyleSheet();

		this.setFastNavGroup();
	}

	setColumnLayout() {
		const layoutArr = this.layout.split(" ");
		layoutArr.forEach((breakpoint: string) => {
			if (breakpoint.startsWith("S")) {
				this.columnsS = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("M")) {
				this.columnsM = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("L")) {
				this.columnsL = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("XL")) {
				this.columnsXl = parseInt(breakpoint.slice(2));
			}
		});
	}

	parseFormItemSpan() {
		this.labelSpan.split(" ").forEach((breakpoint: string) => {
			if (breakpoint.startsWith("S")) {
				this.labelSpanS = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("M")) {
				this.labelSpanM = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("L")) {
				this.labelSpanL = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("XL")) {
				this.labelSpanXl = parseInt(breakpoint.slice(2));
			}
		});

		this.emptySpan.split(" ").forEach((breakpoint: string) => {
			if (breakpoint.startsWith("S")) {
				this.emptySpanS = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("M")) {
				this.emptySpanM = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("L")) {
				this.emptySpanL = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("XL")) {
				this.emptySpanXl = parseInt(breakpoint.slice(2));
			}
		});
	}

	setFormItemLayout() {
		this.parseFormItemSpan();

		[
			{
				breakpoint: "S",
				labelSpan: this.labelSpanS,
				emptySpan: this.emptySpanS,
			},
			{
				breakpoint: "M",
				labelSpan: this.labelSpanM,
				emptySpan: this.emptySpanM,
			},
			{
				breakpoint: "L",
				labelSpan: this.labelSpanL,
				emptySpan: this.emptySpanL,
			},
			{
				breakpoint: "XL",
				labelSpan: this.labelSpanXl,
				emptySpan: this.emptySpanXl,
			},
		].forEach(layout => {
			if (this.isValidFormItemLayout(layout.labelSpan, layout.emptySpan)) {
				const formItemLayout = layout.labelSpan === MAX_FORM_ITEM_CELLS ? `1fr` : `${layout.labelSpan}fr ${MAX_FORM_ITEM_CELLS - (layout.labelSpan + layout.emptySpan)}fr ${layout.emptySpan}fr`;
				this.style.setProperty(getScopedVarName(`--ui5-form-item-layout-${layout.breakpoint}`), formItemLayout);
			} else {
				// eslint-disable-next-line
				console.warn(`Form :: invalid usage of emptySpan and/or labelSpan in ${layout.breakpoint} size. The labelSpan must be <=12 and when emptySpace is used - their combined values must not exceed 11.`)
				this.style.setProperty(getScopedVarName(`--ui5-form-item-layout-${layout.breakpoint}`), layout.breakpoint === "S" ? DEFAULT_FORM_ITEM_LAYOUT_S : DEFAULT_FORM_ITEM_LAYOUT);
			}
		});
	}

	isValidFormItemLayout(labelSpan: number, emptySpan: number) {
		return emptySpan === 0 ? labelSpan <= MAX_FORM_ITEM_CELLS : labelSpan + emptySpan <= MAX_FORM_ITEM_CELLS - 1;
	}

	setFastNavGroup() {
		if (this.hasGroupItems) {
			this.removeAttribute("data-sap-ui-fastnavgroup");
		} else {
			this.setAttribute("data-sap-ui-fastnavgroup", "true");
		}
	}

	setGroupsColSpan() {
		if (!this.hasGroupItems) {
			return;
		}

		const itemsCount = this.items.length;
		const sortedItems = [...this.items].sort((itemA: IFormItem, itemB: IFormItem) => {
			return (itemB as FormGroup)?.items.length - (itemA as FormGroup)?.items.length;
		});

		sortedItems.forEach((item: IFormItem, idx: number) => {
			item.colsXl = this.getGroupsColSpan(this.columnsXl, itemsCount, idx, item);
			item.colsL = this.getGroupsColSpan(this.columnsL, itemsCount, idx, item);
			item.colsM = this.getGroupsColSpan(this.columnsM, itemsCount, idx, item);
			item.colsS = this.getGroupsColSpan(this.columnsS, itemsCount, idx, item);
		});
	}

	getGroupsColSpan(cols: number, groups: number, index: number, group: IFormItem): number {
		// Case 0: column span is set from outside.
		if (group.columnSpan) {
			return group.columnSpan;
		}

		// CASE 1: The number of available columns match the number of groups, or only 1 column is available - each group takes 1 column.
		// For example: 1 column - 1 group, 2 columns - 2 groups, 3 columns - 3 groups, 4columns - 4 groups
		if (cols === 1 || cols <= groups) {
			return 1;
		}

		// CASE 2: The number of available columns IS multiple of the number of groups.
		// For example: 2 column - 1 group, 3 columns - 1 groups, 4 columns - 1 group, 4 columns - 2 groups
		if (cols % groups === 0) {
			return cols / groups;
		}

		// CASE 3: The number of available columns IS NOT multiple of the number of groups.
		const MIN_COL_SPAN = 1;
		const delta = cols - groups;

		// 7 cols & 4 groups => 2, 2, 2, 1
		if (delta <= groups) {
			return index < delta ? MIN_COL_SPAN + 1 : MIN_COL_SPAN;
		}

		// 7 cols & 3 groups => 3, 2, 2
		return index === 0 ? MIN_COL_SPAN + (delta - groups) + 1 : MIN_COL_SPAN + 1;
	}

	setItemsState() {
		this.items.forEach((item: IFormItem) => {
			item.itemSpacing = this.itemSpacing;
			item.accessibleMode = this.accessibleMode;
		});
	}

	get hasGroupItems(): boolean {
		return this.items.some((item: IFormItem) => item.isGroup);
	}

	get hasHeader(): boolean {
		return this.hasCustomHeader || this.hasHeaderText;
	}

	get hasHeaderText(): boolean {
		return !!this.headerText;
	}

	get hasCustomHeader(): boolean {
		return !!this.header.length;
	}

	get effectiveAccessibleName() {
		if (this.accessibleName || this.accessibleNameRef) {
			return getEffectiveAriaLabelText(this);
		}

		return this.hasHeader ? undefined : Form.i18nBundle.getText(FORM_ACCESSIBLE_NAME);
	}

	get effectiveАccessibleNameRef(): string | undefined {
		if (this.accessibleName || this.accessibleNameRef) {
			return;
		}

		return this.hasHeaderText && !this.hasCustomHeader ? `${this._id}-header-text` : undefined;
	}

	get effectiveAccessibleRole() {
		return this.hasGroupItems ? "region" : "form";
	}

	get groupItemsInfo(): Array<GroupItemsInfo> {
		return this.items.map((groupItem: IFormItem, index: number) => {
			const items = this.getItemsInfo((Array.from(groupItem.children) as Array<IFormItem>));
			breakpoints.forEach(breakpoint => {
				const cols = ((groupItem[`cols${breakpoint}` as keyof IFormItem]) as number || 1);
				const rows = Math.ceil(items.length / cols);
				const total = cols * rows;
				const lastRowColumns = (cols - (total - items.length) - 1); // all other indecies start from 0
				let currentItem = 0;

				for (let i = 0; i < total; i++) {
					const column = Math.floor(i / rows);
					const row = i % rows;

					if (row === rows - 1 && column > lastRowColumns) {
						// eslint-disable-next-line no-continue
						continue;
					}

					items[currentItem].item.style.setProperty(getScopedVarName(`--ui5-form-item-order-${breakpoint}`), `${column + row * cols}`);
					currentItem++;
				}
			});

			const accessibleNameRef = (groupItem as FormGroup).effectiveAccessibleNameRef;

			return {
				groupItem,
				accessibleName: this.accessibleMode === "Edit" ? (groupItem as FormGroup).getEffectiveAccessibleName(index) : undefined,
				accessibleNameInner: this.accessibleMode === "Edit" ? undefined : (groupItem as FormGroup).getEffectiveAccessibleName(index),
				accessibleNameRef: this.accessibleMode === "Edit" ? accessibleNameRef : undefined,
				accessibleNameRefInner: this.accessibleMode === "Edit" ? undefined : accessibleNameRef,
				items: this.getItemsInfo((Array.from(groupItem.children) as Array<IFormItem>)),
				role: this.accessibleMode === "Edit" ? "form" : undefined,
			};
		});
	}

	get itemsInfo(): Array<ItemsInfo> {
		return this.getItemsInfo();
	}

	getItemsInfo(items?: Array<IFormItem>): Array<ItemsInfo> {
		return (items || this.items).map((item: IFormItem) => {
			return {
				item,
				// eslint-disable-next-line
				// TODO: remove classes and classMap after deleting the hbs template
				classes: item.columnSpan ? `ui5-form-item-span-${item.columnSpan}` : "",
				classMap: {
					[`ui5-form-item-span-${item.columnSpan}`]: item.columnSpan !== undefined,
				},
			};
		});
	}

	createAdditionalCSSStyleSheet() {
		[
			{ breakpoint: "S", columns: this.columnsS },
			{ breakpoint: "M", columns: this.columnsM },
			{ breakpoint: "L", columns: this.columnsL },
			{ breakpoint: "XL", columns: this.columnsXl },
		].forEach(step => {
			const additionalStyle: string | undefined = this.getAdditionalCSS(step.breakpoint, step.columns);

			if (additionalStyle) {
				this.shadowRoot!.adoptedStyleSheets = [...this.shadowRoot!.adoptedStyleSheets, this.getCSSStyleSheet(additionalStyle)];
			}
		});
	}

	getAdditionalCSS(step: string, colsNumber: number): string | undefined {
		if (StepColumn[step as keyof typeof StepColumn] >= colsNumber) {
			return;
		}

		const key = `${step}-${colsNumber}`;

		if (!additionalStylesMap.has(key)) {
			let containerQuery;
			let supporedColumnsNumber = StepColumn.S;
			let stepSpanCSS = "";
			let cols = colsNumber;

			if (step === "S") {
				supporedColumnsNumber = StepColumn.S;
				containerQuery = `@container (max-width: 599px) {`;
			} else if (step === "M") {
				supporedColumnsNumber = StepColumn.M;
				containerQuery = `@container (width > 599px) and (width < 1024px) {`;
			} else if (step === "L") {
				supporedColumnsNumber = StepColumn.L;
				containerQuery = `@container (width > 1023px) and (width < 1439px) {`;
			} else if (step === "XL") {
				containerQuery = `@container (min-width: 1440px) {`;
				supporedColumnsNumber = StepColumn.XL;
			}

			while (cols > supporedColumnsNumber) {
				stepSpanCSS += `
				:host([columns-${step.toLocaleLowerCase()}="${cols}"]) .ui5-form-layout {
					grid-template-columns: repeat(${cols}, 1fr);
				}

				.ui5-form-column-span${step}-${cols},
				.ui5-form-item-span-${cols} {
					grid-column: span ${cols};
				}

				.ui5-form-column-span${step}-${cols} .ui5-form-group-layout {
					grid-template-columns: repeat(${cols}, 1fr);
				}
				`;
				cols--;
			}

			const css = `${containerQuery}${stepSpanCSS}}`;
			additionalStylesMap.set(key, css);
		}

		return additionalStylesMap.get(key)!;
	}

	getCSSStyleSheet(cssText: string): CSSStyleSheet {
		const style = new CSSStyleSheet();
		style.replaceSync(cssText);
		return style;
	}
}

Form.define();

export default Form;
export type {
	IFormItem,
};
