import { useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableSelectionMultiClass from "@ui5/webcomponents/dist/TableSelectionMulti.js";

const Bar = createReactComponent(BarClass);
const Text = createReactComponent(TextClass);
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
    <div style={{ height: "250px", overflow: "auto" }}>
      <Bar>
        <SegmentedButton
          id="sizeBtn"
          accessibleName="Switch Table Size"
          onSelectionChange={handleSizeBtnSelectionChange}
        >
          <SegmentedButtonItem>25%</SegmentedButtonItem>
          <SegmentedButtonItem>50%</SegmentedButtonItem>
          <SegmentedButtonItem>75%</SegmentedButtonItem>
          <SegmentedButtonItem selected={true}>100%</SegmentedButtonItem>
        </SegmentedButton>
      </Bar>
      <Table ref={tableRef} id="table" overflowMode="Popin">
        <TableSelectionMulti id="selection" slot="features" />
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
            <Text>Notebook Basic 15</Text>
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
        <TableRow rowKey="Row2">
          <TableCell merged>
            <Text>Notebook Basic 15</Text>
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
        <TableRow rowKey="Row3">
          <TableCell merged>
            <Text>Notebook Basic 15</Text>
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
        <TableRow rowKey="Row4">
          <TableCell>
            <Text>Notebook Basic 17</Text>
          </TableCell>
          <TableCell>
            <Text>Very Best Screens</Text>
          </TableCell>
          <TableCell>
            <Text>33 x 22 x 3.5 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1200</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row5">
          <TableCell merged>
            <Text>Notebook Basic 17</Text>
          </TableCell>
          <TableCell>
            <Text>Smartcards</Text>
          </TableCell>
          <TableCell>
            <Text>33 x 22 x 3.5 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1450</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row6">
          <TableCell merged>
            <Text>Notebook Basic 17</Text>
          </TableCell>
          <TableCell>
            <Text>Technocom</Text>
          </TableCell>
          <TableCell>
            <Text>34 x 23 x 3.2 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1100</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row7">
          <TableCell merged>
            <Text>Notebook Basic 17</Text>
          </TableCell>
          <TableCell>
            <Text>DisplayTech</Text>
          </TableCell>
          <TableCell>
            <Text>33 x 21 x 3.4 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1050</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row8">
          <TableCell merged>
            <Text>Notebook Basic 17</Text>
          </TableCell>
          <TableCell>
            <Text>ProVision</Text>
          </TableCell>
          <TableCell>
            <Text>34 x 22 x 3.3 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1320</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row9">
          <TableCell merged>
            <Text>Notebook Basic 17</Text>
          </TableCell>
          <TableCell>
            <Text>ScreenWorld</Text>
          </TableCell>
          <TableCell>
            <Text>33 x 22 x 3.6 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1180</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row10">
          <TableCell merged>
            <Text>Notebook Basic 17</Text>
          </TableCell>
          <TableCell>
            <Text>MicroChip</Text>
          </TableCell>
          <TableCell>
            <Text>34 x 23 x 3.5 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1390</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row11">
          <TableCell merged>
            <Text>Notebook Basic 17</Text>
          </TableCell>
          <TableCell>
            <Text>PanelPlus</Text>
          </TableCell>
          <TableCell>
            <Text>33 x 21 x 3.2 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1275</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row12">
          <TableCell>
            <Text>Notebook Professional 15</Text>
          </TableCell>
          <TableCell>
            <Text>Very Best Screens</Text>
          </TableCell>
          <TableCell>
            <Text>33 x 21 x 2.5 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1999</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row13">
          <TableCell merged>
            <Text>Notebook Professional 15</Text>
          </TableCell>
          <TableCell>
            <Text>Smartcards</Text>
          </TableCell>
          <TableCell>
            <Text>31 x 20 x 2.8 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>2150</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row14">
          <TableCell merged>
            <Text>Notebook Professional 15</Text>
          </TableCell>
          <TableCell>
            <Text>Technocom</Text>
          </TableCell>
          <TableCell>
            <Text>32 x 21 x 3.1 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1850</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row15">
          <TableCell>
            <Text>ITElite Chromebook</Text>
          </TableCell>
          <TableCell>
            <Text>Very Best Screens</Text>
          </TableCell>
          <TableCell>
            <Text>28 x 19 x 2.1 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>399</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="Row16">
          <TableCell merged>
            <Text>ITElite Chromebook</Text>
          </TableCell>
          <TableCell>
            <Text>Smartcards</Text>
          </TableCell>
          <TableCell>
            <Text>27 x 18 x 2.0 cm</Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>459</b> EUR
            </Text>
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
}

export default App;
