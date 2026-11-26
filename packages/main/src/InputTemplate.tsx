import type Input from "./Input.js";
import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";
import InputFieldTemplate from "./InputFieldTemplate.js";
import InputPopoverTemplate from "./InputPopoverTemplate.js";

type TemplateHook = () => JsxTemplateResult;

export default function InputTemplate(this: Input, hooks?: { preContent?: TemplateHook, postContent?: TemplateHook, suggestionsList?: TemplateHook, mobileHeader?: TemplateHook, popoverTemplate?: TemplateHook }) {
	const suggestionsList = hooks?.suggestionsList;
	const mobileHeader = hooks?.mobileHeader;
	const preContent = hooks?.preContent;
	const postContent = hooks?.postContent;
	const popoverTemplate = hooks?.popoverTemplate;

	return InputFieldTemplate.call(this, {
		preContent,
		postContent: () => (
			<>
				{ postContent?.call(this) }

				{this._effectiveShowSuggestions &&
					<>
						<span id="suggestionsText" class="ui5-hidden-text">{this.suggestionsText}</span>
						<span id="selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span>
						<span id="suggestionsCount" class="ui5-hidden-text" aria-live="polite">{this.availableSuggestionsCount}</span>
					</>
				}
			</>
		),
		popoverTemplate: popoverTemplate || (() => InputPopoverTemplate.call(this, { suggestionsList, mobileHeader })),
	});
}
