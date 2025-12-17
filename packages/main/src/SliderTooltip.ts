import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, i18n, property } from "@ui5/webcomponents-base/dist/decorators.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

import SliderTooltipTemplate from "./SliderTooltipTemplate.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SliderTooltipCss from "./generated/themes/SliderTooltip.css.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import type Input from "./Input.js";

import {
	SLIDER_TOOLTIP_INPUT_LABEL,
} from "./generated/i18n/i18n-defaults.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { Interval } from "@ui5/webcomponents-base/dist/types.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";

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

/**
 * Fired when the value is confirmed by user interaction (Enter key or focusout)
 */
@event("change")

/**
 * Fired when the value is changed by user interaction
 */
@event("input")

/**
 * Fired when the tooltip is opened or closed
 */
@event("open")

/**
 * Fired when the tooltip focus changes
 */
@event("focus-change")

class SliderTooltip extends UI5Element {
	eventDetails!: {
		"change": SliderTooltipChangeEventDetails,
		"focus-change": void,
		"open": void,
		"input": {
			value?: string,
		},
	};

	@property()
	value = "";

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
	_open: boolean = false;

	constructor() {
		super();

		this._repositionTooltipBound = this.repositionTooltip.bind(this);
	}

	onBeforeRendering(): void {
		if (this.open !== this._open) {
			this.fireDecoratorEvent("open");
		}

		this._open = this.open;
	}

	onAfterRendering(): void {
		if (!this.hasAttribute("popover")) {
			this.setAttribute("popover", "manual");
		}

		// Workaround to skip DOM state
		if (this.inputRef && this.inputRef.value !== this.value) {
			this.inputRef.value = this.value;
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

	attachGlobalScrollHandler() {
		document.addEventListener("scroll", this._repositionTooltipBound, { capture: true });
	}

	detachGlobalScrollHandler() {
		document.removeEventListener("scroll", this._repositionTooltipBound, { capture: true });
	}

	_onInputFocusin() {
		requestAnimationFrame(() => {
			this.hidePopover();
			this.showPopover();
		});
	}

	_onInputKeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this.fireDecoratorEvent("change", { value: (e.target as Input).value });
		}
	}

	_onInputInput() {
		this.fireDecoratorEvent("input", { value: this.inputRef?.value });
	}

	_onInputFocusOut(e: FocusEvent) {
		const relatedTarget = e.relatedTarget as HTMLElement;

		if (!this.parentElement?.contains(relatedTarget)) {
			this.hidePopover();
		}

		this.fireDecoratorEvent("change", { value: (e.target as Input).value });
		this.fireDecoratorEvent("focus-change");
	}

	get _ariaLabelledByInputText() {
		return SliderTooltip.i18nBundle.getText(SLIDER_TOOLTIP_INPUT_LABEL);
	}

	get inputRef() {
		return this.shadowRoot?.querySelector<Input>("[ui5-input]");
	}
}

SliderTooltip.define();

export type {
	SliderTooltipChangeEventDetails,
};

export default SliderTooltip;
