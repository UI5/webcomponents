import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
declare class FormGroup extends UI5Element implements IFormItem {
    /**
     * Defines header text of the component.
     *
     * @default undefined
     * @public
     */
    headerText?: string;
    /**
     * Defines the compoennt heading level,
     * set by the `headerText`.
     * @default "H3"
     * @public
     * @since 2.10.0
    */
    headerLevel: `${TitleLevel}`;
    /**
     * Defines column span of the component,
     * e.g how many columns the group should span to.
     *
     * @default undefined
     * @public
     */
    columnSpan?: number;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 2.16.0
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
     * Defines the items of the component.
     * @public
     */
    items: DefaultSlot<FormItem>;
    /**
     * @private
     */
    colsS: number;
    colsM: number;
    colsL: number;
    colsXl: number;
    itemSpacing: `${FormItemSpacing}`;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    processFormItems(): void;
    getEffectiveAccessibleName(index: number): string | undefined;
    get effectiveAccessibleNameRef(): string | undefined;
    get isGroup(): boolean;
}
export default FormGroup;
