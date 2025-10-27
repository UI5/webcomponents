import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, i18n, property } from "@ui5/webcomponents-base/dist/decorators.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

import SliderTooltipTemplate from "./SliderTooltipTemplate.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SliderTooltipCss from "./generated/themes/SliderTooltip.css.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { isEnter, isF2, isTabNext } from "@ui5/webcomponents-base/dist/Keys.js";
import type Input from "./Input.js";

import {
	SLIDER_TOOLTIP_INPUT_LABEL,
} from "./generated/i18n/i18n-defaults.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { Interval } from "@ui5/webcomponents-base/dist/types.js";

type SliderTooltipChangeEventDetails = {
	value: string,
};

/**
 * @class
 *
 * ### Overview
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-slider-tooltip",
	renderer: jsxRenderer,
	template: SliderTooltipTemplate,
	styles: SliderTooltipCss,
})

@event("change")

@event("forward-focus")

class SliderTooltip extends UI5Element {
	eventDetails!: {
		"change": SliderTooltipChangeEventDetails,
		"forward-focus": void
	};

	@property()
	value?: string;

	@property()
	inputValue?: string;

	@property({ type: Boolean })
	open = false;

	@property({ type: Number })
	min = 0;

	@property({ type: Number })
	max = 100;

	@property({ type: Boolean })
	editable = false;

	@property()
	valueState: `${ValueState}` = "None";

	@property({ type: Object })
	followRef?: HTMLElement;

	_repoisitionInterval?: Interval;
	_repositionTooltipBound: () => void;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._repositionTooltipBound = this.repositionTooltip.bind(this);
	}

	onBeforeRendering(): void { }

	onAfterRendering(): void {
		if (!this.hasAttribute("popover")) {
			this.setAttribute("popover", "manual");
		}

		if (this.isConnected) {
			if (this.open) {
				this.showPopover();
				this.repositionTooltip();
				this.attachGlobalScrollHandler();
			} else {
				this.hidePopover();
				this.detachGlobalScrollHandler();
			}
		}
	}

	repositionTooltip(): void {
		const followRefRect = this.followRef?.getBoundingClientRect();
		if (!followRefRect) {
			return;
		}

		this.style.top = `${followRefRect.top}px`;

		// center the tooltip's mid and opener's mid
		const tooltipWidth = this.offsetWidth;
		const followRefWidth = followRefRect.width;

		const tooltipMidX = tooltipWidth / 2;
		const followRefMidX = followRefWidth / 2;

		this.style.left = `${followRefRect.left + followRefMidX - tooltipMidX}px`;

		// enable RTL support
		this.style.right = "auto";
	}

	isValueValid(value: string): boolean {
		return parseFloat(value) >= this.min && parseFloat(value) <= this.max;
	}

	attachGlobalScrollHandler() {
		document.addEventListener("scroll", this._repositionTooltipBound, { capture: true });
	}

	detachGlobalScrollHandler() {
		document.removeEventListener("scroll", this._repositionTooltipBound, { capture: true });
	}

	_keydown(e: KeyboardEvent) {
		if (isF2(e) || isTabNext(e)) {
			e.preventDefault();

			if (!this.isValueValid(this.inputRef.value)) {
				const value = this.value;
				this.inputRef.value = value || "";
			}

			this.valueState = ValueState.None;

			this.fireDecoratorEvent("change", { value: this.inputRef.value });
			this.fireDecoratorEvent("forward-focus");
		}

		if (isEnter(e)) {
			if (!this.isValueValid(this.inputRef.value)) {
				this.valueState = ValueState.Negative;

				return;
			}

			this.valueState = ValueState.None;

			this.fireDecoratorEvent("change", { value: this.inputRef.value });
		}
	}

	_onInputFocusin() {
		requestAnimationFrame(() => {
			this.hidePopover();
			this.showPopover();
		});
	}

	_onInputFocusOut(e: FocusEvent) {
		if (!this.isValueValid(this.inputRef.value)) {
			const value = this.value;
			this.inputRef.value = value || "";
		}

		const relatedTarget = e.relatedTarget as HTMLElement;

		if (!this.parentElement?.contains(relatedTarget)) {
			this.hidePopover();
		}
	}

	get inputRef() {
		return this.shadowRoot?.querySelector("ui5-input") as Input;
	}

	get _ariaLabelledByInputText() {
		return SliderTooltip.i18nBundle.getText(SLIDER_TOOLTIP_INPUT_LABEL);
	}
}

SliderTooltip.define();

export type {
	SliderTooltipChangeEventDetails,
};

export default SliderTooltip;
