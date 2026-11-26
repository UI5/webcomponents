import "@ui5/webcomponents/dist/InputTableSuggest.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";

const employees = [
    { name: "Alice Morgan", department: "Engineering", location: "Building A", email: "alice.morgan@example.com", phone: "x1234", office: "A-101" },
    { name: "Bob Turner", department: "Marketing", location: "Building B", email: "bob.turner@example.com", phone: "x2345", office: "B-204" },
    { name: "Carol White", department: "Sales", location: "Building C", email: "carol.white@example.com", phone: "x3456", office: "C-115" },
    { name: "David Chen", department: "Engineering", location: "Building A", email: "david.chen@example.com", phone: "x4567", office: "A-309" },
    { name: "Emily Brown", department: "Finance", location: "Building B", email: "emily.brown@example.com", phone: "x5678", office: "B-210" },
    { name: "Frank Lopez", department: "HR", location: "Building C", email: "frank.lopez@example.com", phone: "x6789", office: "C-120" },
    { name: "Grace Kim", department: "Marketing", location: "Building A", email: "grace.kim@example.com", phone: "x7890", office: "A-312" },
    { name: "Henry Ford", department: "Sales", location: "Building B", email: "henry.ford@example.com", phone: "x8901", office: "B-215" },
];

const input = document.getElementById("employee-input");

function startsWithPerTerm(text, query) {
    const escaped = query.toLowerCase().replace(/[[\]{}()*+?.\\^$|]/g, "\\$&");
    return new RegExp(`(^|\\s)${escaped}`).test(text.toLowerCase());
}

function updateSuggestions(filterValue) {
    input.querySelectorAll("[ui5-table-row]").forEach(row => row.remove());

    // Filter across the Name, Department and Location columns.
    const filtered = filterValue
        ? employees.filter(emp =>
            startsWithPerTerm(emp.name, filterValue) ||
            startsWithPerTerm(emp.department, filterValue) ||
            startsWithPerTerm(emp.location, filterValue))
        : employees;

    filtered.forEach(emp => {
        const row = document.createElement("ui5-table-row");

        [emp.name, emp.department, emp.location, emp.email, emp.phone, emp.office].forEach(value => {
            const cell = document.createElement("ui5-table-cell");
            // App-side highlighting: wrap every matching substring in <b> using the same
            // utility the component uses internally (it escapes the text, then bolds matches).
            // The markup must live inside a single element: ui5-table-cell is display:flex, so
            // sibling nodes (e.g. <b>James</b> + " Wilson") would become separate flex items and
            // the whitespace between them would be stripped ("JamesWilson"). One span keeps it
            // as normal inline flow and preserves the space.
            const span = document.createElement("span");
            span.innerHTML = filterValue ? generateHighlightedMarkup(value, filterValue) : value;
            cell.appendChild(span);
            row.appendChild(cell);
        });

        input.appendChild(row);
    });
}

input.addEventListener("input", (e) => {
    updateSuggestions(e.target.value);
});

updateSuggestions("");
