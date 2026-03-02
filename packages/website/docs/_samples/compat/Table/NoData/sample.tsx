import { createReactComponent } from "@ui5/webcomponents-base";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const TableColumn = createReactComponent(TableColumnClass);
const Table = createReactComponent(TableClass);
const Text = createReactComponent(TextClass);

function App() {

  return (
    <>
      <Table no-data-text="No data found">
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

    </Table>
    </>
  );
}

export default App;
