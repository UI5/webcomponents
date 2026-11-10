import InputFieldTemplate from "./InputFieldTemplate.js";
import type InputTableSuggest from "./InputTableSuggest.js";
import InputTableSuggestPopoverTemplate from "./InputTableSuggestPopoverTemplate.js";

export default function InputTableSuggestTemplate(this: InputTableSuggest) {
	return InputFieldTemplate.call(this, {
		postContent: () => (
			<>
				{this._effectiveShowSuggestions &&
					<>
						<span id="suggestionsText" class="ui5-hidden-text">{this.suggestionsText}</span>
						<span id="selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span>
						<span id="suggestionsCount" class="ui5-hidden-text" aria-live="polite">{this.availableSuggestionsCount}</span>
					</>
				}
			</>
		),
		popoverTemplate: () => InputTableSuggestPopoverTemplate.call(this),
	});
}
