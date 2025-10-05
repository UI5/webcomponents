import type Versioning from "./Versioning.js";
import VersioningButton from "./VersioningButton.js";
import ToolbarLabel from "./ToolbarLabel.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

export default function VersioningTemplate(this: Versioning) {
	return (
		<>
			<VersioningButton
				design="Transparent"
				icon="navigation-left-arrow"
				accessibleName={this._previousButtonAccessibleName}
				disabled={this.currentStep <= 1}
				onClick={this.handlePreviousVersionClick}
				data-ui5-versioning-button="previous"
			/>
			<ToolbarLabel
				text={`${this.currentStep} / ${this.totalSteps}`}
				class="version-step-counter"
			/>
			<VersioningButton
				design="Transparent"
				icon="navigation-right-arrow"
				accessibleName={this._nextButtonAccessibleName}
				disabled={this.totalSteps <= 0 || this.currentStep >= this.totalSteps}
				onClick={this.handleNextVersionClick}
				data-ui5-versioning-button="next"
			/>
		</>
	);
}
