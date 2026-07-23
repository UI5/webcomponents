import { useState, useEffect } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import InputTableSuggestClass from "@ui5/webcomponents/dist/InputTableSuggest.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";

const InputTableSuggest = createReactComponent(InputTableSuggestClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableRow = createReactComponent(TableRowClass);
const TableCell = createReactComponent(TableCellClass);

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

function App() {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const handleInput = (e: UI5CustomEvent<InputTableSuggestClass, "input">) => {
    const value = e.currentTarget.value.toLowerCase();

    if (!value) {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(value) ||
        emp.department.toLowerCase().includes(value) ||
        emp.location.toLowerCase().includes(value),
    );
    setFilteredEmployees(filtered);
  };

  return (
    <InputTableSuggest
      placeholder="Search employees..."
      showSuggestions
      onInput={handleInput}
    >
      <TableHeaderCell slot="suggestionColumns" width="150px">
        Name
      </TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="120px">
        Department
      </TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" minWidth="100px">
        Location
      </TableHeaderCell>

      {filteredEmployees.map((emp) => (
        <TableRow key={emp.name} slot="suggestionRows">
          <TableCell>{emp.name}</TableCell>
          <TableCell>{emp.department}</TableCell>
          <TableCell>{emp.location}</TableCell>
        </TableRow>
      ))}
    </InputTableSuggest>
  );
}

export default App;
