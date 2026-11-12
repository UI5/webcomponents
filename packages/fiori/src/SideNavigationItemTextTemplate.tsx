import type SideNavigationItemBase from "./SideNavigationItemBase.js";
import highlightText from "@ui5/webcomponents-base/dist/util/highlightText.js";

export default function SideNavigationItemTextTemplate(item: SideNavigationItemBase, id?: string) {
	const highlighted = item._highlightedText
		? highlightText(item.text, item._highlightedText, "ui5-sn-item-highlight")
		: undefined;

	return highlighted
		? <div class="ui5-sn-item-text" id={id} dangerouslySetInnerHTML={{ __html: highlighted }}></div>
		: <div class="ui5-sn-item-text" id={id}>{item.text}</div>;
}
