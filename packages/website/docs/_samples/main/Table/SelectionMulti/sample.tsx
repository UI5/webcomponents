import { FormEvent, useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableSelectionMultiClass from "@ui5/webcomponents/dist/TableSelectionMulti.js";

const Label = createReactComponent(LabelClass);
const RadioButton = createReactComponent(RadioButtonClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const TableSelectionMulti = createReactComponent(TableSelectionMultiClass);

function App() {
  const selectionRef = useRef(null);
  const oldSelectedSetRef = useRef(null);

  const handleSelectionChange = () => {
    const selectionFeature = selectionRef.current;
    if (!selectionFeature) return;

    console.log("Selected keys", selectionFeature.selected);

    const newSelectedSet = selectionFeature.getSelectedAsSet();
    if (oldSelectedSetRef.current) {
      const recentlySelectedRowKeys = [
        ...newSelectedSet.difference(oldSelectedSetRef.current),
      ];
      const recentlyDeselectedRowKeys = [
        ...oldSelectedSetRef.current!.difference(newSelectedSet),
      ];

      if (recentlySelectedRowKeys.length > 0) {
        const recentlySelectedRows = recentlySelectedRowKeys.map((key) =>
          selectionFeature.getRowByKey(key),
        );
        console.log("Recently selected row-keys", recentlySelectedRowKeys);
        console.log("Recently selected rows", recentlySelectedRows);
      }

      if (recentlyDeselectedRowKeys.length > 0) {
        const recentlyDeselectedRows = recentlyDeselectedRowKeys.map((key) =>
          selectionFeature.getRowByKey(key),
        );
        console.log("Recently deselected row-keys", recentlyDeselectedRowKeys);
        console.log("Recently deselected rows", recentlyDeselectedRows);
      }
    }
    oldSelectedSetRef.current = newSelectedSet;
  };

  const handleSelectionBehaviorChange = (e: FormEvent) => {
    if (selectionRef.current) {
      selectionRef.current!.behavior = (e.currentTarget as RadioButtonClass).text;
    }
  };

  const handleHeaderSelectorChange = (e: FormEvent) => {
    if (selectionRef.current) {
      selectionRef.current!.headerSelector = (e.currentTarget as RadioButtonClass).text;
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Label showColon={true}>Selection Behavior</Label>
        <span
          id="selectionBehavior"
          role="radiogroup"
          onChange={handleSelectionBehaviorChange}
        >
          <RadioButton
            name="selectionBehavior"
            text="RowSelector"
            checked={true}
          />
          <RadioButton name="selectionBehavior" text="RowOnly" />
        </span>
        <div style={{ flexGrow: 1 }}></div>
        <Label showColon={true}>Header Selector</Label>
        <span
          id="headerSelector"
          role="radiogroup"
          onChange={handleHeaderSelectorChange}
        >
          <RadioButton name="headerSelector" text="SelectAll" checked={true} />
          <RadioButton name="headerSelector" text="ClearAll" />
        </span>
      </div>
      <Table id="table">
        <TableSelectionMulti
          ref={selectionRef}
          id="selection"
          slot="features"
          selected="Row1 Row3"
          onChange={handleSelectionChange}
        />
        {/* playground-fold */}
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell id="produtCol" width="1fr">
            <span>Product</span>
          </TableHeaderCell>
          <TableHeaderCell id="supplierCol" width="1fr">
            Supplier
          </TableHeaderCell>
          <TableHeaderCell id="dimensionsCol" width="1fr">
            Dimensions
          </TableHeaderCell>
          <TableHeaderCell id="weightCol" width="1fr">
            Weight
          </TableHeaderCell>
          <TableHeaderCell id="priceCol" width="1fr" horizontalAlign="End">
            Price
          </TableHeaderCell>
        </TableHeaderRow>
        <TableRow rowKey="Row1">
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
        <TableRow rowKey="Row2">
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
        <TableRow rowKey="Row3">
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
        {/* playground-fold-end */}
      </Table>
    </>
  );
}

export default App;
