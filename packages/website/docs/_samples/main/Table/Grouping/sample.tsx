import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableGroupRowClass from "@ui5/webcomponents/dist/TableGroupRow.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableGroupRow = createReactComponent(TableGroupRowClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const Text = createReactComponent(TextClass);

function App() {
  return (
    <>
      <Table id="table">
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell width="200px">City</TableHeaderCell>
          <TableHeaderCell width="200px">Area (km²)</TableHeaderCell>
          <TableHeaderCell width="200px">Population</TableHeaderCell>
        </TableHeaderRow>
        <TableGroupRow>Country: Germany</TableGroupRow>
        <TableRow>
          <TableCell><Text>Berlin</Text></TableCell>
          <TableCell><Text>891.20</Text></TableCell>
          <TableCell><Text>3,748,148</Text></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><Text>Munich</Text></TableCell>
          <TableCell><Text>310.71</Text></TableCell>
          <TableCell><Text>1,471,508</Text></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><Text>Hamburg</Text></TableCell>
          <TableCell><Text>755.22</Text></TableCell>
          <TableCell><Text>1,899,160</Text></TableCell>
        </TableRow>
        <TableGroupRow>Country: France</TableGroupRow>
        <TableRow>
          <TableCell><Text>Paris</Text></TableCell>
          <TableCell><Text>105.40</Text></TableCell>
          <TableCell><Text>2,161,000</Text></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><Text>Lyon</Text></TableCell>
          <TableCell><Text>47.87</Text></TableCell>
          <TableCell><Text>513,275</Text></TableCell>
        </TableRow>
      </Table>
    </>
  );
}

export default App;
