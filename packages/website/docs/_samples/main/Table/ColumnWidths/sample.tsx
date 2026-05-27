import { useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Slider = createReactComponent(SliderClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const Text = createReactComponent(TextClass);

function App() {
  const tableRef = useRef(null);

  const handleSliderChange = (e: UI5CustomEvent<SliderClass, "change">) => {
    if (tableRef.current) {
      tableRef.current!.style.width = `${e.currentTarget.value}%`;
    }
  };

  return (
    <>
      <Slider
        id="slider"
        value={100}
        max={100}
        min={0}
        labelInterval={10}
        showTickmarks={true}
        onChange={handleSliderChange}
      />
      <Table ref={tableRef} id="table" overflowMode="Popin">
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell id="productCol">
            <span>Product</span>
          </TableHeaderCell>
          <TableHeaderCell id="supplierCol" min-width="150px">
            Supplier
          </TableHeaderCell>
          <TableHeaderCell id="dimensionsCol">Dimensions</TableHeaderCell>
          <TableHeaderCell id="weightCol" min-width="100px">
            Weight
          </TableHeaderCell>
        </TableHeaderRow>
        {/* playground-fold */}
        <TableRow>
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
            <Text style={{ color: "#2b7c2b" }}>
              <b>4.2</b> KG
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
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
            <Text style={{ color: "#2b7c2b" }}>
              <b>4.5</b> KG
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
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
            <Text style={{ color: "#2b7c2b" }}>
              <b>3.1</b> KG
            </Text>
          </TableCell>
        </TableRow>
        {/* playground-fold-end */}
      </Table>
    </>
  );
}

export default App;
