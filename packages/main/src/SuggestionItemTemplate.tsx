import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type SuggestionItem from "./SuggestionItem.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";

export default function SuggestionItemTemplate(this: SuggestionItem) {
	return [ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" })];
}

function listItemContent(this: SuggestionItem) {
	const text = this.text ?? "";
	const highlightedMarkup = this.markupText ? generateHighlightedMarkup(text, this.markupText) : undefined;

	return <div part="content" id="content" class="ui5-li-content">
		<div class="ui5-li-text-wrapper">
			{highlightedMarkup
				? <span part="title" className="ui5-li-title" dangerouslySetInnerHTML={{ __html: highlightedMarkup }}></span>
				: <span part="title" className="ui5-li-title">{text}</span>
			}
			{this.additionalText &&
				<span part="additional-text" class="ui5-li-additional-text">{this.additionalText}</span>
			}
		</div>
	</div>;
}
