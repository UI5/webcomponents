import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import generateHighlightedMarkupFirstMatch from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkupFirstMatch.js";
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

const products = [
  { name: "Laptop Pro 15", id: "PRD-001", category: "Electronics" },
  { name: "Laptop Stand", id: "PRD-005", category: "Accessories" },
  { name: "Smartphone X", id: "PRD-002", category: "Electronics" },
  { name: "Wireless Mouse", id: "PRD-003", category: "Accessories" },
  { name: "Mechanical Keyboard", id: "PRD-004", category: "Accessories" },
];

function App() {
  const [search, setSearch] = useState("");

  const handleInput = (e: UI5CustomEvent<InputTableSuggestClass, "input">) => {
    setSearch(e.currentTarget.value);
  };

  // App-side highlighting using the same utility the component used internally.
  // It escapes the text and wraps the first matching term in a <b> tag.
  const markup = (text: string) => generateHighlightedMarkupFirstMatch(text, search);

  return (
    <InputTableSuggest
      placeholder="Search for products..."
      showSuggestions
      style={{ width: "420px" }}
      onInput={handleInput}
    >
      <TableHeaderRow slot="suggestionColumns">
        <TableHeaderCell width="200px">
          Name
        </TableHeaderCell>
        <TableHeaderCell width="120px">
          Product ID
        </TableHeaderCell>
        <TableHeaderCell minWidth="100px">
          Category
        </TableHeaderCell>
      </TableHeaderRow>

      {products.map((product) => (
        <TableRow key={product.id} slot="suggestionRows">
          <TableCell>
            <span dangerouslySetInnerHTML={{ __html: markup(product.name) }} />
          </TableCell>
          <TableCell>
            <span dangerouslySetInnerHTML={{ __html: markup(product.id) }} />
          </TableCell>
          <TableCell>
            <span dangerouslySetInnerHTML={{ __html: markup(product.category) }} />
          </TableCell>
        </TableRow>
      ))}
    </InputTableSuggest>
  );
}

export default App;
