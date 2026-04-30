import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type OptionCustom from "./OptionCustom.js";

export default function OptionCustomTemplate(this: OptionCustom) {
	return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option", title: this.tooltip });
}

function listItemContent(this: OptionCustom) {
	return <slot></slot>;
}
