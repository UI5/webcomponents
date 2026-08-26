import "@ui5/webcomponents/dist/InputTableSuggest.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";

const employees = [
    { name: "John Smith", department: "Engineering", location: "Building A", email: "john.smith@example.com", phone: "x1234", office: "A-101" },
    { name: "Jane Doe", department: "Marketing", location: "Building B", email: "jane.doe@example.com", phone: "x2345", office: "B-204" },
    { name: "James Wilson", department: "Sales", location: "Building A", email: "james.wilson@example.com", phone: "x3456", office: "A-115" },
    { name: "Emily Brown", department: "Engineering", location: "Building C", email: "emily.brown@example.com", phone: "x4567", office: "C-309" },
    { name: "Michael Lee", department: "HR", location: "Building B", email: "michael.lee@example.com", phone: "x5678", office: "B-210" },
    { name: "Sarah Johnson", department: "Finance", location: "Building A", email: "sarah.johnson@example.com", phone: "x6789", office: "A-120" },
    { name: "David Chen", department: "Engineering", location: "Building C", email: "david.chen@example.com", phone: "x7890", office: "C-312" },
    { name: "Lisa Wang", department: "Marketing", location: "Building B", email: "lisa.wang@example.com", phone: "x8901", office: "B-215" },
];

const input = document.getElementById("employee-input");

function updateSuggestions(filterValue) {
    input.querySelectorAll("[slot='suggestionRows']").forEach(row => row.remove());

    const filtered = filterValue
        ? employees.filter(emp =>
            emp.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            emp.department.toLowerCase().includes(filterValue.toLowerCase()) ||
            emp.location.toLowerCase().includes(filterValue.toLowerCase())
          )
        : employees;

    filtered.forEach(emp => {
        const row = document.createElement("ui5-table-row");
        row.slot = "suggestionRows";

        [emp.name, emp.department, emp.location, emp.email, emp.phone, emp.office].forEach(value => {
            const cell = document.createElement("ui5-table-cell");
            cell.textContent = value;
            row.appendChild(cell);
        });

        input.appendChild(row);
    });
}

input.addEventListener("input", (e) => {
    updateSuggestions(e.target.value);
});

updateSuggestions("");
