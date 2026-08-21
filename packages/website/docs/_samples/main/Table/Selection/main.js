import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableSelection.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";
import "@ui5/webcomponents/dist/Text.js";

const selectionFeature = document.getElementById("selection");
const selectionGroup = document.getElementById("selectionGroup");
selectionGroup.addEventListener("change", (e) => {
	selectionFeature.selected = "";
	selectionFeature.mode = e.target.text;
})