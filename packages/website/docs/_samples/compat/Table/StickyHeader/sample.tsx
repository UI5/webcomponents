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
      <div style={{ height: "150px", overflow: "scroll" }}>
        <Table stickyColumnHeader={true}>

            <TableColumn slot="columns">
    			<Text>Product</Text>
    		</TableColumn>
    		<TableColumn slot="columns" min-width={800}>
    			<Text>Supplier</Text>
    		</TableColumn>
    		<TableColumn slot="columns" min-width={600} popinText="Dimensions" demandPopin="" class="table-header-text-alignment">
    			<Text>Dimensions</Text>
    		</TableColumn>
    		<TableColumn slot="columns" min-width={600} popinText="Weight" demandPopin="" class="table-header-text-alignment">
    			<Text>Weight</Text>
    		</TableColumn>
    		<TableColumn slot="columns" class="table-header-text-alignment">
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
                    <Text>Notebook Basic 19</Text>
                </TableCell>
                <TableCell>
                    <Text>New Best Screens</Text>
                </TableCell>
                <TableCell>
                    <Text>38 x 19 x 2.5cm</Text>
                </TableCell>
                <TableCell>
                    <Text><b>5.2</b>KG</Text>
                </TableCell>
                <TableCell>
                    <Text><b>200</b>EUR</Text>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    <Text>Notebook Basic 21</Text>
                </TableCell>
                <TableCell>
                    <Text>Great Screens</Text>
                </TableCell>
                <TableCell>
                    <Text>44 x 14 x 3.5cm</Text>
                </TableCell>
                <TableCell>
                    <Text><b>4.2</b>KG</Text>
                </TableCell>
                <TableCell>
                    <Text><b>300</b>EUR</Text>
                </TableCell>
            </TableRow>

        </Table>
    </div>;
    </>
  );
}

export default App;
