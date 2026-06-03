import { useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const Toast = createReactComponent(ToastClass);
const Text = createReactComponent(TextClass);

function App() {
  const toastRef = useRef(null);

  const handleTableRowClick = (e: UI5CustomEvent<TableClass, "row-click">) => {
    if (toastRef.current) {
      toastRef.current!.textContent = `Row with key "${e.detail.row.rowKey}" was pressed!`;
      toastRef.current!.open = true;
    }
  };

  return (
    <>
      <Toast ref={toastRef} id="message" />
      <Table id="table" onRowClick={handleTableRowClick}>
        {/* playground-fold */}
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell id="produtCol">
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
        <TableRow rowKey="a" interactive={true}>
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
        <TableRow rowKey="b">
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
        <TableRow rowKey="c" interactive={true}>
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
      </Table>
    </>
  );
}

export default App;
