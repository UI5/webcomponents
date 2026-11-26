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
  { name: "Alice Morgan", department: "Engineering", location: "Building A", email: "alice.morgan@example.com", phone: "x1234", office: "A-101" },
  { name: "Bob Turner", department: "Marketing", location: "Building B", email: "bob.turner@example.com", phone: "x2345", office: "B-204" },
  { name: "Carol White", department: "Sales", location: "Building C", email: "carol.white@example.com", phone: "x3456", office: "C-115" },
  { name: "David Chen", department: "Engineering", location: "Building A", email: "david.chen@example.com", phone: "x4567", office: "A-309" },
  { name: "Emily Brown", department: "Finance", location: "Building B", email: "emily.brown@example.com", phone: "x5678", office: "B-210" },
  { name: "Frank Lopez", department: "HR", location: "Building C", email: "frank.lopez@example.com", phone: "x6789", office: "C-120" },
  { name: "Grace Kim", department: "Marketing", location: "Building A", email: "grace.kim@example.com", phone: "x7890", office: "A-312" },
  { name: "Henry Ford", department: "Sales", location: "Building B", email: "henry.ford@example.com", phone: "x8901", office: "B-215" },
];

function App() {
  const [search, setSearch] = useState("");

  const handleInput = (e: UI5CustomEvent<InputTableSuggestClass, "input">) => {
    setSearch(e.currentTarget.value);
  };

  const query = search.trim().toLowerCase();

  // Filter across the Name, Department and Location columns. "Per term" means the query
  // must start a word in the value (so "James" and "Wilson" both match "James Wilson"),
  // mirroring ui5-input's default StartsWithPerTerm filter.
  const startsWithPerTerm = (text: string) => {
    const escaped = query.replace(/[[\]{}()*+?.\\^$|]/g, "\\$&");
    return new RegExp(`(^|\\s)${escaped}`).test(text.toLowerCase());
  };

  const filteredEmployees = query
    ? employees.filter(
        (emp) =>
          startsWithPerTerm(emp.name) ||
          startsWithPerTerm(emp.department) ||
          startsWithPerTerm(emp.location)
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
      <TableHeaderRow slot="headerRow">
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
        <TableRow key={emp.name}>
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
