import { useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableSelectionMultiClass from "@ui5/webcomponents/dist/TableSelectionMulti.js";

const Bar = createReactComponent(BarClass);
const Label = createReactComponent(LabelClass);
const SegmentedButton = createReactComponent(SegmentedButtonClass);
const SegmentedButtonItem = createReactComponent(SegmentedButtonItemClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const TableSelectionMulti = createReactComponent(TableSelectionMultiClass);

function App() {
  const tableRef = useRef(null);

  const handleSizeBtnSelectionChange = (
    e: UI5CustomEvent<SegmentedButtonClass, "selection-change">,
  ) => {
    const selectedItem = e.detail.selectedItems[0];
    if (tableRef.current) {
      tableRef.current!.style.width = selectedItem.textContent;
    }
  };

  return (
    <>
      <Bar>
        <SegmentedButton
          id="sizeBtn"
          accessibleName="Switch Table Size"
          onSelectionChange={handleSizeBtnSelectionChange}
        >
          <SegmentedButtonItem>50%</SegmentedButtonItem>
          <SegmentedButtonItem selected={true}>100%</SegmentedButtonItem>
        </SegmentedButton>
      </Bar>
      <Table ref={tableRef} id="table" overflowMode="Popin">
        <TableSelectionMulti id="selection" slot="features" selected="Row1 Row3" />
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell id="productCol" minWidth="300px">
            Product
          </TableHeaderCell>
          <TableHeaderCell id="supplierCol" minWidth="200px">
            Supplier
          </TableHeaderCell>
          <TableHeaderCell id="dimensionsCol" minWidth="200px">
            Dimensions
          </TableHeaderCell>
          <TableHeaderCell id="priceCol" minWidth="150px">
            Price
          </TableHeaderCell>
        </TableHeaderRow>
        <TableRow rowKey="Row1">
          <TableCell>
            <Label>Notebook Basic 15</Label>
          </TableCell>
          <TableCell>
            <Label>Very Best Screens</Label>
          </TableCell>
          <TableCell>
            <Label>30 x 18 x 3 cm</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>956</b> EUR
            </Label>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row2">
          <TableCell merged>
            <Label>Notebook Basic 15</Label>
          </TableCell>
          <TableCell>
            <Label>Smartcards</Label>
          </TableCell>
          <TableCell>
            <Label>29 x 17 x 3.1 cm</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>1249</b> EUR
            </Label>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row3">
          <TableCell merged>
            <Label>Notebook Basic 15</Label>
          </TableCell>
          <TableCell>
            <Label>Technocom</Label>
          </TableCell>
          <TableCell>
            <Label>32 x 21 x 4 cm</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>29</b> EUR
            </Label>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row4">
          <TableCell>
            <Label>Notebook Basic 17</Label>
          </TableCell>
          <TableCell>
            <Label>Very Best Screens</Label>
          </TableCell>
          <TableCell>
            <Label>33 x 22 x 3.5 cm</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>1200</b> EUR
            </Label>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row5">
          <TableCell merged>
            <Label>Notebook Basic 17</Label>
          </TableCell>
          <TableCell>
            <Label>Smartcards</Label>
          </TableCell>
          <TableCell>
            <Label>33 x 22 x 3.5 cm</Label>
          </TableCell>
          <TableCell>
            <Label>
              <b>1450</b> EUR
            </Label>
          </TableCell>
        </TableRow>
      </Table>
    </>
  );
}

export default App;
