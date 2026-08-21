import { useRef, useEffect } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const Text = createReactComponent(TextClass);

function App() {
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
        <TableRow movable={true}>
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
        <TableRow movable={true}>
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
        <TableRow movable={true}>
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
