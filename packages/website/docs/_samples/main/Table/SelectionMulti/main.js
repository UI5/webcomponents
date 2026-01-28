import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableSelectionMulti.js";
import "@ui5/webcomponents/dist/Label.js";

const selectionFeature = document.getElementById("selection");
let oldSelectedSet = selectionFeature.getSelectedAsSet();

selectionFeature.addEventListener("change", (e) => {
	console.log("Selected keys", selectionFeature.selected);

	const newSelectedSet = selectionFeature.getSelectedAsSet();
	const recentlySelectedRowKeys = [...newSelectedSet.difference(oldSelectedSet)];
	const recentlyDeselectedRowKeys = [...oldSelectedSet.difference(newSelectedSet)];
	oldSelectedSet = newSelectedSet;

	if (recentlySelectedRowKeys.length > 0) {
		const recentlySelectedRows = recentlySelectedRowKeys.map((key) => selectionFeature.getRowByKey(key));
		console.log("Recently selected row-keys", recentlySelectedRowKeys);
		console.log("Recently selected rows", recentlySelectedRows);
	}

	if (recentlyDeselectedRowKeys.length > 0) {
		const recentlyDeselectedRows = recentlyDeselectedRowKeys.map((key) => selectionFeature.getRowByKey(key));
		console.log("Recently deselected row-keys", recentlyDeselectedRowKeys);
		console.log("Recently deselected rows", recentlyDeselectedRows);
	}
});

const selectionBehavior = document.getElementById("selectionBehavior");
selectionBehavior.addEventListener("change", (e) => {
	selectionFeature.behavior = e.target.text;
});

const headerSelector = document.getElementById("headerSelector");
headerSelector.addEventListener("change", (e) => {
	selectionFeature.headerSelector = e.target.text;
});