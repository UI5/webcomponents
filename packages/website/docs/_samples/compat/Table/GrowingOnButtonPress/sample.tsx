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
      <Table growing="Button" growing-button-text="Load More" growing-button-subtext="2 of 10" busy-delay={0}>

        <TableColumn slot="columns" popin-display="Inline">
            <Text>Product</Text>
        </TableColumn>
        <TableColumn slot="columns" min-width={600} popin-text="Supplier" demand-popin={true} popin-display="Inline">
            <Text>Supplier</Text>
        </TableColumn>
        <TableColumn slot="columns" min-width={800} popin-text="Dimensions" demand-popin={true} popin-display="Inline">
            <Text>Dimensions</Text>
        </TableColumn>
        <TableColumn slot="columns" min-width={800} popin-text="Weight" demand-popin={true} popin-display="Inline">
            <Text>Weight</Text>
        </TableColumn>
        <TableColumn slot="columns" popin-display="Inline">
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

    </Table>
    </>
  );
}

export default App;
