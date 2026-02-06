import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/config/Tooltips.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isDown,
	isUp,
	isLeft,
	isRight,
	isSpace,
	isEnter,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	RATING_INDICATOR_TEXT,
	RATING_INDICATOR_TOOLTIP_TEXT,
	RATING_INDICATOR_ARIA_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";
import RatingIndicatorTemplate from "./RatingIndicatorTemplate.js";

// Styles
import RatingIndicatorCss from "./generated/themes/RatingIndicator.css.js";
import type RatingIndicatorSize from "./types/RatingIndicatorSize.js";

type Star = {
	selected: boolean,
	index: number,
	halfStar: boolean
}

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

@customElement({
	tag: "ui5-rating-indicator",
	languageAware: true,
	renderer: jsxRenderer,
	styles: RatingIndicatorCss,
	template: RatingIndicatorTemplate,
})
/**
 * The event is fired when the value changes.
 * @public
 */
@event("change", {
	bubbles: true,
})

class RatingIndicator extends UI5Element {
	eventDetails!: {
		change: void,
	}
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
	@property({ type: Number })
	value: number = 0;

	/**
	 * The number of displayed rating symbols.
	 * @default 5
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Number })
	max: number = 5;

	/**
	 * Defines the size of the component.
	 * @default "M"
	 * @public
	 * @since 2.6.0
	 */
	@property()
	size: `${RatingIndicatorSize}` = "M";

	/**
	 * Defines whether the component is disabled.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 1.15.0
	 */
	 @property()
	 accessibleNameRef?: string;

	 /**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 * @since 1.15.0
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines the tooltip of the component.
	 * @default undefined
	 * @public
	 * @since 1.19.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines the icon to be displayed for the selected (filled) rating symbol.
	 *
	 * @default "favorite"
	 * @public
	 * @since 2.20
	 */
	@property()
	iconSelected?: string;

	/**
	 * Defines the icon to be displayed for the unselected (empty) rating symbol.
	 * @default "unfavorite"
	 * @public
	 * @since 2.20
	 */
	@property()
	iconUnselected?: string;

	/**
	 * @private
	 */
	@property({ type: Array })
	_stars: Array<Star> = [];

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_focused = false;

	_liveValue?: number;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();
	}

	onBeforeRendering() {
		this.calcState();
	}

	calcState() {
		this._stars = [];

		for (let i = 1; i < this.max + 1; i++) {
			const remainder = Math.round((this.value - Math.floor(this.value)) * 10);
			let halfStar = false,
				tempValue = this.value;

			if (Math.floor(this.value) + 1 === i && remainder > 2 && remainder < 8) {
				halfStar = true;
			} else if (remainder <= 2) {
				tempValue = Math.floor(this.value);
			} else if (remainder >= 8) {
				tempValue = Math.ceil(this.value);
			}

			this._stars.push({
				selected: i <= tempValue,
				index: i,
				halfStar,
			});
		}
	}

	_onclick(e: MouseEvent) {
		const target = e.target as UI5Element;

		if (!(target instanceof HTMLElement) || this.disabled || this.readonly) {
			return;
		}

		const targetValue = target.getAttribute("data-ui5-value");

		if (targetValue !== null) {
			this.value = parseInt(targetValue);
			if (this.value === this._liveValue) {
				this.value = 0;
			}

			if (this._liveValue !== this.value) {
				this.fireDecoratorEvent("change");
				this._liveValue = this.value;
			}
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (this.disabled || this.readonly) {
			// prevent page scrolling
			if (isSpace(e)) {
				e.preventDefault();
			}

			return;
		}

		const isDecrease = isDown(e) || isLeft(e);
		const isIncrease = isRight(e) || isUp(e);
		const isIncreaseWithReset = isSpace(e) || isEnter(e);
		const isMin = isHome(e);
		const isMax = isEnd(e);
		const isNumber = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105);

		if (isDecrease || isIncrease || isIncreaseWithReset || isMin || isMax || isNumber) {
			e.preventDefault();

			if (isDecrease && this.value > 0) {
				this.value = Math.round(this.value - 1);
			} else if (isIncrease && this.value < this.max) {
				this.value = Math.round(this.value + 1);
			} else if (isIncreaseWithReset) {
				const proposedValue = Math.round(this.value + 1);
				this.value = proposedValue > this.max ? 0 : proposedValue;
			} else if (isMin) {
				this.value = 0;
			} else if (isMax) {
				this.value = this.max;
			} else if (isNumber) {
				const pressedNumber = parseInt(e.key);
				this.value = pressedNumber > this.max ? this.max : pressedNumber;
			}

			this.fireDecoratorEvent("change");
		}
	}

	_onfocusin() {
		if (this.disabled) {
			return;
		}

		this._focused = true;
		this._liveValue = this.value;
	}

	_onfocusout() {
		this._focused = false;
	}

	get effectiveTabIndex() {
		const tabindex = this.getAttribute("tabindex");

		if (this.disabled) {
			return -1;
		}

		return tabindex ? parseInt(tabindex) : 0;
	}

	get ratingTooltip(): string | undefined {
		if (this.tooltip) {
			return this.tooltip;
		}
		return getEnableDefaultTooltips() ? this.defaultTooltip : undefined;
	}

	get defaultTooltip() {
		return RatingIndicator.i18nBundle.getText(RATING_INDICATOR_TOOLTIP_TEXT);
	}

	get _ariaRoleDescription() {
		return RatingIndicator.i18nBundle.getText(RATING_INDICATOR_TEXT);
	}

	get _ariaDisabled() {
		return this.disabled || undefined;
	}

	get _ariaLabel() {
		return getEffectiveAriaLabelText(this);
	}

	get _ariaDescription() {
		return this.required ? RatingIndicator.i18nBundle.getText(RATING_INDICATOR_ARIA_DESCRIPTION) : undefined;
	}

	get ariaReadonly() {
		return this.readonly ? "true" : undefined;
	}

	get effectiveIconSelected() {
		return this.iconSelected || "favorite";
	}

	get effectiveIconUnselected() {
		return this.iconUnselected || "unfavorite";
	}
}

RatingIndicator.define();

export default RatingIndicator;
export type { Star };
