import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

// Styles
import Input from "./Input.js";
import { property } from "@ui5/webcomponents-base/dist/decorators.js";
import { isDesktop, isPhone, isTablet } from "@ui5/webcomponents-base/dist/Device.js";

/**
 * Extention of the UI5 Input, so we do not modify Input's private properties within the datetime components.
 * Intended to be used for the DateTime components.
 *
 * @class
 * @private
 */
@customElement({
	tag: "ui5-datetime-input",
})

class DateTimeInput extends Input {
	@property({ noAttribute: true })
	_shouldOpenValueStatePopover = false;

	/**
	 * Prevents the value state message popover from appearing when a responsive popover (like time selection) is open
	 * since the responsive popover already includes the necessary information in its header.
	 *
	 * @protected
	 * @override
	 */
	get hasValueStateMessage() {
		return this._shouldOpenValueStatePopover && super.hasValueStateMessage && !this._isMobileDevice;
	}

	get _isMobileDevice() {
		return !isDesktop() && (isPhone() || isTablet());
	}

	/**
	 * Override to handle nested slot structure from DatePicker -> DateTimeInput slot forwarding.
	 * Assumes DateTimeInput always has slot-within-slot structure for valueStateMessage.
	 * @override
	 */
	get ariaValueStateHiddenText(): string | undefined {
		if (!this.hasValueState) {
			return;
		}

		const valueState = this.valueState !== ValueState.None ? this.valueStateTypeMappings[this.valueState] : "";

		if (this.shouldDisplayDefaultValueStateMessage) {
			return this.valueStateText ? `${valueState} ${this.valueStateText}` : valueState;
		}

		// Handle the specific nested slot case: outer slot -> inner slot -> actual content
		if (this.valueStateMessage.length) {
			const outerSlot = this.valueStateMessage[0];
			if (outerSlot.tagName === "SLOT") {
				const assignedNodes = (outerSlot as HTMLSlotElement).assignedNodes({ flatten: true });
				const textContent = assignedNodes
					.map(node => node.textContent || "")
					.join(" ")
					.trim();
				return textContent ? `${valueState} ${textContent}` : valueState;
			}
			// Fallback for non-slot content
			return `${valueState} ${outerSlot.textContent || ""}`.trim();
		}

		return valueState;
	}
}

DateTimeInput.define();

export default DateTimeInput;
