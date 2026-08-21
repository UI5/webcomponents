import { useState, useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableGrowingClass from "@ui5/webcomponents/dist/TableGrowing.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableGrowing = createReactComponent(TableGrowingClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const Text = createReactComponent(TextClass);

const MAX_GROW = 3;

function App() {
  const [extraRows, setExtraRows] = useState<
    Array<{ key: number; name: string; code: string }>
  >([]);
  const [counter, setCounter] = useState(0);
  const [showGrowing, setShowGrowing] = useState(true);

  const handleGrowingLoadMore = () => {
    const baseCount = 3 + extraRows.length;
    const newRows = [];
    for (let i = 0; i < 2; i++) {
      newRows.push({
        key: baseCount + i,
        name: `Notebook Basic ${18 + baseCount + i}`,
        code: `HT-100${2 + baseCount + i}`,
      });
    }
    setExtraRows((prev) => [...prev, ...newRows]);
    const newCounter = counter + 1;
    setCounter(newCounter);
    if (newCounter >= MAX_GROW) {
      setShowGrowing(false);
    }
  };

  return (
    <>
      <Table id="table">
        {showGrowing && (
          <TableGrowing
            id="growing"
            mode="Button"
            slot="features"
            onLoadMore={handleGrowingLoadMore}
          />
        )}
        {/* playground-fold */}
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell id="produtCol">
            <span>Product</span>
          </TableHeaderCell>
          <TableHeaderCell id="supplierCol">Supplier</TableHeaderCell>
          <TableHeaderCell id="dimensionsCol">Dimensions</TableHeaderCell>
          <TableHeaderCell id="weightCol">Weight</TableHeaderCell>
          <TableHeaderCell id="priceCol">Price</TableHeaderCell>
        </TableHeaderRow>
        <TableRow rowKey="0">
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
          <TableCell>
            <Text>
              <b>956</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="1">
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
          <TableCell>
            <Text>
              <b>1249</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="2">
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
              <b>3.7</b> KG
            </Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>29</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        {extraRows.map((row) => (
          <TableRow rowKey={row.key.toString()} key={row.key}>
            <TableCell>
              <Text>
                <b>{row.name}</b>
                <br />
                {row.code}
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
                <b>3.7</b> KG
              </Text>
            </TableCell>
            <TableCell>
              <Text>
                <b>29</b> EUR
              </Text>
            </TableCell>
          </TableRow>
        ))}
        {/* playground-fold-end */}
      </Table>
    </>
  );
}

export default App;
