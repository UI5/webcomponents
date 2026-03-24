import { useRef, useEffect } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";

const Label = createReactComponent(LabelClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);

export const Example = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const handleMoveOver = (e: CustomEvent) => {
      const { source, destination } = e.detail;

      const sourceIndex = table.rows.indexOf(source.element);
      const destinationIndex = table.rows.indexOf(destination.element);

      if (sourceIndex === -1 || destinationIndex === -1) {
        return;
      }

      if (
        source.element.hasAttribute("ui5-table-row") &&
        destination.element.hasAttribute("ui5-table-row") &&
        destination.placement !== "On"
      ) {
        e.preventDefault();
      }
    };

    const handleMove = (e: CustomEvent) => {
      const { source, destination } = e.detail;

      switch (destination.placement) {
        case "Before":
          destination.element.insertAdjacentElement(
            "beforebegin",
            source.element,
          );
          break;
        case "After":
          destination.element.insertAdjacentElement("afterend", source.element);
          break;
        default:
          break;
      }
    };

    table.addEventListener("move-over", handleMoveOver);
    table.addEventListener("move", handleMove);

    return () => {
      table.removeEventListener("move-over", handleMoveOver);
      table.removeEventListener("move", handleMove);
    };
  }, []);

  return (
    <>
      <Table id="table" ref={tableRef}>
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
        <TableRow movable={true}>
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
        <TableRow movable={true}>
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
        <TableRow movable={true}>
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
