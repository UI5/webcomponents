import CheckBox from "./CheckBox.js";
import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type MultiComboBoxItem from "./MultiComboBoxItem.js";

export default function MultiComboBoxItemTemplate(this: MultiComboBoxItem) {
	return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" });
}

function listItemContent(this: MultiComboBoxItem) {
	return (
		<>
			<CheckBox
				disabled={this._readonly}
				checked={this.selected}
				_accInfo = {this.checkBoxAccInfo}
			/>
			<div part="content" id="content" class="ui5-li-content">
				<div class="ui5-li-text-wrapper">
					{ this.text && <span part="title" className="ui5-li-title">{this.text}</span> }
					{ this.additionalText && <span part="additional-text" class="ui5-li-additional-text">{this.additionalText}</span> }
				</div>
			</div>
		</>
	);
}
