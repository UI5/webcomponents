import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableHeaderRowStatusClass from "@ui5/webcomponents/dist/TableHeaderRowStatus.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableRowStatusClass from "@ui5/webcomponents/dist/TableRowStatus.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableHeaderRowStatus = createReactComponent(TableHeaderRowStatusClass);
const TableRow = createReactComponent(TableRowClass);
const TableRowStatus = createReactComponent(TableRowStatusClass);
const Text = createReactComponent(TextClass);

function App() {
  return (
    <Table id="table">
      {/* playground-fold */}
      <TableHeaderRow slot="headerRow">
        <TableHeaderRowStatus slot="status" />
        <TableHeaderCell id="productCol">
          <span>Product</span>
        </TableHeaderCell>
        <TableHeaderCell id="supplierCol">
          Supplier
        </TableHeaderCell>
        <TableHeaderCell id="dimensionsCol">
          Dimensions
        </TableHeaderCell>
        <TableHeaderCell id="priceCol">
          Price
        </TableHeaderCell>
      </TableHeaderRow>
      {/* playground-fold-end */}
      <TableRow>
        <TableRowStatus slot="status" value="Positive" text="In stock" />
        <TableCell>
          <Text>
            <b>Notebook Basic 15</b>
            <br />
            HT-1000
          </Text>
        </TableCell>
        <TableCell>
          <Text>Very Best Screens</Text>
        </TableCell>
        <TableCell>
          <Text>30 x 18 x 3 cm</Text>
        </TableCell>
        <TableCell>
          <Text>
            <b>956</b> EUR
          </Text>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableRowStatus slot="status" value="Critical" text="Low stock" />
        <TableCell>
          <Text>
            <b>Notebook Basic 17</b>
            <br />
            HT-1001
          </Text>
        </TableCell>
        <TableCell>
          <Text>Smartcards</Text>
        </TableCell>
        <TableCell>
          <Text>29 x 17 x 3.1 cm</Text>
        </TableCell>
        <TableCell>
          <Text>
            <b>1249</b> EUR
          </Text>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableRowStatus slot="status" />
        <TableCell>
          <Text>
            <b>Notebook Professional 17</b>
            <br />
            HT-1011
          </Text>
        </TableCell>
        <TableCell>
          <Text>Technocom</Text>
        </TableCell>
        <TableCell>
          <Text>35 x 23 x 4 cm</Text>
        </TableCell>
        <TableCell>
          <Text>
            <b>2299</b> EUR
          </Text>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableRowStatus slot="status" value="Negative" text="Out of stock" />
        <TableCell>
          <Text>
            <b>Notebook Basic 18</b>
            <br />
            HT-1002
          </Text>
        </TableCell>
        <TableCell>
          <Text>Technocom</Text>
        </TableCell>
        <TableCell>
          <Text>32 x 21 x 4 cm</Text>
        </TableCell>
        <TableCell>
          <Text>
            <b>29</b> EUR
          </Text>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableRowStatus slot="status" value="Information" text="Newly added" />
        <TableCell>
          <Text>
            <b>Notebook Professional 15</b>
            <br />
            HT-1010
          </Text>
        </TableCell>
        <TableCell>
          <Text>Very Best Screens</Text>
        </TableCell>
        <TableCell>
          <Text>33 x 22 x 4 cm</Text>
        </TableCell>
        <TableCell>
          <Text>
            <b>1999</b> EUR
          </Text>
        </TableCell>
      </TableRow>
    </Table>
  );
}

export default App;
