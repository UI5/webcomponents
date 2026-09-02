import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
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

function App() {
  return (
    <InputTableSuggest placeholder="Search for products..." showSuggestions>
      <TableHeaderRow slot="suggestionColumns">
        <TableHeaderCell width="120px">Product ID</TableHeaderCell>
        <TableHeaderCell width="200px">Name</TableHeaderCell>
        <TableHeaderCell minWidth="100px">Category</TableHeaderCell>
        <TableHeaderCell width="80px">Price</TableHeaderCell>
      </TableHeaderRow>

      <TableRow slot="suggestionRows">
        <TableCell>PRD-001</TableCell>
        <TableCell>Laptop Pro 15</TableCell>
        <TableCell>Electronics</TableCell>
        <TableCell>$1,299</TableCell>
      </TableRow>
      <TableRow slot="suggestionRows">
        <TableCell>PRD-002</TableCell>
        <TableCell>Smartphone X</TableCell>
        <TableCell>Electronics</TableCell>
        <TableCell>$899</TableCell>
      </TableRow>
      <TableRow slot="suggestionRows">
        <TableCell>PRD-003</TableCell>
        <TableCell>Wireless Mouse</TableCell>
        <TableCell>Accessories</TableCell>
        <TableCell>$49</TableCell>
      </TableRow>
    </InputTableSuggest>
  );
}

export default App;
