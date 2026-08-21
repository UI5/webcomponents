import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/Text.js";

function tableMoveOver(e) {
	const { source, destination } = e.detail;

	const sourceIndex = table.rows.indexOf(source.element);
	const destinationIndex = table.rows.indexOf(destination.element);

	if (sourceIndex === -1 || destinationIndex === -1) {
		return;
	}

	if (source.element.hasAttribute("ui5-table-row") && destination.element.hasAttribute("ui5-table-row") && destination.placement !== "On") {
		e.preventDefault();
	}
}

function tableMove(e) {
	const { source, destination } = e.detail;
	reorderRow(source.element, destination.element, destination.placement);
}

function reorderRow(source, destination, placement) {
	if (!table) {
		return;
	}

	switch (placement) {
		case "Before":
			destination.insertAdjacentElement("beforebegin", source);
			break;
		case "After":
			destination.insertAdjacentElement("afterend", source);
			break;
		default:
			break;
	}
}

const table = document.getElementById("table");
table.addEventListener('move-over', tableMoveOver);
table.addEventListener('move', tableMove);