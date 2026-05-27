import type ToolbarLabel from "./ToolbarLabel.js";

export default function ToolbarLabelTemplate(this: ToolbarLabel) {
	return (
		<span class="ui5-ai-toolbar-label">
			{this.text}
		</span>
	);
}
