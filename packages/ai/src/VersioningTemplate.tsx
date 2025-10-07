import type Versioning from "./Versioning.js";
import ToolbarLabel from "./ToolbarLabel.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import Button from "@ui5/webcomponents/dist/Button.js";

export default function VersioningTemplate(this: Versioning) {
	return (
		<>
			<ToolbarButton
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
			<ToolbarButton
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

export function InputVersioningTemplate(this: Versioning) {
	return (<>
		<Button
			id="arrow-left"
			// slot="endContent"
			design="Transparent"
			icon="navigation-left-arrow"
			accessibleName={this._previousButtonAccessibleName}
			disabled={this.currentStep <= 1}
			onClick={this.handlePreviousVersionClick}
			data-ui5-versioning-button="previous"
		></Button>
		<Button
			id="arrow-right"
			// slot="endContent"
			design="Transparent"
			icon="navigation-right-arrow"
			accessibleName={this._nextButtonAccessibleName}
			disabled={this.currentStep >= this.totalSteps}
			onClick={this.handleNextVersionClick}
			data-ui5-versioning-button="next"
		></Button>
	</>);
}
