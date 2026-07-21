import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TabularInputClass from "@ui5/webcomponents/dist/TabularInput.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";

const TabularInput = createReactComponent(TabularInputClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableRow = createReactComponent(TableRowClass);
const TableCell = createReactComponent(TableCellClass);

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <TabularInput placeholder="Error state..." valueState="Negative" showSuggestions>
        <div slot="valueStateMessage">Product ID is invalid. Please enter a valid ID.</div>
        <TableHeaderCell slot="suggestionColumns" width="150px">Product</TableHeaderCell>
        <TableHeaderCell slot="suggestionColumns" minWidth="100px">Price</TableHeaderCell>
        <TableRow slot="suggestionRows">
          <TableCell>PRD-001</TableCell>
          <TableCell>$99</TableCell>
        </TableRow>
      </TabularInput>

      <TabularInput placeholder="Warning state..." valueState="Critical" showSuggestions>
        <div slot="valueStateMessage">Stock is running low. Consider reordering soon.</div>
        <TableHeaderCell slot="suggestionColumns" width="150px">Product</TableHeaderCell>
        <TableHeaderCell slot="suggestionColumns" minWidth="100px">Stock</TableHeaderCell>
        <TableRow slot="suggestionRows">
          <TableCell>Widget X</TableCell>
          <TableCell>5 left</TableCell>
        </TableRow>
      </TabularInput>

      <TabularInput placeholder="Information state..." valueState="Information" showSuggestions>
        <div slot="valueStateMessage">Tip: You can use wildcards (*) for broader search.</div>
        <TableHeaderCell slot="suggestionColumns" width="150px">Search</TableHeaderCell>
        <TableHeaderCell slot="suggestionColumns" minWidth="100px">Results</TableHeaderCell>
        <TableRow slot="suggestionRows">
          <TableCell>Widget*</TableCell>
          <TableCell>25 matches</TableCell>
        </TableRow>
      </TabularInput>
    </div>
  );
}

export default App;
