import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
/**
 * @class
 *
 * ### Overview
 * Shows the progress of a process in a graphical way. To indicate the progress,
 * the inside of the component is filled with a color.
 *
 * ### Responsive Behavior
 * You can change the size of the Progress Indicator by changing its `width` or `height` CSS properties.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ProgressIndicator.js";`
 * @csspart bar - Used to style the main bar of the `ui5-progress-indicator`
 * @csspart remaining-bar - Used to style the remaining bar of the `ui5-progress-indicator`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
declare class ProgressIndicator extends UI5Element {
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.16.0
    */
    accessibleName?: string;
    /**
     * Defines whether the component value is shown.
     * @default false
     * @public
     */
    hideValue: boolean;
    /**
     * Specifies the numerical value in percent for the length of the component.
     *
     * **Note:**
     * If a value greater than 100 is provided, the percentValue is set to 100. In other cases of invalid value, percentValue is set to its default of 0.
     * @default 0
     * @public
     */
    value: number;
    /**
     * Specifies the text value to be displayed in the bar.
     *
     * **Note:**
     *
     * - If there is no value provided or the value is empty, the default percentage value is shown.
     * - If `hideValue` property is `true` both the `displayValue` and `value` property values are not shown.
     * @default undefined
     * @public
     */
    displayValue?: string;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    static i18nBundle: I18nBundle;
    _previousValue: number;
    _transitionDuration: number;
    constructor();
    onBeforeRendering(): void;
    valueStateTextMappings(): Record<string, string>;
    get validatedValue(): number;
    get showValueInRemainingBar(): boolean;
    get shouldAnimate(): boolean;
    get valueStateText(): string;
    get showIcon(): boolean;
}
export default ProgressIndicator;
