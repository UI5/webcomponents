import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import Versioning from "./Versioning.js";
import VersioningCss from "./generated/themes/Versioning.css.js";
import InputVersioningTemplate from "./InputVersioningTemplate.jsx";
import type Button from "./Button.js";

@customElement({
	tag: "ui5-ai-input-versioning",
	renderer: jsxRenderer,
	styles: VersioningCss,
	template: InputVersioningTemplate,
	dependencies: [
		Versioning,
		// Toolbar,
		// ToolbarSpacer,
		// Label,
		// Button,
	],
})

class InputVersioning extends Versioning {
	onAfterRendering(): void {
		// super.onAfterRendering();
		// this._manageFocus();
	}
	handlePreviousVersionClick(): void {
		super.handlePreviousVersionClick();
		this._manageFocus();
	}

	_manageFocus() {
		const previousButton = this.shadowRoot?.querySelectorAll("ui5-button")[0] as Button;
		const nextButton = this.shadowRoot?.querySelectorAll("ui5-button")[1] as Button;
		const isPreviousDisabled = this.currentStep <= 1;
		const isNextDisabled = this.currentStep >= this.totalSteps;

		if (isPreviousDisabled && previousButton) {
			// queueMicrotask(() => nextButton.focus());
			// if (nextButton && nextButton.getDomRef()) {
			// if (nextButton.disabled) {
			// nextButton.disabled = false;
			// }
			// setTimeout( () => {
			nextButton.focus();
			// previousButton.disabled = true;
			// }, 0)
			// }
		} else if (isNextDisabled && nextButton) {
			// if (previousButton && previousButton.getDomRef()) {
			// if(previousButton.disabled) {
			// previousButton.disabled = false;
			// }
			// setTimeout( () => {
			previousButton.focus();
			// nextButton.disabled = true;
			// }, 0);
			// }
		}
	}
}

InputVersioning.define();

export default InputVersioning;
