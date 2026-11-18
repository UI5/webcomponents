import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableGroupRow.js";
import "@ui5/webcomponents/dist/TableSelectionSingle.js";
import "@ui5/webcomponents/dist/TableIBCS.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

await customElements.whenDefined("ui5-table-ibcs");

const table = document.getElementById("balance");
const ibcs = document.getElementById("ibcs");
ibcs.columns = {
	position: { type: "RowHeader" },
	prior: { type: "Scenario", scenario: "Previous" },
	actual: { type: "Scenario", scenario: "Actual" },
	change: { type: "Variance", groupStart: true },
};
ibcs.rows = {
	fixed: { type: "Measure", parentKey: "assets" },
	inventory: { type: "Measure", parentKey: "current" },
	receivables: { type: "Measure", parentKey: "current" },
	longTerm: { type: "OfWhich" },
	cash: { type: "Measure", parentKey: "current" },
	current: { type: "Total", parentKey: "assets" },
	assets: { type: "Total" },
	capital: { type: "Measure", parentKey: "equity" },
	profit: { type: "Measure", parentKey: "equity" },
	equity: { type: "Total", parentKey: "financing" },
	provisions: { type: "Measure", parentKey: "financing" },
	bank: { type: "Measure", parentKey: "debt" },
	trade: { type: "Measure", parentKey: "debt" },
	debt: { type: "Total", parentKey: "financing" },
	financing: { type: "Total" },
	ratio: { type: "PercentOf" },
};
ibcs.cellImpacts = Object.fromEntries(Object.keys(ibcs.rows).map(key => [key, { change: "Neutral" }]));
ibcs.cellImpacts = {
	...ibcs.cellImpacts,
	cash: { change: "Favorable" },
	profit: { change: "Favorable" },
	equity: { change: "Favorable" },
	ratio: { change: "Favorable" },
	bank: { change: "Unfavorable" },
	trade: { change: "Unfavorable" },
	debt: { change: "Unfavorable" },
};

document.getElementById("toggle").addEventListener("click", event => {
	if (ibcs.parentElement) {
		ibcs.remove();
		event.target.textContent = "Enable IBCS";
	} else {
		table.append(ibcs);
		event.target.textContent = "Disable IBCS";
	}
});
document.getElementById("selection").addEventListener("change", event => {
	document.getElementById("selected-row").textContent = `Selected row: ${event.target.selected}`;
});
const theme = document.getElementById("theme");
theme.querySelectorAll("[value]").forEach(option => { option.selected = option.value === getTheme(); });
theme.addEventListener("change", event => setTheme(event.detail.selectedOption.value));
