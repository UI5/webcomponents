import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableGrowing.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Text.js";

const MAX_GROW = 3;

const table = document.getElementById("table");
const growing = document.getElementById("growing");

let counter = 0;

growing.addEventListener("load-more", () => {
	for (let i = 0; i < 2; i++) {
		const newRow = document.createElement("ui5-table-row");
		newRow.setAttribute("key", table.rows.length + i);
		newRow.innerHTML = `
			<ui5-table-cell><ui5-label><b>Notebook Basic ${18 + table.rows.length + i}</b><br>HT-100${2 + table.rows.length + i}</ui5-label></ui5-table-cell>
			<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>
			<ui5-table-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-table-cell>
			<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-table-cell>
			<ui5-table-cell><ui5-label><b>29</b> EUR</ui5-label></ui5-table-cell>
		`;
		table.appendChild(newRow);
	}

	counter++;
	if (counter >= MAX_GROW) {
		growing.remove();
		return;
	}
});
