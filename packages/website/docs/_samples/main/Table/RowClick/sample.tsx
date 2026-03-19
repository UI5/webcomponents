import { useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

const Label = createReactComponent(LabelClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const Toast = createReactComponent(ToastClass);

function App() {
  const toastRef = useRef(null);

  const showToast = (message: string) => {
    if (toastRef.current) {
      toastRef.current!.textContent = message;
      toastRef.current!.open = true;
    }
  };

  return (
    <>
      <Toast ref={toastRef} id="message" />
      <Table id="table">
        {/* playground-fold */}
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell width="300px">Product</TableHeaderCell>
          <TableHeaderCell width="200px">Supplier</TableHeaderCell>
          <TableHeaderCell width="100px">Price</TableHeaderCell>
        </TableHeaderRow>
        {/* playground-fold-end */}
        <TableRow rowKey="a" interactive={true} onClick={() => showToast("Row A clicked!")}>
          <TableCell>
            <Label>Notebook Basic 15</Label>
          </TableCell>
          <TableCell>
            <Label>Very Best Screens</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>956</b> EUR
            </Label>
          </TableCell>
        </TableRow>
        <TableRow rowKey="b" interactive={true} onClick={() => showToast("Row B clicked!")}>
          <TableCell>
            <Label>Notebook Basic 17</Label>
          </TableCell>
          <TableCell>
            <Label>Smartcards</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>1249</b> EUR
            </Label>
          </TableCell>
        </TableRow>
      </Table>
    </>
  );
}

export default App;
