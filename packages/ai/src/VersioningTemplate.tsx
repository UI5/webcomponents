import type Versioning from "./Versioning.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

export default function VersioningTemplate(this: Versioning) {
	return <>
		<div id="versioning-history">
			<Button
				design="Transparent"
				icon="navigation-left-arrow"
				title="Previous Version (Shift+Ctrl+Z)"
				disabled={this.currentStep <= 1}
				onClick={this.handlePreviousVersionClick}
				data-ui5-versioning-button="previous"
			></Button>
			<Label class="version-step-counter">
				{this.currentStep} / {this.totalSteps}
			</Label>
			<Button
				design="Transparent"
				icon="navigation-right-arrow"
				title="Next Version (Shift+Ctrl+Y)"
				disabled={this.totalSteps === 0 || this.currentStep === this.totalSteps}
				onClick={this.handleNextVersionClick}
				data-ui5-versioning-button="next"
			></Button>
		</div>
	</>;
}
