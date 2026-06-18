import CheckBox from "./CheckBox.js";
import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type MultiComboBoxItemCustom from "./MultiComboBoxItemCustom.js";

export default function MultiComboBoxItemCustomTemplate(this: MultiComboBoxItemCustom) {
	return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" });
}

function listItemContent(this: MultiComboBoxItemCustom) {
	return (
		<>
			<CheckBox
				disabled={this._readonly}
				checked={this.selected}
				_accInfo={this.checkBoxAccInfo}
			/>
			<div part="content" id="content" class="ui5-li-content">
				<slot></slot>
			</div>
		</>
	);
}
