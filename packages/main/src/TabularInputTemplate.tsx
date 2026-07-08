import InputTemplate from "./InputTemplate.js";
import type Input from "./Input.js";
import type TabularInput from "./TabularInput.js";
import TabularInputPopoverTemplate from "./TabularInputPopoverTemplate.js";

export default function TabularInputTemplate(this: TabularInput) {
	return InputTemplate.call(this as unknown as Input, {
		preContent: tabularPreContent.bind(this),
		postContent: tabularPostContent.bind(this),
		popoverTemplate: tabularPopoverTemplate.bind(this),
	});
}

function tabularPreContent(this: TabularInput) {
	// No pre-content needed for TabularInput
}

function tabularPostContent(this: TabularInput) {
	// No post-content needed for TabularInput
}

function tabularPopoverTemplate(this: TabularInput) {
	if (!this._useTabularSuggestions) {
		return;
	}

	return TabularInputPopoverTemplate.call(this);
}
