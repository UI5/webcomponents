import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
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

const Label = createComponent(LabelClass);
const Table = createComponent(TableClass);
const TableCell = createComponent(TableCellClass);
const TableHeaderCell = createComponent(TableHeaderCellClass);
const TableHeaderRow = createComponent(TableHeaderRowClass);
const TableRow = createComponent(TableRowClass);
const TableRowAction = createComponent(TableRowActionClass);
const TableRowActionNavigation = createComponent(TableRowActionNavigationClass);

const handlers = {
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
            <Label>
              <b>Notebook Basic 15</b>
              <br />
              <a href="#">HT-1000</a>
            </Label>
          </TableCell>
          <TableCell>
            <Label>Very Best Screens</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>899.99</b> EUR
            </Label>
          </TableCell>
          <TableRowActionNavigation slot="actions"></TableRowActionNavigation>
        </TableRow>
        {/* playground-fold-end */}
        <TableRow rowKey="2">
          <TableCell>
            <Label>
              <b>Astro Laptop 216</b>
              <br />
              <a href="#">HT-1251</a>
            </Label>
          </TableCell>
          <TableCell>
            <Label>Technocom</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>679.99</b> EUR
            </Label>
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
            <Label>
              <b>Benda Laptop 1408</b>
              <br />
              <a href="#">HT-6102</a>
            </Label>
          </TableCell>
          <TableCell>
            <Label>Ultrasonic United</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>699.99</b> EUR
            </Label>
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
            <Label>
              <b>Broad Screen 22HD</b>
              <br />
              <a href="#">HT-1255</a>
            </Label>
          </TableCell>
          <TableCell>
            <Label>Speaker Experts</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>399.99</b> EUR
            </Label>
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
