import { createReactComponent } from "@ui5/webcomponents-base";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const TableColumn = createReactComponent(TableColumnClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableRow = createReactComponent(TableRowClass);
const Text = createReactComponent(TextClass);

function App() {

  return (
    <>
      <Table>

        <TableColumn slot="columns">
            <Text>Product</Text>
        </TableColumn>
        <TableColumn slot="columns">
            <Text>Supplier</Text>
        </TableColumn>
        <TableColumn slot="columns">
            <Text>Dimensions</Text>
        </TableColumn>
        <TableColumn slot="columns">
            <Text>Weight</Text>
        </TableColumn>
        <TableColumn slot="columns">
            <Text>Price</Text>
        </TableColumn>

        <TableRow type="Active">
            <TableCell>
                <Text>Notebook Basic 15</Text>
            </TableCell>
            <TableCell>
                <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell>
                <Text>30 x 18 x 3cm</Text>
            </TableCell>
            <TableCell>
                <Text>4.2</b>KG</Text>
            </TableCell>
            <TableCell>
                <Text>956</b>EUR</Text>
            </TableCell>
        </TableRow>

        <TableRow type="Active">
            <TableCell>
                <Text>iPhone 13</Text>
            </TableCell>
            <TableCell>
                <Text>Apple</Text>
            </TableCell>
            <TableCell>
                <Text>10 x 12 x 3cm</Text>
            </TableCell>
            <TableCell>
                <Text>150</b>G</Text>
            </TableCell>
            <TableCell>
                <Text>100</b>EUR</Text>
            </TableCell>
        </TableRow>

    </Table>
    </>
  );
}

export default App;
