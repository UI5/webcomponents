import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const TableColumn = createComponent(TableColumnClass);
const Table = createComponent(TableClass);
const TableCell = createComponent(TableCellClass);
const TableRow = createComponent(TableRowClass);
const Text = createComponent(TextClass);

function App() {

  return (
    <>
      <Table>

        <TableColumn slot="columns" popinDisplay="Inline">
            <Text>Product</Text>
        </TableColumn>
        <TableColumn slot="columns" min-width={600} popinText="Supplier" demandPopin={true} popinDisplay="Inline">
            <Text>Supplier</Text>
        </TableColumn>
        <TableColumn slot="columns" min-width={800} popinText="Dimensions" demandPopin={true} popinDisplay="Inline">
            <Text>Dimensions</Text>
        </TableColumn>
        <TableColumn slot="columns" min-width={800} popinText="Weight" demandPopin={true} popinDisplay="Inline">
            <Text>Weight</Text>
        </TableColumn>
        <TableColumn slot="columns" popinDisplay="Inline">
            <Text>Price</Text>
        </TableColumn>

        <TableRow>
            <TableCell>
                <Text>Notebook Basic 15</Text>
            </TableCell>
            <TableCell>
                <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell style={{ textAlign: "right" }}>
                <Text>30 x 18 x 3cm</Text>
            </TableCell>
            <TableCell style={{ textAlign: "right" }}>
                <Text><b>4.2</b>KG</Text>
            </TableCell>
            <TableCell style={{ textAlign: "right" }}>
                <Text><b>956</b>EUR</Text>
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell>
                <Text>Notebook Basic 175</Text>
            </TableCell>
            <TableCell>
                <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell style={{ textAlign: "right" }}>
                <Text>29 x 17 x 3.1cm</Text>
            </TableCell>
            <TableCell style={{ textAlign: "right" }}>
                <Text><b>4.5</b>KG</Text>
            </TableCell>
            <TableCell style={{ textAlign: "right" }}>
                <Text><b>1249</b>EUR</Text>
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell>
                <Text>Notebook Basic 18</Text>
            </TableCell>
            <TableCell>
                <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell style={{ textAlign: "right" }}>
                <Text>28 x 19 x 2.5cm</Text>
            </TableCell>
            <TableCell style={{ textAlign: "right" }}>
                <Text><b>4.2</b>KG</Text>
            </TableCell>
            <TableCell style={{ textAlign: "right" }}>
                <Text><b>1570</b>EUR</Text>
            </TableCell>
        </TableRow>

    </Table>
    </>
  );
}

export default App;
