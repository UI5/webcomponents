import type AiWritingAssistant from "./AITextArea.js";
import AITextAreaToolbar from "./AITextAreaToolbar.js";

export default function AiWritingAssistantTemplate(this: AiWritingAssistant) {
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<div class="ui5-ai-writing-assistant-root">
				<AITextAreaToolbar
					assistantState={this.assistantState}
					currentVersionIndex={this.currentVersionIndex}
					totalVersions={this.totalVersions}
					actionText={this.actionText}
					onGenerateClick={this.handleGenerateClick}
					onStopGeneration={this.handleStopGeneration}
					onPreviousVersionClick={this._handlePreviousVersionClick}
					onNextVersionClick={this._handleNextVersionClick}
				/>
			</div>

			<div id="ai-menu-wrapper">
				<slot name="menu"></slot>
			</div>
		</div>
	);
}
