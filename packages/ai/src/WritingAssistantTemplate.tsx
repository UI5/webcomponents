import type WritingAssistant from "./WritingAssistant.js";
import VersioningButton from "./VersioningButton.js";
import ToolbarLabel from "./ToolbarLabel.js";

import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";

import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

export default function WritingAssistantTemplate(this: WritingAssistant) {
	const isBusy = this.assistantState === "Loading";
	const isMultiResults = this.totalVersions > 1;
	const hasResults = (this.totalVersions > 0 && this.actionText) || isBusy;

	return (
		<Toolbar
			accessibleName="AI Writing Assistant Toolbar"
			aria-roledescription="toolbar"
			class={`ui5-ai-writing-assistant-footer-bar${hasResults ? "--with-border" : ""}`}
		>
			{isMultiResults && !isBusy && (
				<>
					<VersioningButton
						design="Transparent"
						icon="navigation-left-arrow"
						accessibleName={this._previousButtonAccessibleName}
						disabled={this.currentVersionIndex <= 1}
						backwards={true}
						onVersionNavigate={this.handleVersionChange}
						data-ui5-versioning-button="previous"
						overflowPriority="Default"
					/>
					<ToolbarLabel
						text={`${this.currentVersionIndex} / ${this.totalVersions}`}
						class="version-step-counter"
						overflowPriority="Default"
					/>
					<VersioningButton
						design="Transparent"
						icon="navigation-right-arrow"
						accessibleName={this._nextButtonAccessibleName}
						disabled={this.totalVersions <= 0 || this.currentVersionIndex >= this.totalVersions}
						backwards={false}
						onVersionNavigate={this.handleVersionChange}
						data-ui5-versioning-button="next"
						overflowPriority="Default"
					/>
				</>
			)}

			{hasResults && this.actionText && (
				<ToolbarLabel
					text={this.actionText}
					class="ui5-ai-writing-assistant-action-label"
					overflowPriority="Default"
				/>
			)}

			<ToolbarSpacer />

			<ToolbarButton
				id="ai-menu-btn"
				design="Transparent"
				icon={isBusy ? "stop" : "ai"}
				data-state={isBusy ? "generating" : "generate"}
				onClick={this.handleButtonClick}
				overflowPriority="NeverOverflow"
			/>
		</Toolbar>
	);
}
