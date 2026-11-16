import "@ui5/webcomponents/dist/InputTableSuggest.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import generateHighlightedMarkupFirstMatch from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkupFirstMatch.js";

const products = [
    { name: "Laptop Pro 15", id: "PRD-001", category: "Electronics" },
    { name: "Laptop Stand", id: "PRD-005", category: "Accessories" },
    { name: "Smartphone X", id: "PRD-002", category: "Electronics" },
    { name: "Wireless Mouse", id: "PRD-003", category: "Accessories" },
    { name: "Mechanical Keyboard", id: "PRD-004", category: "Accessories" },
];

const input = document.getElementById("highlight-input");

// Keep the plain cell text so we can re-highlight against it on every keystroke.
const cellRefs = [];

products.forEach(product => {
    const row = document.createElement("ui5-table-row");

    [product.name, product.id, product.category].forEach(text => {
        const cell = document.createElement("ui5-table-cell");
        cell.textContent = text;
        cellRefs.push({ cell, text });
        row.appendChild(cell);
    });

    input.appendChild(row);
});

function highlightSuggestions(search) {
    cellRefs.forEach(({ cell, text }) => {
        // Keep the markup inside a single span: ui5-table-cell is display:flex, so sibling
        // nodes (e.g. <b>Laptop</b> + " Pro 15") would become separate flex items and the
        // whitespace between them would be stripped ("LaptopPro 15"). One span preserves it.
        cell.innerHTML = `<span>${generateHighlightedMarkupFirstMatch(text, search)}</span>`;
    });
}

input.addEventListener("input", e => {
    highlightSuggestions(e.target.value);
});
