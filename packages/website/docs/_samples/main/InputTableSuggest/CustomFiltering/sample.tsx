import { useState } from "react";
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
  { name: "John Smith", department: "Engineering", location: "Building A", email: "john.smith@example.com", phone: "x1234", office: "A-101" },
  { name: "Jane Doe", department: "Marketing", location: "Building B", email: "jane.doe@example.com", phone: "x2345", office: "B-204" },
  { name: "James Wilson", department: "Sales", location: "Building A", email: "james.wilson@example.com", phone: "x3456", office: "A-115" },
  { name: "Emily Brown", department: "Engineering", location: "Building C", email: "emily.brown@example.com", phone: "x4567", office: "C-309" },
  { name: "Michael Lee", department: "HR", location: "Building B", email: "michael.lee@example.com", phone: "x5678", office: "B-210" },
  { name: "Sarah Johnson", department: "Finance", location: "Building A", email: "sarah.johnson@example.com", phone: "x6789", office: "A-120" },
  { name: "David Chen", department: "Engineering", location: "Building C", email: "david.chen@example.com", phone: "x7890", office: "C-312" },
  { name: "Lisa Wang", department: "Marketing", location: "Building B", email: "lisa.wang@example.com", phone: "x8901", office: "B-215" },
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
      style={{ width: "420px" }}
      onInput={handleInput}
    >
      <TableHeaderCell slot="suggestionColumns" width="150px" importance={10}>
        Name
      </TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="130px" importance={5} popinText="Department">
        Department
      </TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="110px" importance={4} popinText="Location">
        Location
      </TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" minWidth="180px" importance={1} popinText="Email">
        Email
      </TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="120px" importance={2} popinText="Phone">
        Phone
      </TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="90px" importance={3} popinText="Office">
        Office
      </TableHeaderCell>

      {filteredEmployees.map((emp) => (
        <TableRow key={emp.name} slot="suggestionRows">
          <TableCell>{emp.name}</TableCell>
          <TableCell>{emp.department}</TableCell>
          <TableCell>{emp.location}</TableCell>
          <TableCell>{emp.email}</TableCell>
          <TableCell>{emp.phone}</TableCell>
          <TableCell>{emp.office}</TableCell>
        </TableRow>
      ))}
    </InputTableSuggest>
  );
}

export default App;
