import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type ComboBoxItemCustom from "./ComboBoxItemCustom.js";

export default function ComboBoxItemCustomTemplate(this: ComboBoxItemCustom) {
	return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" });
}

function listItemContent(this: ComboBoxItemCustom) {
	return <slot></slot>;
}
