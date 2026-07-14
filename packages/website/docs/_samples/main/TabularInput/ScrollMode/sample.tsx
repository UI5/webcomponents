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
    <TabularInput placeholder="Search employees..." overflowMode="Scroll" style={{ width: "400px" }}>
      <TableHeaderCell slot="suggestionColumns" width="150px">Name</TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="120px">Department</TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="120px">Location</TableHeaderCell>
      <TableHeaderCell slot="suggestionColumns" width="100px">Extension</TableHeaderCell>

      <TableRow slot="suggestionRows">
        <TableCell>John Smith</TableCell>
        <TableCell>Engineering</TableCell>
        <TableCell>Building A</TableCell>
        <TableCell>x1234</TableCell>
      </TableRow>
      <TableRow slot="suggestionRows">
        <TableCell>Jane Doe</TableCell>
        <TableCell>Marketing</TableCell>
        <TableCell>Building B</TableCell>
        <TableCell>x2345</TableCell>
      </TableRow>
      <TableRow slot="suggestionRows">
        <TableCell>James Wilson</TableCell>
        <TableCell>Sales</TableCell>
        <TableCell>Building A</TableCell>
        <TableCell>x3456</TableCell>
      </TableRow>
    </TabularInput>
  );
}

export default App;
