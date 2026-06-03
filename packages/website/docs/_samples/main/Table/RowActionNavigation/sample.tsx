import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableRowActionNavigation.js";
import TableRowActionNavigationClass from "@ui5/webcomponents/dist/TableRowActionNavigation.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const TableRowActionNavigation = createReactComponent(TableRowActionNavigationClass);
const Text = createReactComponent(TextClass);

function App() {
  const handleTableRowActionClick = (
    e: UI5CustomEvent<TableClass, "row-action-click">,
  ) => {
    const row = e.detail.row;
    console.log(`Navigate action of row ${row.rowKey} is clicked`);
  };

  return (
    <>
      <Table
        id="table"
        rowActionCount={1}
        onRowActionClick={handleTableRowActionClick}
      >
        {/* playground-fold */}
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell>Product</TableHeaderCell>
          <TableHeaderCell>Supplier</TableHeaderCell>
          <TableHeaderCell horizontalAlign="End">Price</TableHeaderCell>
        </TableHeaderRow>
        <TableRow rowKey="1">
          <TableCell>
            <Text>
              <b>Notebook Basic 15</b>
              <br />
              <a href="#">HT-1000</a>
            </Text>
          </TableCell>
          <TableCell>
            <Text>Very Best Screens</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>899.99</b> EUR
            </Text>
          </TableCell>
          <TableRowActionNavigation
            slot="actions"
            interactive
          ></TableRowActionNavigation>
        </TableRow>
        {/* playground-fold-end */}
        <TableRow rowKey="2" interactive={true}>
          <TableCell>
            <Text>
              <b>Astro Laptop 216</b>
              <br />
              <a href="#">HT-1251</a>
            </Text>
          </TableCell>
          <TableCell>
            <Text>Technocom</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>679.99</b> EUR
            </Text>
          </TableCell>
          <TableRowActionNavigation slot="actions" interactive></TableRowActionNavigation>
        </TableRow>
        {/* playground-fold */}
        <TableRow rowKey="3" navigated={true}>
          <TableCell>
            <Text>
              <b>Benda Laptop 1408</b>
              <br />
              <a href="#">HT-6102</a>
            </Text>
          </TableCell>
          <TableCell>
            <Text>Ultrasonic United</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>699.99</b> EUR
            </Text>
          </TableCell>
          <TableRowActionNavigation
            slot="actions"
            invisible
            interactive
          ></TableRowActionNavigation>
        </TableRow>
        <TableRow rowKey="4">
          <TableCell>
            <Text>
              <b>Broad Screen 22HD</b>
              <br />
              <a href="#">HT-1255</a>
            </Text>
          </TableCell>
          <TableCell>
            <Text>Speaker Experts</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>399.99</b> EUR
            </Text>
          </TableCell>
          <TableRowActionNavigation
            slot="actions"
            interactive
          ></TableRowActionNavigation>
        </TableRow>
        {/* playground-fold-end */}
      </Table>
    </>
  );
}

export default App;
