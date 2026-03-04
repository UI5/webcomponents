import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import TableGroupRowClass from "@ui5/webcomponents-compat/dist/TableGroupRow.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const TableColumn = createReactComponent(TableColumnClass);
const TableGroupRow = createReactComponent(TableGroupRowClass);
const Label = createReactComponent(LabelClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableRow = createReactComponent(TableRowClass);
const Text = createReactComponent(TextClass);

function App() {

  return (
    <>
      <Table>

        <TableColumn slot="columns">
            <Label>City</Label>
        </TableColumn>
        <TableColumn slot="columns" min-width={500} popinText="Supplier" demandPopin="">
            <Label>Supplier</Label>
        </TableColumn>
        <TableColumn slot="columns" min-width={500}>
            <Label>Date Of Foundation</Label>
        </TableColumn>

        <TableGroupRow>Country: Bulgaria</TableGroupRow>
        <TableRow>
            <TableCell><Text>Sofia</Text></TableCell>
            <TableCell><Text>Data Analytics</Text></TableCell>
            <TableCell><Text>1980</Text></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><Text>Plovdiv</Text></TableCell>
            <TableCell><Text>Old Town Corp</Text></TableCell>
            <TableCell><Text>1899</Text></TableCell>
        </TableRow>

        <TableGroupRow><Text>Country: USA</Text></TableGroupRow>
        <TableRow>
            <TableCell><Text>New York</Text></TableCell>
            <TableCell><Text>Deloitte</Text></TableCell>
            <TableCell><Text>1845</Text></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><Text>Bentonville</Text></TableCell>
            <TableCell><Text>Walmart</Text></TableCell>
            <TableCell><Text>1962</Text></TableCell>
        </TableRow>

    </Table>
    </>
  );
}

export default App;
