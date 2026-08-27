import "@ui5/webcomponents/dist/InputTableSuggest.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Tag.js";
import generateHighlightedMarkupFirstMatch from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkupFirstMatch.js";

const input = document.getElementById("team-input");
const rows = Array.from(input.querySelectorAll("[slot='suggestionRows']"));

// The first column is plain text: snapshot it so we can filter against it and
// re-highlight/clear it on every keystroke. The other columns hold rich components.
const nameCells = rows.map(row => {
    const cell = row.children[0];
    return { cell, text: cell.textContent };
});

input.addEventListener("input", () => {
    const value = input.value.trim();
    const query = value.toLowerCase();

    rows.forEach((row, index) => {
        const { cell, text } = nameCells[index];
        // Filtering: hide rows whose name does not match (rich cells stay intact).
        row.hidden = query.length > 0 && !text.toLowerCase().includes(query);
        // Highlighting: wrap the matched substring of the plain-text name in <b>.
        cell.innerHTML = value ? generateHighlightedMarkupFirstMatch(text, value) : text;
    });
});
