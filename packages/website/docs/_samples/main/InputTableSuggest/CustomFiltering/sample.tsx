import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
import InputTableSuggestClass from "@ui5/webcomponents/dist/InputTableSuggest.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";

const InputTableSuggest = createReactComponent(InputTableSuggestClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
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
  const [search, setSearch] = useState("");

  const handleInput = (e: UI5CustomEvent<InputTableSuggestClass, "input">) => {
    setSearch(e.currentTarget.value);
  };

  const query = search.trim().toLowerCase();
  const filteredEmployees = query
    ? employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.department.toLowerCase().includes(query) ||
          emp.location.toLowerCase().includes(query),
      )
    : employees;

  // App-side highlighting using the same utility the component uses internally.
  // It escapes the text and wraps every matching substring in a <b> tag.
  const markup = (text: string) => generateHighlightedMarkup(text, search);

  return (
    <InputTableSuggest
      placeholder="Search employees..."
      showSuggestions
      style={{ width: "420px" }}
      onInput={handleInput}
    >
      <TableHeaderRow slot="suggestionColumns">
        <TableHeaderCell width="150px" importance={10}>
          Name
        </TableHeaderCell>
        <TableHeaderCell width="130px" importance={5} popinText="Department">
          Department
        </TableHeaderCell>
        <TableHeaderCell width="110px" importance={4} popinText="Location">
          Location
        </TableHeaderCell>
        <TableHeaderCell minWidth="180px" importance={1} popinText="Email">
          Email
        </TableHeaderCell>
        <TableHeaderCell width="120px" importance={2} popinText="Phone">
          Phone
        </TableHeaderCell>
        <TableHeaderCell width="90px" importance={3} popinText="Office">
          Office
        </TableHeaderCell>
      </TableHeaderRow>

      {filteredEmployees.map((emp) => (
        <TableRow key={emp.name} slot="suggestionRows">
          <TableCell>
            <span dangerouslySetInnerHTML={{ __html: markup(emp.name) }} />
          </TableCell>
          <TableCell>
            <span dangerouslySetInnerHTML={{ __html: markup(emp.department) }} />
          </TableCell>
          <TableCell>
            <span dangerouslySetInnerHTML={{ __html: markup(emp.location) }} />
          </TableCell>
          <TableCell>
            <span dangerouslySetInnerHTML={{ __html: markup(emp.email) }} />
          </TableCell>
          <TableCell>
            <span dangerouslySetInnerHTML={{ __html: markup(emp.phone) }} />
          </TableCell>
          <TableCell>
            <span dangerouslySetInnerHTML={{ __html: markup(emp.office) }} />
          </TableCell>
        </TableRow>
      ))}
    </InputTableSuggest>
  );
}

export default App;
