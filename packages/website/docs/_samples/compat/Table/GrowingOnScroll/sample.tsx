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
      <div style={{ height: "200px", overflow: "scroll" }}>
        <Table growing="Scroll" busy-delay={0}>
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

            <TableRow>
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
                    <Text><b>4.2</b>KG</Text>
                </TableCell>
                <TableCell>
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
                <TableCell>
                    <Text>29 x 17 x 3.1cm</Text>
                </TableCell>
                <TableCell>
                    <Text><b>4.5</b>KG</Text>
                </TableCell>
                <TableCell>
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
                <TableCell>
                    <Text>28 x 19 x 2.5cm</Text>
                </TableCell>
                <TableCell>
                    <Text><b>4.2</b>KG</Text>
                </TableCell>
                <TableCell>
                    <Text><b>1570</b>EUR</Text>
                </TableCell>
            </TableRow>


            <TableRow>
                <TableCell>
                    <Text>Notebook Basic 18</Text>
                </TableCell>
                <TableCell>
                    <Text>Very Best Screens</Text>
                </TableCell>
                <TableCell>
                    <Text>28 x 19 x 2.5cm</Text>
                </TableCell>
                <TableCell>
                    <Text><b>4.2</b>KG</Text>
                </TableCell>
                <TableCell>
                    <Text><b>1570</b>EUR</Text>
                </TableCell>
            </TableRow>



            <TableRow>
                <TableCell>
                    <Text>Notebook Basic 18</Text>
                </TableCell>
                <TableCell>
                    <Text>Very Best Screens</Text>
                </TableCell>
                <TableCell>
                    <Text>28 x 19 x 2.5cm</Text>
                </TableCell>
                <TableCell>
                    <Text><b>4.2</b>KG</Text>
                </TableCell>
                <TableCell>
                    <Text><b>1570</b>EUR</Text>
                </TableCell>
            </TableRow>



            <TableRow>
                <TableCell>
                    <Text>Notebook Basic 18</Text>
                </TableCell>
                <TableCell>
                    <Text>Very Best Screens</Text>
                </TableCell>
                <TableCell>
                    <Text>28 x 19 x 2.5cm</Text>
                </TableCell>
                <TableCell>
                    <Text><b>4.2</b>KG</Text>
                </TableCell>
                <TableCell>
                    <Text><b>1570</b>EUR</Text>
                </TableCell>
            </TableRow>
        </Table>
    </div>
    </>
  );
}

export default App;
