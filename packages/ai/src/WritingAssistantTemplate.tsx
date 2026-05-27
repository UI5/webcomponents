import type WritingAssistant from "./WritingAssistant.js";
import Versioning from "./Versioning.js";
import ToolbarLabel from "./ToolbarLabel.js";

import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";

export default function WritingAssistantTemplate(this: WritingAssistant) {
	const isMultiResults = this.totalVersions > 1;
	const hasResults = (this.totalVersions > 0 && this.promptDescription) || this.loading;

	return (
		<Toolbar
			accessibleName={this._toolbarAccessibleName}
			aria-roledescription="toolbar"
			class={`ui5-ai-writing-assistant-footer-bar${hasResults ? "--with-border" : ""}`}
		>
			{isMultiResults && !this.loading && (
				<Versioning
					currentStep={this.currentVersion}
					totalSteps={this.totalVersions}
					onVersion-change={this.handleVersionChange}
				/>
			)}

			{hasResults && this.promptDescription && (
				<ToolbarLabel
					text={this.promptDescription}
					class="ui5-ai-writing-assistant-action-label"
				/>
			)}

			<ToolbarSpacer />

			{this.focused && (
				<ToolbarButton
					id="ai-menu-btn"
					design="Transparent"
					icon={this.loading ? "stop" : "ai"}
					data-state={this.loading ? "generating" : "generate"}
					onClick={this.handleButtonClick}
					tooltip={this.loading ? this._stopTooltip : this._buttonTooltip}
					accessibilityAttributes={{ hasPopup: this.loading ? "false" : "menu" }}
					accessibleName={this._buttonAccessibleName}
					overflowPriority="NeverOverflow"
				/>
			)}
		</Toolbar>
	);
}
