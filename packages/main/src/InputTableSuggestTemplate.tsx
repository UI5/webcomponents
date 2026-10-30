import InputFieldTemplate from "./InputFieldTemplate.js";
import type InputTableSuggest from "./InputTableSuggest.js";
import InputTableSuggestPopoverTemplate from "./InputTableSuggestPopoverTemplate.js";

export default function InputTableSuggestTemplate(this: InputTableSuggest) {
	return InputFieldTemplate.call(this, {
		postContent: () => (
			<>
				{this._effectiveShowSuggestions &&
					<span id="selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span>
				}
			</>
		),
		popoverTemplate: () => InputTableSuggestPopoverTemplate.call(this),
	});
}
