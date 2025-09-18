import Versioning from "./Versioning.js";
import type AITextAreaToolbar from "./AITextAreaToolbar.js";

import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Button from "@ui5/webcomponents-ai/dist/Button.js";
import ButtonState from "@ui5/webcomponents-ai/dist/ButtonState.js";

export default function AITextAreaToolbarTemplate(this: AITextAreaToolbar) {
	const isBusy = this.assistantState === "Loading";
	const isInitial = this.assistantState === "Initial";
	const hasResults = this.totalVersions > 0;
	const showVersion = hasResults && this.totalVersions > 1;

	return (
		<Toolbar
			class={`ui5-ai-writing-assistant-footer-bar ${(hasResults || isBusy) ? "ui5-ai-writing-assistant-footer-bar--with-border" : ""}`}
		>
			{showVersion && (
				<Versioning
					currentStep={this.currentVersionIndex}
					totalSteps={this.totalVersions}
					onPreviousVersionClick={this.handlePreviousVersionClick}
					onNextVersionClick={this.handleNextVersionClick}
				/>
			)}

			{(hasResults || isBusy) && (
				<Label class="ui5-ai-writing-assistant-action-label">{this.actionText}</Label>
			)}

			<ToolbarSpacer />

			<Button
				id="ai-menu-btn"
				design="Transparent"
				state={isBusy ? "generating" : "generate"}
				title="AI Writing Assistant (Shift + F4)"
				onClick={this._handleGenerateClick}
			>
				<ButtonState name="generate" icon="ai" />
				<ButtonState name="generating" icon="stop" />
			</Button>
		</Toolbar>
	);
}
