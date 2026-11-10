import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type ComboBoxItem from "./ComboBoxItem.js";
import generateHighlightedMarkupFirstMatch from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkupFirstMatch.js";

export default function ComboBoxItemTemplate(this: ComboBoxItem) {
	return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" });
}

function listItemContent(this: ComboBoxItem) {
	const text = this.text ?? "";
	const highlightedMarkup = this.markupText ? generateHighlightedMarkupFirstMatch(text, this.markupText) : undefined;

	return (
		<div part="content" id="content" class="ui5-li-content">
			<div class="ui5-li-text-wrapper">
				{highlightedMarkup
					? <span part="title" className="ui5-li-title" dangerouslySetInnerHTML={{ __html: highlightedMarkup }}></span>
					: <span part="title" className="ui5-li-title">{text}</span>
				}
				{this.additionalText && <span part="additional-text" class="ui5-li-additional-text">{this.additionalText}</span>}
			</div>
		</div>
	);
}
