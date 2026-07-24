import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import InputTableSuggestClass from "@ui5/webcomponents/dist/InputTableSuggest.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";

const InputTableSuggest = createReactComponent(InputTableSuggestClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableRow = createReactComponent(TableRowClass);
const TableCell = createReactComponent(TableCellClass);

function App() {
  return (
    <InputTableSuggest placeholder="Search for products..." showSuggestions>
      <TableHeaderCell slot="suggestionColumns" width="120px">Product ID</TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="200px">Name</TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" minWidth="100px">Category</TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="80px">Price</TableHeaderCell>

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
