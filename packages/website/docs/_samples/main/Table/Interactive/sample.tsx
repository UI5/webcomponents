import { useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
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

export const Example = () => {
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
          <TableHeaderCell id="produtCol" width="300px">
            <span>Product</span>
          </TableHeaderCell>
          <TableHeaderCell id="supplierCol" width="200px">
            Supplier
          </TableHeaderCell>
          <TableHeaderCell id="dimensionsCol" width="300px">
            Dimensions
          </TableHeaderCell>
          <TableHeaderCell id="weightCol" width="100px">
            Weight
          </TableHeaderCell>
          <TableHeaderCell id="priceCol" width="220px">
            Price
          </TableHeaderCell>
        </TableHeaderRow>
        {/* playground-fold-end */}
        <TableRow rowKey="a" interactive={true}>
          <TableCell>
            <Label>
              <b>Notebook Basic 15</b>
              <br />
              HT-1000
            </Label>
          </TableCell>
          <TableCell>
            <Label>Very Best Screens</Label>
          </TableCell>
          <TableCell>
            <Label>30 x 18 x 3 cm</Label>
          </TableCell>
          <TableCell>
            <Label style={{ color: "#2b7c2b" }}>
              <b>4.2</b> KG
            </Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>956</b> EUR
            </Label>
          </TableCell>
        </TableRow>
        <TableRow rowKey="b">
          <TableCell>
            <Label>
              <b>Notebook Basic 17</b>
              <br />
              HT-1001
            </Label>
          </TableCell>
          <TableCell>
            <Label>Smartcards</Label>
          </TableCell>
          <TableCell>
            <Label>29 x 17 x 3.1 cm</Label>
          </TableCell>
          <TableCell>
            <Label style={{ color: "#2b7c2b" }}>
              <b>4.5</b> KG
            </Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>1249</b> EUR
            </Label>
          </TableCell>
        </TableRow>
        <TableRow rowKey="c" interactive={true}>
          <TableCell>
            <Label>
              <b>Notebook Basic 18</b>
              <br />
              HT-1002
            </Label>
          </TableCell>
          <TableCell>
            <Label>Technocom</Label>
          </TableCell>
          <TableCell>
            <Label>32 x 21 x 4 cm</Label>
          </TableCell>
          <TableCell>
            <Label style={{ color: "#2b7c2b" }}>
              <b>3.7</b> KG
            </Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>29</b> EUR
            </Label>
          </TableCell>
        </TableRow>
      </Table>
    </>
  );
}
