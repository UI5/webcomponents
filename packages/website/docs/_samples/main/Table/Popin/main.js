import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Slider.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents-icons/dist/detail-more.js";
import "@ui5/webcomponents-icons/dist/detail-less.js";

const HIDDEN_COLUMNS = ["dimensionsCol", "weightCol"];

function setPopinState(hideDetails) {
	HIDDEN_COLUMNS.forEach((columnId) => {
		const headerCell = document.getElementById(columnId);
		headerCell.popinHidden = hideDetails;
	});
}

const table = document.getElementById("table");
const sizeBtn = document.getElementById("sizeBtn");
const showHideDetailsBtn = document.getElementById("showHideDetailsBtn");

sizeBtn.addEventListener("selection-change", (e) => {
	const selectedItem = e.detail.selectedItems[0];
	table.style.width = selectedItem.textContent;
});

showHideDetailsBtn.addEventListener("selection-change", (e) => {
	const selectedItem = e.detail.selectedItems[0];
	setPopinState(selectedItem.tooltip === "Hide Details");
});
