import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableRowAction.js";
import "@ui5/webcomponents/dist/TableRowActionNavigation.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/share.js";
import "@ui5/webcomponents-icons/dist/heart.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import TableRowActionClass from "@ui5/webcomponents/dist/TableRowAction.js";
import TableRowActionNavigationClass from "@ui5/webcomponents/dist/TableRowActionNavigation.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const TableRowAction = createReactComponent(TableRowActionClass);
const TableRowActionNavigation = createReactComponent(TableRowActionNavigationClass);
const Text = createReactComponent(TextClass);

const handlers: Record<string, (row: any) => void> = {
  onAdd: (row) => {
    console.log(`Add action of row ${row.rowKey} is clicked`);
  },
  onEdit: (row) => {
    console.log(`Edit action of row ${row.rowKey} is clicked`);
  },
  onLike: (row) => {
    console.log(`Like action of row ${row.rowKey} is clicked`);
  },
  onDelete: (row) => {
    console.log(`Delete action of row ${row.rowKey} is clicked`);
  },
  onShare: (row) => {
    console.log(`Share action of row ${row.rowKey} is clicked`);
  },
  onNavigate: (row) => {
    console.log(`Navigate action of row ${row.rowKey} is clicked`);
  },
};

function App() {
  const handleTableRowActionClick = (
    e: UI5CustomEvent<TableClass, "row-action-click">,
  ) => {
    const { action, row } = e.detail;
    const actionText = (action as any).text?.toLowerCase();
    const handlerName = actionText
      ? `on${actionText.charAt(0).toUpperCase()}${actionText.slice(1)}`
      : null;
    if (handlerName) handlers[handlerName]?.(row);
  };

  return (
    <>
      <Table
        id="table"
        rowActionCount={3}
        onRowActionClick={handleTableRowActionClick}
      >
        {/* playground-fold */}
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell>Product</TableHeaderCell>
          <TableHeaderCell>Supplier</TableHeaderCell>
          <TableHeaderCell horizontalAlign="End">Price</TableHeaderCell>
        </TableHeaderRow>
        <TableRow rowKey="1" interactive={true}>
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
          <TableRowActionNavigation slot="actions" interactive></TableRowActionNavigation>
        </TableRow>
        {/* playground-fold-end */}
        <TableRow rowKey="2">
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
          <TableRowAction
            slot="actions"
            icon="delete"
            text="Delete"
          ></TableRowAction>
          <TableRowAction
            slot="actions"
            icon="add"
            text="Add"
          ></TableRowAction>
          <TableRowAction
            slot="actions"
            icon="edit"
            text="Edit"
          ></TableRowAction>
          <TableRowAction
            slot="actions"
            icon="share"
            text="Share"
          ></TableRowAction>
          <TableRowAction
            slot="actions"
            icon="heart"
            text="Like"
          ></TableRowAction>
          <TableRowActionNavigation
            slot="actions"
            interactive
          ></TableRowActionNavigation>
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
          <TableRowAction
            slot="actions"
            icon="share"
            text="Share"
          ></TableRowAction>
          <TableRowAction
            slot="actions"
            icon="edit"
            text="Edit"
            invisible
          ></TableRowAction>
          <TableRowAction
            slot="actions"
            icon="heart"
            text="Like"
          ></TableRowAction>
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
          <TableRowAction
            slot="actions"
            icon="share"
            text="Share"
          ></TableRowAction>
          <TableRowAction
            slot="actions"
            icon="add"
            text="Add"
          ></TableRowAction>
        </TableRow>
        {/* playground-fold-end */}
      </Table>
    </>
  );
}

export default App;
