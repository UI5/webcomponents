import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Slider.js";

const slider = document.getElementById("slider");
const table = document.getElementById("table");

slider.addEventListener("change", (event) => {
	table.style.width = `${event.target.value}%`;
});