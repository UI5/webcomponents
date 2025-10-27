import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

import type FormItem from "./FormItem.js";
import type { IFormItem } from "./Form.js";
import type FormItemSpacing from "./types/FormItemSpacing.js";
import type TitleLevel from "./types/TitleLevel.js";

/**
 * @class
 *
 * ### Overview
 *
 * The FormGroup (ui5-form-group) represents a group inside the Form (ui5-form) component
 * and it consists of FormItem (ui5-form-item) components.
 *
 * The layout of the FormGroup is mostly defined and controlled by the overarching Form (ui5-form) component.
 * Still, one can influence the layout via the FormGroup's `columnSpan` property,
 * that defines how many columns the group should expand to.
 *
 * ### Usage
 *
 * Тhe FormGroup (ui5-form-group) allows to split a Form into groups,
 * e.g to group FormItems that logically belong together.
 *
 * ### ES6 Module Import
 *
 * - import @ui5/webcomponents/dist/FormGroup.js";
 *
 * @public
 * @implements {IFormItem}
 * @since 2.0.0
 * @extends UI5Element
 */
@customElement({
	tag: "ui5-form-group",
	fastNavigation: true,
})
class FormGroup extends UI5Element implements IFormItem {
	/**
	 * Defines header text of the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	headerText?: string;

	/**
	 * Defines the compoennt heading level,
	 * set by the `headerText`.
	 * @default "H3"
	 * @public
	 * @since 2.10.0
	*/
	@property()
	headerLevel: `${TitleLevel}` = "H3";

	/**
	 * Defines column span of the component,
	 * e.g how many columns the group should span to.
	 *
	 * @default undefined
	 * @public
	 */
	@property({ type: Number })
	columnSpan?: number;

	/**
	 * Defines the items of the component.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
	})
	items!: Array<FormItem>;

	/**
	 * @private
	 */
	@property({ type: Number })
	colsS = 1;

	@property({ type: Number })
	colsM = 1;

	@property({ type: Number })
	colsL = 1;

	@property({ type: Number })
	colsXl = 1;

	@property()
	itemSpacing: `${FormItemSpacing}` = "Normal";

	onBeforeRendering() {
		this.processFormItems();
	}

	processFormItems() {
		this.items.forEach((item: FormItem) => {
			item.itemSpacing = this.itemSpacing;
		});
	}

	get isGroup() {
		return true;
	}
}

FormGroup.define();

export default FormGroup;
