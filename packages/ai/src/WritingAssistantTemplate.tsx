import Versioning from "./Versioning.js";
import type WritingAssistant from "./WritingAssistant.js";

import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Button from "@ui5/webcomponents/dist/Button.js";

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
				<Versioning
					currentStep={this.currentVersionIndex}
					totalSteps={this.totalVersions}
					onVersionChange={this.handleVersionChange}
				/>
			)}

			{hasResults && this.actionText && (
				<Label class="ui5-ai-writing-assistant-action-label">{this.actionText}</Label>
			)}

			<ToolbarSpacer />

			<Button
				id="ai-menu-btn"
				design="Transparent"
				icon={isBusy ? "stop" : "ai"}
				data-state={isBusy ? "generating" : "generate"}
				onClick={this.handleButtonClick}
				aria-label={isBusy ? "Stop AI Generation" : "AI Writing Assistant (Shift + F4)"}
				title={isBusy ? "Stop AI Generation" : "AI Writing Assistant (Shift + F4)"}
			/>
		</Toolbar>
	);
}
