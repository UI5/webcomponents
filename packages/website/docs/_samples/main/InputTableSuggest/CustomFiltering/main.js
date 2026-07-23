import "@ui5/webcomponents/dist/InputTableSuggest.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";

const employees = [
    { name: "John Smith", department: "Engineering", location: "Building A" },
    { name: "Jane Doe", department: "Marketing", location: "Building B" },
    { name: "James Wilson", department: "Sales", location: "Building A" },
    { name: "Emily Brown", department: "Engineering", location: "Building C" },
    { name: "Michael Lee", department: "HR", location: "Building B" },
    { name: "Sarah Johnson", department: "Finance", location: "Building A" },
    { name: "David Chen", department: "Engineering", location: "Building C" },
    { name: "Lisa Wang", department: "Marketing", location: "Building B" },
];

const input = document.getElementById("employee-input");

function updateSuggestions(filterValue) {
    while (input.querySelector("[slot='suggestionRows']")) {
        input.querySelector("[slot='suggestionRows']").remove();
    }

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

        const nameCell = document.createElement("ui5-table-cell");
        nameCell.textContent = emp.name;
        row.appendChild(nameCell);

        const deptCell = document.createElement("ui5-table-cell");
        deptCell.textContent = emp.department;
        row.appendChild(deptCell);

        const locCell = document.createElement("ui5-table-cell");
        locCell.textContent = emp.location;
        row.appendChild(locCell);

        input.appendChild(row);
    });
}

input.addEventListener("input", (e) => {
    updateSuggestions(e.target.value);
});

updateSuggestions("");
