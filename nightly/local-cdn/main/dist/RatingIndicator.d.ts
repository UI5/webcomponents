import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type RatingIndicatorSize from "./types/RatingIndicatorSize.js";
type Star = {
    selected: boolean;
    index: number;
    halfStar: boolean;
};
/**
 * @class
 *
 * ### Overview
 * The Rating Indicator is used to display a specific number of icons that are used to rate an item.
 * Additionally, it is also used to display the average and overall ratings.
 *
 * ### Usage
 * The recommended number of icons is between 5 and 7.
 *
 * ### Responsive Behavior
 * You can change the size of the Rating Indicator by changing its `font-size` CSS property.
 *
 * Example: `<ui5-rating-indicator style="font-size: 3rem;"></ui5-rating-indicator>`
 *
 * ### Keyboard Handling
 * When the `ui5-rating-indicator` is focused, the user can change the rating
 * with the following keyboard shortcuts:
 *
 * - [RIGHT/UP] - Increases the value of the rating by one step. If the highest value is reached, does nothing
 * - [LEFT/DOWN] - Decreases the value of the rating by one step. If the lowest value is reached, does nothing.
 * - [Home] - Sets the lowest value.
 * - [End] - Sets the highest value.
 * - [SPACE/ENTER/RETURN] - Increases the value of the rating by one step. If the highest value is reached, sets the rating to the lowest value.
 * - Any number - Changes value to the corresponding number. If typed number is larger than the number of values, sets the highest value.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/RatingIndicator.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
declare class RatingIndicator extends UI5Element {
    eventDetails: {
        change: void;
    };
    /**
     * The indicated value of the rating.
     *
     * **Note:** If you set a number which is not round, it would be shown as follows:
     *
     * - 1.0 - 1.2 -> 1
     * - 1.3 - 1.7 -> 1.5
     * - 1.8 - 1.9 -> 2
     * @default 0
     * @public
     */
    value: number;
    /**
     * The number of displayed rating symbols.
     * @default 5
     * @public
     * @since 1.0.0-rc.15
     */
    max: number;
    /**
     * Defines the size of the component.
     * @default "M"
     * @public
     * @since 2.6.0
     */
    size: `${RatingIndicatorSize}`;
    /**
     * Defines whether the component is disabled.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines whether the component is read-only.
     *
     * **Note:** A read-only component is not editable,
     * but still provides visual feedback upon user interaction.
     * @default false
     * @public
     */
    readonly: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.15.0
     */
    accessibleNameRef?: string;
    /**
    * Defines whether the component is required.
    * @default false
    * @public
    * @since 1.15.0
    */
    required: boolean;
    /**
     * Defines the tooltip of the component.
     * @default undefined
     * @public
     * @since 1.19.0
     */
    tooltip?: string;
    /**
     * Defines the icon to be displayed for the selected (filled) rating symbol.
     *
     * @default "favorite"
     * @public
     * @since 2.20
     */
    iconSelected?: string;
    /**
     * Defines the icon to be displayed for the unselected (empty) rating symbol.
     * @default "unfavorite"
     * @public
     * @since 2.20
     */
    iconUnselected?: string;
    /**
     * @private
     */
    _stars: Array<Star>;
    /**
     * @private
     */
    _focused: boolean;
    _liveValue?: number;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    calcState(): void;
    _onclick(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onfocusin(): void;
    _onfocusout(): void;
    get effectiveTabIndex(): number;
    get ratingTooltip(): string | undefined;
    get defaultTooltip(): string;
    get _ariaRoleDescription(): string;
    get _ariaDisabled(): true | undefined;
    get _ariaLabel(): string | undefined;
    get _ariaDescription(): string | undefined;
    get ariaReadonly(): "true" | undefined;
    get effectiveIconSelected(): string;
    get effectiveIconUnselected(): string;
}
export default RatingIndicator;
export type { Star };
