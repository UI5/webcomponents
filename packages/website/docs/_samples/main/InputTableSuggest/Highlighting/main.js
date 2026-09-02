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
    row.slot = "suggestionRows";

    [product.name, product.id, product.category].forEach(text => {
        const cell = document.createElement("ui5-table-cell");
        cell.textContent = text;
        cellRefs.push({ cell, text });
        row.appendChild(cell);
    });

    input.appendChild(row);
});

// App-side highlighting using the same utility the component used internally.
// It escapes the text and wraps the first matching term in a <b> tag.
function highlightSuggestions(search) {
    cellRefs.forEach(({ cell, text }) => {
        cell.innerHTML = generateHighlightedMarkupFirstMatch(text, search);
    });
}

input.addEventListener("input", e => {
    highlightSuggestions(e.target.value);
});
