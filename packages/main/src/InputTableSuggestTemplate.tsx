import InputTemplate from "./InputTemplate.js";
import type Input from "./Input.js";
import type InputTableSuggest from "./InputTableSuggest.js";
import InputTableSuggestPopoverTemplate from "./InputTableSuggestPopoverTemplate.js";

export default function InputTableSuggestTemplate(this: InputTableSuggest) {
	return InputTemplate.call(this as unknown as Input, {
		preContent: tabularPreContent.bind(this),
		postContent: tabularPostContent.bind(this),
		popoverTemplate: tabularPopoverTemplate.bind(this),
	});
}

function tabularPreContent(this: InputTableSuggest) {}
function tabularPostContent(this: InputTableSuggest) {}

function tabularPopoverTemplate(this: InputTableSuggest) {
	if (!this._useTableSuggestions) {
		return;
	}

	return InputTableSuggestPopoverTemplate.call(this);
}
